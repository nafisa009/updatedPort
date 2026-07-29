/* =========================================================
   COMMON — shared across every page
   Injects navbar/footer, handles theme, petals, reveal, mobile nav
   ========================================================= */

(function () {

  const NAV_ITEMS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "skills.html", label: "Skills" },
    { href: "projects.html", label: "Projects" },
    { href: "news.html", label: "News" },
    { href: "testimonials.html", label: "Testimonials" },
    { href: "education.html", label: "Education" },
    { href: "contact.html", label: "Contact" },
  ];

  const currentPage = (location.pathname.split("/").pop() || "index.html");

  /* ---------- INJECT NAVBAR ---------- */
  const headerMount = document.getElementById("app-header");
  if (headerMount) {
    headerMount.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-inner">
          <a href="index.html" class="nav-brand">N<span>.</span>N</a>
          <ul class="nav-links" id="navLinks">
            ${NAV_ITEMS.map(item => `
              <li><a href="${item.href}" class="nav-link${item.href === currentPage ? " active" : ""}">${item.label}</a></li>
            `).join("")}
          </ul>
          <div class="nav-actions">
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark / light mode">🌙</button>
            <a href="assets/Nafisa_Nasrin_Resume.pdf" download class="nav-resume">Resume</a>
            <button class="nav-toggle" id="navToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>
    `;
  }

  /* ---------- INJECT FOOTER ---------- */
  const footerMount = document.getElementById("app-footer");
  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="footer">
        <p>Designed &amp; built by Nafisa Nasrin — inspired by the world of Nico Robin.</p>
        <p class="footer-year">&copy; <span id="year"></span> All rights reserved.</p>
      </footer>
    `;
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  /* ---------- PETAL FIELD ---------- */
  let petalField = document.getElementById("petalField");
  if (!petalField) {
    petalField = document.createElement("div");
    petalField.id = "petalField";
    petalField.className = "petal-field";
    petalField.setAttribute("aria-hidden", "true");
    document.body.prepend(petalField);
  }
  const PETAL_COUNT = window.innerWidth < 700 ? 12 : 22;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const size = 8 + Math.random() * 10;
    petal.style.left = (Math.random() * 100) + "vw";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.animationDuration = (10 + Math.random() * 12) + "s";
    petal.style.animationDelay = (Math.random() * -20) + "s";
    petal.style.setProperty("--drift", (Math.random() * 160 - 80).toFixed(0) + "px");
    petalField.appendChild(petal);
  }

  /* ---------- THEME (dark / light, persisted) ---------- */
  const THEME_KEY = "nn-portfolio-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "light" ? "☀️" : "🌙";
  }
  const savedTheme = localStorage.getItem(THEME_KEY) ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(savedTheme);

  document.addEventListener("click", (e) => {
    if (e.target.id === "themeToggle") {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    }
  });

  /* ---------- NAVBAR SCROLL STATE ---------- */
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest("#navToggle")) {
      document.getElementById("navLinks").classList.toggle("open");
    } else if (e.target.closest(".nav-link")) {
      const links = document.getElementById("navLinks");
      if (links) links.classList.remove("open");
    }
  });

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    const targets = document.querySelectorAll(
      ".reveal, .section, .stat-card, .skill-badge, .project-card, .cert-card, .timeline-item, .news-card, .highlight-card, .guestbook-card"
    );
    targets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    targets.forEach(el => observer.observe(el));
  }

  /* ---------- 3D TILT ON PROJECT CARDS ---------- */
  function initTilt() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initTilt();
  });

})();
