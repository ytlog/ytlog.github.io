// Chinese text lives in index.html; this table only holds the English strings.
const EN = {
  "nav.projects": "Projects",
  "nav.focus": "Focus",
  "hero.eyebrow": "Android · Runtime · On-device AI",
  "hero.title": "Android tools that work close to the system",
  "hero.lede": "I'm ytlog, an Android developer. Lately I've been working on two things: letting ART change class structure in a running app, and bringing coding agents to the phone.",
  "hero.cta": "See projects",
  "projects.title": "Open source",
  "dcevm.tagline": "Enhanced class redefinition for the Android runtime: change fields, methods, modifiers and inheritance while the app runs, without root.",
  "dcevm.p1": "Add, retire and restore fields, methods and constructors; change field types and method signatures",
  "dcevm.p2": "Interface evolution: new default/static methods and parent interfaces, batched atomically with implementations",
  "dcevm.p3": "Live objects keep compatible field values; unsupported changes reject the whole batch and keep old definitions",
  "dcevm.p4": "Built on ART's own structural redefinition transaction, taking over only verification, member mapping and class allocation",
  "dcevm.use": "Hot reload · Debugging · Class evolution",
  "dcevm.docs": "Supported changes & limits",
  "dcevm.docsHref": "https://github.com/ytlog/art-dcevm/blob/main/docs/LIMITATIONS.en.md",
  "facts.platform": "Platform",
  "facts.stack": "Stack",
  "facts.use": "Use",
  "facts.license": "License",
  "links.repo": "View repository",
  "code.c1": "// 0 in live objects",
  "code.c2": "// old calls see it retired",
  "flow.1": "Your JVMTI agent",
  "flow.3": "ART DCEVM verify · map",
  "flow.4": "ART structural transaction",
  "mobby.tagline": "Runs Pi, Claude Code, Codex and OpenCode directly on Android, with access to your screen, photos and files: a personal AI assistant on your device.",
  "mobby.p1": "Screen Q&A: tap the floating button to read the screen, then translate, explain or ask follow-ups",
  "mobby.p2": "Photos and files: describe images, copy and organize files, save results back to the phone",
  "mobby.p3": "App control: reads the screen, taps, types and moves between pages to finish multi-step tasks",
  "mobby.p4": "Coding on device: writes code in the device workspace, starts a local server and opens it in the browser",
  "mobby.download": "Download APK",
  "mobby.alt": "mobby on an Android tablet and phone",
  "focus.title": "Focus",
  "focus.a.t": "Android runtime",
  "focus.a.d": "ART internals, JVMTI, class loading and redefinition, native hooks.",
  "focus.b.t": "Developer tools",
  "focus.b.d": "Hot reload, debugging aids, and verification you can reproduce on real devices.",
  "focus.c.t": "On-device AI agents",
  "focus.c.d": "Connecting coding agents to the phone's screen, files and apps.",
};

const ZH = {};
const nodes = [...document.querySelectorAll("[data-i18n]")];
const hrefNodes = [...document.querySelectorAll("[data-i18n-href]")];
const altNodes = [...document.querySelectorAll("[data-i18n-alt]")];
nodes.forEach((el) => { ZH[el.dataset.i18n] = el.textContent; });
hrefNodes.forEach((el) => { ZH[el.dataset.i18nHref] = el.getAttribute("href"); });
altNodes.forEach((el) => { ZH[el.dataset.i18nAlt] = el.getAttribute("alt"); });

const toggle = document.getElementById("lang-toggle");

function apply(lang) {
  const dict = lang === "en" ? EN : ZH;
  nodes.forEach((el) => { el.textContent = dict[el.dataset.i18n] ?? ZH[el.dataset.i18n]; });
  hrefNodes.forEach((el) => { el.setAttribute("href", dict[el.dataset.i18nHref]); });
  altNodes.forEach((el) => { el.setAttribute("alt", dict[el.dataset.i18nAlt]); });
  document.querySelectorAll("img[data-src-en]").forEach((img) => {
    img.src = lang === "en" ? img.dataset.srcEn : img.dataset.srcZh;
  });
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.title = lang === "en" ? "ytlog · Portfolio" : "ytlog · 作品集";
  toggle.textContent = lang === "en" ? "中文" : "EN";
  toggle.dataset.lang = lang;
}

function savedLang() {
  try { return localStorage.getItem("lang"); } catch { return null; }
}

toggle.addEventListener("click", () => {
  const next = toggle.dataset.lang === "en" ? "zh" : "en";
  apply(next);
  try { localStorage.setItem("lang", next); } catch {}
});

const initial = savedLang() || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
apply(initial);

// Refresh star counts; the numbers in the HTML stay if the API is unavailable.
document.querySelectorAll(".stars[data-repo]").forEach(async (el) => {
  try {
    const res = await fetch(`https://api.github.com/repos/ytlog/${el.dataset.repo}`);
    if (!res.ok) return;
    const { stargazers_count } = await res.json();
    el.querySelector("b").textContent = stargazers_count;
  } catch {}
});
