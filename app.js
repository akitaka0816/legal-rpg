// ステージ定義 — ここに追加するだけで新ステージが増える
const STAGES = [
  { id: 1, name: "入門編",   role: "新入社員",        questionsPerRun: 5 },
  { id: 2, name: "法務基礎", role: "法務アシスタント", questionsPerRun: 5 },
  { id: 3, name: "応用実務", role: "法務担当",         questionsPerRun: 5 },
  { id: 4, name: "実践編",   role: "シニア法務担当",   questionsPerRun: 5 },
  { id: 5, name: "上級編",   role: "法務リーダー",     questionsPerRun: 5 },
  { id: 6, name: "最終試験", role: "法務マネージャー", questionsPerRun: 5 },
];
const CLEARED_ROLE = "法務責任者";

// ステージごとの基本EXP
const EXP_PER_STAGE = [10, 15, 20, 30, 40, 50];

function comboMultiplier(combo) {
  if (combo >= 4) return 2.5;
  if (combo >= 3) return 2.0;
  if (combo >= 2) return 1.5;
  return 1.0;
}

const SAVE_KEY = "legal_rpg_save_v3";
const RANKING_KEY = "legal_rpg_ranking_v1";
const TIMER_SEC = 30;

let allQuestions = [];

const state = {
  name: "",
  hp: 100,
  exp: 0,
  lv: 1,
  stageIndex: 0,
  current: 0,
  hints: 1,
  items: { roppo: false, hanrei: false, ai: false },
  gameOver: false,
  cleared: false,
  combo: 0,
  shuffledIndices: [],
  stageCorrect: 0,
  stageTotal: 0,
  stageStartHp: 100,
  totalScore: 0,
};

const el = {
  startSection:    document.getElementById("startSection"),
  statusSection:   document.getElementById("statusSection"),
  quizSection:     document.getElementById("quizSection"),
  resultSection:   document.getElementById("resultSection"),
  itemSection:     document.getElementById("itemSection"),
  rankingSection:  document.getElementById("rankingSection"),
  playerName:      document.getElementById("playerName"),
  startBtn:        document.getElementById("startBtn"),
  showRankingBtn:  document.getElementById("showRankingBtn"),
  clearRankingBtn: document.getElementById("clearRankingBtn"),
  sName:     document.getElementById("sName"),
  sRole:     document.getElementById("sRole"),
  sLv:       document.getElementById("sLv"),
  sHp:       document.getElementById("sHp"),
  sExp:      document.getElementById("sExp"),
  sProgress: document.getElementById("sProgress"),
  sStage:    document.getElementById("sStage"),
  sHint:     document.getElementById("sHint"),
  itemRoppoBtn:  document.getElementById("itemRoppoBtn"),
  itemHanreiBtn: document.getElementById("itemHanreiBtn"),
  itemAIBtn:     document.getElementById("itemAIBtn"),
  itemInfo:      document.getElementById("itemInfo"),
  timerBar:  document.getElementById("timerBar"),
  timerText: document.getElementById("timerText"),
  questionText: document.getElementById("questionText"),
  hintBtn:   document.getElementById("hintBtn"),
  hintText:  document.getElementById("hintText"),
  choices:   document.getElementById("choices"),
  resultText: document.getElementById("resultText"),
  nextBtn:    document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  rankingList: document.getElementById("rankingList"),
  stageClearOverlay: document.getElementById("stageClearOverlay"),
  stageClearNum:     document.getElementById("stageClearNum"),
  stageClearRole:    document.getElementById("stageClearRole"),
  stageClearGrade:   document.getElementById("stageClearGrade"),
  comboDisplay:      document.getElementById("comboDisplay"),
  fatalWarning:      document.getElementById("fatalWarning"),
  scoreBanner:       document.getElementById("scoreBanner"),
  scoreBannerLabel:  document.getElementById("scoreBannerLabel"),
  scoreBannerValue:  document.getElementById("scoreBannerValue"),
};

// ── タイマー ──────────────────────────────────────
let timerInterval = null;
let timerRemaining = TIMER_SEC;
let currentCorrectIdx = 0; // 表示順シャッフル後の正解インデックス

function startTimer() {
  clearTimer();
  timerRemaining = TIMER_SEC;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    updateTimerDisplay();
    if (timerRemaining <= 0) {
      clearTimer();
      timeUp();
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const pct = (timerRemaining / TIMER_SEC) * 100;
  el.timerBar.style.width = pct + "%";
  el.timerText.textContent = `${timerRemaining}秒`;
  if (timerRemaining <= 10) {
    el.timerBar.style.background = "#ef4444";
  } else if (timerRemaining <= 20) {
    el.timerBar.style.background = "#f59e0b";
  } else {
    el.timerBar.style.background = "#22c55e";
  }
}

function timeUp() {
  const q = getStageQuestions()[state.shuffledIndices[state.current]];
  state.stageTotal += 1;
  state.combo = 0;
  let msg = "";
  if (q.fatal) {
    state.hp = 0;
    msg = `⏰ 時間切れ！💀 致命的ミス — HP全消滅！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
  } else {
    const damage = state.items.ai ? 10 : 20;
    state.hp -= damage;
    msg = `⏰ 時間切れ！ HP -${damage}\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
  }
  state.current += 1;
  handleAfterAnswer(msg, false);
}

// ── ステージ・問題管理 ─────────────────────────────
function getStageQuestions() {
  const stageId = STAGES[state.stageIndex].id;
  return allQuestions.filter(q => q.stage === stageId);
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
  const qs = getStageQuestions();
  const perRun = STAGES[state.stageIndex].questionsPerRun;
  state.shuffledIndices = shuffle([...Array(qs.length).keys()]).slice(0, perRun);
}

function currentRole() {
  if (state.cleared) return CLEARED_ROLE;
  return STAGES[state.stageIndex].role;
}

function totalStages() {
  return STAGES.length;
}

// ── セーブ ─────────────────────────────────────────
function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    Object.assign(state, JSON.parse(raw));
    return true;
  } catch {
    return false;
  }
}

// ── UI更新 ─────────────────────────────────────────
function syncItemButtons() {
  el.itemRoppoBtn.disabled  = state.items.roppo;
  el.itemHanreiBtn.disabled = state.items.hanrei;
  el.itemAIBtn.disabled     = state.items.ai;
}

function updateStatus() {
  const perRun = state.shuffledIndices.length || STAGES[state.stageIndex].questionsPerRun;
  el.sName.textContent     = state.name;
  el.sRole.textContent     = currentRole();
  el.sLv.textContent       = String(state.lv);
  el.sHp.textContent       = String(state.hp);
  el.sExp.textContent      = String(state.exp);
  el.sProgress.textContent = `${Math.min(state.current, perRun)}/${perRun}`;
  el.sStage.textContent    = `Stage ${state.stageIndex + 1}/${totalStages()} ${STAGES[state.stageIndex].name}`;
  el.sHint.textContent     = String(state.hints);
  syncItemButtons();
}

// ── 問題表示 ───────────────────────────────────────
function showQuestion() {
  const qs = getStageQuestions();
  const q  = qs[state.shuffledIndices[state.current]];

  el.quizSection.classList.remove("hidden");
  el.resultSection.classList.add("hidden");
  el.hintText.classList.add("hidden");
  el.hintText.textContent = "";

  // コンボ表示
  if (state.combo >= 2) {
    const mult = comboMultiplier(state.combo);
    el.comboDisplay.textContent = `🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`;
    el.comboDisplay.classList.remove("hidden");
  } else {
    el.comboDisplay.classList.add("hidden");
  }

  // 即死問題警告
  el.fatalWarning.classList.toggle("hidden", !q.fatal);

  el.questionText.textContent = `Q${state.current + 1} [${q.theme}] ${q.text}`;
  el.choices.innerHTML = "";

  // 選択肢の表示順をシャッフル
  const choiceOrder = shuffle([...Array(q.choices.length).keys()]);
  currentCorrectIdx = choiceOrder.indexOf(q.answer);

  choiceOrder.forEach((origIdx, displayIdx) => {
    const choice = q.choices[origIdx];
    const b = document.createElement("button");
    b.className = "choice-btn";
    b.textContent = `${displayIdx + 1}. ${choice}`;
    b.addEventListener("click", () => answerQuestion(displayIdx));
    if (state.items.hanrei && origIdx !== q.answer && displayIdx % 2 === 1) {
      b.disabled = true;
      b.textContent = `${displayIdx + 1}. ${choice}（判例DBで除外）`;
    }
    el.choices.appendChild(b);
  });

  startTimer();
  saveState();
}

// ── 回答処理 ───────────────────────────────────────
function answerQuestion(selected) {
  clearTimer();
  const qs = getStageQuestions();
  const q  = qs[state.shuffledIndices[state.current]];
  const correct = selected === currentCorrectIdx;
  let msg = "";

  state.stageTotal += 1;

  if (correct) {
    state.combo += 1;
    const mult = comboMultiplier(state.combo);
    const baseExp = EXP_PER_STAGE[state.stageIndex] ?? 10;
    const gained = Math.floor(baseExp * mult);
    state.exp += gained;
    state.stageCorrect += 1;
    msg += `✅ 正解！ EXP +${gained}`;
    if (state.combo >= 2) msg += ` 🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`;
    msg += "\n";
    if (state.exp >= state.lv * 50) {
      state.lv += 1;
      msg += `⬆️ レベルアップ！ LV${state.lv}\n`;
    }
  } else {
    state.combo = 0;
    if (q.fatal) {
      state.hp = 0;
      msg += `💀 致命的ミス！ HP全消滅！\n`;
    } else {
      const damage = state.items.ai ? 10 : 20;
      state.hp -= damage;
      msg += `❌ 不正解… HP -${damage}\n`;
    }
    msg += `正解: ${q.choices[q.answer]}\n`;
  }

  msg += `解説: ${q.explanation}`;
  state.current += 1;

  handleAfterAnswer(msg, correct);
}

function handleAfterAnswer(msg, correct) {
  const perRun = state.shuffledIndices.length;

  if (state.hp <= 0) {
    state.gameOver = true;
    const score = calcScore();
    state.totalScore = score;
    saveRanking(state.name, score, "ゲームオーバー");
    msg += `\n\nゲームオーバー。法務リスク管理の見直しが必要です。\nスコア: ${score}`;
    el.nextBtn.classList.add("hidden");
    el.restartBtn.classList.remove("hidden");

  } else if (state.current >= perRun) {
    // ステージクリア
    const grade = calcGrade(state.stageCorrect, state.stageTotal, state.hp, state.stageStartHp);

    if (state.stageIndex < STAGES.length - 1) {
      const clearedNum  = state.stageIndex + 1;
      const nextRole    = STAGES[state.stageIndex + 1].role;
      showStageClearOverlay(clearedNum, nextRole, grade.label, false);

      msg += `\n\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n次のステージ: ${STAGES[state.stageIndex + 1].name}`;
      msg += `\n新役職: ${nextRole}`;
      msg += `\nヒント +1 獲得`;

      state.stageIndex += 1;
      state.current = 0;
      state.hints += 1;
      state.combo = 0;
      state.stageCorrect = 0;
      state.stageTotal = 0;
      state.stageStartHp = state.hp;
      buildShuffledIndices();
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");

    } else {
      // 全ステージクリア
      state.cleared = true;
      const score = calcScore();
      state.totalScore = score;
      saveRanking(state.name, score, grade.label);
      showStageClearOverlay(STAGES.length, CLEARED_ROLE, grade.label, true);
      msg += `\n\n法務責任者に就任しました！`;
      msg += `\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n最終スコア: ${score}`;
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
    }
  } else {
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.add("hidden");
  }

  updateStatus();
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.remove("hidden");
  el.resultText.textContent = msg;

  // スコアバナー表示（ゲーム終了時のみ）
  if (state.gameOver || state.cleared) {
    el.scoreBanner.classList.remove("hidden");
    el.scoreBanner.classList.toggle("gameover", state.gameOver);
    el.scoreBannerLabel.textContent = state.gameOver ? "GAME OVER  FINAL SCORE" : "FINAL SCORE";
    el.scoreBannerValue.textContent = `${state.totalScore} pt`;
  } else {
    el.scoreBanner.classList.add("hidden");
  }

  saveState();
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
  if (ranking.length === 0) {
    el.rankingList.innerHTML = "<p>まだ記録がありません。</p>";
    return;
  }
  const medals = ["🥇", "🥈", "🥉"];
  el.rankingList.innerHTML = ranking.slice(0, 5).map((r, i) =>
    `<div class="ranking-row">${medals[i] || `${i + 1}.`} <span class="ranking-name">${r.name}</span> <span class="ranking-score">${r.score}pt</span> <span class="ranking-grade grade-${r.grade}">${r.grade}</span> <span class="ranking-date">${r.date}</span></div>`
  ).join("");
}

// ── ヒント・アイテム ───────────────────────────────
function showHint() {
  if (state.hints <= 0) { alert("ヒント残数がありません。"); return; }
  const q = getStageQuestions()[state.shuffledIndices[state.current]];
  state.hints -= 1;
  el.hintText.textContent = `ヒント: ${q.hint || "法令の趣旨と原則を確認しましょう。"}`;
  el.hintText.classList.remove("hidden");
  updateStatus();
  saveState();
}

function useItem(type) {
  if (state.items[type]) return;
  const msgs = {
    roppo:  "六法を装備しました。ヒント残数 +1。",
    hanrei: "判例DBを装備しました。問題ごとに一部選択肢を除外します。",
    ai:     "生成AIアシストを装備しました。不正解時のHP減少が軽減されます。",
  };
  state.items[type] = true;
  if (type === "roppo") state.hints += 1;
  el.itemInfo.textContent = msgs[type];
  updateStatus();
  saveState();
}

// ── ゲーム開始・リスタート ─────────────────────────
function startGame() {
  const name = el.playerName.value.trim();
  if (!name) { alert("プレイヤー名を入力してください。"); return; }

  Object.assign(state, {
    name, hp: 100, exp: 0, lv: 1,
    stageIndex: 0, current: 0, hints: 1,
    items: { roppo: false, hanrei: false, ai: false },
    gameOver: false, cleared: false, combo: 0,
    shuffledIndices: [],
    stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
  });

  buildShuffledIndices();
  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  el.itemSection.classList.remove("hidden");
  updateStatus();
  showQuestion();
  saveState();
}

function restartGame() {
  clearTimer();
  localStorage.removeItem(SAVE_KEY);
  el.playerName.value = "";
  ["startSection"].forEach(id => document.getElementById(id).classList.remove("hidden"));
  ["statusSection","itemSection","quizSection","resultSection"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

function resumeOrShowStart() {
  if (!loadState() || !state.name) return;
  if (!state.shuffledIndices || state.shuffledIndices.length === 0) buildShuffledIndices();

  const resume = confirm("保存データがあります。続きから再開しますか？");
  if (!resume) { localStorage.removeItem(SAVE_KEY); return; }

  el.playerName.value = state.name;
  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  el.itemSection.classList.remove("hidden");
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

// ── イベント ───────────────────────────────────────
el.startBtn.addEventListener("click", startGame);
el.nextBtn.addEventListener("click", showQuestion);
el.restartBtn.addEventListener("click", restartGame);
el.hintBtn.addEventListener("click", showHint);
el.itemRoppoBtn.addEventListener("click", () => useItem("roppo"));
el.itemHanreiBtn.addEventListener("click", () => useItem("hanrei"));
el.itemAIBtn.addEventListener("click", () => useItem("ai"));

el.showRankingBtn.addEventListener("click", () => {
  renderRanking();
  el.rankingSection.classList.toggle("hidden");
});

el.clearRankingBtn.addEventListener("click", () => {
  if (confirm("ランキングを全件削除しますか？")) {
    localStorage.removeItem(RANKING_KEY);
    renderRanking();
  }
});

// ── データ読み込み ─────────────────────────────────
fetch("questions.json")
  .then(r => r.json())
  .then(questions => {
    allQuestions = questions;
    resumeOrShowStart();
  })
  .catch(() => {
    document.body.innerHTML =
      "<p style='color:#f87171;padding:2rem;font-family:sans-serif'>" +
      "questions.json の読み込みに失敗しました。<br>" +
      "ローカルサーバー経由でアクセスしてください。<br>" +
      "<small>例: npx serve . または VS Code Live Server</small></p>";
  });
