import { browser } from 'wxt/browser';
import { loadState, saveState } from '../src/storage';
import type { ExtensionMessage, Landmark, TaskRecipe } from '../src/types';

type TextRegion = { rawValue?: string; boundingBox?: DOMRectReadOnly };
type TextDetectorConstructor = new () => { detect(source: ImageBitmapSource): Promise<TextRegion[]> };

const overlayCss = `
  :host{all:initial;color:#172b32;font-family:Verdana,sans-serif;font-size:18px;line-height:1.5}
  *{box-sizing:border-box}.veil{position:fixed;inset:0;z-index:2147483647;background:#07191ed9;color:#fff}
  .shot{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;opacity:.58}
  .aim{position:absolute;width:44px;height:44px;transform:translate(-50%,-50%);border:4px solid #fff;border-radius:50%;box-shadow:0 0 0 5px #a13d32;pointer-events:none}
  .aim:before,.aim:after{content:"";position:absolute;background:#fff}.aim:before{height:4px;width:76px;left:-20px;top:16px}.aim:after{width:4px;height:76px;left:16px;top:-20px}
  .panel{position:absolute;right:24px;top:24px;width:min(440px,calc(100% - 48px));background:#fffdf7;color:#172b32;border:3px solid #172b32;border-radius:8px;padding:20px;box-shadow:6px 7px 0 #172b32}
  .panel h2{font:700 22px/1.25 ui-monospace,monospace;margin:0 0 8px}.panel p{margin:6px 0}.keys{color:#45585d;font-size:15px}
  button{min-height:44px;border:2px solid #172b32;border-radius:5px;padding:8px 16px;background:#145f70;color:#fff;font:700 16px/1 Verdana,sans-serif;cursor:pointer;margin:8px 8px 0 0}
  button.secondary{background:#fffdf7;color:#172b32}button:focus-visible{outline:4px solid #8bd4e2;outline-offset:3px}
  .guide{position:fixed;z-index:2147483647;right:20px;top:20px;width:min(460px,calc(100% - 40px));background:#fffdf7;color:#172b32;border:3px solid #172b32;border-radius:8px;padding:20px;box-shadow:7px 8px 0 #172b32}
  .pin{position:fixed;z-index:2147483646;width:64px;height:64px;transform:translate(-50%,-50%);border:6px solid #a13d32;border-radius:50%;box-shadow:0 0 0 4px #fff;pointer-events:none}
  .pin span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#172b32;color:#fff;border-radius:50%;min-width:30px;height:30px;text-align:center;font:700 18px/30px monospace}
  .progress{font:700 15px ui-monospace,monospace;color:#45585d}.step{font-size:22px;margin:12px 0}.landmark{border-left:5px solid #a13d32;padding-left:12px}
  @media(max-width:520px){.panel,.guide{right:8px;top:8px;width:calc(100% - 16px);padding:16px}}
  @media(prefers-reduced-motion:no-preference){.panel,.guide{animation:enter .18s ease-out}@keyframes enter{from{opacity:0;transform:translateX(20px)}}}
`;

function mount(): { host: HTMLElement; root: ShadowRoot } {
  document.getElementById('rwtr-overlay')?.remove();
  const host = document.createElement('div');
  host.id = 'rwtr-overlay';
  const root = host.attachShadow({ mode: 'closed' });
  const style = document.createElement('style');
  style.textContent = overlayCss;
  root.append(style);
  document.documentElement.append(host);
  return { host, root };
}

async function detectText(dataUrl: string): Promise<TextRegion[]> {
  const TextDetector = (globalThis as unknown as { TextDetector?: TextDetectorConstructor }).TextDetector;
  if (!TextDetector) return [];
  try {
    const blob = await (await fetch(dataUrl)).blob();
    const bitmap = await createImageBitmap(blob);
    const result = await new TextDetector().detect(bitmap);
    bitmap.close();
    return result;
  } catch { return []; }
}

async function showCapture(message: Extract<ExtensionMessage, { type: 'SHOW_CAPTURE' }>) {
  const { host, root } = mount();
  root.innerHTML += `<div class="veil" role="dialog" aria-modal="true" aria-labelledby="rwtr-cap-title">
    <img class="shot" alt="Frozen screenshot of the current tab for landmark placement">
    <div class="aim" aria-hidden="true"></div>
    <section class="panel"><h2 id="rwtr-cap-title">Place “${escapeHtml(message.name)}”</h2>
      <p class="status" role="status">Screenshot stays on this device. Checking for browser-local text…</p>
      <p class="keys">Move the pointer, or use Arrow keys. Shift + Arrow moves farther. Press Enter to save; Escape cancels.</p>
      <button type="button" class="save">Save this point</button><button type="button" class="secondary cancel">Cancel</button>
    </section></div>`;
  const veil = root.querySelector<HTMLElement>('.veil')!;
  const shot = root.querySelector<HTMLImageElement>('.shot')!;
  const aim = root.querySelector<HTMLElement>('.aim')!;
  const status = root.querySelector<HTMLElement>('.status')!;
  shot.src = message.screenshot;
  let x = .5, y = .5;
  const paint = () => { aim.style.left = `${x * 100}%`; aim.style.top = `${y * 100}%`; };
  paint();
  const regions = await detectText(message.screenshot);
  status.textContent = regions.length
    ? `Local OCR found ${regions.length} text regions. Pixels and text were not uploaded.`
    : 'Visual placement is ready. Local OCR is not available in this browser; nothing was uploaded.';
  const move = (event: PointerEvent) => {
    if ((event.target as HTMLElement).closest('.panel')) return;
    x = Math.min(1, Math.max(0, event.clientX / innerWidth));
    y = Math.min(1, Math.max(0, event.clientY / innerHeight));
    paint();
  };
  veil.addEventListener('pointermove', move);
  veil.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('.panel')) void save();
  });
  const close = () => host.remove();
  const save = async () => {
    const state = await loadState();
    const recipe = state.recipes.find((item) => item.id === message.recipeId);
    if (!recipe) { status.textContent = 'That notebook was removed. Open the editor and try again.'; return; }
    const landmark: Landmark = { id: crypto.randomUUID(), name: message.name, cue: message.cue, x, y, createdAt: Date.now() };
    recipe.landmarks.push(landmark);
    recipe.updatedAt = Date.now();
    await saveState(state);
    close();
  };
  root.querySelector('.save')?.addEventListener('click', () => void save());
  root.querySelector('.cancel')?.addEventListener('click', close);
  veil.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') { event.preventDefault(); close(); return; }
    if (key === 'Enter' && event.target === veil) { event.preventDefault(); void save(); return; }
    if (!key.startsWith('Arrow')) return;
    event.preventDefault();
    const delta = event.shiftKey ? .05 : .01;
    if (key === 'ArrowLeft') x = Math.max(0, x - delta);
    if (key === 'ArrowRight') x = Math.min(1, x + delta);
    if (key === 'ArrowUp') y = Math.max(0, y - delta);
    if (key === 'ArrowDown') y = Math.min(1, y + delta);
    paint();
  });
  veil.tabIndex = -1;
  veil.focus();
}

function showGuide(recipe: TaskRecipe, taskId: string) {
  const task = recipe.tasks.find((item) => item.id === taskId);
  if (!task || task.steps.length === 0) return;
  const { host, root } = mount();
  let index = 0;
  const speak = (text: string) => {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };
  const render = () => {
    const step = task.steps[index];
    const landmark = recipe.landmarks.find((item) => item.id === step.landmarkId);
    root.querySelector('.guide')?.remove(); root.querySelector('.pin')?.remove();
    if (landmark) {
      const pin = document.createElement('div'); pin.className = 'pin';
      pin.style.left = `${landmark.x * 100}%`; pin.style.top = `${landmark.y * 100}%`;
      pin.innerHTML = `<span>${index + 1}</span>`; root.append(pin);
    }
    const panel = document.createElement('section'); panel.className = 'guide';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-labelledby', 'rwtr-guide-title');
    panel.innerHTML = `<p class="progress">Step ${index + 1} of ${task.steps.length}</p><h2 id="rwtr-guide-title">${escapeHtml(task.name)}</h2>
      <p class="step">${escapeHtml(step.text)}</p>${landmark ? `<p class="landmark"><strong>${escapeHtml(landmark.name)}</strong><br>${escapeHtml(landmark.cue)}</p>` : ''}
      <button type="button" class="prev secondary" ${index === 0 ? 'disabled' : ''}>Previous</button>
      <button type="button" class="next">${index === task.steps.length - 1 ? 'Finish' : 'Next step'}</button>
      <button type="button" class="speak secondary">Speak step</button><button type="button" class="close secondary">Close</button>`;
    root.append(panel);
    panel.querySelector('.prev')?.addEventListener('click', () => { index--; render(); });
    panel.querySelector('.next')?.addEventListener('click', () => { if (index === task.steps.length - 1) host.remove(); else { index++; render(); } });
    panel.querySelector('.speak')?.addEventListener('click', () => speak(`${step.text}. ${landmark?.cue ?? ''}`));
    panel.querySelector('.close')?.addEventListener('click', () => { speechSynthesis.cancel(); host.remove(); });
    panel.querySelector<HTMLElement>('.next')?.focus();
  };
  root.addEventListener('keydown', (rawEvent) => {
    const event = rawEvent as KeyboardEvent;
    if (event.key === 'Escape') host.remove();
    if (event.key === 'ArrowRight' && index < task.steps.length - 1) { index++; render(); }
    if (event.key === 'ArrowLeft' && index > 0) { index--; render(); }
  });
  render();
}

function escapeHtml(value: string): string {
  const span = document.createElement('span'); span.textContent = value; return span.innerHTML;
}

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
      if (message.type === 'SHOW_CAPTURE') void showCapture(message);
      if (message.type === 'SHOW_GUIDE') showGuide(message.recipe, message.taskId);
    });
  }
});
