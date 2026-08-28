import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import '../site.css';

type Landmark = { name: string; cue: string };
type DemoState = { landmarks: Landmark[]; step: number };
const key = 'demo:remote-web-task-recipes';
const sample: DemoState = { landmarks: [
  { name: 'Review exceptions', cue: 'Blue outlined button below the hours table.' },
  { name: 'Submit timesheet', cue: 'Solid blue button at the lower right.' },
  { name: 'Confirmation area', cue: 'Message area above the buttons.' }
], step: 0 };
const steps = [
  'Choose Review exceptions and check the Tuesday entry.',
  'Choose Submit timesheet at landmark 2.',
  'Read the confirmation at landmark 3 before leaving the page.'
];
let state: DemoState;
const list = document.querySelector<HTMLOListElement>('#landmark-list')!;
const step = document.querySelector<HTMLElement>('#guide-step')!;
const count = document.querySelector<HTMLElement>('#guide-count')!;
const landmark = document.querySelector<HTMLElement>('#guide-landmark')!;
const placement = document.querySelector<HTMLElement>('#placement-status')!;
const guideStatus = document.querySelector<HTMLElement>('#guide-status')!;

function readState(): DemoState { try { return JSON.parse(localStorage.getItem(key) ?? '') as DemoState; } catch { return structuredClone(sample); } }
function save() { localStorage.setItem(key, JSON.stringify(state)); }
function render() {
  list.innerHTML = state.landmarks.map((item, index) => `<li><span class="number-pin" aria-hidden="true">${index + 1}</span><span><strong>${item.name}</strong><small>${item.cue}</small></span></li>`).join('');
  const current = state.step;
  count.textContent = `Step ${current + 1} of ${steps.length}`;
  step.textContent = steps[current];
  landmark.textContent = `Landmark ${current + 1}: ${state.landmarks[current]?.name ?? 'Sample landmark'}.`;
  (document.querySelector<HTMLButtonElement>('#previous-step')!).disabled = current === 0;
  document.querySelector<HTMLButtonElement>('#next-step')!.textContent = current === steps.length - 1 ? 'Start again' : 'Next step';
}
function reset() { state = structuredClone(sample); save(); render(); placement.textContent = 'Sample notebook reset.'; guideStatus.textContent = ''; }
state = readState(); if (!Array.isArray(state.landmarks) || !Number.isInteger(state.step) || !localStorage.getItem(key)) reset(); else render();
document.querySelector('#reset-demo')?.addEventListener('click', reset);
document.querySelector('#start-real')?.addEventListener('click', () => localStorage.removeItem(key));
document.querySelector('#place-landmark')?.addEventListener('click', () => { placement.textContent = 'Placement is ready. Use arrow keys, then Enter to save a landmark in the extension.'; });
document.querySelector<HTMLButtonElement>('#place-landmark')?.addEventListener('keydown', (event) => { if (event.key === 'Escape') { placement.textContent = 'Placement cancelled. No sample data changed.'; } });
document.querySelector('#next-step')?.addEventListener('click', () => { state.step = state.step === steps.length - 1 ? 0 : state.step + 1; save(); render(); guideStatus.textContent = 'Guide updated. The sample app was not clicked.'; });
document.querySelector('#previous-step')?.addEventListener('click', () => { state.step = Math.max(0, state.step - 1); save(); render(); guideStatus.textContent = 'Guide updated. The sample app was not clicked.'; });
document.querySelector('#speak-step')?.addEventListener('click', () => { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(`${steps[state.step]} ${landmark.textContent}`)); guideStatus.textContent = 'Speaking the current task step.'; });
if ('serviceWorker' in navigator && location.protocol === 'https:') void navigator.serviceWorker.register('/sw.js');
