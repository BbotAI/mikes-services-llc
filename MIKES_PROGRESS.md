# MIKES_PROGRESS.md
# Mike's Services LLC — Fix Pass v3
# mikeservicesllc.com
# Date: 2026-06-12

---

## Files Changed

| File | Change |
|------|--------|
| `styles.css` | Card redesign (all types), mobile sticky bar fix, scroll-to-top CSS, community-tag class, dead CSS removal |
| `main.js` | Added `initScrollTop()` function and called it in DOMContentLoaded |
| `service-area.html` | Converted 24 inline-styled community tag divs to `class="community-tag"` |
| `index.html` | Added scroll-to-top button |
| `about.html` | Added scroll-to-top button |
| `contact.html` | Added scroll-to-top button |
| `services.html` | Added scroll-to-top button |
| `septic.html` | Added scroll-to-top button |
| `excavation.html` | Added scroll-to-top button |
| `demolition.html` | Added scroll-to-top button |
| `land-clearing.html` | Added scroll-to-top button |
| `building-pad.html` | Added scroll-to-top button |
| `service-area.html` | Added scroll-to-top button |
| `MIKES_AUDIT.md` | Deleted (git rm) per fix instructions |

---

## FIX 1 — Card Redesign

### CSS Classes Modified

**`.service-card`** — 10 pages affected
- `border` changed from `1px solid rgba(12,30,50,0.07)` to `1.5px solid #1C3D5A` (visible full perimeter, per user creative direction)
- `border-top` added: `4px solid #1C3D5A` (navy top accent)
- `border-radius` bumped: `10px → 12px`
- `padding` bumped: `16px → 20px`
- `box-shadow` strengthened: dual-layer warm shadow
- `transition` expanded to include `border-color`
- Hover: `transform: translateY(-4px)` (was -3px), `border-color: #C76B0F` (full border shifts to orange), stronger shadow
- `h3 color`: `var(--color-secondary)` → `#1C3D5A` with `font-weight: 700` (navy bold, not muted)
- `p color`: `var(--muted)` → `#3D4B5C` (warmer body text), `line-height: 1.65` added

**`.area-card`** — 4 pages affected (county cards, process steps on contact.html, value cards on about.html)
- `border` changed from `border-left: 4px solid var(--color-primary)` to full perimeter `1.5px solid #1C3D5A` + `border-left: 5px solid #1C3D5A`
- `border-radius` bumped: `10px → 12px`
- `padding` bumped: `18px → 20px 22px`
- `box-shadow` strengthened: dual-layer warm shadow
- `transition` expanded to include `border-color` and `box-shadow`
- Hover: `translateY(-3px)`, `border-color: #C76B0F` (full border shifts to orange), stronger shadow
- `h3 color`: `var(--color-secondary)` → `#1C3D5A` with `font-weight: 700`
- `p color`: `var(--muted)` → `#3D4B5C`, `line-height: 1.65` added

**Note on `.area-card` scope:** The about.html "How Mike Works" value cards and the contact.html "What Happens After" process steps both use the `.area-card` class inside `.areas-grid`. No separate class exists for these — they inherit all `.area-card` improvements.

**`.faq-item`** — 6 pages affected
- `border` changed from `1px solid #DDD0BA` to `1.5px solid rgba(28,61,90,0.20)` (subtle navy perimeter) + `border-left: 5px solid #C76B0F` (orange left accent — FAQ uses orange accent per V3 spec to differentiate from content cards)
- `border-radius` bumped: `10px → 12px`
- `padding` bumped: `20px 22px → 22px 24px`
- `box-shadow` strengthened: dual-layer warm shadow
- `transition` added for transform, border-left-color, box-shadow
- Hover: `translateY(-3px)`, `border-left-color: #1C3D5A` (accent flips navy on hover), stronger shadow
- `h3 color`: `var(--color-secondary)` → `#1C3D5A` with `font-weight: 700`
- `p color`: `var(--muted)` → `#3D4B5C`, `line-height: 1.7`

**`.community-tag`** — new class, service-area.html
- All 24 inline-styled city tag divs converted to use `class="community-tag"`
- Full perimeter border: `1.5px solid #1C3D5A` + thicker left: `3px solid #1C3D5A`
- Hover: `translateY(-2px)`, `border-color: #C76B0F`
- Color: `#1C3D5A` (navy text instead of body text — these tags read as branded labels)

**`.featured-inner`** — index.html (and other service page `.featured` sections that use this class)
- Added `border: 1.5px solid #1C3D5A`, `border-top: 4px solid #1C3D5A`
- Added `border-radius: 14px`
- Added `padding: 28px`
- Added dual-layer box-shadow
- Added transition and hover lift with border shift to orange
- `.featured-copy h2`: color `var(--color-secondary)` → `#1C3D5A`, added `font-weight: 700`
- `.featured-copy p`: color `var(--muted)` → `#3D4B5C`

### Creative Direction Decisions

1. **Full perimeter border vs. accent-only:** User's chat message specified "visible colored border rim around the full card perimeter — not just a left accent — use #1C3D5A at 1.5-2px solid." Applied `1.5px solid #1C3D5A` as the base border on all card types, then overriding only the accent edge (top or left) with a thicker 4-5px version. This satisfies both the perimeter requirement and the directional accent.

2. **FAQ cards use orange accent:** FAQ items use orange (`#C76B0F`) as the left accent to visually distinguish Q&A content from service/area cards (which use navy top/left accent). On hover the FAQ left accent shifts to navy — inverted from the other cards. This creates subtle visual hierarchy between card types while keeping the system cohesive.

3. **`.area-card` covers value + process cards:** The "How Mike Works" cards (about.html) and "What Happens After" process steps (contact.html) both use the `.area-card` class — no separate class exists. All improvements apply universally. No HTML changes needed.

4. **`.featured-inner` as card container:** The featured section on index.html (and service pages) uses `.featured-inner` as the two-column grid container. There is no dedicated `.featured-card` element. Applied the card treatment directly to `.featured-inner` — this frames the entire featured block as a premium showcase card.

5. **"What's Included" section on service pages:** These sections use a plain `<ul>` list, not card elements. There are no `.included-card`, `.feature-card`, or similar classes. Nothing to card-style. Noted here for the record.

---

## FIX 2 — Mobile Sticky Bar

**Problem:** `.mobile-cta` had `display: none !important` on all screen sizes.

**Fix applied:**
- Removed `!important` override from base `.mobile-cta` rule
- Set base to `display: none` (hidden on desktop)
- Added `@media (max-width: 768px)` rule: `display: flex !important` to show on mobile
- Updated background to `#1C3D5A` (primary navy, matching the V3 spec)
- `z-index` bumped to `9999` to ensure it layers above all content

**Verified button content:** All 12 pages have the mobile-cta bar with Call (785-488-7925), Text (785-488-7925), and Directions (Google Maps link to 481 E Euclid Ave). No content changes needed.

---

## FIX 3 — Scroll to Top Button

**CSS added to `styles.css`:**
- Fixed position, bottom-right, navy background (#1C3D5A)
- `bottom: 80px` on mobile (above sticky bar), `bottom: 30px` on desktop (≥769px)
- Hidden by default (`opacity: 0; visibility: hidden`)
- `.visible` class shows it (triggered by JS at 400px scroll)
- Hover: shifts to accent orange (#C76B0F), slight lift

**JS added to `main.js`:**
- `initScrollTop()` function — scroll event listener shows/hides button at 400px threshold
- Click handler: smooth scroll to top
- Called in `DOMContentLoaded`

**HTML added to all 12 pages:**
- `<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">↑</button>` before `</body>`

---

## FIX 4 — Service Page Hero Verification

**Pages with real image heroes (confirmed):**
- `index.html` — `hero hero--image` with `images/hero.webp` ✓
- `septic.html` — `hero hero--image hero--septic` with `images/septicHero.webp` ✓

**Pages using gradient hero (no real image) — owner action needed:**
- `excavation.html` — uses `class="hero"` (gradient only)
- `demolition.html` — uses `class="hero"` (gradient only)
- `land-clearing.html` — uses `class="hero"` (gradient only)
- `building-pad.html` — uses `class="hero"` (gradient only)

**Action required for owner:** Provide jobsite photos for excavation, demolition, land clearing, and building pad pages. Once photos are added to `/images/`, add the CSS classes `hero--image` and a page-specific variant (e.g., `hero--excavation`) to each page's `<section class="hero">` element, and add corresponding background-image rules to `styles.css` following the `.hero--septic` pattern.

---

## FIX 5 — Footer KPW Credit

Verified on all 12 pages — the Kansas Prairie Webworks credit is present and correctly linked:
```html
<div class="small"><a href="https://kansasprairiewebworks.com" target="_blank" rel="noopener" style="color:var(--color-accent);text-decoration:none;">Website by Kansas Prairie Webworks</a></div>
```
No changes needed.

---

## FIX 6 — Dead CSS Removed

**`.btn-secondary` block removed** from `styles.css` (was lines 153–163):
```css
/* REMOVED — defined but never referenced in any HTML */
.btn-secondary { background: transparent; border-color: rgba(255,255,255,0.3); color: #fff; }
.btn-secondary:hover, .btn-secondary:focus { ... }
```

---

## Final Checklist

- [x] MIKES_AUDIT.md deleted from repo
- [x] `.service-card`: navy full perimeter + top border, stronger shadow, navy title, warmer body text
- [x] `.area-card`: navy full perimeter + left border, hover orange, navy title, warmer body text
- [x] `.faq-item`: orange left accent, navy title, warmer body text, hover navy
- [x] `.community-tag` class applied to all 24 inline city tag divs (service-area.html)
- [x] Process step cards (contact.html): covered by `.area-card` — no separate class
- [x] About page value cards (about.html): covered by `.area-card` — no separate class
- [x] Featured project card (index.html): navy border + shadow applied to `.featured-inner`
- [x] Mobile sticky bar: now shows on ≤768px mobile devices
- [x] Scroll-to-top button: added to all 12 pages, appears at 400px scroll
- [x] Service page heroes: septic.html confirmed; excavation/demolition/land-clearing/building-pad need owner photos (noted above)
- [x] "What's Included" cards: confirmed these are `<ul>` lists — not card elements
- [x] Footer KPW credit: present and correct on all 12 pages
- [x] Dead CSS (.btn-secondary) removed
- [x] Zero text content changed
