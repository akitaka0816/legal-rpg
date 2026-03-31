// ── ステージ定義 ───────────────────────────────────
const STAGES = [
  {
    id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
    story: {
      chapter: "第一章　法の素養の土台",
      scene: "株式会社ひろせ 法務部 — 入門オリエンテーション",
      narrative: `S課長はホワイトボードに分野名を並べた。

「このステージのクイズでは、まず“言葉と枠組み”をおさえていただきます。
法律用語の整理に加え、会社法・民法・独禁法・不競法の入口、労働法と派遣・職安の前提、そして個人情報の基本線——初日から幅広くお触れいただきます。
難易度は入門ですが、分野はこれからずっとお使いになります。どうか頭の中に地図を描いていただければと思います。」

ここからは、各論点の位置づけを押さえながら、ご挑戦ください。`,
      skills: ["法律用語と論点の整理", "会社法・民法・独禁法・不競法の基礎概念", "労働法・派遣法・職安法と個人情報の入門"],
      bossHint: "第一の試練：用語と多分野の入口（全問イージー）",
      clearStory: `基礎の引き出しが揃った。\nS課長は頷いた。「次は、現場の相談に耐えていただく一般社員の視点でのステージです。引き続きよろしくお願いいたします。」`,
    },
  },
  {
    id: 2, name: "法務基礎", role: "一般社員", questionsPerRun: 5,
    story: {
      chapter: "第二章　業務と法務の接点",
      scene: "法務部 — 一般社員としての研修",
      narrative: `営業部のH部長が、紙ではなく「論点リスト」を机に置いた。

「一般社員の法務は、依頼の奥にある制度を短時間で押さえていただくお仕事です。
このステージのクイズでは、個人情報と職安を軸に、法律用語を一段深め、会計・財務・人事・労務・戦略に触れ、マネジメントの言葉（KPI等）と法リスクをつなげていただきます。
難易度はまだ基礎ではございますが、論点の種類は一気に増えますので、どうかご留意ください。」

現場の言葉と制度の言葉を、同じテーブルにお載せいただけるかどうかが問われます。`,
      skills: ["人事・労務・職安法と採用・派遣の論点整理", "会計・財務・戦略の数字と法リスクの接続", "マネジメント上の意思決定とコンプライアンスのバランス"],
      bossHint: "第二の試練：部門横断の“業務知×法知”",
      clearStory: `相談の型が見えてきた。\n「次は係長としてのステージです。レビューと優先順位の付け方が問われます。引き続きよろしくお願いいたします。」`,
    },
  },
  {
    id: 3, name: "応用実務", role: "係長", questionsPerRun: 5,
    story: {
      chapter: "第三章　レビューと横断の実務",
      scene: "法務部 — 係長としてのスキルセット",
      narrative: `法務課長は、積まれた契約書ではなく「チェック観点の一覧」を差し出した。

「係長の皆さんのクイズでは、契約書審査が前面に出てまいります。
加えて、会社法・民法・独禁法・不競法、金商法の入り口、会計の論点、GDPRと個人情報の実務が同じステージに並びます。
出題は横断いたします。条文の言い回しに慣れ、誤った安心は手放していただければと存じます。難易度は中級でございます。」

レビューと優先順位づけが、ここから本番となります。`,
      skills: ["契約書審査（条項の意図とリスクの言語化）", "会社法・民法・独禁法・不競法・金商法の実務接点", "個人情報・GDPRと会計論点の整理"],
      bossHint: "第三の試練：契約レビュー＋横断法分野（中級・全問同格）",
      clearStory: `論点の優先順位がついた。\n彼女は言った。「次は課長としてのステージです。チームを動かす前提の知識が問われます。どうぞよろしくお願いいたします。」`,
    },
  },
  {
    id: 4, name: "実践編", role: "課長", questionsPerRun: 5,
    story: {
      chapter: "第四章　課としての設計と判断",
      scene: "法務部 — 課長の意思決定",
      narrative: `会議室の画面には、事業計画と法務チェックリストが並んだ。

「課長としての皆さんには、契約レビューの速さだけでなく、人事・労務・会計・戦略と法務を同じ時間軸で組み立てる力が求められます。
独禁・会社法・派遣・財務——出題はバラけることもございますが、根っこは“優先順位と説明責任”でございます。」

このステージのクイズは、課長としての知識の幅と、判断の言語化を試すことになります。`,
      skills: ["契約・民法・会社法を前提にした事業判断の裏付け", "人事・労務・派遣と事業戦略の整合", "独禁法・会計・財務のリスクを経営会議で説明する視点"],
      bossHint: "第四の試練：課長の“説明可能な判断”",
      clearStory: `トレードオフを言葉にできるようになった。\n「次は部長としてのステージです。制度の最前線と、組織を守る設計がございます。引き続きよろしくお願いいたします。」`,
    },
  },
  {
    id: 5, name: "上級編", role: "部長", questionsPerRun: 5,
    story: {
      chapter: "第五章　規制の最前線とガバナンス",
      scene: "法務部長室 — 部長の守備範囲",
      narrative: `CLOが、ESGとデジタル規制の資料を並べた。

「部長としての皆さんのクイズでは、サステナ開示が前面に出ます。CSRDが複数問まとまってお出しします。
そのうえで、EU AI法、GDPR、高度な契約書審査、個人情報の統治、会社法・民法・独禁法・不競法・労働法まで、ガバナンスの束を一気に扱っていただきます。
難易度は上級固定でございます。暗記ではなく、説明の筋を通していただければと存じます。」

制度の変化を、組織の仕組みに落とし込むフェーズです。`,
      skills: ["CSRDを中心とした開示・サステナと法務の関与", "EU AI法・GDPR・契約書審査の前沿", "個人情報・会社法・民法・独禁法・不競法・労働法の統合リスク"],
      bossHint: "第五の試練：CSRD・EU規制・上級ガバナンス（全問ハード）",
      clearStory: `最前線の論点を、社内の意思決定に接続できた。\n「最後はCLOとしてのステージです。経営と資本市場の両面が問われます。どうぞよろしくお願いいたします。」`,
    },
  },
  {
    id: 6, name: "最終試験", role: "CLO", questionsPerRun: 5,
    story: {
      chapter: "最終章　経営に接続する法務",
      scene: "取締役会議室 — CLOとしての総合力",
      narrative: `議長は、一枚のスライドだけを示した。「最終試練は、知識の幅でございます」。

「CLOのクイズでは、EU AI法が複数問続き、デジタル規制の比重が高くなっております。
金商法もセットで来ます。一方で、個人情報、派遣・職安、人事・労務、会計・財務・戦略・マネジメント——経営の歯車全部に法が噛み合います。
難易度は上級固定でございます。バラバラな論点を、一本の方針にお束ねいただけるかどうかが問われます。」

経営判断に耐える説明と、組織を守る設計が、ここで最終確認されることになります。`,
      skills: ["EU AI法と金商法を含む最前線の論点", "個人情報・派遣・職安・人事・労務の組織統治", "会計・財務・戦略・マネジメントと法リスクの統合"],
      bossHint: "最終試練：AI・金融規制・経営横断（全問ハード）",
      clearStory: null,
    },
  },
];
const CLEARED_ROLE  = "CLO";
const EXP_PER_STAGE = [10, 15, 20, 30, 40, 50];

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
      msg = `⏰ 時間切れ！💀 ボス戦敗北 — HP全消滅！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    } else {
      const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg = `⏰ 時間切れ！ HP -${damage}\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
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
  const introBossHint = document.getElementById("introBossHint");

  // ストーリー用DOMが無い環境ではイントロをスキップし、同じ呼び出しでクイズへ進める
  if (!el.stageIntroSection || !introChapter || !introScene || !introNarrative || !introSkillsList || !introBossHint) {
    state.stageIntroPending = false;
    return false;
  }

  introChapter.textContent = story.chapter;
  introScene.textContent = story.scene;
  introNarrative.textContent = story.narrative;
  introSkillsList.innerHTML = story.skills.map(s => `<li>${s}</li>`).join("");
  introBossHint.textContent = story.bossHint;
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
    if (i <= maxStageCleared)            { cls = "cleared";   status = "✅ クリア済"; }
    else if (i === maxStageCleared + 1)  { cls = "available"; status = "▶ 挑戦可能"; }
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
    el.statsContent.innerHTML = '<p class="stats-empty">まだデータがありません。プレイすると蓄積されます。</p>';
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
    el.comboDisplay.textContent = `🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`;
    el.comboDisplay.classList.remove("hidden");
  } else {
    el.comboDisplay.classList.add("hidden");
  }

  const isBoss = isBossQuestion();
  el.fatalWarning.classList.toggle("hidden", !isBoss);
  if (isBoss) setTimeout(() => SoundEngine.playFatalWarning(), 300);
  el.questionText.textContent = `Q${state.current + 1}${state.reviewMode ? " [復習]" : ""}${isBoss ? " [⚔️BOSS]" : ""} [${q.theme}] ${q.text}`;
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
    const gained  = Math.floor(baseExp * mult);
    const bonus   = Math.floor(baseExp * speed);
    state.exp    += gained + bonus;
    state.stageCorrect += 1;
    msg += `✅ 正解！ EXP +${gained}`;
    if (state.combo >= 2) { msg += ` 🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`; setTimeout(() => SoundEngine.playCombo(state.combo), 160); }
    if (bonus > 0)        msg += ` ⚡ 速答ボーナス +${bonus}`;
    msg += "\n";
    while (state.exp >= state.lv * 50) {
      state.lv += 1;
      msg += `⬆️ レベルアップ！ LV${state.lv}\n`;
    }
  } else {
    state.combo = 0;
    saveWrongAnswer(q.id);
    if (isBossQuestion()) {
      state.hp = 0;
      msg += `💀 ボス戦敗北！ HP全消滅！\n`;
    } else {
        const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg += `❌ 不正解… HP -${damage}\n`;
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
    saveRanking(state.name, score, "ゲームオーバー");
    SoundEngine.stopBgm();
    setTimeout(() => SoundEngine.playGameOver(), 200);
    msg += `\n\nゲームオーバー。\nスコア: ${score}`;
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
      msg += `\n新役職: ${nextRole} / ヒント +1 獲得`;
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
      msg += `\n\n——CLOに就任しました。\nあなたの決断と知識が、この会社を守り続けてきた。\n数々の試練を乗り越えたあなたは、今まさに法務の頂点に立つ。`;
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
    el.scoreBannerLabel.textContent = state.gameOver ? "GAME OVER  FINAL SCORE" : "FINAL SCORE";
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
  return `🎮 法務RPG\nStage ${stageNum}「${STAGES[stageNum - 1].name}」クリア！\n評価: ${grade} / 正答率: ${correct}/${total}\n役職: ${STAGES[Math.min(stageNum, STAGES.length - 1)].role}\n#法務RPG`;
}

function buildShareTextFullClear(grade, score) {
  return `🏆 法務RPG 全ステージクリア！\n最終役職: ${CLEARED_ROLE}\n評価: ${grade} / スコア: ${score}pt\n#法務RPG`;
}

function buildShareTextGameOver(score) {
  return `🎮 法務RPG\nStage ${state.stageIndex + 1}でゲームオーバー…\nスコア: ${score}pt\nリベンジ挑戦中！ #法務RPG`;
}

function buildShareTextReview(correct, total) {
  return `📚 法務RPG 復習モード\n${correct}/${total}問 正解！ #法務RPG`;
}

// ── ステージクリア演出 ─────────────────────────────
function showStageClearOverlay(stageNum, newRole, grade, isFinal) {
  const gradeColors = { S: "#fef08a", A: "#bfdbfe", B: "#bbf7d0", C: "#d1d5db" };
  el.stageClearNum.textContent   = isFinal ? "全ステージクリア！" : `Stage ${stageNum} クリア！`;
  el.stageClearRole.textContent  = isFinal ? `🏆 ${newRole} に就任！` : `新役職: ${newRole}`;
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
  if (combined >= 0.9) return { label: "S", reason: "完璧な法務判断力" };
  if (combined >= 0.75) return { label: "A", reason: "優秀な成績" };
  if (combined >= 0.55) return { label: "B", reason: "合格水準" };
  return { label: "C", reason: "要復習" };
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
  if (!name) { alert("プレイヤー名を入力してください。"); return; }
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
  const name = el.playerName.value.trim() || "プレイヤー";
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
