# MIKES_FIXES_V3.md
# Mike's Services LLC — Fix Pass 3
# mikeservicesllc.com
# Repo: bbotai/mikes-services-llc

---

## CLAUDE CODE — INSTRUCTIONS

Pull current repo first.

### FIRST — DELETE ALL OLD FIX AND AUDIT FILES:
```bash
git rm -f MIKES_FIXES_V1.md MIKES_FIXES_V2.md MIKES_AUDIT.md 2>/dev/null || true
```

Then execute every fix below in order.
Surgical edits — do NOT change any text content.

After completing all fixes, before committing:
Write a brief MIKES_PROGRESS.md documenting:
- Every file changed
- Every CSS class modified
- Any creative decisions made on card styling
- Anything that needed a judgment call

Commit message:
"Fix pass v3 — card redesign, sticky bar, scroll-to-top, service page hero"

---

## COLOR PALETTE REFERENCE (use throughout)

```
Primary navy:    #1C3D5A
Secondary navy:  #2A4A6B
Accent orange:   #C76B0F
Accent hover:    #a85a0c
Light bg:        #F5F1EB
White:           #ffffff
Body text:       #181E26
Muted text:      #5A6373
Shadow base:     rgba(12,30,50,0.XX)
```

---

## FIX 1 — CARD REDESIGN SITEWIDE

### Design direction:
Mike's is a professional Kansas trades business.
Cards should feel clean, confident, and premium —
not corporate dark, not sterile white.
Think: crisp white card, strong navy or orange
accent, warm shadow, clear text hierarchy.
Give Claude Code latitude to make the best
micro-decisions within this direction.

### Universal card principles to apply:
- Card background: #ffffff
- Card title: var(--color-primary) #1C3D5A — navy, bold
  NOT muted grey — make it read as a heading
- Card body text: #3D4B5C — slightly warmer than current muted
- Accent bar: left border OR top border in navy or orange
- Shadow: warm, visible — lifts card off background clearly
- Hover: lift + border color shifts to accent orange
- Border radius: 10-12px — keep the softness

### A — .service-card (10 pages):

```css
.service-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(28,61,90,0.10);
  border-top: 4px solid #1C3D5A;
  box-shadow:
    0 2px 8px rgba(12,30,50,0.09),
    0 8px 24px rgba(12,30,50,0.09);
  transition: transform 0.22s ease, box-shadow 0.22s ease,
              border-top-color 0.22s ease;
}
.service-card:hover {
  transform: translateY(-5px);
  border-top-color: #C76B0F;
  box-shadow:
    0 4px 16px rgba(12,30,50,0.13),
    0 14px 36px rgba(12,30,50,0.12);
}
.service-card h3,
.service-card .card-title {
  color: #1C3D5A !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  margin-bottom: 0.5rem !important;
}
.service-card p,
.service-card .card-text {
  color: #3D4B5C !important;
  font-size: 0.95rem !important;
  line-height: 1.65 !important;
}
```

### B — .area-card (county service area cards — 4 pages):

```css
.area-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 22px;
  border: 1px solid rgba(28,61,90,0.10);
  border-left: 5px solid #1C3D5A;
  box-shadow:
    0 2px 8px rgba(12,30,50,0.09),
    0 6px 20px rgba(12,30,50,0.08);
  transition: transform 0.22s ease, border-left-color 0.22s ease,
              box-shadow 0.22s ease;
}
.area-card:hover {
  transform: translateY(-3px);
  border-left-color: #C76B0F;
  box-shadow:
    0 4px 14px rgba(12,30,50,0.13),
    0 10px 28px rgba(12,30,50,0.11);
}
.area-card h3 {
  color: #1C3D5A !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  margin-bottom: 0.5rem !important;
}
.area-card p {
  color: #3D4B5C !important;
  font-size: 0.92rem !important;
  line-height: 1.65 !important;
}
```

### C — .faq-item (FAQ cards — 6 pages):

```css
.faq-item {
  background: #ffffff;
  border-radius: 12px;
  padding: 22px 24px;
  border: 1px solid rgba(28,61,90,0.08);
  border-left: 5px solid #C76B0F;
  box-shadow:
    0 2px 8px rgba(12,30,50,0.08),
    0 5px 18px rgba(12,30,50,0.07);
  transition: transform 0.22s ease, border-left-color 0.22s ease,
              box-shadow 0.22s ease;
}
.faq-item:hover {
  transform: translateY(-3px);
  border-left-color: #1C3D5A;
  box-shadow:
    0 4px 14px rgba(12,30,50,0.12),
    0 10px 26px rgba(12,30,50,0.10);
}
.faq-item h3,
.faq-item .faq-question {
  color: #1C3D5A !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  margin-bottom: 0.6rem !important;
}
.faq-item p,
.faq-item .faq-answer {
  color: #3D4B5C !important;
  font-size: 0.95rem !important;
  line-height: 1.7 !important;
}
```

### D — .community-tag (city name tags — service-area.html):

Convert all 24 inline-styled community tag divs
to use class="community-tag" (remove all inline styles).

```css
.community-tag {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1C3D5A;
  border: 1px solid rgba(28,61,90,0.15);
  border-left: 3px solid #1C3D5A;
  box-shadow:
    0 1px 4px rgba(12,30,50,0.08),
    0 3px 10px rgba(12,30,50,0.06);
  transition: transform 0.18s ease, border-left-color 0.18s ease;
  display: inline-block;
  cursor: default;
}
.community-tag:hover {
  transform: translateY(-2px);
  border-left-color: #C76B0F;
}
```

### E — Process step cards (contact.html "What Happens After"):

The 6-step process cards (1. You Reach Out, 2. We Assess etc.)
Find their CSS class and apply:
```css
/* Process step cards */
[class*="process"] .card,
[class*="step"] .card,
.process-card,
.step-card {
  background: #ffffff;
  border-radius: 12px;
  border-top: 4px solid #1C3D5A;
  border: 1px solid rgba(28,61,90,0.09);
  box-shadow:
    0 2px 8px rgba(12,30,50,0.08),
    0 6px 20px rgba(12,30,50,0.08);
  padding: 20px;
  transition: transform 0.22s ease;
}
[class*="process"] .card:hover,
.process-card:hover {
  transform: translateY(-3px);
}
/* Step number */
[class*="step-number"],
[class*="process"] .number {
  color: #C76B0F !important;
  font-weight: 800 !important;
}
/* Step title */
[class*="process"] h3,
.process-card h3 {
  color: #1C3D5A !important;
  font-weight: 700 !important;
}
```

### F — "How Mike Works" value cards (about.html):

The 3 cards (Honest Quotes, Clear Communication, No Subcontractors).
Find their class and apply navy top border + warm shadow.
Title in navy, body in #3D4B5C.

### G — Claude Code creative latitude:
After applying the above, review every card type
across all 12 pages. If any card type was missed
or uses different class names, apply the same
design principles:
- Navy title
- Warmer body text #3D4B5C
- Navy or orange accent border
- Stronger visible shadow
- Hover lift effect
Use your best judgment to maintain consistency.

---

## FIX 2 — MOBILE STICKY BAR (verify and fix)

### Verify Fix from V2 worked:
Check if .mobile-cta is now showing on mobile.
The audit found it was display:none on ALL screen sizes.

### If still hidden — apply this fix:
```css
/* Mobile sticky CTA — show on mobile only */
.mobile-cta {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 9999 !important;
  display: none; /* hidden desktop */
}

@media (max-width: 768px) {
  .mobile-cta {
    display: flex !important;
    justify-content: space-around !important;
    align-items: center !important;
    background: #1C3D5A !important;
    padding: 10px 0 !important;
    border-top: 2px solid #C76B0F !important;
  }
}
```

### Verify mobile-cta button content:
Check that Call, Text, and Directions buttons
have correct phone number (785-488-7925) and links.
Do not change content — just verify they exist.

---

## FIX 3 — SCROLL TO TOP BUTTON (add to ALL pages)

### Add this HTML before </body> on every page:
```html
<!-- Scroll to top button -->
<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">
  ↑
</button>
```

### Add CSS to styles.css:
```css
/* Scroll to top button */
.scroll-top {
  position: fixed;
  bottom: 80px; /* above mobile sticky bar */
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1C3D5A;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease,
              background 0.2s ease;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(12,30,50,0.25);
}
.scroll-top.visible {
  opacity: 1;
  visibility: visible;
}
.scroll-top:hover {
  background: #C76B0F;
  transform: translateY(-3px);
}

/* On desktop — sits at bottom right */
@media (min-width: 769px) {
  .scroll-top {
    bottom: 30px;
    right: 30px;
  }
}
```

### Add JavaScript to main.js:
```javascript
// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
```

---

## FIX 4 — FEATURED SERVICE PAGE HERO IMPROVEMENT

### The Tier 4 featured service page template:
Each service page (septic.html, excavation.html etc.)
should feel premium from the first scroll.

### Hero section on each service page:
Verify each service page hero has:
- Full-width background image (real jobsite photo)
- Dark overlay for text readability: rgba(0,0,0,0.50)
- H1 in white, strong and clear
- Subheadline in white/light
- Primary CTA button clearly visible

If any service page hero is using a gradient instead
of a real image — note it in MIKES_PROGRESS.md
for owner to provide a photo.

### "What's Included" section on service pages:
These cards are the core content of each service page.
Apply same card treatment as .service-card:
- Navy top border
- Stronger shadow
- Navy title, warmer body text
- Hover lift

Find the CSS class for these cards and update.
They may be .included-card, .feature-card,
.what-included, or similar — check the HTML.

### Featured project card on homepage (index.html):
The "Featured Project: Septic Installation" card.
Apply:
```css
.featured-card,
.featured-project-card,
[class*="featured"] {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(28,61,90,0.10);
  border-top: 4px solid #1C3D5A;
  box-shadow:
    0 4px 16px rgba(12,30,50,0.11),
    0 12px 32px rgba(12,30,50,0.10);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.featured-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 8px 24px rgba(12,30,50,0.15),
    0 20px 48px rgba(12,30,50,0.13);
}
/* Featured card title */
.featured-card h2,
.featured-card h3 {
  color: #1C3D5A !important;
  font-weight: 700 !important;
}
/* Featured card body */
.featured-card p {
  color: #3D4B5C !important;
}
/* Featured card button */
.featured-card .btn-outline {
  border-color: #1C3D5A !important;
  color: #1C3D5A !important;
}
.featured-card .btn-outline:hover {
  background: #1C3D5A !important;
  color: #ffffff !important;
}
```

---

## FIX 5 — FOOTER CREDIT LINK

### Verify footer shows KPW credit:
Check every page footer for:
```html
Website by Kansas Prairie Webworks
```
This should link to https://kansasprairiewebworks.com
Style: small text, accent orange color on hover.

If missing from any page — add it.
If present — verify link is correct.

---

## FIX 6 — CLEAN UP DEAD CSS

### Remove from styles.css:
- `.btn-secondary` block (defined, never used)
- Any commented-out old rules
- Keep `.mobile-cta` — now being used

---

## FINAL CHECK BEFORE PUSH

- [ ] All old fix/audit files deleted from repo
- [ ] .service-card: navy top border, stronger shadow, navy title
- [ ] .area-card: navy left border, hover orange
- [ ] .faq-item: orange left border, navy title, hover navy
- [ ] .community-tag: class applied to all 24 inline divs
- [ ] Process step cards: navy top border, orange step numbers
- [ ] About page value cards: same treatment
- [ ] Mobile sticky bar: showing on mobile
- [ ] Scroll-to-top button: on all pages, appears at 400px scroll
- [ ] Service page heroes: verified real images + overlay
- [ ] "What's Included" cards: navy top border treatment
- [ ] Featured project card: premium border + shadow
- [ ] Footer KPW credit: present and linked on all pages
- [ ] Dead CSS removed
- [ ] MIKES_PROGRESS.md created with decisions documented
- [ ] Zero text content changed

Commit and push:
```bash
git add .
git commit -m "Fix pass v3 — card redesign, sticky bar, scroll-to-top, service page hero"
git push
```

---

*Mike's Services LLC — mikeservicesllc.com*
*Built by Kansas Prairie Webworks — Salina, Kansas*
*785-577-7695 — kansasprairiewebworks.com*
*MIKES_FIXES_V3.md*
