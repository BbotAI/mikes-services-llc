# Mike's Services LLC — UI/CSS Audit
**Date:** 2026-06-12  
**Scope:** Full codebase — 12 HTML pages, styles.css, main.js  
**Purpose:** Document card styles, section backgrounds, contrast issues, color palette, and button CTA clarity

---

## Files Audited

| File | Size |
|------|------|
| styles.css | 15,860 bytes |
| main.js | 6,120 bytes |
| index.html | 18,354 bytes |
| about.html | 13,039 bytes |
| contact.html | 14,506 bytes |
| services.html | 8,612 bytes |
| septic.html | 15,473 bytes |
| excavation.html | 15,635 bytes |
| demolition.html | 15,860 bytes |
| land-clearing.html | 15,516 bytes |
| building-pad.html | 15,244 bytes |
| service-area.html | 16,888 bytes |

---

## 1. Color Palette

**File:** `styles.css` lines 6–17

### CSS Custom Properties (`:root`)

| Variable | Value | Description |
|----------|-------|-------------|
| `--color-primary` | `#1C3D5A` | Dark navy blue |
| `--color-secondary` | `#2A4A6B` | Slightly lighter navy |
| `--color-accent` | `#C76B0F` | Burnt orange |
| `--text` | `#181E26` | Near-black body text |
| `--muted` | `#5A6373` | Gray secondary text |
| `--bg` | `#ffffff` | Pure white background |
| `--bg-subtle` | `#F5F1EB` | Off-white/beige background |
| `--radius` | `8px` | Default border radius |
| `--max-width` | `1100px` | Container max-width |
| `--shadow` | `0 6px 18px rgba(12,30,50,0.07)` | Default box shadow |

### Hardcoded Colors (Outside Variables)

| Color | Value | Usage | styles.css Line(s) |
|-------|-------|-------|--------------------|
| White | `#fff` | Header bg, button text, nav text | 47, 68, 86, 104, 143 |
| Dark navy | `#0F2A3D` | Header gradient end, button hover | 46, 149, 638 |
| Accent hover | `#a85a0c` | Mobile nav CTA hover | 688 |
| Light tan | `#DDD0BA` | FAQ item border | 454 |
| Input border | `#dde3ec` | Form input borders | 519, 141 |
| Hero overlay | `rgba(0,0,0,0.50)` | Hero image overlay | 362, 369 |
| Icon separator | `rgba(255,255,255,0.15)` | Mobile CTA dividers | 597 |

---

## 2. Card Elements

### 2a. `.service-card`

**CSS:** `styles.css` lines 280–313

| Property | Value |
|----------|-------|
| `background` | `#fff` |
| `border-radius` | `10px` |
| `padding` | `16px` |
| `box-shadow` | `0 1px 3px rgba(12,30,50,0.08), 0 8px 24px rgba(12,30,50,0.11)` |
| `border` | `1px solid rgba(12,30,50,0.07)` |
| `transition` | `transform 0.2s, box-shadow 0.2s` |
| Hover `transform` | `translateY(-3px)` |
| Hover `box-shadow` | `0 12px 28px rgba(12,30,50,0.11)` |

**Card heading** (`styles.css` lines 296–301): `color: #2A4A6B`, `font-size: 1.05rem`  
**Card text** (`styles.css` lines 303–308): `color: #5A6373`, `font-size: 0.95rem`  
**Section background where used:** Alternates between `#ffffff` and `#F5F1EB`

**Pages using `.service-card`:** index.html (via main.js), about.html, contact.html, services.html, septic.html, excavation.html, demolition.html, land-clearing.html, building-pad.html, service-area.html — **10 of 12 pages**

---

### 2b. `.area-card`

**CSS:** `styles.css` lines 399–421

| Property | Value |
|----------|-------|
| `background` | `#fff` |
| `border-radius` | `10px` |
| `padding` | `18px` |
| `box-shadow` | `0 1px 3px rgba(12,30,50,0.08), 0 8px 24px rgba(12,30,50,0.11)` |
| `border-left` | `4px solid #1C3D5A` |
| `transition` | `transform 0.2s` |
| Hover `transform` | `translateY(-2px)` |

**Card heading** (`styles.css` lines 410–415): `color: #2A4A6B`, `font-size: 1rem`  
**Card text** (`styles.css` lines 417–421): `color: #5A6373`, `font-size: 0.92rem`  
**Section background where used:** `#F5F1EB`

**Pages using `.area-card`:** index.html, about.html, contact.html, service-area.html — **4 pages**

---

### 2c. `.faq-item`

**CSS:** `styles.css` lines 452–473

| Property | Value |
|----------|-------|
| `background` | `#fff` |
| `border` | `1px solid #DDD0BA` |
| `border-radius` | `10px` |
| `padding` | `20px 22px` |
| `box-shadow` | `0 2px 8px rgba(12,30,50,0.05)` |

**FAQ heading** (`styles.css` lines 460–466): `color: #2A4A6B`, `font-size: 1rem`, `font-weight: 600`  
**FAQ text** (`styles.css` lines 468–473): `color: #5A6373`, `font-size: 0.95rem`  
**Section background where used:** `#F5F1EB`

**Pages using `.faq-item`:** index.html, septic.html, excavation.html, demolition.html, land-clearing.html, building-pad.html — **6 pages**

---

### 2d. City/Community Tags (inline styles, no class)

**Location:** `service-area.html` lines 134–159

These 24 div elements use inline styles rather than a shared class:

| Property | Value |
|----------|-------|
| `background` | `#fff` |
| `border-radius` | `6px` |
| `padding` | `10px 14px` |
| `font-size` | `0.9rem` |
| `color` | `var(--text)` |
| `box-shadow` | `0 2px 6px rgba(12,30,50,0.06)` |

**Section background where used:** `#F5F1EB`  
**Issue:** No shared class — styles are duplicated inline 24 times. Not a contrast issue, but a maintainability concern.

---

### Summary Table: All Card Styles

| Card Type | Background | Border | Shadow | Section Bg | Pages |
|-----------|-----------|--------|--------|------------|-------|
| `.service-card` | `#fff` | `1px solid rgba(12,30,50,0.07)` | `0 1px 3px …0.08, 0 8px 24px …0.11` | `#fff` or `#F5F1EB` | 10 |
| `.area-card` | `#fff` | `4px solid #1C3D5A` (left only) | `0 1px 3px …0.08, 0 8px 24px …0.11` | `#F5F1EB` | 4 |
| `.faq-item` | `#fff` | `1px solid #DDD0BA` | `0 2px 8px …0.05` | `#F5F1EB` | 6 |
| City tags (inline) | `#fff` | None | `0 2px 6px …0.06` | `#F5F1EB` | 1 |

---

## 3. Section Background Colors

**CSS:** `styles.css` lines 253–255

| Selector | Background |
|----------|-----------|
| `.section` (default) | `#ffffff` |
| `.section:nth-child(even)` | `#F5F1EB` |
| `.section.services` | `#F5F1EB` (explicit override) |

### Background by Page

| Page | Section | Background |
|------|---------|-----------|
| index.html | Logo showcase | `#F5F1EB` |
| index.html | Services | `#F5F1EB` |
| index.html | FAQs | `#F5F1EB` |
| index.html | Contact | `#ffffff` |
| about.html | Values | `#F5F1EB` |
| about.html | CTA | `#F5F1EB` |
| contact.html | Process | `#F5F1EB` |
| services.html | CTA | `#F5F1EB` |
| septic.html | What's Included | `#F5F1EB` |
| septic.html | FAQ | `#F5F1EB` |
| septic.html | CTA | `#F5F1EB` |
| excavation.html | What's Included | `#F5F1EB` |
| excavation.html | FAQ | `#F5F1EB` |
| excavation.html | CTA | `#F5F1EB` |
| demolition.html | What's Included | `#F5F1EB` |
| demolition.html | FAQ | `#F5F1EB` |
| demolition.html | CTA | `#F5F1EB` |
| land-clearing.html | What's Included | `#F5F1EB` |
| land-clearing.html | FAQ | `#F5F1EB` |
| land-clearing.html | CTA | `#F5F1EB` |
| building-pad.html | What's Included | `#F5F1EB` |
| building-pad.html | FAQ | `#F5F1EB` |
| building-pad.html | CTA | `#F5F1EB` |
| service-area.html | Communities | `#F5F1EB` |
| service-area.html | Services | `#F5F1EB` |

### Special Section Backgrounds

| Element | Background | Location |
|---------|-----------|----------|
| `.site-header` | `linear-gradient(180deg, #1C3D5A, #0F2A3D)` | All pages |
| `.site-footer` | `#2A4A6B` | All pages |
| `.hero` (no image) | `linear-gradient(160deg, #F5F1EB 0%, #ffffff 100%)` | All non-image heroes |
| `.hero--image` | `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('images/hero.webp')` | index.html |
| `.hero--septic` | Same overlay + `images/septicHero.webp` | septic.html |
| `.featured` | `linear-gradient(160deg, #F5F1EB 0%, #ffffff 100%)` | styles.css line 327 |
| `.mobile-cta` | `#2A4A6B` | All pages (hidden on desktop) |

---

## 4. White-on-White / Low-Contrast Situations

### Definitive Finding: No Critical Contrast Failures

All card backgrounds (`#fff`) appear on section backgrounds of `#ffffff` or `#F5F1EB`.

| Scenario | Card Bg | Section Bg | Distinguishable By | Status |
|----------|---------|-----------|-------------------|--------|
| `.service-card` on white section | `#fff` | `#ffffff` | `box-shadow` + `border` | Marginal — shadow-only separation |
| `.service-card` on subtle section | `#fff` | `#F5F1EB` | Color contrast + shadow | Clear |
| `.area-card` on subtle section | `#fff` | `#F5F1EB` | Color contrast + shadow | Clear |
| `.faq-item` on subtle section | `#fff` | `#F5F1EB` | Color contrast + shadow | Clear |
| City tags on subtle section | `#fff` | `#F5F1EB` | Color contrast + shadow | Clear |

**Flagged for attention:** `.service-card` elements rendered on a white (`#ffffff`) section background rely entirely on a very subtle box-shadow (`0 1px 3px rgba(12,30,50,0.08)`) and near-invisible border (`rgba(12,30,50,0.07)`) for separation. In poor lighting or low-quality displays this can read as white-on-white. This affects index.html (contact section) where `.section` defaults to `#ffffff`.

**Text contrast — no issues found:**
- Dark text (`#181E26`) on `#ffffff`: passes WCAG AA (contrast ratio ~18:1)
- Dark text (`#181E26`) on `#F5F1EB`: passes WCAG AA (~17:1)
- Muted text (`#5A6373`) on `#ffffff`: passes WCAG AA (~4.8:1)
- Muted text (`#5A6373`) on `#F5F1EB`: passes WCAG AA (~4.6:1)
- White text on `#1C3D5A`: passes WCAG AA (~8.4:1)
- White text on `#2A4A6B`: passes WCAG AA (~7.1:1)

---

## 5. Buttons

### Button Classes Defined

| Class | Background | Text Color | Border | Used In |
|-------|-----------|-----------|--------|---------|
| `.btn-primary` | `#1C3D5A` | `#fff` | `2px solid #1C3D5A` | All 12 pages |
| `.btn-outline` | `transparent` | `#2A4A6B` | `2px solid #2A4A6B` | All 12 pages |
| `.btn-secondary` | `transparent` | `#fff` | `2px solid rgba(255,255,255,0.3)` | **Defined but unused** |

**CSS:** `styles.css` lines 127–175

### `.btn-primary` — Usage

**Clearly styled as CTA.** Dark navy fill, white text, full hover state (`background: #0F2A3D`).

Used for:
- Header "Get a Quote" button — all pages
- Hero section primary CTA — all pages
- Contact form submit button — contact.html
- Page-level quote request buttons — all service pages

---

### `.btn-outline` — Usage

**Clearly styled as secondary action.** Navy border + text, transparent fill, hover inverts to navy fill + white text.

Used for:
- Service card "Learn More" links — all pages with service grids
- Hero "Call Now" / "View Services" secondary CTA — most pages
- Footer action buttons (phone, text, directions) — all pages

**Special context — `.hero--image .btn-outline`** (`styles.css` lines 378–387):  
On image hero sections, `.btn-outline` is overridden to white border + white text to contrast against the dark overlay. This is correctly scoped and does not bleed into other contexts.

---

### `.btn-secondary` — Not Used

Defined in `styles.css` lines 153–163 (`background: transparent; border: rgba(255,255,255,0.3); color: #fff`) but referenced on **zero** HTML pages. This is dead CSS.

---

### Buttons Without Clear CTA Styling

No unstyled or ambiguous buttons were found. All `<a>` and `<button>` elements on CTAs carry at least one of `.btn-primary` or `.btn-outline`. The mobile nav toggle (`<button class="nav-toggle">`) is an icon-only control and is not a CTA.

**One observation:** The mobile sticky bar (`.mobile-cta`, all pages) contains phone/text/directions buttons styled inline with no `.btn` class — they are custom-styled flex items specific to that bar and are visually clear as actions. However, they are `display: none !important` on all screen sizes, so they are effectively hidden/unused.

---

## 6. Dead / Unused CSS

| Item | File | Lines | Status |
|------|------|-------|--------|
| `.btn-secondary` | styles.css | 153–163 | Defined, never referenced in any HTML |
| `.mobile-cta` bar | styles.css | 576–604 | Structured in all HTML files but forced hidden (`display: none !important`) |

---

## 7. Maintainability Notes

- The 24 community tag `<div>` elements in `service-area.html` (lines 134–159) duplicate the same inline style string. A shared class (e.g., `.community-tag`) would consolidate these.
- All 10 pages using `.service-card` render identically styled cards — consistent by design, but worth noting there is no per-service visual differentiation.
- `main.js` dynamically renders service cards for index.html; the static HTML on other pages duplicates this markup manually.

---

## 8. Responsive Breakpoints

| Breakpoint | Selector | Key Changes |
|------------|----------|-------------|
| `max-width: 900px` | styles.css line 619 | Hero h1 → 1.6rem; service/contact/about grid → 1 col; nav → dropdown; header phone hidden |
| `max-width: 600px` | styles.css line 694 | Areas grid → 1 col; footer → column; trust list → column; hero CTAs → full width |

---

## Findings Summary

| Category | Count | Notes |
|----------|-------|-------|
| Card types | 4 | `.service-card`, `.area-card`, `.faq-item`, inline city tags |
| Pages with cards | 10 of 12 | services.html and about.html are the exceptions for some card types |
| Section background colors | 2 | `#ffffff` and `#F5F1EB` (plus hero/header/footer special cases) |
| Contrast failures (WCAG AA) | 0 | None found |
| Marginal separation situations | 1 | White `.service-card` on white `#ffffff` section — shadow-only distinction |
| Button classes used | 2 | `.btn-primary` and `.btn-outline` |
| Button classes unused | 1 | `.btn-secondary` |
| Unstyled/unclear CTA buttons | 0 | None found |
| Dead CSS blocks | 2 | `.btn-secondary`, `.mobile-cta` (hidden) |
| Inline style duplication | 24 | Community tags in service-area.html |
