# 法務部 AIニュース ダッシュボード

法務部員向けに、AI関連ニュース(利活用 / ガバナンス / 事業戦略 / 技術トレンド / リスク)を毎朝自動収集して一覧表示する静的Webツール。

## 構成

```
ai-news/
├── index.html         # ダッシュボード本体
├── app.js             # フロント(フィルタ・既読・お気に入り)
├── style.css
├── sources.json       # RSSソース定義と分類キーワード
├── data/
│   └── articles.json  # 収集済み記事(自動更新、過去10日分)
└── scripts/
    ├── fetch.py       # RSS取得・分類・JSON保存
    └── requirements.txt
```

GitHub Actions (`.github/workflows/ai-news.yml`) が **平日朝7時(JST)** に `fetch.py` を実行し、`data/articles.json` をコミットします。

## 機能

- **カテゴリ分類**: タイトル+本文をキーワードマッチして自動タグ付け
  - ガバナンス / 利活用 / 事業戦略 / 技術トレンド / リスク・インシデント
- **フィルタ**: カテゴリ・ソース・期間(今日/3日/7日/全期間)・検索
- **既読管理 / ★お気に入り**: ブラウザの localStorage に保存
- **保持期間**: 過去10日分のみ自動保持(古い記事はpurge)

## ローカル実行

```bash
cd ai-news
pip install -r scripts/requirements.txt
python scripts/fetch.py
# 簡易サーバで確認
python -m http.server 8000
# → http://localhost:8000/ai-news/
```

## デプロイ(GitHub Pages)

1. リポジトリ設定の **Pages** で `main` ブランチをソースに指定
2. 公開URLの `/ai-news/` を開く
3. Actions の cron が平日朝にデータ更新 → Pages が自動反映

## ソースの追加・編集

`sources.json` の `feeds` 配列に追記するだけ。Google News RSS のクエリURLを使えば、サイトを増やさずトピックを増やせます。

```json
{
  "name": "Google News: 新トピック",
  "url": "https://news.google.com/rss/search?q=...&hl=ja&gl=JP&ceid=JP:ja",
  "default_category": "ガバナンス"
}
```

カテゴリ判定のキーワードは `category_keywords` で調整します。
