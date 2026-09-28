# Mike's Services LLC — Project Status

**Last updated:** 2026-09-27
**Live:** https://mikeservicesllc.com · Blog https://blog.mikeservicesllc.com
**Repo:** `BbotAI/mikes-services-llc`, branch `main`, deployed by GitHub Pages

Start here in a new session. This file reflects the site as it actually is.
`MIKES_PROGRESS.md`, `MIKES_FIXES_V3.md`, `MIKES_FIXES_V4.md`, `BLOGS_DATA.md`
and the `*_TEMPLATE.md` files all predate June 2026 and describe an earlier
build. **This file supersedes them.**

---

## 1. The client

Septic, excavation, land clearing, demolition and building-pad contractor in
Salina, Kansas. Owner-operated, works the equipment himself.

| | |
|---|---|
| Address | 481 E Euclid Ave, Salina, KS 67401 |
| Phone | 785-488-7925 |
| Email | mradams@twinvalley.net |
| Facebook | https://www.facebook.com/share/1j1hJFp5p7/ |
| Service area | Saline, Ottawa, Lincoln, Dickinson, Ellsworth, Cloud counties |
| Hours | Mon–Fri 8–5, Sat by appointment, 24/7 emergencies |

**Commercial:** $800 setup (paid) + **$250/month** subscription, two months paid
as of 2026-09. **Stripe auto-invoices on the 15th of each month.** A monthly SEO
progress report is emailed the same day — see §6.

**Client temperature (2026-09):** good. Reports a lot of calls leading to
projects. Specifically called to say the monthly report was the first time a web
service had shown him what he was paying for. He also said that if it were his
choice he would "do septic all day, better money" — which is why the content
programme is now septic-led. Keep sending the report; it is the single thing he
has volunteered praise for.

---

## 2. Architecture

Plain static HTML. No framework, no build step, no backend.

- `index.html`, `about.html`, `contact.html`, `service-area.html`, `services.html`
- Service pages: `septic.html`, `excavation.html`, `land-clearing.html`,
  `demolition.html`, `building-pad.html`
- `blog.html` — cards linking out to the Blogger posts
- `styles.css`, `main.js`, `images/`
- Contact form posts to **Formspree** (`https://formspree.io/f/xrevelll`)

**Deploy = `git push origin main`.** GitHub Pages serves it, usually live within
a couple of minutes. `CNAME` holds `mikeservicesllc.com` — do not delete it.

### DNS

Nameservers are **Cloudflare** (`aurora` / `carmelo`), same account as the other
KPW client zones.

```
mikeservicesllc.com       -> Cloudflare proxied (104.21.x / 172.67.x) -> GitHub Pages
www.mikeservicesllc.com   -> same
blog.mikeservicesllc.com  -> CNAME ghs.google.com   (Blogger)
```

Apex and www are **orange-clouded (proxied)**, and that is correct here — GitHub
Pages is happy behind Cloudflare. Do not copy the DogeBeats rule about grey-
clouding; that applies to Railway-hosted origins, not this site.

### The blog is a separate site, and that matters

`blog.mikeservicesllc.com` is **Blogger**, on a subdomain. Google treats a
subdomain as a distinct site, so blog authority does **not** flow to
`mikeservicesllc.com` the way a `/blog/` subfolder would. Blogger cannot serve a
custom domain from a subfolder, so this is structural and not worth fighting.

The mitigation is internal linking in both directions, and it appears to work —
see §5.

---

## 3. Blog workflow

`BLOG_AGENT.md` is the operating manual. Read it before touching blog content.
Summary:

- Mike (or the KPW agency brain) publishes to Blogger.
- The sync reads the public feed, finds posts whose permalink is not yet a card
  in `blog.html`, and prepends cards newest-first with matching `BlogPosting`
  schema.
- Match on **permalink, never title** — titles get edited after publishing.
- Each post also gets a `<p class="blog-callout">` link from its service page.

**24 posts live as of 2026-09-05, 24 cards, 13 schema blocks.**

New posts written by KPW go in `blog-drafts/` as finished HTML and are pasted
into Blogger by hand. That folder is **gitignored** so drafts never deploy.

Claude Code's own credentials have **no Blogger write scope**. The Apps Script
project in `kpw-agency-brain` does — see §4.

---

## 4. Related systems

**`kpw-agency-brain`** (separate repo) — the Apps Script project that generates
and publishes content for every KPW client. Relevant pieces:

- `Content.gs` builds post HTML. Its image alt/title generation was **broken for
  every client** until 2026-09-05; fixed and deployed as v189 / version 208.
- `BlogLinkMaintenance.gs` — manual maintenance function that injects a service
  page link into existing posts. Not on a trigger. `blogLinkAudit()` dry-runs,
  `blogLinkApply()` writes. Idempotent, safe to re-run.
- **Apps Script version ceiling: 200, hard.** 33 slots left. Read the deployment
  rule in `kpw-agency-brain/CLAUDE.md` before any deploy. `clasp push` costs
  nothing; only `clasp version` consumes a slot.

**`kpw_credentials`** (separate folder) — `gsc-service-account.json` grants
read access to all six Search Console properties. `kpw_monthly_report.js`
generates the monthly client report.

---

## 5. SEO — where it actually stands

**The site is young. First search impression ever: 2026-06-19.**

| Month | Clicks | Impressions |
|---|---|---|
| June (from the 19th) | 6 | 198 |
| July | 15 | 621 |
| August | **20** | **690** |

Growing every month, more than tripled since launch, **with no Google Business
Profile live**. That is a normal ramp, not a problem. Do not read the small
absolute numbers as failure.

### Page performance, 28 days to 2026-09-02

| Page | Impr | Clicks | CTR | Avg position |
|---|---|---|---|---|
| `/` | 121 | 6 | 5.0% | 10.5 |
| `/land-clearing.html` | 111 | 3 | 2.7% | 36.3 |
| `/demolition.html` | 103 | 2 | 1.9% | 43.2 |
| `/building-pad.html` | 88 | 0 | 0% | 63.2 |
| `/contact.html` | 75 | 0 | 0% | 27.1 |
| `/septic.html` | 69 | 3 | 4.3% | 16.7 |
| `/services.html` | 67 | 0 | 0% | 57.3 |
| `/excavation.html` | 58 | 1 | 1.7% | 39.8 |
| `/about.html` | 29 | 3 | 10.3% | 9.0 |

**The problem is position, not click-through.** Service pages sit at 36–63,
i.e. page 4 to 7. Rewriting titles will not help a page nobody scrolls to.

### Internal links track ranking

| Service page | Inbound blog links (before → after 2026-09-05) | Avg position |
|---|---|---|
| `septic.html` | 10 → 15 | **16.7** |
| `demolition.html` | 3 → 4 | 43.2 |
| `building-pad.html` | 3 → 6 | 63.2 |
| `land-clearing.html` | 2 → 3 | 36.3 |
| `excavation.html` | 1 → 3 | 39.8 |

Septic had 3× the internal links of anything else and ranked 2–4× better. On
2026-09-05 all 24 posts were given a link to their service page. **Watch
`excavation.html` and `building-pad.html` — they got the biggest proportional
boost. Give it 3–4 weeks before judging; a single week is noise.**

### Septic is the wedge

`/septic.html` is the best-positioned service page, has the best service-page
CTR, and went 0 → 3 clicks in August. Newly converting queries include
`mike's septic tank service` and `septic companies near me`. He ranks **position
1** organically for `septic pumping near me`, `septic companies near me` and
`who cleans out septic tanks near me`.

### Ignore these impressions

`water removal salina ks` (pos 47), `concrete lifting salina ks` (64),
`crawl space encapsulation salina ks` (73), `land clearing basehor` (49). The
site mentions none of those services and no city outside the six counties —
**verified**. Google is speculating, the results sit on page 5–8, nobody sees
them. They inflate impressions and depress headline CTR. Not a content problem;
do not "fix" pages that do not exist.

---

## 6. Open items

- **Google Business Profile — PENDING, and it is the biggest single lever.**
  `client-data.json` has `google_business_url: ""`. He ranks position 1
  organically for several "near me" septic searches, all of which show a map
  pack above the organic results. He is winning the race in the wrong lane.
  A previous session also found a dead Google review button whose Place ID was
  never valid, so the profile linkage has a history of being shaky. **Kaleb is
  working on this as of 2026-09-05.**
- **Reviews.** Review count and velocity are top-three for local pack ranking,
  and this is Mike's job, not KPW's. He is doing plenty of happy jobs — every
  customer should be asked for a Google review by text the day the job finishes.
  Blocked behind GBP.
- **`building-pad.html` and `services.html` are dead pages.** 88 and 67
  impressions, **zero** clicks between them, positions 63 and 57.
- **Homepage is one push from real traffic.** 121 impressions at position 10.5 —
  literally the page-1 boundary, and his highest-volume page.
- **Breadth is hurting him.** Six services on a domain this young is why every
  service page is thin. Concentrate on septic for the next 90 days.
- **Monthly report, 15th of the month.** Confirmed working — last one drafted to
  Gmail, reviewed, sent, landed in inbox not spam. **Do not change that
  pipeline.** GSC access re-verified 2026-09-05. The only unverified step is the
  Gmail draft scope, which has a known re-auth failure path at
  `kpw_monthly_report.js:790`.

---

## 6a. Open items as of 2026-09-06

### Mobile PageSpeed: there is no regression. Do not "fix" it.

**This section previously claimed a regression from 88 to 74. That was wrong,
and it was wrong because it was written off two readings.** Corrected the same
day after measuring properly.

Every mobile reading taken on 2026-09-06, in order:

    74, 74, 76, 93, 93, 80, 80, 93, 93

The score does not sit at 74. It ranges **74–93 across runs of the same
unchanged page**, and the whole swing is LCP landing at either 2.6 s or 4.4 s.
Lighthouse mobile simulates a throttled connection and a low-end CPU on a
shared test fleet; that simulation is noisy, and this page sits right on a
threshold where the noise crosses a scoring band.

**What real users actually get, measured directly:**

| | |
|---|---|
| TTFB, 6 requests | 0.10–0.20 s |
| Hero image (34 KB) | 0.16–0.34 s |
| Desktop score | 92–93 |
| CLS | 0–0.001 |

The site is fast. There is nothing wrong with it.

**The head is already fully optimised** — checked line by line before assuming
otherwise: `preconnect` to both font origins with `crossorigin`, hero
`preload` with `fetchpriority="high"`, the font stylesheet loaded as a preload
then promoted so it never blocks first paint, `display=swap`, `noscript`
fallback, and gtag `async` below the critical head. Whoever did `282ea63` did
it properly. **The obvious "fix" of adding preconnect hints was recommended and
then found to be already present.** Read the whole head before proposing
anything here.

**The real consequence is in the client report, not the site.**
`kpw_monthly_report.js` takes a *single* PageSpeed sample. On the 15th it will
report whatever number it happens to draw from a 74–93 range, and a run that
lands on 74 after August's 88 will tell Mike his speed got worse when nothing
changed. Worth taking a median of three runs, or reporting a band rather than a
point.

**If anyone measures this again:** take at least four readings and use the
median. One or two readings cannot distinguish a regression from lab variance,
which is exactly the mistake recorded above.

### Search Console: "Alternate page with proper canonical tag" — FIXED, report will linger

Reported for `/index.html`; a validation attempt failed 2026-09-04.

**It was never an error.** That status means Google found a duplicate URL and
honoured the canonical — the tag working. `/index.html` canonicals to
`https://mikeservicesllc.com/` and the sitemap lists only the root. Requesting
validation will always fail, because the condition is permanent while the URL
stays discoverable. **Do not request validation again.**

**Cause removed 2026-09-06** (`2b3259c`): the header logo linked to
`index.html` on all 11 pages, so every crawl rediscovered the duplicate. All
now link to `/`.

**Verified live 2026-09-07** — `href="index.html"` returns 0 across `/`,
`/septic.html`, `/blog.html`, `/about.html` and `/contact.html`, the logo
anchor is `href="/"`, and `/index.html` still canonicals to `/` as it should.

**The GSC report will persist for weeks anyway.** Google keeps the URL in its
index until it stops recrawling it, which is unrelated to the fix. Seeing the
same email again is expected and needs no action.

---

## 7. Landmines

- **Never paste an external image URL into a Blogger post.** Blogger then emits
  a `lh3.googleusercontent.com/blogger_img_proxy/...` link. Those are signed and
  short-lived: they 403 when the website hotlinks them and the card silently
  falls back to `blog-placeholder.webp`, the blue tile. Three cards broke this
  way and were repaired 2026-09-05. **Always upload the photo through Blogger's
  own uploader.**
- **Set the custom permalink BEFORE publishing.** Blogger locks it at publish.
  Auto-generated slugs truncate mid-phrase — `adding-bathroom-to-shop-on-septic-in`
  is a real example on this blog.
- **Label vocabulary is fragmented.** `Mike's Services LLC` (5 posts) and
  `Mikes Services LLC` (5 posts) are the same label split by an apostrophe, so
  each archive page shows half his posts. Consolidate on the apostrophe version.
- **Do not grey-cloud the Cloudflare records here.** Proxied is correct for
  GitHub Pages. The DogeBeats grey-cloud rule is about Railway origins.
- **Do not let blog callouts pile up on a service page.** `septic.html` had
  accumulated 11, including three near-identical "installation cost" posts and
  two "how often to pump" posts. Pruned to 5 non-overlapping ones on 2026-09-05.
  Cap it around five.
- **`blog-drafts/` is gitignored on purpose.** Drafts must never deploy.

---

## 8. What happened on 2026-09-05

Commits: `be11a1d`, `07a62be`, `82a9a22` here, plus `4f71083`, `70c47f1`,
`51813b7`, `ae9cf75` in `kpw-agency-brain`.

- **Synced 5 posts** that were live on Blogger but missing from the site.
- **Fixed 3 blank blue thumbnails** — all three were `blogger_img_proxy` URLs
  returning 403. Repointed at the real Cloudinary originals.
- **Wrote 2 new septic posts** — the first written by KPW rather than the
  client. Targeted from real Search Console demand:
  `saline county septic services` (his strongest septic term, was position 11
  with no dedicated page) and the perc-test cluster (`septic perc test near me`
  already position 6 on zero content). A third pumping post was deliberately
  avoided — two already exist and would cannibalise each other.
- **Added service-page callouts**, then pruned `septic.html` from 11 to 5.
- **Linked all 24 blog posts to their service page** via
  `BlogLinkMaintenance.gs`. 12 changed, 0 failures, verified against the live
  feed.
- **Fixed the alt/title bug in `kpw-agency-brain/Content.gs`** — the footer logo
  carried `alt="<site url> <phone>"` on every post for every client, no image
  ever got a `title`, and hero alt was never HTML-escaped. Deployed as v189 /
  version 208.

**Verified after the run:** 24 cards, all 24 thumbnails HTTP 200, all 24 post
URLs HTTP 200, every blog link on every service page HTTP 200, 0 posts missing a
service link, 0 duplicate insertions.

---

## 2026-09-16 — his blog has the Blogger empty-canonical bug (not in the emails yet)

No Search Console email for Mike's properties this round, but
blog.mikeservicesllc.com has the same theme defect found on the KPW and Pro
Cleaning blogs: every post emits a second `<link href='' rel='canonical'/>`.
The cost is already visible. Google is serving the `?m=1` copies instead of
the posts: **338 impressions / 6 clicks on the `?m=1` land-clearing cost post,
180 on the `?m=1` septic installation cost post.**

- Fix: remove the hand-added `<b:if>` canonical block in Blogger -> Theme ->
  Edit HTML. Steps and verify command: `BLOGGER_CANONICAL_FIX.md` (rewritten).
- His blog sitemap was last read by Google **2026-07-02** (9 URLs; the blog now
  has 25+). Resubmit after the theme fix.
- Full record: kpw-agency-brain `SYSTEM_STATUS.md`, 2026-09-16.

---

## 2026-09-27 — Phase 0 of the septic push: internal linking, not new pages

Fresh Search Console pull the same day (28 days, `kpw_seo_check.js`):
**748 impressions / 21 clicks (+40%) / avg position 24.1**, mobile 89,
desktop 100. Growth is holding.

### What the septic numbers actually say

Broken out by query type, which is the part that changes the plan:

| Query | Impr | Pos | Type |
|---|---|---|---|
| `mike septic service` | 20 | 35.2 | **brand** — looking for him by name |
| `mike septic` | 16 | 34.4 | **brand** |
| `saline county septic services` | 17 | 15.9 | real non-brand, in-area |
| `septic system installation wichita ks` | 15 | 38.0 | **out of area — ignore** |
| `septic companies near me` | ~1 | **1.0** | he is #1, it produced 1 click |

Non-brand in-area septic demand is roughly **17 impressions a month, one
query**. He is already position 1 for `septic companies near me`,
`septic pumping near me` and `who cleans out septic tanks near me`, and that
yields about one click, because a map pack sits above organic on all three and
`client-data.json` still has `google_business_url: ""`. **Zero emergency-septic
queries appeared in 28 days.**

The read: the cap on septic is the missing Google Business Profile and 36
impressions/month of people searching his own name at position 35 — not a
shortage of septic pages. A five-page septic architecture was proposed
(hub + installation + repair + pumping + emergency, behind a dropdown nav).
It was cut to Phase 0 first, for the reason already in §6: breadth is what
made every service page thin, `building-pad.html` is the control group at 88
impressions / 0 clicks / position 63, and `services.html` is a hub that
already earns nothing at position 57.

### What shipped

1. **Flat `Septic` nav item, first position, on all 11 pages.** No dropdown.
   The nav is hand-duplicated and byte-identical across every page (there is
   no include and no build step), so a two-level menu would have meant 11 nav
   edits plus new CSS plus new JS — and `main.js` `initNav` binds `closeNav`
   to *every* `nav a` click, so a parent item would slam the mobile menu shut
   on tap before a submenu could open. Not worth it for this.
2. **The homepage service grid is static HTML now** (`index.html`), five
   cards, JS-enhanced rather than JS-generated. It was
   `<div id="serviceGrid"><!-- Cards injected by main.js --></div>` — meaning
   the site's strongest page (position 10.5, highest volume) passed **no
   crawlable link to any service page**. Anchor text is the service name, not
   "Learn More", so the link carries the keyword.
3. **`main.js renderServices()` is now a fallback.** It returns early if the
   grid already contains a `.service-card`. The `services` array is still how
   you toggle a service on or off — **edit index.html AND main.js or the two
   drift.**
4. **Asset cache bust `?v=1` -> `?v=2`** on all 11 pages. Required: returning
   visitors hold the old CSS otherwise. This is what `84fe744` was about.
5. **`.nav.nav--open` max-height 440px -> 520px.** Measured at 390x844: the
   open nav needs 422px. 440px still fit, but with 18px to spare — one more
   item and `overflow: hidden` would have eaten the Get a Quote CTA with no
   error anywhere.
6. **Removed the `#serviceGrid` min-height reservation** (1550px desktop /
   1900px mobile). It was a CLS hack for JS-injected cards; real content
   reserves its own space now, and a guessed placeholder would only leave a
   gap.

### Internal links, before -> after

| Page | Before | After |
|---|---|---|
| `septic.html` | 9 files / 9 links | **11 files / 21 links** |
| `excavation.html` | 8 / 8 | 9 / 9 |
| `land-clearing.html` | 8 / 8 | 9 / 9 |
| `demolition.html` | 8 / 8 | 9 / 9 |
| `building-pad.html` | 8 / 8 | 9 / 9 |

§5 documents that service-page rank tracks inbound internal link count almost
linearly on this site. This is that lever pulled, for free, with no new URLs.

### Verified before commit

Headless Chromium, local server, desktop 1400x900 and mobile 390x844:
nav reads `Septic | Services | Service Areas | About | Contact | Blog`, 438px
of a 1100px header, no wrap, no horizontal overflow; 5 cards render with 5/5
images loaded; mobile nav opens to 422px against a 520px cap with **0px
clipped** and the CTA fully visible; **no console errors on either viewport**.
All 11 pages pass HTML nesting and JSON-LD validation.

### Still open, and still the actual priority

- **Google Business Profile.** Unchanged, still `""`. Position 1 organic on
  three "near me" septic terms producing one click is the cleanest possible
  proof that this is the ceiling. Everything else is downstream of it.
- **Phase 1, only after GBP:** two leaves, not five — `septic-pumping.html`
  (he is #1 for two pumping queries with no dedicated page) and
  `septic-repair.html`. Installation **stays on `septic.html`**; that is where
  its 15 blog links and position-16 authority live. Skip the overview hub
  (`septic.html` already runs the four-way triage, added 2026-09-13) and skip
  emergency (no query demand; the 24/7 band, the footer line and the sticky
  mobile Call bar already cover it).
- **Before any new page ships:** there is **no `BreadcrumbList` schema
  anywhere on the site** and **no `<lastmod>` in `sitemap.xml`**. A hub/leaf
  architecture without breadcrumbs is invisible as a hierarchy, and the
  2026-09-18 agency-brain entry is what a stale sitemap costs. Request
  Indexing is manual and Kaleb-only.
- **Judge Phase 1 at six weeks, not one.** Bar set in advance: both leaves
  reach position <30 and >=1 click by 2026-11-15. If they behave like
  `building-pad.html`, stop adding septic pages and spend the effort on GBP
  and reviews.
