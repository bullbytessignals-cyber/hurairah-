/* Hurairah Trades — main.js */
(function () {
  "use strict";

  /* ----- Sticky header shadow ----- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----- Mobile nav ----- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ----- Active nav link (works with and without .html / clean URLs) ----- */
  const norm = (p) => (p.split("/").pop() || "index").replace(/\.html$/, "");
  const here = norm(location.pathname);
  document.querySelectorAll(".main-nav a").forEach((a) => {
    if (norm(a.getAttribute("href")) === here) a.classList.add("active");
  });

  /* ----- Duplicate marquee tracks for seamless loop ----- */
  document.querySelectorAll(".ticker-track, .word-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ----- Reveal on scroll ----- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ----- Animated counters ----- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const fmt = (n, dec) => n.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          co.unobserve(el);
          const end = parseFloat(el.dataset.count);
          const dec = (el.dataset.count.split(".")[1] || "").length;
          const dur = 1600;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = fmt(end * eased, dec);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => co.observe(el));
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.closest(".faq").querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ----- Contact form (mailto handoff) ----- */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(
        "[Website] " + (data.get("topic") || "Enquiry") + " — " + (data.get("name") || "")
      );
      const body = encodeURIComponent(
        "Name: " + data.get("name") + "\n" +
        "Email: " + data.get("email") + "\n" +
        "Topic: " + data.get("topic") + "\n\n" +
        data.get("message")
      );
      window.location.href = "mailto:" + form.dataset.email + "?subject=" + subject + "&body=" + body;
    });
  }

  /* ----- Year ----- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
