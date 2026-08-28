# Demo sandbox

Open `/demo/` or `/?demo=1` to enter the sample notebook. It contains the
fictional Northstar Payroll website, three named landmarks, and three steps for
submitting an August timesheet. At 390 px, the first screen includes a compact
live view of landmark 1, its pinned Northstar control, and the current task
step. No extension install or account is needed.

The persistent banner says **Demo — sample data, nothing is saved**. **Reset
demo** restores the sample; **Start for real** removes the demo state and takes
you to the focused **Download extension** action. Demo data uses only the localStorage key
`demo:remote-web-task-recipes`. The extension does not read it, and the demo
does not read or write extension storage. **Move landmark 3** opens real sample
placement: pointer clicks or Arrow keys move it, Enter saves it, and Escape
cancels. **Speak step** uses the browser's speech output.

The bundled state is defined in `site/demo/main.ts`. It has no link to the
extension's `notebookState` key. Claim tests start with a fresh browser context,
inspect every site-storage key, and intercept the complete sample flow.

The landing page has a non-persistent Northstar preview before its three-step
method. **Try the full sample** opens this same `/demo/` sandbox; the preview
does not create or read demo storage.
