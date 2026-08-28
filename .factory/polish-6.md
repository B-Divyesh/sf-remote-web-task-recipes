# Perfection loop round 6

Reviewed candidate: `6ee5b3721dad3961073ae16e9a755a638267eb34`  
Adversarial report: `4361ebf739b328b831c8909e7f09c78bffbd05b4`  
Repair commit: `74be893f1bd756ddfee7bd55afe0656215b54971`  
Deployment: `24eb2971-9856-48f3-bd11-371ac2806c33`  
Production: <https://remote-web-task-recipes.sociobot.in/>

Every review and earlier polish record was re-read. There is no review 3 or
polish 3. “Clean” is `/tmp/rwtr-polish6-clean.HZKy5V` after `npm ci`; every
exact claim command passed separately there. “Live” is the custom domain.

## Round-6 change

Text detection now produces ephemeral, keyboard-operable label buttons in the
closed capture shadow root. Activating a label sets the draft landmark to its
detected bounding-box centre. The list, regions, and screenshot source are
cleared on close; pointer and keyboard manual placement remain available.
`@claim:manual-suggestions` uses a recorded **Submit payroll** fixture, finds
the label in the accessibility tree, selects it by keyboard, asserts the 50% /
50% coordinate, manual fallback, cancellation, no persisted OCR/pixels, and no
remote request.

## Finding ledger

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-B1 | Retained direct `/demo/`, `?demo=1`, Northstar sample, banner, Reset, Start for real, and `demo:` storage. | `@claim:demo-workflow`, `@claim:demo-isolation`; live `/demo/`; `evidence/polish-6/live/demo-mobile.png`. |
| R1-B2.1 | Retained sample/MV3 landmark, task, and guide workflow. | `@claim:demo-workflow`, `@claim:free-complete`; live claims 6/6. |
| R1-B2.2 | Retained guide read/click sentinels and exact placement-text disclosure. | `@claim:user-control`; live README/privacy. |
| R1-B2.3 | Retained explicit capture and pointer, Arrow, Shift+Arrow, Enter, Escape support. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.4 | Replaced count-only detection with actionable local label buttons. | `@claim:manual-suggestions`; recorded fixture, fresh MV3 profile. |
| R1-B2.5 | Retained one-step, spoken guide that does not act on the app. | `@claim:demo-workflow`, `@claim:user-control`. |
| R1-B2.6 | Retained separate demo state, local notebooks, exact-website dispatch. | `@claim:demo-isolation`, `@claim:local-notebooks`, `@claim:capture-and-origin-scope`. |
| R1-B2.7 | Retained temporary screenshot cleanup/no-storage/no-request proof. | `@claim:temporary-capture`, `@claim:manual-suggestions`. |
| R1-B2.8 | Retained passphrase-only encrypted backup. | `@claim:encrypted-backup`. |
| R1-B2.9 | Retained complete site/extension request interception. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R1-B2.10 | Retained literal recheck caution and measured normalized positions. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.11 | Retained account-free landmark, guide, speech, appearance, backup flow. | `@claim:free-complete`. |
| R1-B2.12 | Retained fresh-profile package/editor test and public ZIP integrity. | `@claim:package-ready`, `npm run test:package`, live `unzip -t`. |
| R1-B2.13 | Retained 1% Arrow and 5% Shift+Arrow assertions. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.14 | Retained explicit dispatch and isolated-world sentinel proof. | `@claim:capture-and-origin-scope`, `@claim:user-control`. |
| R1-B3 | Retained designed HTTP 404 page. | Live `/not-a-real-route` = 404; `evidence/polish-6/live/404-mobile.png`. |
| R1-M1 | Retained complete metadata, legal/footer links, robots, sitemap, icons. | Public-route/Axe test; live routes and `verify.json`. |
| R1-M2 | Retained plain first-screen copy and regenerated checked audit. | `npm test`; `evidence/polish-6/live/home-mobile.png`. |
| R1-M3 | Retained consistent notebook, landmark, task step, guide terminology. | `.factory/copy-audit.md` terminology table. |
| R2-B1 | Retained self-sufficient WXT preparation for every site command. | All 14 exact clean claim commands pass after only `npm ci`. |
| R2-B2.1 | Retained extension storage create/inspect/delete proof. | `@claim:local-notebooks`. |
| R2-B2.2 | Retained screenshot lifecycle/storage/request proof. | `@claim:temporary-capture`. |
| R2-B2.3 | Retained no-account/no-payment/network proof. | `@claim:site-private`, `@claim:extension-private`, `@claim:free-complete`. |
| R2-B2.4 | Retained actual guide field-read/click sentinels. | `@claim:user-control`. |
| R2-B2.5 | Completed the prior suggestion half-fix with selectable text labels. | `@claim:manual-suggestions`; recorded Submit payroll fixture. |
| R2-B2.6 | Retained measured coordinate behavior and a cautious limitation. | `@claim:demo-positioning`. |
| R2-B2.7 | Retained every listed free workflow in a fresh MV3 profile. | `@claim:free-complete`. |
| R2-B2.8 | Retained only verified manual-install/package language. | `@claim:package-ready`; `npm run test:package`. |
| R2-B2.9 | Retained unique tags and upgraded the suggestion assertion. | Release contract; all 14 claim commands. |
| R2-M1 | Retained complete metadata and route h1 focus/announcement. | Public-route/Axe test; live claims 6/6. |
| R2-COPY-L23 | Retained “What stays on your device.” | Copy audit L25. |
| R2-COPY-L25/R38 | Retained plain browser-extension storage wording. | Copy audit L27/R37; live README. |
| R2-COPY-R17 | Retained removal of undefined quick-launcher wording. | README; `@claim:package-ready`. |
| R2-COPY-R19 | Retained the specific product-use heading. | Copy audit R18. |
| R2-COPY-R39 | Retained “exact website,” not origin jargon. | Copy audit R38. |
| R2-COPY-R54 | Retained manifest-jargon removal from visitor copy. | README R17; copy-audit contract. |
| F-4-1 | Retained narrow guide boundary and temporary screenshot text disclosure. | `@claim:user-control`, `@claim:manual-suggestions`. |
| F-4-2 | Retained observable no-notebook-data-send policy text. | `@claim:extension-private`; live `/privacy/`. |
| F-4-3 | Retained `/#support` exit, download focus, consistent mobile header. | `@claim:demo-isolation`; live cold demo exit. |
| F-4-4 | Retained Param Factory deploy handoff instructions. | README Deploy; `npm run build`. |
| F-4-5 | Retained plain sample wording. | README R06; copy-audit contract. |
| F-4-6 | Retained removal of Manifest V3 installer jargon. | README R17; copy-audit contract. |
| F-4-7 | Retained “Previous step” action naming. | `@claim:demo-workflow`; browser suite. |
| F-4-8 | Retained AI-assisted artwork disclosure/provenance test. | `@claim:artwork-provenance`; `.factory/design.md`. |
| F-4-9 | Retained accurate claims-manifest wording. | Release contract; all claim commands. |
| F-4-10 | Retained only actually verified Node/npm versions. | Clean clone: Node 22.23.2/npm 10.9.8. |
| F-5-1 | Retained live Northstar landmark/control/step above the phone fold. | `@claim:demo-workflow`; `evidence/polish-6/live/demo-mobile.png`. |
| F-6-1 | Implemented accessible detected-text list, centre placement, cleanup, and robust claim test. | `@claim:manual-suggestions`; `npm run test:browser` 8/8. |
| F-6-2 | Made header download outlined; sample is the only filled first-screen action. | Computed-background site assertion; `evidence/polish-6/live/home-mobile.png`. |
| F-6-3 | Replaced stale audit with complete current tables and a source/count/sequence contract. | `npm test` 16/16; `.factory/copy-audit.md`; release contract. |

## Final verification

- Clean clone: 14/14 exact claims, `npm run check`, `npm test` (16/16),
  `npm run test:site` (6/6), `npm run test:browser` (8/8), `npm run build`,
  `npm run test:package`, and production dependency audit passed.
- Live: `verify-url.sh` reports 200, 841ms cold load, no console errors, and
  title/lang/h1/main/alt/button success. Live claims passed 6/6, including
  Axe integration and offline reload. Expected routes returned 200; unknown
  route returned 404.
- Lighthouse report `evidence/polish-6/live/lighthouse.json`: Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; FCP 1.5s, LCP 1.5s,
  CLS 0.004, TBT 0ms.

No finding remains open.
