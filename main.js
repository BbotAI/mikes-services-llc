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

  // index.html now ships these five cards as static HTML, so the homepage
  // passes real crawlable links to every service page instead of links that
  // only exist after this script runs. If cards are already in the markup,
  // leave them alone — that markup is the source of truth. This function is
  // the fallback for an empty grid, and the `services` array above is still
  // how you toggle a service on or off. Edit both or they drift.
  if (grid.querySelector('.service-card')) return;

  const activeServices = services.filter(s => s.active && s.name);

  if (activeServices.length === 0) {
    grid.innerHTML = '<p>Services coming soon.</p>';
    return;
  }

  grid.innerHTML = activeServices.map(s => `
    <article class="service-card">
      <div class="service-media">
        <img src="${s.image}" alt="${s.alt}" loading="lazy" decoding="async" width="800" height="450">
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

  function openNav() {
    nav.classList.add('nav--open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.textContent = '✕';
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
  }

  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.contains('nav--open') ? closeNav() : openNav();
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav--open') &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeNav();
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
// SCROLL TO TOP BUTTON
// ============================================================

function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// INIT — runs on DOM ready
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  renderServices();
  initNav();
  initSmoothScroll();
  initYear();
  initScrollTop();
});

/* ── Blog thumbnail loader ───────────────────────
   Swaps placeholder src for Blogger thumbnail URL.
   Fails silently if attribute missing or image 404s.
──────────────────────────────────────────────────*/
(function () {
  var PLACEHOLDER = 'images/blog-placeholder.webp';
  var cards = document.querySelectorAll('[data-thumbnail]');
  cards.forEach(function (img) {
    var url = (img.getAttribute('data-thumbnail') || '').trim();
    if (!url) return;
    img.onerror = function () { this.src = PLACEHOLDER; this.onerror = null; };
    img.src = url;
  });
}());
/* Share button for the home-screen app.
   Saved to a phone's home screen, the site opens with no browser bar, so
   there is no share button and no address bar to copy from. This adds one,
   only in that mode. Uses the phone's own share sheet; falls back to
   copying the link. */
(function () {
  var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true;
  if (!standalone || document.getElementById('app-share')) return;

  var COLOR = '#1C3D5A';
  var css = document.createElement('style');
  css.textContent =
    '#app-share{position:fixed;left:16px;bottom:calc(80px + env(safe-area-inset-bottom,0px));z-index:9998;' +
    'width:48px;height:48px;border-radius:50%;border:0;background:' + COLOR + ';color:#fff;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.28);-webkit-tap-highlight-color:transparent}' +
    '#app-share svg{width:22px;height:22px}' +
    '#app-share-toast{position:fixed;left:50%;bottom:calc(140px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);' +
    'z-index:9999;background:#1A252F;color:#fff;font:600 .9rem/1.3 system-ui,sans-serif;padding:.6rem 1rem;border-radius:20px;' +
    'box-shadow:0 4px 14px rgba(0,0,0,.3);opacity:0;transition:opacity .2s;pointer-events:none}' +
    '#app-share-toast.on{opacity:1}' +
    '@media print{#app-share{display:none}}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.id = 'app-share';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Share this page');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12"/><path d="M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';

  var toast = document.createElement('div');
  toast.id = 'app-share-toast';
  toast.setAttribute('role', 'status');

  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('on');
    setTimeout(function () { toast.classList.remove('on'); }, 2200);
  }

  function pageUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    return (link && link.href) || location.href.split('#')[0];
  }

  function copy(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { say('Link copied'); },
        function () { window.prompt('Copy this link:', url); });
    } else {
      window.prompt('Copy this link:', url);
    }
  }

  btn.addEventListener('click', function () {
    var url = pageUrl();
    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function (err) {
        if (!err || err.name !== 'AbortError') copy(url);
      });
    } else {
      copy(url);
    }
  });

  function mount() { document.body.appendChild(btn); document.body.appendChild(toast); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
}());
