// ============================================================
// MIKE'S SERVICES LLC — main.js
// ============================================================
// SERVICE TOGGLE SYSTEM
// To add a service: set active: true and fill in all fields
// To remove a service: set active: false
// Images go in /images folder, reference filename only
// Page links are the HTML filename for that service page
// ============================================================

const services = [
  {
    active: true,
    name: "Septic Installation",
    desc: "Full septic installation and site prep across Central Kansas. We handle excavation, grading, and coordination with local inspectors.",
    image: "./images/septic.webp",
    alt: "Septic installation in Salina, Kansas — Mike's Services LLC",
    page: "septic.html"
  },
  {
    active: true,
    name: "Excavation & Trenching",
    desc: "Excavation and trenching for utilities, foundations, driveways, and rural projects across Central Kansas.",
    image: "./images/excavation.webp",
    alt: "Excavation and trenching in Central Kansas — Mike's Services LLC",
    page: "excavation.html"
  },
  {
    active: true,
    name: "Land Clearing",
    desc: "Property clearing, pasture clearing, brush removal, and debris hauling for residential and commercial lots.",
    image: "./images/landClearing.webp",
    alt: "Land clearing job in Central Kansas — Mike's Services LLC",
    page: "land-clearing.html"
  },
  {
    active: true,
    name: "Demolition & Removal",
    desc: "Small or large demolition, removal, and clean-up work with safe disposal and efficient hauling.",
    image: "./images/demolition.webp",
    alt: "Demolition removal in Central Kansas — Mike's Services LLC",
    page: "demolition.html"
  },
  {
    active: true,
    name: "Building Pad & Site Prep",
    desc: "Precision grading and compaction for building pads, driveways, and new construction sites across Central Kansas.",
    image: "./images/buildingPad.webp",
    alt: "Building pad and site prep in Central Kansas — Mike's Services LLC",
    page: "building-pad.html"
  },
  {
    // SLOT 6 — activate when ready
    active: false,
    name: "",
    desc: "",
    image: "",
    alt: "",
    page: ""
  },
  {
    // SLOT 7 — activate when ready
    active: false,
    name: "",
    desc: "",
    image: "",
    alt: "",
    page: ""
  },
  {
    // SLOT 8 — activate when ready
    active: false,
    name: "",
    desc: "",
    image: "",
    alt: "",
    page: ""
  },
  {
    // SLOT 9 — activate when ready
    active: false,
    name: "",
    desc: "",
    image: "",
    alt: "",
    page: ""
  },
  {
    // SLOT 10 — activate when ready
    active: false,
    name: "",
    desc: "",
    image: "",
    alt: "",
    page: ""
  }
];

// ============================================================
// RENDER SERVICE CARDS
// Builds homepage service grid from the config above
// ============================================================

function renderServices() {
  const grid = document.getElementById('serviceGrid');
  if (!grid) return;

  const activeServices = services.filter(s => s.active && s.name);

  if (activeServices.length === 0) {
    grid.innerHTML = '<p>Services coming soon.</p>';
    return;
  }

  grid.innerHTML = activeServices.map(s => `
    <article class="service-card">
      <div class="service-media">
        <img src="${s.image}" alt="${s.alt}" loading="lazy" width="640" height="420">
      </div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <a class="btn btn-outline" href="${s.page}">Learn More</a>
    </article>
  `).join('');
}

// ============================================================
// MOBILE NAV TOGGLE
// Preserved exactly — no changes
// ============================================================

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!navToggle || !nav) return;

  navToggle.addEventListener('click', function () {
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
    }
  });
}

// ============================================================
// SMOOTH SCROLL
// Preserved exactly — no changes
// ============================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// YEAR INJECTION
// Preserved exactly — no changes
// ============================================================

function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// ============================================================
// INIT — runs on DOM ready
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  renderServices();
  initNav();
  initSmoothScroll();
  initYear();
});