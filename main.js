// Chinese text lives in index.html; this table only holds the English strings.
const EN = {
  "nav.projects": "Projects",
  "nav.focus": "Focus",
  "nav.showcase": "Showcase",
  "hero.eyebrow": "Android · Runtime · On-device AI",
  "hero.title": "Android tools that work close to the system",
  "hero.lede": "I'm ytlog, an Android developer working on three things: letting ART change class structure in a running app, bringing coding agents to the phone, and a notebook you can write in the moment it opens.",
  "hero.cta": "See projects",
  "hero.showcase": "Showcase",
  "kind.runtime": "Runtime",
  "kind.agent": "On-device agent",
  "kind.app": "App",
  "dcevm.short": "Change Android class structure at runtime",
  "mobby.short": "Coding agents running on Android",
  "flowa.short": "A notebook that opens ready to write",
  "projects.title": "Open source",
  "dcevm.tagline": "Enhanced class redefinition for the Android runtime: change fields, methods, modifiers and inheritance while the app runs — no root, no system partition changes.",
  "dcevm.p1": "Add, retire and restore fields, methods and constructors; change field types and method signatures",
  "dcevm.p2": "Interface evolution: new default/static methods and parent interfaces, batched atomically with implementations",
  "dcevm.p3": "Live objects keep compatible field values; unsupported changes reject the whole batch and keep old definitions",
  "dcevm.p4": "Built on ART's own structural redefinition transaction, taking over only verification, member mapping and class allocation",
  "dcevm.docs": "Supported changes & limits",
  "dcevm.docsHref": "https://github.com/ytlog/art-dcevm/blob/main/docs/LIMITATIONS.en.md",
  "facts.platform": "Platform",
  "facts.stack": "Stack",
  "facts.license": "License",
  "links.repo": "Repository",
  "links.apk": "Download APK",
  "code.c1": "// 0 in live objects",
  "code.c2": "// old calls see it retired",
  "flow.1": "Your JVMTI agent",
  "flow.3": "ART DCEVM verify · map",
  "flow.4": "ART structural transaction",
  "mobby.tagline": "Runs Pi, Claude Code, Codex and OpenCode directly on Android, with access to your screen, photos and files — a personal AI assistant on your device.",
  "mobby.p1": "Screen Q&A: tap the floating button to read the screen, then translate, explain or ask follow-ups",
  "mobby.p2": "Photos and files: describe images, organize files, save results back to the phone",
  "mobby.p3": "App control: reads the screen, taps and types across pages to finish multi-step tasks",
  "mobby.p4": "Coding on device: writes code locally, starts a server and opens it in the browser",
  "mobby.alt": "mobby on an Android tablet and phone",
  "flowa.cn": "",
  "flowa.tagline": "A plain-text quick-capture notebook: open and write. Catch a fleeting thought, then sort it with tags, search and workflows.",
  "flowa.p1": "Opens on a blank page with the cursor ready; drafts autosave on your device",
  "flowa.p2": "Tag and keyword search with include/exclude tag filters, plus random review of old notes",
  "flowa.p3": "Built-in workflows for saving, cleaning up dictation and polishing text, freely combinable with AI, copy and HTTP steps",
  "flowa.p4": "Connect your own AI service; notes work fully without one",
  "flowa.alt1": "Open and write, catching ideas anytime",
  "flowa.alt2": "Search text and tags to find notes again",
  "flowa.alt3": "Organize scattered ideas with tags",
  "focus.title": "Focus",
  "focus.a.t": "Android runtime",
  "focus.a.d": "ART internals, JVMTI, class loading and redefinition, native hooks",
  "focus.b.t": "Developer tools",
  "focus.b.d": "Hot reload, debugging aids, and verification reproducible on real devices",
  "focus.c.t": "On-device agents",
  "focus.c.d": "Connecting coding agents to the phone's screen, files and apps",
  "footer.showcase": "Cinematic showcase",
};

const ZH = {};
const textNodes = [...document.querySelectorAll("[data-i18n]")];
const hrefNodes = [...document.querySelectorAll("[data-i18n-href]")];
const altNodes = [...document.querySelectorAll("[data-i18n-alt]")];
textNodes.forEach((el) => { ZH[el.dataset.i18n] = el.textContent; });
hrefNodes.forEach((el) => { ZH[el.dataset.i18nHref] = el.getAttribute("href"); });
altNodes.forEach((el) => { ZH[el.dataset.i18nAlt] = el.getAttribute("alt"); });

function stored(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function store(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// ---------- language ----------
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
  document.title = lang === "en" ? "ytlog · Portfolio" : "ytlog · 作品集";
  langToggle.textContent = lang === "en" ? "中文" : "EN";
  updateThemeLabel();
}

langToggle.addEventListener("click", () => {
  applyLang(lang === "en" ? "zh" : "en");
  store("lang", lang);
});

// ---------- light / dark ----------
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const systemDark = matchMedia("(prefers-color-scheme: dark)");

function isDark() {
  return root.dataset.theme ? root.dataset.theme === "black" : systemDark.matches;
}

// The button names the mode it switches to.
function updateThemeLabel() {
  const dark = isDark();
  root.classList.toggle("dark", dark);
  const target = dark ? (lang === "en" ? "Light" : "浅色") : (lang === "en" ? "Dark" : "深色");
  themeLabel.textContent = target;
  themeToggle.setAttribute("aria-label", target);
}

themeToggle.addEventListener("click", () => {
  const next = isDark() ? "white" : "black";
  root.dataset.theme = next;
  store("theme", next);
  updateThemeLabel();
  const url = new URL(location.href);
  url.searchParams.delete("theme");
  history.replaceState(null, "", url);
});
systemDark.addEventListener("change", updateThemeLabel);

applyLang(stored("lang") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));

// Refresh star counts; the numbers in the HTML stay if the API is unavailable.
document.querySelectorAll(".stars[data-repo]").forEach(async (el) => {
  try {
    const res = await fetch(`https://api.github.com/repos/ytlog/${el.dataset.repo}`);
    if (!res.ok) return;
    el.querySelector("b").textContent = (await res.json()).stargazers_count;
  } catch {}
});
