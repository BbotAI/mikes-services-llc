# TEMPLATE GUIDE — Kansas Prairie Webworks
## Tier 4 Local Business Website Template
### Derived from: mikeservicesllc.com (bbotai/mikes-services-llc)
### Maintained by: Kansas Prairie Webworks — kansasprairiewebworks.com
### Last updated: 2026-06-18

---

## 1. COMPLETE COLOR SYSTEM

### CSS Custom Properties (`:root` in styles.css)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-primary` | `#1C3D5A` | Header gradient start, card borders, btn-primary bg, trust-list checkmarks, focus outline, scroll-top bg, mobile-cta bg |
| `--color-secondary` | `#2A4A6B` | Footer bg, hero h1 text, section h2 text, btn-outline border + color, contact-info h3 |
| `--color-accent` | `#C76B0F` | Nav hover underline, mobile-cta border-top, card hover borders, FAQ left border, scroll-top hover bg, mobile nav-cta bg, KPW credit link color |
| `--text` | `#181E26` | Body text, form labels, community-tag text |
| `--muted` | `#5A6373` | Hero lead, section-sub, inline `<p>` paragraphs, hero trust-list |
| `--bg` | `#ffffff` | Default section bg, all card backgrounds |
| `--bg-subtle` | `#F5F1EB` | Alternating section bg (even), services section, FAQ sections, CTA sections |
| `--radius` | `8px` | Default border-radius for buttons and form inputs |
| `--max-width` | `1100px` | `.container` max-width |
| `--shadow` | `0 6px 18px rgba(12,30,50,0.07)` | Default box shadow (featured media image) |

### Hardcoded Colors (Used Directly in Styles)

| Hex / Value | Usage | Location in styles.css |
|-------------|-------|------------------------|
| `#0F2A3D` | Header gradient end; btn-primary hover bg + border | Lines 46, 149-150 |
| `#a85a0c` | Mobile nav CTA hover bg + border | Responsive block |
| `#3D4B5C` | Card body text (warmer muted gray — replaces `--muted` on cards) | All card `p` selectors |
| `rgba(0,0,0,0.50)` | Hero background image dark overlay | `.hero--image` |
| `rgba(255,255,255,0.92)` | Nav link text color | `.nav a` |
| `rgba(255,255,255,0.88)` | Lead text on image hero | `.hero--image .lead` |
| `rgba(255,255,255,0.85)` | Outline button border on image hero | `.hero--image .btn-outline` |
| `rgba(255,255,255,0.82)` | Trust list on image hero | `.hero--image .trust-list` |
| `rgba(28,61,90,0.20)` | FAQ item full border (subtle navy perimeter) | `.faq-item` border |
| `rgba(12,30,50,0.09)` | Service/area card shadow base | Card box-shadow |
| `rgba(0,0,0,0.18)` | Header box-shadow | `.site-header` |
| `rgba(0,0,0,0.28)` | Mobile nav dropdown shadow | Responsive block |

### Color Roles Summary

| Role | Color |
|------|-------|
| Primary action / brand authority | `#1C3D5A` navy |
| Secondary / depth | `#2A4A6B` medium navy |
| Accent / CTA energy | `#C76B0F` orange |
| Body text | `#181E26` near-black |
| Supporting / muted text | `#5A6373` gray |
| Card body text (warmer) | `#3D4B5C` warm gray |
| Page background | `#ffffff` white |
| Alternate section background | `#F5F1EB` off-white beige |

---

## 2. TYPOGRAPHY SYSTEM

### Font Families

```html
<!-- Always include both preconnects before the font link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
```

| Font | Weights Loaded | Used For |
|------|---------------|----------|
| Poppins | 600, 700 | All headings (h1–h3), logo text, section headings |
| Inter | 300, 400, 600 | Body text, nav links, buttons, form labels, paragraphs |
| System fallback | — | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial` |

### Type Scale

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Logo `.brand .logo` | 1.15rem | 700 | `#fff` | Poppins, on dark header |
| Logo tag `.brand .tag` | 0.78rem | 400 | `#fff` opacity 0.85 | City/state line |
| Nav links `.nav a` | 0.92rem | 600 | `rgba(255,255,255,0.92)` | Hover: `--color-accent` |
| Header phone | 0.95rem | 600 | `#fff` | |
| Hero h1 `.hero-copy h1` | 2.1rem (1.6rem mobile) | 700 | `--color-secondary` | Poppins, or `#fff` on image hero |
| Section h2 `.section h2` | 1.65rem | 700 | `--color-secondary` | Poppins |
| Featured copy h2 | 1.55rem | 700 | `#1C3D5A` | Poppins |
| Service card h3 | 1.05rem | 700 | `#1C3D5A` | Poppins |
| Area card h3 | 1rem | 700 | `#1C3D5A` | Poppins |
| FAQ item h3 | 1rem | 700 | `#1C3D5A` | Poppins |
| Contact info h3 | default | 700 | `--color-secondary` | Poppins |
| Lead paragraph `.lead` | 1.05rem | 400 | `--muted` | or `rgba(255,255,255,0.88)` on image hero |
| Section sub `.section-sub` | 1rem | 400 | `--muted` | Subtitle below h2 |
| Body paragraph `p` | 0.95rem | 400 | `--muted` or `#3D4B5C` | Card text uses `#3D4B5C` |
| Service card `p` | 0.95rem | 400 | `#3D4B5C` | line-height: 1.65 |
| Area card `p` | 0.92rem | 400 | `#3D4B5C` | line-height: 1.65 |
| FAQ item `p` | 0.95rem | 400 | `#3D4B5C` | line-height: 1.7 |
| Trust list items | 0.92rem | 400 | `--muted` | `::before` checkmark in `--color-primary` |
| Community tag | 0.9rem | 500 | `#1C3D5A` | |
| Mobile CTA item | 0.92rem | 700 | `#fff` | |
| Footer small `.small` | 0.82rem | 400 | `#fff` opacity 0.85 | Copyright, KPW credit |
| Button `.btn` | 0.95rem | 600 | varies | Inter |

### Button Sizes

```css
.btn { padding: 11px 22px; border-radius: 6px; }
.contact-form button { padding: 13px; font-size: 1rem; }
```

---

## 3. COMPLETE PAGE STRUCTURE

### Overview

| File | Title Pattern | Purpose |
|------|--------------|---------|
| `index.html` | `[Service1], [Service2] & [Service3] in [City], [State] — [Business]` | Homepage — primary SEO landing page |
| `about.html` | `About [Owner Name] — [Business], [City], [State] Contractor` | Brand story + trust building |
| `contact.html` | `Contact [Business] — [City], [State]` | Quote request + contact info |
| `services.html` | `Our Services — [Service types] in [City], [State] | [Business]` | Services index |
| `service-area.html` | `Service Areas in [Region] — [Business]` | Geographic coverage page |
| `[service].html` | `[Service Name] in [City], [State] — [Business]` | One page per service |
| `blog.html` | `Blog — Contractor Tips & Guides \| [Business]` | Blog post index — Blogger-integrated post cards (Tier 4 standard) |

---

### Homepage — `index.html`

**Sections in order:**

1. **Logo Showcase** `.logo-showcase`
   - Full-width centered logo image
   - Background: `var(--bg-subtle)`
   - `<img class="logo-display">` — max-height 260px, eager load

2. **Hero** `section.hero.hero--image`
   - Real background photo with `rgba(0,0,0,0.50)` overlay
   - h1: primary service keywords + city
   - p.lead: 1–2 sentence tagline
   - `.hero-ctas`: [btn-primary: Get a Quote → contact.html] [btn-outline: Call Now → tel:]
   - `.trust-list`: 3 trust signals with ✓ prefix

3. **Services** `section.section.services` (bg-subtle)
   - h2 + p.section-sub
   - `.service-grid` rendered by `main.js` from `services[]` config
   - Each card: image, h3, p, btn-outline → service page

4. **Featured Project** `section.section.featured`
   - `.featured-inner` (2-col grid, card treatment)
   - `.featured-media img` — 1600×900, lazy
   - `.featured-copy`: h2, p, btn-primary → contact.html

5. **Service Areas** `section.section.service-areas`
   - h2 + p.section-sub
   - `.areas-grid` (3-col): 6 `.area-card` elements (one per county)
   - Follow-up note: call if unsure

6. **About** `section.section.about`
   - h2, 3–4 `<p>` paragraphs
   - `btn-outline → about.html`

7. **FAQs** `section.section.faqs` (bg-subtle)
   - h2 + p.section-sub
   - `.faq-list`: 8–10 `.faq-item` elements
   - Always-visible answers (no accordion) — AI search engines read all content

8. **Contact** `section.section.contact`
   - h2 + p.section-sub
   - `.contact-grid` (2-col): `.contact-info` left, `.contact-form` right
   - Form submits to Formspree endpoint

---

### About — `about.html`

1. **Hero** `section.hero` (gradient — no image)
2. **Who We Are / Why Hire Local** `section.section` — `.about-grid` (2-col text columns)
3. **How Mike Works** `section.section` (bg-subtle) — `.areas-grid`: 3 `.area-card` (value props)
4. **What We Do** `section.section` — `.service-grid`: 5 `.service-card`
5. **CTA** `section.section` (bg-subtle) — centered h2 + p + 2 buttons

---

### Contact — `contact.html`

1. **Hero** `section.hero` (gradient)
2. **Contact Grid** `section.section` — `.contact-grid`: info left, form right
3. **What Happens After** `section.section` (bg-subtle) — `.areas-grid`: 6 `.area-card` (numbered process steps)
4. **Services We Quote** `section.section` — `.service-grid`: 5 `.service-card`

---

### Services Index — `services.html`

1. **Hero** `section.hero` (gradient)
2. **What We Do** `section.section` — `.service-grid`: all active service cards (static HTML, not JS-rendered)
3. **CTA** `section.section` (bg-subtle) — centered CTA

---

### Service Area — `service-area.html`

1. **Hero** `section.hero` (gradient)
2. **Our Service Area** `section.section` — `.areas-grid`: 6 `.area-card` (county-level cards)
3. **Communities We Serve** `section.section` (bg-subtle) — 4-col grid of `.community-tag` divs
4. **Full Service Area Coverage** `section.section` — plain text paragraph (AI/SEO readable)
5. **Services Available** `section.section` (bg-subtle) — `.service-grid`: 5 `.service-card`
6. **CTA** `section.section` — centered CTA

---

### Service Pages — `[service].html` (septic / excavation / land-clearing / demolition / building-pad)

**Sections in order:**

1. **Hero** `section.hero` — gradient OR `section.hero.hero--image.hero--[service]` for real photo
   - h1: [Service Name] in [City] & [Region]
   - p.lead: 1-sentence description
   - btn-primary: Get a [Service] Quote → contact.html
   - btn-outline: Call Now → tel:

2. **Featured Image** `section.featured`
   - `.featured-inner` (2-col card): service photo + copy + btn-primary
   - Image: loading="eager" (above fold on desktop)

3. **Description** `section.section`
   - h2: What Is [Service Name]?
   - 3–4 `<p>` paragraphs explaining the service, local conditions, client value

4. **What's Included** `section.section` (bg-subtle)
   - h2 + p.section-sub
   - Styled `<ul>` (NOT cards): `display:flex; flex-direction:column; gap:10px`
   - 6–8 bullet points of included work items

5. **Service Area** `section.section`
   - h2: [Service] Service Area
   - Single `<p>` listing cities and counties served

6. **FAQ** `section.section` (bg-subtle)
   - h2: [Service] FAQ
   - `.faq-list`: 5 `.faq-item` elements

7. **Other Services** `section.section`
   - h2 + p.section-sub
   - `.service-grid`: 4 `.service-card` (other services, not current one)

8. **CTA** `section.section` (bg-subtle)
   - Centered h2 + p + btn-primary + btn-outline

---

## 4. NAVIGATION

### HTML Structure

```html
<header class="site-header">
  <div class="header-inner container">
    <div class="brand">
      <div class="logo-container">
        <a href="index.html" class="logo">[Business Name]</a>
      </div>
      <div class="tag">[City], [State]</div>
    </div>
    <nav class="nav" id="nav">
      <a href="services.html">Services</a>
      <a href="service-area.html">Service Areas</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="blog.html">Blog</a>
      <a href="tel:[PHONE_DIGITS]" class="nav-phone">Call [PHONE_FORMATTED]</a>
      <a class="btn btn-primary nav-cta" href="contact.html">Get a Quote</a>
    </nav>
    <div class="header-ctas">
      <a class="phone" href="tel:[PHONE_DIGITS]">[PHONE_FORMATTED]</a>
      <a class="btn btn-primary" href="contact.html">Get a Quote</a>
      <button id="navToggle" class="nav-toggle" aria-label="Toggle navigation">☰</button>
    </div>
  </div>
</header>
```

### Behavior

| State | Behavior |
|-------|----------|
| Desktop (>900px) | Horizontal nav, header phone + quote button visible, nav-phone + nav-cta hidden |
| Mobile (≤900px) | Hamburger toggle button shown, nav collapses to `max-height: 0`, expands to 440px on click |
| Mobile nav open | Full-width dropdown, navy bg `#1C3D5A`, nav-phone + nav-cta visible |
| Sticky | `position: sticky; top: 0; z-index: 40` — stays at top of viewport on scroll |

### JavaScript (in `initNav()` in main.js)
- Toggle: adds/removes `.nav--open` on `#nav`
- Sets `aria-expanded` on navToggle
- Toggles `☰` → `✕` on toggle button
- Clicking any nav link closes menu
- Clicking outside nav closes menu

---

## 5. COMPONENT LIBRARY

---

### 5A. Service Card — `.service-card`

**Used on:** index.html (via JS), about.html, contact.html, services.html, septic.html, excavation.html, land-clearing.html, demolition.html, building-pad.html, service-area.html

**HTML structure:**
```html
<article class="service-card">
  <div class="service-media">
    <img src="images/[service].webp" alt="[Alt text]" loading="lazy" width="640" height="420">
  </div>
  <h3>[Service Name]</h3>
  <p>[1–2 sentence description]</p>
  <a class="btn btn-outline" href="[service].html">Learn More</a>
</article>
```

**CSS (styles.css):**
```css
.service-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1.5px solid #1C3D5A;
  border-top: 4px solid #1C3D5A;
  box-shadow: 0 2px 8px rgba(12,30,50,0.09), 0 8px 24px rgba(12,30,50,0.09);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  display: flex;
  flex-direction: column;
}
.service-card:hover {
  transform: translateY(-4px);
  border-color: #C76B0F;
  box-shadow: 0 4px 16px rgba(12,30,50,0.13), 0 14px 36px rgba(12,30,50,0.12);
}
.service-card h3 { color: #1C3D5A; font-weight: 700; font-size: 1.05rem; margin: 12px 0 8px; font-family: Poppins, Inter; }
.service-card p  { color: #3D4B5C; font-size: 0.95rem; line-height: 1.65; margin: 0 0 16px; flex: 1; }
.service-card .btn { align-self: flex-start; margin-top: auto; }
.service-media img { width: 100%; height: 180px; object-fit: cover; border-radius: 6px; }
```

**Hover:** `translateY(-4px)` lift + full border color shifts to orange `#C76B0F`

**Grid layout:**
```css
.service-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
/* mobile: grid-template-columns: 1fr; */
```

---

### 5B. Area Card — `.area-card`

**Used on:** index.html (county areas), about.html (value cards), contact.html (process steps), service-area.html (county cards)
**Note:** One class covers three semantic uses — county cards, business value cards, numbered process steps.

**HTML structure:**
```html
<article class="area-card">
  <h3>[Title or numbered step]</h3>
  <p>[Description]</p>
</article>
```

**CSS:**
```css
.area-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 22px;
  border: 1.5px solid #1C3D5A;
  border-left: 5px solid #1C3D5A;
  box-shadow: 0 2px 8px rgba(12,30,50,0.09), 0 6px 20px rgba(12,30,50,0.08);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}
.area-card:hover {
  transform: translateY(-3px);
  border-color: #C76B0F;
  box-shadow: 0 4px 14px rgba(12,30,50,0.13), 0 10px 28px rgba(12,30,50,0.11);
}
.area-card h3 { color: #1C3D5A; font-weight: 700; font-size: 1rem; margin: 0 0 8px; font-family: Poppins, Inter; }
.area-card p  { color: #3D4B5C; font-size: 0.92rem; line-height: 1.65; margin: 0; }
```

**Hover:** `translateY(-3px)` lift + full border color shifts to orange `#C76B0F`

**Grid layout:**
```css
.areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
/* ≤900px: grid-template-columns: 1fr 1fr; */
/* ≤600px: grid-template-columns: 1fr; */
```

---

### 5C. FAQ Item — `.faq-item`

**Used on:** index.html, septic.html, excavation.html, land-clearing.html, demolition.html, building-pad.html

**HTML structure:**
```html
<div class="faq-list">
  <div class="faq-item">
    <h3>[Question]</h3>
    <p>[Answer — always fully visible, no accordion]</p>
  </div>
</div>
```

**CSS:**
```css
.faq-list { display: flex; flex-direction: column; gap: 16px; max-width: 820px; }

.faq-item {
  background: #ffffff;
  border: 1.5px solid rgba(28,61,90,0.20);
  border-left: 5px solid #C76B0F;
  border-radius: 12px;
  padding: 22px 24px;
  box-shadow: 0 2px 8px rgba(12,30,50,0.08), 0 5px 18px rgba(12,30,50,0.07);
  transition: transform 0.22s ease, border-left-color 0.22s ease, box-shadow 0.22s ease;
}
.faq-item:hover {
  transform: translateY(-3px);
  border-left-color: #1C3D5A;
  box-shadow: 0 4px 14px rgba(12,30,50,0.12), 0 10px 26px rgba(12,30,50,0.10);
}
.faq-item h3 { color: #1C3D5A; font-weight: 700; font-size: 1rem; margin: 0 0 10px; font-family: Poppins, Inter; }
.faq-item p  { color: #3D4B5C; font-size: 0.95rem; line-height: 1.7; margin: 0; }
```

**Design logic:** Orange left accent (distinguishes Q&A from content cards). Hover shifts accent to navy — inverted from area/service cards.

**IMPORTANT:** Never use accordion/collapse. AI search engines (ChatGPT, Perplexity, Google SGE) index visible text. All answers must be always-visible.

---

### 5D. Community Tag — `.community-tag`

**Used on:** service-area.html (24 city name tags)

**HTML structure:**
```html
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:900px">
  <div class="community-tag">Salina</div>
  <div class="community-tag">Tescott</div>
  <!-- ... more cities ... -->
</div>
```

**CSS:**
```css
.community-tag {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1C3D5A;
  border: 1.5px solid #1C3D5A;
  border-left: 3px solid #1C3D5A;
  box-shadow: 0 1px 4px rgba(12,30,50,0.08), 0 3px 10px rgba(12,30,50,0.06);
  transition: transform 0.18s ease, border-color 0.18s ease;
  display: inline-block;
  cursor: default;
}
.community-tag:hover {
  transform: translateY(-2px);
  border-color: #C76B0F;
}
```

---

### 5E. Process Step Cards

These use `.area-card` class — no unique class. On contact.html "What Happens After" section, the cards have h3 values like "1. You Reach Out", "2. We Assess the Site" etc. No additional CSS needed beyond `.area-card`.

---

### 5F. Featured Project Section — `.featured-inner`

**Used on:** index.html (featured project), all service pages (service photo + copy)

**HTML structure:**
```html
<section class="featured">
  <div class="container featured-inner">
    <div class="featured-media">
      <img src="images/featured.webp" alt="[Alt]" width="1600" height="900" loading="eager">
    </div>
    <div class="featured-copy">
      <h2>[Headline]</h2>
      <p>[1–2 sentence description]</p>
      <a class="btn btn-primary" href="contact.html">Request a Quote</a>
    </div>
  </div>
</section>
```

**CSS:**
```css
.featured { padding: 48px 0; background: linear-gradient(160deg, var(--bg-subtle) 0%, #ffffff 100%); }

.featured-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  border: 1.5px solid #1C3D5A;
  border-top: 4px solid #1C3D5A;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(12,30,50,0.11), 0 12px 32px rgba(12,30,50,0.10);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.featured-inner:hover {
  transform: translateY(-4px);
  border-color: #C76B0F;
  box-shadow: 0 8px 24px rgba(12,30,50,0.15), 0 20px 48px rgba(12,30,50,0.13);
}
.featured-media img { width: 100%; height: auto; border-radius: 10px; box-shadow: var(--shadow); }
.featured-copy h2 { font-family: Poppins, Inter; font-size: 1.55rem; color: #1C3D5A; font-weight: 700; margin: 0 0 12px; }
.featured-copy p  { color: #3D4B5C; margin-bottom: 20px; }
```

**Mobile (≤900px):** `grid-template-columns: 1fr` (stacks vertically)

---

### 5G. Hero Sections

#### Gradient Hero (used on most pages)
```html
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <h1>[Page H1]</h1>
      <p class="lead">[Lead text]</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="contact.html">Get a Quote</a>
        <a class="btn btn-outline" href="tel:[PHONE]">Call Now</a>
      </div>
    </div>
  </div>
</section>
```
Background: `linear-gradient(160deg, var(--bg-subtle) 0%, #ffffff 100%)`
h1 color: `var(--color-secondary)` (#2A4A6B)
Lead color: `var(--muted)` (#5A6373)

#### Image Hero (index.html — homepage)
```html
<section class="hero hero--image">
```
Background: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('images/hero.webp')`
h1 color: `#fff`
Lead color: `rgba(255,255,255,0.88)`
Trust list color: `rgba(255,255,255,0.82)`
btn-outline: white border + white text (scoped override)

#### Service-specific image hero (septic.html)
```html
<section class="hero hero--image hero--septic">
```
Additional CSS:
```css
.hero--septic {
  background-image: linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)),
                    url('images/septicHero.webp');
}
```
Add equivalent for each service page that has a real photo:
```css
.hero--excavation { background-image: linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('images/excavationHero.webp'); }
/* etc. */
```

#### Homepage Trust List
```html
<ul class="trust-list">
  <li>Local — based in [City], [State]</li>
  <li>[Trust signal 2]</li>
  <li>[Trust signal 3]</li>
</ul>
```

---

### 5H. CTA Banner Sections

**Centered CTA (used on about, services, service-area, service pages):**
```html
<section class="section" style="background:var(--bg-subtle)">
  <div class="container" style="text-align:center;max-width:680px">
    <h2>[CTA Headline]</h2>
    <p style="color:var(--muted);margin-bottom:24px">[Supporting text]</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-primary" href="contact.html">[Primary CTA]</a>
      <a class="btn btn-outline" href="tel:[PHONE]">Call [PHONE_FORMATTED]</a>
    </div>
  </div>
</section>
```

---

### 5I. Mobile Sticky Bar — `.mobile-cta`

**Used on:** All 12 pages, placed just before `</body>`

**HTML:**
```html
<div class="mobile-cta">
  <a href="tel:[PHONE_DIGITS]" class="mobile-cta-item">Call</a>
  <a href="sms:[PHONE_DIGITS]" class="mobile-cta-item">Text</a>
  <a href="https://www.google.com/maps/dir/?api=1&destination=[ADDRESS_ENCODED]" target="_blank" class="mobile-cta-item">Directions</a>
</div>
```

**CSS (hidden desktop, shown mobile):**
```css
.mobile-cta {
  position: fixed; bottom: 0; left: 0; right: 0; width: 100%;
  z-index: 9999; display: none;
  background: #1C3D5A; border-top: 2px solid #C76B0F;
}
.mobile-cta-item {
  display: flex; flex: 1; align-items: center; justify-content: center;
  color: #fff; text-decoration: none; font-weight: 700; font-size: 0.92rem;
  padding: 14px 0; border-right: 1px solid rgba(255,255,255,0.15);
  transition: background 0.2s;
}
.mobile-cta-item:last-child { border-right: none; }
.mobile-cta-item:hover { background: rgba(255,255,255,0.1); }

@media (max-width: 768px) {
  .mobile-cta { display: flex !important; justify-content: space-around; align-items: center; padding: 10px 0; padding-bottom: calc(10px + env(safe-area-inset-bottom)); }
  body        { padding-bottom: 100px; }
  .site-footer { padding-bottom: 100px; }
}
```

**JS behavior:** None — purely CSS show/hide.

---

### 5J. Scroll to Top Button

**HTML (placed before `</body>` on every page, after `.mobile-cta`):**
```html
<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">↑</button>
```

**CSS:**
```css
.scroll-top {
  position: fixed; bottom: 80px; right: 20px;
  width: 44px; height: 44px; border-radius: 50%;
  background: #1C3D5A; color: #ffffff; border: none;
  font-size: 1.2rem; font-weight: 700; cursor: pointer;
  opacity: 0; visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
  z-index: 9998; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(12,30,50,0.25);
}
.scroll-top.visible { opacity: 1; visibility: visible; }
.scroll-top:hover   { background: #C76B0F; transform: translateY(-3px); }
@media (min-width: 769px) { .scroll-top { bottom: 30px; right: 30px; } }
```

**JS (in `initScrollTop()` in main.js):**
```javascript
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;
  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
```
Trigger threshold: 400px scroll.

---

### 5K. Footer Structure — `.site-footer`

**HTML:**
```html
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-left">
      <strong>[Business Name]</strong>
      <div>[Street Address]</div>
      <div><a href="tel:[PHONE_DIGITS]">[PHONE_FORMATTED]</a></div>
    </div>
    <div class="footer-right">
      <a href="[FACEBOOK_URL]" target="_blank" rel="noopener">Follow us on Facebook</a>
      <!-- GOOGLE BUSINESS PROFILE LINK: add anchor tag here with Google review link when ready -->
      <a href="blog.html">Blog</a>
      <div class="small">© <span id="year"></span> [Business Name]</div>
      <div class="small">
        <a href="https://kansasprairiewebworks.com" target="_blank" rel="noopener"
           style="color:var(--color-accent);text-decoration:none;">Website by Kansas Prairie Webworks</a>
      </div>
    </div>
  </div>
</footer>
```

**CSS:**
```css
.site-footer { background: var(--color-secondary); color: #fff; padding: 28px 24px; }
.footer-inner { max-width: var(--max-width); margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
.footer-inner a { color: #ffffff; text-decoration: none; font-weight: 600; }
.footer-inner a:hover { color: var(--color-accent); }
.footer-left div { margin-top: 4px; font-size: 0.9rem; opacity: 0.9; }
.footer-right { text-align: right; }
.small { font-size: 0.82rem; opacity: 0.85; margin-top: 6px; }
/* mobile ≤600px: flex-direction: column; footer-right text-align: left; */
```

Year is injected by JS: `document.getElementById('year').textContent = new Date().getFullYear()`

---

## 6. IMAGE REQUIREMENTS

All images: `.webp` format, placed in `/images/` folder.

| Filename | Dimensions | Lazy? | Used In | What to Show | Alt Text Pattern |
|----------|-----------|-------|---------|-------------|-----------------|
| `logo.webp` | Variable (any) | eager | Header, logo-showcase | Business logo | `[Business Name] — [City] [State]` |
| `hero.webp` | 1600×900 min | eager | index.html hero bg | Best site/job photo — wide angle, outdoor | Background image, no alt needed |
| `featured.webp` | 1600×900 | lazy | index.html featured section | Best completed project | `[Service] work in [City] — [Business]` |
| `septic.webp` | 640×420 | lazy | Septic service cards sitewide | Septic install in progress | `Septic installation [City] — [Business]` |
| `excavation.webp` | 640×420 | lazy | Excavation service cards | Excavation/trenching work | `Excavation and trenching [City] — [Business]` |
| `landClearing.webp` | 640×420 | lazy | Land clearing service cards | Brush/clearing work | `Land clearing [City] — [Business]` |
| `demolition.webp` | 640×420 | lazy | Demolition service cards | Demo/removal work | `Demolition and removal [City] — [Business]` |
| `buildingPad.webp` | 640×420 | lazy | Building pad service cards | Grading/pad work | `Building pad site prep [City] — [Business]` |
| `septicHero.webp` | 1600×900 | eager | septic.html hero bg | Septic job site, wide angle | Background image, no alt needed |
| `[service]Hero.webp` | 1600×900 | eager | Each service page hero | That service in action | Background image |
| `blog-placeholder.webp` | 600×400 | lazy | blog.html card default `src` | Solid brand-color rectangle | No alt (decorative placeholder) |

**Image loading rules:**
- Logo and above-fold hero images: `loading="eager" fetchpriority="high"`
- First featured section image: `loading="eager"` with explicit `width="1600" height="900"`
- Everything else: `loading="lazy"`
- Always include `width=""` and `height=""` attributes on every `<img>` to prevent layout shift

**blog-placeholder.webp — generation (Node.js only — Python not available on this system):**
```
mkdir /tmp/webpgen && cd /tmp/webpgen && npm install sharp
node -e "require('sharp')({create:{width:600,height:400,channels:3,background:{r:28,g:61,b:90}}}).webp().toFile('[project]/images/blog-placeholder.webp',()=>console.log('done'))"
```
Replace `r:28,g:61,b:90` with the client's primary brand color RGB values.
KPW default navy #1C3D5A = `r:28,g:61,b:90`

---

## 7. SEO SYSTEM

### Title Tag Format

```
[Primary keyword phrase] in [City], [State] — [Business Name]
```
Examples:
- `Septic Installation in Salina, Kansas — Mike's Services LLC`
- `About Mike Adams — Mike's Services LLC, Salina, Kansas Contractor`
- Homepage: `[Service1], [Service2] & [Service3] in [City], [State] — [Business Name]`

### Meta Description Format

~155 characters. Include: primary service, city/state, phone number if space allows.
```
Professional [service] in [City] and [Region]. [Business] handles [brief description]. Call [phone].
```

### LocalBusiness Schema (on every page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "image": "https://[domain]/images/logo.webp",
  "url": "https://[domain]",
  "telephone": "+1-[PHONE_WITH_DASHES]",
  "priceRange": "$$",
  "description": "[1-2 sentence business description]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State 2-letter]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [LAT],
    "longitude": [LNG]
  },
  "areaServed": ["[City] [State]", "[City2] [State]", ...],
  "sameAs": ["[FACEBOOK_URL]"]
}
```

**Additional on homepage:** Add `foundingDate`, `founder`, `openingHoursSpecification`, `makesOffer[]`

### Service Schema (on each service page, in addition to LocalBusiness)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Service Name]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "[Business Name]",
    "telephone": "+1-[PHONE]",
    "address": { "@type": "PostalAddress", ... }
  },
  "areaServed": "[Region description]",
  "description": "[Service description]",
  "url": "https://[domain]/[service].html"
}
```

### Required for All Builds (confirmed working from mikeservicesllc.com)

- `sitemap.xml` — generate during build (Step 4e). List all HTML pages including blog.html. Use `<changefreq>weekly</changefreq>` for blog.html, `monthly` for others. `<priority>1.0</priority>` for homepage, `0.7` for blog.
- `robots.txt` — generate during build (Step 4f). Include: `User-agent: * / Allow: / / Sitemap: https://[domain]/sitemap.xml`

### Missing from Template (add for future builds)

- Canonical tags — not explicitly set (single domain mitigates risk)
- Open Graph tags (`og:title`, `og:description`, `og:image`) — not present, add for social sharing

### Dynamic Year

Every page includes `<span id="year"></span>` in copyright, populated by:
```javascript
function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
```

---

## 8. FORMSPREE INTEGRATION

### Setup
1. Create account at formspree.io
2. Create a new form, get the form ID (looks like `xrevelll`)
3. Paste the endpoint into `client-data.json` and the form action attribute

### Form HTML (contact.html and index.html)

```html
<form action="https://formspree.io/f/[FORMSPREE_ID]" method="POST">
  <!-- Honeypot spam filter -->
  <input type="text" name="_gotcha" style="display:none">
  <!-- Custom email subject -->
  <input type="hidden" name="_subject" value="Website Quote Request — [Business Name]">

  <label for="name">Your Name</label>
  <input id="name" name="name" type="text" placeholder="John Smith" required>

  <label for="email">Email Address</label>
  <input id="email" name="email" type="email" placeholder="you@example.com" required>

  <label for="phone">Phone Number</label>
  <input id="phone" name="phone" type="tel" placeholder="[PHONE_FORMAT]" required>

  <label for="service">Service Needed</label>
  <select id="service" name="service" style="padding:11px 14px;border:1.5px solid #dde3ec;border-radius:6px;font-size:0.95rem;font-family:inherit;background:#fff;color:var(--text)">
    <option value="">Select a service...</option>
    <option value="[Service 1]">[Service 1]</option>
    <!-- one option per service -->
    <option value="Not sure / Multiple">Not sure / Multiple services</option>
  </select>

  <label for="message">Project Details</label>
  <textarea id="message" name="message" rows="6" placeholder="Describe your project..." required></textarea>

  <button class="btn btn-primary" type="submit">Send Quote Request</button>
</form>
```

### Formspree Account Notes
- Free tier: 50 submissions/month
- Paid: $10/mo for 1,000 submissions
- Set up email notification in Formspree dashboard
- Can redirect to a thank-you page: add `<input type="hidden" name="_next" value="https://[domain]/thanks.html">`

---

## 9. PERFORMANCE CHECKLIST

| Item | Implementation | Where |
|------|---------------|-------|
| Font preconnect | `<link rel="preconnect" href="https://fonts.googleapis.com">` + crossorigin variant | `<head>` of every page |
| **Hero image preload** | `<link rel="preload" as="image" href="images/hero.webp" fetchpriority="high">` — must be the **FIRST** `<link>` in `<head>`, before font preconnects | index.html |
| Logo preload | `<link rel="preload" as="image" href="images/logo.webp" fetchpriority="high">` | index.html only |
| Logo eager load | `fetchpriority="high" loading="eager"` on `<img>` | index.html logo-showcase |
| Hero image CSS background | Hero uses CSS background-image — no `<img>` tag in hero section. Preload link (above) handles LCP for CSS backgrounds. | index.html |
| Featured image eager | `loading="eager"` with explicit `width="1600" height="900"` | All service pages, index.html featured |
| **Featured image CLS** | `.featured-media img { aspect-ratio: 16 / 9; }` in styles.css — reserves layout space before image loads | styles.css |
| All other images | `loading="lazy"` | All cards, thumbnails |
| Explicit image dimensions | `width=""` and `height=""` on every `<img>` | All pages — prevents CLS |
| Script defer | `<script src="main.js" defer>` | Every page |
| Image format | `.webp` for all images | `/images/` folder |
| No inline JS | All JS in `main.js` | — |
| Single stylesheet | One `styles.css` | — |

---

## 10. CLIENT INTAKE VARIABLES

Every variable needed to build a new site from this template:

### Business Identity
- Business legal name
- Owner/operator first and last name
- Business tagline or short description (1 sentence)
- Founding year
- About paragraph (3–5 sentences): who, what, where, why local

### Contact & Location
- Primary phone (digits only for tel: links, formatted for display)
- Business email (for Formspree notification delivery)
- Street address
- City, State, ZIP
- Google Maps coordinates (lat/lng) for schema

### Online Presence
- Domain name (existing or needed)
- Formspree account email + form ID (or we create)
- Facebook page URL
- Google Business Profile URL (or create during onboarding)
- Any other social/booking URLs

### Services (for each service)
- Service name (short, for nav and cards)
- Service headline (for service page h1)
- Service description (1–2 sentences, for cards)
- Service long description (3–4 paragraphs, for service page)
- What's Included list (6–8 bullets)
- FAQ items: 5 Q&A pairs specific to this service
- Service photo (640×420 .webp)
- Service hero photo (1600×900 .webp, if available)

### Service Area
- Primary counties served (names for schema + county cards)
- Towns/communities list (for community tags)
- "Home county" (most local focus)
- Maximum travel radius

### Brand
- Client's existing brand colors (primary, secondary, accent) — or use KPW defaults
- Client preference: navy/blue, green, earth tone, etc.
- Logo file (any format — we convert to .webp)

### Content
- Featured project description (1–2 sentences)
- Featured project photo (1600×900 .webp)
- Hero photo (1600×900 .webp — best job photo, wide angle)
- Trust signals (3 bullet points for homepage hero trust-list)
- Homepage FAQ items (8–10 general Q&A)
- Business hours (for schema)
- Price range: `$`, `$$`, or `$$$`

---

## 11. FILE NAMING CONVENTIONS

### HTML Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — always this name |
| `about.html` | About page |
| `contact.html` | Contact + quote form |
| `services.html` | Services index |
| `service-area.html` | Service area coverage |
| `[service-name].html` | One per service — kebab-case |
| `blog.html` | Blog post index — Blogger-integrated (Tier 4 standard) |

Service page naming: `septic.html`, `excavation.html`, `land-clearing.html`, `demolition.html`, `building-pad.html`
Pattern: short, lowercase, kebab-case, matches the service keyword

### Image Files

| File | Contents |
|------|---------|
| `logo.webp` | Business logo |
| `hero.webp` | Homepage hero background (wide, 1600×900+) |
| `featured.webp` | Homepage featured project (1600×900) |
| `septic.webp` | Septic service card image |
| `excavation.webp` | Excavation service card image |
| `landClearing.webp` | Land clearing service card image (camelCase — existing convention) |
| `demolition.webp` | Demolition service card image |
| `buildingPad.webp` | Building pad service card image (camelCase — existing convention) |
| `septicHero.webp` | Septic page hero background |
| `[service]Hero.webp` | Hero background for any service page with real photo |

**Note:** Service card images use camelCase for multi-word names (`landClearing.webp`, `buildingPad.webp`). Follow this convention for new services.

### Other Files

| File | Purpose |
|------|---------|
| `styles.css` | Single stylesheet |
| `main.js` | All JavaScript |
| `sitemap.xml` | All page URLs for search engines — required for every build |
| `robots.txt` | Crawler permissions + sitemap reference — required for every build |
| `CNAME` | One line, domain name only, no https:// — required for GitHub Pages custom domain |
| `BLOG_AGENT.md` | Permanent future-post agent file — stays in client folder forever |
| `BLOGS_DATA.md` | Internal post tracker — not deployed (add to .gitignore) |
| `images/blog-placeholder.webp` | Generated by Claude Code via Node.js during build — 600×400, brand primary color |
| `client-data.json` | Client intake data (internal reference, not deployed) |
| `assets.json` | Image path reference (internal) |

---

## 12. GITHUB AND DEPLOYMENT

### Repository Setup

```bash
# Create new repo on GitHub: [clientname]-website (e.g., smithplumbing-website)
# Set to Public (required for free GitHub Pages)
git init
git add .
git commit -m "Initial build — [Business Name] website"
git branch -M main
git remote add origin https://github.com/bbotai/[repo-name].git
git push -u origin main
```

### CNAME File

Create `CNAME` in repo root (no extension):
```
clientdomain.com
```
One line only. No `https://`, no `www.`, no trailing newline.

### GitHub Pages Settings

1. Repo → Settings → Pages
2. Source: Deploy from branch
3. Branch: `main` / `/ (root)`
4. Save — GitHub assigns a `*.github.io` URL initially

### Cloudflare DNS Setup

1. Add domain to Cloudflare
2. Point nameservers at Cloudflare (from registrar)
3. In Cloudflare DNS, add:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `A` | `@` | `185.199.108.153` | Proxied (orange cloud) |
| `A` | `@` | `185.199.109.153` | Proxied |
| `A` | `@` | `185.199.110.153` | Proxied |
| `A` | `@` | `185.199.111.153` | Proxied |
| `CNAME` | `www` | `[username].github.io` | Proxied |

GitHub Pages IPs as of 2026: `185.199.108–111.153`

### SSL/TLS Setting

Cloudflare → SSL/TLS → Overview → Set to **Full (strict)**
- **Not** Flexible (causes redirect loops)
- **Not** Full without strict (less secure)

### Cloudflare Cache

After deploying code changes, if changes don't appear:
- Cloudflare Dashboard → Caching → Purge Cache → Purge Everything
- Or add a cache rule to skip caching for `styles.css` during active development

---

## 13. CLIENT HANDOFF PACKAGE

For clients who cancel service or request their files:

### Files to Deliver

```
[BusinessName]-website-files.zip
├── index.html
├── about.html
├── contact.html
├── services.html
├── service-area.html
├── blog.html
├── [service].html (all service pages)
├── styles.css
├── main.js
├── sitemap.xml
├── robots.txt
├── CNAME
├── BLOG_AGENT.md
├── images/
│   ├── logo.webp
│   ├── hero.webp
│   ├── featured.webp
│   ├── blog-placeholder.webp
│   └── [all other images]
└── README-HANDOFF.txt
```

### README-HANDOFF.txt Contents

```
[Business Name] — Website Files
Delivered by Kansas Prairie Webworks
Date: [DATE]

FILES INCLUDED
--------------
HTML pages, stylesheet (styles.css), JavaScript (main.js),
and all images used on the site.

HOW TO USE THESE FILES
-----------------------
These are static HTML files. To host them:
- Upload all files to any web host that supports static HTML
- Options: Netlify (free), GitHub Pages (free), or any standard hosting

DOMAIN TRANSFER
---------------
Your domain [domain.com] is registered at [REGISTRAR].
To transfer to a new registrar or take control:
1. Log in to [REGISTRAR] at [URL]
2. Credentials: [as agreed]
3. Disable domain lock / WHOIS privacy
4. Request Authorization/EPP code
5. Provide to new registrar to initiate transfer

CLOUDFLARE DNS (if applicable)
-------------------------------
1. Log in to cloudflare.com with [email]
2. Select your domain
3. Go to DNS — document or export current records before changing
4. To remove Cloudflare: change nameservers back to registrar defaults

GOOGLE BUSINESS PROFILE
------------------------
1. Go to business.google.com
2. Sign in with [CLIENT_EMAIL]
3. To transfer primary ownership to a different Google account:
   - Business Profile → Users → Add user → Assign as Primary Owner
   - Original owner can then be removed after transfer

FACEBOOK PAGE ADMIN
--------------------
1. Go to facebook.com/[PAGE]
2. Settings → Page Roles (or Page Access in newer UI)
3. Add new admin with their Facebook account
4. Once they accept, remove KPW admin access:
   Settings → Page Access → Remove [KPW Account]

FORMSPREE FORM SUBMISSIONS
---------------------------
Form submissions at contact.html go to: [FORMSPREE_EMAIL]
To change: update the action= URL in contact.html and index.html
Create your own account at formspree.io

CONTENT CHANGES
---------------
All text is in the HTML files. Search for the text you want to change
and edit it directly. The files can be opened in any text editor (VS Code,
Notepad, etc.)
```

---

---

## 14. BLOG SYSTEM

Tier 4 standard. Included on every build. Requires the client to have a free Blogger account at `businessname.blogspot.com`.

---

### 14A. Architecture

| Layer | Role |
|-------|------|
| `blog.html` | Static page — displays up to 8 post cards (grows as posts are added) |
| Blogger | Client's actual publishing platform — free, Google-hosted, no CMS needed on the site |
| JS thumbnail loader | Swaps `src` from placeholder to Blogger `og:image` URL at runtime |
| `BLOG_AGENT.md` | Permanent file — future posts added with single `Add blog post: [URL]` command |
| `BLOGS_DATA.md` | Internal tracker — not deployed |
| `blog-placeholder.webp` | 600×400 solid brand-color image — shown until JS loads real thumbnail |

---

### 14B. blog.html Page Structure

1. **Hero** — simple gradient, no background image, no CTA buttons
   ```html
   <section class="hero"><div class="container hero-copy"><h1>...</h1><p class="lead">...</p></div></section>
   ```

2. **Blog Grid** — `section#blog-list`
   ```html
   <section class="section" id="blog-list">
     <div class="container">
       <h2>From the Blog</h2>
       <p class="section-sub">...</p>
       <div class="service-grid blog-grid">
         <!-- 6–8 .service-card.blog-card articles -->
       </div>
     </div>
   </section>
   ```

3. **FAQ** — use `.faq-list/.faq-item` (identical structure to all other FAQ sections)

4. **CTA** — standard centered CTA banner

---

### 14C. Blog Card HTML

**Live post card:**
```html
<article class="service-card blog-card">
  <img
    src="images/blog-placeholder.webp"
    data-thumbnail="[Blogger og:image URL]"
    alt="[descriptive alt text from post]"
    width="600" height="400"
    loading="lazy">
  <div class="card-body">
    <p class="blog-date">[Month DD, YYYY]</p>
    <h3>[Post title — cleaned, no site suffix]</h3>
    <p>[Excerpt — 2 sentences max, plain conversational tone]</p>
    <a href="[Blogger post URL]" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
  </div>
</article>
```

**Placeholder card (coming soon):**
```html
<article class="service-card blog-card blog-card--placeholder">
  <img src="images/blog-placeholder.webp" alt="" width="600" height="400" loading="lazy">
  <div class="card-body">
    <p class="blog-date">Coming Soon</p>
    <h3>New Post Coming Soon</h3>
    <p>Check back soon for new guides and tips from [Business Name].</p>
    <span class="btn btn-outline" style="opacity:0.4;cursor:default;">Coming Soon</span>
  </div>
</article>
```

**Why `padding: 0` on `.blog-card`:** `.service-card` has `padding: 20px` which would indent blog images from card edges. `.blog-card` overrides this to zero; `.card-body` provides inner padding instead.

---

### 14D. Blog CSS (append to styles.css)

```css
/* ── Blog Grid ──────────────────────────────────── */
.blog-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.blog-card { padding: 0; overflow: hidden; }
.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  border-radius: 8px 8px 0 0;
}
.card-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-body .btn { margin-top: auto; align-self: flex-start; }
.blog-date { font-size: 0.82rem; color: var(--muted); margin-bottom: 0.4rem; font-weight: 400; }
.blog-card--placeholder { opacity: 0.55; }
/* ── Blog Callout ────────────────────────────────── */
.blog-callout {
  font-size: 0.95rem;
  color: #3D4B5C;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--color-accent);
  background: var(--bg-subtle);
  border-radius: 0 6px 6px 0;
}
.blog-callout a { color: var(--color-accent); font-weight: 600; }
.blog-callout a:hover { text-decoration: underline; }
```

---

### 14E. Blog Thumbnail Loader JS (append to main.js, after DOMContentLoaded block)

```javascript
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
```

---

### 14F. Blog Callout Pattern (service pages)

Add inside the "Other Services" section container, after the `.service-grid`, before the closing `</div></section>`. One callout per relevant post.

```html
<p class="blog-callout">&#128196; <strong>From the Blog:</strong>
  <a href="[Blogger post URL]" target="_blank" rel="noopener">[Post Title]</a>
  &mdash; read the full guide.</p>
```

**Content → service page mapping:**
| Post topic | Service page |
|-----------|-------------|
| Septic cost / permits | `septic.html` |
| Land clearing cost | `land-clearing.html` |
| Excavation / trenching | `excavation.html` |
| Demolition / storm damage | `demolition.html` |
| Building pad / site prep | `building-pad.html` |
| General / multi-service | `service-area.html` (link to `blog.html`) |

---

### 14G. Blog Nav Link (all HTML files)

Add `<a href="blog.html">Blog</a>` to **every** HTML page:
- Desktop nav: after `<a href="contact.html">Contact</a>`, before phone link
- Footer: in `.footer-right`, after Google Business Profile comment, before copyright div

---

### 14H. blog-placeholder.webp Generation

**Python is NOT available on this build system.** Use Node.js (v24, always present):

```
mkdir /tmp/webpgen && cd /tmp/webpgen
npm install sharp
node -e "require('sharp')({create:{width:600,height:400,channels:3,background:{r:28,g:61,b:90}}}).webp().toFile('[absolute-path-to-project]/images/blog-placeholder.webp',()=>console.log('done'))"
```

Swap RGB values to match client's primary brand color:
- KPW default navy #1C3D5A → `r:28,g:61,b:90`
- Pro Cleaning teal #00C9C9 → `r:0,g:201,b:201`

---

### 14I. Infinite Content Loop

The blog system creates a closed loop that benefits SEO and user engagement:

```
Blogger post
  → blog.html card (thumbnail + excerpt + Read More)
    → blog-callout on service page ("From the Blog")
      → service page → homepage services section
        → contact form / quote request
          → satisfied client → new blog post
```

---

### 14J. BLOG_AGENT.md — Future Post Command

After the initial build, the client adds new posts by running one command in Claude Code:

```
Add blog post: [paste Blogger URL here]
```

Claude Code automatically:
1. Fetches the URL — extracts title, excerpt, thumbnail, date
2. Replaces the first placeholder card in blog.html
3. Adds a blog-callout to the matching service page
4. Commits and pushes

The `BLOG_AGENT.md` file in the client folder contains full instructions. Never delete it.

---

*Kansas Prairie Webworks — Tier 4 Template Guide*
*kansasprairiewebworks.com — 785-577-7695*
*Salina, Kansas*
