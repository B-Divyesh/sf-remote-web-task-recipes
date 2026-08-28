# Review 5 handoff

## Outcome

Repair commit `e32802e540ba9271d00a7bb05eaed1c1f8379636` closes the remaining
mobile demo finding from review 5 and preserves the cumulative review 1, 2,
and 4 fixes. On a 390 × 844 phone, the first `/demo/` screen now shows a live
Northstar Payroll notebook strip with a named landmark, its numbered sample
control, and the current task step. The strip is driven by the actual demo
state and updates with the guide.

Production deployment `ba39505b-e709-4968-91b9-af856781c19d` is live at
<https://remote-web-task-recipes.sociobot.in/>.

## How to run and verify

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

Run every exact command in `.factory/claims.json` separately. The site claim
suite can also check production:

```bash
SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims
```

Build output is `dist/site/`; the factory deployment job owns delivery. The
extension ZIP is `dist/site/downloads/remote-web-task-recipes.zip`.

## Exact evidence

- Clean clone: `/tmp/rwtr-polish5-clean.UCz1Hs` at `e32802e`, Node 22.23.2,
  npm 10.9.8. All 14 exact manifest claim commands passed.
- Clean-clone suites passed: check; 15/15 Vitest; 6/6 site/Axe/offline tests;
  8/8 packaged-MV3 tests; build; package verification; production dependency
  audit (0 vulnerabilities).
- Live `verify-url.sh`: HTTP 200, title/lang/one h1/main/alt/button checks,
  no console errors, 1.068 s cold load. Report:
  `.factory/evidence/polish-5/live/verify.json`.
- Live site/claim suite: 6/6, including the 390 × 844 first-viewport assertion,
  Axe, isolated demo storage, privacy request interception, routing/focus, 404,
  and offline reload.
- Cold live phone screenshot:
  `.factory/evidence/polish-5/live/demo-mobile.png`. The required elements
  intersect the viewport at y=558–611, 626–682, and 697–755.
- Live routes `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, `robots.txt`,
  `sitemap.xml`, and the ZIP return 200; `/not-a-real-route` returns 404.
- Live ZIP: 132,148 bytes and `unzip -t` passes.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 1.06 s, LCP 1.51 s, CLS 0.0032, TBT 0 ms. Report:
  `.factory/evidence/polish-5/live/lighthouse.json`.

## Known gaps

None. The only nonzero audit output is the known development-tool advisory
count from `npm ci`; `npm audit --omit=dev --audit-level=critical` passes.

See `.factory/polish-5.md` for the full finding-by-finding ledger.
