const WHATSAPP_NUMERO = "55SEUNUMERO";

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("hide"), 420);
});

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
const updateScrollUI = () => {
  const scrolled = window.scrollY > 28;
  header?.classList.toggle("scrolled", scrolled);
  backToTop?.classList.toggle("show", window.scrollY > window.innerHeight * 0.7);
};
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = () => {
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

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
document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const impactText = document.querySelector("[data-split-text]");
if (impactText) {
  const text = impactText.textContent.trim();
  impactText.innerHTML = text
    .split(" ")
    .map((word, index) => `<span class="word" style="transition-delay:${index * 42}ms">${word}</span>`)
    .join(" ");

  const impactObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      impactText.classList.add("visible");
      impactObserver.unobserve(entry.target);
    },
    { threshold: 0.45 }
  );
  impactObserver.observe(impactText);
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
    window.setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  });

  closeButton?.addEventListener("click", () => closeServiceCard(card));
});

const aboutTrigger = document.getElementById("about-trigger");
const aboutPanel = document.getElementById("about-panel");

aboutTrigger?.addEventListener("click", () => {
  const expanded = aboutTrigger.getAttribute("aria-expanded") === "true";
  const nextState = !expanded;

  aboutTrigger.setAttribute("aria-expanded", String(nextState));
  aboutPanel.classList.toggle("open", nextState);

  aboutTrigger.innerHTML = nextState
    ? 'Fechar história <span aria-hidden="true">×</span>'
    : 'Conheça a história <span aria-hidden="true">↗</span>';
});

const contactForm = document.getElementById("contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const nome = String(formData.get("nome") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const mensagem = String(formData.get("mensagem") || "").trim();

  if (WHATSAPP_NUMERO.includes("5561982118809")) {
    alert("Antes de publicar, substitua WHATSAPP_NUMERO em script.js pelo seu número com DDI e DDD. Exemplo: 5561999999999.");
    return;
  }

  const texto = encodeURIComponent(
    `Olá, Gran Rey Cero Studio!\n\nMeu nome é ${nome}.\nMeu WhatsApp: ${whatsapp}.\n\nSobre o projeto:\n${mensagem}`
  );
  window.open(`https://wa.me/${5561982118809}?text=${texto}`, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();

const botaoTopo = document.getElementById("back-to-top");

botaoTopo?.addEventListener("click", () => {
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