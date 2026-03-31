// ── ステージ定義 ───────────────────────────────────
const STAGES = [
  {
    id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
    story: {
      chapter: "第一章　法務の扉を開けよ",
      scene: "株式会社アクシス 法務部 — 入社3日目",
      narrative: `春の朝。辞令を手に法務部の扉を叩いたあなたを迎えたのは、書類の山と鋭い眼光の田中主任だった。

「ようこそ、法務部へ。ここは会社を守る最後の砦だ。
一枚の契約書が会社を救うこともあれば、滅ぼすこともある。
まず基礎を叩き込む。ついてこい。」

法務という名の冒険が、いま始まった。`,
      skills: ["基本的な契約書の構造と役割", "法律用語と法体系の初歩", "コンプライアンスの心構え"],
      bossHint: "第一の試練：田中主任による入門試験",
      clearStory: `「合格だ。筋がいい」\n田中主任が珍しく口角を上げた。\nあなたはアシスタントへと昇格し、次なる依頼の扉が開かれる。`,
    },
  },
  {
    id: 2, name: "法務基礎", role: "法務アシスタント", questionsPerRun: 5,
    story: {
      chapter: "第二章　最初の依頼",
      scene: "第3会議室 — 入社半年後",
      narrative: `日常業務をこなしていたある朝、営業部の青木課長が息を切らして駆け込んできた。

「頼む！ 来週、大口取引先と5000万の契約を結ぶんだ。
この契約書を全部チェックしてほしい。何かリスクがあれば全部洗い出してくれ。
失敗したら今期の成績が吹っ飛ぶんだよ！」

一枚の契約書に潜む罠を、あなたは見抜けるか。`,
      skills: ["契約条項のリスク識別", "表明保証・担保の基礎", "瑕疵担保責任と損害賠償"],
      bossHint: "第二の試練：契約書の深部に潜む致命条項",
      clearStory: `すべてのリスク条項を摘出し、取引先との修正交渉も成立。\n青木課長からの熱い握手とともに、あなたの名前は社内に広まり始めた。`,
    },
  },
  {
    id: 3, name: "応用実務", role: "法務担当", questionsPerRun: 5,
    story: {
      chapter: "第三章　嵐の訴訟",
      scene: "法務部長室 — ある月曜日の早朝",
      narrative: `出社するなり部長室に呼ばれた。机の上には一通の内容証明が置かれていた。

「準大手の取引先から3億円の損害賠償請求だ。
製品に瑕疵があったと主張している。
担当はお前だ——証拠を集め、反論を組み立て、この戦いを制せ。」

法廷という名のダンジョンが、あなたを待ち受ける。`,
      skills: ["訴訟の流れと証拠収集の実務", "製品瑕疵と不法行為責任", "和解交渉と費用対効果分析"],
      bossHint: "第三の試練：相手方弁護士が突きつける決定的証拠",
      clearStory: `緻密な反証と法的主張が実を結び、請求額の大幅減額で和解成立。\n部長が静かに言った。「本物の法務担当になったな。」`,
    },
  },
  {
    id: 4, name: "実践編", role: "シニア法務担当", questionsPerRun: 5,
    story: {
      chapter: "第四章　国境を超えた戦い",
      scene: "取締役会議室 — M&Aプロジェクト発足",
      narrative: `訴訟での活躍が評価され、極秘プロジェクトへの参画を命じられた。

「EU本拠の製造企業を500億で買収する計画だ。
GDPR対応、独禁法クリアランス、クロスボーダーの契約設計——全部お前が仕切れ。
競合他社も同じターゲットを狙っている。失敗は許されない。」

国際法務の荒波の中、あなたの判断力が問われる。`,
      skills: ["M&Aデューデリジェンスの実務", "GDPRと国際データ保護法", "独占禁止法と競争法対応"],
      bossHint: "第四の試練：競合による買収阻止の法的妨害工作",
      clearStory: `デューデリを完遂し、すべての法的障壁をクリア。買収は成立した。\nあなたはシニア担当として、国際案件の第一人者となった。`,
    },
  },
  {
    id: 5, name: "上級編", role: "法務リーダー", questionsPerRun: 5,
    story: {
      chapter: "第五章　内側からの嵐",
      scene: "法務部 — 内部告発から48時間後",
      narrative: `深夜、匿名の内部告発メールが届いた。経理部で組織的な不正が行われているという。

部長が険しい顔で言う。
「規制当局が動く前に、先手を打つしかない。
調査チームを率いて全容を解明しろ。
メディアも当局も、どちらも敵になりうる。」

チームを率いるリーダーとして、あなたの本当の試練が始まる。`,
      skills: ["内部調査と証拠保全の手法", "コンプライアンスプログラムの設計", "規制当局対応と危機管理"],
      bossHint: "第五の試練：規制当局による抜き打ち立入検査",
      clearStory: `全容解明と自主申告により、制裁は最小限に抑えられた。\nリーダーとしての手腕を見せたあなたの前に、最後の扉が開こうとしていた。`,
    },
  },
  {
    id: 6, name: "最終試験", role: "法務マネージャー", questionsPerRun: 5,
    story: {
      chapter: "最終章　法務責任者への試練",
      scene: "取締役会議室 — 最終選考",
      narrative: `すべての試練を乗り越えたあなたの前に、議長が静かに立っている。

「次期法務責任者の候補は、あなた一人だ。
しかしこのポストには、最高水準の法務判断力が求められる。
今から最終試験を行う。
合格すれば——この会社の法務を統括する地位が、あなたのものになる。」

法務冒険の、最後の扉。すべてをここに賭けろ。`,
      skills: ["経営戦略と法務ガバナンス", "コーポレートガバナンスの実践", "統合リスクマネジメント"],
      bossHint: "最終ボス：取締役会による法務責任者就任審査",
      clearStory: null,
    },
  },
];
const CLEARED_ROLE  = "法務責任者";
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

function showStageIntro() {
  const story = STAGES[state.stageIndex].story;
  const introChapter = document.getElementById("introChapter");
  const introScene = document.getElementById("introScene");
  const introNarrative = document.getElementById("introNarrative");
  const introSkillsList = document.getElementById("introSkillsList");
  const introBossHint = document.getElementById("introBossHint");

  // ストーリー用DOMが無い環境でもゲーム進行を止めない
  if (!el.stageIntroSection || !introChapter || !introScene || !introNarrative || !introSkillsList || !introBossHint) {
    state.stageIntroPending = false;
    return;
  }

  introChapter.textContent = story.chapter;
  introScene.textContent = story.scene;
  introNarrative.textContent = story.narrative;
  introSkillsList.innerHTML = story.skills.map(s => `<li>${s}</li>`).join("");
  introBossHint.textContent = story.bossHint;
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.add("hidden");
  el.stageIntroSection.classList.remove("hidden");
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
    showStageIntro();
    return;
  }

  isAnswering = false;
  const qs = getActiveQuestions();
  const q  = qs[state.shuffledIndices[state.current]];

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
      msg += `\n\n——法務責任者に就任しました。\nあなたの決断と知識が、この会社を守り続けてきた。\n数々の試練を乗り越えたあなたは、今まさに法務の頂点に立つ。`;
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
