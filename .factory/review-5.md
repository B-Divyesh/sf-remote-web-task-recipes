# Adversarial first-read review 5

**Product:** Remote Web Task Recipes  
**Reviewed:** 2026-08-28 UTC  
**Candidate:** `066b409d527a267a9bfd39a3ccafc3b297c1f7eb`  
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>  
**Verdict:** **FAIL**

One blocking finding remains. The demo exists, is isolated, and works, but its
first phone viewport does not yet show the product in use. This reopens the
mobile portion of review 1's demo finding.

## Cold first read

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 960 without prior
storage. Before scrolling, the answers were clear on both sizes:

| Question | First-read answer | Evidence on the first screen |
| --- | --- | --- |
| What does it do? | It saves visual landmarks and task steps for repeated browser work. | “Save landmarks for repeated browser tasks.” |
| For whom? | People using a screen reader or low vision who must find the same browser controls again. | “For people using screen readers or low vision who need to find the same controls again.” |
| What should I click first? | Try the sample. | “Try it with sample data” and “See a named app, three landmarks, and spoken task steps.” |

The title, action, audience sentence, and three facts are visible at 390 px;
there was no horizontal overflow or initial console error. The warm ruled-paper
notebook artwork and numbered-pins language are product-specific rather than a
generic SaaS template.

## Findings, ordered by severity

### F-5-1 — BLOCKING — The one-click demo does not show the working sample in the first 390 px screen

**Reopens:** Review 1 B1 (demo) as a mobile half-fix.

**Location / exact visible text:** After tapping landing-page **“Try it with
sample data”** in a fresh 390 × 844 context, the initial `/demo/` viewport
contains the persistent banner, navigation, **“Find the payroll submit control
again.”**, and **“This sample is for Northstar Payroll…”**. At the bottom it
only reaches the top of a card: **“Notebook for one website / Northstar
Payroll / northstar-payroll.example / Three landmarks”**. It does not show a
landmark row, the illustrated payroll controls, or the task-step guide without
scrolling.

**Why this fails the first-use check:** The required one-click path is present,
but on the target phone the first screen still looks like a second landing
hero. It does not yet look like a notebook being used with realistic sample
data. The promised “three landmarks, and spoken task steps” are below the
viewport, so a visitor cannot confirm the value immediately.

**Concrete fix:** On the 390 px layout, reduce or collapse the demo introduction
and make the first screen show at least one named landmark, the Northstar
timesheet control/pin, and the current guide step together. Keep the banner and
its controls. Add a mobile visual/layout assertion to `@claim:demo-workflow`
that, at 390 × 844 before scrolling, a landmark row and the current task step
both intersect the viewport. This must be a real viewport assertion, not only
DOM visibility.

## Demo and sandbox verification

| Check | Result |
| --- | --- |
| One-click entry | PASS: landing action opens `/demo/`; `?demo=1` redirects to the same demo. |
| Named realistic sample | PASS after scrolling: Northstar Payroll, three named landmarks, payroll rows, three timesheet steps, and speech action are present. |
| First phone viewport already demonstrates use | **FAIL: F-5-1.** |
| Demo banner | PASS: “Demo — sample data, nothing is saved,” Reset demo, and Start for real are persistent. |
| Reset | PASS: the claim test mutates the guide, resets it to step 1, and restores bundled data. |
| Isolation / exit | PASS: fresh demo storage contains only `demo:remote-web-task-recipes`; Start for real removes it and focuses Download extension. The extension namespace is not read or written. |
| Privacy network check | PASS: captured landing-to-demo requests were all same-origin; the full site privacy claim intercepts placement, guide advance, reset, and exit. |
| Offline | PASS: the site shell reloads after the first visit while offline. This is tested even though no visitor-facing offline promise is made. |

## Claims verification

A clean clone was made at `/tmp/rwtr-review-5-clean` from the candidate commit,
then `npm ci` was run. All fourteen declared tagged tests passed. The complete
site, packaged-extension, unit, build, and package gates also passed in that
clone.

| Claim ID | Result |
| --- | --- |
| `demo-workflow` | PASS |
| `demo-isolation` | PASS |
| `demo-positioning` | PASS |
| `site-private` | PASS |
| `extension-private` | PASS |
| `package-ready` | PASS |
| `capture-and-origin-scope` | PASS |
| `local-notebooks` | PASS |
| `temporary-capture` | PASS |
| `manual-suggestions` | PASS |
| `user-control` | PASS |
| `free-complete` | PASS |
| `encrypted-backup` | PASS |
| `artwork-provenance` | PASS |

Commands additionally confirmed: `npm run check`, `npm test` (15/15),
`npm run test:site` (6/6, including Axe and offline reload), `npm run
test:browser` (8/8), `npm run build`, and `npm run test:package`.

The live landing and README were cross-checked against `.factory/claims.json`.
All visitor-reliance claims map to one or more listed tests: sample workflow and
placement (`demo-*`); local/no-network storage statements (`site-private`,
`extension-private`, `local-notebooks`, `temporary-capture`); guide
non-automation (`user-control`); suggestions (`manual-suggestions`);
encrypted backup (`encrypted-backup`); and account/payment/free download
(`free-complete`, `package-ready`). No unlisted landing or README claim was
found.

## Copy audit

Word counts use visible copy units; hyphenated terms count as one word. Commands
are included when they form README visitor instructions. No unit exceeds 22
words. No banned marketing adjective, undefined visitor jargon, inconsistent
core term, contextless heading, or non-result-naming button was found. The
single primary action and operating buttons name their outcomes.

The following independently checked audit lists every landing and README copy
unit and its count:

# Copy audit — perfection loop round 4

Audited 2026-08-28 after the round-4 repair. Hyphenated terms count as one
word. Commands are excluded because they are commands, not visitor sentences.
The first screen has a six-word job headline, a 16-word audience sentence, one
sample action, its immediate outcome, and three short facts. No item below is
over 22 words or uses a banned marketing word.

## Landing page

| ID | Words | Visible copy |
| --- | ---: | --- |
| L01 | 4 | Skip to main content |
| L02 | 4 | Remote Web Task Recipes |
| L03 | 1 | Home |
| L04 | 1 | Demo |
| L05 | 1 | Privacy |
| L06 | 2 | Download extension |
| L07 | 7 | For repeated tasks in hard-to-use browser software |
| L08 | 6 | Save landmarks for repeated browser tasks. |
| L09 | 16 | For people using screen readers or low vision who need to find the same controls again. |
| L10 | 5 | Try it with sample data |
| L11 | 10 | See a named app, three landmarks, and spoken task steps. |
| L12 | 2 | Free extension |
| L13 | 2 | No account |
| L14 | 6 | Notebook data stays in your browser |
| L15 | 4 | How to save landmarks |
| L16 | 3 | Save landmarks once. |
| L17 | 4 | Follow task steps later. |
| L18 | 3 | Name the website |
| L19 | 10 | A notebook holds landmarks and task steps for one website. |
| L20 | 2 | Place landmarks |
| L21 | 14 | Choose placement, then use a pointer or arrow keys to mark a visible control. |
| L22 | 3 | Follow task steps |
| L23 | 12 | Open the guide to read or hear one step at a time. |
| L24 | 5 | It never clicks for you. |
| L25 | 5 | What stays on your device |
| L26 | 6 | Your landmarks stay in your browser. |
| L27 | 7 | Notebooks use storage inside your browser extension. |
| L28 | 6 | Screenshots are removed when placement closes. |
| L29 | 9 | Text suggestions stay in placement; manual placement remains available. |
| L30 | 6 | Backups are encrypted with your passphrase. |
| L31 | 6 | No analytics, ads, or remote control. |
| L32 | 4 | When to recheck landmarks |
| L33 | 6 | Landmarks stay at saved screen positions. |
| L34 | 11 | Recheck them after the app, display scale, or window layout changes. |
| L35 | 6 | Everything in the notebook is free |
| L36 | 6 | Use every feature without an account. |
| L37 | 13 | Landmarks, task guidance, speech, and encrypted backups are included in the extension download. |
| L38 | 2 | Free download |
| L39 | 14 | Install the package in Chrome or Chromium, then create a notebook for your website. |
| L40 | 2 | Download extension |
| L41 | 8 | Save landmarks and task steps for one website. |
| L42 | 1 | Privacy |
| L43 | 1 | Terms |
| L44 | 4 | Built by Param Factory |
| L45 | 3 | AI-assisted project artwork. |

## README

| ID | Words | Visible copy |
| --- | ---: | --- |
| R01 | 4 | Remote Web Task Recipes |
| R02 | 6 | Save landmarks for repeated browser tasks. |
| R03 | 14 | Remote Web Task Recipes is for screen-reader and low-vision users in hard-to-use browser software. |
| R04 | 12 | A user or support worker saves visual landmarks and spoken task steps. |
| R05 | 8 | The guide presents one step at a time. |
| R06 | 7 | Try the sample without changing your notebooks. |
| R07 | 4 | What the words mean |
| R08 | 10 | A notebook holds landmarks and task steps for one website. |
| R09 | 7 | A landmark is a saved visible location. |
| R10 | 9 | A task step is one instruction in a guide. |
| R11 | 3 | Install the extension |
| R12 | 7 | Download the extension and extract the ZIP. |
| R13 | 6 | Open chrome://extensions in Chrome or Chromium. |
| R14 | 4 | Turn on Developer mode. |
| R15 | 8 | Choose Load unpacked and select the extracted folder. |
| R16 | 10 | Pin the extension and open it from the browser toolbar. |
| R17 | 9 | The download is a Chrome extension for manual installation. |
| R18 | 5 | Use Remote Web Task Recipes |
| R19 | 10 | Create a notebook for the website you need to revisit. |
| R20 | 8 | Name a landmark and choose Place on app. |
| R21 | 9 | Point and click, or use Arrow keys and Enter. |
| R22 | 5 | Press Escape to cancel placement. |
| R23 | 12 | Add task steps and connect a step to a landmark when useful. |
| R24 | 9 | Start the guide from the editor or extension menu. |
| R25 | 8 | Use Previous step, Next step, or Speak step. |
| R26 | 5 | Escape closes the guide. |
| R27 | 7 | Export an encrypted backup from Backup & appearance. |
| R28 | 6 | Landmarks stay at saved screen positions. |
| R29 | 11 | Recheck them after the app, display scale, or window layout changes. |
| R30 | 3 | Privacy and limits |
| R31 | 10 | The guide does not inspect page fields or click the website. |
| R32 | 12 | During placement, your browser may identify text visible in the temporary screenshot. |
| R33 | 9 | A screenshot exists only while landmark placement is open. |
| R34 | 8 | The screenshot is not kept in extension storage. |
| R35 | 8 | Your browser may offer local text suggestions during placement. |
| R36 | 8 | Manual placement remains available with or without suggestions. |
| R37 | 8 | Notebook data uses storage inside the browser extension. |
| R38 | 12 | Each notebook works only on the exact website where you created it. |
| R39 | 12 | Backups hide notebook text and require the passphrase used to create them. |
| R40 | 11 | There are no accounts, payment flows, analytics, advertising, or remote APIs. |
| R41 | 10 | Product claims and their test commands are recorded in claims.json. |
| R42 | 6 | Read the privacy policy and terms. |
| R43 | 4 | Develop, test, and build |
| R44 | 10 | These release checks were run with Node.js 22.23.2 and npm 10.9.8. |
| R45 | 11 | npm run build:site writes the site and extension ZIP to dist/site/. |
| R46 | 9 | npm run build:extension writes the Chrome extension to .output/chrome-mv3/. |
| R47 | 10 | npm run test:claims -- --grep @claim:&lt;id&gt; runs one declared site claim. |
| R48 | 12 | Each extension claim records its own browser-test command in the claims file. |
| R49 | 1 | Deploy |
| R50 | 14 | Run npm run build, then give dist/site/ to the Param Factory deployment job. |
| R51 | 9 | Do not manage DNS or infrastructure from this repository. |
| R52 | 2 | Project records |
| R53 | 2 | Opportunity brief |
| R54 | 5 | Visual system and artwork provenance |
| R55 | 2 | Demo sandbox |
| R56 | 2 | Repair handoff |
| R57 | 1 | License |
| R58 | 1 | MIT. |
| R59 | 2 | See LICENSE. |

## Terminology

| Concept | One user-facing term |
| --- | --- |
| Container for one website | notebook |
| Saved visual location | landmark |
| One guide instruction | task step |
| Guided sequence | guide |
| Isolated sample state | demo |
| Landmark locator details | landmark description |

## Flags

None. The README says the exact Node/npm environment that was verified; it no
longer implies unverified Node 20 support. “Previous step” names the guide
action, and the deploy section names the factory handoff boundary.


## Structure, accessibility, and links

| Check | Result |
| --- | --- |
| Titles | PASS: 45-character job title on home; plain Demo/Privacy/Terms product titles and a 40-character 404 title. |
| Metadata | PASS: `lang`, one h1, main, description, canonical, OG/Twitter, SVG favicon, and Apple touch icon on public pages. |
| Routing | PASS: direct `/demo/`, `/?demo=1`, Privacy, Terms, reload, back focus, and unknown route work. Unknown route returns HTTP 404 with the notebook-styled “This page does not exist.” screen. |
| Focus and accessibility | PASS: direct loads and completed navigation focus the route h1; site Axe run has zero violations; 390 px has no overflow; reduced motion test passes. |
| Links | PASS: landing anchor crawl returned 200 for Home, Demo, Privacy, Terms, and the in-page target; the extension link is an explicit download. |
| Header/footer | PASS: consistent four-link header; footer carries Privacy, Terms, Param Factory attribution, and build id. |
| Visual identity | PASS: implementation matches the recorded field-notebook palette, type, art provenance, registration-pin language, and non-generic layout. |
| Missed leverage / AI | PASS: the brief does not require runtime AI. Local manual placement is the privacy-preserving primary path; encrypted backup export/import is present. AI is disclosed only as build-time artwork provenance and no provider key or runtime AI endpoint is embedded. |

## Earlier findings re-check

The following was confirmed against both live behavior and the current code,
not merely the repair ledger.

| Earlier finding(s) | Status in this review | Evidence |
| --- | --- | --- |
| R1 B1 (no demo) | **HALF-FIXED — F-5-1** | Entry, banner, isolation, reset, exit, and realistic sample work; the 390 px first-view requirement does not. |
| R1 B2.1–B2.14 (claims absent/unproved) | FIXED | Fourteen manifest entries and fourteen observable tagged tests pass in a clean clone. |
| R1 B3 (fake 404) | FIXED | `/not-a-real-route` is HTTP 404 with the designed 404 page. |
| R1 M1 (metadata/footer) | FIXED | Every public HTML route has complete metadata and the shared footer. |
| R1 M2 (copy) and M3 (terms) | FIXED | Full audit above; notebook, landmark, task step, and guide remain consistent. |
| R2 B1 (clean-clone claims) | FIXED | `npm ci` followed by all claim and quality commands passes. |
| R2 B2.1–B2.9 (storage, capture, network, manual placement, coordinates, free flow, package, claim coverage) | FIXED | Fresh-profile browser tests and site tests observe every stated outcome. |
| R2 M1 (metadata/focus) | FIXED | Route titles/metadata and navigation/back focus pass live. |
| R2 copy L23/L25/R17/R19/R39/R54 | FIXED | The formerly vague/technical phrases remain absent from visitor copy. |
| F-4-1 through F-4-10 | FIXED | Guide claim stays limited to no field inspection/clicking; privacy wording, phone exit, deployment instructions, plain wording, named Previous step, artwork disclosure, claims wording, and verified runtime wording remain as repaired. |

## What would make this perfect

Make the mobile demo screen immediately display a real landmark and current
guide step alongside Northstar Payroll, then lock that behavior with a 390 px
viewport test. With F-5-1 closed, this review has no remaining finding.
