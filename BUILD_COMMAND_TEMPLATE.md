# BUILD COMMAND TEMPLATE — Kansas Prairie Webworks
## Tier 4 Local Business Website
## Version 5.7 — Auto-reads CLIENT_BRIEF_TEMPLATE.md
## Internal use only — kansasprairiewebworks.com

---

## SCOPE DISCIPLINE — PRODUCTION REPOS

Never modify, resize, rename, recompress, or move files outside the explicit
scope of the task. If optimization looks warranted, report it as a
recommendation and stop. Do not act on it.

Before any commit to a repo that is already live, run `git diff --stat` and
report the full file list for approval. A commit that touches more files than
the task requires is a defect, not a bonus.

---

## HOW TO USE THIS FILE

1. Complete CLIENT_BRIEF_TEMPLATE.md fully for your new client
2. Name all images correctly in the images/ folder
3. Open Claude Code in the client folder
4. Paste the single command below — nothing to swap, nothing to edit
5. Claude Code reads the brief and builds everything automatically

---

## THE BUILD COMMAND
## Copy everything between the triple backticks and paste into Claude Code

```
Read INTAKE_FROM_BUILD.md, then TEMPLATE_GUIDE.md from the current working directory before writing a single line of code.

AGENCY BRAIN IS THE PRIMARY SOURCE OF TRUTH.
CLIENT_BRIEF_TEMPLATE.md is a fallback only.
All client data comes from Agency Brain via INTAKE_FROM_BUILD.md Steps 1-5.
Only read CLIENT_BRIEF_TEMPLATE.md if Agency Brain API is unavailable.

--- FILE LOOKUP ---

The client brief may be named any of the following. Check in this order:
  1. CLIENT_BRIEF.md
  2. CLIENT_BRIEF_TEMPLATE.md
  3. CLIENT_BRIEF.md.txt

Use whichever file exists and contains the filled-out client data.
If you find a file that is empty or looks like a blank template, skip it and check the next name.

TEMPLATE_GUIDE.md contains the complete KPW Tier 4 technical specification.

---

STEP 1 — READ AND PARSE

Read the client brief completely. Before proceeding, list every key variable extracted:
- Business name, owner name, phone (digits-only AND display format), email, address, domain
- GitHub repo name (if the field contains a full URL like https://github.com/BbotAI/procleaning.git,
  extract only the repo name: procleaning)
- Formspree ID (if the field contains a full URL like https://formspree.io/f/mbdprrnj,
  extract only the ID: mbdprrnj — the form action URL is https://formspree.io/f/[ID])
- All services and their page filenames
- All counties and community tags
- Brand colors (or confirm using KPW defaults)
- Voice and tone notes from Section 12

Read TEMPLATE_GUIDE.md completely. Confirm you understand:
- Full page structure and section order
- Every component class name and CSS
- Color system and typography
- SEO requirements and schema structure
- Image filenames and requirements

---

STEP 2 — VOICE AND TONE

Read Section 12 of the client brief carefully.
Use the voice and tone notes to write ALL website copy including:
- Homepage hero headline and lead text
- About page paragraphs
- Service descriptions and long form content
- FAQ questions and answers
- CTA copy and trust statements
- Any other text content on any page

Write like this specific person talks. Blue collar, professional,
or formal — whatever Section 12 describes. Never use generic
corporate language. Every sentence should sound like it came
from this actual business owner.

---

STEP 3 — IMAGE CHECK

Check the images/ folder. List every image file present.

WINDOWS IMAGE WARNING: Windows hides known file extensions by default.
A file saved as "featured-1.jpg" may appear as "featured-1.jpg" in Explorer
but actually be named "featured-1.jpg.jpg" on disk (double extension).
Check the actual filename carefully. If a .jpg file appears in an images/ folder
and you are not sure if it has a double extension, use Glob to list the exact
filenames. Always reference the EXACT disk filename in HTML src attributes.

Note any required images that are missing.
Log all missing images in PROGRESS.md for the owner to provide later.
Do not create placeholder images — leave the slot empty and note it.

---

STEP 4 — BUILD FILES IN THIS ORDER

4a — Create GitHub repo: bbotai/[repo-name from client brief]
     If repo already exists, pull it first.

4b — Build styles.css
     Use exact KPW Tier 4 component CSS from TEMPLATE_GUIDE.md.
     If client has custom brand colors in the brief,
     update only the :root CSS color variables.

     COLOR MAPPING NOTE: The client's "secondary" color may be near-white
     (like #F5FBFD). If the secondary is too light for footer backgrounds or
     heading text, remap it to --bg-subtle and derive a darker functional
     secondary (e.g. darken the primary by 40%) for footer and heading use.

     If no custom colors — use KPW Tier 4 defaults:
       Primary:   #1C3D5A
       Secondary: #2A4A6B
       Accent:    #C76B0F

4c — Build main.js
     Populate the services[] config array from the client brief.
     Keep all other functions identical to TEMPLATE_GUIDE.md spec:
     nav, hamburger, scroll-to-top, year auto-update, sticky bar.

4d — Build HTML pages (one at a time, complete each before moving on):
     - index.html     Homepage: hero, services grid, featured project,
                      service area preview, FAQ section, CTA banner
     - about.html     About columns, value cards, services list, CTA
     - contact.html   Contact info, quote form, process steps, services
     - services.html  Services overview page
     - service-area.html  Counties, community tags, full coverage text
     - [service].html     One page per service listed in the brief
                          Each needs: hero, what's included, FAQ, CTA

     ENCODING WARNING — READ BEFORE WRITING ANY HTML:
     Always write HTML files using the Write tool directly with HTML entities.
     NEVER use PowerShell Get-Content / Set-Content to read or modify HTML files.
     PowerShell defaults to Windows-1252 encoding on Read, which corrupts
     all multi-byte UTF-8 characters (em dashes, hamburger icon, etc.).
     Use HTML entities throughout — never raw Unicode in HTML files:
       Em dash:         &mdash;
       En dash:         &ndash;
       Hamburger ☰:     &#9776;
       Up arrow ↑:      &#8593;
       Copyright ©:     &copy;
       Ampersand &:     &amp;

     SCHEMA VALIDATION NOTE (required on every JSON-LD block):
     - telephone must be E.164 format: "+17855777695" — no hyphens,
       no spaces, no "+1-" prefix. Never "785-577-7695" or "+1-785-577-7695".
     - openingHours must use standard format: either the openingHours
       string form ("Mo-Fr 08:00-17:00") or the full openingHoursSpecification
       array form — never plain text like "Monday through Friday, 8 to 5".
     - priceRange must be "$", "$$", or "$$$" only.
     - url fields must start with https://
     - No empty required fields on any schema block (LocalBusiness,
       FAQPage, BreadcrumbList, WebSite, Service).
     - NEVER leave "https://your-domain.com" as a placeholder in schema,
       Open Graph tags, sitemap.xml, or robots.txt if a real domain exists
       in the client brief — this silently breaks OG previews, sitemap
       submission, and schema url validation. If no domain yet, note it
       in PROGRESS.md so Kaleb replaces it before go-live.

4e — Build sitemap.xml listing all pages with client domain
     If domain is blank/placeholder — use your-domain.com as placeholder
     and log it in PROGRESS.md as a blocker to fix before go-live.

4f — Build robots.txt. Copy this exact format — do not add extra
     crawler entries or Disallow rules beyond what's below:

     ```
     User-agent: *
     Allow: /

     User-agent: GPTBot
     Allow: /

     User-agent: Google-Extended
     Allow: /

     User-agent: OAI-SearchBot
     Allow: /

     User-agent: anthropic-ai
     Allow: /

     User-agent: ClaudeBot
     Allow: /

     User-agent: PerplexityBot
     Allow: /

     Sitemap: https://[clientdomain]/sitemap.xml
     ```

     CLOUDFLARE WARNING: If the client's DNS is proxied through Cloudflare,
     Cloudflare's "AI Crawl Control" / Managed robots.txt feature injects
     its OWN block of rules at the top of the served robots.txt — this can
     silently Disallow ClaudeBot, GPTBot, Google-Extended, and
     Applebot-Extended sitewide regardless of what this file says. The
     origin file fix above does NOT override it. Check the LIVE robots.txt
     (curl the domain, not the repo file) after every deploy, and if a
     "BEGIN Cloudflare Managed content" block appears with Disallow rules
     for AI crawlers, tell Kaleb to open Cloudflare dashboard → the zone →
     AI Crawl Control (or Bot Management) → allow those bots at the edge.

4f-2 — Build llms.txt (save to repo root, alongside robots.txt).
     This is the emerging standard for AI search engines — tells them
     what each page is for so they route questions to the right content.
     Generate automatically from Agency Brain data + sitemap.xml:
       - Pull clientName, phone, email, domain, serviceAreas, services
         list from the client brief / Agency Brain.
       - Pull the full page list from sitemap.xml — one line per URL
         with a one-line description of what that page answers.
     Format:
     ```
     # [Client Name] — LLM Access File
     # [One-line business type]
     # [City], Kansas

     > [2-4 sentence business summary: what they do, who they serve,
     owner name, service area counties].
     Phone: [phone]
     Website: https://[domain]

     ## Pages

     / — [one-line description]
     /about.html — [one-line description]
     [... one line per page in sitemap.xml ...]

     ## Service Area
     [serviceAreas from Agency Brain]

     ## Contact
     Phone: [phone]
     Email: [email]
     ```

4g — Create CNAME file:
     If the domain field in the brief has a real domain — put ONLY that domain
     in the CNAME file, no http://, no www prefix. Example: procleaning.com
     If the domain field is blank or says "your-domain.com" or N/A —
     leave the CNAME file COMPLETELY EMPTY (zero bytes).
     DO NOT put "your-domain.com" in CNAME — it will block GitHub Pages
     from deploying and the site will not go live.

4h — Create .gitignore
     Exclude client brief files, template files, OS files, editor files.
     Include: CLIENT_BRIEF.md, CLIENT_BRIEF_TEMPLATE.md, CLIENT_BRIEF.md.txt,
              BUILD_COMMAND_TEMPLATE.md, TEMPLATE_GUIDE.md, BLOGS_DATA.md

4i — Build Blog System (Tier 4 standard — include on every build)

     IMAGE GENERATION — Python is NOT available on this system. Use Node.js only.
     Node.js v24 is always available. Never use pip, python, or python3.

     4i-1: Generate images/blog-placeholder.webp using Node.js + sharp:

           mkdir /tmp/webpgen
           cd /tmp/webpgen
           npm install sharp
           node -e "require('sharp')({create:{width:600,height:400,channels:3,background:{r:[R],g:[G],b:[B]}}}).webp().toFile('[absolute-path]/images/blog-placeholder.webp',()=>console.log('done'))"

           Replace [R][G][B] with client primary brand color.
           KPW navy default: r:28 g:61 b:90 (#1C3D5A)

     4i-1b: Generate favicon files from client logo using Node.js sharp.
           Source: prefer images/logo-icon.webp (square icon-only). Fall
           back to images/logo.webp and flag it in the build report.

           sharp CANNOT write .ico. Never generate .ico. Never install
           png-to-ico. Never emit a rel="icon" tag pointing at .ico.

           Generate to REPO ROOT (not images/ folder), PNG only:
             favicon-48x48.png
             favicon-96x96.png
             favicon-192x192.png
             apple-touch-icon.png (180x180)

           Composite the mark on a solid square of the client's primary
           brand color, mark at ~80% of frame. Preserve alpha on the
           source: fit 'contain', background {r:0,g:0,b:0,alpha:0}.

           FALLBACK — MONOGRAM BADGE: if the logo is a scene (vehicle,
           building, landscape), contains text or a phone number, or has
           a baked-in background that survives cropping — do not force
           it. Generate a monogram badge instead: solid brand-color
           square, client initial in white bold sans-serif, cap height
           ~65% of frame, no border or gradient. Report that you did
           this.

           Add to every HTML file's <head>, after existing meta/link
           tags — index.html is mandatory (Google reads the favicon
           from the homepage root only):
             <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
             <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
             <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
             <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

           A blog subdomain is a separate hostname and needs its own
           favicon set generated and linked independently.

     4i-1c: PREVIEW GATE — before committing any favicon work, write
           _preview-48.png and _preview-16.png to repo root, report the
           paths, and STOP for human approval. The 16px preview is the
           decision point — full-size appearance does not predict 16px
           legibility. Delete both preview files after approval.

     4i-2: Build blog.html
           Sections: gradient hero (no image, no CTA buttons), blog grid
           (#blog-list > .service-grid.blog-grid), FAQ (.faq-list/.faq-item),
           CTA banner. Start with 6 placeholder cards and 2 coming-soon slots.
           Pull initial post data from Section 13 of the client brief if populated.
           See TEMPLATE_GUIDE.md Section 14 for complete blog card HTML and structure.

     4i-3: Append blog CSS block to styles.css (blog-grid, blog-card, card-body,
           blog-date, blog-card--placeholder, blog-callout).
           Also add: .featured-media img { aspect-ratio: 16 / 9; } to prevent CLS.
           See TEMPLATE_GUIDE.md Section 14D for full CSS block.

     4i-4: Append blog thumbnail loader IIFE to main.js (after DOMContentLoaded block).
           See TEMPLATE_GUIDE.md Section 14E for full JS block.

     4i-5: Add Blog nav link to ALL HTML files (desktop nav + footer):
           Nav:    <a href="blog.html">Blog</a> — after Contact link, before phone link
           Footer: <a href="blog.html">Blog</a> — in .footer-right after Google comment

     4i-6: Create BLOGS_DATA.md — post tracker with all slots as PLACEHOLDER.
           Add BLOGS_DATA.md to .gitignore (internal tracking only, not deployed).

     4i-7: Create BLOG_AGENT.md in client folder.
           See TEMPLATE_GUIDE.md Section 14J for the required structure.
           Update header with client name and Blogger URL from Section 13.
           Set all 8 slots to PLACEHOLDER in CURRENT BLOG CARD COUNT.

     4i-8: Add blog-callout links to each service page (after service-grid, before CTA).
           Map using Section 13 post URLs — or leave blank if no posts exist yet.
           See TEMPLATE_GUIDE.md Section 14F for callout HTML pattern.

     4i-9: Add hero image preload as the FIRST <link> in <head> on index.html:
           <link rel="preload" as="image" href="images/hero.webp" fetchpriority="high">
           This must come before font preconnects. Critical for LCP score.

4j — STANDARD ADDITIONS — Apply to every HTML file on every build:

     4j-1: CANONICAL TAG
           Add to every page <head> — before <link rel="preconnect">:
             <link rel="canonical" href="https://[domain]/[filename].html">
           Use actual client domain and exact filename per page.
           Example: <link rel="canonical" href="https://mikeservicesllc.com/septic.html">
           blog.html is the one page that commonly already has this — check before adding.

     4j-2: ROBOTS META TAG
           Add to every page <head> — before <link rel="preconnect">:
             <meta name="robots" content="index, follow">
           Place on the same line group as canonical. Both must be on every page.

     4j-3: FAQPage SCHEMA
           On any page containing .faq-item elements:
           — Read every .faq-item <h3> (question) and <p> (answer) from the HTML.
           — Add FAQPage JSON-LD as a second <script type="application/ld+json">
             in <head>, after the LocalBusiness/Service schema block.
           — Include every Q&A pair from that page — do not truncate.
           — Do NOT add FAQPage schema to pages with no .faq-item elements
             (contact.html, about.html, services.html, service-area.html typically).

     4j-4: SCHEMA HOURS — CORRECT FORMAT
           openingHoursSpecification must match Agency Brain hours field exactly.
           Never assume hours — always read from Agency Brain before writing schema.
           Split Mon-Fri and Saturday into separate objects if hours differ.
           Standard format (Mon-Fri 8-5, Sat 8-12):
             "openingHoursSpecification": [
               {
                 "@type": "OpeningHoursSpecification",
                 "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                 "opens": "08:00",
                 "closes": "17:00"
               },
               {
                 "@type": "OpeningHoursSpecification",
                 "dayOfWeek": ["Saturday"],
                 "opens": "08:00",
                 "closes": "12:00"
               }
             ]
           Apply on every page that contains openingHoursSpecification — not index.html only.

     4j-5: GOOGLE REVIEW LINK IN FOOTER — STORE VERBATIM, NEVER CONSTRUCT
           The review URL is a real link a client pastes from their own GBP
           dashboard. It is stored as a plain URL in Agency Brain's
           googleReviewUrl field and used exactly as stored — never built
           from a Place ID. The pattern https://g.page/r/<PLACE_ID>/review
           is NOT a valid review-link format (that URL shape expects a CID,
           not a Place ID) and produces a dead link even with a real Place
           ID substituted in. Do not construct this URL from any other
           field, ever, on any page.

           CONDITIONAL RENDER — add to .footer-right on ALL pages, after
           the Facebook link, before the Blog link, ONLY when
           googleReviewUrl from Agency Brain is a non-empty real URL
           (does not contain the literal string "PLACEHOLDER" and is not
           blank):
             <a href="[googleReviewUrl]" target="_blank" rel="noopener">Leave a Google Review ★</a>
           If googleReviewUrl is blank, missing, or contains "PLACEHOLDER"
           — omit the anchor tag entirely. Do not render a dead link and do
           not leave an HTML comment placeholder in its place; just skip it.
           When a real googleReviewUrl lands in Agency Brain later, re-run
           this step to add the button — it's a content update, not a
           rebuild.

     4j-6: TESTIMONIALS SECTION ON HOMEPAGE
           Add to index.html between the featured section and the service areas section.
           Pull from Agency Brain bestReview field. If multiple reviews — build a
           3-column .service-grid with one .service-card per review:
             — Orange &#9733;&#9733;&#9733;&#9733;&#9733; stars above each quote
             — Italic quote text
             — Reviewer name and source (e.g. "— Name, via Facebook")
           Include a "Leave Us a Google Review" btn btn-outline CTA below the grid —
           same conditional-render rule as 4j-5: only render this CTA when
           googleReviewUrl is a real, non-placeholder URL from Agency Brain.
           If it isn't available yet, omit the CTA (keep the testimonials
           grid itself either way — that part doesn't depend on the review link).

---

STEP 5 — PULL APPROVED IMAGES FROM AGENCY BRAIN

Website images come from the client portal.
Clients upload via bbotai.github.io/kpw-client-portal
Images save to Cloudinary and Agency Brain automatically.

Pull website images from Agency Brain:
GET [v33 URL]?action=getClient&clientId=CLIENT_ID

Filter imageLibraryUrls where type === "website"
Map slot names to filenames:
  hero-home       → images/hero-home.webp
  logo            → images/logo.webp
  featured-1      → images/featured-1.webp
  hero-service-1  → images/hero-service-1.webp
  hero-service-2  → images/hero-service-2.webp
  hero-service-3  → images/hero-service-3.webp
  hero-service-4  → images/hero-service-4.webp
  hero-service-5  → images/hero-service-5.webp
  about-team      → images/about-team.webp
  blog-placeholder→ images/blog-placeholder.webp

Download each image from Cloudinary URL.
Save to images/ folder with correct filename.
If no website images exist yet:
  Use gradient heroes on service pages.
  Note missing images in PROGRESS.md.
  Client can upload via portal later.
  Run image placement prompt to update.

Project photos (type="project") are used
for content generation only — not placed
on website pages directly.

---

STEP 5B — DOUBLE-EXTENSION GUARD (enforced — do not skip)

List every file in images/ with Glob (not Windows Explorer — Explorer
hides known extensions and will lie about the real filename).
Fail this step on any double extension (e.g. featured-1.jpg.jpg,
og-image.jpg.jpeg). Rename to the correct single extension via git mv
(or a plain rename if not yet a git repo) and update every reference
(see IMAGE FORMAT MIGRATION — REFERENCE SWEEP) before proceeding to
STEP 6.

---

STEP 6 — CRITICAL CONTENT CHECK

Search every single file for any remaining instances of previous client data.
Check for any previous client data from prior builds.
  Zero previous client content anywhere.
  Every field must match current client from Agency Brain only.

Every phone number, address, name, email, and URL
must come from the client brief only. Zero previous client content anywhere.

Also confirm:
- og:image path matches actual image filename on disk (including any double extension)
- featured image src matches actual filename on disk
- All service image src values match actual filenames on disk

---

STEP 7 — WRITE PROGRESS.md

Document the following:
- Every file created
- Every image found in images/ folder (exact filename as it appears on disk)
- Every image MISSING — list exact filename needed
- Any client brief fields that were blank or N/A
- Any content judgment calls made during the build
- Post-build deployment checklist for Kaleb

---

STEP 8 — COMMIT AND PUSH

Stage all files.
Commit with message: "Initial build — [Business Name from client brief]"
Push to GitHub main branch.
Confirm push succeeded and list every file in the final repo.

---

STEP 8B — VISUAL QA

Before considering the build done, verify the live site actually renders —
a successful push does not mean the pages work. Copy this template's
run-kpw-tier4-template skill (.claude/skills/run-kpw-tier4-template/) into
this client's own .claude/skills/run-[client-slug]/. Once GitHub Pages is
live, run it against the live URL:

  node driver.mjs shot <live-url> out.png
  node driver.mjs shot <live-url> out-mobile.png --mobile

Confirm both screenshots render correctly and `Console errors: none`.
Note the result in PROGRESS.md.
```

---

## BEFORE YOU RUN — CHECKLIST

- [ ] Client brief fully filled out — QUICK REFERENCE section at top complete
- [ ] Section 12 voice notes written — even a few sentences is enough
- [ ] images/ folder has all available client images named correctly
- [ ] Check Windows extension doubling — verify exact filenames with Glob before building
- [ ] Formspree account created — form ID entered in client brief
- [ ] Domain purchased — entered in client brief (leave blank if not yet purchased)
- [ ] GitHub repo name decided — entered in client brief

---

## AFTER CLAUDE CODE FINISHES — CHECKLIST

- [ ] Review every page — confirm zero previous client content anywhere
- [ ] Check all phone links (tel: and sms:) use correct client digits
- [ ] Check Directions link uses correct client address
- [ ] Verify Formspree ID is correct in contact form action
- [ ] Verify Facebook URL is correct
- [ ] Set up GitHub Pages:
        repo → Settings → Pages → main branch → / root → Save
- [ ] Add custom domain in GitHub Pages custom domain field → Save
  (Only after domain is purchased and pointed to GitHub)
- [ ] Set up Cloudflare DNS (see records below)
- [ ] Set Cloudflare SSL/TLS to Full
- [ ] Wait for Enforce HTTPS checkbox to become clickable → check it
- [ ] Test on mobile — sticky bar visible, scroll-to-top working
- [ ] Visual QA run against live URL (STEP 8B) — desktop + mobile screenshots, zero console errors
- [ ] Submit sitemap to Google Search Console
- [ ] Send client preview link and get approval before announcing live
- [ ] Set up Google Analytics GA4 property for client — add tracking ID to all pages
- [ ] Create Google Business Profile if client does not have one — service area business
      type verifies faster than storefront; do not select storefront if no public walk-in address
- [ ] Once GBP is verified, get the real review link from the client's GBP
      dashboard (Home → "Get more reviews" → Copy link) and store it verbatim
      in Agency Brain's googleReviewUrl field — do not construct it from a
      Place ID (see STEP 4j-5). Re-run 4j-5/4j-6 to add the review button
      across all pages once a real link is stored.
- [ ] Verify canonical tags on every page — correct domain, correct filename, no duplicates
- [ ] Confirm favicon.ico appears in repo root
- [ ] Test favicon shows in browser tab
- [ ] Test favicon shows in Google search results (may take 24-48hrs to update)
- [ ] Validate robots.txt at robotstxt.checker.io
- [ ] Curl the LIVE robots.txt (not the repo file) and check for a Cloudflare
      "Managed content" block Disallowing ClaudeBot/GPTBot/Google-Extended —
      if present, fix it in Cloudflare AI Crawl Control, not just the repo
- [ ] Run `node kpw_credentials/cloudflare_bot_check.js <client-domain>` — confirms
      the auto-generated WAF "AI Crawl Control" rule isn't silently blocking
      Googlebot or other legitimate crawlers (see CLOUDFLARE BOT CHECK section
      above). This is a separate mechanism from the robots.txt check above —
      check both.
- [ ] Validate all schema at validator.schema.org
- [ ] Confirm llms.txt exists in repo root and lists every page in sitemap.xml
- [ ] Test all internal links return 200 (check href/src against repo files,
      then spot-check the live domain with curl)
- [ ] Check anchor text is descriptive — no standalone "click here" / "here" /
      "this page" / "link" (blog card "Read More →" buttons are fine, they
      have context from the card title)
- [ ] `git diff --stat` reviewed before push — no files outside task scope
- [ ] All images return 200 after deploy (spot-check every service card image)
- [ ] Every image reference in .html/.css/.js/.json/.xml resolves to a real file
- [ ] No double extensions in images/
- [ ] All images 200 via headless Chrome with JS enabled, every page
- [ ] JS-rendered sections listed in PROGRESS.md
- [ ] grep PLACEHOLDER / TODO / example.com — zero hits
- [ ] Business name identical across site copy, schema markup, and GBP
- [ ] 16px favicon preview approved

---

## CLOUDFLARE DNS SETUP (same every client)

Add these A records in Cloudflare DNS:

  Type  Name  Content            Proxy
  A     @     185.199.108.153    Proxied (orange cloud)
  A     @     185.199.109.153    Proxied (orange cloud)
  A     @     185.199.110.153    Proxied (orange cloud)
  A     @     185.199.111.153    Proxied (orange cloud)

Add this CNAME record:

  Type   Name  Content            Proxy
  CNAME  www   bbotai.github.io   Proxied (orange cloud)

SSL/TLS mode in Cloudflare: Full
All records: orange cloud (Proxied ON)

---

## CLOUDFLARE BOT CHECK (required — after DNS setup, before build is considered done)

Cloudflare auto-creates an "AI Crawl Control - Block AI bots by User Agent"
WAF custom rule on new zones. Its default list blocks by literal user-agent
substring and includes legitimate crawlers — Googlebot, bingbot, GPTBot,
ClaudeBot, OAI-SearchBot, PerplexityBot — alongside actual scrapers. This
happens silently at the edge regardless of what robots.txt says in the repo,
and Bot Management / AI Crawl Control's own toggle settings can show
everything "disabled" while this rule still blocks traffic underneath it.

Confirmed root cause of a real incident: Googlebot got 403'd on a live client
page for days before GSC Coverage surfaced it as "Blocked due to access
forbidden (403)."

Once DNS is added for a new client zone, run:

  node kpw_credentials/cloudflare_bot_check.js <client-domain>

Requires CLOUDFLARE_API_TOKEN (User-scope env var — never hardcode it) with
Zone Read + Bot Management Read + Zone WAF Edit permissions on the zone.
If it reports any legitimate crawler blocked, re-run with --fix:

  node kpw_credentials/cloudflare_bot_check.js <client-domain> --fix

Then verify live with curl (normal UA should already work; this confirms
Googlebot does too):

  curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -o /dev/null -w "%{http_code}\n" https://<client-domain>/

A new client build is not done until this returns 200.

---

## CLIENT FOLDER STRUCTURE
(What the folder should look like before running the build command)

  [client-business-name]/
  ├── CLIENT_BRIEF_TEMPLATE.md   ← filled out completely (this is the primary brief)
  ├── TEMPLATE_GUIDE.md          ← copied from master template
  ├── BUILD_COMMAND_TEMPLATE.md  ← this file
  ├── BLOG_AGENT.md              ← created by Claude during build (Step 4i-7)
  └── images/
      ├── logo.png or logo.jpg   ← client logo (any format)
      │     Client may supply any format; build converts to logo.webp.
      ├── hero-home.webp         ← homepage hero photo
      ├── featured-1.webp        ← featured section photo
      ├── hero-service-1.webp    ← service 1 card + hero (numbered in order of services in brief)
      ├── hero-service-2.webp    ← service 2 card + hero photo
      ├── hero-service-3.webp    ← service 3 card + hero photo
      ├── hero-service-4.webp    ← service 4 card + hero photo (if 4 services)
      ├── hero-service-5.webp    ← service 5 card + hero photo (if 5 services)
      ├── og-image.webp          ← social share image [OPEN GAP — no portal slot, no STEP 5 mapping, no generation step. Not currently produced by the build.]
      └── blog-placeholder.webp  ← GENERATED by Claude during build (Step 4i-1) — do NOT ask client to provide

IMAGE NAMING RULES:
- Required images: logo.png/jpg (client may supply any format; build converts to logo.webp), hero-home.webp, featured-1.webp, og-image.webp
- Service images: hero-service-1.webp through hero-service-N.webp (one per service, numbered in brief order)
- blog-placeholder.webp is auto-generated via Node.js/sharp — never listed as client-provided

WINDOWS EXTENSION WARNING: After dropping images into the folder, verify actual
filenames. Windows hides .jpg extensions by default, so a file that looks like
"featured-1.jpg" may actually be "featured-1.jpg.jpg" on disk. Run a Glob
check on the images/ folder at the start of every build to see exact filenames.
Double extension confirmed on procleaning build: featured-1.jpg.jpg, og-image.jpg.jpeg

NODE.JS VS PYTHON:
- Node.js v24 is always available on this system — use for image generation, scripting
- Python is NOT available — never use pip, python, or python3 commands
- Sharp (npm package) handles all image creation/conversion needs

---

## IF CLIENT HAS NO PHOTOS YET

Build the site with gradient heroes on service pages.
Note every missing image in PROGRESS.md.
When client provides photos later — drop them into images/
with correct filenames and run:

  claude "Pull bbotai/[repo-name]. Add the new images from
  the images/ folder to the correct service page heroes.
  Update any gradient heroes that now have a real photo.
  Commit and push with message: Add client photos"

---

## IF CLIENT HAS NO BRAND COLORS

Use KPW Tier 4 defaults — already built into TEMPLATE_GUIDE.md:
  Primary:   #1C3D5A  (dark navy)
  Secondary: #2A4A6B  (medium navy)
  Accent:    #C76B0F  (burnt orange)

---

## IF CLIENT BRIEF DATA IS MISSING OR INCOMPLETE

The brief may have blank fields. When a field is blank:
- Phone / email / address: stop and flag — cannot build without these
- Services: infer from business type and city if reasonable; log in PROGRESS.md
- Service area: infer from business address and region; log in PROGRESS.md
- About / voice / tone: use the Section 12 notes and write in that style
- FAQs: write based on service type and the voice notes
- Featured headline / paragraph: write based on best available photo and services

Log every judgment call in PROGRESS.md so Kaleb can review and override.

---

## IMAGE FORMAT MIGRATION — REFERENCE SWEEP

Whenever an image file is renamed, converted, or its extension changes
(e.g. .jpg → .webp), grep the ENTIRE repo for the old filename before
considering the change done — not just the HTML page it's visually on.

Check every attribute and file type, not just src=:
  .html, .css, .js, .json, .xml
  data-src, data-srcset, srcset, <source>, <picture>
  CSS background-image
  <link rel="preload"> and <link rel="icon">
  JSON-LD image fields, og:image, twitter:image
  sitemap.xml entries
  any JS array or config object

JavaScript is the one that gets missed — a static HTML page can be
fully updated while a JS-rendered section (e.g. a services array read
by a render function) still points at the old file. Confirmed root
cause of a real incident: a hero-image conversion updated every
HTML/CSS reference and shipped clean, but a client-side-rendered
homepage service grid kept reading stale filenames from main.js and
broke silently — invisible to curl, since curl never executes the JS
that renders it.

Before any commit: confirm zero dead references remain. Extract every
images/... path referenced in any live code file and confirm each one
exists on disk. Report any reference with no matching file.

---

## CLIENT-SIDE RENDER AUDIT

List every section of the site that is rendered by JavaScript rather
than present as static HTML (e.g. a homepage service grid built from a
JS data array via innerHTML) in PROGRESS.md, naming the container id,
the JS function that populates it, and the data source (e.g. main.js's
services[] array). Static-HTML verification (grep, curl) cannot see
JS-rendered content — anyone auditing this site later needs to know it
exists before they can check it correctly.

---

## VERIFICATION STANDARD

curl and any plain HTTP fetch (including this tool's own web-fetch
equivalent) do not execute JavaScript. They can confirm a URL returns
200 and confirm what's in the raw HTML/CSS/JS source — they cannot
confirm what a real visitor's browser actually renders or requests.

Never use curl-only checks to verify:
- that a page's images actually load
- that a JS-rendered section works
- that a fix for a JS-driven bug is actually fixed

Use headless Chrome (Playwright) with JavaScript enabled, load the live
URL, and capture actual network requests/console output. This
project's existing `.claude/skills/run-[client-slug]/driver.mjs`
Playwright setup can be extended with a small network-capture script
for this — see STEP 8B for the existing screenshot-based pattern.

---

*Kansas Prairie Webworks — BUILD_COMMAND_TEMPLATE.md v5.6*
*kansasprairiewebworks.com — Internal use only*
*Agency Brain powered — single source of truth*
