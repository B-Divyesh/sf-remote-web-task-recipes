import '../site.css';
import { focusRouteHeading } from '../route-focus';

type Landmark = { name: string; cue: string; x: number; y: number };
type DemoState = { landmarks: Landmark[]; step: number };
const key = 'demo:remote-web-task-recipes';
const sample: DemoState = { landmarks: [
  { name: 'Review exceptions', cue: 'Blue outlined button below the hours table.', x: .66, y: .76 },
  { name: 'Submit timesheet', cue: 'Solid blue button at the lower right.', x: .91, y: .76 },
  { name: 'Confirmation area', cue: 'Message area above the buttons.', x: .9, y: .2 }
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
const glanceCount = document.querySelector<HTMLElement>('#glance-guide-count')!;
const glanceLandmarkName = document.querySelector<HTMLElement>('#glance-landmark-name')!;
const glanceStep = document.querySelector<HTMLElement>('#glance-guide-step')!;
const placement = document.querySelector<HTMLElement>('#placement-status')!;
const guideStatus = document.querySelector<HTMLElement>('#guide-status')!;
const placementLayer = document.querySelector<HTMLElement>('#practice-layer')!;
const practicePin = placementLayer.querySelector<HTMLElement>('.practice-pin')!;
const landmarkThree = document.querySelector<HTMLElement>('#landmark-three')!;
let draftPosition = { x: .5, y: .5 };

function readState(): DemoState { try { return JSON.parse(localStorage.getItem(key) ?? '') as DemoState; } catch { return structuredClone(sample); } }
function validState(value: DemoState): boolean {
  return Array.isArray(value.landmarks)
    && value.landmarks.length === 3
    && value.landmarks.every((item) => typeof item.name === 'string' && Number.isFinite(item.x) && Number.isFinite(item.y))
    && Number.isInteger(value.step)
    && value.step >= 0
    && value.step < steps.length;
}
function save() { localStorage.setItem(key, JSON.stringify(state)); }
function render() {
  list.innerHTML = state.landmarks.map((item, index) => `<li><span class="number-pin" aria-hidden="true">${index + 1}</span><span><strong>${item.name}</strong><small>${item.cue}</small></span></li>`).join('');
  const current = state.step;
  count.textContent = `Step ${current + 1} of ${steps.length}`;
  step.textContent = steps[current];
  landmark.textContent = `Landmark ${current + 1}: ${state.landmarks[current]?.name ?? 'Sample landmark'}.`;
  glanceCount.textContent = `Step ${current + 1} of ${steps.length}`;
  glanceLandmarkName.textContent = state.landmarks[0]?.name ?? 'Sample landmark';
  glanceStep.textContent = steps[current];
  (document.querySelector<HTMLButtonElement>('#previous-step')!).disabled = current === 0;
  document.querySelector<HTMLButtonElement>('#next-step')!.textContent = current === steps.length - 1 ? 'Start again' : 'Next step';
  const third = state.landmarks[2];
  if (third) {
    landmarkThree.style.left = `${third.x * 100}%`;
    landmarkThree.style.top = `${third.y * 100}%`;
  }
}
function paintDraft() {
  practicePin.style.left = `${draftPosition.x * 100}%`;
  practicePin.style.top = `${draftPosition.y * 100}%`;
}
function closePlacement(message: string) {
  placementLayer.hidden = true;
  placement.textContent = message;
  document.querySelector<HTMLButtonElement>('#place-landmark')?.focus();
}
function openPlacement() {
  const current = state.landmarks[2] ?? sample.landmarks[2];
  draftPosition = { x: current.x, y: current.y };
  paintDraft();
  placementLayer.hidden = false;
  placement.textContent = 'Placement is open over the sample app.';
  placementLayer.focus();
}
function commitPlacement() {
  const current = state.landmarks[2];
  current.x = draftPosition.x;
  current.y = draftPosition.y;
  current.cue = `Saved at ${Math.round(current.x * 100)}% across and ${Math.round(current.y * 100)}% down.`;
  save();
  render();
  closePlacement('Landmark 3 saved in demo storage.');
}
function reset() { state = structuredClone(sample); save(); render(); placementLayer.hidden = true; placement.textContent = 'Sample notebook reset.'; guideStatus.textContent = ''; }
state = readState();
if (!localStorage.getItem(key) || !validState(state)) {
  state = structuredClone(sample);
  save();
  render();
  placement.textContent = 'Sample notebook ready.';
} else render();
document.querySelector('#reset-demo')?.addEventListener('click', reset);
document.querySelector('#start-real')?.addEventListener('click', () => localStorage.removeItem(key));
document.querySelector('#place-landmark')?.addEventListener('click', openPlacement);
document.querySelector('#save-placement')?.addEventListener('click', commitPlacement);
document.querySelector('#cancel-placement')?.addEventListener('click', () => closePlacement('Placement cancelled. No sample data changed.'));
placementLayer.addEventListener('pointerdown', (event) => {
  if ((event.target as HTMLElement).closest('.practice-panel')) return;
  const box = placementLayer.getBoundingClientRect();
  draftPosition = {
    x: Math.min(1, Math.max(0, (event.clientX - box.left) / box.width)),
    y: Math.min(1, Math.max(0, (event.clientY - box.top) / box.height))
  };
  paintDraft();
  commitPlacement();
});
placementLayer.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { event.preventDefault(); closePlacement('Placement cancelled. No sample data changed.'); return; }
  if (event.key === 'Enter' && event.target === placementLayer) { event.preventDefault(); commitPlacement(); return; }
  if (!event.key.startsWith('Arrow')) return;
  event.preventDefault();
  const distance = event.shiftKey ? .05 : .01;
  if (event.key === 'ArrowLeft') draftPosition.x = Math.max(0, draftPosition.x - distance);
  if (event.key === 'ArrowRight') draftPosition.x = Math.min(1, draftPosition.x + distance);
  if (event.key === 'ArrowUp') draftPosition.y = Math.max(0, draftPosition.y - distance);
  if (event.key === 'ArrowDown') draftPosition.y = Math.min(1, draftPosition.y + distance);
  paintDraft();
  placement.textContent = `Landmark at ${Math.round(draftPosition.x * 100)}% across and ${Math.round(draftPosition.y * 100)}% down.`;
});
document.querySelector('#next-step')?.addEventListener('click', () => { state.step = state.step === steps.length - 1 ? 0 : state.step + 1; save(); render(); guideStatus.textContent = 'Guide updated. The sample app was not clicked.'; });
document.querySelector('#previous-step')?.addEventListener('click', () => { state.step = Math.max(0, state.step - 1); save(); render(); guideStatus.textContent = 'Guide updated. The sample app was not clicked.'; });
document.querySelector('#speak-step')?.addEventListener('click', () => {
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(`${steps[state.step]} ${landmark.textContent}`));
  document.body.dataset.spoken = 'true';
  guideStatus.textContent = 'Speaking the current task step.';
});
focusRouteHeading();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) void navigator.serviceWorker.register('/sw.js');
