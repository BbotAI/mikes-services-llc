# BUILD COMMAND TEMPLATE — Kansas Prairie Webworks
## Tier 4 Local Business Website
## Version 5.3 — Auto-reads CLIENT_BRIEF_TEMPLATE.md
## Internal use only — kansasprairiewebworks.com

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

4e — Build sitemap.xml listing all pages with client domain
     If domain is blank/placeholder — use your-domain.com as placeholder

4f — Build robots.txt allowing all crawlers, referencing sitemap

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

     4j-5: GOOGLE REVIEW LINK IN FOOTER
           Add to .footer-right on ALL pages — after Facebook link, before Blog link:
             <a href="[googleReviewUrl]" target="_blank" rel="noopener">Leave a Google Review ★</a>
           Pull googleReviewUrl from Agency Brain if the field is populated.
           If not yet available — use this placeholder comment:
             <!-- GOOGLE BUSINESS PROFILE LINK: add anchor tag here with Google review link when ready -->
           When GBP Place ID is confirmed later, replace across all files with:
             <a href="https://g.page/r/[PLACE_ID]/review" target="_blank" rel="noopener">Leave a Google Review &#9733;</a>

     4j-6: TESTIMONIALS SECTION ON HOMEPAGE
           Add to index.html between the featured section and the service areas section.
           Pull from Agency Brain bestReview field. If multiple reviews — build a
           3-column .service-grid with one .service-card per review:
             — Orange &#9733;&#9733;&#9733;&#9733;&#9733; stars above each quote
             — Italic quote text
             — Reviewer name and source (e.g. "— Name, via Facebook")
           Include a "Leave Us a Google Review" btn btn-outline CTA below the grid.
           Use googleReviewUrl from Agency Brain or PLACEHOLDER_PLACE_ID if not yet available.

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
- [ ] Submit sitemap to Google Search Console
- [ ] Send client preview link and get approval before announcing live
- [ ] Set up Google Analytics GA4 property for client — add tracking ID to all pages
- [ ] Create Google Business Profile if client does not have one — service area business
      type verifies faster than storefront; do not select storefront if no public walk-in address
- [ ] Get GBP Place ID → find in GBP dashboard URL or via Places API
      → replace PLACEHOLDER_PLACE_ID in review links across all HTML files
- [ ] Verify canonical tags on every page — correct domain, correct filename, no duplicates

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

## CLIENT FOLDER STRUCTURE
(What the folder should look like before running the build command)

  [client-business-name]/
  ├── CLIENT_BRIEF_TEMPLATE.md   ← filled out completely (this is the primary brief)
  ├── TEMPLATE_GUIDE.md          ← copied from master template
  ├── BUILD_COMMAND_TEMPLATE.md  ← this file
  ├── BLOG_AGENT.md              ← created by Claude during build (Step 4i-7)
  └── images/
      ├── logo.png or logo.jpg   ← client logo (any format)
      ├── hero-home.jpg          ← homepage hero photo
      ├── featured-1.jpg         ← featured section photo
      ├── hero-service-1.jpg     ← service 1 card + hero (numbered in order of services in brief)
      ├── hero-service-2.jpg     ← service 2 card + hero photo
      ├── hero-service-3.jpg     ← service 3 card + hero photo
      ├── hero-service-4.jpg     ← service 4 card + hero photo (if 4 services)
      ├── hero-service-5.jpg     ← service 5 card + hero photo (if 5 services)
      ├── og-image.jpg           ← social share image
      └── blog-placeholder.webp  ← GENERATED by Claude during build (Step 4i-1) — do NOT ask client to provide

IMAGE NAMING RULES:
- Required images: logo.png/jpg, hero-home.jpg, featured-1.jpg, og-image.jpg
- Service images: hero-service-1.jpg through hero-service-N.jpg (one per service, numbered in brief order)
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

*Kansas Prairie Webworks — BUILD_COMMAND_TEMPLATE.md v5.3*
*kansasprairiewebworks.com — Internal use only*
*Agency Brain powered — single source of truth*
