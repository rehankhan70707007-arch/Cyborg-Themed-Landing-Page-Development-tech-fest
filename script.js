(() => {
  const body = document.body;
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const themeButton = document.querySelector(".theme-toggle");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const light = body.classList.toggle("light-theme");
      themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      themeButton.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  const revealTargets = document.querySelectorAll(
    ".vision-layout, .vision-stats, .systems-heading, .system-card, .protocol-layout, .connect-inner"
  );

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    body.classList.add("js-ready");
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  }
})();
