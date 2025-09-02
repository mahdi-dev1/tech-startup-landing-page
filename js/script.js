// ===== Navbar Scroll Effect =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent click bubbling
  navLinks.classList.toggle("show");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("show") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove("show");
  }
});

// Close menu if window is resized beyond mobile
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("show");
  }
});

// ===== Testimonials Carousel (Infinite Loop with Clones) =====
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".left-arrow");
const nextBtn = document.querySelector(".right-arrow");

let index = 1; // Start on first real slide
let autoPlayInterval;

// Clone first and last slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll(".testimonial");
const slideCount = allSlides.length;

// Set initial position
track.style.transform = `translateX(-${index * 100}%)`;

// Move track
function showTestimonial() {
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Manual navigation
nextBtn.addEventListener("click", () => {
  if (index >= slideCount - 1) return; // block while animating
  index++;
  showTestimonial();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  showTestimonial();
  resetAutoPlay();
});

// Reset instantly when hitting clones
track.addEventListener("transitionend", () => {
  const slidesNow = document.querySelectorAll(".testimonial");
  if (allSlides[index].id === "first-clone") {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  if (allSlides[index].id === "last-clone") {
    track.style.transition = "none";
    index = slideCount - 2;
    track.style.transform = `translateX(-${index * 100}%)`;
  }
});

// Auto play every 5 seconds
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (index >= slideCount - 1) return;
    index++;
    showTestimonial();
  }, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Initialize
startAutoPlay();

// Make cards visible
const features = document.querySelectorAll(".feature");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

features.forEach(f => observer.observe(f));
