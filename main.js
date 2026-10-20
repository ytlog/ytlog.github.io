// Chinese text lives in index.html; this table only holds the English strings.
const EN = {
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.showcase": "Showcase",
  "hero.eyebrow": "Android developer · Open-source portfolio",
  "hero.title": "Android infrastructure and AI engineering",
  "hero.lede": "I'm ytlog, an Android developer with years of client-side work across product features, infrastructure, performance and stability. Lately I focus on AI-assisted development and cross-platform engineering, exploring the full loop from code generation and migration to on-device verification.",
  "hero.cta": "See projects",
  "hero.showcase": "Showcase",
  "kind.runtime": "Runtime",
  "kind.agent": "On-device agent",
  "kind.app": "App",
  "kind.devtool": "Dev tool",
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
  "hotreload.short": "Hot reload for Android Compose",
  "hotreload.tagline": "Hot reload for Jetpack Compose on Android: edit Kotlin / Java code, Compose UI and resources, then apply the changes to the running app — no APK reinstall, no process restart.",
  "hotreload.p1": "Edit Compose UI and function bodies, and see the result in the running app after compiling",
  "hotreload.p2": "Update existing Android resources such as strings, colors, drawables and assets",
  "hotreload.p3": "Redefines classes on ART through art-dcevm, with add, change and remove for fields, methods and interfaces",
  "hotreload.p4": "Gradle plugin setup; --auto reloads on save, and failure details appear in devtools",
  "hotreload.guide": "Usage guide",
  "hotreload.c1": "# run from your app project root",
  "hotreload.c2": "# no reinstall; keeps remember state where possible",
  "hotreload.c3": "+ save a Kotlin file → compile → hot reload",
  "hotreload.f1": "Gradle plugin",
  "hotreload.f2": "Convert to DEX",
  "hotreload.f3": "Device runtime",
  "hotreload.f4": "ART redefine · refresh UI",
  "about.practice": "Selected work",
  "about.p1": "Built performance and stability safeguards for client apps, so problems are found, diagnosed and fixed earlier",
  "about.p2": "Developed IDE plugins and developer tools that bring AI into everyday engineering work",
  "about.p3": "Explored cross-platform code migration and automated verification, using compile feedback and on-device runs to shorten the feedback loop",
  "skills.title": "Core skills",
  "skills.a.t": "Android infrastructure",
  "skills.a.d": "Startup and smoothness optimization, stability work, core components and diagnostic tools, build systems and CI pipelines",
  "skills.b.t": "AI developer tools",
  "skills.b.d": "Coding assistants, AI code review, unit test generation, knowledge retrieval and agent workflows",
  "skills.c.t": "Cross-platform & full-stack",
  "skills.c.d": "Cross-platform development with Kotlin Multiplatform, Compose and React Native, plus full-stack work",
  "skills.stack": "Stack",
  "focus.1": "Android performance",
  "focus.2": "Android stability",
  "focus.3": "Agent development",
  "focus.4": "Full-stack development",
  "focus.5": "On-device LLMs",
  "focus.6": "APM monitoring",
  "focus.7": "ART virtual machine",
  "focus.8": "Engineering productivity · CI/CD",
  "focus.9": "Android build systems",
  "focus.10": "Cross-platform development",
  "footer.contact": "Résumé available on request — reach me through GitHub",
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

// Pick each image for the current language, and its dark variant if it has one.
function updateImages() {
  const dark = isDark();
  document.querySelectorAll("img[data-src-en]").forEach((img) => {
    const key = (dark && img.dataset.srcDarkEn ? "srcDark" : "src") + (lang === "en" ? "En" : "Zh");
    if (img.getAttribute("src") !== img.dataset[key]) img.src = img.dataset[key];
  });
}

// The button names the mode it switches to.
function updateThemeLabel() {
  const dark = isDark();
  root.classList.toggle("dark", dark);
  updateImages();
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

// Star counts: show the cached numbers at once and ask GitHub at most once an
// hour, which keeps well inside its unauthenticated rate limit. Both pages share
// the cache; the numbers in the HTML stay if the API is unavailable.
const STAR_TTL = 60 * 60 * 1000;
let starCache = {};
try { starCache = JSON.parse(stored("stars")) || {}; } catch {}

document.querySelectorAll(".stars[data-repo]").forEach(async (el) => {
  const repo = el.dataset.repo;
  const show = (n) => { el.querySelector("b").textContent = n; };
  const hit = starCache[repo];
  if (hit) show(hit.n);
  if (hit && Date.now() - hit.t < STAR_TTL) return;
  try {
    const res = await fetch(`https://api.github.com/repos/ytlog/${repo}`);
    if (!res.ok) return;
    const n = (await res.json()).stargazers_count;
    show(n);
    starCache[repo] = { n, t: Date.now() };
    store("stars", JSON.stringify(starCache));
  } catch {}
});
