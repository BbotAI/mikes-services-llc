# MIKES_BLOG_BUILD_V1.md
# Build: blog.html + nav updates + service page links + BLOGS_DATA.md system
# Run AFTER MIKES_FIXES_V4.md is confirmed pushed.
# Mike's Services LLC — mikeservicesllc.com — bbotai/mikes-services-llc

---

## OVERVIEW

This build adds a Blog hub page (blog.html) to mikeservicesllc.com.
The blog posts already live on Blogger at mikeservicesllc.blogspot.com and
are indexed in Google Search Console. This page closes the infinite loop:

  Blogger post → blog.html → service page → homepage → back to blog

Six real posts are wired in below. Two placeholder slots are left for future posts.
A BLOGS_DATA.md file is created as the easy update system for adding new posts later.

---

## STEP 1 — READ FIRST

Before writing a single line of code, read these files:
- index.html (card structure, nav HTML, footer HTML)
- services.html (service-card HTML structure — reuse this exactly)
- styles.css (existing card classes, grid classes, FAQ classes)
- main.js (existing JS patterns)

Identify and note:
- The exact HTML for one `.service-card` (image, h3, p, button)
- The exact CSS classes for `.service-grid`
- The nav `<ul>` structure for desktop and mobile
- The footer nav link pattern
- The `.faq-list` and `.faq-item` structure

Do NOT edit anything in this step.

---

## STEP 2 — CREATE BLOGS_DATA.md

Create a new file called BLOGS_DATA.md in the project root.
This is the easy update system — Kaleb adds new blog posts here,
then runs a simple Claude Code command to push the new card to blog.html.

Write BLOGS_DATA.md with exactly this content:

```markdown
# BLOGS_DATA.md — Mike's Services LLC
# Add new blog posts here. One block per post.
# To publish a new card: add a BLOG block below, then run:
#   claude "Read BLOGS_DATA.md. Add any blog posts marked NEW to blog.html
#   as new .blog-card elements in the #blog-list section. Follow the existing
#   card HTML exactly. Commit and push with message: Add new blog post cards"

---

## HOW TO ADD A NEW BLOG POST CARD

Copy the BLOG block below, fill it out, change STATUS to NEW, save this file,
then run the update command above in Claude Code.

---

## BLOG BLOCK TEMPLATE

```
BLOG-X
STATUS: NEW
TITLE: Your Blog Post Title Here
EXCERPT: One or two sentences that describe what the post covers. Keep it plain and direct — sound like Mike talking.
URL: https://mikeservicesllc.blogspot.com/2026/06/your-post-slug.html
THUMBNAIL: https://blogger.googleusercontent.com/[full thumbnail URL from Blogger]
ALT: Descriptive alt text for the thumbnail image — what is shown in the photo
SERVICE_LINK: which service page this relates to (e.g. demolition.html, septic.html)
DATE: Month DD, YYYY
```

---

## ACTIVE BLOG POSTS

BLOG-1
STATUS: LIVE
TITLE: How Much Does Septic System Installation Cost in Kansas?
EXCERPT: Real cost ranges for septic installation in Central Kansas — small systems, large systems, and what drives the price on your specific property.
URL: https://mikeservicesllc.blogspot.com/2026/06/septic-system-installation-cost-kansas.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr8xB2hsahg4EtHZWTGbgBwCwf2bhyujMgWgESnLZTo70ysUy0cttYR_89DQB8ALUreiH_rmSQGp11sKComjaEYHZwuhWC76mW59IZ37_6rgj0RNWL3dOdSDpmHjSR8bLiWoh6W2mVyW3mD0XhvfsNSI669SvsOqeUUCJtLiEFfWFL53JR5pV8n3llHenk/s320/IMG_5095.jpeg
ALT: Septic system installation site prep Central Kansas — Mike's Services LLC Salina KS
SERVICE_LINK: septic.html
DATE: June 7, 2026

BLOG-2
STATUS: LIVE
TITLE: Land Clearing in Central Kansas — What It Costs and What to Expect
EXCERPT: Whether you're reclaiming pasture or prepping a build site, here's what land clearing actually involves in Central Kansas and what drives the price.
URL: https://mikeservicesllc.blogspot.com/2026/06/land-clearing-central-kansas-cost.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWJ3bPN_hdAJmHkYePSQAXv2gMYgcvNgU6_2ru5lkhO_Fn3N7aqCt17Tc8icHAzbbeobVnGy_8VujvtR8DyKMcYWP3TgRcn78L4s4f2B9LVySVzq5oBr6uPitnyk5XFCx8eCneV5IYOv1oLrFhjWVWXr_MCASXhWZyMyUZg78alw9a3kEWkpMTt_VM81Sh/w320-h210/Screenshot_20260605_232756_ChatGPT~2.jpg
ALT: Land clearing Central Kansas — brush and cedar removal Mike's Services LLC
SERVICE_LINK: land-clearing.html
DATE: June 7, 2026

BLOG-3
STATUS: LIVE
TITLE: Septic Installation Permits in Kansas — What You Need to Know
EXCERPT: Kansas requires a permit before any septic system goes in. Here's what the process looks like in Saline and surrounding counties — and how Mike handles it.
URL: https://mikeservicesllc.blogspot.com/2026/06/septic-installation-permit-kansas.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr8xB2hsahg4EtHZWTGbgBwCwf2bhyujMgWgESnLZTo70ysUy0cttYR_89DQB8ALUreiH_rmSQGp11sKComjaEYHZwuhWC76mW59IZ37_6rgj0RNWL3dOdSDpmHjSR8bLiWoh6W2mVyW3mD0XhvfsNSI669SvsOqeUUCJtLiEFfWFL53JR5pV8n3llHenk/s320/IMG_5095.jpeg
ALT: Septic permit process Kansas — Mike's Services LLC Salina
SERVICE_LINK: septic.html
DATE: June 7, 2026

BLOG-4
STATUS: LIVE
TITLE: Excavation & Utility Trenching in Central Kansas — What Mike's Crew Handles
EXCERPT: From water line trenches to drainage excavation and site prep, here's what excavation work looks like on a real Central Kansas job site.
URL: https://mikeservicesllc.blogspot.com/2026/06/excavation-utility-trenching-central-kansas.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipmuWVgC2JrxiyPhHXhMcQXA8sYrKwwg7gPVYwIns_N70XeTrfwI3ImlhfuqsOn4S_x5jRzJ2yvcioS16hmxRT6xTbl4eDF64IEGraamnNjEEoTj7G7BYWzo7BgZIccaXQ4Pv5fSdqTJZ77H81H7AoyqOxARjZgJ5HyXEN3KWbpVSqV4bh8THHebynoGWJ/w255-h320/building-demolition-excavator-rural-salina.jpg
ALT: Excavation and utility trenching Central Kansas — Mike's Services LLC Salina
SERVICE_LINK: excavation.html
DATE: June 7, 2026

BLOG-5
STATUS: LIVE
TITLE: Demolition Contractor in Salina KS — What to Expect When You Hire Mike's Services LLC
EXCERPT: A real demolition job in Central Kansas from quote to clean site — what's involved, what it costs, and what questions to ask before you hire anyone.
URL: https://mikeservicesllc.blogspot.com/2026/06/demolition-contractor-salina-ks.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOkbLyB_7x3KoJ_mXscBQoww9O9FN84OMQJYGOGAwdOVP3P2P-s0e6ZcVT9PuIWZQuE8GJvQqRHd0FmAOzImM7cnOpSMMIzUSIXAZOdGFhLCM3xg6OclW8Oele1K7hG3E8fUt7f2bmdzkN67flSd3aaEPhZTqWr3eRjtk09HwuMYdsL4fWcFtzZsU45c8m/w244-h320/Screenshot_20260607_194022_Yahoo%20Mail.jpg
ALT: Demolition contractor Salina Kansas — Komatsu excavator Mike's Services LLC
SERVICE_LINK: demolition.html
DATE: June 7, 2026

BLOG-6
STATUS: LIVE
TITLE: Storm Damage Cleanup &amp; Emergency Site Work in Central Kansas
EXCERPT: When a storm drops a barn or floods your driveway overnight, you need a crew with heavy equipment — not chainsaws. Here's what storm cleanup looks like with Mike's Services.
URL: https://mikeservicesllc.blogspot.com/2026/06/storm-damage-cleanup-central-kansas.html
THUMBNAIL: https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipmuWVgC2JrxiyPhHXhMcQXA8sYrKwwg7gPVYwIns_N70XeTrfwI3ImlhfuqsOn4S_x5jRzJ2yvcioS16hmxRT6xTbl4eDF64IEGraamnNjEEoTj7G7BYWzo7BgZIccaXQ4Pv5fSdqTJZ77H81H7AoyqOxARjZgJ5HyXEN3KWbpVSqV4bh8THHebynoGWJ/w255-h320/building-demolition-excavator-rural-salina.jpg
ALT: Storm damage cleanup Central Kansas — excavator demolition debris removal Mike's Services LLC
SERVICE_LINK: demolition.html
DATE: June 9, 2026

BLOG-7
STATUS: PLACEHOLDER
TITLE: Coming Soon
EXCERPT: More tips and project insights from Central Kansas coming soon.
URL: #
THUMBNAIL:
ALT: Mike's Services LLC — Central Kansas contractor blog
SERVICE_LINK:
DATE:

BLOG-8
STATUS: PLACEHOLDER
TITLE: Coming Soon
EXCERPT: More tips and project insights from Central Kansas coming soon.
URL: #
THUMBNAIL:
ALT: Mike's Services LLC — Central Kansas contractor blog
SERVICE_LINK:
DATE:
```

---

## STEP 3 — CREATE blog.html

Create blog.html by copying the full structure of services.html as the base.
Keep identical: `<head>`, header, nav (desktop + mobile), footer, mobile sticky bar,
scroll-to-top button, and all JS includes.

Change only:
- `<title>`: Contractor Tips &amp; Local Know-How — Mike's Services LLC Blog
- `<meta name="description">`: Septic, excavation, land clearing and demolition tips
  from Mike's Services LLC in Salina, Kansas. Real answers from a Central Kansas contractor.
- `<link rel="canonical">`: https://mikeservicesllc.com/blog.html
- Update og:title, og:description, og:url to match

### MAIN CONTENT — two sections:

---

### Section A — Hero (gradient, no image)

```html
<section class="hero">
  <div class="container hero-copy">
    <h1>Contractor Tips &amp; Local Know-How</h1>
    <p class="lead">Real answers on septic, excavation, land clearing and demolition from a Central Kansas contractor who's done the work.</p>
  </div>
</section>
```

---

### Section B — Blog List (#blog-list)

```html
<section class="section" id="blog-list">
  <div class="container">
    <h2>From the Field</h2>
    <p class="section-sub">Project tips, cost guides, and local contractor know-how — written for Central Kansas property owners.</p>
    <div class="service-grid blog-grid">

      <!-- BLOG-1 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr8xB2hsahg4EtHZWTGbgBwCwf2bhyujMgWgESnLZTo70ysUy0cttYR_89DQB8ALUreiH_rmSQGp11sKComjaEYHZwuhWC76mW59IZ37_6rgj0RNWL3dOdSDpmHjSR8bLiWoh6W2mVyW3mD0XhvfsNSI669SvsOqeUUCJtLiEFfWFL53JR5pV8n3llHenk/s320/IMG_5095.jpeg"
          alt="Septic system installation site prep Central Kansas — Mike's Services LLC Salina KS"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 7, 2026</p>
          <h3>How Much Does Septic System Installation Cost in Kansas?</h3>
          <p>Real cost ranges for septic installation in Central Kansas &mdash; small systems, large systems, and what drives the price on your specific property.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/septic-system-installation-cost-kansas.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-2 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWJ3bPN_hdAJmHkYePSQAXv2gMYgcvNgU6_2ru5lkhO_Fn3N7aqCt17Tc8icHAzbbeobVnGy_8VujvtR8DyKMcYWP3TgRcn78L4s4f2B9LVySVzq5oBr6uPitnyk5XFCx8eCneV5IYOv1oLrFhjWVWXr_MCASXhWZyMyUZg78alw9a3kEWkpMTt_VM81Sh/w320-h210/Screenshot_20260605_232756_ChatGPT~2.jpg"
          alt="Land clearing Central Kansas — brush and cedar removal Mike's Services LLC"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 7, 2026</p>
          <h3>Land Clearing in Central Kansas &mdash; What It Costs and What to Expect</h3>
          <p>Whether you're reclaiming pasture or prepping a build site, here's what land clearing actually involves in Central Kansas and what drives the price.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/land-clearing-central-kansas-cost.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-3 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr8xB2hsahg4EtHZWTGbgBwCwf2bhyujMgWgESnLZTo70ysUy0cttYR_89DQB8ALUreiH_rmSQGp11sKComjaEYHZwuhWC76mW59IZ37_6rgj0RNWL3dOdSDpmHjSR8bLiWoh6W2mVyW3mD0XhvfsNSI669SvsOqeUUCJtLiEFfWFL53JR5pV8n3llHenk/s320/IMG_5095.jpeg"
          alt="Septic permit process Kansas — Mike's Services LLC Salina"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 7, 2026</p>
          <h3>Septic Installation Permits in Kansas &mdash; What You Need to Know</h3>
          <p>Kansas requires a permit before any septic system goes in. Here's what the process looks like in Saline and surrounding counties &mdash; and how Mike handles it.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/septic-installation-permit-kansas.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-4 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipmuWVgC2JrxiyPhHXhMcQXA8sYrKwwg7gPVYwIns_N70XeTrfwI3ImlhfuqsOn4S_x5jRzJ2yvcioS16hmxRT6xTbl4eDF64IEGraamnNjEEoTj7G7BYWzo7BgZIccaXQ4Pv5fSdqTJZ77H81H7AoyqOxARjZgJ5HyXEN3KWbpVSqV4bh8THHebynoGWJ/w255-h320/building-demolition-excavator-rural-salina.jpg"
          alt="Excavation and utility trenching Central Kansas — Mike's Services LLC Salina"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 7, 2026</p>
          <h3>Excavation &amp; Utility Trenching in Central Kansas</h3>
          <p>From water line trenches to drainage excavation and site prep, here's what excavation work looks like on a real Central Kansas job site.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/excavation-utility-trenching-central-kansas.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-5 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOkbLyB_7x3KoJ_mXscBQoww9O9FN84OMQJYGOGAwdOVP3P2P-s0e6ZcVT9PuIWZQuE8GJvQqRHd0FmAOzImM7cnOpSMMIzUSIXAZOdGFhLCM3xg6OclW8Oele1K7hG3E8fUt7f2bmdzkN67flSd3aaEPhZTqWr3eRjtk09HwuMYdsL4fWcFtzZsU45c8m/w244-h320/Screenshot_20260607_194022_Yahoo%20Mail.jpg"
          alt="Demolition contractor Salina Kansas — Komatsu excavator Mike's Services LLC"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 7, 2026</p>
          <h3>Demolition Contractor in Salina KS &mdash; What to Expect</h3>
          <p>A real demolition job in Central Kansas from quote to clean site &mdash; what's involved, what it costs, and what questions to ask before you hire anyone.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/demolition-contractor-salina-ks.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-6 -->
      <article class="service-card blog-card">
        <img
          src="images/blog-placeholder.webp"
          data-thumbnail="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipmuWVgC2JrxiyPhHXhMcQXA8sYrKwwg7gPVYwIns_N70XeTrfwI3ImlhfuqsOn4S_x5jRzJ2yvcioS16hmxRT6xTbl4eDF64IEGraamnNjEEoTj7G7BYWzo7BgZIccaXQ4Pv5fSdqTJZ77H81H7AoyqOxARjZgJ5HyXEN3KWbpVSqV4bh8THHebynoGWJ/w255-h320/building-demolition-excavator-rural-salina.jpg"
          alt="Storm damage cleanup Central Kansas — excavator demolition debris removal Mike's Services LLC"
          width="600" height="400"
          loading="lazy">
        <div class="card-body">
          <p class="blog-date">June 9, 2026</p>
          <h3>Storm Damage Cleanup &amp; Emergency Site Work in Central Kansas</h3>
          <p>When a storm drops a barn or floods your driveway overnight, you need a crew with heavy equipment &mdash; not chainsaws. Here's what storm cleanup looks like.</p>
          <a href="https://mikeservicesllc.blogspot.com/2026/06/storm-damage-cleanup-central-kansas.html" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
        </div>
      </article>

      <!-- BLOG-7 PLACEHOLDER -->
      <article class="service-card blog-card blog-card--placeholder">
        <img src="images/blog-placeholder.webp" alt="Mike's Services LLC — more posts coming soon" width="600" height="400" loading="lazy">
        <div class="card-body">
          <p class="blog-date">&nbsp;</p>
          <h3>More Posts Coming Soon</h3>
          <p>We're adding more tips and project guides for Central Kansas property owners. Check back soon.</p>
          <span class="btn btn-outline" style="opacity:0.4;cursor:default;">Coming Soon</span>
        </div>
      </article>

      <!-- BLOG-8 PLACEHOLDER -->
      <article class="service-card blog-card blog-card--placeholder">
        <img src="images/blog-placeholder.webp" alt="Mike's Services LLC — more posts coming soon" width="600" height="400" loading="lazy">
        <div class="card-body">
          <p class="blog-date">&nbsp;</p>
          <h3>More Posts Coming Soon</h3>
          <p>We're adding more tips and project guides for Central Kansas property owners. Check back soon.</p>
          <span class="btn btn-outline" style="opacity:0.4;cursor:default;">Coming Soon</span>
        </div>
      </article>

    </div><!-- /.service-grid.blog-grid -->
  </div>
</section>
```

---

### Section C — FAQ (same .faq-list structure as every other page)

Add a FAQ section after #blog-list using the exact same .faq-list / .faq-item
structure from index.html. Use bg-subtle background. Write 6 FAQ items in Mike's
plain-spoken voice about the blog, services, and what people can expect to learn:

Q: What kind of stuff do you write about on here?
A: Mostly the questions people ask us before they call — what things cost, how the
permit process works, when to hire a contractor versus doing it yourself, what to
expect on a job site. Real answers, no fluff.

Q: Are these prices accurate for my property?
A: The cost ranges we post are based on real jobs we've done in Central Kansas. Your
actual price depends on your site — soil conditions, access, size, and what's already
there. Call us and we'll give you a straight number.

Q: Can I share these posts?
A: Absolutely. Share them with neighbors, family, whoever's dealing with the same
questions. That's why we write them.

Q: How often do you add new posts?
A: We add posts when we have something worth saying — usually tied to a real job or
a question we've heard a dozen times. No filler content.

Q: I read the blog but I still have questions. What do I do?
A: Call us at 785-488-7925 or fill out the contact form. Reading the blog is a good
start but nothing replaces talking through your specific situation.

Q: Does reading the blog mean I'm committed to hiring you?
A: Not at all. Read as much as you want. If you decide we're the right fit, great.
If not, hopefully the posts were still useful.

---

### Section D — CTA Banner

Add a final CTA section using the existing CTA pattern from other pages:
- h2: Ready to Talk About Your Project?
- p: Call or text 785-488-7925. We serve Salina and all of Central Kansas.
- Two buttons: btn-primary → contact.html | btn-outline tel:7854887925

---

## STEP 4 — CSS ADDITIONS

In styles.css, append these rules at the bottom. Do NOT change any existing rules.

```css
/* ── Blog Grid ──────────────────────────────────── */
.blog-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  border-radius: 8px 8px 0 0;
}

.blog-date {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 0.4rem;
  font-weight: 400;
}

.blog-card--placeholder { opacity: 0.55; }
```

---

## STEP 5 — JS THUMBNAIL LOADER

In main.js, append this block at the very end. Do NOT modify any existing code.

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

## STEP 6 — CREATE blog-placeholder.webp

In the images/ folder, create a simple placeholder image named blog-placeholder.webp.
Use a solid dark navy rectangle (#1C3D5A) at 600x400px as the fallback.
This prevents broken image icons if a Blogger thumbnail fails to load.

---

## STEP 7 — NAV UPDATES (ALL HTML FILES)

Add a Blog nav link to EVERY HTML file in the project.
Files: index.html, about.html, contact.html, services.html, service-area.html,
septic.html, excavation.html, land-clearing.html, demolition.html, building-pad.html,
and blog.html itself.

In the desktop nav `<ul>`, add Blog after the last existing nav item:
```html
<li><a href="blog.html">Blog</a></li>
```

In the mobile nav menu, add the same link after the last existing mobile nav item:
```html
<li><a href="blog.html">Blog</a></li>
```

In the footer nav links, add:
```html
<a href="blog.html">Blog</a>
```

Do NOT change the order or wording of any existing nav items.

---

## STEP 8 — SERVICE PAGE RELATED BLOG LINKS

On each service page, add a small "From the Blog" line below the main content
section (before the CTA banner). Use this pattern — do NOT rewrite any existing copy:

```html
<p class="blog-callout">&#128196; <strong>From the Blog:</strong>
  <a href="[blogger URL]">[Post Title]</a> &mdash; read the full guide.</p>
```

Map each service to its most relevant post:

- septic.html → BLOG-1 (septic cost) + BLOG-3 (septic permits) — add both
- land-clearing.html → BLOG-2 (land clearing cost)
- excavation.html → BLOG-4 (excavation & trenching)
- demolition.html → BLOG-5 (demolition contractor) + BLOG-6 (storm damage)
- building-pad.html → BLOG-4 (excavation is closest match)
- service-area.html → link to blog.html generally: "Read contractor tips for Central Kansas on our blog."

Add this CSS to styles.css (in the additions block from Step 4):
```css
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

## STEP 9 — UPDATE sitemap.xml

Add blog.html to sitemap.xml:
```xml
<url>
  <loc>https://mikeservicesllc.com/blog.html</loc>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## VERIFICATION CHECKLIST

Before committing, confirm:
- [ ] blog.html exists and uses identical header/footer/nav as all other pages
- [ ] 6 live blog cards + 2 placeholder cards in #blog-list
- [ ] All blog card images use data-thumbnail attribute + placeholder src fallback
- [ ] All blog card images have explicit width="600" height="400"
- [ ] Blog thumbnail JS appended to main.js, not replacing anything
- [ ] Blog CSS appended to styles.css, not replacing anything
- [ ] Blog nav link added to ALL HTML files (desktop + mobile + footer)
- [ ] blog-callout links added to all service pages
- [ ] blog-placeholder.webp created in images/ folder
- [ ] blog.html added to sitemap.xml
- [ ] BLOGS_DATA.md created in project root
- [ ] Zero existing copy, headings, or layout changed anywhere

---

## COMMIT MESSAGE

```
feat: add blog.html with 6 post cards, nav updates, service page blog links, BLOGS_DATA.md
```

---

## HOW TO ADD A NEW BLOG POST IN THE FUTURE

1. Post on Blogger as normal
2. Open BLOGS_DATA.md in the project folder
3. Copy the BLOG BLOCK TEMPLATE, fill in all fields, set STATUS: NEW
4. Save the file
5. Open Claude Code in Mike's folder and paste:

```
Read BLOGS_DATA.md. Add any blog posts with STATUS: NEW to blog.html as new
.blog-card elements in the #blog-list section, before the placeholder cards.
Use the exact same card HTML as the existing blog cards. Replace the oldest
placeholder card if all 8 slots are full. Update STATUS to LIVE in BLOGS_DATA.md
after adding. Commit and push: "Add new blog post card — [post title]"
```

That's it. New card live in under a minute.
