# Adversarial first-read review 8

**Product:** Remote Web Task Recipes  
**Reviewed:** 2026-08-28 UTC  
**Candidate:** `7dbfe0d5cff3aade8dfee05904148b4787d3f582`  
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>  
**Verdict:** **PASS**

No blocking or minor finding remains. This was a read-only product review; only
this report and the handoff were added.

## Cold first read

Fresh Chromium contexts loaded the live site at 390 x 844 and 1440 x 960. No
storage existed before either visit. Before scrolling, all three questions had
one clear answer:

| Question | First-read answer | Exact first-screen evidence |
| --- | --- | --- |
| What does this do? | It saves locations and instructions for repeated browser tasks. | “Save landmarks for repeated browser tasks.” |
| For whom? | Screen-reader and low-vision users who need to find the same controls again. | “For people using screen readers or low vision who need to find the same controls again.” |
| What should I click first? | Try the sample. | “Try it with sample data” and “See a named app, three landmarks, and spoken task steps.” |

At 390 px the headline, audience sentence, sample action, outcome note, and all
three facts end at y=751. There was no horizontal overflow and no console
error. The ruled-paper field-notebook art, registration pins, mono headings,
and specimen label are distinct from a generic SaaS template.

## Findings

None.

## Demo and sandbox verification

- The first filled landing action opens `/demo/`; `/?demo=1` redirects there.
- The fresh 390 px demo screen shows the persistent **“Demo — sample data,
  nothing is saved”** banner, Reset demo, Start for real, Northstar Payroll,
  **Review exceptions**, its numbered control, and the current task step.
- Fresh demo storage contained only `demo:remote-web-task-recipes`. Advancing
  then resetting returned the guide to **Step 1 of 3**. Start for real removed
  that key, returned to `/#support`, and focused **Download extension**.
- Network interception during entry, placement, guide advance, reset, and exit
  recorded only the production origin. The live site suite also reloaded the
  site shell after the first visit while offline.
- Pointer placement and Arrow, Shift+Arrow, Enter, and Escape are all exercised
  by the declared demo-positioning claim. The guide advance does not click the
  sample app.

## Claims

A clean clone at `/tmp/rwtr-review8-clean.Ge4wkI` was created from the reviewed
commit and initialized with `npm ci`. Every exact command in
`.factory/claims.json` passed separately:

| Claim ID | Result |
| --- | --- |
| `landing-preview` | PASS |
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

The live command `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm
run test:site` also passed 7/7. It covers the five site claims, mobile reflow,
Axe, route focus, the 404, and offline reload. Visitor-reliance copy maps to
these entries: sample content and placement (`landing-preview`, `demo-*`),
privacy and local storage (`site-private`, `extension-private`,
`local-notebooks`, `temporary-capture`), text suggestions
(`manual-suggestions`), guide limits (`user-control`), backup
(`encrypted-backup`), package (`package-ready`), and free use
(`free-complete`). No unlisted product claim was found on the landing, README,
Privacy, or Terms pages. Legal cautions are not performance promises.

## Copy audit

All landing and README units were checked against their current sources. No
unit exceeds 22 words. No banned marketing word, unexplained product jargon,
inconsistent core term, contextless heading, or non-result-naming action was
found. `notebook`, `landmark`, `task step`, and `guide` retain their defined
meanings. The maintained source-checked audit is `.factory/copy-audit.md`;
the complete review matrix follows. Hyphenated forms count as one word.

### Landing

| ID | Words | Copy |
| --- | ---: | --- |
| L01 | 4 | Skip to main content |
| L02 | 4 | Remote Web Task Recipes |
| L03–L05 | 1 each | Home; Demo; Privacy |
| L06 | 2 | Download extension |
| L07 | 7 | For repeated tasks in hard-to-use browser software |
| L08 | 6 | Save landmarks for repeated browser tasks. |
| L09 | 16 | For people using screen readers or low vision who need to find the same controls again. |
| L10 | 5 | Try it with sample data |
| L11 | 10 | See a named app, three landmarks, and spoken task steps. |
| L12–L13 | 2 each | Free extension; No account |
| L14 | 6 | Notebook data stays in your browser |
| L15 | 4 | Preview the sample notebook |
| L16 | 6 | See a landmark and task step. |
| L17 | 8 | Northstar Payroll is a fictional sample browser app. |
| L18 | 4 | Notebook for one website |
| L19 | 2 | Northstar Payroll |
| L20 | 1 | northstar-payroll.example |
| L21 | 2 | Saved landmark |
| L22 | 9 | Review exceptions. Blue outlined button below the hours table. |
| L23 | 2 | Northstar Payroll |
| L24 | 3 | Timesheet: 16–31 August |
| L25 | 2 | Employee hours |
| L26 | 3 | Review exceptions 1 |
| L27 | 3 | Current task step |
| L28 | 3 | Submit August timesheet |
| L29 | 4 | Step 1 of 3 |
| L30 | 8 | Choose Review exceptions and check the Tuesday entry. |
| L31 | 4 | Landmark 1: Review exceptions. |
| L32 | 4 | Try the full sample |
| L33 | 4 | How to save landmarks |
| L34 | 3 | Save landmarks once. |
| L35 | 4 | Follow task steps later. |
| L36 | 3 | Name the website |
| L37 | 10 | A notebook holds landmarks and task steps for one website. |
| L38 | 2 | Place landmarks |
| L39 | 14 | Choose placement, then use a pointer or arrow keys to mark a visible control. |
| L40 | 3 | Follow task steps |
| L41 | 12 | Open the guide to read or hear one step at a time. |
| L42 | 5 | It never clicks for you. |
| L43 | 5 | What stays on your device |
| L44 | 6 | Your landmarks stay in your browser. |
| L45 | 7 | Notebooks use storage inside your browser extension. |
| L46 | 6 | Screenshots are removed when placement closes. |
| L47a | 5 | Text suggestions stay in placement. |
| L47b | 7 | Choose one or place a landmark yourself. |
| L48 | 6 | Backups are encrypted with your passphrase. |
| L49 | 6 | No analytics, ads, or remote control. |
| L50 | 4 | When to recheck landmarks |
| L51 | 6 | Landmarks stay at saved screen positions. |
| L52 | 11 | Recheck them after the app, display scale, or window layout changes. |
| L53 | 6 | Everything in the notebook is free |
| L54 | 6 | Use every feature without an account. |
| L55 | 13 | Landmarks, task guidance, speech, and encrypted backups are included in the extension download. |
| L56 | 2 | Free download |
| L57 | 14 | Install the package in Chrome or Chromium, then create a notebook for your website. |
| L58 | 2 | Download extension |
| L59 | 8 | Save landmarks and task steps for one website. |
| L60–L61 | 1 each | Privacy; Terms |
| L62 | 6 | Built by Param Factory · build 1.0.1 |
| L63 | 3 | AI-assisted project artwork. |
| L64 | 17 | Overhead field notebook with abstract browser panels, three red landmark markers, a pencil path, and a magnifier |

### README

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
| R47 | 10 | npm run test:claims -- --grep @claim:<id> runs one declared site claim. |
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

## Earlier findings rechecked

Every earlier `review-*`, `polish-*`, and handoff record was read. The source,
fresh-profile claim tests, and live site confirm the following earlier findings
are fixed, not merely marked fixed.

| Earlier finding(s) | Current confirmation |
| --- | --- |
| R1-B1; F-5-1 | `/demo/` and `?demo=1` enter the isolated Northstar sample; the phone viewport contains its landmark, control, and current step. |
| R1-B2.1–R1-B2.14 | The 15 separate claim commands pass from the clean clone, covering workflow, user gesture, useful suggestion labels, non-automation, exact website scope, temporary capture, encrypted backups, no external requests, coordinate limit, free access, package, keyboard movement, and restricted content scripts. |
| R1-B3 | `/not-a-real-route` returns 404 with “This page does not exist.” |
| R1-M1; R2-M1 | Live public routes have route-specific titles, description, canonical, OG/Twitter metadata, icons, consistent header/footer, focus, announcement, robots, sitemap, and a real 404. |
| R1-M2; R1-M3; R2-COPY-L23; R2-COPY-L25/R38; R2-COPY-R17; R2-COPY-R19; R2-COPY-R39; R2-COPY-R54 | The complete matrix above confirms plain, consistent terminology and result-naming controls. |
| R2-B1; R2-B2.1–R2-B2.9 | The clean clone builds after `npm ci`; storage, capture lifetime, requests, guide limits, suggestions, coordinates, free workflows, package, and unique claim tags are directly tested. |
| F-4-1–F-4-10 | Guide wording is narrow, privacy is observable, Start for real focuses the download, README deploy and install copy are literal, Previous step names its result, artwork provenance is tested, and recorded Node/npm versions match this run. |
| F-6-1 | The extension test selects a recorded **Submit payroll** label by keyboard, places its landmark, then verifies no OCR text or pixels persist. |
| F-6-2 | Live computed styles and the phone capture show the sample action filled and header download outlined. |
| F-6-3 | The source-checked audit is current; this review independently re-listed the units. |
| F-7-1 | The non-persistent Northstar preview is after the hero and before How to save landmarks, with landmark, pinned control, task step, and a full-demo link. |

## Structure and links

`/`, `/demo/`, `/privacy/`, `/terms/`, `/robots.txt`, `/sitemap.xml`, all
same-origin assets, and the download ZIP returned 200. The unknown route
returned 404. Browser Back after entering the demo restored focus to the
landing h1; direct route loads focus their h1, or Download extension for the
explicit Start-for-real target. All four public pages have exactly one h1 and a
main landmark. The live route/Axe check reported no accessibility violations.

## Missed leverage

No additional AI step is expected. The job deliberately keeps screenshots and
browser text local; an AI feature would require sending sensitive app content
and would weaken the stated privacy boundary. Encrypted export already covers
the useful transfer need. A cloud sync would likewise conflict with the
local-first, no-account product promise.

## What would make this perfect

Keep the clean-clone claim matrix, live mobile demo assertion, and copy-audit
source contract in release checks as the extension evolves. No product change
is currently required.
