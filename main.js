// ---------- i18n: Chinese lives in index.html, English here ----------
const EN = {
  "theme.black": "Black",
  "theme.white": "White",
  "music.label": "Music",
  "music.credit": "Music",
  "cover.title": "The Shape of Runtime",
  "cover.desc": "Android runtime · Developer tools · On-device agents",
  "cover.intro": "I'm ytlog, an Android developer. I make code change shape while it runs, and bring intelligence onto the phone.",
  "dcevm.desc": "Enhanced class redefinition for the Android runtime. Change fields, methods, modifiers and inheritance while the app runs — no root, no system partition changes.",
  "dcevm.quote": "“Rewriting a class's skeleton inside a process that never stops”",
  "dcevm.p1": "Add, retire and restore fields, methods and constructors; change field types and method signatures",
  "dcevm.p2": "Interface evolution: new default/static methods and parent interfaces, batched atomically with implementations",
  "dcevm.p3": "Live objects keep compatible field values; unsupported changes reject the whole batch and keep old definitions",
  "dcevm.p4": "Built on ART's own structural redefinition transaction, taking over only verification, member mapping and class allocation",
  "dcevm.use": "Hot reload · Debugging · Class evolution",
  "dcevm.docs": "Supported changes & limits",
  "dcevm.docsHref": "https://github.com/ytlog/art-dcevm/blob/main/docs/LIMITATIONS.en.md",
  "sheet.capability": "Capabilities",
  "sheet.spec": "Specs",
  "sheet.links": "Links",
  "facts.platform": "Platform",
  "facts.stack": "Stack",
  "facts.use": "Use",
  "facts.license": "License",
  "links.repo": "Repository",
  "mobby.desc": "Runs Pi, Claude Code, Codex and OpenCode directly on Android, with access to your screen, photos and files — a personal AI assistant on your device.",
  "mobby.quote": "“Coding agents, in your pocket”",
  "mobby.p1": "Screen Q&A: tap the floating button to read the screen, then translate, explain or ask follow-ups",
  "mobby.p2": "Photos and files: describe images, organize files, save results back to the phone",
  "mobby.p3": "App control: reads the screen, taps and types across pages to finish multi-step tasks",
  "mobby.p4": "Coding on device: writes code locally, starts a server and opens it in the browser",
  "mobby.download": "Download APK",
  "mobby.alt": "mobby on an Android tablet and phone",
  "flowa.desc": "A plain-text quick-capture notebook: open and write. Catch a fleeting thought, then sort it with tags, search and workflows.",
  "flowa.quote": "“Open, and start capturing”",
  "flowa.p1": "A blank page ready the moment you open the app; drafts autosave on your device",
  "flowa.p2": "Tag and keyword search with include/exclude tag filters, plus random review of old notes",
  "flowa.p3": "Built-in workflows for saving, cleaning up dictation and polishing text, freely combinable with AI, copy and HTTP steps",
  "flowa.p4": "Connect your own AI service; notes work fully without one",
  "flowa.download": "Download APK",
  "focus.title": "Focus",
  "focus.a.t": "Android runtime",
  "focus.a.d": "ART internals, JVMTI, class loading and redefinition, native hooks",
  "focus.b.t": "Developer tools",
  "focus.b.d": "Hot reload, debugging aids, and verification reproducible on real devices",
  "focus.c.t": "On-device agents",
  "focus.c.d": "Connecting coding agents to the phone's screen, files and apps",
  "focus.quote": "“Three orbits around one core”",
  "outro.quote": "“Beneath every hot reload lies one atomic structural transaction”",
};

const ZH = {};
const textNodes = [...document.querySelectorAll("[data-i18n]")];
const hrefNodes = [...document.querySelectorAll("[data-i18n-href]")];
const altNodes = [...document.querySelectorAll("[data-i18n-alt]")];
textNodes.forEach((el) => { ZH[el.dataset.i18n] = el.textContent; });
hrefNodes.forEach((el) => { ZH[el.dataset.i18nHref] = el.getAttribute("href"); });
altNodes.forEach((el) => { ZH[el.dataset.i18nAlt] = el.getAttribute("alt"); });

const langToggle = document.getElementById("lang-toggle");
let lang = "zh";

function applyLang(next) {
  lang = next;
  const dict = lang === "en" ? EN : ZH;
  textNodes.forEach((el) => { el.textContent = dict[el.dataset.i18n] ?? ZH[el.dataset.i18n]; });
  hrefNodes.forEach((el) => { el.setAttribute("href", dict[el.dataset.i18nHref]); });
  altNodes.forEach((el) => { el.setAttribute("alt", dict[el.dataset.i18nAlt]); });
  document.querySelectorAll("img[data-src-en]").forEach((img) => {
    img.src = lang === "en" ? img.dataset.srcEn : img.dataset.srcZh;
  });
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.title = lang === "en" ? "ytlog · The Shape of Runtime" : "ytlog · 运行时的形状";
  langToggle.textContent = lang === "en" ? "中文" : "EN";
}

function stored(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function store(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

langToggle.addEventListener("click", () => {
  applyLang(lang === "en" ? "zh" : "en");
  store("lang", lang);
});
applyLang(stored("lang") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));

// ---------- theme: black / white ----------
const root = document.documentElement;
let FG = "236,236,232";
let BG = "10,10,10";

function readColors() {
  const cs = getComputedStyle(root);
  FG = cs.getPropertyValue("--fg-rgb").trim().replace(/\s/g, "");
  BG = cs.getPropertyValue("--bg-rgb").trim().replace(/\s/g, "");
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  document.querySelectorAll("[data-theme-btn]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.themeBtn === theme));
  });
  readColors();
  clearCanvas();
}

document.querySelectorAll("[data-theme-btn]").forEach((b) => {
  b.addEventListener("click", () => {
    applyTheme(b.dataset.themeBtn);
    store("theme", b.dataset.themeBtn);
    const url = new URL(location.href);
    url.searchParams.delete("theme");
    history.replaceState(null, "", url);
  });
});

// ---------- background music (only shown when assets/bgm.mp3 exists) ----------
const musicBtn = document.getElementById("music-toggle");
const bgm = document.getElementById("bgm");

fetch(bgm.getAttribute("src"), { method: "HEAD" })
  .then((res) => { if (res.ok) musicBtn.hidden = false; })
  .catch(() => {});

musicBtn.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.volume = 0.7;
    bgm.play().then(() => musicBtn.setAttribute("aria-pressed", "true")).catch(() => {});
  } else {
    bgm.pause();
    musicBtn.setAttribute("aria-pressed", "false");
  }
});

// ---------- canvas scenes ----------
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let w, h, cx, cy, s;
let time = 0;
let scene = 0;

const fg = (a) => `rgba(${FG},${a})`;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  w = innerWidth;
  h = innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cx = w / 2;
  cy = h * 0.36;
  s = Math.max(0.36, Math.min(w / 1000, h / 900, 1.1));
  clearCanvas();
}

function clearCanvas() {
  if (!w) return;
  ctx.globalAlpha = 1;
  ctx.fillStyle = `rgb(${BG})`;
  ctx.fillRect(0, 0, w, h);
  if (reduceMotion) drawScene();
}

function dot(x, y, r, a) {
  ctx.fillStyle = fg(a);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function line(x1, y1, x2, y2, a, width = 1) {
  ctx.strokeStyle = fg(a);
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function label(text, x, y, a, size = 11) {
  ctx.font = `${Math.max(9, size * s * 1.4)}px ui-monospace, Menlo, monospace`;
  ctx.fillStyle = fg(a);
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
}

// Scene 0 / 4: drifting nodes linked by proximity.
function drawNetwork(n, speed, spread, oy, ry) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    pts.push([
      cx + Math.sin(time * 0.4 * speed + i * 1.2) * 280 * s * spread,
      cy + oy * s + Math.cos(time * 0.3 * speed + i * 2.1) * ry * s,
    ]);
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
      if (d < 150 * s) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], 0.22 * (1 - d / (150 * s)) + 0.04);
    }
    dot(pts[i][0], pts[i][1], 3.2 * Math.max(s, 0.6), 0.85);
  }
}

// Scene 1: a class frame whose members are added, retired and restored in
// atomic transactions; the live objects beside it follow every commit.
const SLOTS = 7;
const slotLen = [0.9, 0.62, 0.78, 0.5, 0.7, 0.85, 0.56];
const slotAlive = [1, 1, 1, 0, 1, 0, 1];
const fly = [];
let lastCommit = -1;
let wave = 1;

function drawClassMorph() {
  const fw = 360 * s, fh = 280 * s;
  const x0 = cx - fw / 2, y0 = cy - fh / 2;
  const commit = Math.floor(time / 1.6);
  if (commit !== lastCommit) {
    lastCommit = commit;
    const k = (commit * 3) % SLOTS;
    slotAlive[k] = slotAlive[k] ? 0 : 1;
    if (slotAlive[k]) fly.push({ k, p: 0, from: Math.sin(commit) > 0 ? -1 : 1 });
    wave = 0;
  }

  ctx.strokeStyle = fg(0.55);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x0, y0, fw, fh);
  line(x0, y0 + 34 * s, x0 + fw, y0 + 34 * s, 0.3);
  ctx.textAlign = "left";
  ctx.font = `${Math.max(10, 15 * s)}px ui-monospace, Menlo, monospace`;
  ctx.fillStyle = fg(0.8);
  ctx.fillText("class User", x0 + 16 * s, y0 + 23 * s);

  const rowH = (fh - 54 * s) / SLOTS;
  for (let i = 0; i < SLOTS; i++) {
    const ry = y0 + 52 * s + i * rowH;
    const rx = x0 + 26 * s;
    const len = slotLen[i] * (fw - 74 * s);
    if (slotAlive[i]) {
      dot(rx, ry, 4 * Math.max(s, 0.6), 0.9);
      line(rx + 14 * s, ry, rx + 14 * s + len, ry, 0.7, 2);
    } else {
      ctx.strokeStyle = fg(0.35);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(rx, ry, 4 * Math.max(s, 0.6), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([4, 5]);
      line(rx + 14 * s, ry, rx + 14 * s + len, ry, 0.2, 1);
      ctx.setLineDash([]);
    }
  }

  // live objects on both sides keep a copy of each member slot
  [-1, 1].forEach((side) => {
    const ox = cx + side * (fw / 2 + 120 * s) - 40 * s;
    const oy = cy - 70 * s;
    ctx.strokeStyle = fg(0.35);
    ctx.lineWidth = 1;
    ctx.strokeRect(ox, oy, 80 * s, 140 * s);
    ctx.setLineDash([3, 6]);
    line(side < 0 ? ox + 80 * s : ox, cy, side < 0 ? x0 : x0 + fw, cy, 0.25);
    ctx.setLineDash([]);
    for (let i = 0; i < SLOTS; i++) {
      dot(ox + 40 * s + (i % 2 ? 14 : -14) * s, oy + 16 * s + i * 18 * s, 2.6 * Math.max(s, 0.6), slotAlive[i] ? 0.8 : 0.12);
    }
    label("object", ox + 40 * s, oy + 160 * s, 0.45);
  });

  // new members fly in from outside the frame
  for (let i = fly.length - 1; i >= 0; i--) {
    const f = fly[i];
    f.p += 0.03;
    if (f.p >= 1) { fly.splice(i, 1); continue; }
    const tx = x0 + 26 * s, ty = y0 + 52 * s + f.k * rowH;
    const sx = f.from < 0 ? -20 : w + 20, sy = cy - 260 * s;
    const e = 1 - Math.pow(1 - f.p, 3);
    dot(sx + (tx - sx) * e, sy + (ty - sy) * e, 4.5, 1);
  }

  // every commit sends one ring across the class and its objects
  if (wave < 1) {
    wave += 0.018;
    ctx.strokeStyle = fg(0.4 * (1 - wave));
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 40 * s + wave * 420 * s, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Scene 2: an agent hub dispatching calls to device capabilities.
const tools = [
  { a: -2.5, name: "screen" }, { a: -0.64, name: "files" },
  { a: 0.64, name: "apps" }, { a: 2.5, name: "code" }, { a: -Math.PI / 2, name: "shell" },
];
const calls = [];

function drawAgentHub() {
  const R = 240 * s;
  const pos = tools.map((t) => [cx + Math.cos(t.a) * R, cy + Math.sin(t.a) * R * 0.85]);
  pos.forEach(([x, y], i) => {
    line(cx, cy, x, y, 0.1);
    ctx.strokeStyle = fg(0.6);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - 20 * s, y - 20 * s, 40 * s, 40 * s);
    label(tools[i].name, x, y + 42 * s, 0.55);
  });

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3 + time * 0.5;
    ctx.lineTo(cx + Math.cos(a) * 46 * s, cy + Math.sin(a) * 46 * s);
  }
  ctx.closePath();
  ctx.fillStyle = fg(0.9);
  ctx.fill();
  ctx.fillStyle = `rgb(${BG})`;
  ctx.beginPath();
  ctx.arc(cx, cy, 12 * s, 0, Math.PI * 2);
  ctx.fill();

  if (!reduceMotion && Math.random() < 0.22) calls.push({ t: Math.floor(Math.random() * tools.length), p: 0, back: false });
  for (let i = calls.length - 1; i >= 0; i--) {
    const c = calls[i];
    c.p += c.back ? 0.016 : 0.022;
    const [tx, ty] = pos[c.t];
    if (c.p >= 1) {
      if (c.back) { calls.splice(i, 1); continue; }
      c.back = true;
      c.p = 0;
    }
    const k = c.back ? 1 - c.p : c.p;
    dot(cx + (tx - cx) * k, cy + (ty - cy) * k, c.back ? 4 : 3, c.back ? 0.85 : 0.4);
  }
}

// Scene 3: a quick-capture page; a new line of text lands every beat, tagged
// lines get a small chip, and the cursor waits on the next empty line.
const notes = [];
let lastNote = -1;

function drawNotes() {
  const fw = 360 * s;
  const x0 = cx - fw / 2;
  const top = cy - 130 * s;
  const step = 28 * s;
  const beat = Math.floor(time / 0.9);
  if (beat !== lastNote) {
    lastNote = beat;
    notes.push({ len: 0.25 + Math.abs(Math.sin(beat * 1.7)) * 0.45, tag: beat % 3 === 0 });
    if (notes.length > 8) notes.shift();
  }
  notes.forEach((n, i) => {
    const y = top + i * step;
    const age = notes.length - 1 - i;
    const a = Math.max(0.25, 0.85 - age * 0.08);
    line(x0, y, x0 + n.len * fw, y, a, 2);
    if (n.tag) {
      ctx.strokeStyle = fg(a);
      ctx.lineWidth = 1;
      ctx.strokeRect(x0 + fw - 36 * s, y - 6 * s, 36 * s, 12 * s);
    }
  });
  if (Math.sin(time * 6) > 0) {
    const y = top + notes.length * step;
    line(x0, y - 8 * s, x0, y + 10 * s, 0.9, 2);
  }
}

// Scene 4: three tilted orbits around a pulsing core, one per focus area.
function drawOrbits() {
  dot(cx, cy, (26 + Math.sin(time * 4) * 6) * s, 0.9);
  const rings = [
    [210, Math.abs(Math.sin(time * 0.6)), time * 0.2, 0.75],
    [240, Math.abs(Math.cos(time * 0.8)), -time * 0.3, 0.5],
    [270, Math.abs(Math.sin(time * 0.5)), time * 0.1, 0.3],
  ];
  rings.forEach(([r, k, rot, a], i) => {
    const rx = r * s, ry = Math.max(0.08, k) * r * s;
    ctx.strokeStyle = fg(a);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
    ctx.stroke();
    const th = time * (0.9 + i * 0.35) + i * 2;
    const px = Math.cos(th) * rx, py = Math.sin(th) * ry;
    dot(cx + px * Math.cos(rot) - py * Math.sin(rot), cy + px * Math.sin(rot) + py * Math.cos(rot), 5 * Math.max(s, 0.6), 1);
  });
}

function drawScene() {
  if (scene === 0) drawNetwork(34, 1, 1, -40, 140);
  else if (scene === 1) drawClassMorph();
  else if (scene === 2) drawAgentHub();
  else if (scene === 3) drawNotes();
  else if (scene === 4) drawOrbits();
  else drawNetwork(46, 0.5, 1.5, -40, 150);
}

function render() {
  ctx.globalAlpha = 1;
  ctx.fillStyle = `rgba(${BG},0.38)`;
  ctx.fillRect(0, 0, w, h);
  time += 0.015;
  drawScene();
  requestAnimationFrame(render);
}

// ---------- scroll: active scene, reveals, chapter links ----------
const chapterLinks = [...document.querySelectorAll(".chapter-link")];
const sceneObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const next = Number(e.target.dataset.scene);
    if (next === scene) return;
    scene = next;
    clearCanvas();
    chapterLinks.forEach((a, i) => a.classList.toggle("active", i + 1 === scene));
  });
}, { rootMargin: "-50% 0px -50% 0px" });
document.querySelectorAll("[data-scene]").forEach((el) => sceneObserver.observe(el));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

addEventListener("resize", resize);
applyTheme(root.dataset.theme);
resize();
if (!reduceMotion) render();

// Refresh star counts; the numbers in the HTML stay if the API is unavailable.
document.querySelectorAll(".stars[data-repo]").forEach(async (el) => {
  try {
    const res = await fetch(`https://api.github.com/repos/ytlog/${el.dataset.repo}`);
    if (!res.ok) return;
    el.textContent = (await res.json()).stargazers_count;
  } catch {}
});
