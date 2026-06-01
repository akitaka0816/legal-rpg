#!/usr/bin/env python3
"""AIニュース収集スクリプト

各RSSフィード(RSS 2.0 / Atom)から記事を取得し、キーワードベースで
法務向けカテゴリを付与、10日以内の記事のみ保持して
ai-news/data/articles.json に保存する。

依存: Python 3.11+ stdlib のみ
"""

from __future__ import annotations

import hashlib
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
SOURCES_PATH = ROOT / "sources.json"
DATA_PATH = ROOT / "data" / "articles.json"
RETENTION_DAYS = 10
HTTP_TIMEOUT = 20
USER_AGENT = "legal-rpg-ai-news/1.0 (+https://github.com/akitaka0816/legal-rpg)"

NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "dc": "http://purl.org/dc/elements/1.1/",
}


def load_sources() -> dict:
    with SOURCES_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def strip_html(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def make_id(url: str, title: str) -> str:
    return hashlib.sha1(f"{url}|{title}".encode("utf-8")).hexdigest()[:16]


def parse_date(value: str | None) -> str | None:
    if not value:
        return None
    value = value.strip()
    try:
        dt = parsedate_to_datetime(value)
        if dt is not None:
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).isoformat()
    except (TypeError, ValueError):
        pass
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(value, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).isoformat()
        except ValueError:
            continue
    return None


def categorize(text: str, default: str, keyword_map: dict) -> list[str]:
    lowered = text.lower()
    matched: list[str] = []
    for category, keywords in keyword_map.items():
        for kw in keywords:
            if kw.lower() in lowered:
                matched.append(category)
                break
    if default and default not in matched:
        matched.append(default)
    if not matched:
        matched.append("技術トレンド")
    return matched


def fetch_url(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*"})
    with urlopen(req, timeout=HTTP_TIMEOUT) as resp:
        return resp.read()


def _local(tag: str) -> str:
    return tag.split("}", 1)[1] if "}" in tag else tag


def parse_rss2(root: ET.Element) -> list[dict]:
    items = []
    for item in root.iter():
        if _local(item.tag) != "item":
            continue
        data = {"title": "", "link": "", "summary": "", "published": ""}
        for child in item:
            tag = _local(child.tag)
            if tag == "title":
                data["title"] = (child.text or "").strip()
            elif tag == "link":
                data["link"] = (child.text or "").strip()
            elif tag == "description":
                data["summary"] = (child.text or "").strip()
            elif tag == "encoded" and not data["summary"]:
                data["summary"] = (child.text or "").strip()
            elif tag in ("pubDate", "date"):
                data["published"] = (child.text or "").strip()
        if data["title"] and data["link"]:
            items.append(data)
    return items


def parse_atom(root: ET.Element) -> list[dict]:
    items = []
    for entry in root.iter():
        if _local(entry.tag) != "entry":
            continue
        data = {"title": "", "link": "", "summary": "", "published": ""}
        for child in entry:
            tag = _local(child.tag)
            if tag == "title":
                data["title"] = (child.text or "").strip()
            elif tag == "link":
                href = child.attrib.get("href", "")
                rel = child.attrib.get("rel", "alternate")
                if href and rel == "alternate" and not data["link"]:
                    data["link"] = href.strip()
            elif tag == "summary" or tag == "content":
                if not data["summary"]:
                    data["summary"] = (child.text or "").strip()
            elif tag in ("published", "updated") and not data["published"]:
                data["published"] = (child.text or "").strip()
        if data["title"] and data["link"]:
            items.append(data)
    return items


def fetch_feed(feed_conf: dict, keyword_map: dict) -> list[dict]:
    name = feed_conf["name"]
    print(f"  fetching: {name}", file=sys.stderr)
    try:
        raw = fetch_url(feed_conf["url"])
    except (URLError, HTTPError, TimeoutError) as exc:
        print(f"    network error: {exc}", file=sys.stderr)
        return []
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        print(f"    parse error: {exc}", file=sys.stderr)
        return []

    local = _local(root.tag)
    if local == "rss" or local == "RDF":
        raw_items = parse_rss2(root)
    elif local == "feed":
        raw_items = parse_atom(root)
    else:
        raw_items = parse_rss2(root) or parse_atom(root)

    articles: list[dict] = []
    for raw_item in raw_items:
        title = strip_html(raw_item["title"])
        url = raw_item["link"]
        if not title or not url:
            continue
        summary = strip_html(raw_item["summary"])
        if len(summary) > 400:
            summary = summary[:400] + "…"
        published = parse_date(raw_item["published"])
        categories = categorize(
            f"{title} {summary}",
            feed_conf.get("default_category", ""),
            keyword_map,
        )
        articles.append({
            "id": make_id(url, title),
            "title": title,
            "url": url,
            "source": name,
            "summary": summary,
            "published_at": published,
            "categories": categories,
        })
    print(f"    -> {len(articles)} entries", file=sys.stderr)
    return articles


def load_existing() -> list[dict]:
    if not DATA_PATH.exists():
        return []
    try:
        with DATA_PATH.open("r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("articles", [])
    except (json.JSONDecodeError, OSError):
        return []


def merge_and_prune(existing: list[dict], fresh: list[dict]) -> list[dict]:
    by_id: dict[str, dict] = {}
    for article in existing + fresh:
        by_id[article["id"]] = article

    cutoff = datetime.now(timezone.utc) - timedelta(days=RETENTION_DAYS)
    kept: list[dict] = []
    for article in by_id.values():
        published = article.get("published_at")
        if published:
            try:
                dt = datetime.fromisoformat(published.replace("Z", "+00:00"))
                if dt < cutoff:
                    continue
            except ValueError:
                pass
        kept.append(article)

    kept.sort(key=lambda a: a.get("published_at") or "", reverse=True)
    return kept


def main() -> int:
    sources = load_sources()
    keyword_map = sources.get("category_keywords", {})

    fresh: list[dict] = []
    for feed_conf in sources["feeds"]:
        try:
            fresh.extend(fetch_feed(feed_conf, keyword_map))
        except Exception as exc:  # noqa: BLE001
            print(f"  ERROR on {feed_conf['name']}: {exc}", file=sys.stderr)

    existing = load_existing()
    merged = merge_and_prune(existing, fresh)

    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "retention_days": RETENTION_DAYS,
        "categories": sources.get("categories", []),
        "article_count": len(merged),
        "articles": merged,
    }
    with DATA_PATH.open("w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"saved {len(merged)} articles to {DATA_PATH}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
