---
name: run-mikes-services-llc
description: Visual QA for the mikeservicesllc.com static site — screenshot any live page, test mobile/touch viewports, and check for console errors. Use when asked to screenshot a page, verify a UI change actually works, check mobile rendering, or confirm no console errors after editing HTML/CSS/JS on this site.
---

This is a plain HTML/CSS/JS static site (no build step, no framework) deployed to GitHub
Pages at `mikeservicesllc.com` (confirmed via this repo's `CNAME` file). There's no local dev
server — pages are verified directly against the live URL after each deploy. Drive it with the
Playwright helpers in `.claude/skills/run-mikes-services-llc/driver.mjs`.

This skill was copied from the sibling `kpw-build` repo's `run-kpw-build` skill (same template
lineage, same driver). See that repo for the fuller write-up and the interaction-testing example
pattern (`lightbox-check.mjs`) if this site later gains a click/tap-driven component (lightbox,
accordion, toggle) worth testing the same way — as of this writing, `main.js` here only has
`initNav`, `initSmoothScroll`, `initYear`, `initScrollTop` (confirmed by reading the file); the
FAQ section on `index.html` is static `<h3>`/`<p>` markup with no accordion JS, so there's
nothing interactive to click-test yet.

All paths below are relative to `.claude/skills/run-mikes-services-llc/` unless noted otherwise.

## Prerequisites

Node.js and npm (already present in this environment). No OS packages needed beyond what
Playwright's Chromium ships with — it runs headless.

## Setup

```bash
npm install                      # installs playwright (pinned in package.json)
npx playwright install chromium  # downloads the Chromium build Playwright drives
```

`node_modules/` and screenshot output (`*.png`/`*.jpg`) are gitignored — re-run `npm install`
after a fresh clone.

## Run (agent path)

```bash
node driver.mjs shot <url> [out.png] [--mobile] [--full-page]
node driver.mjs check <url> [--mobile]     # console-error check only, no screenshot
```

Verified this session against production:

```bash
node driver.mjs shot "https://mikeservicesllc.com/" /tmp/mikes-desktop.png
node driver.mjs shot "https://mikeservicesllc.com/" /tmp/mikes-mobile.png --mobile
```

Both rendered correctly and printed `Console errors: none`.

**Helpers available from `driver.mjs`** (import into a new example script if this site gains an
interactive component worth testing):

| export | what it does |
|---|---|
| `launch()` | Launches headless Chromium (`--no-sandbox`) |
| `desktopContext(browser, overrides?)` | 1400×900 viewport context |
| `mobileContext(browser, overrides?)` | 390×844, `isMobile`/`hasTouch` true, iPhone UA |
| `watchConsoleErrors(page, label?)` | Attaches `console`/`pageerror` listeners, returns the array they push into |
| `waitForVisible(page, selector, timeout?)` | Waits for an element to become visible |
| `waitForHidden(page, selector, timeout?)` | Waits for an element to become hidden — see Gotchas |

## Run (human path)

Not applicable — no local server or build; a human checks the same live URL in a regular browser.

## Test

No test suite in this repo (static HTML site). "Testing" a change here means running the
driver against the live URL after deploying.

---

## Gotchas

- **`waitForSelector` defaults to `state: 'visible'`.** A closed modal that's `display: none`
  will never satisfy `page.waitForSelector('#thing:not(.is-open)')` under the default state —
  use `waitForHidden(page, '#thing')` instead. (Inherited note from `run-kpw-build`; not yet
  exercised on this repo since there's no modal/lightbox here.)
- **This site's FAQ is not interactive.** Unlike `kpw-build`'s use-cases.html lightbox or an
  accordion FAQ, `index.html`'s FAQ section here is static markup — don't write a click-test
  expecting `.faq-item__question` accordion behavior; it isn't wired up in `main.js`.

## Troubleshooting

- No repo-specific errors hit yet — this section will fill in as this skill gets exercised
  against real changes.
