# Perfection loop round 4

Reviewed candidate: 8ede76a6dff09760c15e273b91bfcdd1a2d3a0d7

Adversarial report: decf32be8ffbe452c0e552982c8b36ed9299f912

Repair commit: aa8b4f5

Production URL: https://remote-web-task-recipes.sociobot.in/

This closes every finding in .factory/review-1.md, .factory/review-2.md, and
.factory/review-4.md. There is no review-3.md or polish-3.md in this
repository. polish-2.md was re-read; its prior fixes were retained and
re-verified rather than assumed.

Evidence paths below are repository-relative. “Clean clone” means
/tmp/rwtr-round4-clean.OjMCJp at aa8b4f5, after npm ci, using Node.js 22.23.2
and npm 10.9.8. Every command declared in .factory/claims.json was run
separately there and passed.

## Review 1

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-B1 | Retained first-screen Try it with sample data, direct /demo/ and ?demo=1, named Northstar Payroll sample, persistent banner, reset, Start for real, and separate demo: storage. | Clean-clone @claim:demo-workflow and @claim:demo-isolation; live /demo/; .factory/evidence/polish-4/live/demo-mobile.png. |
| R1-B2.1 workflow | Demo and packaged extension create landmarks and show or speak one task step at a time. | @claim:demo-workflow; @claim:free-complete. |
| R1-B2.2 no collection or automation | Reworded scope honestly: guide does not inspect page fields or click; placement may identify visible screenshot text. Guide test uses an isolated-world password-value read sentinel and target click sentinel. | @claim:user-control. |
| R1-B2.3 deliberate capture | Placement begins only after the explicit action and supports pointer, Arrow, Shift+Arrow, Enter, and Escape. | @claim:demo-positioning; @claim:manual-suggestions. |
| R1-B2.4 text suggestions and manual path | Supported and unsupported text-suggestion fixtures both save a manually placed landmark; cancellation leaves it unchanged. | @claim:manual-suggestions. |
| R1-B2.5 one-step guide and no action | Guide exposes the current step, speaks it on request, and never activates the target app. | @claim:demo-workflow; @claim:user-control. |
| R1-B2.6 local and exact website | Fresh-profile storage is inspected and exact-website dispatch rejects a look-alike address. | @claim:local-notebooks; @claim:capture-and-origin-scope. |
| R1-B2.7 temporary screenshot | Capture state is checked while open and after cancellation; pixels are neither stored nor sent. | @claim:temporary-capture. |
| R1-B2.8 encrypted backup | Backup envelope hides notebook text, decrypts only with its passphrase, and rejects another passphrase. | @claim:encrypted-backup; @claim:free-complete. |
| R1-B2.9 no analytics, ads, CDN, or API | Site and extension flows intercept every HTTP request. Extension test uses a uniquely named notebook and permits only its local test page. | @claim:site-private; @claim:extension-private; @claim:free-complete. |
| R1-B2.10 screen-position limit | Copy is a recheck caution, not a promise to detect layout changes; placement assertions measure normalized saved coordinates. | @claim:demo-positioning; @claim:manual-suggestions. |
| R1-B2.11 free workflow | Fresh profile completes landmarks, guide, speech, appearance, and encrypted backup without account, checkout, or payment request. | @claim:free-complete. |
| R1-B2.12 install and package | Production MV3 output opens from a fresh Chromium profile; consumer ZIP is integrity-checked. | @claim:package-ready; npm run test:package; live ZIP comparison. |
| R1-B2.13 Arrow and Shift+Arrow | Tests assert 1% and 5% coordinate moves and save with Enter. | @claim:demo-positioning; @claim:manual-suggestions. |
| R1-B2.14 limited content script | Before explicit action there is no overlay; exact-site dispatch, isolated-world sentinels, and storage inspection prove restricted behavior. | @claim:capture-and-origin-scope; @claim:user-control. |
| R1-B3 | Retained designed 404.html with actual 404 response, route metadata, and a home action. | Public-route site test; live /not-a-real-route = HTTP 404; .factory/evidence/polish-4/live/404-mobile.png. |
| R1-M1 | Retained per-route titles, canonical/description/OG/Twitter/apple metadata, favicons, robots, sitemap, legal/footer links, Param Factory attribution, and build id. | Public-route site test; live /robots.txt and /sitemap.xml. |
| R1-M2 | Retained plain-language rewrite and full copy audit; first screen names job and primary action. | .factory/copy-audit.md; .factory/evidence/polish-4-home-mobile.png. |
| R1-M3 | Retained consistent notebook, landmark, task step, and guide vocabulary. | .factory/copy-audit.md; landing and README inspection. |

## Review 2

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R2-B1 | Site build commands prepare WXT types, so a new clone needs only npm ci before claims, site, or build commands. | All 14 exact claim commands; npm run check, npm run test:site, and npm run build passed in clean clone. |
| R2-B2.1 extension storage | Fresh-profile test creates, inspects, and deletes a notebook, checking only the intended extension-storage key. | @claim:local-notebooks. |
| R2-B2.2 screenshot lifetime | Packaged-extension test observes capture during and after cancel and checks storage and network. | @claim:temporary-capture. |
| R2-B2.3 analytics, accounts, payment | Complete site/extension request interception plus complete free workflow cover retained no-account and no-payment claims. | @claim:site-private; @claim:extension-private; @claim:free-complete. |
| R2-B2.4 no automation or field reading | Claim is limited to guide behavior; isolated-world password getter and target-click sentinel prove it directly. | @claim:user-control. |
| R2-B2.5 suggestions and manual placement | Both suggestion-availability states save a real manual landmark. | @claim:manual-suggestions. |
| R2-B2.6 screen positions | Limitation is stated as caution; measured coordinate deltas and stored values prove positioning behavior. | @claim:demo-positioning; @claim:manual-suggestions. |
| R2-B2.7 every feature is free | Actual extension workflow exercises every listed feature with no account, checkout UI, or payment request. | @claim:free-complete. |
| R2-B2.8 install and shortcut assertions | Unsupported shortcut and unsigned-package copy remains removed; manual install is backed by fresh-profile package test. | @claim:package-ready; npm run test:package. |
| R2-B2.9 claims completeness | claims.json now has 14 claims, including extension privacy and artwork provenance. Release contract enforces one source tag per id. | @claim:artwork-provenance; npm test (15/15); all 14 exact commands. |
| R2-M1 metadata and focus | Every route has complete social metadata; route load focuses/announces h1, and Start for real focuses download action. | Public-route site test; @claim:demo-isolation; live privacy, terms, demo, and 404 checks. |
| R2-COPY-L23 | Private by design remains What stays on your device. | .factory/copy-audit.md. |
| R2-COPY-L25/R38 | Technical storage wording remains browser extension storage in plain language. | .factory/copy-audit.md; README privacy section. |
| R2-COPY-R17 | Undefined quick-launcher wording and its unproved shortcut claim remain removed. | README installation section; @claim:package-ready. |
| R2-COPY-R19 | Heading remains Use Remote Web Task Recipes. | .factory/copy-audit.md. |
| R2-COPY-R39 | Visitor copy uses exact website, not technical origin. | .factory/copy-audit.md; README privacy section. |
| R2-COPY-R54 | Visitor install copy no longer mentions a manifest version. | README installation section; .factory/copy-audit.md. |

## Review 4

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | Replaced broad page-text promise with guide-only wording and temporary-screenshot text-identification disclosure. User-control test now uses actual isolated-world read and click sentinels. | Clean-clone npm run test:browser -- --grep @claim:user-control; README, Privacy, and terms inspection. |
| F-4-2 | Removed untestable sale-policy sentence. Privacy now says extension does not send notebook data to us, backed by unique-notebook request/storage proof. | Clean-clone npm run test:browser -- --grep @claim:extension-private; live /privacy/. |
| F-4-3 | Start for real discards demo data and goes to /#support, focusing Download extension. All routes now share Home/Demo/Privacy/Download header, visibly wrapped in two mobile rows. | @claim:demo-isolation; public-route mobile/focus test; .factory/evidence/polish-4/live/demo-mobile.png; live /demo/. |
| F-4-4 | Added README Deploy instructions: build then hand dist/site/ to Param Factory; do not manage infrastructure here. | README Deploy section; clean-clone npm run build. |
| F-4-5 | Replaced isolated sample with Try the sample without changing your notebooks. | README; .factory/copy-audit.md. |
| F-4-6 | Removed Manifest V3 from visitor installation copy. | README; .factory/copy-audit.md. |
| F-4-7 | Renamed demo and extension control Previous step and updated README. | @claim:demo-workflow; browser suite (8/8). |
| F-4-8 | Footer says AI-assisted project artwork. Provenance claim validates source sidecar, prompt, dimensions, selected asset, and SHA-256. | Clean-clone npm test -- -t @claim:artwork-provenance; .factory/design.md. |
| F-4-9 | README says product claims and commands are recorded in claims.json; release contract scans itself so every id has one tag. | npm test (15/15); all 14 exact manifest commands. |
| F-4-10 | Removed unproved Node 20 floor. README identifies verified Node.js 22.23.2 and npm 10.9.8. | Clean-clone setup and full quality run under that environment. |

## Final verification

- All claims: 14/14 separate manifest commands passed in clean clone: four
  static-site, eight packaged-browser, and two unit/release claim tests.
- Full clean-clone suites: npm run check; npm test (15/15); npm run test:site
  (6/6, including Axe); npm run test:browser (8/8); npm run build; npm run
  test:package; npm audit --omit=dev --audit-level=critical (0 vulnerabilities).
- Production cold check: verify-url.sh returned HTTP 200 with no console errors,
  correct title/lang/main/h1, no missing image alt, and no unnamed button. Live
  ZIP passed unzip -t and matched locally rebuilt ZIP. Unknown route returns
  HTTP 404; live privacy text and demo exit link were checked directly.
- Live visual check: home, demo, and unknown route were cold-opened at mobile
  and desktop sizes. Screenshots: .factory/evidence/polish-4/live/
  screenshot-mobile.png, demo-mobile.png, demo-desktop.png, and 404-mobile.png.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 1.5 s, CLS 0.0036, TBT 60 ms. Report:
  .factory/evidence/polish-4/live/lighthouse.json.

No review finding remains open.
