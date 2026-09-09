# MIKES_BLOG_COMMAND.md
# Drop this in Mike's Services LLC project folder.
# Open Claude Code in that folder. Copy everything inside the triple backticks. Paste. Walk away.

```
Read MIKES_BLOG_BUILD_V1.md and BLOG_AGENT.md from the current working directory before writing a single line of code.

--- CONTEXT ---

You are building the blog system for mikeservicesllc.com.
The site is vanilla HTML/CSS/JS, hosted on GitHub Pages, Cloudflare proxied.
Repo: bbotai/mikes-services-llc
Local folder: C:\Users\Kaleb\OneDrive\Documents\mike's_services_llc

The blog posts are already live on Blogger at mikeservicesllc.blogspot.com
and indexed in Google Search Console. This build closes the infinite loop:
  Blogger post → blog.html → service page → homepage → back to blog

--- BEFORE YOU WRITE ANYTHING ---

Read these files in this order:
1. MIKES_BLOG_BUILD_V1.md  — complete build instructions, all 9 steps
2. BLOG_AGENT.md           — permanent blog agent system for future posts
3. index.html              — extract exact nav HTML (desktop + mobile + footer)
4. services.html           — extract exact .service-card HTML structure
5. styles.css              — note existing card classes and grid classes
6. main.js                 — note existing JS patterns and end of file location

Do not write any code until you have read all six files.
List what you found in each file before proceeding.

--- EXECUTE ALL 9 STEPS FROM MIKES_BLOG_BUILD_V1.md ---

STEP 1 — Read and analyze existing code (done above — confirm findings)

STEP 2 — Create BLOGS_DATA.md
Write the complete file exactly as specified in MIKES_BLOG_BUILD_V1.md.
All 6 live blog posts and 2 placeholder blocks included.

STEP 3 — Create blog.html
Copy structure from services.html. Keep header, nav, footer, sticky bar,
scroll-to-top, and JS includes identical.
Build four sections in main:
  A. Hero — gradient, no image
  B. Blog list — #blog-list with .service-grid.blog-grid containing 8 cards
     (6 live + 2 placeholders) using exact card HTML from MIKES_BLOG_BUILD_V1.md
  C. FAQ — 6 items in Mike's plain-spoken voice, same .faq-list structure as other pages
  D. CTA banner — same pattern as other pages

ENCODING RULE: Use HTML entities throughout. Never raw Unicode.
  Em dash: &mdash;  Ampersand: &amp;  Arrow: &rarr;  Doc icon: &#128196;
  Hamburger ☰: &#9776;  Copyright ©: &copy;

STEP 4 — Append blog CSS to styles.css
Add the blog grid, blog card image, blog date, and placeholder rules
to the BOTTOM of styles.css. Do not change any existing rules.

STEP 5 — Append thumbnail loader JS to main.js
Add the blog thumbnail loader IIFE to the very END of main.js.
Do not modify any existing code.

STEP 6 — Create blog-placeholder.webp
Create a solid navy (#1C3D5A) 600x400px image in the images/ folder
named blog-placeholder.webp. Use Python with Pillow or any available tool.
This is the fallback image when a Blogger thumbnail fails to load.

STEP 7 — Add Blog to nav on ALL HTML files
Files: index.html, about.html, contact.html, services.html, service-area.html,
septic.html, excavation.html, land-clearing.html, demolition.html, building-pad.html
Add <li><a href="blog.html">Blog</a></li> to desktop nav, mobile nav, and footer
on every file. Do not change order or wording of any existing nav items.

STEP 8 — Add blog-callout links to service pages
Place "From the Blog" callout links before the CTA banner on each service page.
Do not rewrite any existing copy — only add the callout line.
Mapping:
  septic.html        → BLOG-1 (septic cost) AND BLOG-3 (septic permits)
  land-clearing.html → BLOG-2 (land clearing cost)
  excavation.html    → BLOG-4 (excavation and trenching)
  demolition.html    → BLOG-5 (demolition contractor) AND BLOG-6 (storm damage)
  building-pad.html  → BLOG-4 (excavation — closest match)
  service-area.html  → general link to blog.html

Also add .blog-callout CSS to styles.css as specified in MIKES_BLOG_BUILD_V1.md.

STEP 9 — Add blog.html to sitemap.xml
Add the blog.html <url> block with changefreq weekly and priority 0.7.

--- VERIFICATION CHECKLIST ---

Before committing, confirm every item:
[ ] blog.html exists with identical header/footer/nav as all other pages
[ ] 6 live blog cards + 2 placeholder cards in #blog-list
[ ] All 8 blog card images have src="images/blog-placeholder.webp" as default
[ ] All 8 blog card images have data-thumbnail with real Blogger URL (live cards only)
[ ] All 8 blog card images have width="600" height="400" and loading="lazy"
[ ] FAQ section has 6 items in Mike's voice using .faq-list/.faq-item structure
[ ] CTA banner matches pattern from other pages with correct phone number 785-488-7925
[ ] Thumbnail loader IIFE appended to END of main.js — nothing else changed in main.js
[ ] Blog CSS appended to END of styles.css — nothing else changed in styles.css
[ ] Blog nav link in desktop nav, mobile nav, and footer on ALL 10 HTML files
[ ] blog-callout links on septic, land-clearing, excavation, demolition, building-pad, service-area
[ ] blog-placeholder.webp exists in images/ folder
[ ] blog.html added to sitemap.xml
[ ] BLOGS_DATA.md created in project root
[ ] BLOG_AGENT.md already exists in project root (do not overwrite it)
[ ] Zero existing copy, headings, layout, or functionality changed on any page

--- COMMIT ---

Stage all changed and new files.
Commit with this exact message:
  feat: add blog.html — 6 post cards, nav sitewide, service page blog links, BLOG_AGENT system

Push to GitHub main branch.
Confirm push succeeded and list every file that was created or modified.
```
