# Perfection loop round 5

Reviewed candidate: `066b409d527a267a9bfd39a3ccafc3b297c1f7eb`  
Adversarial report: `bfc9d4a9b90bf795413d0f804e9d2e2ba371f942`  
Repair commit: `e32802e540ba9271d00a7bb05eaed1c1f8379636`  
Deployment: `ba39505b-e709-4968-91b9-af856781c19d`  
Production: <https://remote-web-task-recipes.sociobot.in/>

All reviews and prior polish records were re-read. There is no review 3 or
polish 3 in this repository. This repair retains the verified round-2 and
round-4 work and closes the remaining round-5 mobile first-use finding with a
real stateful demo view, not a static substitute.

## Round 5 repair

At 390 × 844, `/demo/` now presents a compact live Northstar Payroll notebook
between the short task introduction and the full workspace. It contains landmark
1, its numbered Review exceptions control, and the current guide step. The
compact step uses the same demo state as the complete guide, so it changes when
Next step is used. The full notebook, sample app, placement flow, and guide
remain below it.

`@claim:demo-workflow` sets a 390 × 844 viewport and asserts viewport
intersection—not just DOM visibility—for `#glance-landmark-row`,
`#glance-control`, and `#glance-guide-step`. It also proves that the compact
step updates after advancing the guide. The manifest and demo documentation
describe this observable behavior. The updated catalog sentence is verb-first,
56 characters, and has nine words.

## Finding ledger

“Live” means the deployed custom-domain check below, not a preview host.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-B1 | Kept sample action, `?demo=1`, `/demo/`, Northstar data, demo storage, banner, reset, and real-start exit; added the compact live phone notebook. | `@claim:demo-workflow`, `@claim:demo-isolation`; live `/demo/`, `/?demo=1`; `evidence/polish-5/live/demo-mobile.png`. |
| R1-B2.1 workflow | Demo and MV3 flows create landmarks and show/speak one guide step without operating the app. | `@claim:demo-workflow`, `@claim:free-complete`. |
| R1-B2.2 collection/automation | Copy limits the guide to no field inspection/clicking and discloses temporary screenshot text identification. | `@claim:user-control`, `@claim:manual-suggestions`. |
| R1-B2.3 deliberate capture | Placement requires an explicit action and supports pointer, Arrow, Shift+Arrow, Enter, and Escape. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.4 suggestions/manual placement | Both text-suggestion states save a manually placed landmark. | `@claim:manual-suggestions`. |
| R1-B2.5 one-step guide | Guide is one step at a time, offers speech, and does not activate the website. | `@claim:demo-workflow`, `@claim:user-control`. |
| R1-B2.6 local/exact website | Demo is separate from extension storage; notebooks are scoped and reject look-alikes. | `@claim:demo-isolation`, `@claim:local-notebooks`, `@claim:capture-and-origin-scope`. |
| R1-B2.7 temporary screenshot | Capture pixels disappear after placement and make no remote request. | `@claim:temporary-capture`. |
| R1-B2.8 encrypted backup | Backup hides text, opens with its passphrase, and rejects another passphrase. | `@claim:encrypted-backup`. |
| R1-B2.9 no tracking/CDN/API | Whole sample and extension flows intercept requests and allow only needed local/same-origin paths. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R1-B2.10 coordinate boundary | Copy is an honest recheck caution; tests inspect saved normalized positions. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.11 free workflow | Landmark, guide, speech, appearance, and backup run without account or payment. | `@claim:free-complete`. |
| R1-B2.12 package/install | Fresh-profile MV3 opening and consumer ZIP integrity are tested. | `@claim:package-ready`; `npm run test:package`; live ZIP `unzip -t`. |
| R1-B2.13 keyboard movement | Tests measure one-percent Arrow and five-percent Shift+Arrow movement. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.14 limited content script | Exact-website dispatch and isolated-world sentinels prove restricted behavior. | `@claim:capture-and-origin-scope`, `@claim:user-control`. |
| R1-B3 | Product-styled unknown route returns 404 rather than home. | Live `/not-a-real-route` = 404; public-route test. |
| R1-M1 | Complete route metadata, social image, icons, robots, sitemap, legal/footer structure remain. | Public-route/Axe test; live legal, robots, and sitemap checks. |
| R1-M2 | Plain-language job, audience, actions, and copy rewrites remain. | `.factory/copy-audit.md`; live cold home check. |
| R1-M3 | Notebook, landmark, task step, and guide remain defined user-facing terms. | `.factory/copy-audit.md` terminology table. |
| R2-B1 | WXT preparation runs before site commands, making a new clone self-sufficient. | Clean clone after `npm ci`; all exact commands pass. |
| R2-B2.1 storage | Fresh-profile storage creation, inspection, and deletion are observable. | `@claim:local-notebooks`. |
| R2-B2.2 capture lifetime | Capture state, post-cancel state, storage, and requests are inspected. | `@claim:temporary-capture`. |
| R2-B2.3 accounts/tracking/payment | Full flows show no account/payment path and intercept HTTP requests. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R2-B2.4 automation/page reads | Guide scope matches actual isolated-world read/click sentinels. | `@claim:user-control`. |
| R2-B2.5 suggestions/manual path | Landmark saves occur with and without suggestions. | `@claim:manual-suggestions`. |
| R2-B2.6 coordinate behavior | Stored deltas are measured and the limit is a caution. | `@claim:demo-positioning`. |
| R2-B2.7 free features | Every listed free feature is exercised in a fresh MV3 profile. | `@claim:free-complete`. |
| R2-B2.8 package assertions | Only the verified manual-install behavior remains in copy. | `@claim:package-ready`; `npm run test:package`. |
| R2-B2.9 claim coverage | Fourteen claims have one uniquely tagged observable test. | `tests/release-contract.test.ts`; all 14 manifest commands. |
| R2-M1 | Each route focuses/announces its heading and has complete metadata. | Public-route/Axe test; live six-test suite. |
| R2-COPY-L23 | “What stays on your device” remains the contextual privacy heading. | `.factory/copy-audit.md`. |
| R2-COPY-L25/R38 | Copy uses plain browser-extension storage wording. | `.factory/copy-audit.md`; README. |
| R2-COPY-R17 | Unsupported quick-launcher wording remains absent. | README; `@claim:package-ready`. |
| R2-COPY-R19 | Product-use heading remains specific. | README; `.factory/copy-audit.md`. |
| R2-COPY-R39 | Copy says exact website, not origin. | README privacy section. |
| R2-COPY-R54 | Installation copy omits manifest jargon. | README install section. |
| F-4-1 | Text-identification wording is scoped to placement screenshots; guide is scoped to no field inspection/clicking. | `@claim:user-control`, `@claim:manual-suggestions`; README/Privacy. |
| F-4-2 | Privacy says notebook data is not sent to us, replacing an untestable sale-policy claim. | `@claim:extension-private`; live `/privacy/`. |
| F-4-3 | Start for real removes demo storage, targets `/#support`, focuses Download extension, and shares the usable four-link header. | `@claim:demo-isolation`; public-route mobile/focus test. |
| F-4-4 | README documents the Param Factory `dist/site/` deployment handoff. | README Deploy section; `npm run build`. |
| F-4-5 | README says the sample does not change notebooks. | README; `.factory/copy-audit.md`. |
| F-4-6 | Visitor installation wording says Chrome extension without manifest jargon. | README install section. |
| F-4-7 | Demo, extension, and README say Previous step. | `@claim:demo-workflow`; browser suite. |
| F-4-8 | Footer discloses AI-assisted artwork without a human-review assertion. | `@claim:artwork-provenance`; `.factory/design.md`. |
| F-4-9 | README accurately says claims and commands are recorded in `claims.json`. | Release-contract test; manifest. |
| F-4-10 | README gives actually verified Node/npm versions. | Clean clone on Node 22.23.2/npm 10.9.8. |
| F-5-1 | Responsive live notebook strip puts landmark 1, the pinned Northstar control, and current task step above the fold. | `@claim:demo-workflow`; live boxes 558–611, 626–682, 697–755; live screenshot. |

## Verification

Clean clone: `/tmp/rwtr-polish5-clean.UCz1Hs` at `e32802e`, Node.js 22.23.2,
npm 10.9.8. After `npm ci`, all 14 exact `.factory/claims.json` commands
passed separately: four site claims, eight packaged-MV3 claims, and two Vitest
claims. The complete clean-clone gates passed: `npm run check`; `npm test`
(15/15); `npm run test:site` (6/6, Axe and offline); `npm run test:browser`
(8/8); `npm run build`; `npm run test:package`; and production dependency audit
(0 vulnerabilities). `npm ci` reports ten known development-tool advisories.

After deployment, `verify-url.sh` wrote
`.factory/evidence/polish-5/live/verify.json`: HTTP 200, title/lang/one h1/main/
alt/button checks pass, no console errors, and 1.068 s cold load.
`SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims`
passed 6/6, including live viewport, Axe, routing/focus, privacy, and offline
checks. `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, `/robots.txt`,
`/sitemap.xml`, and the download return 200; the unknown route returns 404.

`evidence/polish-5/live/demo-mobile.png` is a cold live 390 × 844 capture with
no console errors. The public ZIP is 132,148 bytes and passes `unzip -t`.
Lighthouse mobile report `evidence/polish-5/live/lighthouse.json`: Performance
100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.06 s, LCP 1.51 s,
CLS 0.0032, TBT 0 ms.

No review finding remains open.
