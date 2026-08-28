# Adversarial first-read review 7

**Product:** Remote Web Task Recipes
**Reviewed:** 2026-08-28 UTC
**Candidate:** `3488606fbb5860c0f6d170d8125a0588b75ebe7b`
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>
**Verdict:** **FAIL**

One minor finding remains. The sample is clear, functional, and isolated, but the landing page omits the required in-page product preview. This review does not modify product code.

## Cold first read

Fresh Chromium contexts at 390 x 844 and 1440 x 960 loaded `/` with no console errors or horizontal overflow. Before scrolling, all three answers were clear.

| Question | Answer | Exact supporting text |
| --- | --- | --- |
| What does this do? | Saves locations for controls and task instructions so a person can find them again. | “Save landmarks for repeated browser tasks.” |
| For whom? | People using screen readers or low vision repeating browser work. | “For people using screen readers or low vision who need to find the same controls again.” |
| What should I click first? | Try the realistic sample. | “Try it with sample data” and “See a named app, three landmarks, and spoken task steps.” |

The phone screen showed that copy, the one filled sample action, and the three facts “Free extension,” “No account,” and “Notebook data stays in your browser” above the fold. The outlined header download control does not compete with the sample action. This first-read check passes.

## Findings, ordered by severity

### F-7-1 — Minor — The landing page has no product preview before its explanatory sections

**Location / exact evidence:** On `/`, after the first-screen facts and notebook artwork, the next content is **“How to save landmarks”** and three text-only method cards. The page promises **“See a named app, three landmarks, and spoken task steps.”**, but no rendered Northstar notebook, landmark, guide, or other product preview appears on the landing page itself. Those appear only after the visitor activates `/demo/`.

**Why this matters:** The one-click demo works, but the required landing skeleton calls for “the product itself or a live preview of it” before “How it works.” A scrolling visitor gets a promise and explanatory copy but no direct visual proof of the landmark-and-guide interface without leaving the page.

**Concrete fix:** Insert a real, accessible Northstar preview immediately after the hero and before **“How to save landmarks.”** Include one named landmark, its pinned payroll control, and the current task step; it may link to **“Try the full sample”** at `/demo/`. Keep it non-persistent if interactive. Add a site assertion for its position and demo link.

## Demo and sandbox behaviour

- The first landing action opens `/demo/`; `?demo=1` also enters the sample.
- The initial 390 x 844 screen visibly contains **“Demo — sample data, nothing is saved,”** Reset demo, Start for real, Northstar Payroll, the named **Review exceptions** landmark and pinned control, and **“CURRENT TASK STEP”** with its instruction.
- ArrowRight then Enter on landmark 3 changed only `demo:remote-web-task-recipes`. Reset restored bundled state. Start for real removed that key, navigated to `/#support`, and focused Download extension.
- Interception across entry, placement, reset, and exit observed only the site origin. Direct inspection observed no non-demo localStorage key.
- The site suite additionally exercises offline reload after a first visit. There is no visitor-facing offline claim.

## Claims verification

A new clone at `/tmp/rwtr-review7-clean.QcBpZE` was made from the candidate. After `npm ci`, every exact command recorded in `.factory/claims.json` passed.

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

The exact commands were logged in `/tmp/rwtr-review7-claims.log`; all fourteen ended in `PASS`. The clone also passed `npm run check`, `npm test` (16 tests), `npm run build`, `npm run test:package`, `npm run test:site` (6 tests), and `npm run test:browser` (8 tests). The largest built JavaScript is 4.84 kB raw / 1.84 kB gzip.

The live landing, README, Privacy, and Terms were cross-checked against the manifest. All visitor-reliance claims map to declared tests (demo workflow, privacy, origin, local notebooks, capture, suggestions, guide control, free use, backup, package, and artwork provenance). No unlisted product claim was found. Legal limits such as “It may not work with every browser-delivered or remote-desktop system” are cautions, not performance promises.

## Earlier findings rechecked

Every earlier review, polish record, and the prior handoff was read. This table confirms live behaviour and source/test coverage, rather than accepting a “fixed” label.

| Earlier ID | Current confirmation |
| --- | --- |
| Review 1 B1 | `/demo/` and `?demo=1` enter the isolated Northstar sample with banner, reset, and real-start exit. |
| Review 1 B2 | The 14-row manifest exists; every exact command passed from this clean clone. |
| Review 1 B3 | `/not-a-real-route` returns HTTP 404 and the designed “This page does not exist” route. |
| Review 1 M1 | Public routes have titles, descriptions, canonical, OG/Twitter, favicon/apple icon, robots, sitemap, and consistent footer. |
| Review 1 M2 | The complete audit below has no over-22-word, banned-word, jargon, contextless-heading, or action-name flag. |
| Review 1 M3 | Landing and README define and consistently use notebook, landmark, task step, and guide. |
| Review 2 B1 | `prepare:wxt` precedes the site build; all site claim commands pass cleanly. |
| Review 2 B2 | Fresh MV3 tests cover storage, origin, capture, suggestion, guide, free-use, backup, and requests. |
| Review 2 M1 | Live Privacy navigation and Back focus the respective h1 and update the polite announcement. |
| Review 4 F-4-1 | Guide-field/click boundaries are confirmed by fresh MV3 sentinels. |
| Review 4 F-4-2 | Privacy wording maps to extension privacy, capture, suggestion, and backup claims. |
| Review 4 F-4-3 | Start for real clears demo state and focuses `#download-extension`. |
| Review 4 F-4-4 | README identifies the Param Factory deployment handoff. |
| Review 4 F-4-5 | README uses plain sample wording, not unexplained “isolated.” |
| Review 4 F-4-6 | README no longer uses Manifest V3 as installer copy. |
| Review 4 F-4-7 | The sample action is named “Previous step.” |
| Review 4 F-4-8 | Artwork disclosure and recorded provenance pass `artwork-provenance`. |
| Review 4 F-4-9 | README now accurately says claims and their commands are recorded. |
| Review 4 F-4-10 | README reports the actually tested Node 22.23.2 and npm 10.9.8. |
| Review 5 F-5-1 | The first phone demo screen shows a landmark, control, and current step; the viewport is asserted. |
| Review 6 F-6-1 | Detected text is keyboard-operable, positions the landmark, and is discarded after capture. |
| Review 6 F-6-2 | Header download is outlined; only the sample action is filled. |
| Review 6 F-6-3 | The source-checked copy audit agrees with the current copy. |

None of those earlier IDs reopens. F-7-1 is a new landing-structure finding.

## Structure, accessibility, and visual checks

| Check | Result |
| --- | --- |
| Titles, language, one h1, main, description, canonical, OG/Twitter, favicon | PASS on `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html`. |
| Designed unknown route | PASS: unknown URL returns HTTP 404; `/404.html` provides a way home. |
| Deep links, reload, Back, focus, announcement | PASS: all named routes load directly; live Privacy navigation and Back focused the h1 with `aria-live="polite"`. |
| Links | PASS: every distinct internal link returned 200 (or is explicit mailto); the ZIP downloads. |
| Header/footer | PASS: common wordmark, skip link, <=4 nav links, legal links, Param Factory text, and build ID. |
| Accessibility | PASS: live axe-core WCAG 2 A/AA scans returned zero violations on five public routes; no console errors. |
| Security/privacy delivery | PASS: live CSP is self-only and demo interception recorded only the site origin. |
| Visual identity | PASS: ruled warm paper, registration marks, mono display type, notebook art, and 404 are product-specific, not generic SaaS. |
| Landing information order | **FAIL: F-7-1.** The product/live-preview segment is absent before the explanatory method. |

## Missed-leverage check

No additional AI feature is required. The brief needs local, explicit, temporary screenshot text help; a remote model would weaken its privacy boundary. The implemented local detected-text choice is useful and tested. Encrypted backup/export is present. Sync would conflict with the stated local-first boundary. No provider key or decorative runtime AI was found.

## Copy audit

Every landing and README unit, its word count, and the terminology table are recorded in the source-checked [copy audit](copy-audit.md). I independently checked that its 46 landing and 59 README entries match the current source, including the image alt text and build label. It covers more than sentence-only copy: headings, navigation, actions, facts, and literal installation labels. No unit exceeds 22 words. No banned marketing adjective, unexplained jargon, inconsistent core term, contextless heading, or non-result-naming action button was found. The table below repeats the verified audit; `tests/release-contract.test.ts` checks its source/count/sequence contract.

### Full landing and README audit

| ID | Words | Copy |
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
| L29 | 12 | Text suggestions stay in placement. Choose one or place a landmark yourself. |
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
| L44 | 6 | Built by Param Factory · build 1.0.1 |
| L45 | 3 | AI-assisted project artwork. |
| L46 | 17 | Overhead field notebook with abstract browser panels, three red landmark markers, a pencil path, and a magnifier |

| ID | Words | Copy |
| --- | ---: | --- |
| R01 | 4 | Remote Web Task Recipes |
| R02 | 6 | Save landmarks for repeated browser tasks. |
| R03 | 14 | Remote Web Task Recipes is for screen-reader and low-vision users in hard-to-use browser software. |
| R04 | 12 | A user or support worker saves visual landmarks and spoken task steps. |
| R05 | 8 | The guide presents one step at a time. |
| R06 | 10 | Try the sample without changing your notebooks before installing anything. |
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
| R26 | 4 | Escape closes the guide. |
| R27 | 7 | Export an encrypted backup from Backup & appearance. |
| R28 | 6 | Landmarks stay at saved screen positions. |
| R29 | 11 | Recheck them after the app, display scale, or window layout changes. |
| R30 | 3 | Privacy and limits |
| R31 | 11 | The guide does not inspect page fields or click the website. |
| R32 | 12 | During placement, your browser may identify text visible in the temporary screenshot. |
| R33 | 9 | A screenshot exists only while landmark placement is open. |
| R34 | 8 | The screenshot is not kept in extension storage. |
| R35 | 8 | Your browser may suggest visible text during placement. |
| R36 | 11 | Choose a label to position a landmark, or place it manually. |
| R37 | 8 | Notebook data uses storage inside the browser extension. |
| R38 | 12 | Each notebook works only on the exact website where you created it. |
| R39 | 12 | Backups hide notebook text and require the passphrase used to create them. |
| R40 | 11 | There are no accounts, payment flows, analytics, advertising, or remote APIs. |
| R41 | 10 | Product claims and their test commands are recorded in .factory/claims.json. |
| R42 | 6 | Read the privacy policy and terms. |
| R43 | 4 | Develop, test, and build |
| R44 | 11 | These release checks were run with Node.js 22.23.2 and npm 10.9.8. |
| R45 | 11 | npm run build:site writes the site and extension ZIP to dist/site/. |
| R46 | 9 | npm run build:extension writes the Chrome extension to .output/chrome-mv3/. |
| R47 | 10 | npm run test:claims -- --grep @claim:&lt;id&gt; runs one declared site claim. |
| R48 | 12 | Each extension claim records its own browser-test command in the claims file. |
| R49 | 1 | Deploy |
| R50 | 13 | Run npm run build, then give dist/site/ to the Param Factory deployment job. |
| R51 | 9 | Do not manage DNS or infrastructure from this repository. |
| R52 | 2 | Project records |
| R53 | 2 | Opportunity brief |
| R54 | 5 | Visual system and artwork provenance |
| R55 | 2 | Demo sandbox |
| R56 | 2 | Repair handoff |
| R57 | 1 | License |
| R58 | 1 | MIT. |
| R59 | 2 | See LICENSE. |

## What would make this perfect

Add the tested, accessible landing-page product preview described in F-7-1. With that present, the cold copy, one-click sample, sandbox isolation, claim suite, routing/metadata, accessibility, privacy boundary, and product-specific visual system have no other observed gap.
