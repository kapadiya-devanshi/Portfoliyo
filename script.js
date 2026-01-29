const PROJECTS = {
  soulmate: {
    kicker: "Final Year Project — Mental Health",
    title: "SoulMate — Mental-Health Chatbot (Web-based)",
    desc:
      "SoulMate is a web-based mental health chatbot that supports users with private chat, topic-based guidance, tests, mindfulness exercises, journalling, and SOS support (India).",
    bullets: [
      "Register, login, or continue as a guest to protect user privacy",
      "Chat with the chatbot or pick specific mental-health topics",
      "Run mental health self-assessment tests with simple flows",
      "Guided mindfulness exercises and journalling for manual tracking",
      "SOS hotline support (India only) and edit-profile features",
      "Admin dashboard to manage users, activity, and accounts",
    ],
    tags: [
      "Python",
      "Flask",
      "MySQL",
      "SQLAlchemy",
      "TensorFlow",
      "NLTK",
      "Bootstrap",
      "Flask-Login",
      "Flask-Bcrypt",
    ],
    link: "",
  },
  restaurant: {
    kicker: "Web App",
    title: "Restaurant App",
    desc:
      "A convenient static web application that lets users browse a restaurant menu, place orders, and leave reviews—mobile-friendly and simple to use.",
    bullets: [
      "Menu browsing UI with clean categories and item cards",
      "Order flow designed for quick mobile checkout",
      "Review section for user feedback",
      "Built with a focus on usability and readability",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    link: "",
  },
  assistant: {
    kicker: "Automation (Python)",
    title: "My_AI Voice Assistant",
    desc:
      "A Python voice assistant to automate daily tasks on your computer and make common actions faster using voice commands.",
    bullets: [
      "Greets the user and announces time/date",
      "Opens websites and launches applications/software",
      "Weather lookup for any city",
      "Wikipedia summaries and Google search",
      "Plays songs on YouTube and reads top headlines",
    ],
    tags: ["Python", "Automation", "APIs"],
    link: "",
  },
  zomato: {
    kicker: "Data Analytics",
    title: "Zomato Data Analysis Using Python",
    desc:
      "Scraped Zomato-style restaurant data and analyzed it using Python libraries; visualized insights using charts and plots.",
    bullets: [
      "Scraped fields like name, online order, book table, rate, votes",
      "Cleaned and explored data using Pandas and NumPy",
      "Built charts: heatmap, boxplot, and other visualizations",
      "Focused on turning scraped data into actionable insights",
    ],
    tags: ["BeautifulSoup", "Pandas", "NumPy", "Matplotlib"],
    link: "",
  },
  hospital: {
    kicker: "Full Stack (ASP.NET)",
    title: "Hospital Management System",
    desc:
      "A management system to track bookings, patients, doctors, clinics, treatments, and recent activities with database connectivity.",
    bullets: [
      "Dashboard-style overview for key hospital metrics",
      "Database connectivity and storage integration",
      "CRUD-style workflows for core hospital entities",
      "Built from scratch and managed front-end + database wiring",
    ],
    tags: ["ASP.NET", "C#", "SQL"],
    link: "",
  },
};

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function setYear() {
  const el = qs("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = stored || (prefersLight ? "light" : "dark");
  document.documentElement.dataset.theme = theme;

  const btn = qs(".theme-toggle");
  if (btn) {
    const isLight = theme === "light";
    btn.setAttribute("aria-pressed", String(isLight));
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);

  const btn = qs(".theme-toggle");
  if (btn) btn.setAttribute("aria-pressed", String(next === "light"));
}

function initNav() {
  const toggle = qs(".nav-toggle");
  const menu = qs(".nav-menu");
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  qsa("a", menu).forEach((a) => a.addEventListener("click", close));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) close();
  });
}

function initProjectModal() {
  const modal = qs("#project-modal");
  if (!modal) return;
  const title = qs("#modal-title");
  const kicker = qs("#modal-kicker");
  const desc = qs("#modal-desc");
  const bullets = qs("#modal-bullets");
  const tags = qs("#modal-tags");
  const link = qs("#modal-link");

  function open(key) {
    const data = PROJECTS[key];
    if (!data) return;

    if (title) title.textContent = data.title;
    if (kicker) kicker.textContent = data.kicker;
    if (desc) desc.textContent = data.desc;

    if (bullets) {
      bullets.innerHTML = "";
      data.bullets.forEach((b) => {
        const li = document.createElement("li");
        li.textContent = b;
        bullets.appendChild(li);
      });
    }

    if (tags) {
      tags.innerHTML = "";
      data.tags.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        tags.appendChild(li);
      });
    }

    if (link) {
      const has = Boolean(data.link);
      link.href = has ? data.link : "#";
      link.textContent = has ? "Open repo / link" : "Add repo link";
      link.setAttribute("aria-disabled", String(!has));
      link.style.pointerEvents = has ? "auto" : "none";
      link.style.opacity = has ? "1" : ".55";
    }

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = qs("[data-close]", modal);
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  qsa(".project").forEach((btn) => {
    btn.addEventListener("click", () => open(btn.dataset.project));
  });

  qsa("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") close();
  });
}

function initContactForm() {
  const form = qs("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio contact — ${name || "Message"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:kapadiyadevanshi2@gmail.com?subject=${subject}&body=${body}`;
  });
}

function initThemeButton() {
  const btn = qs(".theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", toggleTheme);
}

function initPlaceholders() {
  // Portfolio profile links
  const LINKS = {
    linkedin: "https://www.linkedin.com/in/devanshi-kapadiya-6a7939359/",
    github: "https://github.com/kapadiya-devanshi",
  };

  // These are also present in the HTML; keeping them here lets us reuse later if needed.
  void LINKS;
}

setYear();
initTheme();
initThemeButton();
initNav();
initProjectModal();
initContactForm();
initPlaceholders();


