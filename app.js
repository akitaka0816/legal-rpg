// ── ステージ定義 ───────────────────────────────────
const STAGES = [
  {
    id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
    story: {
      chapter: "ステージ1　新入社員",
      scene: "株式会社ひろせ — 入門（法務・コンプラの素養）",
      narrative: `【想定する役割】
法務・コンプラに配属されたばかりの段階。専門家ではない前提で、用語と制度の“地図”を頭に置けること。

【求められる視座・態度】
分野ごとの論点を混同せず、依頼を受けたときに「どの法域の話か」を切り分けられること。

【主な知識・スキル領域】
法律用語の整理、会社法・民法・独禁法・不競法の入口、労働法・派遣法・職安法の前提、個人情報保護の基本線。

【出題の目安】
データ上の difficulty は主に 1（入門相当）。上記を横断して問う場合があります。`,
      skills: ["法律用語と論点の整理", "会社法・民法・独禁法・不競法の基礎概念", "労働法・派遣法・職安法と個人情報の入門"],
      bossHint: "最終問題の目安：用語と多分野の入口（difficulty 1 相当）",
      clearStory: `次のステージ（一般社員）では、部門横断の相談に耐えるための業務知と法知の接続が中心になります。`,
    },
  },
  {
    id: 2, name: "法務基礎", role: "一般社員", questionsPerRun: 5,
    story: {
      chapter: "ステージ2　一般社員",
      scene: "株式会社ひろせ — 法務基礎（業務と法の接点）",
      narrative: `【想定する役割】
各部署からの相談を受ける法務の実務担当。短時間で論点を特定し、説明可能な形に整えること。

【求められる視座・態度】
「現場の言葉」と「制度の言葉」を対応づけ、依頼の背後にある規制・リスクを説明できること。

【主な知識・スキル領域】
個人情報保護法、職安法、法律用語の再確認、会計・財務・人事・労務・戦略と法リスクの接続、マネジメント用語（KPI 等）とコンプラの関係。

【出題の目安】
データ上の difficulty は主に 2（基礎中心。一部ステップアップあり）。論点の種類が増えます。`,
      skills: ["人事・労務・職安法と採用・派遣の論点整理", "会計・財務・戦略の数字と法リスクの接続", "マネジメント上の意思決定とコンプライアンスのバランス"],
      bossHint: "最終問題の目安：部門横断の業務知と法知（difficulty 2 相当）",
      clearStory: `次のステージ（係長）では、契約書審査を中心に、複数法分野を横断した実務判断が中心になります。`,
    },
  },
  {
    id: 3, name: "応用実務", role: "係長", questionsPerRun: 5,
    story: {
      chapter: "ステージ3　係長",
      scene: "株式会社ひろせ — 応用実務（レビューと横断）",
      narrative: `【想定する役割】
レビューとタスクの優先順位づけを担うライン。条文の趣旨を説明し、取引の型と規制の重なりを整理できること。

【求められる視座・態度】
「正解暗記」ではなく、誤った安心を避け、リスクを言語化して関係者に伝えられること。

【主な知識・スキル領域】
契約書審査、会社法・民法・独禁法・不競法、金商法の入り口、会計論点、GDPR・個人情報の実務。

【出題の目安】
データ上の difficulty は主に 3。横断出題になります。`,
      skills: ["契約書審査（条項の意図とリスクの言語化）", "会社法・民法・独禁法・不競法・金商法の実務接点", "個人情報・GDPRと会計論点の整理"],
      bossHint: "最終問題の目安：契約レビューと横断法分野（difficulty 3 相当）",
      clearStory: `次のステージ（課長）では、チームや部門をまたいだ説明責任と、優先順位に基づく判断の言語化が中心になります。`,
    },
  },
  {
    id: 4, name: "実践編", role: "課長", questionsPerRun: 5,
    story: {
      chapter: "ステージ4　課長",
      scene: "株式会社ひろせ — 実践編（課の設計と判断）",
      narrative: `【想定する役割】
課のリーダーとして、契約・人事・財務・戦略など複数論点を同じ時間軸で組み立て、関係者に説明できること。

【求められる視座・態度】
トレードオフを隠さず、優先順位と説明責任を果たすこと。出題分野がバラけても、根は同じ整理軸に戻せること。

【主な知識・スキル領域】
契約・民法・会社法、人事・労務・派遣、会計・財務・戦略、独禁法、個人情報・GDPR などの横断。

【出題の目安】
データ上の difficulty は主に 4（中級中心。一部は 5）。知識の幅と判断の言語化を問います。`,
      skills: ["契約・民法・会社法を前提にした事業判断の裏付け", "人事・労務・派遣と事業戦略の整合", "独禁法・会計・財務のリスクを経営会議で説明する視点"],
      bossHint: "最終問題の目安：説明可能な判断（difficulty 4〜5 相当）",
      clearStory: `次のステージ（部長）では、サステナ開示・EU 規制など最前線のガバナンスと、組織への落とし込みが中心になります。`,
    },
  },
  {
    id: 5, name: "上級編", role: "部長", questionsPerRun: 5,
    story: {
      chapter: "ステージ5　部長",
      scene: "株式会社ひろせ — 上級編（規制の最前線とガバナンス）",
      narrative: `【想定する役割】
法務部門の責任者層として、開示・デジタル規制・データ統治と、古典的コンプラを同時に設計・説明できること。

【求められる視座・態度】
制度の変化を、社内プロセス・統制・説明責任に落とし込むこと。暗記ではなく、筋の通った説明を組み立てること。

【主な知識・スキル領域】
CSRD・サステナ開示、EU AI 法、GDPR、高度な契約書審査、個人情報の統治、会社法・民法・独禁法・不競法・労働法の統合。

【出題の目安】
データ上の difficulty は主に 5（上級）。CSRD 等がまとまって出る場合があります。`,
      skills: ["CSRDを中心とした開示・サステナと法務の関与", "EU AI法・GDPR・契約書審査の前沿", "個人情報・会社法・民法・独禁法・不競法・労働法の統合リスク"],
      bossHint: "最終問題の目安：CSRD・EU 規制・上級ガバナンス（difficulty 5 相当）",
      clearStory: `最終ステージ（CLO）では、経営・資本市場・組織横断を束ねる総合力が中心になります。`,
    },
  },
  {
    id: 6, name: "最終試験", role: "CLO", questionsPerRun: 5,
    story: {
      chapter: "ステージ6　CLO（総合）",
      scene: "株式会社ひろせ — 総合モジュール（経営に接続する法務）",
      narrative: `【想定する役割】
最高法務責任者として、デジタル規制・金融規制・個人情報・労務・財務戦略など、経営の歯車全体に法を接続し、一本の方針として示せること。

【求められる視座・態度】
バラバラな論点を束ね、経営判断と説明責任に耐える論理構造を組み立てること。

【主な知識・スキル領域】
EU AI 法、金商法、個人情報、派遣・職安、人事・労務、会計・財務・戦略・マネジメントの統合。

【出題の目安】
データ上の difficulty は主に 6（最上級）。EU AI 法・金商法の比重が高い出題になりがちです。`,
      skills: ["EU AI法と金商法を含む最前線の論点", "個人情報・派遣・職安・人事・労務の組織統治", "会計・財務・戦略・マネジメントと法リスクの統合"],
      bossHint: "最終問題の目安：AI・金融規制・経営横断（difficulty 6 相当）",
      clearStory: null,
    },
  },
];
const CLEARED_ROLE  = "CLO";
const EXP_PER_STAGE = [10, 15, 20, 30, 40, 50];

/** questions.json の difficulty（1〜6）。未設定や範囲外はステージ番号にフォールバック */
function questionDifficulty(q) {
  const n = Number(q?.difficulty);
  if (Number.isFinite(n) && n >= 1 && n <= 6) return Math.round(n);
  const fallback = state.stageIndex + 1;
  return Math.max(1, Math.min(6, fallback));
}

function comboMultiplier(combo) {
  if (combo >= 4) return 2.5;
  if (combo >= 3) return 2.0;
  if (combo >= 2) return 1.5;
  return 1.0;
}

function speedBonus(remaining) {
  if (remaining >= 25) return 0.5;
  if (remaining >= 20) return 0.3;
  if (remaining >= 15) return 0.1;
  return 0;
}

const SAVE_KEY     = "legal_rpg_save_v3";
const RANKING_KEY  = "legal_rpg_ranking_v1";
const WRONG_KEY    = "legal_rpg_wrong_v1";
const PROGRESS_KEY = "legal_rpg_progress_v1";
const STATS_KEY    = "legal_rpg_stats_v1";
const TIMER_SEC    = 30;

let allQuestions = [];
const SoundEngine = window.SoundEngine || {
  startBgm() {},
  stopBgm() {},
  toggleMute() { return true; },
  playTimeUp() {},
  playFatalWarning() {},
  playCorrect() {},
  playWrong() {},
  playCombo() {},
  playStageClear() {},
  playGameOver() {},
  playFullClear() {},
};

let questionsReady = false;

const state = {
  name: "", hp: 100, exp: 0, lv: 1,
  stageIndex: 0, current: 0,
  gameOver: false, cleared: false, combo: 0,
  stageIntroPending: false,
  shuffledIndices: [],
  stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
  reviewMode: false, reviewPool: [], reviewCorrect: 0,
};

const el = {
  startSection:    document.getElementById("startSection"),
  statusSection:   document.getElementById("statusSection"),
  quizSection:     document.getElementById("quizSection"),
  resultSection:   document.getElementById("resultSection"),
  rankingSection:  document.getElementById("rankingSection"),
  stageMapSection:   document.getElementById("stageMapSection"),
  stageIntroSection: document.getElementById("stageIntroSection"),
  statsSection:    document.getElementById("statsSection"),
  playerName:      document.getElementById("playerName"),
  startBtn:        document.getElementById("startBtn"),
  showRankingBtn:  document.getElementById("showRankingBtn"),
  clearRankingBtn: document.getElementById("clearRankingBtn"),
  stageMapBtn:     document.getElementById("stageMapBtn"),
  statsBtn:        document.getElementById("statsBtn"),
  reviewBtn:       document.getElementById("reviewBtn"),
  reviewCount:     document.getElementById("reviewCount"),
  stageMapGrid:    document.getElementById("stageMapGrid"),
  statsContent:    document.getElementById("statsContent"),
  clearStatsBtn:   document.getElementById("clearStatsBtn"),
  sName:     document.getElementById("sName"),
  sRole:     document.getElementById("sRole"),
  sLv:       document.getElementById("sLv"),
  sHp:       document.getElementById("sHp"),
  sExp:      document.getElementById("sExp"),
  sProgress: document.getElementById("sProgress"),
  sStage:    document.getElementById("sStage"),
  timerBar:  document.getElementById("timerBar"),
  timerText: document.getElementById("timerText"),
  questionText:  document.getElementById("questionText"),

  choices:       document.getElementById("choices"),
  comboDisplay:  document.getElementById("comboDisplay"),
  fatalWarning:  document.getElementById("fatalWarning"),
  resultText:    document.getElementById("resultText"),
  nextBtn:       document.getElementById("nextBtn"),
  restartBtn:    document.getElementById("restartBtn"),
  shareBtn:      document.getElementById("shareBtn"),
  scoreBanner:      document.getElementById("scoreBanner"),
  scoreBannerLabel: document.getElementById("scoreBannerLabel"),
  scoreBannerValue: document.getElementById("scoreBannerValue"),
  rankingList:   document.getElementById("rankingList"),
  stageClearOverlay: document.getElementById("stageClearOverlay"),
  stageClearNum:     document.getElementById("stageClearNum"),
  stageClearRole:    document.getElementById("stageClearRole"),
  stageClearGrade:   document.getElementById("stageClearGrade"),
};

// 初期状態は問題読み込み待ち
if (el.startBtn) {
  el.startBtn.disabled = true;
  el.startBtn.dataset.readyLabel = el.startBtn.textContent || "▶ 開始";
  el.startBtn.textContent = "⏳ 読み込み中...";
}

// ── タイマー ──────────────────────────────────────
let timerInterval   = null;
let timerRemaining  = TIMER_SEC;
let currentCorrectIdx = 0;
let isAnswering     = false;

function startTimer() {
  clearTimer();
  timerRemaining = TIMER_SEC;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    updateTimerDisplay();
    if (timerRemaining <= 0) { clearTimer(); timeUp(); }
  }, 1000);
}

function clearTimer() {
  if (timerInterval !== null) { clearInterval(timerInterval); timerInterval = null; }
}

function updateTimerDisplay() {
  const pct = (timerRemaining / TIMER_SEC) * 100;
  el.timerBar.style.width = pct + "%";
  el.timerText.textContent = `${timerRemaining}秒`;
  el.timerBar.style.background =
    timerRemaining <= 10 ? "#ef4444" : timerRemaining <= 20 ? "#f59e0b" : "#22c55e";
}

function timeUp() {
  if (isAnswering) return;
  isAnswering = true;
  SoundEngine.playTimeUp();
  const q = getActiveQuestions()[state.shuffledIndices[state.current]];
  highlightChoices(-1);
  state.stageTotal += 1;
  state.combo = 0;
  updateStats(q.theme, false);
  let msg = "";
  if (!state.reviewMode) {
    if (isBossQuestion()) {
      state.hp = 0;
      msg = `⏰ 時間切れです。最終問題のため、このステージは終了し、コンディションは0になりました。\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    } else {
      const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg = `⏰ 時間切れです。コンディション -${damage}\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    }
    saveWrongAnswer(q.id);
  } else {
    msg = `⏰ 時間切れ！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
  }
  state.current += 1;
  setTimeout(() => handleAfterAnswer(msg, false), 700);
}

function highlightChoices(selectedDisplayIdx) {
  Array.from(el.choices.querySelectorAll("button")).forEach((btn, i) => {
    btn.disabled = true;
    if (i === currentCorrectIdx)       btn.classList.add("choice-correct");
    else if (i === selectedDisplayIdx) btn.classList.add("choice-wrong");
  });
}

// ── 問題管理 ──────────────────────────────────────
function getStageQuestions() {
  const stageId = STAGES[state.stageIndex].id;
  return allQuestions.filter(q => q.stage === stageId);
}

function getActiveQuestions() {
  return state.reviewMode ? state.reviewPool : getStageQuestions();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffledIndices() {
  const qs = getActiveQuestions();
  if (state.reviewMode) {
    state.shuffledIndices = shuffle([...Array(qs.length).keys()]);
  } else {
    const perRun = STAGES[state.stageIndex].questionsPerRun;
    state.shuffledIndices = shuffle([...Array(qs.length).keys()]).slice(0, perRun);
  }
}

/** @returns {boolean} ストーリー画面を表示した（この後はユーザーの開始操作待ち） */
function showStageIntro() {
  const story = STAGES[state.stageIndex].story;
  if (!story) {
    state.stageIntroPending = false;
    return false;
  }
  const introChapter = document.getElementById("introChapter");
  const introScene = document.getElementById("introScene");
  const introNarrative = document.getElementById("introNarrative");
  const introSkillsList = document.getElementById("introSkillsList");
  const introFinalHint = document.getElementById("introFinalHint");

  // ストーリー用DOMが無い環境ではイントロをスキップし、同じ呼び出しでクイズへ進める
  if (!el.stageIntroSection || !introChapter || !introScene || !introNarrative || !introSkillsList || !introFinalHint) {
    state.stageIntroPending = false;
    return false;
  }

  introChapter.textContent = story.chapter;
  introScene.textContent = story.scene;
  introNarrative.textContent = story.narrative;
  introSkillsList.innerHTML = story.skills.map(s => `<li>${s}</li>`).join("");
  introFinalHint.textContent = story.bossHint;
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.add("hidden");
  el.stageIntroSection.classList.remove("hidden");
  return true;
}

function isBossQuestion() {
  if (state.reviewMode) return false;
  return state.current === STAGES[state.stageIndex].questionsPerRun - 1;
}

function currentRole() {
  if (state.cleared) return CLEARED_ROLE;
  return STAGES[state.stageIndex].role;
}

// ── セーブ ────────────────────────────────────────
function saveState() {
  if (!state.reviewMode) localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try { Object.assign(state, JSON.parse(raw)); return true; } catch { return false; }
}

// ── ② 復習リスト ──────────────────────────────────
function getWrongAnswers() {
  try { return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]"); } catch { return []; }
}

function saveWrongAnswer(id) {
  const list = getWrongAnswers();
  if (!list.includes(id)) list.push(id);
  localStorage.setItem(WRONG_KEY, JSON.stringify(list));
  updateReviewBtn();
}

function removeWrongAnswer(id) {
  localStorage.setItem(WRONG_KEY, JSON.stringify(getWrongAnswers().filter(x => x !== id)));
  updateReviewBtn();
}

function updateReviewBtn() {
  const count = getWrongAnswers().length;
  el.reviewCount.textContent = count;
  el.reviewBtn.classList.toggle("hidden", count === 0);
}

// ── ⑧ ステージ進捗 ────────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{"maxStageCleared":-1}'); }
  catch { return { maxStageCleared: -1 }; }
}

function updateProgress(clearedStageIndex) {
  const prog = getProgress();
  if (clearedStageIndex > prog.maxStageCleared) {
    prog.maxStageCleared = clearedStageIndex;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(prog));
  }
}

function renderStageMap() {
  const { maxStageCleared } = getProgress();
  el.stageMapGrid.innerHTML = STAGES.map((s, i) => {
    let cls, status;
    if (i <= maxStageCleared)            { cls = "cleared";   status = "✅ 修了済"; }
    else if (i === maxStageCleared + 1)  { cls = "available"; status = "▶ 受講可能"; }
    else                                 { cls = "locked";    status = "🔒"; }
    return `
      <div class="stage-node ${cls}">
        <div class="stage-node-num">Stage ${i + 1}</div>
        <div class="stage-node-name">${s.name}</div>
        <div class="stage-node-role">${s.role}</div>
        <div class="stage-node-status">${status}</div>
      </div>`;
  }).join("");
}

// ── ⑤ 正答率統計 ──────────────────────────────────
function getStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || "{}"); } catch { return {}; }
}

function updateStats(theme, correct) {
  const stats = getStats();
  if (!stats[theme]) stats[theme] = { correct: 0, total: 0 };
  stats[theme].total += 1;
  if (correct) stats[theme].correct += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function renderStats() {
  const stats   = getStats();
  const entries = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
  if (entries.length === 0) {
    el.statsContent.innerHTML = '<p class="stats-empty">まだデータがありません。研修を進めると蓄積されます。</p>';
    return;
  }
  el.statsContent.innerHTML = entries.map(([theme, { correct, total }]) => {
    const pct   = Math.round((correct / total) * 100);
    const color = pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444";
    return `
      <div class="stats-row">
        <div class="stats-theme">${theme}</div>
        <div class="stats-bar-bg">
          <div class="stats-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="stats-label">${correct}/${total}問 (${pct}%)</div>
      </div>`;
  }).join("");
}

// ── UI更新 ────────────────────────────────────────
function updateStatus() {
  const perRun = state.shuffledIndices.length || STAGES[state.stageIndex].questionsPerRun;
  el.sName.textContent     = state.name;
  el.sRole.textContent     = currentRole();
  el.sLv.textContent       = String(state.lv);
  el.sHp.textContent       = state.reviewMode ? "—" : String(state.hp);
  el.sExp.textContent      = state.reviewMode ? "—" : String(state.exp);
  el.sProgress.textContent = `${Math.min(state.current, perRun)}/${perRun}`;
  el.sStage.textContent    = state.reviewMode
    ? "復習モード"
    : `Stage ${state.stageIndex + 1}/${STAGES.length} ${STAGES[state.stageIndex].name}`;
}

// ── パネル切替 ────────────────────────────────────
const panels = ["rankingSection", "stageMapSection", "statsSection"];

function showPanel(panelId) {
  const target  = document.getElementById(panelId);
  const wasHidden = target.classList.contains("hidden");
  panels.forEach(id => document.getElementById(id).classList.add("hidden"));
  if (wasHidden) target.classList.remove("hidden");
}

// ── 問題表示 ──────────────────────────────────────
function showQuestion() {
  if (!state.reviewMode && state.stageIntroPending) {
    const showedIntro = showStageIntro();
    if (showedIntro) return;
  }

  isAnswering = false;
  const qs = getActiveQuestions();
  if (!qs.length) {
    clearTimer();
    el.quizSection.classList.remove("hidden");
    el.resultSection.classList.add("hidden");
    if (el.questionText) {
      el.questionText.textContent = "このステージに出題できる問題がありません。questions.json を確認してください。";
    }
    if (el.choices) el.choices.innerHTML = "";
    return;
  }
  if (!state.shuffledIndices || state.shuffledIndices.length === 0) buildShuffledIndices();
  if (state.current >= state.shuffledIndices.length) state.current = 0;
  const q = qs[state.shuffledIndices[state.current]];
  if (!q) {
    clearTimer();
    el.quizSection.classList.remove("hidden");
    if (el.questionText) {
      el.questionText.textContent = "問題の読み込みに失敗しました。ページを再読み込みするか、セーブを消してやり直してください。";
    }
    if (el.choices) el.choices.innerHTML = "";
    return;
  }

  el.quizSection.classList.remove("hidden");
  el.resultSection.classList.add("hidden");
  el.nextBtn.textContent = "次へ";
  el.shareBtn.classList.add("hidden");


  if (!state.reviewMode && state.combo >= 2) {
    const mult = comboMultiplier(state.combo);
    el.comboDisplay.textContent = `連続正解 ${state.combo} ×${mult.toFixed(1)}`;
    el.comboDisplay.classList.remove("hidden");
  } else {
    el.comboDisplay.classList.add("hidden");
  }

  const isBoss = isBossQuestion();
  el.fatalWarning.classList.toggle("hidden", !isBoss);
  if (isBoss) setTimeout(() => SoundEngine.playFatalWarning(), 300);
  el.questionText.textContent = `Q${state.current + 1}${state.reviewMode ? " [復習]" : ""}${isBoss ? " [最終問題]" : ""} [${q.theme}] ${q.text}`;
  el.choices.innerHTML = "";

  const choiceOrder    = shuffle([...Array(q.choices.length).keys()]);
  currentCorrectIdx    = choiceOrder.indexOf(q.answer);

  choiceOrder.forEach((origIdx, displayIdx) => {
    const b = document.createElement("button");
    b.className   = "choice-btn";
    b.textContent = `${displayIdx + 1}. ${q.choices[origIdx]}`;
    b.addEventListener("click", () => answerQuestion(displayIdx));
    el.choices.appendChild(b);
  });

  startTimer();
  saveState();
}

// ── 回答処理 ──────────────────────────────────────
function answerQuestion(selected) {
  if (isAnswering) return;
  isAnswering = true;
  clearTimer();

  const q       = getActiveQuestions()[state.shuffledIndices[state.current]];
  const correct = selected === currentCorrectIdx;
  highlightChoices(selected);
  updateStats(q.theme, correct);
  state.stageTotal += 1;
  let msg = "";

  if (correct) SoundEngine.playCorrect();
  else SoundEngine.playWrong();

  if (state.reviewMode) {
    if (correct) {
      state.reviewCorrect += 1;
      removeWrongAnswer(q.id);
      msg += "✅ 正解！ 復習リストから削除しました\n";
    } else {
      msg += "❌ 不正解\n";
      msg += `正解: ${q.choices[q.answer]}\n`;
    }
    msg += `解説: ${q.explanation}`;
    state.current += 1;
    setTimeout(() => handleAfterAnswer(msg, correct), 700);
    return;
  }

  if (correct) {
    state.combo += 1;
    const mult    = comboMultiplier(state.combo);
    const speed   = speedBonus(timerRemaining);
    const baseExp = EXP_PER_STAGE[state.stageIndex] ?? 10;
    const d       = questionDifficulty(q);
    const stageNum = state.stageIndex + 1;
    const diffAlign = Math.min(1.15, Math.max(0.85, d / stageNum));
    const gained  = Math.floor(baseExp * mult * diffAlign);
    const bonus   = Math.floor(baseExp * speed * diffAlign);
    state.exp    += gained + bonus;
    state.stageCorrect += 1;
    msg += `✅ 正解！ 習熟pt +${gained}`;
    if (state.combo >= 2) { msg += ` （連続正解 ${state.combo} ×${mult.toFixed(1)}）`; setTimeout(() => SoundEngine.playCombo(state.combo), 160); }
    if (bonus > 0)        msg += ` ⚡ 速答ボーナス +${bonus}`;
    msg += "\n";
    while (state.exp >= state.lv * 50) {
      state.lv += 1;
      msg += `⬆️ 段階が上がりました（段階 ${state.lv}）\n`;
    }
  } else {
    state.combo = 0;
    saveWrongAnswer(q.id);
    if (isBossQuestion()) {
      state.hp = 0;
      msg += `最終問題で誤答のため、このステージは終了し、コンディションは0になりました。\n`;
    } else {
        const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg += `❌ 不正解です。コンディション -${damage}\n`;
    }
    msg += `正解: ${q.choices[q.answer]}\n`;
  }

  msg += `解説: ${q.explanation}`;
  state.current += 1;
  setTimeout(() => handleAfterAnswer(msg, correct), 700);
}

// ── 結果処理 ──────────────────────────────────────
function handleAfterAnswer(msg, correct) {
  const perRun = state.shuffledIndices.length;

  if (state.reviewMode) {
    if (state.current >= perRun) {
      msg += `\n\n📚 復習完了！ ${state.reviewCorrect}/${perRun}問 正解`;
      msg += "\n正解した問題は復習リストから削除されました。";
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
      el.shareBtn.classList.add("hidden");
    } else {
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");
      el.shareBtn.classList.add("hidden");
    }
    el.scoreBanner.classList.add("hidden");
    finishResult(msg);
    return;
  }

  if (state.hp <= 0) {
    state.gameOver = true;
    const score = calcScore();
    state.totalScore = score;
    saveRanking(state.name, score, "セッション終了");
    SoundEngine.stopBgm();
    setTimeout(() => SoundEngine.playGameOver(), 200);
    msg += `\n\nセッションはここまでです（コンディション0）。\nスコア: ${score}`;
    el.nextBtn.classList.add("hidden");
    el.restartBtn.classList.remove("hidden");
    setShareText(buildShareTextGameOver(score));

  } else if (state.current >= perRun) {
    const grade = calcGrade(state.stageCorrect, state.stageTotal, state.hp, state.stageStartHp);

    if (state.stageIndex < STAGES.length - 1) {
      const clearedIdx   = state.stageIndex;
      const clearedStage = STAGES[clearedIdx];
      const nextRole     = STAGES[state.stageIndex + 1].role;
      updateProgress(clearedIdx);
      SoundEngine.playStageClear();
      showStageClearOverlay(clearedIdx + 1, nextRole, grade.label, false);
      if (clearedStage.story?.clearStory) msg += `\n\n${clearedStage.story.clearStory}`;
      msg += `\n\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n次のステージ: ${STAGES[state.stageIndex + 1].name}`;
      msg += `\n次の役職ステージ: ${nextRole} / 補助ヒント枠 +1`;
      el.shareBtn.classList.add("hidden");

      state.stageIndex += 1;
      state.current = 0;

      state.combo   = 0;
      state.stageCorrect = 0;
      state.stageTotal   = 0;
      state.stageStartHp = state.hp;
      state.stageIntroPending = true;
      buildShuffledIndices();
      el.nextBtn.textContent = "次のステージを開始";
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");

    } else {
      updateProgress(state.stageIndex);
      state.cleared = true;
      const score = calcScore();
      state.totalScore = score;
      saveRanking(state.name, score, grade.label);
      SoundEngine.stopBgm();
      SoundEngine.playFullClear();
      showStageClearOverlay(STAGES.length, CLEARED_ROLE, grade.label, true);
      msg += `\n\n——全ステージを修了し、最終役職としてCLOを想定した評価ラインに到達しました。\n継続的な学習と、実務での検証をおすすめします。`;
      msg += `\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n最終スコア: ${score}`;
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
      setShareText(buildShareTextFullClear(grade.label, score));
    }
  } else {
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.add("hidden");
    el.shareBtn.classList.add("hidden");
  }

  if (state.gameOver || state.cleared) {
    el.scoreBanner.classList.remove("hidden");
    el.scoreBanner.classList.toggle("gameover", state.gameOver);
    el.scoreBannerLabel.textContent = state.gameOver ? "セッション終了 ／ 総合スコア" : "総合スコア";
    el.scoreBannerValue.textContent = `${state.totalScore} pt`;
  } else {
    el.scoreBanner.classList.add("hidden");
  }

  finishResult(msg);
  saveState();
}

function finishResult(msg) {
  updateStatus();
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.remove("hidden");
  el.resultText.textContent = msg;
}

// ── ③ シェア ──────────────────────────────────────
function setShareText(text) {
  el.shareBtn.classList.remove("hidden");
  el.shareBtn.dataset.text = text;
}

function buildShareTextStageClear(stageNum, grade, correct, total) {
  return `法務クイズ研修\nStage ${stageNum}「${STAGES[stageNum - 1].name}」修了\n評価: ${grade} / 正答率: ${correct}/${total}\n役職ステージ: ${STAGES[Math.min(stageNum, STAGES.length - 1)].role}\n#法務クイズ研修`;
}

function buildShareTextFullClear(grade, score) {
  return `法務クイズ研修 全ステージ修了\n最終役職ライン: ${CLEARED_ROLE}\n評価: ${grade} / スコア: ${score}pt\n#法務クイズ研修`;
}

function buildShareTextGameOver(score) {
  return `法務クイズ研修\nStage ${state.stageIndex + 1}でセッション終了\nスコア: ${score}pt\n再チャレンジ歓迎 #法務クイズ研修`;
}

function buildShareTextReview(correct, total) {
  return `法務クイズ研修 復習モード\n${correct}/${total}問 正解 #法務クイズ研修`;
}

// ── ステージクリア演出 ─────────────────────────────
function showStageClearOverlay(stageNum, newRole, grade, isFinal) {
  const gradeColors = { S: "#fef08a", A: "#bfdbfe", B: "#bbf7d0", C: "#d1d5db" };
  el.stageClearNum.textContent   = isFinal ? "全ステージ修了" : `Stage ${stageNum} 修了`;
  el.stageClearRole.textContent  = isFinal ? `最終役職ライン: ${newRole}` : `次の役職ステージ: ${newRole}`;
  el.stageClearGrade.textContent = `評価 ${grade}`;
  el.stageClearGrade.style.color = gradeColors[grade] || "#e2e8f0";
  el.stageClearOverlay.classList.remove("hidden");
  setTimeout(() => el.stageClearOverlay.classList.add("hidden"), 2800);
}

// ── 評価・スコア ───────────────────────────────────
function calcGrade(correct, total, hp, startHp) {
  const accuracy = total > 0 ? correct / total : 0;
  const hpRate   = startHp > 0 ? hp / startHp : 0;
  const combined = accuracy * 0.7 + hpRate * 0.3;
  if (combined >= 0.9) return { label: "S", reason: "正答率とコンディションがともに高水準" };
  if (combined >= 0.75) return { label: "A", reason: "高い理解度" };
  if (combined >= 0.55) return { label: "B", reason: "達成基準を満たす水準" };
  return { label: "C", reason: "復習を推奨" };
}

function calcScore() {
  return state.exp * 10 + state.hp * 5 + state.lv * 50 + (state.stageIndex + 1) * 200;
}

// ── ランキング ─────────────────────────────────────
function saveRanking(name, score, grade) {
  let ranking = [];
  try { ranking = JSON.parse(localStorage.getItem(RANKING_KEY) || "[]"); } catch {}
  ranking.push({ name, score, grade, date: new Date().toLocaleDateString("ja-JP") });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking.slice(0, 10)));
}

function renderRanking() {
  let ranking = [];
  try { ranking = JSON.parse(localStorage.getItem(RANKING_KEY) || "[]"); } catch {}
  if (ranking.length === 0) { el.rankingList.innerHTML = "<p>まだ記録がありません。</p>"; return; }
  const medals = ["🥇", "🥈", "🥉"];
  el.rankingList.innerHTML = ranking.slice(0, 5).map((r, i) =>
    `<div class="ranking-row">${medals[i] || `${i + 1}.`} <span class="ranking-name">${r.name}</span> <span class="ranking-score">${r.score}pt</span> <span class="ranking-grade grade-${r.grade}">${r.grade}</span> <span class="ranking-date">${r.date}</span></div>`
  ).join("");
}


// ── ゲーム開始・終了 ───────────────────────────────
function startGame() {
  if (!questionsReady || !allQuestions || allQuestions.length === 0) {
    alert("問題を読み込み中です。数秒待ってからもう一度開始してください。");
    return;
  }
  const name = el.playerName.value.trim();
  if (!name) { alert("受講者名を入力してください。"); return; }
  Object.assign(state, {
    name, hp: 100, exp: 0, lv: 1,
    stageIndex: 0, current: 0,
    gameOver: false, cleared: false, combo: 0,
    stageIntroPending: true,
    shuffledIndices: [],
    stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
    reviewMode: false, reviewPool: [], reviewCorrect: 0,
  });
  buildShuffledIndices();
  showGameUI();
  saveState();
}

function startReviewMode() {
  const wrongIds = getWrongAnswers();
  if (wrongIds.length === 0) { alert("復習する問題がありません。"); return; }
  const pool = allQuestions.filter(q => wrongIds.includes(q.id));
  if (pool.length === 0) { alert("問題データが見つかりません。"); return; }
  const name = el.playerName.value.trim() || "受講者";
  Object.assign(state, {
    name, reviewMode: true, reviewPool: pool, reviewCorrect: 0,
    current: 0, shuffledIndices: [],
    gameOver: false, cleared: false, combo: 0, stageIntroPending: false,
  });
  buildShuffledIndices();
  showGameUI();
}

function showGameUI() {
  el.startSection.classList.add("hidden");
  panels.forEach(id => document.getElementById(id).classList.add("hidden"));
  el.statusSection.classList.remove("hidden");
  updateStatus();
  SoundEngine.startBgm();
  showQuestion();
}

function restartGame() {
  clearTimer();
  SoundEngine.stopBgm();
  localStorage.removeItem(SAVE_KEY);
  el.playerName.value = "";
  el.startSection.classList.remove("hidden");
  ["statusSection","quizSection","resultSection","stageIntroSection"].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.classList.add("hidden");
  });
  updateReviewBtn();
}

function resumeOrShowStart() {
  updateReviewBtn();
  if (!loadState() || !state.name || state.reviewMode) return;
  if (!state.shuffledIndices || state.shuffledIndices.length === 0) buildShuffledIndices();
  const resume = confirm("保存データがあります。続きから再開しますか？");
  if (!resume) { localStorage.removeItem(SAVE_KEY); return; }
  el.playerName.value = state.name;
  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  updateStatus();
  const perRun = state.shuffledIndices.length;
  if (state.current < perRun && !state.gameOver && !state.cleared) {
    showQuestion();
  } else {
    el.resultSection.classList.remove("hidden");
    el.resultText.textContent = "続きデータを読み込みました。次へ進んでください。";
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.remove("hidden");
  }
}

// ── イベント ──────────────────────────────────────
el.startBtn.addEventListener("click", startGame);
el.playerName.addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });
el.nextBtn.addEventListener("click", showQuestion);
{
  const introStartBtn = document.getElementById("introStartBtn");
  if (introStartBtn) {
    introStartBtn.addEventListener("click", () => {
      if (el.stageIntroSection) el.stageIntroSection.classList.add("hidden");
      state.stageIntroPending = false;
      showQuestion();
    });
  }
}
el.restartBtn.addEventListener("click", restartGame);

el.reviewBtn.addEventListener("click", startReviewMode);

el.showRankingBtn.addEventListener("click", () => { renderRanking(); showPanel("rankingSection"); });
el.clearRankingBtn.addEventListener("click", () => {
  if (confirm("ランキングを全件削除しますか？")) { localStorage.removeItem(RANKING_KEY); renderRanking(); }
});

el.stageMapBtn.addEventListener("click", () => { renderStageMap(); showPanel("stageMapSection"); });

el.statsBtn.addEventListener("click", () => { renderStats(); showPanel("statsSection"); });
el.clearStatsBtn.addEventListener("click", () => {
  if (confirm("統計データをリセットしますか？")) { localStorage.removeItem(STATS_KEY); renderStats(); }
});

document.querySelectorAll("[data-close-panel]").forEach(btn => {
  btn.addEventListener("click", () => panels.forEach(id => document.getElementById(id).classList.add("hidden")));
});

{
  const soundBtn = document.getElementById("soundToggleBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const muted = SoundEngine.toggleMute();
      soundBtn.textContent = muted ? "🔇" : "🔊";
    });
  }
}

el.shareBtn.addEventListener("click", () => {
  const text = el.shareBtn.dataset.text || "";
  navigator.clipboard.writeText(text).then(() => {
    el.shareBtn.textContent = "✅ コピーしました！";
    el.shareBtn.classList.add("copied");
    setTimeout(() => { el.shareBtn.textContent = "📋 結果をコピー"; el.shareBtn.classList.remove("copied"); }, 2000);
  }).catch(() => { prompt("以下のテキストをコピーしてください：", text); });
});

// ── データ読み込み ─────────────────────────────────
fetch("questions.json")
  .then(r => r.json())
  .then(questions => {
    allQuestions = questions;
    questionsReady = true;
    if (el.startBtn) {
      el.startBtn.disabled = false;
      el.startBtn.textContent = el.startBtn.dataset.readyLabel || "▶ 開始";
    }
    resumeOrShowStart();
  })
  .catch(() => {
    if (el.startBtn) {
      el.startBtn.disabled = true;
      el.startBtn.textContent = "⚠ 読み込み失敗";
    }
    document.body.innerHTML =
      "<p style='color:#f87171;padding:2rem;font-family:sans-serif'>" +
      "questions.json の読み込みに失敗しました。<br>" +
      "ローカルサーバー経由でアクセスしてください。<br>" +
      "<small>例: npx serve . または VS Code Live Server</small></p>";
  });
