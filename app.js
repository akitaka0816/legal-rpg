// ── ステージ定義 ───────────────────────────────────
const STAGES = [
  { id: 1, name: "入門編",   role: "新入社員",        questionsPerRun: 5 },
  { id: 2, name: "法務基礎", role: "法務アシスタント", questionsPerRun: 5 },
  { id: 3, name: "応用実務", role: "法務担当",         questionsPerRun: 5 },
  { id: 4, name: "実践編",   role: "シニア法務担当",   questionsPerRun: 5 },
  { id: 5, name: "上級編",   role: "法務リーダー",     questionsPerRun: 5 },
  { id: 6, name: "最終試験", role: "法務マネージャー", questionsPerRun: 5 },
];
const CLEARED_ROLE = "法務責任者";
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

const SAVE_KEY    = "legal_rpg_save_v3";
const RANKING_KEY = "legal_rpg_ranking_v1";
const WRONG_KEY   = "legal_rpg_wrong_v1";   // ② 復習用
const STATS_KEY   = "legal_rpg_stats_v1";
const TIMER_SEC   = 30;
const QUESTION_EVENTS = [
  { id: "focus", label: "集中モード", text: "この問題はEXPボーナス +20%", expRate: 1.2, damageReduction: 0, timerDelta: 0 },
  { id: "guard", label: "守りの構え", text: "この問題は被ダメージ -5", expRate: 1.0, damageReduction: 5, timerDelta: 0 },
  { id: "rush", label: "緊急対応", text: "この問題は制限時間 -5秒 / EXP +30%", expRate: 1.3, damageReduction: 0, timerDelta: -5 },
];
const ACHIEVEMENTS = {
  combo3: { key: "combo3", label: "🔥 3コンボ達成" },
  fatalClear: { key: "fatalClear", label: "💀 即死問題クリア" },
  noDamageStage: { key: "noDamageStage", label: "🛡 ノーダメージステージ" },
};

let allQuestions = [];

const state = {
  name: "",
  hp: 100, exp: 0, lv: 1,
  stageIndex: 0, current: 0,
  gameOver: false, cleared: false, combo: 0,
  achievements: [],
  achievementMap: {},
  currentEvent: null,
  shuffledIndices: [],
  stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
  // ② 復習モード
  reviewMode: false,
  reviewPool: [],
  reviewCorrect: 0,
  practiceMode: false,
  practiceTheme: "",
};

const el = {
  startSection:    document.getElementById("startSection"),
  statusSection:   document.getElementById("statusSection"),
  quizSection:     document.getElementById("quizSection"),
  resultSection:   document.getElementById("resultSection"),
  rankingSection:  document.getElementById("rankingSection"),
  playerName:      document.getElementById("playerName"),
  startBtn:        document.getElementById("startBtn"),
  showRankingBtn:  document.getElementById("showRankingBtn"),
  clearRankingBtn: document.getElementById("clearRankingBtn"),
  reviewBtn:       document.getElementById("reviewBtn"),
  reviewCount:     document.getElementById("reviewCount"),
  stageMapBtn:     document.getElementById("stageMapBtn"),
  statsBtn:        document.getElementById("statsBtn"),
  themeBtn:        document.getElementById("themeBtn"),
  stageMapSection: document.getElementById("stageMapSection"),
  statsSection:    document.getElementById("statsSection"),
  themePracticeSection: document.getElementById("themePracticeSection"),
  stageMapGrid:    document.getElementById("stageMapGrid"),
  statsContent:    document.getElementById("statsContent"),
  clearStatsBtn:   document.getElementById("clearStatsBtn"),
  themeGrid:       document.getElementById("themeGrid"),
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
  resultText:    document.getElementById("resultText"),
  nextBtn:       document.getElementById("nextBtn"),
  restartBtn:    document.getElementById("restartBtn"),
  shareBtn:      document.getElementById("shareBtn"),
  rankingList:   document.getElementById("rankingList"),
  stageClearOverlay: document.getElementById("stageClearOverlay"),
  stageClearNum:     document.getElementById("stageClearNum"),
  stageClearRole:    document.getElementById("stageClearRole"),
  stageClearGrade:   document.getElementById("stageClearGrade"),
  comboDisplay:  document.getElementById("comboDisplay"),
  fatalWarning:  document.getElementById("fatalWarning"),
  scoreBanner:      document.getElementById("scoreBanner"),
  scoreBannerLabel: document.getElementById("scoreBannerLabel"),
  scoreBannerValue: document.getElementById("scoreBannerValue"),
  achievementList:  document.getElementById("achievementList"),
  eventInfo:        document.getElementById("eventInfo"),
};

// ── タイマー ──────────────────────────────────────
let timerInterval = null;
let timerRemaining = TIMER_SEC;
let currentTimerSec = TIMER_SEC;
let currentCorrectIdx = 0;
let isAnswering = false;

function startTimer() {
  clearTimer();
  timerRemaining = currentTimerSec;
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
  const pct = (timerRemaining / Math.max(1, currentTimerSec)) * 100;
  el.timerBar.style.width = pct + "%";
  el.timerText.textContent = `${timerRemaining}秒`;
  el.timerBar.style.background =
    timerRemaining <= 10 ? "#ef4444" : timerRemaining <= 20 ? "#f59e0b" : "#22c55e";
}

function timeUp() {
  if (isAnswering) return;
  isAnswering = true;
  const q = getActiveQuestions()[state.shuffledIndices[state.current]];

  // ① 正解ボタンを光らせてから結果へ
  highlightChoices(-1);

  state.stageTotal += 1;
  state.combo = 0;

  let msg = "";
  const event = state.currentEvent || { damageReduction: 0 };
  if (!state.reviewMode) {
    if (q.fatal) {
      state.hp = 0;
      msg = `⏰ 時間切れ！💀 致命的ミス — HP全消滅！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    } else {
      const damage = Math.max(1, 20 - (event.damageReduction || 0));
      state.hp = Math.max(0, state.hp - damage);
      msg = `⏰ 時間切れ！ HP -${damage}\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    }
    // ② 時間切れも間違えた問題として記録
    saveWrongAnswer(q.id);
  } else {
    msg = `⏰ 時間切れ！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
  }

  state.current += 1;
  setTimeout(() => handleAfterAnswer(msg, false), 700);
}

// ① ボタンハイライト（selectedDisplayIdx=-1 は時間切れ）
function highlightChoices(selectedDisplayIdx) {
  const buttons = Array.from(el.choices.querySelectorAll("button"));
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === currentCorrectIdx) btn.classList.add("choice-correct");
    else if (i === selectedDisplayIdx) btn.classList.add("choice-wrong");
  });
}

// ── 問題管理 ──────────────────────────────────────
function getStageQuestions() {
  const stageId = STAGES[state.stageIndex].id;
  return allQuestions.filter(q => q.stage === stageId);
}

// ② 復習モードはreviewPool、通常はステージ問題
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
  try {
    Object.assign(state, JSON.parse(raw));
    if (!Array.isArray(state.achievements)) state.achievements = [];
    if (!state.achievementMap || typeof state.achievementMap !== "object") state.achievementMap = {};
    if (!state.currentEvent) state.currentEvent = null;
    if (typeof state.practiceMode !== "boolean") state.practiceMode = false;
    if (typeof state.practiceTheme !== "string") state.practiceTheme = "";
    return true;
  } catch {
    return false;
  }
}

// ── ② 復習リスト管理 ──────────────────────────────
function getWrongAnswers() {
  try { return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]"); } catch { return []; }
}

function getThemeStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || "{}"); } catch { return {}; }
}

function saveThemeStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function recordThemeStat(theme, correct) {
  if (!theme || state.reviewMode) return;
  const stats = getThemeStats();
  if (!stats[theme]) stats[theme] = { correct: 0, total: 0 };
  stats[theme].total += 1;
  if (correct) stats[theme].correct += 1;
  saveThemeStats(stats);
}

function renderStats() {
  const stats = getThemeStats();
  const entries = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
  if (entries.length === 0) {
    el.statsContent.innerHTML = '<p class="stats-empty">まだ統計データがありません。</p>';
    return;
  }
  el.statsContent.innerHTML = entries.map(([theme, v]) => {
    const rate = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
    return `<div class="stats-row">
      <div class="stats-theme">${theme}</div>
      <div class="stats-bar-bg"><div class="stats-bar-fill" style="width:${rate}%"></div></div>
      <div class="stats-label">${v.correct}/${v.total} (${rate}%)</div>
    </div>`;
  }).join("");
}

function renderStageMap() {
  const nodes = STAGES.map((s, idx) => {
    let stateClass = "locked";
    let status = "🔒";
    if (state.cleared || idx < state.stageIndex) { stateClass = "cleared"; status = "✅"; }
    else if (idx === state.stageIndex) { stateClass = "available"; status = "▶"; }
    return `<div class="stage-node ${stateClass}">
      <div class="stage-node-num">Stage ${idx + 1}</div>
      <div class="stage-node-name">${s.name}</div>
      <div class="stage-node-role">${s.role}</div>
      <div class="stage-node-status">${status}</div>
    </div>`;
  }).join("");
  el.stageMapGrid.innerHTML = nodes;
}

function renderThemePractice() {
  const counts = {};
  allQuestions.forEach((q) => { counts[q.theme] = (counts[q.theme] || 0) + 1; });
  const themes = Object.keys(counts).sort();
  el.themeGrid.innerHTML = themes.map((theme) =>
    `<button class="theme-btn" data-theme="${theme}">${theme}<span class="theme-count">${counts[theme]}問</span></button>`
  ).join("");
  Array.from(el.themeGrid.querySelectorAll(".theme-btn")).forEach((btn) => {
    btn.addEventListener("click", () => startThemePractice(btn.dataset.theme));
  });
}

function togglePanel(targetSection) {
  [el.rankingSection, el.stageMapSection, el.statsSection, el.themePracticeSection].forEach((section) => {
    if (!section) return;
    if (section === targetSection) section.classList.toggle("hidden");
    else section.classList.add("hidden");
  });
}

function saveWrongAnswer(id) {
  const list = getWrongAnswers();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(WRONG_KEY, JSON.stringify(list));
  }
  updateReviewBtn();
}

function removeWrongAnswer(id) {
  const list = getWrongAnswers().filter(x => x !== id);
  localStorage.setItem(WRONG_KEY, JSON.stringify(list));
  updateReviewBtn();
}

function updateReviewBtn() {
  const count = getWrongAnswers().length;
  el.reviewCount.textContent = count;
  el.reviewBtn.classList.toggle("hidden", count === 0);
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
  if (el.achievementList) {
    el.achievementList.textContent = state.achievements.length > 0
      ? state.achievements.join(" / ")
      : "未獲得";
  }
}

function unlockAchievement(def) {
  if (!def || state.achievementMap[def.key]) return "";
  state.achievementMap[def.key] = true;
  state.achievements.push(def.label);
  return `\n🏅 実績解除: ${def.label}`;
}

function rollQuestionEvent() {
  state.currentEvent = null;
  currentTimerSec = TIMER_SEC;
  if (state.reviewMode) {
    el.eventInfo.classList.add("hidden");
    el.eventInfo.textContent = "";
    return;
  }
  if (Math.random() < 0.35) {
    const picked = QUESTION_EVENTS[Math.floor(Math.random() * QUESTION_EVENTS.length)];
    state.currentEvent = picked;
    currentTimerSec = Math.max(10, TIMER_SEC + (picked.timerDelta || 0));
    el.eventInfo.textContent = `🎲 ${picked.label}: ${picked.text}`;
    el.eventInfo.classList.remove("hidden");
  } else {
    el.eventInfo.classList.add("hidden");
    el.eventInfo.textContent = "";
  }
}

// ── 問題表示 ──────────────────────────────────────
function showQuestion() {
  isAnswering = false;
  rollQuestionEvent();
  const qs = getActiveQuestions();
  const q  = qs[state.shuffledIndices[state.current]];

  el.quizSection.classList.remove("hidden");
  el.resultSection.classList.add("hidden");
  el.shareBtn.classList.add("hidden");

  if (!state.reviewMode && state.combo >= 2) {
    const mult = comboMultiplier(state.combo);
    el.comboDisplay.textContent = `🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`;
    el.comboDisplay.classList.remove("hidden");
  } else {
    el.comboDisplay.classList.add("hidden");
  }

  el.fatalWarning.classList.toggle("hidden", !q.fatal || state.reviewMode);

  const modeLabel = state.practiceMode ? " [練習]" : state.reviewMode ? " [復習]" : "";
  el.questionText.textContent = `Q${state.current + 1}${modeLabel} [${q.theme}] ${q.text}`;
  el.choices.innerHTML = "";

  const choiceOrder = shuffle([...Array(q.choices.length).keys()]);
  currentCorrectIdx = choiceOrder.indexOf(q.answer);

  choiceOrder.forEach((origIdx, displayIdx) => {
    const b = document.createElement("button");
    b.className = "choice-btn";
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

  const q = getActiveQuestions()[state.shuffledIndices[state.current]];
  const event = state.currentEvent || { expRate: 1.0, damageReduction: 0 };
  const correct = selected === currentCorrectIdx;

  // ① ボタンをハイライト → 700ms後に結果表示
  highlightChoices(selected);

  state.stageTotal += 1;
  let msg = "";

  if (state.reviewMode) {
    // ② 復習モード：HP/EXP変動なし
    if (correct) {
      state.reviewCorrect += 1;
      if (state.practiceMode) {
        msg += "✅ 正解！\n";
      } else {
        removeWrongAnswer(q.id);
        msg += "✅ 正解！ 復習リストから削除しました\n";
      }
    } else {
      msg += "❌ 不正解\n";
      msg += `正解: ${q.choices[q.answer]}\n`;
    }
    msg += `解説: ${q.explanation}`;
    state.current += 1;
    setTimeout(() => handleAfterAnswer(msg, correct), 700);
    return;
  }

  // 通常モード
  recordThemeStat(q.theme, correct);
  if (correct) {
    state.combo += 1;
    const mult    = comboMultiplier(state.combo);
    const speed   = speedBonus(timerRemaining);
    const baseExp = EXP_PER_STAGE[state.stageIndex] ?? 10;
    const gained  = Math.floor(baseExp * mult * (event.expRate || 1.0));
    const bonus   = Math.floor(baseExp * speed);
    state.exp += gained + bonus;
    state.stageCorrect += 1;
    msg += `✅ 正解！ EXP +${gained}`;
    if (state.combo >= 2) msg += ` 🔥 ${state.combo}コンボ ×${mult.toFixed(1)}`;
    if (bonus > 0) msg += ` ⚡ 速答ボーナス +${bonus}`;
    msg += "\n";
    if (q.fatal) msg += unlockAchievement(ACHIEVEMENTS.fatalClear);
    if (state.combo >= 3) msg += unlockAchievement(ACHIEVEMENTS.combo3);
    while (state.exp >= state.lv * 50) {
      state.lv += 1;
      msg += `⬆️ レベルアップ！ LV${state.lv}\n`;
    }
  } else {
    state.combo = 0;
    saveWrongAnswer(q.id); // ② 間違えた問題を記録
    if (q.fatal) {
      state.hp = 0;
      msg += `💀 致命的ミス！ HP全消滅！\n`;
    } else {
      const damage = Math.max(1, 20 - (event.damageReduction || 0));
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

  // ② 復習モード終了判定
  if (state.reviewMode) {
    if (state.current >= perRun) {
      const total = perRun;
      if (state.practiceMode) {
        msg += `\n\n🎯 テーマ練習完了！ ${state.reviewCorrect}/${total}問 正解`;
      } else {
        msg += `\n\n📚 復習完了！ ${state.reviewCorrect}/${total}問 正解`;
        msg += `\n正解した問題は復習リストから削除されました。`;
      }
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
      el.shareBtn.classList.add("hidden");
    } else {
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");
      el.shareBtn.classList.add("hidden");
    }
    updateStatus();
    el.quizSection.classList.add("hidden");
    el.resultSection.classList.remove("hidden");
    el.resultText.textContent = msg;
    el.scoreBanner.classList.add("hidden");
    return;
  }

  // 通常モード
  if (state.hp <= 0) {
    state.gameOver = true;
    const score = calcScore();
    state.totalScore = score;
    saveRanking(state.name, score, "ゲームオーバー");
    msg += `\n\nゲームオーバー。法務リスク管理の見直しが必要です。\nスコア: ${score}`;
    el.nextBtn.classList.add("hidden");
    el.restartBtn.classList.remove("hidden");
    setShareText(buildShareTextGameOver(score));

  } else if (state.current >= perRun) {
    const grade = calcGrade(state.stageCorrect, state.stageTotal, state.hp, state.stageStartHp);

    if (state.stageIndex < STAGES.length - 1) {
      const clearedNum = state.stageIndex + 1;
      const nextRole   = STAGES[state.stageIndex + 1].role;
      showStageClearOverlay(clearedNum, nextRole, grade.label, false);
      msg += `\n\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n次のステージ: ${STAGES[state.stageIndex + 1].name}`;
      msg += `\n新役職: ${nextRole}`;
      if (state.hp >= state.stageStartHp) {
        msg += unlockAchievement(ACHIEVEMENTS.noDamageStage);
      }

      state.stageIndex += 1;
      state.current = 0;
      state.combo = 0;
      state.stageCorrect = 0;
      state.stageTotal = 0;
      state.stageStartHp = state.hp;
      buildShuffledIndices();
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");
      el.shareBtn.classList.add("hidden");

    } else {
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
      setShareText(buildShareTextFullClear(grade.label, score));
    }
  } else {
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.add("hidden");
    el.shareBtn.classList.add("hidden");
  }

  updateStatus();
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.remove("hidden");
  el.resultText.textContent = msg;

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

// ── ③ シェア機能 ──────────────────────────────────
function setShareText(text) {
  el.shareBtn.classList.remove("hidden");
  el.shareBtn.dataset.text = text;
}

function buildShareTextStageClear(stageNum, grade, correct, total) {
  return `🎮 法務RPG\nStage ${stageNum}「${STAGES[stageNum - 1].name}」クリア！\n評価: ${grade} / 正答率: ${correct}/${total}\n役職: ${STAGES[stageNum].role}\n#法務RPG`;
}

function buildShareTextFullClear(grade, score) {
  return `🏆 法務RPG 全ステージクリア！\n最終役職: ${CLEARED_ROLE}\n評価: ${grade} / スコア: ${score}pt\n#法務RPG`;
}

function buildShareTextGameOver(score) {
  return `🎮 法務RPG\nStage ${state.stageIndex + 1}でゲームオーバー…\nスコア: ${score}pt\nリベンジ挑戦中！ #法務RPG`;
}

function buildShareTextReview(correct, total) {
  return `📚 法務RPG 復習モード\n${correct}/${total}問 正解！\n#法務RPG`;
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

// ── ゲーム開始 ─────────────────────────────────────
function startGame() {
  const name = el.playerName.value.trim();
  if (!name) { alert("プレイヤー名を入力してください。"); return; }
  Object.assign(state, {
    name, hp: 100, exp: 0, lv: 1,
    stageIndex: 0, current: 0,
    gameOver: false, cleared: false, combo: 0,
    achievements: [],
    achievementMap: {},
    currentEvent: null,
    shuffledIndices: [],
    stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
    reviewMode: false, reviewPool: [], reviewCorrect: 0,
    practiceMode: false, practiceTheme: "",
  });
  buildShuffledIndices();
  showGameUI();
  saveState();
}

// ② 復習モード開始
function startReviewMode() {
  const wrongIds = getWrongAnswers();
  if (wrongIds.length === 0) { alert("復習する問題がありません。"); return; }
  const pool = allQuestions.filter(q => wrongIds.includes(q.id));
  if (pool.length === 0) { alert("問題データが見つかりません。"); return; }

  const name = el.playerName.value.trim() || "プレイヤー";
  Object.assign(state, {
    name,
    reviewMode: true,
    practiceMode: false,
    practiceTheme: "",
    reviewPool: pool,
    reviewCorrect: 0,
    current: 0,
    shuffledIndices: [],
    gameOver: false, cleared: false, combo: 0,
    currentEvent: null,
  });
  buildShuffledIndices();
  showGameUI();
}

function startThemePractice(theme) {
  const pool = allQuestions.filter(q => q.theme === theme);
  if (pool.length === 0) { alert("このテーマの問題が見つかりません。"); return; }

  const name = el.playerName.value.trim() || "プレイヤー";
  Object.assign(state, {
    name,
    reviewMode: true,
    practiceMode: true,
    practiceTheme: theme,
    reviewPool: pool,
    reviewCorrect: 0,
    current: 0,
    shuffledIndices: [],
    gameOver: false, cleared: false, combo: 0,
    currentEvent: null,
  });
  buildShuffledIndices();
  showGameUI();
}

function showGameUI() {
  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  updateStatus();
  showQuestion();
}

function restartGame() {
  clearTimer();
  localStorage.removeItem(SAVE_KEY);
  el.playerName.value = "";
  el.startSection.classList.remove("hidden");
  ["statusSection","quizSection","resultSection"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
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
el.restartBtn.addEventListener("click", restartGame);
el.reviewBtn.addEventListener("click", startReviewMode);

// ③ コピーボタン
el.shareBtn.addEventListener("click", () => {
  const text = el.shareBtn.dataset.text || "";
  navigator.clipboard.writeText(text).then(() => {
    el.shareBtn.textContent = "✅ コピーしました！";
    el.shareBtn.classList.add("copied");
    setTimeout(() => {
      el.shareBtn.textContent = "📋 結果をコピー";
      el.shareBtn.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    prompt("以下のテキストをコピーしてください：", text);
  });
});

el.showRankingBtn.addEventListener("click", () => {
  renderRanking();
  togglePanel(el.rankingSection);
});
el.stageMapBtn.addEventListener("click", () => {
  renderStageMap();
  togglePanel(el.stageMapSection);
});
el.statsBtn.addEventListener("click", () => {
  renderStats();
  togglePanel(el.statsSection);
});
el.themeBtn.addEventListener("click", () => {
  renderThemePractice();
  togglePanel(el.themePracticeSection);
});
el.clearRankingBtn.addEventListener("click", () => {
  if (confirm("ランキングを全件削除しますか？")) {
    localStorage.removeItem(RANKING_KEY);
    renderRanking();
  }
});
el.clearStatsBtn.addEventListener("click", () => {
  if (confirm("正答率統計をリセットしますか？")) {
    localStorage.removeItem(STATS_KEY);
    renderStats();
  }
});

// ── データ読み込み ─────────────────────────────────
fetch("questions.json")
  .then(r => r.json())
  .then(questions => {
    allQuestions = questions;
    renderStageMap();
    renderStats();
    renderThemePractice();
    resumeOrShowStart();
  })
  .catch(() => {
    document.body.innerHTML =
      "<p style='color:#f87171;padding:2rem;font-family:sans-serif'>" +
      "questions.json の読み込みに失敗しました。<br>" +
      "ローカルサーバー経由でアクセスしてください。<br>" +
      "<small>例: npx serve . または VS Code Live Server</small></p>";
  });
