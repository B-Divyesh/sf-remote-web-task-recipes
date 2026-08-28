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
