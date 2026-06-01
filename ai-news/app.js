(() => {
  const STORAGE_KEY = "ai-news-state-v1";
  const state = {
    articles: [],
    categories: [],
    sources: [],
    activeCategories: new Set(),
    activeSources: new Set(),
    dateRange: "3d",
    search: "",
    hideRead: false,
    onlyStarred: false,
    read: new Set(),
    starred: new Set(),
  };

  function loadPersist() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      state.read = new Set(data.read || []);
      state.starred = new Set(data.starred || []);
    } catch (_) {}
  }
  function savePersist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      read: [...state.read],
      starred: [...state.starred],
    }));
  }

  async function loadData() {
    const res = await fetch("data/articles.json", { cache: "no-store" });
    if (!res.ok) throw new Error("data load failed");
    const payload = await res.json();
    state.articles = payload.articles || [];
    state.categories = payload.categories || [];
    state.sources = [...new Set(state.articles.map(a => a.source))].sort();
    document.getElementById("generated-at").textContent =
      "取得時刻: " + formatDate(payload.generated_at);
    document.getElementById("article-count").textContent =
      "記事数: " + (payload.article_count ?? state.articles.length);
  }

  function formatDate(iso) {
    if (!iso) return "--";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function renderFilters() {
    const catBox = document.getElementById("category-filters");
    catBox.innerHTML = "";
    state.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = cat;
      btn.dataset.cat = cat;
      btn.addEventListener("click", () => {
        if (state.activeCategories.has(cat)) state.activeCategories.delete(cat);
        else state.activeCategories.add(cat);
        btn.classList.toggle("active");
        renderList();
      });
      catBox.appendChild(btn);
    });

    const srcBox = document.getElementById("source-filters");
    srcBox.innerHTML = "";
    state.sources.forEach(src => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.textContent = src;
      btn.title = src;
      btn.addEventListener("click", () => {
        if (state.activeSources.has(src)) state.activeSources.delete(src);
        else state.activeSources.add(src);
        btn.classList.toggle("active");
        renderList();
      });
      srcBox.appendChild(btn);
    });

    document.querySelectorAll("#date-filters .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#date-filters .chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.dateRange = btn.dataset.range;
        renderList();
      });
    });

    document.getElementById("hide-read").addEventListener("change", e => {
      state.hideRead = e.target.checked;
      renderList();
    });
    document.getElementById("only-starred").addEventListener("change", e => {
      state.onlyStarred = e.target.checked;
      renderList();
    });
    document.getElementById("search-input").addEventListener("input", e => {
      state.search = e.target.value.trim().toLowerCase();
      renderList();
    });
  }

  function withinDateRange(article) {
    if (state.dateRange === "all") return true;
    if (!article.published_at) return state.dateRange === "all";
    const dt = new Date(article.published_at);
    const now = new Date();
    const diffMs = now - dt;
    const day = 24 * 60 * 60 * 1000;
    if (state.dateRange === "today") {
      return dt.toDateString() === now.toDateString();
    }
    if (state.dateRange === "3d") return diffMs <= 3 * day;
    if (state.dateRange === "7d") return diffMs <= 7 * day;
    return true;
  }

  function matches(article) {
    if (!withinDateRange(article)) return false;
    if (state.activeCategories.size > 0) {
      const hit = (article.categories || []).some(c => state.activeCategories.has(c));
      if (!hit) return false;
    }
    if (state.activeSources.size > 0 && !state.activeSources.has(article.source)) return false;
    if (state.onlyStarred && !state.starred.has(article.id)) return false;
    if (state.hideRead && state.read.has(article.id)) return false;
    if (state.search) {
      const blob = (article.title + " " + (article.summary || "")).toLowerCase();
      if (!blob.includes(state.search)) return false;
    }
    return true;
  }

  function renderList() {
    const list = document.getElementById("article-list");
    const empty = document.getElementById("empty-state");
    list.innerHTML = "";
    const filtered = state.articles.filter(matches);
    if (filtered.length === 0) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    const frag = document.createDocumentFragment();
    filtered.forEach(article => frag.appendChild(renderArticle(article)));
    list.appendChild(frag);
  }

  function renderArticle(article) {
    const el = document.createElement("article");
    el.className = "article" + (state.read.has(article.id) ? " read" : "");

    const head = document.createElement("div");
    head.className = "article-head";

    const title = document.createElement("h3");
    title.className = "article-title";
    const link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = article.title;
    link.addEventListener("click", () => {
      state.read.add(article.id);
      savePersist();
      el.classList.add("read");
    });
    title.appendChild(link);

    const star = document.createElement("button");
    star.className = "star" + (state.starred.has(article.id) ? " on" : "");
    star.textContent = "★";
    star.title = "お気に入り";
    star.addEventListener("click", () => {
      if (state.starred.has(article.id)) state.starred.delete(article.id);
      else state.starred.add(article.id);
      savePersist();
      star.classList.toggle("on");
    });

    head.appendChild(title);
    head.appendChild(star);
    el.appendChild(head);

    const meta = document.createElement("div");
    meta.className = "article-meta";
    meta.innerHTML = `<span>${formatDate(article.published_at)}</span><span>${escapeHtml(article.source)}</span>`;
    el.appendChild(meta);

    if (article.summary) {
      const summary = document.createElement("p");
      summary.className = "article-summary";
      summary.textContent = article.summary;
      el.appendChild(summary);
    }

    const cats = document.createElement("div");
    cats.className = "categories";
    (article.categories || []).forEach(c => {
      const span = document.createElement("span");
      span.className = "cat";
      span.dataset.cat = c;
      span.textContent = c;
      cats.appendChild(span);
    });
    el.appendChild(cats);

    return el;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  async function init() {
    loadPersist();
    try {
      await loadData();
    } catch (err) {
      document.getElementById("article-list").innerHTML =
        '<div class="empty-state">データが未生成です。fetch.py を実行してください。</div>';
      return;
    }
    renderFilters();
    renderList();
  }

  init();
})();
