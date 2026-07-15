# BLOG_AGENT.md — Generic Blog-Card Sync Agent
# Permanent file — never delete from project folder.
# Works identically for any client site. The ONLY client-specific line in
# this entire document is "THIS SITE'S BLOG" below — copy this file into
# another client's repo, change that one line, and the same command works
# there too, against that client's own Blogger blog. No client name, blog
# ID, or URL is hardcoded anywhere in the workflow logic that follows.

## THIS SITE'S BLOG
https://blog.mikeservicesllc.com

## HOW TO USE
Open Claude Code in this site's repo and say something like:
  "Add my new blogs" / "Check for new blog posts" / "Sync blog cards"

## WHAT CLAUDE CODE DOES AUTOMATICALLY

### 1. Get every LIVE post from THIS SITE'S BLOG
Resolve the blog by URL, not a hardcoded numeric blog ID — a blog's
numeric ID can change if it's ever recreated; its URL is stable and is
the only value this file hardcodes:

    GET https://www.googleapis.com/blogger/v3/blogs/byurl?url=<THIS SITE'S BLOG>
    → { "id": "..." }

Then list every post with status=LIVE, paginating with pageToken until
exhausted (there is no reliable single-request "give me everything"
call):

    GET https://www.googleapis.com/blogger/v3/blogs/{id}/posts?status=LIVE&maxResults=50&fetchBodies=true

**Auth — use OAuth, not just the public API key.** The KPW Agency Brain
Apps Script project (`kpw-agency-brain/apps-script`) is already an
authorized Blogger admin on every client blog under the KPW Google
account (kansasprairiewebworks@gmail.com) — proven working this week
against both Mike's Services LLC's blog and this site's blog. Reuse that
identity instead of storing a separate credential in every site repo:

  1. Add a temporary, clearly-labeled, **read-only** `doGet` action to
     that project's `Code.gs` (no writes, no Blogger publish calls —
     GETs to `byurl` and `posts?status=LIVE` only).
  2. `clasp push` it to that project's HEAD only — never touch or
     redeploy the pinned production deployment for this. HEAD is
     disposable scratch space for exactly this kind of temp read.
  3. Call it through the project's existing `@HEAD` test deployment
     (`https://script.google.com/macros/s/<HEAD-deployment-id>/exec`),
     authenticated with an OAuth token read from clasp's own local
     credential store (`~/.clasprc.json` on this machine) — pull it into
     a shell variable and use it immediately; never print or log the raw
     token value anywhere.
  4. Revert the temporary action (`git checkout -- Code.gs
     apps-script/Code.gs`, then `clasp push` again) so HEAD returns to
     matching production exactly. Confirm the temp action is gone with
     one more call before moving on.

  This exact method is proven working, repeatedly, in
  `kpw-agency-brain/KPW_HANDOFF_FINAL.md` (2026-07-14 entries) — read
  those for worked examples before improvising a different approach.

### 2. Compare against what's already on this site
Read this repo's `blog.html`, extract every existing card's post URL
from its `<a href="...">Read More</a>` link:

    grep -oE 'href="https://blog\.[a-z0-9.-]+/[0-9]{4}/[0-9]{2}/[a-z0-9-]+\.html"' blog.html

**Match by permalink URL, never by title.** Titles get edited on Blogger
after publish (confirmed this session: one existing card's title no
longer matches the live post's current title) — the URL is the only
stable identity.

### 3. New posts = LIVE posts whose URL isn't already a card
For every post returned in step 1 whose URL isn't in the set from step
2, pull real metadata straight from that API response. **Never guess or
invent** any of these:

  - `title`     — `post.title`, exactly as returned
  - `date`      — `post.published`, reformatted "Month D, YYYY" for the card
  - `thumbnail` — the first `<img src="...">` found in `post.content`
  - `excerpt`   — `post.content` with HTML tags stripped, trimmed to a
                  clean 1-3 sentence excerpt that ends at a real sentence
                  boundary, never mid-word or mid-sentence
  - `url`       — `post.url`

If zero new posts are found, **say so plainly and make no edits.** Do
not force a change onto the page just because the workflow ran.

### 4. Prepend new cards, strict newest-first across the WHOLE grid
This site's real, established convention (confirmed via git history —
commit `dec278c`, and re-confirmed 2026-07-14) is newest-first ordering
across every card on the page, not just within a new batch. New cards go
at the very top of `.service-grid.blog-grid` — before ALL existing
cards, including ones from previous runs of this same workflow — ordered
newest-to-oldest among themselves. **Existing cards are never reordered,
edited, or removed relative to each other** — only new cards get
inserted above them.

Card markup — copy this pattern exactly for each new post, using real
values from step 3:

    <!-- BLOG-N -->
    <article class="service-card blog-card">
      <img
        src="images/blog-placeholder.webp"
        data-thumbnail="[real thumbnail URL]"
        alt="[real post topic] — [this site's business name]"
        width="600" height="400" loading="lazy">
      <div class="card-body">
        <p class="blog-date">[real date, Month D, YYYY]</p>
        <h3>[real title, HTML-entity-escaped]</h3>
        <p>[real excerpt, HTML-entity-escaped]</p>
        <a href="[real post URL]"
          class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
      </div>
    </article>

After inserting, renumber every `<!-- BLOG-N -->` comment sequentially
top to bottom — they're maintainer anchors only (not read by CSS/JS) but
keep them accurate.

### 5. Add matching JSON-LD schema for each new post
For every new post, add a `BlogPosting` schema block to `<head>`, same
structure as this page's existing blocks. Insert new blocks before the
existing ones so schema order stays consistent with card order (schema
block order carries no direct SEO weight, but keeping it aligned avoids
confusing a future maintainer):

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "[real title]",
      "description": "[real 1-2 sentence excerpt, roughly 140-185 characters]",
      "url": "[real post URL]",
      "datePublished": "[YYYY-MM-DD]",
      "author": {"@type": "Person", "name": "[site owner name]", "url": "[site root URL]"},
      "publisher": {"@type": "Organization", "name": "[business name]", "url": "[site root URL]"},
      "mainEntityOfPage": {"@type": "WebPage", "@id": "[real post URL]"}
    }
    </script>

Owner name, business name, and site root URL are never invented — copy
them from this page's own existing schema blocks or `<meta>` tags.

### 6. Update the tracker below
Rewrite CURRENT BLOG CARD COUNT with the real final state: every slot,
in its new order, with its real title. Update "Last updated" to today's
date.

### 7. Commit and push — one commit for the whole batch
    git add blog.html BLOG_AGENT.md
    git commit -m "Add N new blog post(s): [comma-separated real titles]"
    git push

One commit per sync run, covering every new post found in that run —
not one commit per post — unless explicitly told otherwise.

## RULES
- Never change existing cards' copy, images, links, or their order
  relative to each other — only insert new cards above them.
- Never guess or invent metadata — title/date/thumbnail/excerpt always
  come from the live Blogger API response for that exact post.
- Match new-vs-existing by permalink URL, never by title text.
- Use HTML entities matching this page's existing style in all inserted
  copy: `&mdash;` `&amp;` `&rarr;` `&rsquo;` `&ldquo;` `&rdquo;`.
- Every card image needs: `src` placeholder + `data-thumbnail` + explicit
  `width`/`height` + `loading="lazy"` — never a bare `<img src>`.
- `target="_blank" rel="noopener"` on every blog post link.
- If zero new posts are found, report that clearly and make no edits —
  do not touch the page just because the workflow was invoked.
- **No hardcoded client name, blog ID, or numeric Blogger ID anywhere in
  this file's workflow logic.** The only site-specific value in this
  entire document is the "THIS SITE'S BLOG" URL at the top.

## SITE STRUCTURE
Blog page:    blog.html
Blog section: `#blog-list` > `.service-grid.blog-grid`
Card class:   `.service-card.blog-card`
Schema:       `BlogPosting` JSON-LD blocks in `<head>`, one per live post,
              same order as the cards

## CURRENT BLOG CARD COUNT
Slot 1:  LIVE — Building Pad Options for Metal Buildings on Central Kansas Properties (July 12, 2026)
Slot 2:  LIVE — Excavation & Trenching Cost, Need to Know in Central Kansas (July 7, 2026)
Slot 3:  LIVE — Excavation in Rural Kansas Clay Problems (July 2, 2026)
Slot 4:  LIVE — House Demolition Cost in Central Kansas What You Need to Know (July 2, 2026)
Slot 5:  LIVE — How Much Does Septic System Installation Cost in Kansas? (June 7, 2026)
Slot 6:  LIVE — Land Clearing in Central Kansas — What It Costs and What to Expect (June 7, 2026)
Slot 7:  LIVE — Septic Installation Permits in Kansas — What You Need to Know (June 7, 2026)
Slot 8:  LIVE — Excavation & Utility Trenching in Central Kansas (June 7, 2026)
Slot 9:  LIVE — Demolition Contractor in Salina KS — What to Expect (June 7, 2026)
Slot 10: LIVE — Storm Damage Cleanup & Emergency Site Work in Central Kansas (June 9, 2026)
Slot 11: LIVE — Questions to Ask a Septic Contractor in Rural Kansas Before You Hire (June 24, 2026)
Slot 12: LIVE — Septic Installation Cost Kansas: What Rural Homeowners Pay in Central KS (June 22, 2026)
Slot 13: LIVE — How Often Should a Septic Tank Be Pumped & Maintained in Kansas? (June 18, 2026)
Slot 14: LIVE — Acreage Building Site Prep in Saline County, Kansas (July 2, 2026)
Slot 15: LIVE — Land Clearing Cost Per Acre in Saline County, KS (July 2, 2026)

0 placeholders remaining. Next new post found becomes Slot 1; everything
below shifts down.

**Known gaps, not fixed by this run (out of scope — only new cards were
added, existing ones are never touched per RULES above):**
- Slots 5-15 (the 11 pre-existing cards) are **not** in newest-first
  order among themselves — they predate this workflow and were never
  sorted (confirmed: this site never had an equivalent of
  kansasprairiewebworks.git's `dec278c` reorder pass). Slots 1-4 (added
  2026-07-14) are correctly newest-first and correctly ahead of all
  existing cards, per this file's RULES — but the full 15-card grid
  is not strictly newest-first sitewide the way KPW's site is.
- Schema count does not match card count: **4 `BlogPosting` schema
  blocks for 15 cards.** This site had zero pre-existing per-post schema
  before 2026-07-14 (unlike KPW's site, which had 5) — the 4 added this
  run cover only the 4 new posts. Retroactively adding schema for the 11
  pre-existing posts is a separate, larger task, not done here.
- One live Blogger post was found and skipped, not added as a card:
  `https://blog.mikeservicesllc.com/2026/07/emergency-septic-repair-salina-area-spring-storms-cleanup.html`
  (published 2026-07-13) **has no title set on Blogger** — the API
  returns an empty string. Real content and thumbnail exist, but a card
  needs a title, and this file's RULES forbid inventing one. Needs a
  human to set a title directly on Blogger, then re-run this workflow.

Last updated: 2026-07-14
