// script.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  // sticky navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // fade-in delle sezioni al load
  const fadeSections = document.querySelectorAll("section, footer");
  fadeSections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("fade-in");
    }, 200 * index);
  });

  // toggle menu mobile
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }

  // pulsante scroll top
  const scrollBtn = document.querySelector("#scrollToTop");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // popup info o modali
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(btn.dataset.openModal);
      if (modal) modal.classList.add("show");
    });
  });

  document.querySelectorAll(".modal .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".modal").classList.remove("show");
    });
  });

  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal.show").forEach(modal => {
      if (e.target === modal) modal.classList.remove("show");
    });
  });
});