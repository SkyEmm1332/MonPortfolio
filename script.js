// Fonction pour gérer le menu mobile
function toggleMobileMenu() {
  var menu = document.getElementById("navMenuMobile");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
  } else {
    menu.classList.add("open");
  }
}

// Fermer le menu mobile au clic sur un lien
document.addEventListener("DOMContentLoaded", function () {
  var mobileLinks = document.querySelectorAll(".nav-menu-mobile .nav-link");
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("navMenuMobile").classList.remove("open");
    });
  });
});

// Gestion des touches pour l'accessibilité
function handleKeyDown(event, imgSrc) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (imgSrc.includes('fidelite')) {
      openFideliteLightbox(imgSrc);
    } else {
      openLightbox(imgSrc);
    }
  }
}

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
  document.getElementById("lightbox-img").src = fideliteImages[currentFideliteIndex];
  document.getElementById("lightbox").style.display = "flex";
  
  // Remplace les handlers pour naviguer dans fidelite
  document.getElementById("lightbox-prev").onclick = showPrevFideliteImg;
  document.getElementById("lightbox-next").onclick = showNextFideliteImg;
}

function showPrevFideliteImg() {
  currentFideliteIndex = (currentFideliteIndex - 1 + fideliteImages.length) % fideliteImages.length;
  document.getElementById("lightbox-img").src = fideliteImages[currentFideliteIndex];
}

function showNextFideliteImg() {
  currentFideliteIndex = (currentFideliteIndex + 1) % fideliteImages.length;
  document.getElementById("lightbox-img").src = fideliteImages[currentFideliteIndex];
}

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
  document.getElementById("lightbox-img").src = autoEcoleImages[currentImgIndex];
  document.getElementById("lightbox").style.display = "flex";
  
  // Restaure les handlers par défaut
  document.getElementById("lightbox-prev").onclick = showPrevImg;
  document.getElementById("lightbox-next").onclick = showNextImg;
}

function showPrevImg() {
  currentImgIndex = (currentImgIndex - 1 + autoEcoleImages.length) % autoEcoleImages.length;
  document.getElementById("lightbox-img").src = autoEcoleImages[currentImgIndex];
}

function showNextImg() {
  currentImgIndex = (currentImgIndex + 1) % autoEcoleImages.length;
  document.getElementById("lightbox-img").src = autoEcoleImages[currentImgIndex];
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Fonction pour le dashboard (fonction simple d'affichage)
function dashboard(imgSrc) {
  // Ouvre la lightbox avec une seule image
  document.getElementById("lightbox-img").src = imgSrc;
  document.getElementById("lightbox").style.display = "flex";
  
  // Désactive la navigation pour une seule image
  document.getElementById("lightbox-prev").onclick = null;
  document.getElementById("lightbox-next").onclick = null;
  document.getElementById("lightbox-prev").style.display = "none";
  document.getElementById("lightbox-next").style.display = "none";
}

// Animation des particules
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

// Header scroll effect et active link
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

// Filtres de projets
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Intersection Observer pour les animations
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

// Observer les éléments animés
function observeAnimatedElements() {
  document.querySelectorAll(".project-card, .tech-category, .contact-item").forEach((el) => {
    observer.observe(el);
  });
}

// Effets hover sur les cartes de projet
function initProjectCardEffects() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Initialisation des événements lightbox
function initLightboxEvents() {
  const closeBtn = document.getElementById("lightbox-close");
  const lightbox = document.getElementById("lightbox");
  
  if (closeBtn) {
    closeBtn.onclick = () => {
      closeLightbox();
      // Réaffiche les boutons de navigation
      document.getElementById("lightbox-prev").style.display = "block";
      document.getElementById("lightbox-next").style.display = "block";
    };
  }
  
  if (lightbox) {
    lightbox.onclick = function (e) {
      if (e.target === this) {
        closeLightbox();
        // Réaffiche les boutons de navigation
        document.getElementById("lightbox-prev").style.display = "block";
        document.getElementById("lightbox-next").style.display = "block";
      }
    };
  }

  // Gestion des touches du clavier pour la lightbox
  document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
      if (e.key === 'Escape') {
        closeLightbox();
        document.getElementById("lightbox-prev").style.display = "block";
        document.getElementById("lightbox-next").style.display = "block";
      } else if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById("lightbox-prev");
        if (prevBtn.onclick) prevBtn.onclick();
      } else if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById("lightbox-next");
        if (nextBtn.onclick) nextBtn.onclick();
      }
    }
  });
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // Créer les particules
  createParticles();
  
  // Initialiser les filtres de projets
  initProjectFilters();
  
  // Initialiser les effets des cartes
  initProjectCardEffects();
  
  // Observer les éléments animés
  observeAnimatedElements();
  
  // Initialiser les événements lightbox
  initLightboxEvents();
  
  // Gestion de l'image d'avatar
  initAvatarImage();
  
  console.log("Portfolio initialized successfully!");
});

// Gestion de l'image d'avatar
function initAvatarImage() {
  const avatarImage = document.querySelector('.avatar-image');
  const heroAvatar = document.querySelector('.hero-avatar');
  
  if (avatarImage) {
    avatarImage.addEventListener('error', function() {
      console.log("Erreur de chargement de l'image d'avatar");
      // Créer un placeholder si l'image ne charge pas
      const placeholder = document.createElement('div');
      placeholder.className = 'avatar-placeholder';
      placeholder.innerHTML = '<i class="fas fa-user"></i>';
      
      // Remplacer l'image par le placeholder
      this.style.display = 'none';
      if (heroAvatar && !heroAvatar.querySelector('.avatar-placeholder')) {
        heroAvatar.appendChild(placeholder);
      }
    });
    
    avatarImage.addEventListener('load', function() {
      console.log("Image d'avatar chargée avec succès");
      // Supprimer le placeholder s'il existe
      const placeholder = heroAvatar?.querySelector('.avatar-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
    });
  }
}

// Effet de ripple sur les boutons
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn') || e.target.classList.contains('filter-btn')) {
    const button = e.target;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
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

    // S'assurer que le bouton a une position relative
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Animation CSS pour l'effet ripple
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);