# Adversarial first-read review 4

**Product:** Remote Web Task Recipes  
**Reviewed:** 2026-08-28 UTC  
**Candidate:** `8ede76a6dff09760c15e273b91bfcdd1a2d3a0d7`  
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>  
**Verdict:** **FAIL**

One blocking privacy finding from reviews 1 and 2 is only half-fixed. Nine
additional major or minor findings remain. This review changed no product code.

## Cold first read

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900. The following
answers were recorded before scrolling:

- **What it does:** Saves visible locations for repeated browser tasks and
  presents the task steps again later.
- **For whom:** People using screen readers or low vision who need to find the
  same controls again.
- **What to click first:** **“Try it with sample data.”** The adjacent text says
  the result: **“See a named app, three landmarks, and spoken task steps.”**

All three answers are available on the first screen at both sizes. At 390 px,
the primary action begins at y=423 and all three facts end at y=623, within the
844 px viewport. At 1440 px, the action and facts are also visible. There was no
horizontal overflow and no console or page error. This part passes.

## Findings, ordered by severity

### F-4-1 — BLOCKING — The “does not read page text” claim remains broader than the behavior and its test

**Earlier IDs:** `R1-B2.2` and `R2-B2.4`.

**Exact quote / location:** README, Privacy and limits: **“It does not read
passwords or page text.”** The registered `user-control` claim narrows this to
the guide, but its test only checks that two sentinel strings are absent from
extension storage. The same shipped code deliberately calls `TextDetector` on
the placement screenshot, and `@claim:manual-suggestions` confirms that this
path runs with fixture output **“Submit payroll.”**

**Why this blocks:** A first-time user making a privacy decision can reasonably
read “does not read page text” as applying to the whole extension. Placement
does identify visible text from the page screenshot. The test does not detect a
read-and-discard operation; it proves only non-persistence. The earlier finding
was therefore narrowed in the manifest rather than fully corrected in copy and
proof.

**Concrete fix:** Replace the broad sentence with: **“The guide does not inspect
page fields or click the website. During placement, your browser may identify
text visible in the temporary screenshot.”** Update `user-control` to claim
only what its test observes, or instrument actual DOM/password reads rather
than checking storage after the fact.

### F-4-2 — Major — The privacy page contains an unlisted data-use claim

**Exact quote / location:** `/privacy/`, Analytics and third parties: **“We do
not sell personal data.”** No `.factory/claims.json` entry covers sale or
sharing. `site-private` proves only that the sample flow makes same-origin
requests; it cannot establish an organisational data-sale practice.

**Why it matters:** This is a privacy promise a visitor may rely on, but it is
outside the sandbox proof.

**Concrete fix:** Replace it with the observable statement **“The extension
does not send notebook data to us.”** Include that wording in the relevant
network-interception claim and test, or add auditable evidence for the broader
policy claim.

### F-4-3 — Major — “Start for real” returns phone users to the demo call to action, and the header offers no way forward

**Exact location:** Demo **“Start for real”** links to `/`. At 390 px the home
page then shows **“Try it with sample data”** as its only visible action because
`site/site.css` applies `.site-header nav{display:none}`. The actual download is
about three screens lower. Desktop headers also change by route: `/` shows
**Demo · How it works · Privacy · Download extension**; `/demo/` shows
**Home · Privacy · Terms**; legal routes use different combinations again.

**Why it matters:** After trying the product, a phone visitor who chooses the
real path is sent back to the sample invitation with no visible install action.
The required shared skeleton also calls for a consistent header; link positions
change by route and the navigation disappears entirely on a phone.

**Concrete fix:** Send **Start for real** directly to the extension download or
to `/#support` with focus on **Download extension**. Keep one compact four-link
header on every route, for example **Home · Demo · Privacy · Download
extension**. At 390 px, wrap it or expose it through an accessible labelled menu
instead of hiding it.

### F-4-4 — Minor — README does not explain deployment

**Exact location:** README has **“Develop, test, and build”** and names build
output, but no deployment section or statement that the factory deploys
`dist/site/`.

**Why it matters:** The repository definition of done requires run, test, and
deploy instructions. A maintainer can build the artifact but cannot tell the
supported handoff boundary.

**Concrete fix:** Add: **“## Deploy. Run `npm run build`, then give `dist/site/`
to the Param Factory deployment job. Do not manage DNS or infrastructure from
this repository.”**

### F-4-5 — Minor — “Isolated” is unexplained README jargon

**Exact quote / location:** README: **“Try the isolated sample before installing
anything.”**

**Why it matters:** “Isolated” names an implementation property, not the user
result.

**Concrete fix:** Use **“Try the sample without changing your notebooks.”**

### F-4-6 — Minor — “Manifest V3” is unnecessary installer jargon

**Exact quote / location:** README: **“The download is a Chrome extension
(Manifest V3) for manual installation.”**

**Why it matters:** A first-time installer does not need the manifest version
to understand the package.

**Concrete fix:** Use **“The download is a Chrome extension for manual
installation.”** Put the manifest version in the developer section if needed.

### F-4-7 — Minor — “Previous” does not name the button result

**Exact quote / location:** The demo and extension guide button is
**“Previous”**; README repeats **“Use Previous, Next step, or Speak step.”**

**Why it matters:** The adjacent controls otherwise name their result. The
shortened label is less clear when heard out of context.

**Concrete fix:** Rename it **“Previous step”** everywhere and update the README
sentence to **“Use Previous step, Next step, or Speak step.”**

### F-4-8 — Minor — Artwork provenance includes an unlisted human-review claim

**Exact quote / location:** Landing footer: **“Original AI-assisted project
artwork, reviewed by the maker.”** `.factory/design.md` records the prompt and
asset provenance, but `.factory/claims.json` has no entry for this public claim
and no sandbox test can prove the human review clause.

**Why it matters:** The claims policy requires public claim-like statements to
be listed and testable.

**Concrete fix:** Remove **“reviewed by the maker”**, or replace the footer with
a link to the documented provenance and add a claim test that checks the source
prompt record and shipped asset dimensions/hash.

### F-4-9 — Minor — README’s claim-completeness statement is not true literally

**Exact quote / location:** README: **“Every testable statement is listed in
.factory/claims.json.”** F-4-2 and F-4-8 are not listed.

**Why it matters:** The sentence asks maintainers to treat the manifest as
complete when it is not.

**Concrete fix:** Add coverage for every retained product/privacy claim and
replace the meta claim with **“Product claims and their test commands are recorded in
`.factory/claims.json`.”**

### F-4-10 — Minor — Node 20 compatibility is an unlisted, untested claim

**Exact quote / location:** README: **“Use Node.js 20 or newer with npm.”** The
fresh-clone run used Node 22. `.factory/claims.json` has no Node-20 entry, and no
recorded CI matrix or `engines` contract demonstrates the lower bound.

**Why it matters:** A maintainer on the documented minimum version may discover
an incompatibility only after setup.

**Concrete fix:** Add a `node-20-build` claim and run the full clean build/test
under Node 20, or state the version that is actually verified.

## One-click demo and sandbox

**PASS for sample use and isolation; the real-start transition is F-4-3.** The
first action opened `/demo/` and the first 390 px screen already
showed **Northstar Payroll**, a named task, and realistic landmark data. The
persistent banner said **“Demo — sample data, nothing is saved”** and exposed
**Reset demo** and **Start for real**.

Independent live exercise:

- Seeded `notebookState=real-notebook-sentinel` and
  `real:review-sentinel=keep-me` before entry.
- Demo added only `demo:remote-web-task-recipes`.
- Advanced to step 2 and moved landmark 3 by keyboard; only the demo key
  changed.
- Reset restored the three bundled landmarks and step 1, while both seeded
  non-demo values remained unchanged.
- Start for real removed only the demo key and returned to `/`.
- No third-party request occurred during entry, placement, advance, reset, and
  exit.
- After one online visit, `/demo/` reloaded offline with all three landmarks.

## Claims verification

Fresh clone: `/tmp/rwtr-review4-clean.F8SX2V`, cloned at `8ede76a`. After only
`npm ci`, every exact command from `.factory/claims.json` passed.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `demo-workflow` | `npm run test:claims -- --grep @claim:demo-workflow` | PASS, 1 test |
| `demo-isolation` | `npm run test:claims -- --grep @claim:demo-isolation` | PASS, 1 test |
| `demo-positioning` | `npm run test:claims -- --grep @claim:demo-positioning` | PASS, 1 test |
| `site-private` | `npm run test:claims -- --grep @claim:site-private` | PASS, 1 test |
| `package-ready` | `npm run test:browser -- --grep @claim:package-ready` | PASS, 1 test |
| `capture-and-origin-scope` | `npm run test:browser -- --grep @claim:capture-and-origin-scope` | PASS, 1 test |
| `local-notebooks` | `npm run test:browser -- --grep @claim:local-notebooks` | PASS, 1 test |
| `temporary-capture` | `npm run test:browser -- --grep @claim:temporary-capture` | PASS, 1 test |
| `manual-suggestions` | `npm run test:browser -- --grep @claim:manual-suggestions` | PASS, 1 test |
| `user-control` | `npm run test:browser -- --grep @claim:user-control` | PASS, but insufficient for the broader README wording; see F-4-1 |
| `free-complete` | `npm run test:browser -- --grep @claim:free-complete` | PASS, 1 test |
| `encrypted-backup` | `npm test -- -t @claim:encrypted-backup` | PASS, 1 test |

The full six-test site suite also passed against the live origin, including
Axe, route focus, 404, mobile reflow, network interception, and offline reload.
No declared claim test failed. F-4-1, F-4-2, F-4-8, and F-4-9 concern claim
scope/completeness rather than a red test result.

## Copy audit

Method: visible landing and README prose, headings, links, action labels, and
instructions were counted. Hyphenated terms and inline paths count as one word.
Fenced command lines are excluded because they are commands, not sentences. No
unit exceeds 22 words; no banned marketing adjective appears. Flags link to the
findings above.

### Landing page

| ID | Words | Copy | Flag |
| --- | ---: | --- | --- |
| L01 | 4 | Skip to main content | — |
| L02 | 4 | Remote Web Task Recipes | — |
| L03 | 1 | Demo | — |
| L04 | 3 | How it works | — |
| L05 | 1 | Privacy | — |
| L06 | 2 | Download extension | — |
| L07 | 7 | For repeated tasks in hard-to-use browser software | — |
| L08 | 6 | Save landmarks for repeated browser tasks. | — |
| L09 | 16 | For people using screen readers or low vision who need to find the same controls again. | — |
| L10 | 5 | Try it with sample data | — |
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
| L29 | 9 | Text suggestions stay in placement; manual placement remains available. | — |
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
| L44 | 4 | Built by Param Factory | — |
| L45 | 8 | Original AI-assisted project artwork, reviewed by the maker. | F-4-8: unlisted, partly untestable provenance claim |

Landing buttons pass the result-naming check: **Try it with sample data** and
**Download extension** both start with verbs and name the outcome.

### README

| ID | Words | Copy | Flag |
| --- | ---: | --- | --- |
| R01 | 4 | Remote Web Task Recipes | — |
| R02 | 6 | Save landmarks for repeated browser tasks. | — |
| R03 | 14 | Remote Web Task Recipes is for screen-reader and low-vision users in hard-to-use browser software. | — |
| R04 | 12 | A user or support worker saves visual landmarks and spoken task steps. | — |
| R05 | 8 | The guide presents one step at a time. | — |
| R06 | 7 | Try the isolated sample before installing anything. | F-4-5: jargon |
| R07 | 4 | What the words mean | — |
| R08 | 10 | A notebook holds landmarks and task steps for one website. | — |
| R09 | 7 | A landmark is a saved visible location. | — |
| R10 | 9 | A task step is one instruction in a guide. | — |
| R11 | 3 | Install the extension | — |
| R12 | 7 | Download the extension and extract the ZIP. | — |
| R13 | 6 | Open chrome://extensions in Chrome or Chromium. | — |
| R14 | 4 | Turn on Developer mode. | — |
| R15 | 8 | Choose Load unpacked and select the extracted folder. | — |
| R16 | 10 | Pin the extension and open it from the browser toolbar. | — |
| R17 | 11 | The download is a Chrome extension (Manifest V3) for manual installation. | F-4-6: jargon |
| R18 | 5 | Use Remote Web Task Recipes | — |
| R19 | 10 | Create a notebook for the website you need to revisit. | — |
| R20 | 8 | Name a landmark and choose Place on app. | — |
| R21 | 9 | Point and click, or use Arrow keys and Enter. | — |
| R22 | 5 | Press Escape to cancel placement. | — |
| R23 | 12 | Add task steps and connect a step to a landmark when useful. | — |
| R24 | 9 | Start the guide from the editor or extension menu. | — |
| R25 | 7 | Use Previous, Next step, or Speak step. | F-4-7: button does not name the result |
| R26 | 4 | Escape closes the guide. | — |
| R27 | 7 | Export an encrypted backup from Backup & appearance. | — |
| R28 | 6 | Landmarks stay at saved screen positions. | — |
| R29 | 11 | Recheck them after the app, display scale, or window layout changes. | — |
| R30 | 3 | Privacy and limits | — |
| R31 | 7 | The extension does not operate the website. | — |
| R32 | 8 | It does not read passwords or page text. | F-4-1: overbroad privacy claim |
| R33 | 9 | A screenshot exists only while landmark placement is open. | — |
| R34 | 8 | The screenshot is not kept in extension storage. | — |
| R35 | 9 | Your browser may offer local text suggestions during placement. | — |
| R36 | 8 | Manual placement remains available with or without suggestions. | — |
| R37 | 8 | Notebook data uses storage inside the browser extension. | — |
| R38 | 12 | Each notebook works only on the exact website where you created it. | — |
| R39 | 12 | Backups hide notebook text and require the passphrase used to create them. | — |
| R40 | 11 | There are no accounts, payment flows, analytics, advertising, or remote APIs. | — |
| R41 | 7 | Every testable statement is listed in .factory/claims.json. | F-4-9: contradicted completeness claim |
| R42 | 6 | Read the privacy policy and terms. | — |
| R43 | 4 | Develop, test, and build | — |
| R44 | 7 | Use Node.js 20 or newer with npm. | F-4-10: unlisted compatibility claim |
| R45 | 11 | npm run build:site writes the site and extension ZIP to dist/site/. | —; directly verified |
| R46 | 9 | npm run build:extension writes the Chrome extension to .output/chrome-mv3/. | —; directly verified |
| R47 | 10 | npm run test:claims -- --grep @claim:&lt;id&gt; runs one declared site claim. | —; directly verified |
| R48 | 12 | Each extension claim records its own browser-test command in the claims file. | —; release-contract test passed |
| R49 | 2 | Project records | — |
| R50 | 2 | Opportunity brief | — |
| R51 | 5 | Visual system and artwork provenance | — |
| R52 | 2 | Demo sandbox | — |
| R53 | 2 | Repair handoff | — |
| R54 | 1 | License | — |
| R55 | 1 | MIT. | — |
| R56 | 2 | See LICENSE. | — |

## Structure, accessibility, links, and package

| Check | Result |
| --- | --- |
| Route titles | PASS: product/job title on `/`; route/product titles on Demo, Privacy, Terms, and 404; all ≤60 characters. |
| One h1, `lang`, `main`, heading order | PASS on all public routes. |
| Description, canonical, OG/Twitter, favicons | PASS on all routes including 404. Social image is 1200 × 630; Apple icon is 180 × 180. |
| Designed 404 | PASS: unknown URL returns HTTP 404, notebook-styled page, focused h1, and Home action. |
| Deep links, reload, back, route focus/announcement | PASS in the live six-test Playwright suite. |
| Link crawl | PASS: every internal URL found on `/`, `/demo/`, `/privacy/`, and `/terms/` returned 200; mail links were explicit. |
| Header/footer | FAIL header consistency/mobile navigation (F-4-3); footer passes on every route. |
| `robots.txt`, sitemap, security headers | PASS live. Sitemap lists all four public routes; CSP, HSTS, nosniff, frame denial, referrer, and permissions headers are present. |
| Console, overflow, reduced motion | PASS live at 390 px and desktop. |
| Accessibility | PASS: live Playwright Axe scan found no violations on all public routes; `verify-url.sh` found one h1, `lang=en`, main, complete alt text, labelled buttons, and zero errors. |
| Visual identity | PASS: warm ruled paper, red registration marks, mono labels, original notebook art, and physical shadows are distinct rather than a generic SaaS template. |
| Public ZIP | PASS: HTTP 200, 132,145 bytes, `unzip -t` clean, and all 26 entry names and contents match the fresh build. |
| README deployment instructions | FAIL (F-4-4). |

## Earlier finding re-check

Every earlier review, `.factory/polish-2.md`, and the prior handoff was read.
Live output was byte-identical to the clean build for all HTML routes, 404,
robots, and sitemap.

| Earlier finding | Live and code re-check | Status |
| --- | --- | --- |
| Review 1 B1 — no demo | One-click `/demo/`, banner, realistic sample, reset/exit, demo namespace, offline sample verified. | FIXED |
| Review 1 B2 — claims absent/unproved | 12 entries and exact tagged tests exist; every command passes. The DOM/page-text subclaim remains too broad and insufficiently tested. | **HALF-FIXED: F-4-1 (blocking)** |
| Review 1 B3 — fake 404 | Unknown route returns the designed 404 with status 404. | FIXED |
| Review 1 M1 — metadata/footer | Complete metadata, social art, sitemap, robots, legal/footer/build identity verified. | FIXED |
| Review 1 M2 — prior copy flags | The quoted metaphor, OCR, origin, AES, and overlong sentences were removed. | FIXED |
| Review 1 M3 — inconsistent object terms | Notebook, landmark, task step, and guide are defined consistently. | FIXED |
| Review 2 B1 — clean-clone claims fail | All 12 exact commands pass after only `npm ci`. | FIXED |
| Review 2 B2 — unproved visitor claims | Storage, capture lifetime, requests, suggestions, coordinates, free workflow, and package tests now observe their outcomes. The “read page text” row remains unproved and conflicts with screenshot text detection. | **HALF-FIXED: F-4-1 (blocking)** |
| Review 2 M1 — metadata/focus | Complete on every route and 404; h1 focus/back behavior passes live. | FIXED |
| Review 2 copy L23/L25/R17/R19/R39/R54 | Every quoted phrase was replaced as recorded in `polish-2.md`. | FIXED |
| Polish 2 claim that all findings are closed | Most mappings reproduce; the page-text mapping cites storage sentinels rather than an actual read detector. | **NOT CONFIRMED: F-4-1** |
| Prior handoff “Known gaps: None” | Not supported by this review; see F-4-1 through F-4-10. | SUPERSEDED |

## Quality-gate evidence

From the fresh clone:

- `npm run check` — PASS.
- `npm test` — PASS, 14/14.
- `npm run build` — PASS; `dist/site/` and the ZIP were produced.
- `npm run test:package` — PASS.
- All seven extension browser claims — PASS individually in fresh profiles.
- Full live site suite — PASS, 6/6.
- `npm audit --omit=dev --audit-level=critical` — PASS, 0 production
  vulnerabilities. `npm ci` still reports 10 development-tool advisories.

## Missed leverage

No finding. The brief calls for user-triggered local text suggestions, not a
generative model. The extension already provides that placement aid and an
encrypted import/export path. Adding a network AI step would weaken the central
local-first privacy boundary without an obvious required job benefit. No
provider key or Azure endpoint is embedded.

## What would make this perfect

Close F-4-1 through F-4-10: make the text-reading boundary literal and actually
test it, remove or test the two unlisted public claims, make **Start for real**
reach the install action, keep one usable header across routes and phone layouts,
document deployment, replace the two jargon
phrases, rename **Previous** to **Previous step**, correct the claims-completeness
statement, and verify or remove Node 20 support. Then repeat every claim command
and the complete live review from a fresh context. Until that produces zero
findings, the verdict remains **FAIL**.
