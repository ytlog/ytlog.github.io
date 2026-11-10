// Theme, language and motion for the mobby articles. Both pages hold the Chinese and
// English text side by side; the head script picks one before first paint.
// The keys "theme" and "lang" are shared with the overview page.
(function () {
  const root = document.documentElement;
  const store = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const langToggle = document.getElementById("lang-toggle");

  const isDark = () => (root.dataset.theme ? root.dataset.theme === "black" : systemDark.matches);
  const lang = () => (root.dataset.lang === "en" ? "en" : "zh");

  function refresh() {
    const en = lang() === "en";
    const dark = isDark();
    root.classList.toggle("dark", dark);
    root.lang = en ? "en" : "zh-CN";
    document.title = en ? root.dataset.titleEn : root.dataset.titleZh;
    const target = dark ? (en ? "Light" : "浅色") : (en ? "Dark" : "深色");
    themeLabel.textContent = target;
    themeToggle.setAttribute("aria-label", target);
    langToggle.textContent = en ? "中文" : "EN";
  }

  function dropParam(name) {
    const url = new URL(location.href);
    if (!url.searchParams.has(name)) return;
    url.searchParams.delete(name);
    history.replaceState(null, "", url);
  }

  themeToggle.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "white" : "black";
    store("theme", root.dataset.theme);
    dropParam("theme");
    refresh();
  });

  langToggle.addEventListener("click", () => {
    root.dataset.lang = lang() === "en" ? "zh" : "en";
    store("lang", root.dataset.lang);
    dropParam("lang");
    refresh();
  });

  systemDark.addEventListener("change", refresh);
  refresh();

  // Series anchors (#mobby) exist once per language; jump to the visible one.
  function followAnchor() {
    const name = decodeURIComponent(location.hash.slice(1));
    if (!name) return;
    const target = Array.from(document.querySelectorAll("[data-anchor]"))
      .find((el) => el.dataset.anchor === name && el.offsetParent !== null);
    if (target) target.scrollIntoView();
  }
  addEventListener("hashchange", followAnchor);
  langToggle.addEventListener("click", followAnchor);
  followAnchor();

  // ---------- motion ----------
  // Everything below is decoration. With reduced motion the CSS shows the
  // final state and nothing here runs.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    root.classList.remove("js");
    return;
  }

  // Scroll reveal. Children of one parent come in one after another.
  const revealTargets = [
    ".toc", ".chapter-head", ".prose", ".grid-2 > *", ".grid-3 > *", ".grid-4 > *", ".loop li",
    ".note", ".screens", ".timeline li", ".steps li", ".kv", ".code-card", ".pipe", ".caps > *",
    ".examples > *", ".limits li", ".next", ".post", ".split > *",
  ].join(",");
  const revealed = [];
  document.querySelectorAll(revealTargets).forEach((el) => {
    if (el.parentElement.closest(".reveal")) return;
    const order = revealed.filter((other) => other.parentElement === el.parentElement).length;
    el.style.setProperty("--d", Math.min(order * 0.07, 0.35) + "s");
    el.classList.add("reveal");
    revealed.push(el);
  });
  // Once shown, drop the reveal styles so hover transitions are not delayed.
  const settle = (el) => {
    el.addEventListener("transitionend", function done(e) {
      if (e.target !== el || e.propertyName !== "opacity") return;
      el.removeEventListener("transitionend", done);
      el.classList.remove("reveal", "in");
      el.style.removeProperty("--d");
    });
  };
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      settle(entry.target);
      entry.target.classList.add("in");
      revealer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealed.forEach((el) => revealer.observe(el));

  // Diagrams that start animating when they come on screen.
  document.querySelectorAll(".pipe").forEach((pipe) => {
    const chips = pipe.querySelectorAll("li");
    chips.forEach((li, i) => li.style.setProperty("--i", i));
    pipe.style.setProperty("--n", chips.length);
  });
  const liveObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("live");
      liveObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll(".loop, .pipe, .timeline, .screens").forEach((el) => liveObserver.observe(el));

  // Type the example request in the hero. The whole sentence is laid out from
  // the start (the untyped part is transparent), so the layout never shifts
  // and screen readers get the full text.
  document.querySelectorAll(".prompt").forEach((prompt) => {
    const label = prompt.querySelector("small");
    const text = Array.from(prompt.childNodes).filter((n) => n !== label).map((n) => n.textContent).join("");
    const chars = Array.from(text);
    const typed = document.createElement("span");
    const caret = document.createElement("span");
    const ghost = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");
    ghost.className = "ghost";
    ghost.textContent = text;
    prompt.replaceChildren(label, typed, caret, ghost);
    const step = Math.max(18, Math.min(60, 1800 / chars.length));
    let i = 0;
    setTimeout(function tick() {
      i += 1;
      typed.textContent = chars.slice(0, i).join("");
      ghost.textContent = chars.slice(i).join("");
      if (i < chars.length) setTimeout(tick, step);
      else setTimeout(() => caret.remove(), 1600);
    }, 700);
  });

  // Reading progress on the article pages.
  if (document.querySelector(".chapter")) {
    const bar = document.createElement("div");
    bar.className = "progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.append(bar);
    let queued = false;
    const update = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", max > 0 ? Math.min(scrollY / max, 1) : 0);
    };
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }
})();
