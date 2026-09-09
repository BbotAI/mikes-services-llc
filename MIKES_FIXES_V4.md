# MIKES_FIXES_V4.md
# Target: LCP regression (hero.webp 4,728ms) + CLS regression (#featured 0.14)
# Run this AFTER V3 is confirmed complete.

---

## CONTEXT

Cloudflare Web Analytics (June 18, 2026) shows two regressions on mikeservicesllc.com:

1. **LCP — 8% Poor**: `#home` / `mikeservicesllc.com/images/hero.webp` still hitting
   4,728ms on slow connections. The preload added in V1 may not be correct priority
   or may be missing the `fetchpriority="high"` attribute.

2. **CLS — 8% Needs Improvement**: `#featured` section scoring 0.14 layout shift.
   This is almost certainly caused by an image or card element inside the featured
   project section that loads without explicit width/height attributes, causing the
   layout to reflow after paint.

INP is 100% good — do not touch any interaction/JS logic.

---

## FIX 1 — Hero LCP (index.html)

### What to do:
Open `index.html`. Find the `<head>` section.

**Check if this preload link exists:**
```html
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high">
```

**If it exists but is missing `fetchpriority="high"`**, add that attribute.

**If it does not exist**, add it as the FIRST `<link>` tag inside `<head>`, before
any stylesheet links. Placement matters — it must be as early as possible.

### Also check the hero `<img>` tag itself:
Find the `<img>` tag for the hero image in `index.html`. Confirm it has ALL of:
- `src="/images/hero.webp"`
- `fetchpriority="high"`
- `loading="eager"` (NOT lazy — lazy on the hero causes LCP delay)
- Explicit `width` and `height` attributes matching the actual image dimensions
- `decoding="async"` is acceptable but NOT required

**If `loading="lazy"` is present on the hero image, change it to `loading="eager"`.**
This is a common cause of LCP regression after batch fixes.

### Do NOT change:
- Any other images on the page
- Any copy, headings, or layout
- Any other `<link>` tags

---

## FIX 2 — Featured Section CLS (index.html)

### What to do:
Find the `#featured` section in `index.html`.

Locate every `<img>` tag inside `#featured`. For each one:

1. **Add explicit `width` and `height` attributes** if they are missing.
   Use the actual pixel dimensions of the image file. If unknown, use the
   rendered display size (check CSS for the card image dimensions).
   Common safe values for card thumbnails: `width="600" height="400"`

2. **Confirm `aspect-ratio` is set in CSS** for the card image container.
   Open `styles.css`. Find the CSS class used for images inside `.featured`
   or `.card` or whatever class wraps the featured section images.

   If no `aspect-ratio` exists, add it:
   ```css
   .featured-card img,
   .featured img {
     width: 100%;
     height: auto;
     aspect-ratio: 3 / 2;
   }
   ```
   Use the actual class names from the existing CSS — do not invent new ones.

3. **Check for any absolutely positioned or dynamically injected content**
   inside `#featured` that could shift layout. If any element uses
   `position: absolute` without a defined parent height, add an explicit
   `min-height` to the parent container to reserve space.

### Do NOT change:
- The card text, headings, or copy in `#featured`
- The card layout structure
- Any other sections

---

## FIX 3 — Verify preload on ALL service pages

The LCP data shows `mikeservicesllc.com/` (homepage) as the worst offender but
service pages also show LCP variance. Do the following on every HTML file that
has a hero image at the top:

Files to check: `index.html`, `septic.html`, `land-clearing.html`,
`excavation.html`, `building-pad.html`, `service-area.html`, `contact.html`

For each file:
- If the page has a full-width hero image at the top, confirm `loading="eager"`
  and `fetchpriority="high"` are present on that image tag
- If the page does NOT have a hero image (text-only hero), no change needed

---

## VERIFICATION STEPS

After making all changes, confirm the following before committing:

1. `index.html` `<head>` has preload link as first `<link>` with `fetchpriority="high"`
2. Hero `<img>` has `fetchpriority="high"` and `loading="eager"` (not lazy)
3. Every `<img>` inside `#featured` has explicit `width` and `height` attributes
4. `styles.css` has `aspect-ratio` on featured card images
5. No existing copy, headings, nav, or footer was changed

---

## COMMIT MESSAGE

```
fix: LCP fetchpriority + hero eager load, CLS aspect-ratio on #featured images
```

---

## AFTER V4 — NEXT STEP

Once V4 is confirmed pushed to GitHub and Cloudflare shows improvement
(allow 24–48hrs for new RUM data), proceed to:

**MIKES_BLOG_BUILD_V1.md** — Blog page + 8 card slots + nav updates
