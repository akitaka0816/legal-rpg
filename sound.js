// sound.js — Web Audio API chiptune sound engine
// 完全オリジナル作曲。著作権侵害なし。

const SoundEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let muted = false;

  // ── AudioContext 初期化 ─────────────────────────────
  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, ctx.currentTime);
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // ── 単音再生 ───────────────────────────────────────
  // freq: Hz, type: 波形, startOffset: 開始タイミング(秒), dur: 長さ(秒), vol: 音量
  function note(freq, type, startOffset, dur, vol = 0.25) {
    if (muted) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g);
    g.connect(masterGain);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + startOffset);
    const atk = 0.01;
    const rel = Math.min(0.06, dur * 0.3);
    g.gain.setValueAtTime(0, c.currentTime + startOffset);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + startOffset + atk);
    g.gain.setValueAtTime(vol, c.currentTime + startOffset + dur - rel);
    g.gain.linearRampToValueAtTime(0, c.currentTime + startOffset + dur);
    osc.start(c.currentTime + startOffset);
    osc.stop(c.currentTime + startOffset + dur + 0.01);
    osc.onended = () => { osc.disconnect(); g.disconnect(); };
  }

  // 和音
  function chord(freqs, type, startOffset, dur, vol = 0.15) {
    freqs.forEach(f => note(f, type, startOffset, dur, vol));
  }

  // ── 音符定数 ───────────────────────────────────────
  const N = {
    A3: 220.00, Bb3: 233.08, B3: 246.94,
    C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
    C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98,
  };

  // ── 効果音 ─────────────────────────────────────────

  // 正解音: 上昇アルペジオ（C-E-G-C）
  function playCorrect() {
    note(N.C5, "square", 0.00, 0.09, 0.22);
    note(N.E5, "square", 0.09, 0.09, 0.22);
    note(N.G5, "square", 0.18, 0.09, 0.22);
    note(N.C6, "square", 0.27, 0.22, 0.28);
  }

  // 不正解音: 下降 2音
  function playWrong() {
    note(N.G4, "sawtooth", 0.00, 0.13, 0.20);
    note(N.Eb4, "sawtooth", 0.14, 0.28, 0.18);
  }

  // タイムアップ音: 急降下3音
  function playTimeUp() {
    note(N.A4, "sawtooth", 0.00, 0.09, 0.18);
    note(N.F4, "sawtooth", 0.09, 0.09, 0.18);
    note(N.D4, "sawtooth", 0.18, 0.24, 0.18);
  }

  // コンボ音: コンボ数に応じて上昇音数が増える
  function playCombo(comboCount) {
    const seq = comboCount >= 4
      ? [[N.C5, 0.06], [N.E5, 0.06], [N.G5, 0.06], [N.C6, 0.16]]
      : comboCount === 3
      ? [[N.C5, 0.07], [N.E5, 0.07], [N.G5, 0.16]]
      : [[N.C5, 0.08], [N.E5, 0.14]];
    let t = 0;
    seq.forEach(([f, d]) => { note(f, "square", t, d, 0.18); t += d; });
  }

  // ステージクリア音: オリジナル短調ファンファーレ（C-G-C-E-和音）
  function playStageClear() {
    note(N.C5, "square", 0.00, 0.12, 0.24);
    note(N.G5, "square", 0.12, 0.12, 0.24);
    note(N.C6, "square", 0.24, 0.18, 0.26);
    note(N.E6, "square", 0.42, 0.12, 0.26);
    chord([N.C6, N.E6, N.G6], "square", 0.54, 0.55, 0.16);
  }

  // 全クリア音: 壮大なファンファーレ
  function playFullClear() {
    note(N.C5, "square", 0.00, 0.10, 0.22);
    note(N.E5, "square", 0.10, 0.10, 0.22);
    note(N.G5, "square", 0.20, 0.10, 0.22);
    note(N.C6, "square", 0.30, 0.18, 0.26);
    note(N.E6, "square", 0.48, 0.10, 0.26);
    note(N.G6, "square", 0.58, 0.10, 0.26);
    chord([N.C6, N.E6, N.G6], "square", 0.68, 1.10, 0.17);
  }

  // ゲームオーバー音: 短調下降（Am系）
  function playGameOver() {
    note(N.A4, "square", 0.00, 0.28, 0.20);
    note(N.F4, "square", 0.30, 0.28, 0.20);
    note(N.D4, "square", 0.60, 0.28, 0.20);
    note(N.A3, "square", 0.90, 0.60, 0.22);
  }

  // 危険問題警告音: 低音パルス×3
  function playFatalWarning() {
    [0.00, 0.22, 0.44].forEach(t => note(N.A3, "sawtooth", t, 0.14, 0.20));
  }

  // ── BGM ────────────────────────────────────────────
  // オリジナル旋律: ペンタトニックスケール(C)をベースにした8小節ループ
  // 完全オリジナル作曲。著作権侵害なし。
  const BGM_BEAT = 0.20; // 秒/8分音符 (150BPM)
  const bgmSequence = [
    // Bar 1
    [N.C5, 1], [N.E5, 1], [N.G5, 1], [N.A5, 1],
    // Bar 2
    [N.G5, 1], [N.E5, 1], [N.D5, 1], [N.E5, 1],
    // Bar 3
    [N.G5, 1], [N.C6, 1], [N.A5, 1], [N.G5, 1],
    // Bar 4
    [N.E5, 2],                        [N.C5, 2],
    // Bar 5
    [N.D5, 1], [N.E5, 1], [N.G5, 1], [N.E5, 1],
    // Bar 6
    [N.A5, 1], [N.G5, 1], [N.E5, 1], [N.D5, 1],
    // Bar 7
    [N.E5, 1], [N.G5, 1], [N.C5, 1], [N.D5, 1],
    // Bar 8
    [N.C5, 4],
  ];

  let bgmPlaying = false;
  let bgmLoopTimer = null;
  let bgmEnabled = true;

  function scheduleBgmLoop(offsetSec) {
    const c = getCtx();
    const bgmOut = c.createGain();
    bgmOut.gain.setValueAtTime(0.18, c.currentTime);
    bgmOut.connect(masterGain);

    let t = offsetSec;
    let lastEndTime = 0;
    bgmSequence.forEach(([freq, beats]) => {
      const dur = beats * BGM_BEAT;
      if (!muted) {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.connect(g);
        g.connect(bgmOut);
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, c.currentTime + t);
        g.gain.setValueAtTime(0, c.currentTime + t);
        g.gain.linearRampToValueAtTime(1, c.currentTime + t + 0.015);
        g.gain.setValueAtTime(1, c.currentTime + t + dur - 0.04);
        g.gain.linearRampToValueAtTime(0, c.currentTime + t + dur);
        osc.start(c.currentTime + t);
        const endTime = c.currentTime + t + dur + 0.01;
        osc.stop(endTime);
        if (endTime > lastEndTime) lastEndTime = endTime;
        // 停止後にノードを切断してメモリを解放
        osc.onended = () => { osc.disconnect(); g.disconnect(); };
      }
      t += dur;
    });
    // ループ全体終了後に bgmOut も切断
    setTimeout(() => bgmOut.disconnect(), (t + 0.5) * 1000);
    return t; // ループ全体の長さ(秒)
  }

  function loopBgm() {
    if (!bgmPlaying || !bgmEnabled) return;
    const totalSec = scheduleBgmLoop(0.05);
    bgmLoopTimer = setTimeout(loopBgm, (totalSec - 0.10) * 1000);
  }

  function startBgm() {
    if (!bgmEnabled || bgmPlaying) return;
    bgmPlaying = true;
    loopBgm();
  }

  function stopBgm() {
    bgmPlaying = false;
    if (bgmLoopTimer) { clearTimeout(bgmLoopTimer); bgmLoopTimer = null; }
  }

  // ── ミュートトグル ─────────────────────────────────
  function toggleMute() {
    muted = !muted;
    bgmEnabled = !muted;
    if (muted) {
      stopBgm();
      if (masterGain) masterGain.gain.setValueAtTime(0, getCtx().currentTime);
    } else {
      if (masterGain) masterGain.gain.setValueAtTime(0.7, getCtx().currentTime);
      startBgm();
    }
    return muted;
  }

  return {
    playCorrect,
    playWrong,
    playTimeUp,
    playCombo,
    playStageClear,
    playFullClear,
    playGameOver,
    playFatalWarning,
    startBgm,
    stopBgm,
    toggleMute,
    get muted() { return muted; },
  };
})();
