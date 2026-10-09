 
const CONTACT_EMAIL = "caiobarreto1000@hotmail.com";
const LANGUAGE_STORAGE_KEY = "grc-language";

let currentLanguage = "pt";

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (savedLanguage === "pt" || savedLanguage === "en") {
    return savedLanguage;
  }

  const browserLanguages = navigator.languages || [navigator.language];
  const usesEnglish = browserLanguages.some((language) =>
    language.toLowerCase().startsWith("en")
  );

  return usesEnglish ? "en" : "pt";
}

function getTranslation(key) {
  return translations?.[currentLanguage]?.[key] || "";
}

function updateAboutButton() {
  const aboutTrigger = document.getElementById("about-trigger");
  const aboutPanel = document.getElementById("about-panel");

  if (!aboutTrigger || !aboutPanel) return;

  const isOpen = aboutPanel.classList.contains("open");
  const label = isOpen
    ? getTranslation("about.close")
    : getTranslation("about.open");

  aboutTrigger.innerHTML = `${label} <span aria-hidden="true">${
    isOpen ? "×" : "→"
  }</span>`;

  aboutTrigger.setAttribute(
    "aria-label",
    isOpen
      ? getTranslation("aria.about.close")
      : getTranslation("aria.about.open")
  );
}

function setLanguage(language) {
  if (!translations?.[language]) return;

  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

  document.documentElement.lang = language === "en" ? "en-US" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getTranslation(key);

    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = getTranslation(key);

    if (value) {
      element.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const value = getTranslation(key);

    if (value) {
      element.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const key = element.dataset.i18nContent;
    const value = getTranslation(key);

    if (value) {
      element.setAttribute("content", value);
    }
  });

  document.title =
    language === "en"
      ? "Gran Rey Cero Studio — Web Design & Development"
      : "Gran Rey Cero Studio — Web Design & Development";

  document.querySelectorAll(".language-button").forEach((button) => {
    const isActive = button.dataset.language === language;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateAboutButton();
}

function initializeLanguageSwitcher() {
  setLanguage(getInitialLanguage());

  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;

      if (language === "pt" || language === "en") {
        setLanguage(language);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLanguageSwitcher();

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    window.setTimeout(() => loader?.classList.add("hide"), 420);
  });

  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");

  const updateScrollUI = () => {
    const scrolled = window.scrollY > 28;

    header?.classList.toggle("scrolled", scrolled);
    backToTop?.classList.toggle(
      "show",
      window.scrollY > window.innerHeight * 0.7
    );
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", getTranslation("aria.menu.open"));
    mobileMenu?.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.toggle("open") || false;

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? getTranslation("aria.menu.close")
        : getTranslation("aria.menu.open")
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  mobileMenu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((item) => revealObserver.observe(item));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((item) => item.classList.add("visible"));
  }

  const impactText = document.querySelector("[data-split-text]");

  function splitImpactText() {
    if (!impactText) return;

    const text = getTranslation("impact.statement") || impactText.textContent.trim();

    impactText.innerHTML = text
      .split(" ")
      .map(
        (word, index) =>
          `<span class="word" style="transition-delay:${index * 42}ms">${word}</span>`
      )
      .join(" ");
  }

  if (impactText) {
    splitImpactText();

    if ("IntersectionObserver" in window) {
      const impactObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          impactText.classList.add("visible");
          impactObserver.unobserve(entry.target);
        },
        { threshold: 0.45 }
      );

      impactObserver.observe(impactText);
    } else {
      impactText.classList.add("visible");
    }
  }

  const serviceCards = document.querySelectorAll("[data-service-card]");

  const closeServiceCard = (card) => {
    card.classList.remove("open");
    card.querySelector(".service-cover")?.setAttribute("aria-expanded", "false");
  };

  serviceCards.forEach((card) => {
    const cover = card.querySelector(".service-cover");
    const closeButton = card.querySelector(".service-close");

    cover?.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      serviceCards.forEach((otherCard) => {
        if (otherCard !== card) closeServiceCard(otherCard);
      });

      if (isOpen) {
        closeServiceCard(card);
        return;
      }

      card.classList.add("open");
      cover.setAttribute("aria-expanded", "true");

      window.setTimeout(() => {
        card.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 120);
    });

    closeButton?.addEventListener("click", () => closeServiceCard(card));
  });

  const aboutTrigger = document.getElementById("about-trigger");
  const aboutPanel = document.getElementById("about-panel");

  aboutTrigger?.addEventListener("click", () => {
    const expanded = aboutTrigger.getAttribute("aria-expanded") === "true";
    const nextState = !expanded;

    aboutTrigger.setAttribute("aria-expanded", String(nextState));
    aboutPanel?.classList.toggle("open", nextState);
    updateAboutButton();
  });

  const contactForm = document.getElementById("contact-form");

   contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = String(formData.get("nome") || "").trim();
    const telefone = String(formData.get("whatsapp") || "").trim();
    const mensagem = String(formData.get("mensagem") || "").trim();

    const subject = getTranslation("email.subject");

    const lines = [
      getTranslation("email.greeting"),
      "",
      `${getTranslation("email.name")}: ${nome}`
    ];

    if (telefone) {
      lines.push(`${getTranslation("email.phone")}: ${telefone}`);
    }

    lines.push("", `${getTranslation("email.project")}:`, mensagem);

    const body = lines.join("\r\n");

    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  document.querySelectorAll("[data-service-card]").forEach((card) => {
    const track = card.querySelector(".service-track");
    const previousButton = card.querySelector(".service-arrow-prev");
    const nextButton = card.querySelector(".service-arrow-next");

    if (!track || !previousButton || !nextButton) return;

    function getStep() {
      const panel = track.querySelector(".service-panel");

      if (!panel) return track.clientWidth;

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.gap) || 0;

      return panel.getBoundingClientRect().width + gap;
    }

    function updateArrows() {
      const atStart = track.scrollLeft <= 4;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

      previousButton.classList.toggle("is-disabled", atStart);
      nextButton.classList.toggle("is-disabled", atEnd);
    }

    previousButton.addEventListener("click", () => {
      track.scrollBy({
        left: -getStep(),
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({
        left: getStep(),
        behavior: "smooth"
      });
    });

    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    updateArrows();
  });

  document.addEventListener("languagechange", splitImpactText);
});
