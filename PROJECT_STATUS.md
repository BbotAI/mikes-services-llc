# Mike's Services LLC — Project Status

**Last updated:** 2026-09-05
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
