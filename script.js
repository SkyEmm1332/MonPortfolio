// Lightbox multi-images pour la div fidélité
const fideliteImages = [
  "img/fidelite/1.jpg",
  "img/fidelite/2.png",
  "img/fidelite/3.png",
];
let currentFideliteIndex = 0;


function openFideliteLightbox(imgSrc) {
  currentFideliteIndex = fideliteImages.indexOf(imgSrc);
  if (currentFideliteIndex === -1) currentFideliteIndex = 0;
  document.getElementById("lightbox-img").src =
    fideliteImages[currentFideliteIndex];
  document.getElementById("lightbox").style.display = "flex";
  // Remplace les handlers pour naviguer dans fidelite
  document.getElementById("lightbox-prev").onclick = showPrevFideliteImg;
  document.getElementById("lightbox-next").onclick = showNextFideliteImg;
}

function showPrevFideliteImg() {
  currentFideliteIndex =
    (currentFideliteIndex - 1 + fideliteImages.length) % fideliteImages.length;
  document.getElementById("lightbox-img").src =
    fideliteImages[currentFideliteIndex];
}

function showNextFideliteImg() {
  currentFideliteIndex = (currentFideliteIndex + 1) % fideliteImages.length;
  document.getElementById("lightbox-img").src =
    fideliteImages[currentFideliteIndex];
}
// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 10 + 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect and active link
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  // Header effect
  if (window.scrollY > 50) {
    header.style.background = "rgba(15, 23, 42, 0.95)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(15, 23, 42, 0.8)";
    header.style.boxShadow = "none";
  }

  // Active section highlighting
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe animated elements
document
  .querySelectorAll(".project-card, .skill-card, .timeline-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skill items hover effects
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.background = "var(--gradient-accent)";
    this.style.color = "white";
    this.style.transform = "scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.background = "rgba(255, 255, 255, 0.1)";
    this.style.color = "var(--light)";
    this.style.transform = "scale(1)";
  });
});

// Initialize particles
createParticles();

// Dynamic typing effect for code preview
const codeLines = document.querySelectorAll(".code-line");
codeLines.forEach((line, index) => {
  line.style.animationDelay = 1 + index * 0.2 + "s";
});

// Contact buttons interaction
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = "absolute";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Lightbox multi-images pour la div autoEcole
const autoEcoleImages = [
  "img/autoEcole.png",
  "img/Gestion/1.png",
  "img/Gestion/2.png",
  "img/Gestion/3.png",
  "img/Gestion/4.png",
  "img/Gestion/5.png",
  "img/Gestion/6.png",
];
let currentImgIndex = 0;

function openLightbox(imgSrc) {
  currentImgIndex = autoEcoleImages.indexOf(imgSrc);
  if (currentImgIndex === -1) currentImgIndex = 0;
  document.getElementById("lightbox-img").src =
    autoEcoleImages[currentImgIndex];
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function showPrevImg() {
  currentImgIndex =
    (currentImgIndex - 1 + autoEcoleImages.length) % autoEcoleImages.length;
  document.getElementById("lightbox-img").src =
    autoEcoleImages[currentImgIndex];
}

function showNextImg() {
  currentImgIndex = (currentImgIndex + 1) % autoEcoleImages.length;
  document.getElementById("lightbox-img").src =
    autoEcoleImages[currentImgIndex];
}

// Initialisation des événements lightbox après chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  var closeBtn = document.getElementById("lightbox-close");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");
  var lightbox = document.getElementById("lightbox");
  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = showPrevImg;
  if (nextBtn) nextBtn.onclick = showNextImg;
  if (lightbox) {
    lightbox.onclick = function (e) {
      if (e.target === this) closeLightbox();
    };
  }
});
