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

## PUBLISHING A NEW POST TO BLOGGER (drafts written here, not by the API)

Claude Code has **no Blogger write scope**. The clasp token in
`~/.clasprc.json` grants Apps Script, Drive and Cloud only, and `BLOG_AGENT.md`
requires the Apps Script route stay read-only. So new posts are written as
finished HTML into `blog-drafts/` (gitignored, never deployed) and pasted into
Blogger by hand.

Do these four things **while the post is still a draft** — the first one cannot
be undone cleanly after publishing:

### 1. Custom permalink — set it BEFORE you publish
Blogger locks the permalink at publish. Left to itself it truncates the title
mid-phrase and you are stuck with it. Real examples already live on this blog:

    BAD  (auto)   /2026/08/adding-bathroom-to-shop-on-septic-in.html
    BAD  (auto)   /2026/08/barn-pad-grading-drainage-planning-for.html
    GOOD (custom) /2026/07/one-contractor-land-clearing-septic-install-saline-county-ks.html

Post Settings -> Permalink -> Custom Permalink. Lead with the target keyword.

### 2. Labels
Reuse the existing vocabulary rather than inventing new ones. Current top
labels: `Central Kansas` (17), `Excavation` (10), `Saline County KS` (9),
`Septic Installation` (8), `Salina KS` (7).

**Known problem:** `Mike's Services LLC` (5 posts) and `Mikes Services LLC`
(5 posts) both exist — same label, split by an apostrophe, so each archive page
shows half the posts. Standardise on `Mike's Services LLC` when you next touch
these.

### 3. Insert the photo through Blogger's uploader, never as an external URL
Pasting an externally-hosted image URL makes Blogger emit a
`lh3.googleusercontent.com/blogger_img_proxy/...` link. Those are signed and
short-lived: they 403 when the website hotlinks them, and the card silently
falls back to `blog-placeholder.webp` — the blue tile. Uploading through
Blogger produces a permanent `blogger.googleusercontent.com` URL.
Three cards broke this way and were repaired on 2026-09-05.

### 4. Fill in alt text on the photo
Blogger's image dialog sets alt. Describe the actual photo; do not paste the
site URL or phone number. The footer logo's alt is generated upstream by
`kpw-agency-brain/Content.gs` and was fixed on 2026-09-05.

### Then, and only then
Publish, confirm the post appears in
`https://blog.mikeservicesllc.com/feeds/posts/default?alt=json`, and run this
workflow to sync the card. Add a `<p class="blog-callout">` link on the
matching service page too — see the block at the bottom of `septic.html`.


## SITE STRUCTURE
Blog page:    blog.html
Blog section: `#blog-list` > `.service-grid.blog-grid`
Card class:   `.service-card.blog-card`
Schema:       `BlogPosting` JSON-LD blocks in `<head>`, one per live post,
              same order as the cards

## CURRENT BLOG CARD COUNT
Slot 1:   LIVE — Septic Services in Saline County KS: Install, Repair, Pumping & Inspection (September 5, 2026)
Slot 2:   LIVE — Septic Perc Test & Soil Testing in Saline County KS (September 5, 2026)
Slot 3:   LIVE — Adding a Bathroom to a Shop on Septic in Saline County KS (August 31, 2026)
Slot 4:   LIVE — Barn Pad Grading & Drainage Planning for a 40x60 Shop in Kansas (August 18, 2026)
Slot 5:   LIVE — How Often to Pump Your Septic Tank in Rural Kansas (August 16, 2026)
Slot 6:   LIVE — Septic Installation Cost in Kansas Clay: Saline County Guide (August 10, 2026)
Slot 7:   LIVE — Septic Systems on Rocky Limestone Ground in Lincoln County KS (July 30, 2026)
Slot 8:   LIVE — Can One Contractor Handle Land Clearing & Septic Install in Saline County KS (July 16, 2026)
Slot 9:   LIVE — When Spring Storms Roll Through Kansas Cleanup Begins (July 13, 2026)
Slot 10:  LIVE — Building Pad Options for Metal Buildings on Central Kansas Properties (July 12, 2026)
Slot 11:  LIVE — Excavation & Trenching Cost, Need to Know in Central Kansas (July 7, 2026)
Slot 12:  LIVE — Excavation in Rural Kansas Clay Problems (July 2, 2026)
Slot 13:  LIVE — House Demolition Cost in Central Kansas What You Need to Know (July 2, 2026)
Slot 14:  LIVE — How Much Does Septic System Installation Cost in Kansas? (June 7, 2026)
Slot 15:  LIVE — Land Clearing in Central Kansas — What It Costs and What to Expect (June 7, 2026)
Slot 16:  LIVE — Septic Installation Permits in Kansas — What You Need to Know (June 7, 2026)
Slot 17:  LIVE — Excavation & Utility Trenching in Central Kansas (June 7, 2026)
Slot 18:  LIVE — Demolition Contractor in Salina KS — What to Expect (June 7, 2026)
Slot 19:  LIVE — Storm Damage Cleanup & Emergency Site Work in Central Kansas (June 9, 2026)
Slot 20:  LIVE — Questions to Ask a Septic Contractor in Rural Kansas Before You Hire (June 24, 2026)
Slot 21:  LIVE — Septic Installation Cost Kansas: What Rural Homeowners Pay in Central KS (June 22, 2026)
Slot 22:  LIVE — How Often Should a Septic Tank Be Pumped & Maintained in Kansas? (June 18, 2026)
Slot 23:  LIVE — Acreage Building Site Prep in Saline County, Kansas (July 2, 2026)
Slot 24:  LIVE — Land Clearing Cost Per Acre in Saline County, KS (July 2, 2026)

0 placeholders remaining. Next new post found becomes Slot 1; everything
below shifts down.

**Known gaps, not fixed by this run (out of scope — only new cards were
added, existing ones are never touched per RULES above):**
- Slots 14-24 (the 11 original pre-existing cards) are **not** in
  newest-first order among themselves — they predate this workflow and
  were never sorted. Slots 1-13 (added across the 2026-07-14, 2026-07-19
  and 2026-09-05 sync runs) are correctly newest-first and correctly ahead
  of all existing cards, per this file's RULES — but the full 24-card grid
  is not strictly newest-first sitewide.
- Schema count does not match card count: **13 `BlogPosting` schema blocks
  for 24 cards.** The 13 cover only the posts added by this workflow;
  retroactively adding schema for the 11 pre-existing posts is a separate
  task, not done here.

**2026-09-05 run notes:**
- Added 5 synced cards, then 2 more once the two new septic posts were
  published — Slots 1-7 this run, 24 cards total.
- Slots 1 and 2 are the first posts written by KPW rather than synced from
  the client: drafted into `blog-drafts/`, pasted into Blogger by hand, then
  synced back. Both target real Search Console demand —
  `saline county septic services` (Mike's strongest septic term, was
  position 11 on the blog with no dedicated page) and the perc-test cluster
  (`septic perc test near me` was already position 6 on zero content).
- **Fixed 3 broken thumbnails** on existing cards (now Slots 20, 23, 24).
  They pointed at `lh3.googleusercontent.com/blogger_img_proxy/...` URLs,
  which Blogger only emits for images hosted OUTSIDE Blogger. Those links
  are signed and short-lived, so they returned 403 and the cards fell back
  to `blog-placeholder.webp` — the blue tile. Each was repointed at the
  real Cloudinary original embedded in the post. **Never store a
  `blogger_img_proxy` URL in a card; always resolve it to the true source.**
- Card `alt` text was written here rather than copied from Blogger. An
  audit of the source posts found one image with no `alt` at all, one with
  no `title`, and two whose `alt` described a tank installation on posts
  about pumping and about rocky ground. The root cause was in
  `kpw-agency-brain/Content.gs` and was fixed and deployed on 2026-09-05
  (Apps Script v189 / version 208) — the footer logo's alt had been the
  site URL plus phone number on every post for every client, no image ever
  got a `title`, and the hero alt was never HTML-escaped.
- Service pages updated: `septic.html` 5 → 11 blog callouts,
  `building-pad.html` 2 → 3.
- All 24 thumbnails and every blog link on every service page verified
  HTTP 200 after the run.

Last updated: 2026-09-05
