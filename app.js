let allStages = [];

const roles = ["新入社員", "法務担当", "シニア法務", "法務責任者"];
const SAVE_KEY = "legal_rpg_save_v2";

const state = {
  name: "",
  hp: 100,
  exp: 0,
  lv: 1,
  roleIndex: 0,
  stageIndex: 0,
  current: 0,
  hints: 1,
  items: {
    roppo: false,
    hanrei: false,
    ai: false,
  },
  gameOver: false,
};

const el = {
  startSection: document.getElementById("startSection"),
  statusSection: document.getElementById("statusSection"),
  quizSection: document.getElementById("quizSection"),
  resultSection: document.getElementById("resultSection"),
  itemSection: document.getElementById("itemSection"),
  playerName: document.getElementById("playerName"),
  startBtn: document.getElementById("startBtn"),
  sName: document.getElementById("sName"),
  sRole: document.getElementById("sRole"),
  sLv: document.getElementById("sLv"),
  sHp: document.getElementById("sHp"),
  sExp: document.getElementById("sExp"),
  sProgress: document.getElementById("sProgress"),
  sStage: document.getElementById("sStage"),
  sHint: document.getElementById("sHint"),
  itemRoppoBtn: document.getElementById("itemRoppoBtn"),
  itemHanreiBtn: document.getElementById("itemHanreiBtn"),
  itemAIBtn: document.getElementById("itemAIBtn"),
  itemInfo: document.getElementById("itemInfo"),
  questionText: document.getElementById("questionText"),
  hintBtn: document.getElementById("hintBtn"),
  hintText: document.getElementById("hintText"),
  choices: document.getElementById("choices"),
  resultText: document.getElementById("resultText"),
  nextBtn: document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
};

function buildStages(questions) {
  allStages = [
    { name: "初級", questions: questions.filter(q => q.difficulty === 1) },
    { name: "中級", questions: questions.filter(q => q.difficulty === 2) },
    { name: "上級", questions: questions.filter(q => q.difficulty === 3) },
  ];
}

function getCurrentQuestions() {
  return allStages[state.stageIndex].questions;
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed);
    return true;
  } catch {
    return false;
  }
}

function syncItemButtons() {
  el.itemRoppoBtn.disabled = state.items.roppo;
  el.itemHanreiBtn.disabled = state.items.hanrei;
  el.itemAIBtn.disabled = state.items.ai;
}

function updateStatus() {
  el.sName.textContent = state.name;
  el.sRole.textContent = roles[state.roleIndex];
  el.sLv.textContent = String(state.lv);
  el.sHp.textContent = String(state.hp);
  el.sExp.textContent = String(state.exp);
  const qs = getCurrentQuestions();
  el.sProgress.textContent = `${Math.min(state.current, qs.length)}/${qs.length}`;
  el.sStage.textContent = allStages[state.stageIndex].name;
  el.sHint.textContent = String(state.hints);
  syncItemButtons();
}

function showQuestion() {
  const qs = getCurrentQuestions();
  const q = qs[state.current];
  el.quizSection.classList.remove("hidden");
  el.resultSection.classList.add("hidden");
  el.hintText.classList.add("hidden");
  el.hintText.textContent = "";
  el.questionText.textContent = `Q${state.current + 1} [${q.theme}] ${q.text}`;
  el.choices.innerHTML = "";

  q.choices.forEach((choice, idx) => {
    const b = document.createElement("button");
    b.className = "choice-btn";
    b.textContent = `${idx + 1}. ${choice}`;
    b.addEventListener("click", () => answerQuestion(idx));
    if (state.items.hanrei && idx !== q.answer && idx % 2 === 1) {
      b.disabled = true;
      b.textContent = `${idx + 1}. ${choice}（判例DBで除外）`;
    }
    el.choices.appendChild(b);
  });
  saveState();
}

function answerQuestion(selected) {
  const qs = getCurrentQuestions();
  const q = qs[state.current];
  const correct = selected === q.answer;
  let msg = "";

  if (correct) {
    state.exp += 10;
    msg += "正解！ EXP +10\n";
  } else {
    const damage = state.items.ai ? 10 : 20;
    state.hp -= damage;
    msg += `不正解… HP -${damage}\n`;
  }

  if (state.exp >= state.lv * 30 && state.lv < roles.length) {
    state.lv += 1;
    state.roleIndex = Math.min(state.roleIndex + 1, roles.length - 1);
    msg += `レベルアップ！ LV${state.lv} / 役職: ${roles[state.roleIndex]}\n`;
  }

  msg += `解説: ${q.explanation}`;
  state.current += 1;

  if (state.hp <= 0) {
    state.gameOver = true;
    msg += "\n\nゲームオーバー。法務リスク管理の見直しが必要です。";
    el.nextBtn.classList.add("hidden");
    el.restartBtn.classList.remove("hidden");
  } else if (state.current >= qs.length) {
    if (state.stageIndex < allStages.length - 1) {
      state.stageIndex += 1;
      state.current = 0;
      state.hints += 1;
      msg += `\n\nステージクリア！ 次は ${allStages[state.stageIndex].name} です。ヒント+1。`;
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");
    } else {
      msg += "\n\n最終ステージクリア！法務責任者への道が開けました。";
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
  saveState();
}

function showHint() {
  if (state.hints <= 0) {
    alert("ヒント残数がありません。");
    return;
  }
  const q = getCurrentQuestions()[state.current];
  state.hints -= 1;
  el.hintText.textContent = `ヒント: ${q.hint || "法令の趣旨と原則を確認しましょう。"}`;
  el.hintText.classList.remove("hidden");
  updateStatus();
  saveState();
}

function useItem(type) {
  if (state.items[type]) return;
  if (type === "roppo") {
    state.items.roppo = true;
    state.hints += 1;
    el.itemInfo.textContent = "六法を装備しました。ヒント残数 +1。";
  } else if (type === "hanrei") {
    state.items.hanrei = true;
    el.itemInfo.textContent = "判例DBを装備しました。問題ごとに一部選択肢を除外します。";
  } else if (type === "ai") {
    state.items.ai = true;
    el.itemInfo.textContent = "生成AIアシストを装備しました。不正解時のHP減少が軽減されます。";
  }
  updateStatus();
  saveState();
}

function startGame() {
  const name = el.playerName.value.trim();
  if (!name) {
    alert("プレイヤー名を入力してください。");
    return;
  }
  state.name = name;
  state.hp = 100;
  state.exp = 0;
  state.lv = 1;
  state.roleIndex = 0;
  state.stageIndex = 0;
  state.current = 0;
  state.hints = 1;
  state.items = { roppo: false, hanrei: false, ai: false };
  state.gameOver = false;

  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  el.itemSection.classList.remove("hidden");
  updateStatus();
  showQuestion();
  saveState();
}

function restartGame() {
  localStorage.removeItem(SAVE_KEY);
  el.playerName.value = "";
  el.startSection.classList.remove("hidden");
  el.statusSection.classList.add("hidden");
  el.itemSection.classList.add("hidden");
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.add("hidden");
}

function resumeOrShowStart() {
  if (!loadState() || !state.name) {
    return;
  }
  const resume = confirm("保存データがあります。続きから再開しますか？");
  if (!resume) {
    localStorage.removeItem(SAVE_KEY);
    return;
  }
  el.playerName.value = state.name;
  el.startSection.classList.add("hidden");
  el.statusSection.classList.remove("hidden");
  el.itemSection.classList.remove("hidden");
  updateStatus();
  if (state.current < getCurrentQuestions().length && !state.gameOver) {
    showQuestion();
  } else {
    el.resultSection.classList.remove("hidden");
    el.resultText.textContent = "続きデータを読み込みました。次へ進んでください。";
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.remove("hidden");
  }
}

el.startBtn.addEventListener("click", startGame);
el.nextBtn.addEventListener("click", showQuestion);
el.restartBtn.addEventListener("click", restartGame);
el.hintBtn.addEventListener("click", showHint);
el.itemRoppoBtn.addEventListener("click", () => useItem("roppo"));
el.itemHanreiBtn.addEventListener("click", () => useItem("hanrei"));
el.itemAIBtn.addEventListener("click", () => useItem("ai"));

fetch("questions.json")
  .then(r => r.json())
  .then(questions => {
    buildStages(questions);
    resumeOrShowStart();
  })
  .catch(() => {
    document.body.innerHTML =
      "<p style='color:#f87171;padding:2rem;font-family:sans-serif'>" +
      "questions.json の読み込みに失敗しました。<br>" +
      "ローカルサーバー経由でアクセスしてください。<br>" +
      "<small>例: npx serve . または VS Code Live Server</small></p>";
  });
