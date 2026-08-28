# Perfection loop round 7

**Reviewed candidate:** `3488606fbb5860c0f6d170d8125a0588b75ebe7b`
**Review:** `b01d9219bbc88101c9f78c58796f05e6276ec610`
**Repair commit:** `e2c3c13eb0e6a2415fcf9f77807b8444e6e1ecc8`
**Production:** <https://remote-web-task-recipes.sociobot.in/>

Every available review and polish record was reread. The repair adds the one
missing landing-skeleton segment without changing the local-first extension or
the field-notebook visual system: an accessible, non-persistent Northstar
Payroll preview now appears after the first screen and before the method.

## Finding ledger

Screenshot filenames in this table are under
`.factory/evidence/polish-7/live/`; live URL checks use the production custom
domain above.

| Finding ID | Change made or retained verified behavior | Evidence |
| --- | --- | --- |
| R1-B1 | Retained sample action, `/demo/`, `?demo=1`, Northstar data, banner, Reset, Start for real, and `demo:` storage. | `@claim:demo-workflow`, `@claim:demo-isolation`; live `/demo/`; `demo-mobile.png`. |
| R1-B2.1 | Landmark/task workflow creates and presents a named landmark and one guide step. | `@claim:demo-workflow`, `@claim:free-complete`. |
| R1-B2.2 | Guide is limited to no field inspection/clicking; placement text is temporary and disclosed. | `@claim:user-control`, `@claim:temporary-capture`. |
| R1-B2.3 | Placement follows an explicit action and supports pointer, Arrow, Shift+Arrow, Enter, and Escape. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.4 | Local detected labels are keyboard-operable placement choices; manual placement remains available. | `@claim:manual-suggestions`. |
| R1-B2.5 | Guide shows/speaks one step at a time and never activates the app. | `@claim:demo-workflow`, `@claim:user-control`. |
| R1-B2.6 | Notebooks are local and exact-website dispatch rejects a look-alike. | `@claim:local-notebooks`, `@claim:capture-and-origin-scope`. |
| R1-B2.7 | Screenshot pixels exist only during placement and are not stored or sent. | `@claim:temporary-capture`. |
| R1-B2.8 | Backup hides notebook text, needs its passphrase, and rejects another passphrase. | `@claim:encrypted-backup`. |
| R1-B2.9 | Sample and extension flows make no third-party requests. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R1-B2.10 | Screen-position behavior is a recheck caution with measured normalized positions. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.11 | Landmark, guide, speech, appearance, and backup work without account or payment. | `@claim:free-complete`. |
| R1-B2.12 | Fresh MV3 profile and consumer ZIP are usable and intact. | `@claim:package-ready`; `npm run test:package`; live `unzip -t`. |
| R1-B2.13 | Arrow moves 1% and Shift+Arrow moves 5%. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.14 | Content-script actions are explicit, origin-scoped, and protected by isolated-world sentinels. | `@claim:capture-and-origin-scope`, `@claim:user-control`. |
| R1-B3 | Designed notebook-style unknown route returns HTTP 404 and a home action. | Live `/not-a-real-route` = 404; `404-mobile.png`. |
| R1-M1 | Titles, metadata, canonical/social data, icons, robots, sitemap, legal links, attribution, and build identity remain complete. | Live public-route/Axe test; `/robots.txt`; `/sitemap.xml`; `verify.json`. |
| R1-M2 | Plain first-screen wording, named action, literal headings, and complete copy audit remain. | `.factory/copy-audit.md`; `npm test`; `home-mobile.png`. |
| R1-M3 | **notebook**, **landmark**, **task step**, and **guide** remain the defined terms. | Copy-audit terminology table; landing/README check. |
| R2-B1 | Site commands prepare WXT types and work after only `npm ci`. | Clean clone all 15 exact claim commands; `npm run build`. |
| R2-B2.1 | Extension storage is created, inspected, and deleted in a fresh profile. | `@claim:local-notebooks`. |
| R2-B2.2 | Capture lifetime is inspected during and after placement, including storage and requests. | `@claim:temporary-capture`. |
| R2-B2.3 | No-account/no-payment and network behavior are tested for site and extension flows. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R2-B2.4 | Guide field-read and click boundaries have direct sentinels. | `@claim:user-control`. |
| R2-B2.5 | Text suggestion and manual placement both save real landmarks. | `@claim:manual-suggestions`. |
| R2-B2.6 | Coordinates are measured while layout changes are a limitation. | `@claim:demo-positioning`. |
| R2-B2.7 | Every listed free extension workflow is exercised with no payment path. | `@claim:free-complete`. |
| R2-B2.8 | Visitor copy retains only verified manual-install/package behavior. | `@claim:package-ready`; `npm run test:package`. |
| R2-B2.9 | Claims manifest has one uniquely tagged observable test per row. | Release contract; 15 separate claim commands. |
| R2-M1 | Every route has social metadata and route-h1 focus/announcement. | Live public-route/Axe test; `@claim:demo-isolation`. |
| R2-COPY-L23 | Privacy heading remains “What stays on your device.” | `.factory/copy-audit.md`. |
| R2-COPY-L25/R38 | Storage copy remains plain browser-extension wording. | Copy audit; README privacy section. |
| R2-COPY-R17 | Unproved quick-launcher wording remains absent. | README; `@claim:package-ready`. |
| R2-COPY-R19 | Product-use heading remains specific. | README; copy audit. |
| R2-COPY-R39 | Visitor copy says exact website, not origin. | README; copy audit. |
| R2-COPY-R54 | Visitor installation copy omits manifest jargon. | README; copy audit. |
| F-4-1 | Guide claim stays narrow and literal; placement text detection is separately disclosed. | `@claim:user-control`, `@claim:manual-suggestions`. |
| F-4-2 | Privacy statement is observable: notebook data is not sent to us or a third party. | `@claim:extension-private`; live `/privacy/`. |
| F-4-3 | Start for real clears demo state, targets `/#support`, focuses download, and the four-link header works on phone. | `@claim:demo-isolation`; live demo check. |
| F-4-4 | README documents the `dist/site/` factory deployment handoff. | README Deploy; clean `npm run build`. |
| F-4-5 | README names the user result instead of unexplained “isolated.” | README R06; copy audit. |
| F-4-6 | Visitor installation copy says Chrome extension without Manifest V3 jargon. | README R17; copy audit. |
| F-4-7 | Demo, extension, and README say **Previous step**. | `@claim:demo-workflow`; browser suite. |
| F-4-8 | Footer uses tested AI-assisted-artwork provenance without an untestable review assertion. | `@claim:artwork-provenance`; `.factory/design.md`. |
| F-4-9 | README accurately says claims and their commands are recorded. | Release contract; all claim commands. |
| F-4-10 | README states only the actually tested Node/npm versions. | Clean clone: Node 22.23.2, npm 10.9.8. |
| F-5-1 | Phone demo begins with a visible landmark, marked control, and current task step. | `@claim:demo-workflow`; `demo-mobile.png`. |
| F-6-1 | Detected text is selectable by keyboard, centres placement, and is discarded at close. | `@claim:manual-suggestions`; 8/8 MV3 suite. |
| F-6-2 | Download is outlined; **Try it with sample data** is the only filled first-screen action. | Computed-style site assertion; `home-mobile.png`. |
| F-6-3 | Audit includes all current landing/README units and is source/count/sequence checked. | `npm test` 16/16; `.factory/copy-audit.md`. |
| F-7-1 | Added accessible, non-persistent Northstar preview before “How to save landmarks,” with landmark, marked control, task step, and demo link. | `@claim:landing-preview`; `home-desktop.png`; live `/`. |

## Verification

Clean clone: `/tmp/rwtr-polish7-clean.UumzKE` at `e2c3c13`, after `npm ci`,
using Node.js 22.23.2 and npm 10.9.8.

- All 15 exact `.factory/claims.json` commands passed separately: five site
  claims, eight MV3 claims, and two Vitest claims.
- `npm run check`, `npm test` (16/16), `npm run test:site` (7/7 with Axe,
  route focus, mobile reflow, privacy interception, and offline reload),
  `npm run test:browser` (8/8), `npm run build`, `npm run test:package`, and
  `npm audit --omit=dev --audit-level=critical` passed. `npm ci` reports ten
  development-tool advisories; the production audit reports none.
- Production `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run
  test:site` passed 7/7. It rechecked the demo path, storage isolation,
  preview, Axe, focus, mobile layout, privacy requests, and offline reload.
- `verify-url.sh` recorded HTTP 200, 655 ms cold load, no console errors,
  title, `lang=en`, one h1, main, image alternatives, and named buttons in
  `evidence/polish-7/live/verify.json`.
- Cold live screenshots were inspected: `home-desktop.png`, `home-mobile.png`,
  `demo-mobile.png`, and `404-mobile.png` in `evidence/polish-7/live/`.
- Live Lighthouse: Performance 98, Accessibility 100, Best Practices 100,
  SEO 100; FCP 1.1 s, LCP 1.5 s, CLS 0.004, TBT 150 ms. Report:
  `evidence/polish-7/live/lighthouse.json`.
- `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, `/robots.txt`,
  `/sitemap.xml`, and the public ZIP returned 200. The unknown route returned
  404 and the downloaded ZIP passed `unzip -t`.

No finding remains open.
