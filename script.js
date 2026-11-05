const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

const handleScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 45);
};
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");
  mainNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("is-open");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
const sceneSections = [...document.querySelectorAll("main > section")];
sceneSections.forEach((section, index) => {
  section.classList.add("section-scene");
  if (index === 0) section.classList.add("is-visible");
  revealObserver.observe(section);
});

// Garante a animação também durante a rolagem manual com o mouse ou touch.
// Ao sair da tela, a seção volta ao estado inicial para animar novamente ao retornar.
const animateSectionsOnScroll = () => {
  const triggerLine = window.innerHeight * 0.82;
  sceneSections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    section.classList.toggle("is-visible", top <= triggerLine && bottom >= 0);
  });
};
window.addEventListener("scroll", animateSectionsOnScroll, { passive: true });
requestAnimationFrame(animateSectionsOnScroll);

const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      item.classList.toggle("is-hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = () => {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  if (lightboxImage) lightboxImage.src = "";
  document.body.classList.remove("menu-open");
};
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img")?.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  });
});
lightbox?.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".accordion details[open]").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

