# Adversarial review 8 handoff

## Outcome

Review 8 is **PASS**. No product code changed. The review report is
`.factory/review-8.md`; this handoff records the independent verification at
commit `7dbfe0d5cff3aade8dfee05904148b4787d3f582`.

## Verification

- Created `/tmp/rwtr-review8-clean.Ge4wkI` from the reviewed commit and ran
  `npm ci`.
- Ran every exact command in `.factory/claims.json` separately: all 15 passed.
- Ran `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run
  test:site`: 7/7 passed, including the live demo, storage isolation, network
  interception, mobile layout, Axe, route focus, 404, and offline reload.
- Fresh live 390 x 844 and 1440 x 960 contexts had no console errors or
  horizontal overflow. The phone hero answers the job, audience, and first
  action before scrolling. The phone demo immediately shows the Northstar
  landmark, its marked control, and current task step.
- Crawled links and assets from `/`, `/demo/`, `/privacy/`, `/terms/`, and the
  designed 404: all expected routes and same-origin links returned 200; the
  unknown route returned 404.

## Known gaps

None.

---

# Perfection loop round 7 handoff

## Outcome

Round 7 closes `F-7-1` and reconfirms every finding in
`.factory/review-1.md`, `.factory/review-2.md`, `.factory/review-4.md`,
`.factory/review-5.md`, `.factory/review-6.md`, and `.factory/review-7.md`.
The product repair is commit
`e2c3c13eb0e6a2415fcf9f77807b8444e6e1ecc8` (`fix: add landing product
preview`), pushed to `origin/main`.

The landing now has a static, accessible Northstar Payroll notebook preview
immediately after the first screen and before “How to save landmarks.” It shows
a named **Review exceptions** landmark, its numbered payroll control, the
current task step, and a **Try the full sample** link. It is non-persistent:
the new `landing-preview` claim begins from no localStorage state, verifies its
visual order and sample link, and then enters the real isolated demo. The
preview uses the existing warm-paper, ruled-line, red-pin visual grammar rather
than a generic card layout.

## Deployment

- Production: <https://remote-web-task-recipes.sociobot.in/>
- Deployment command: `/opt/fleet/lib/deploy-static.sh remote-web-task-recipes /work/repo/dist/site`
- Static host confirmed after upload: `nice-field-009f7040f.7.azurestaticapps.net`

## Verification

Clean clone: `/tmp/rwtr-polish7-clean.UumzKE` at `e2c3c13`, after only
`npm ci`, using Node.js 22.23.2 and npm 10.9.8.

- Every exact command in `.factory/claims.json` passed separately: 15/15
  (`landing-preview`, `demo-workflow`, `demo-isolation`, `demo-positioning`,
  `site-private`, `extension-private`, `package-ready`,
  `capture-and-origin-scope`, `local-notebooks`, `temporary-capture`,
  `manual-suggestions`, `user-control`, `free-complete`, `encrypted-backup`,
  `artwork-provenance`).
- `npm run check` passed.
- `npm test` passed: 16/16.
- `npm run test:site` passed: 7/7, including Playwright Axe scans, mobile
  reflow, route focus, demo isolation, same-origin requests, and offline reload.
- `npm run test:browser` passed: 8/8 fresh-profile MV3 tests.
- `npm run build` produced `dist/site/`, the MV3 directory, and the ZIP.
  `npm run test:package` passed; public dependency audit passed with zero
  production vulnerabilities. `npm ci` reports ten development-tool advisories.
- A cold production run of
  `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:site`
  passed 7/7, including the new preview assertion and Axe scans.
- `/opt/fleet/lib/verify-url.sh` recorded HTTP 200, 655 ms cold load, no
  console errors, title, `lang=en`, one h1, main, complete image alternatives,
  and named buttons in `.factory/evidence/polish-7/live/verify.json`.
- Cold production checks returned 200 for `/`, `/demo/`, `/?demo=1`,
  `/privacy/`, `/terms/`, `/robots.txt`, `/sitemap.xml`, and the extension ZIP;
  `/not-a-real-route` returned 404. The downloaded ZIP passed `unzip -t`.
- Live Lighthouse report: Performance 98, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 1.5 s, CLS 0.004, TBT 150 ms. The browser
  reported a non-fatal tab-close crash after Lighthouse wrote the complete
  report; the scored report is at `.factory/evidence/polish-7/live/lighthouse.json`.
- Cold screenshots inspected: `home-desktop.png`, `home-mobile.png`,
  `demo-mobile.png`, and `404-mobile.png` in `.factory/evidence/polish-7/live/`.

## Run and deploy

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

Run every exact command in `.factory/claims.json` separately for release
verification. The factory deploys `dist/site/`; do not manage DNS or other
infrastructure outside the work-order deployment step.

## Known gaps

None.

---

# Perfection loop round 6 handoff

## Outcome

Round 6 closes every finding in `.factory/review-1.md`,
`.factory/review-2.md`, `.factory/review-4.md`, `.factory/review-5.md`, and
`.factory/review-6.md`. The repair commit is
`74be893f1bd756ddfee7bd55afe0656215b54971` (`fix: make detected text
actionable`), pushed to `origin/main`.

The key repair turns local detected text into real placement choices without
changing the extension's local-first privacy boundary. During the explicit,
temporary capture overlay, each valid detected label is a keyboard-operable
button. Choosing it moves the draft landmark to the label's bounding-box
centre; Arrow and Shift+Arrow still adjust it. Labels, regions, and screenshot
pixels are discarded when placement closes. The updated claim test uses a
recorded `Submit payroll` fixture, selects it by keyboard, checks the saved
coordinates, confirms the label and pixels never enter storage, and intercepts
all requests.

The landing now has one filled first-screen action, **Try it with sample
data**. The header download stays visible as an outlined navigation link. The
catalog description, landing privacy copy, README, claims manifest, and a
source-checked copy audit were updated to describe the real label-placement
behavior.

## Deployment

- Production: <https://remote-web-task-recipes.sociobot.in/>
- Static deployment ID: `24eb2971-9856-48f3-bd11-371ac2806c33`
- Deployment command: `/opt/fleet/lib/deploy-static.sh remote-web-task-recipes /work/repo/dist/site`

## Verification

Clean clone: `/tmp/rwtr-polish6-clean.HZKy5V` at repair commit `74be893`, after
only `npm ci`, with Node.js 22.23.2 and npm 10.9.8.

- Every one of the 14 exact commands in `.factory/claims.json` passed
  separately. This includes the strengthened
  `@claim:manual-suggestions` browser claim.
- `npm run check` passed.
- `npm test` passed: 16/16, including the copy-audit source contract.
- `npm run test:site` passed: 6/6, including live Axe integration, mobile
  reflow, routing/focus, privacy interception, and offline reload.
- `npm run test:browser` passed: 8/8 fresh-profile MV3 tests.
- `npm run build` produced `dist/site/`, the MV3 directory, and the download
  ZIP. `npm run test:package` passed.
- `npm audit --omit=dev --audit-level=critical` passed with zero production
  vulnerabilities. `npm ci` reports ten development-tool advisories.
- A live run of
  `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims`
  passed 6/6. It repeated live demo, isolation, positioning, privacy, route,
  focus, mobile, Axe, and offline assertions.
- `/opt/fleet/lib/verify-url.sh` recorded HTTP 200, 841ms cold load, no console
  errors, `lang=en`, one h1, main, complete image alternatives, and named
  buttons in `.factory/evidence/polish-6/live/verify.json`.
- Live routes `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, `/robots.txt`,
  `/sitemap.xml`, and the download returned 200; `/not-a-real-route` returned
  404. The live ZIP passes `unzip -t`; its 23 file contents match a fresh local
  ZIP (the archive bytes differ only because ZIP timestamps are regenerated).
- Live Lighthouse report:
  `.factory/evidence/polish-6/live/lighthouse.json` — Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 1.5s, CLS
  0.004, TBT 0ms.
- The installed `@axe-core/cli` runner could not start because its bundled
  ChromeDriver targets Chrome 152 while the supplied browser is Chromium 145.
  The required alternative, Playwright's bundled `axe-core` integration, ran
  against every live public route with zero violations.

Cold production screenshots were inspected at 390 × 844:

- `.factory/evidence/polish-6/live/home-mobile.png`
- `.factory/evidence/polish-6/live/demo-mobile.png`
- `.factory/evidence/polish-6/live/404-mobile.png`

The home shows a single teal sample action and an outlined download link. The
demo shows the Northstar landmark, pinned control, and current task step in its
first phone viewport. A fresh production context also confirmed that `?demo=1`
sets only `demo:remote-web-task-recipes`, **Start for real** removes that key,
and focus lands on `#download-extension`.

## Run and deploy

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

Run every exact claim command in `.factory/claims.json` separately for a release
verification. The factory deploys `dist/site/`; do not manage DNS or other
infrastructure from this repository outside the work-order deployment step.

## Known gaps

None.
