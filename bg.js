// bg.js — ピクセルアートRPG背景 (320×180 論理解像度、CSSで引き伸ばし)
(function () {
  "use strict";
  const W = 320, H = 180;

  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;" +
    "image-rendering:pixelated;image-rendering:crisp-edges;";
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // ── ヘルパー ────────────────────────────────────
  const r = (x, y, w, h) => ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
  const f = (c) => { ctx.fillStyle = c; };
  const fr = (c, x, y, w, h) => { f(c); r(x, y, w, h); };

  function tri(x1, y1, x2, y2, x3, y3, color) {
    f(color);
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
  }

  // ── 夜空グラデーション帯 ─────────────────────────
  function drawSky() {
    [
      [0,   32, "#010810"],
      [32,  22, "#040c18"],
      [54,  24, "#071220"],
      [78,  22, "#0b192c"],
      [100, 22, "#0f2038"],
      [122, 22, "#132640"],
      [144, 36, "#172c48"],
    ].forEach(([y, h, c]) => fr(c, 0, y, W, h));
  }

  // ── 月 (ピクセルアート) ───────────────────────────
  function drawMoon(mx, my) {
    // 本体 (半径7相当の楕円を矩形で近似)
    f("#fef9c3");
    r(mx - 1, my - 6,  4, 1);
    r(mx - 3, my - 5,  8, 1);
    r(mx - 5, my - 4, 12, 2);
    r(mx - 5, my - 2, 12, 2);
    r(mx - 5, my,     12, 2);
    r(mx - 4, my + 2, 10, 2);
    r(mx - 3, my + 4,  8, 1);
    r(mx - 1, my + 5,  4, 1);
    // 右側に薄い影 → 三日月感
    f("#fde68a");
    r(mx + 2, my - 4,  4, 10);
    // 光輪 (極薄)
    ctx.fillStyle = "rgba(254,249,195,0.07)";
    r(mx - 10, my - 12, 24, 26);
  }

  // ── 星 ──────────────────────────────────────────
  const STARS = Array.from({ length: 95 }, () => ({
    x:     (Math.random() * W) | 0,
    y:     (Math.random() * 128) | 0,
    big:   Math.random() < 0.13,
    phase: Math.random() * 6.28,
    spd:   0.4 + Math.random() * 1.3,
  }));

  function drawStars(t) {
    STARS.forEach(s => {
      const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.spd + s.phase));
      ctx.fillStyle = `rgba(255,255,220,${a.toFixed(2)})`;
      r(s.x, s.y, s.big ? 2 : 1, s.big ? 2 : 1);
    });
  }

  // ── 薄雲 ────────────────────────────────────────
  const CLOUDS = Array.from({ length: 5 }, () => ({
    x:   Math.random() * W,
    y:   15 + Math.random() * 50,
    w:   28 + Math.random() * 50,
    spd: 0.003 + Math.random() * 0.004,
  }));

  function drawClouds(t) {
    CLOUDS.forEach(c => {
      const cx = ((c.x + t * c.spd) % (W + c.w + 20)) - c.w / 2 - 10;
      ctx.fillStyle = "rgba(170,200,235,0.055)";
      r(cx,      c.y,     c.w,      4);
      ctx.fillStyle = "rgba(170,200,235,0.035)";
      r(cx - 6,  c.y + 3, c.w + 12, 3);
      r(cx + 3,  c.y - 2, c.w - 6,  3);
    });
  }

  // ── 山 (複数レイヤー) ────────────────────────────
  function drawMountains() {
    // 遠景 (明るめ紺)
    tri(  0, 168,  75, 72, 150, 168, "#1a2e52");
    tri( 60, 168, 155, 56, 250, 168, "#1d3358");
    tri(150, 168, 240, 68, 320, 168, "#1a2e52");
    tri(  0, 168,  45, 98, 100, 168, "#172a4a");
    tri(230, 168, 280, 92, 320, 168, "#172a4a");
    // 中景 (暗め)
    tri(  0, 172,  48, 112, 105, 172, "#101e32");
    tri( 55, 172, 118, 98,  182, 172, "#111f35");
    tri(145, 172, 205, 102, 265, 172, "#111f35");
    tri(235, 172, 278, 112, 320, 172, "#101e32");
    // 地面
    fr("#080f1c", 0, 164, W,  6);
    fr("#060c18", 0, 168, W,  6);
    fr("#050a14", 0, 172, W,  8);
  }

  // ── 城 ──────────────────────────────────────────
  function drawCastle() {
    const bx = 106, by = 44;
    const wall  = "#15233e";
    const dark  = "#0c1728";
    const win   = "#fbbf24";
    const winhi = "#fde68a";

    // 城壁基部
    fr(dark, bx + 10, by + 115, 80, 7);

    // 主棟
    fr(wall, bx + 20, by + 42, 60, 74);
    fr(dark, bx + 60, by + 42, 20, 74);

    // 左塔
    fr(wall, bx,      by + 30, 28, 90);
    fr(dark, bx + 20, by + 30,  8, 90);
    // 左塔 銃眼
    fr(wall, bx,      by + 20,  8, 12);
    fr(wall, bx + 10, by + 20,  8, 12);
    fr(wall, bx + 20, by + 20,  8, 12);

    // 右塔
    fr(wall, bx + 72, by + 30, 28, 90);
    fr(dark, bx + 92, by + 30,  8, 90);
    // 右塔 銃眼
    fr(wall, bx + 72, by + 20,  8, 12);
    fr(wall, bx + 82, by + 20,  8, 12);
    fr(wall, bx + 92, by + 20,  8, 12);

    // 主棟 銃眼
    for (let i = 0; i < 5; i++) fr(wall, bx + 20 + i * 12, by + 34, 8, 10);

    // 門 (アーチ風)
    fr(dark, bx + 37, by + 88, 26, 28);
    fr(dark, bx + 39, by + 83, 22,  8);
    fr(dark, bx + 42, by + 80, 16,  5);
    fr(dark, bx + 45, by + 78,  10, 4);

    // 窓 (灯り)
    fr(win,   bx +  4, by + 40,  7,  9);   // 左塔
    fr(win,   bx + 77, by + 40,  7,  9);   // 右塔
    fr(win,   bx + 26, by + 56,  8, 10);   // 主棟左
    fr(win,   bx + 64, by + 56,  8, 10);   // 主棟右
    fr(win,   bx + 43, by + 54, 12, 10);   // 主棟中
    // 窓ハイライト
    fr(winhi, bx +  5, by + 41,  4,  5);
    fr(winhi, bx + 78, by + 41,  4,  5);
    fr(winhi, bx + 27, by + 57,  4,  6);
    fr(winhi, bx + 65, by + 57,  4,  6);
    fr(winhi, bx + 44, by + 55,  8,  6);

    // 旗 (左: 赤、右: 青)
    fr(dark,     bx +  1, by + 10,  2, 13);
    fr("#dc2626", bx +  3, by + 10, 13,  8);
    fr(dark,     bx + 73, by + 10,  2, 13);
    fr("#2563eb", bx + 75, by + 10, 13,  8);
  }

  // ── ピクセルツリー ───────────────────────────────
  function drawTree(tx, ty) {
    fr("#3b1f0a", tx + 4, ty - 5,  4, 9);   // 幹
    fr("#041a0e", tx,     ty - 20, 12, 7);  // 葉 (暗)
    fr("#041a0e", tx - 2, ty - 14, 16, 6);
    fr("#052e16", tx + 1, ty - 23, 10, 5);  // 葉 (中)
    fr("#052e16", tx - 1, ty - 18, 14, 6);
    fr("#052e16", tx,     ty - 13, 12, 5);
    fr("#14532d", tx + 2, ty - 25,  8, 5);  // 葉 (明)
    fr("#14532d", tx + 1, ty - 20,  9, 4);
    fr("#15803d", tx + 3, ty - 26,  6, 3);  // ハイライト
    fr("#15803d", tx + 2, ty - 22,  5, 3);
  }

  function drawTrees() {
    // 左側
    drawTree( 8,  157); drawTree(28,  160);
    drawTree(48,  155); drawTree(65,  159);
    drawTree(82,  157);
    // 右側
    drawTree(240, 158); drawTree(258, 155);
    drawTree(278, 160); drawTree(296, 157);
    drawTree(311, 158);
  }

  // ── 蛍 ──────────────────────────────────────────
  const FLIES = Array.from({ length: 14 }, () => ({
    x:     Math.random() < 0.5
             ? 5  + Math.random() * 95
             : 225 + Math.random() * 90,
    y:     125 + Math.random() * 35,
    phase: Math.random() * 6.28,
    spd:   0.25 + Math.random() * 0.55,
    br:    0.35 + Math.random() * 0.45,
    dx:    0.5 + Math.random() * 0.8,
    dy:    0.3 + Math.random() * 0.5,
  }));

  function drawFireflies(t) {
    FLIES.forEach(fl => {
      const a = Math.max(0, Math.sin(t * 0.001 * fl.spd + fl.phase)) * fl.br;
      if (a < 0.08) return;
      const fx = (fl.x + Math.sin(t * 0.001 * fl.dx + fl.phase * 1.7) * 9) | 0;
      const fy = (fl.y + Math.cos(t * 0.001 * fl.dy + fl.phase * 1.3) * 5) | 0;
      ctx.fillStyle = `rgba(250,240,100,${a.toFixed(2)})`;
      r(fx, fy, 1, 1);
      // ハロ
      ctx.fillStyle = `rgba(250,240,100,${(a * 0.3).toFixed(2)})`;
      r(fx - 1, fy - 1, 3, 3);
    });
  }

  // ── アニメーションループ ─────────────────────────
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    drawSky();
    drawMoon(252, 22);
    drawStars(t);
    drawClouds(t);
    drawMountains();
    drawTrees();
    drawCastle();
    drawFireflies(t);
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
