// Verification for the 2026-10-12 septic cluster build.
//
// Measures rather than eyeballs, because the two failure modes here are both
// SILENT: an over-tall mobile nav gets eaten by `overflow: hidden` with no
// error anywhere, and a CSS-only dropdown that does not open just looks like
// a nav with fewer items. Screenshots would not catch either reliably.
//
//   node verify-septic-cluster.mjs
//
// Expects a static server on http://127.0.0.1:8899 serving the repo root.

import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8899';
const LEAVES = [
  'septic.html', 'septic-pumping.html', 'sewer-drain-cleaning.html',
  'septic-repair.html', 'septic-inspection.html', 'septic-perc-test.html',
];
const ALL = [
  'index.html', 'services.html', 'service-area.html', 'about.html',
  'contact.html', 'blog.html', 'excavation.html', 'land-clearing.html',
  'demolition.html', 'building-pad.html', ...LEAVES,
];

let fails = 0;
const fail = (m) => { console.log('  FAIL  ' + m); fails++; };
const pass = (m) => console.log('  ok    ' + m);

const browser = await chromium.launch();

// ───────────────────────────────────────────────────────────── console errors
console.log('\n[1] console errors across all ' + ALL.length + ' pages');
{
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  for (const p of ALL) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    const r = await page.goto(`${BASE}/${p}`, { waitUntil: 'load' });
    if (r.status() !== 200) fail(`${p} returned HTTP ${r.status()}`);
    await page.waitForTimeout(250);
    if (errs.length) fail(`${p}: ${errs.length} console error(s): ${errs[0].slice(0, 120)}`);
    await page.close();
  }
  if (!fails) pass('zero console errors, all pages HTTP 200');
  await ctx.close();
}

// ───────────────────────────────────────────────── desktop: dropdown + wrap
console.log('\n[2] desktop 1400x900 — dropdown opens on hover, nav does not wrap');
{
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/septic.html`, { waitUntil: 'load' });

  const hiddenFirst = await page.locator('.nav-sub').first().isVisible();
  if (hiddenFirst) fail('dropdown is visible before hover (should be closed)');
  else pass('dropdown closed by default');

  await page.locator('.nav-parent').first().hover();
  await page.waitForTimeout(220);
  const openOnHover = await page.locator('.nav-sub').first().isVisible();
  if (!openOnHover) fail('dropdown did NOT open on hover');
  else pass('dropdown opens on hover');

  const subCount = await page.locator('.nav-sub a').count();
  if (subCount !== 6) fail(`dropdown has ${subCount} items, expected 6`);
  else pass('dropdown has all 6 septic links');

  // every sub-item must be inside the viewport and clickable
  const offscreen = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.nav-sub a').forEach((a) => {
      const r = a.getBoundingClientRect();
      if (r.right > innerWidth || r.left < 0 || r.width === 0 || r.height === 0) {
        out.push(a.textContent.trim() + ' @ ' + Math.round(r.left) + ',' + Math.round(r.right));
      }
    });
    return out;
  });
  if (offscreen.length) fail('dropdown items off-screen or zero-size: ' + offscreen.join('; '));
  else pass('all dropdown items on-screen with real dimensions');

  // keyboard: focus-within must open it too
  await page.evaluate(() => document.querySelector('.nav-parent').blur());
  await page.locator('body').click({ position: { x: 700, y: 600 } });
  await page.waitForTimeout(150);
  await page.locator('.nav-parent').first().focus();
  await page.waitForTimeout(200);
  const openOnFocus = await page.locator('.nav-sub').first().isVisible();
  if (!openOnFocus) fail('dropdown does NOT open on keyboard focus (focus-within)');
  else pass('dropdown opens on keyboard focus');

  const navWrap = await page.evaluate(() => {
    const nav = document.getElementById('nav');
    const kids = [...nav.children].map((c) => c.getBoundingClientRect());
    const tops = new Set(kids.filter((r) => r.height > 0).map((r) => Math.round(r.top)));
    return { rows: tops.size, navWidth: Math.round(nav.getBoundingClientRect().width) };
  });
  if (navWrap.rows > 1) fail(`desktop nav wraps onto ${navWrap.rows} rows`);
  else pass(`desktop nav is one row, ${navWrap.navWidth}px wide`);

  await ctx.close();
}

// ──────────────────────────────────────────── mobile: the silent clipping bug
console.log('\n[3] mobile — open nav must not clip, on two real viewport sizes');
for (const vp of [{ width: 390, height: 844, name: 'iPhone 14 390x844' },
                  { width: 375, height: 667, name: 'iPhone SE 375x667' }]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/septic-pumping.html`, { waitUntil: 'load' });

  await page.locator('#navToggle').click();
  await page.waitForTimeout(500);

  const m = await page.evaluate(() => {
    const nav = document.getElementById('nav');
    const cta = nav.querySelector('.nav-cta');
    const links = [...nav.querySelectorAll('a')];
    const nr = nav.getBoundingClientRect();
    const cr = cta.getBoundingClientRect();
    return {
      open: nav.classList.contains('nav--open'),
      scrollH: nav.scrollHeight,
      clientH: nav.clientHeight,
      clipped: Math.max(0, nav.scrollHeight - nav.clientHeight),
      overflowY: getComputedStyle(nav).overflowY,
      linkCount: links.length,
      // the CTA is the item the old fixed cap used to eat
      ctaReachable: cr.height > 0 && cr.width > 0,
      ctaBottomWithinScroll: cr.bottom - nr.top <= nav.scrollHeight + 1,
      zeroSize: links.filter((a) => {
        const r = a.getBoundingClientRect();
        return r.width === 0 || r.height === 0;
      }).map((a) => a.textContent.trim()),
    };
  });

  console.log(`  ${vp.name}: ${m.linkCount} links, content ${m.scrollH}px, ` +
              `visible ${m.clientH}px, overflow-y ${m.overflowY}`);

  if (!m.open) fail(`${vp.name}: nav did not open on toggle tap`);
  else pass(`${vp.name}: nav opens`);

  if (m.linkCount !== 14) fail(`${vp.name}: ${m.linkCount} nav links, expected 14 (8 + 6 sub)`);
  else pass(`${vp.name}: all 14 nav links present`);

  if (m.zeroSize.length) fail(`${vp.name}: zero-size links: ${m.zeroSize.join(', ')}`);
  else pass(`${vp.name}: every link has real dimensions`);

  // This is THE check. With the old fixed 520px cap and overflow:hidden,
  // content taller than the cap was silently unreachable. Now it scrolls.
  if (m.clipped > 0 && !['auto', 'scroll'].includes(m.overflowY)) {
    fail(`${vp.name}: ${m.clipped}px of nav is CLIPPED AND UNREACHABLE ` +
         `(overflow-y: ${m.overflowY})`);
  } else if (m.clipped > 0) {
    pass(`${vp.name}: ${m.clipped}px overflows but is scrollable (overflow-y: ${m.overflowY})`);
  } else {
    pass(`${vp.name}: whole nav fits, 0px clipped`);
  }

  if (!m.ctaReachable) fail(`${vp.name}: Get a Quote CTA has zero size`);
  else if (!m.ctaBottomWithinScroll) fail(`${vp.name}: CTA sits beyond the scrollable area`);
  else pass(`${vp.name}: Get a Quote CTA reachable`);

  // tapping a sub-link must navigate (it also closes the menu, which is fine)
  await page.locator('.nav-sub a[href="septic-repair.html"]').click();
  await page.waitForLoadState('load');
  const url = page.url();
  if (!url.endsWith('septic-repair.html')) fail(`${vp.name}: sub-link tap went to ${url}`);
  else pass(`${vp.name}: tapping a sub-link navigates correctly`);

  // no horizontal page scroll anywhere
  const hscroll = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (hscroll > 1) fail(`${vp.name}: ${hscroll}px of horizontal page scroll`);
  else pass(`${vp.name}: no horizontal overflow`);

  await ctx.close();
}

// ──────────────────────────────────────────────── breadcrumbs match the JSON-LD
console.log('\n[4] breadcrumbs — visible trail matches BreadcrumbList JSON-LD');
{
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  for (const p of LEAVES) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${p}`, { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const crumbs = [...document.querySelectorAll('.breadcrumb li')]
        .map((li) => li.textContent.trim());
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => { try { return JSON.parse(s.textContent); } catch { return null; } })
        .find((d) => d && d['@type'] === 'BreadcrumbList');
      return {
        visible: crumbs,
        json: ld ? ld.itemListElement.map((i) => i.name) : null,
        visibleShown: !!document.querySelector('.breadcrumb')?.getBoundingClientRect().height,
      };
    });
    if (!r.json) { fail(`${p}: no BreadcrumbList JSON-LD`); await page.close(); continue; }
    if (!r.visibleShown) { fail(`${p}: breadcrumb markup present but not rendered`); }
    const vis = r.visible.join(' > ');
    const js = r.json.join(' > ');
    if (vis !== js) fail(`${p}: visible "${vis}" != JSON-LD "${js}"`);
    else pass(`${p.padEnd(26)} ${vis}`);
    await page.close();
  }
  await ctx.close();
}

await browser.close();
console.log(fails === 0
  ? '\nALL CHECKS PASSED\n'
  : `\n${fails} CHECK(S) FAILED\n`);
process.exit(fails === 0 ? 0 : 1);
