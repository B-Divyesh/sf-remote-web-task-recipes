# Adversarial first-read review 6

**Product:** Remote Web Task Recipes

**Reviewed:** 2026-08-28 UTC

**Candidate:** `6ee5b3721dad3961073ae16e9a755a638267eb34`

**Live URL:** <https://remote-web-task-recipes.sociobot.in/>

**Verdict:** **FAIL**

The landing page, demo sandbox, package, routes, and automated gates passed
their checks. One blocking product gap remains: text detection does not
produce a usable text suggestion. Two minor first-screen/documentation defects
also remain. This was a read-only product review; no product code was changed.

## Cold first read

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 960 before
scrolling. My answers were:

| Question | First-read answer | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It saves visual landmarks and task steps for repeated browser work. | “Save landmarks for repeated browser tasks.” |
| For whom? | Screen-reader and low-vision users who need to find the same browser controls again. | “For people using screen readers or low vision who need to find the same controls again.” |
| What should I click first? | Try the sample. | “Try it with sample data” and “See a named app, three landmarks, and spoken task steps.” |

All three questions are answerable on both screens. At 390 px, the headline,
audience, sample action, its result, and all three facts are visible. There was
no horizontal overflow or console error. The competing header action described
in F-6-2 weakens, but does not block, this answer.

## Findings, ordered by severity

### F-6-1 — BLOCKING — Text detection never gives the user a usable suggestion

**Reopens:** review 1 `R1-B2.4` and review 2 `R2-B2.5`.

**Exact quote / location:** Landing: **“Text suggestions stay in placement;
manual placement remains available.”** README: **“Your browser may offer local
text suggestions during placement.”** The capture overlay instead says only
**“Your browser found 1 visible text areas.”**

**Code evidence:** `detectText()` returns each region's `rawValue` and
`boundingBox`, but `showCapture()` uses only `regions.length`. No recognized
text is rendered, spoken, selectable, or used to move the crosshair. The
`@claim:manual-suggestions` test asserts `data-suggestion="available"`, then
moves the crosshair manually. It never asserts that **“Submit payroll”** is
shown or that selecting it places a landmark.

**Why a first-time visitor is misled:** “Text suggestion” implies an actionable
aid. A screen-reader user receives only a count of detected areas and must still
find the visual coordinate manually. This does not provide the OCR placement
help required by the brief's smallest useful product. The registered claim
command passes, but its assertions do not prove the visitor-facing promise.

**Concrete fix:** Present detected text as a keyboard-operable list inside the
placement dialog. Each item must announce its text and select its bounding-box
centre as the draft landmark; keep Arrow/Shift+Arrow adjustment and the manual
fallback. Discard the regions when placement closes. Update the claim to state
that a recognized label can position a landmark, then assert with the recorded
**“Submit payroll”** fixture that the label is visible, selectable by keyboard,
sets the expected coordinates, persists no OCR text or pixels, and makes no
remote request.

### F-6-2 — Minor — The first screen presents two controls as primary actions

**Exact location:** The header **“Download extension”** and hero **“Try it with
sample data”** use the same filled teal button treatment. On the 390 px screen,
Download appears first at y=124; the intended sample action appears at y=552.

**Why it matters:** The required first-screen shape calls for one primary
action. The wording still lets a visitor infer that the sample comes first, but
the equal visual weight asks them to choose between installing and trying.

**Concrete fix:** Keep Download extension visible in the shared header, but
style it as a normal or outlined navigation link. Reserve the filled primary
treatment on the landing first screen for **“Try it with sample data.”**

### F-6-3 — Minor — The maintained copy audit is incomplete and miscounts current README copy

**Exact location:** `.factory/copy-audit.md` records README R06 as **“Try the
sample without changing your notebooks.”** The current sentence continues
**“before installing anything.”** It also records R44 as 10 words instead of
11 and R50 as 14 instead of 13. The landing audit omits the hero image alt text
and the visible **“build 1.0.1”** footer text.

**Why it matters:** The file is cited by the polish records as proof that every
copy unit was audited. A future reviewer cannot rely on that proof when the
source and record differ.

**Concrete fix:** Replace the maintained audit with the complete tables below,
including the F-6-1 flag, image alt text, and build label. Generate or test the
table against rendered/source copy so later copy changes cannot silently make
it stale.

## Copy audit

Counts use visible lexical words; hyphenated forms count once and standalone
command punctuation does not count. Headings, navigation, actions, facts, and
meaningful alt text are included. No unit exceeds 22 words and no banned
marketing adjective appears. F-6-1 and F-6-2 are the only copy/action flags.

### Landing page

| ID | Words | Copy | Flag |
| --- | ---: | --- | --- |
| L01 | 4 | Skip to main content | — |
| L02 | 4 | Remote Web Task Recipes | — |
| L03 | 1 | Home | — |
| L04 | 1 | Demo | — |
| L05 | 1 | Privacy | — |
| L06 | 2 | Download extension | F-6-2: competes visually with the sample action |
| L07 | 7 | For repeated tasks in hard-to-use browser software | — |
| L08 | 6 | Save landmarks for repeated browser tasks. | — |
| L09 | 16 | For people using screen readers or low vision who need to find the same controls again. | — |
| L10 | 5 | Try it with sample data | Intended primary action |
| L11 | 10 | See a named app, three landmarks, and spoken task steps. | — |
| L12 | 2 | Free extension | — |
| L13 | 2 | No account | — |
| L14 | 6 | Notebook data stays in your browser | — |
| L15 | 4 | How to save landmarks | — |
| L16 | 3 | Save landmarks once. | — |
| L17 | 4 | Follow task steps later. | — |
| L18 | 3 | Name the website | — |
| L19 | 10 | A notebook holds landmarks and task steps for one website. | — |
| L20 | 2 | Place landmarks | — |
| L21 | 14 | Choose placement, then use a pointer or arrow keys to mark a visible control. | — |
| L22 | 3 | Follow task steps | — |
| L23 | 12 | Open the guide to read or hear one step at a time. | — |
| L24 | 5 | It never clicks for you. | — |
| L25 | 5 | What stays on your device | — |
| L26 | 6 | Your landmarks stay in your browser. | — |
| L27 | 7 | Notebooks use storage inside your browser extension. | — |
| L28 | 6 | Screenshots are removed when placement closes. | — |
| L29 | 9 | Text suggestions stay in placement; manual placement remains available. | F-6-1: no suggestion is exposed |
| L30 | 6 | Backups are encrypted with your passphrase. | — |
| L31 | 6 | No analytics, ads, or remote control. | — |
| L32 | 4 | When to recheck landmarks | — |
| L33 | 6 | Landmarks stay at saved screen positions. | — |
| L34 | 11 | Recheck them after the app, display scale, or window layout changes. | — |
| L35 | 6 | Everything in the notebook is free | — |
| L36 | 6 | Use every feature without an account. | — |
| L37 | 13 | Landmarks, task guidance, speech, and encrypted backups are included in the extension download. | — |
| L38 | 2 | Free download | — |
| L39 | 14 | Install the package in Chrome or Chromium, then create a notebook for your website. | — |
| L40 | 2 | Download extension | — |
| L41 | 8 | Save landmarks and task steps for one website. | — |
| L42 | 1 | Privacy | — |
| L43 | 1 | Terms | — |
| L44 | 6 | Built by Param Factory · build 1.0.1 | — |
| L45 | 3 | AI-assisted project artwork. | — |
| L46 | 17 | Overhead field notebook with abstract browser panels, three red landmark markers, a pencil path, and a magnifier | Meaningful image alt; clear |

### README

| ID | Words | Copy | Flag |
| --- | ---: | --- | --- |
| R01 | 4 | Remote Web Task Recipes | — |
| R02 | 6 | Save landmarks for repeated browser tasks. | — |
| R03 | 14 | Remote Web Task Recipes is for screen-reader and low-vision users in hard-to-use browser software. | — |
| R04 | 12 | A user or support worker saves visual landmarks and spoken task steps. | — |
| R05 | 8 | The guide presents one step at a time. | — |
| R06 | 10 | Try the sample without changing your notebooks before installing anything. | — |
| R07 | 4 | What the words mean | — |
| R08 | 10 | A notebook holds landmarks and task steps for one website. | — |
| R09 | 7 | A landmark is a saved visible location. | — |
| R10 | 9 | A task step is one instruction in a guide. | — |
| R11 | 3 | Install the extension | — |
| R12 | 7 | Download the extension and extract the ZIP. | — |
| R13 | 6 | Open chrome://extensions in Chrome or Chromium. | Literal browser location |
| R14 | 4 | Turn on Developer mode. | Literal browser label |
| R15 | 8 | Choose Load unpacked and select the extracted folder. | Literal browser label |
| R16 | 10 | Pin the extension and open it from the browser toolbar. | — |
| R17 | 9 | The download is a Chrome extension for manual installation. | — |
| R18 | 5 | Use Remote Web Task Recipes | — |
| R19 | 10 | Create a notebook for the website you need to revisit. | — |
| R20 | 8 | Name a landmark and choose Place on app. | — |
| R21 | 9 | Point and click, or use Arrow keys and Enter. | — |
| R22 | 5 | Press Escape to cancel placement. | — |
| R23 | 12 | Add task steps and connect a step to a landmark when useful. | — |
| R24 | 9 | Start the guide from the editor or extension menu. | — |
| R25 | 8 | Use Previous step, Next step, or Speak step. | — |
| R26 | 5 | Escape closes the guide. | — |
| R27 | 7 | Export an encrypted backup from Backup & appearance. | — |
| R28 | 6 | Landmarks stay at saved screen positions. | — |
| R29 | 11 | Recheck them after the app, display scale, or window layout changes. | — |
| R30 | 3 | Privacy and limits | — |
| R31 | 10 | The guide does not inspect page fields or click the website. | — |
| R32 | 12 | During placement, your browser may identify text visible in the temporary screenshot. | — |
| R33 | 9 | A screenshot exists only while landmark placement is open. | — |
| R34 | 8 | The screenshot is not kept in extension storage. | — |
| R35 | 8 | Your browser may offer local text suggestions during placement. | F-6-1: detected text is not offered to the user |
| R36 | 8 | Manual placement remains available with or without suggestions. | — |
| R37 | 8 | Notebook data uses storage inside the browser extension. | — |
| R38 | 12 | Each notebook works only on the exact website where you created it. | — |
| R39 | 12 | Backups hide notebook text and require the passphrase used to create them. | — |
| R40 | 11 | There are no accounts, payment flows, analytics, advertising, or remote APIs. | — |
| R41 | 10 | Product claims and their test commands are recorded in .factory/claims.json. | — |
| R42 | 6 | Read the privacy policy and terms. | — |
| R43 | 4 | Develop, test, and build | — |
| R44 | 11 | These release checks were run with Node.js 22.23.2 and npm 10.9.8. | —; independently repeated in this review |
| R45 | 11 | npm run build:site writes the site and extension ZIP to dist/site/. | —; verified |
| R46 | 9 | npm run build:extension writes the Chrome extension to .output/chrome-mv3/. | —; verified |
| R47 | 10 | npm run test:claims -- --grep @claim:&lt;id&gt; runs one declared site claim. | —; verified |
| R48 | 12 | Each extension claim records its own browser-test command in the claims file. | —; release contract passed |
| R49 | 1 | Deploy | — |
| R50 | 13 | Run npm run build, then give dist/site/ to the Param Factory deployment job. | — |
| R51 | 9 | Do not manage DNS or infrastructure from this repository. | — |
| R52 | 2 | Project records | — |
| R53 | 2 | Opportunity brief | — |
| R54 | 5 | Visual system and artwork provenance | — |
| R55 | 2 | Demo sandbox | — |
| R56 | 2 | Repair handoff | — |
| R57 | 1 | License | — |
| R58 | 1 | MIT. | — |
| R59 | 2 | See LICENSE. | — |

Core terminology is otherwise consistent: **notebook** is the one-website
container, **landmark** is a saved location, **task step** is one instruction,
and **guide** is the sequence. Installation terms are literal Chrome labels.

## Demo and sandbox verification

The one-click demo itself passes:

- Clicking **Try it with sample data** opens `/demo/` in one action.
- At 390 × 844, the initial viewport shows Northstar Payroll, landmark
  **Review exceptions**, the pinned sample control, and the current task step.
  Their measured y ranges were 558–611, 626–661, and 676–734.
- The persistent banner says **“Demo — sample data, nothing is saved”** and
  exposes **Reset demo** and **Start for real**.
- After advancing and moving landmark 3, Reset restored the bundled landmarks
  and step 1.
- A fresh context was seeded with `notebookState=REAL-NOTEBOOK-SENTINEL` and
  `real:review6=KEEP-ME`. Entry, mutation, and Reset changed only
  `demo:remote-web-task-recipes`. Start for real removed only that demo key,
  preserved both sentinels, opened `/#support`, and focused Download extension.
- Request interception across entry, placement, advance, Reset, and exit found
  no third-party request. The live offline-reload check also passed.

F-6-1 concerns the installed extension's claimed text suggestion, not the demo
isolation or first-viewport sample.

## Claims review

A clean clone was created at `/tmp/rwtr-review6-clean` from the candidate
commit. After `npm ci`, every exact command in `.factory/claims.json` was run
separately.

| Claim ID | Command result | Review result |
| --- | --- | --- |
| `demo-workflow` | PASS | Observable result confirmed live and locally |
| `demo-isolation` | PASS | Observable result confirmed with extra real-key sentinels |
| `demo-positioning` | PASS | Pointer, Arrow, Shift+Arrow, Enter, and Escape confirmed |
| `site-private` | PASS | Same-origin-only sample flow confirmed live and locally |
| `extension-private` | PASS | Fresh MV3 profile and request interception passed |
| `package-ready` | PASS | Fresh MV3 profile and accessible editor dialogs passed |
| `capture-and-origin-scope` | PASS | Exact website accepted; look-alike rejected |
| `local-notebooks` | PASS | One extension-storage key, origin-only address, and deletion passed |
| `temporary-capture` | PASS | Pixels absent from storage and remote requests |
| `manual-suggestions` | PASS command; **insufficient assertion** | F-6-1: proves detector availability and manual placement, not a usable suggestion |
| `user-control` | PASS | Guide read/click sentinels stayed unchanged |
| `free-complete` | PASS | Landmark, guide, speech, appearance, and backup workflow passed |
| `encrypted-backup` | PASS | Text hidden; correct passphrase opens; wrong one fails |
| `artwork-provenance` | PASS | Prompt record, asset signature, dimensions, size, and hash passed |

The landing and README claims map to these entries except the stronger natural
meaning of **text suggestions**, which F-6-1 identifies as unproved and
unimplemented. No other unlisted visitor-reliance claim was found.

## Structure, accessibility, privacy, and links

| Check | Result |
| --- | --- |
| Titles | PASS: Home, Demo, Privacy, Terms, and 404 use the required product/job or route/product pattern; all are under 60 characters. |
| Semantics and metadata | PASS: `lang=en`, one h1, main, description, canonical, OG/Twitter image data, SVG favicon, and Apple icon are present per route. |
| Routing and focus | PASS: direct links, reload, sample navigation, browser Back, route h1 focus/announcement, and `/#support` focus pass. |
| 404 | PASS: an unknown path returns HTTP 404 with the designed notebook-style page and Home action. |
| Links and public assets | PASS: all crawled internal routes, robots, sitemap, icons, social image, and download return 200; mail links are explicit. |
| Header/footer | PASS structurally: the same four-link header and legal/build footer are present; F-6-2 concerns action hierarchy only. |
| Accessibility | PASS automated checks: live Axe has zero violations; all mobile links/buttons measured at least 44 px; 225% text has no horizontal overflow; reduced motion passes. |
| Console and load | PASS: `verify-url.sh` found no console errors, one h1, main, complete alt text, and a 772 ms cold load. |
| Size | PASS: landing JS is under 1 KB gzip plus a 0.62 KB shared route module; the built extension totals 157.34 KB. |
| Privacy/offline | PASS for tested scope: no third-party site/extension requests; demo and extension storage are separate; offline site reload passes. |
| Visual identity | PASS: ruled warm paper, red registration marks, mono labels, tactile notebook art, and physical shadows are distinct from a generic SaaS template. |
| Package | PASS: public ZIP is 132,148 bytes, has 26 valid entries, and its contents match the clean build. |

## Earlier finding re-check

Every earlier review, polish record, and handoff was read. Live HTML, 404,
robots, and sitemap match the clean build byte-for-byte; the public ZIP's files
match the clean build.

| Earlier finding | Status | Current live/code evidence |
| --- | --- | --- |
| R1-B1 — no one-click demo | FIXED | One-click entry, banner, realistic first-view sample, Reset, exit, and isolated namespace pass. |
| R1-B2.1 — workflow | FIXED | Demo and MV3 flows create/show landmarks and one guide step. |
| R1-B2.2 — collection/automation | FIXED | Guide-specific read and click sentinels pass; placement disclosure remains literal. |
| R1-B2.3 — deliberate capture | FIXED | Capture follows an explicit action; pointer and keyboard commit/cancel pass. |
| R1-B2.4 — suggestions/manual path | **HALF-FIXED; F-6-1 BLOCKING** | Manual fallback works, but detected text is never offered as an actionable suggestion. |
| R1-B2.5 — one-step guide | FIXED | Step advance/speech work and the sample/real app click sentinels remain unchanged. |
| R1-B2.6 — local/exact website | FIXED | Extension storage and exact-origin rejection pass. |
| R1-B2.7 — temporary screenshot | FIXED | Pixel lifetime, storage, and request checks pass. |
| R1-B2.8 — encrypted backup | FIXED | Encryption and both passphrase outcomes pass. |
| R1-B2.9 — no analytics/CDN/API | FIXED | Full site and extension request interceptions pass. |
| R1-B2.10 — screen-position limit | FIXED | Copy is a caution; normalized coordinate changes are measured. |
| R1-B2.11 — free workflow | FIXED | Listed workflows complete without account or payment. |
| R1-B2.12 — install/package | FIXED | Production MV3 opens in a fresh profile; public package contents match. |
| R1-B2.13 — Arrow/Shift+Arrow | FIXED | One-percent and five-percent movements are asserted. |
| R1-B2.14 — limited content script | FIXED | Exact-origin dispatch and guide sentinels pass. |
| R1-B3 — fake 404 | FIXED | Unknown URL returns the designed page with status 404. |
| R1-M1 — metadata/footer | FIXED | Per-route metadata, icons, robots, sitemap, legal links, attribution, and build id pass. |
| R1-M2 — copy | FIXED in product copy | No overlong or banned landing/README sentence; F-6-3 concerns the audit record. |
| R1-M3 — inconsistent terms | FIXED | Notebook, landmark, task step, and guide remain consistent. |
| R2-B1 — clean-clone commands | FIXED | All 14 exact claim commands run after only `npm ci`. |
| R2-B2.1 — extension storage | FIXED | Create/inspect/delete flow passes in a fresh profile. |
| R2-B2.2 — capture lifetime | FIXED | During/after-cancel storage and requests are checked. |
| R2-B2.3 — accounts/tracking/payment | FIXED | Full workflows show no account/payment UI or remote request. |
| R2-B2.4 — automation/page reads | FIXED | Guide wording and actual read/click sentinels match. |
| R2-B2.5 — suggestions/manual placement | **HALF-FIXED; F-6-1 BLOCKING** | Detector presence and manual placement pass; suggestion usefulness is absent. |
| R2-B2.6 — coordinate behavior | FIXED | Stored coordinate deltas are measured. |
| R2-B2.7 — free features | FIXED | All listed free workflows are exercised. |
| R2-B2.8 — package assertions | FIXED | Only verified manual-install behavior remains. |
| R2-B2.9 — claim coverage | **HALF-FIXED; F-6-1 BLOCKING** | Tag uniqueness passes, but the suggestion assertion is weaker than public copy. |
| R2-M1 — metadata/focus | FIXED | Route metadata and direct/back focus pass live. |
| R2-COPY-L23 — vague privacy heading | FIXED | “What stays on your device” remains. |
| R2-COPY-L25/R38 — storage jargon | FIXED | Copy uses storage inside the browser extension. |
| R2-COPY-R17 — undefined launcher | FIXED | Phrase and unproved shortcut claim remain absent. |
| R2-COPY-R19 — “Use it” heading | FIXED | Heading remains “Use Remote Web Task Recipes.” |
| R2-COPY-R39 — origin jargon | FIXED | Visitor copy says exact website. |
| R2-COPY-R54 — MV3 jargon | FIXED | Visitor install copy says Chrome extension. |
| F-4-1 — overbroad page-text claim | FIXED | Guide wording is scoped; placement text identification is disclosed. |
| F-4-2 — unlisted sale claim | FIXED | Sale wording is absent; notebook-data network behavior is tested. |
| F-4-3 — broken real-start path/header | FIXED | Exit preserves real data, focuses Download, and the four-link header is usable. |
| F-4-4 — missing deploy docs | FIXED | README names the build and factory handoff. |
| F-4-5 — “isolated” jargon | FIXED | README uses the user result instead. |
| F-4-6 — Manifest V3 installer jargon | FIXED | Visitor installation copy omits it. |
| F-4-7 — unnamed Previous action | FIXED | Demo, extension, and README say Previous step. |
| F-4-8 — human-review provenance claim | FIXED | Footer uses only the tested AI-assisted provenance statement. |
| F-4-9 — false claims-completeness sentence | FIXED in wording | README now says claims are recorded; F-6-1 identifies one under-proved scope. |
| F-4-10 — untested Node 20 floor | FIXED | README reports the exact environment, which this review repeated. |
| F-5-1 — sample absent from first phone viewport | FIXED | Landmark, pinned control, and live step all intersect 390 × 844. |

## Quality-gate evidence

Clean clone `/tmp/rwtr-review6-clean`, Node.js 22.23.2, npm 10.9.8:

- All 14 exact claim commands passed separately.
- `npm run check` passed.
- `npm test` passed, 15/15.
- `npm run test:site` passed, 6/6, including Axe and offline reload.
- `npm run test:browser` passed, 8/8 fresh-profile MV3 tests.
- `npm run build` produced the site, extension, and ZIP.
- `npm run test:package` passed for a 132,148-byte package.
- `npm audit --omit=dev --audit-level=critical` passed with zero production
  vulnerabilities. `npm ci` reported ten development-tool advisories.
- The same six-test site suite passed against production.

Passing commands do not clear F-6-1 because the relevant assertion checks a
detector flag and manual movement, not the promised suggestion.

## Missed leverage

No runtime generative-AI feature is warranted. The brief calls for local OCR
help, and sending page pixels to an AI gateway would conflict with the default
privacy boundary. Encrypted export/import already covers the obvious portable
backup need, and no provider key or runtime AI endpoint is embedded.

The missing leverage is the local detected text already produced in
`detectText()`: turning those regions into accessible placement choices is the
direct, privacy-preserving completion of the core job (F-6-1).

## What would make this perfect

Expose local text regions as real keyboard/screen-reader placement suggestions
and test their text, selection, coordinates, lifetime, and network behavior.
Then make the landing sample the only filled primary action and regenerate the
copy audit from current copy. Re-run every claim command and the full live suite
after deployment. Until those checks leave zero findings, the verdict remains
**FAIL**.
