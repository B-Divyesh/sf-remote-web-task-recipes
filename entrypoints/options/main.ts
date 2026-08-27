import '../../src/notebook.css';
import { browser } from 'wxt/browser';
import { decryptNotebook, encryptNotebook } from '../../src/crypto';
import { CHECKOUT_URL, getLicenseState, verifyLicense } from '../../src/license';
import { createRecipe, loadState, saveState, updateRecipe } from '../../src/storage';
import type { NotebookState, TaskRecipe } from '../../src/types';

const list = document.querySelector<HTMLUListElement>('#recipe-list')!;
const workspace = document.querySelector<HTMLElement>('#workspace')!;
const modal = document.querySelector<HTMLElement>('#modal')!;
const globalStatus = document.querySelector<HTMLElement>('#global-status')!;
let state: NotebookState;
let selectedId = '';
let activeTab: 'landmarks' | 'tasks' = 'landmarks';
let undoState: { recipeId: string; recipe: TaskRecipe } | null = null;

const escapeHtml = (value: string) => { const span = document.createElement('span'); span.textContent = value; return span.innerHTML; };
const announce = (message: string, error = false) => { globalStatus.textContent = message; globalStatus.dataset.kind = error ? 'error' : 'ok'; };

async function init() {
  state = await loadState();
  selectedId = state.recipes[0]?.id ?? '';
  document.body.dataset.theme = state.preferences.theme;
  render();
  browser.storage.onChanged.addListener(async () => { state = await loadState(); render(); });
  const license = await getLicenseState();
  if (license && !license.valid && state.preferences.theme !== 'field') {
    state.preferences.theme = 'field'; await saveState(state); document.body.dataset.theme = 'field';
  }
  if (license?.valid && Date.now() - license.checkedAt > 86_400_000) {
    void verifyLicense(license.token).then(async (result) => {
      if (!result.valid && state.preferences.theme !== 'field') {
        state.preferences.theme = 'field'; await saveState(state); document.body.dataset.theme = 'field';
        announce('License no longer active. Field paper is restored; every accessibility feature still works.');
      }
      render();
    }).catch(() => announce('License check is offline. Cached appearance remains available.'));
  }
}

function render() {
  list.innerHTML = state.recipes.length ? state.recipes.map((recipe) => `<li><button type="button" data-select="${recipe.id}" aria-current="${recipe.id === selectedId}"><span>${escapeHtml(recipe.name)}</span><small>${escapeHtml(recipe.origin)}</small></button></li>`).join('') : '<li class="meta">No notebooks yet.</li>';
  list.querySelectorAll<HTMLButtonElement>('[data-select]').forEach((button) => button.addEventListener('click', () => { selectedId = button.dataset.select!; render(); }));
  const recipe = state.recipes.find((item) => item.id === selectedId);
  if (!recipe) return renderEmpty();
  renderRecipe(recipe);
}

function renderEmpty() {
  workspace.innerHTML = `<div class="empty"><div class="pin-sketch" aria-hidden="true">1</div><p class="eyebrow">Start with one recurring job</p><h2>Map the app you have to use</h2><p>Name the browser app, place a few visual landmarks, then write the steps you want spoken back.</p><button type="button" id="empty-new">Create a notebook</button><div class="callout warning"><strong>Works best with stable layouts.</strong> This tool guides you to coordinates; it does not click, read passwords, or guarantee compatibility with every remote desktop.</div></div>`;
  workspace.querySelector('#empty-new')?.addEventListener('click', openNewRecipe);
}

function renderRecipe(recipe: TaskRecipe) {
  workspace.innerHTML = `<header class="editor-head row"><div><p class="eyebrow">Notebook for ${escapeHtml(recipe.origin)}</p><h2>${escapeHtml(recipe.name)}</h2><p class="meta">${recipe.landmarks.length} landmarks · ${recipe.tasks.length} tasks</p></div><button type="button" class="danger" id="delete-recipe">Delete notebook</button></header>
    <div class="tabs" role="tablist" aria-label="Notebook sections"><button type="button" role="tab" id="landmarks-tab" aria-selected="${activeTab === 'landmarks'}">Landmarks</button><button type="button" role="tab" id="tasks-tab" aria-selected="${activeTab === 'tasks'}">Task steps</button></div>
    <section class="section" id="landmarks-panel" role="tabpanel" aria-labelledby="landmarks-tab" ${activeTab !== 'landmarks' ? 'hidden' : ''}>${landmarkPanel(recipe)}</section>
    <section class="section" id="tasks-panel" role="tabpanel" aria-labelledby="tasks-tab" ${activeTab !== 'tasks' ? 'hidden' : ''}>${taskPanel(recipe)}</section>`;
  bindRecipe(recipe);
}

function landmarkPanel(recipe: TaskRecipe) {
  const items = recipe.landmarks.map((landmark, i) => `<li class="note-item row"><span class="number-pin" aria-hidden="true">${i + 1}</span><div class="item-main"><h3>${escapeHtml(landmark.name)}</h3><p>${escapeHtml(landmark.cue || 'No spoken cue')}</p><p class="meta">Position ${Math.round(landmark.x * 100)}% across, ${Math.round(landmark.y * 100)}% down</p></div><button type="button" class="danger" data-remove-landmark="${landmark.id}" aria-label="Remove ${escapeHtml(landmark.name)}">Remove</button></li>`).join('');
  return `<div class="row"><div><h3>Visual landmarks</h3><p class="meta">Placement starts only after you press “Place on app”.</p></div></div>
    ${items ? `<ol class="plain-list">${items}</ol>` : '<div class="callout">No landmarks yet. Add the first place you need to find repeatedly.</div>'}
    <form id="landmark-form" class="drawer"><h3>Add a landmark</h3><div class="field"><label for="landmark-name">Short name</label><input id="landmark-name" name="name" required maxlength="60" autocomplete="off"></div><div class="field"><label for="landmark-cue">Spoken cue</label><textarea id="landmark-cue" name="cue" required maxlength="240" aria-describedby="cue-hint"></textarea><p id="cue-hint" class="hint">Example: “Second pale button below the account number.” Never enter a password.</p></div><button type="submit">Place on app</button></form>`;
}

function taskPanel(recipe: TaskRecipe) {
  const tasks = recipe.tasks.map((task) => `<article class="note-item"><div class="row"><div><h3>${escapeHtml(task.name)}</h3><p class="meta">${task.steps.length} steps</p></div><div class="actions"><button type="button" data-start-task="${task.id}" ${task.steps.length ? '' : 'disabled'}>Start guide</button><button type="button" class="danger" data-remove-task="${task.id}">Remove</button></div></div>
    ${task.steps.length ? `<ol class="step-list">${task.steps.map((step) => { const landmark = recipe.landmarks.find((item) => item.id === step.landmarkId); return `<li><div class="row"><span>${escapeHtml(step.text)}${landmark ? `<br><small class="meta">Landmark: ${escapeHtml(landmark.name)}</small>` : ''}</span><button type="button" class="danger" data-remove-step="${task.id}:${step.id}" aria-label="Remove step">Remove</button></div></li>`; }).join('')}</ol>` : '<p class="meta">Add the first concise instruction below.</p>'}
    <form data-step-form="${task.id}"><div class="field"><label for="step-${task.id}">New step</label><textarea id="step-${task.id}" name="text" required maxlength="280"></textarea></div><div class="field"><label for="landmark-${task.id}">Point to landmark (optional)</label><select id="landmark-${task.id}" name="landmark"><option value="">No landmark</option>${recipe.landmarks.map((landmark) => `<option value="${landmark.id}">${escapeHtml(landmark.name)}</option>`).join('')}</select></div><button type="submit">Add step</button></form></article>`).join('');
  return `${tasks || '<div class="callout">No tasks yet. A task is a short procedure such as “Submit weekly hours”.</div>'}<form id="task-form" class="drawer"><h3>Add a task</h3><div class="field"><label for="task-name">Task name</label><input id="task-name" name="name" required maxlength="80"></div><button type="submit">Create task</button></form>`;
}

function bindRecipe(recipe: TaskRecipe) {
  workspace.querySelector('#landmarks-tab')?.addEventListener('click', () => { activeTab = 'landmarks'; render(); });
  workspace.querySelector('#tasks-tab')?.addEventListener('click', () => { activeTab = 'tasks'; render(); });
  workspace.querySelector('#delete-recipe')?.addEventListener('click', () => confirmDeleteRecipe(recipe));
  workspace.querySelector<HTMLFormElement>('#landmark-form')?.addEventListener('submit', async (event) => {
    event.preventDefault(); const data = new FormData(event.currentTarget as HTMLFormElement); const name = String(data.get('name') ?? '').trim(); const cue = String(data.get('cue') ?? '').trim();
    announce('Opening the app screenshot…');
    try { await browser.runtime.sendMessage({ type: 'CAPTURE_LANDMARK', recipeId: recipe.id, name, cue, targetOrigin: recipe.origin }); announce('Placement mode opened in the app tab.'); }
    catch (error) { announce(error instanceof Error ? error.message : 'Could not open placement mode.', true); }
  });
  workspace.querySelectorAll<HTMLButtonElement>('[data-remove-landmark]').forEach((button) => button.addEventListener('click', async () => {
    undoState = { recipeId: recipe.id, recipe: structuredClone(recipe) };
    const id = button.dataset.removeLandmark!; recipe.landmarks = recipe.landmarks.filter((item) => item.id !== id); recipe.tasks.forEach((task) => task.steps.forEach((step) => { if (step.landmarkId === id) delete step.landmarkId; }));
    await updateRecipe(recipe); showUndo('Landmark removed. Linked steps now have no pin.');
  }));
  workspace.querySelector<HTMLFormElement>('#task-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget as HTMLFormElement); recipe.tasks.push({ id: crypto.randomUUID(), name: String(data.get('name')).trim(), steps: [] }); recipe.updatedAt = Date.now(); await updateRecipe(recipe); activeTab = 'tasks'; announce('Task created.'); });
  workspace.querySelectorAll<HTMLFormElement>('[data-step-form]').forEach((form) => form.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(form); const task = recipe.tasks.find((item) => item.id === form.dataset.stepForm)!; task.steps.push({ id: crypto.randomUUID(), text: String(data.get('text')).trim(), landmarkId: String(data.get('landmark')) || undefined }); recipe.updatedAt = Date.now(); await updateRecipe(recipe); announce('Step added.'); }));
  workspace.querySelectorAll<HTMLButtonElement>('[data-remove-step]').forEach((button) => button.addEventListener('click', async () => { if (!confirm('Remove this step from the task?')) return; const [taskId, stepId] = button.dataset.removeStep!.split(':'); const task = recipe.tasks.find((item) => item.id === taskId)!; task.steps = task.steps.filter((item) => item.id !== stepId); await updateRecipe(recipe); announce('Step removed.'); }));
  workspace.querySelectorAll<HTMLButtonElement>('[data-remove-task]').forEach((button) => button.addEventListener('click', async () => { if (!confirm(`Remove this task and all of its steps?`)) return; recipe.tasks = recipe.tasks.filter((item) => item.id !== button.dataset.removeTask); await updateRecipe(recipe); announce('Task removed.'); }));
  workspace.querySelectorAll<HTMLButtonElement>('[data-start-task]').forEach((button) => button.addEventListener('click', async () => { try { await browser.runtime.sendMessage({ type: 'START_GUIDE', recipe, taskId: button.dataset.startTask, targetOrigin: recipe.origin }); announce('Guide opened over the app tab.'); } catch (error) { announce(error instanceof Error ? error.message : 'Could not start the guide.', true); } }));
}

function showUndo(message: string) { announce(message); const old = document.querySelector('#undo-toast'); old?.remove(); const button = document.createElement('button'); button.id = 'undo-toast'; button.className = 'secondary'; button.textContent = 'Undo last removal'; button.addEventListener('click', async () => { if (!undoState) return; await updateRecipe(undoState.recipe); undoState = null; announce('Landmark restored.'); button.remove(); }); document.querySelector('.app-header')?.append(button); }

function openNewRecipe() {
  showModal(`<form class="modal sheet" id="new-form"><p class="eyebrow">New field notebook</p><h2>Name the browser app</h2><div class="field"><label for="recipe-name">Notebook name</label><input id="recipe-name" name="name" required maxlength="80" autofocus></div><div class="field"><label for="recipe-origin">App address</label><input id="recipe-origin" name="origin" type="url" required placeholder="https://work.example.com" aria-describedby="origin-hint"><p class="hint" id="origin-hint">Only the site origin is stored, never page content.</p></div><div class="actions"><button type="submit">Create notebook</button><button type="button" class="secondary" data-close>Cancel</button></div></form>`);
  const form = modal.querySelector<HTMLFormElement>('#new-form')!;
  void browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => { if (tab?.url?.startsWith('http')) (form.elements.namedItem('origin') as HTMLInputElement).value = new URL(tab.url).origin; });
  form.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(form); let origin: string; try { origin = new URL(String(data.get('origin'))).origin; } catch { announce('Enter a complete http or https address.', true); return; } const recipe = createRecipe(String(data.get('name')).trim(), origin); state.recipes.push(recipe); await saveState(state); selectedId = recipe.id; closeModal(); announce('Notebook created. Add its first landmark.'); });
}

function confirmDeleteRecipe(recipe: TaskRecipe) { showModal(`<section class="modal sheet" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">Delete “${escapeHtml(recipe.name)}”?</h2><p>This removes ${recipe.landmarks.length} landmarks and ${recipe.tasks.length} tasks from this device. Export a backup first if you need them.</p><div class="actions"><button class="danger" id="confirm-delete" type="button">Delete notebook</button><button class="secondary" type="button" data-close>Keep notebook</button></div></section>`); modal.querySelector('#confirm-delete')?.addEventListener('click', async () => { state.recipes = state.recipes.filter((item) => item.id !== recipe.id); await saveState(state); selectedId = state.recipes[0]?.id ?? ''; closeModal(); announce('Notebook deleted.'); }); }

async function openDataTools() {
  const license = await getLicenseState(); const unlocked = license?.valid ?? false;
  workspace.innerHTML = `<div class="editor-head"><p class="eyebrow">Local data controls</p><h2>Backup & appearance</h2></div><section><h3>Encrypted backup</h3><p>Every exported file is encrypted here with AES-256-GCM. Your passphrase is never stored.</p><div class="actions"><button id="export" type="button">Export encrypted backup</button><button id="import" class="secondary" type="button">Import backup</button><input class="visually-hidden" id="import-file" type="file" accept="application/json,.rwtr"></div></section><section class="drawer"><h3>Notebook appearance</h3><p>Field paper is free. The optional Supporter Pack adds two cosmetic covers; all landmarks, guidance, speech, and backups remain free.</p><div class="theme-swatches"><label><input type="radio" name="theme" value="field" ${state.preferences.theme === 'field' ? 'checked' : ''}> Field paper</label><label><input type="radio" name="theme" value="blueprint" ${state.preferences.theme === 'blueprint' ? 'checked' : ''} ${unlocked ? '' : 'disabled'}> Blueprint ${unlocked ? '' : '(Supporter)'}</label><label><input type="radio" name="theme" value="highlighter" ${state.preferences.theme === 'highlighter' ? 'checked' : ''} ${unlocked ? '' : 'disabled'}> Highlighter ${unlocked ? '' : '(Supporter)'}</label></div><div class="callout"><strong>Supporter Pack — $19 one time.</strong> Optional covers and support for future maintenance. No subscription. Sociobot/Dodo is merchant of record and handles refunds.</div><div class="actions"><a class="button" href="${CHECKOUT_URL}" target="_blank" rel="noreferrer">Buy Supporter Pack</a><button class="secondary" id="restore" type="button">Have a license? Paste it</button></div><p class="meta"><a href="https://remote-web-task-recipes.sociobot.in/privacy" target="_blank">Privacy</a> · <a href="https://remote-web-task-recipes.sociobot.in/terms" target="_blank">Terms</a></p></section>`;
  workspace.querySelectorAll<HTMLInputElement>('[name="theme"]').forEach((radio) => radio.addEventListener('change', async () => { state.preferences.theme = radio.value as NotebookState['preferences']['theme']; document.body.dataset.theme = radio.value; await saveState(state); announce('Appearance saved.'); }));
  workspace.querySelector('#export')?.addEventListener('click', () => passphraseDialog('Create backup passphrase', 'Encrypt & download', async (passphrase) => { const encrypted = await encryptNotebook(state, passphrase); const url = URL.createObjectURL(new Blob([encrypted], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = `remote-task-recipes-${new Date().toISOString().slice(0,10)}.rwtr`; link.click(); URL.revokeObjectURL(url); announce('Encrypted backup downloaded.'); }));
  const input = workspace.querySelector<HTMLInputElement>('#import-file')!; workspace.querySelector('#import')?.addEventListener('click', () => input.click()); input.addEventListener('change', () => { const file = input.files?.[0]; if (file) passphraseDialog('Enter backup passphrase', 'Decrypt & import', async (passphrase) => { const imported = await decryptNotebook(await file.text(), passphrase); if (state.recipes.length && !confirm(`Replace ${state.recipes.length} current notebook${state.recipes.length === 1 ? '' : 's'} with the ${imported.recipes.length} in this backup?`)) return; state = imported; await saveState(state); selectedId = state.recipes[0]?.id ?? ''; announce('Backup imported.'); render(); }); });
  workspace.querySelector('#restore')?.addEventListener('click', () => licenseDialog());
}

function passphraseDialog(title: string, action: string, work: (passphrase: string) => Promise<void>) { showModal(`<form class="modal sheet" id="pass-form"><h2>${title}</h2><div class="field"><label for="passphrase">Passphrase</label><input id="passphrase" name="passphrase" type="password" required minlength="10" autocomplete="off" aria-describedby="pass-hint"><p class="hint" id="pass-hint">At least 10 characters. It cannot be recovered.</p></div><p class="status" id="pass-status" role="status"></p><div class="actions"><button type="submit">${action}</button><button class="secondary" type="button" data-close>Cancel</button></div></form>`); const form = modal.querySelector<HTMLFormElement>('#pass-form')!; form.addEventListener('submit', async (event) => { event.preventDefault(); const status = modal.querySelector<HTMLElement>('#pass-status')!; try { status.textContent = 'Working…'; await work(String(new FormData(form).get('passphrase'))); closeModal(); } catch (error) { status.textContent = error instanceof Error ? error.message : 'That did not work.'; status.dataset.kind = 'error'; } }); }

function licenseDialog() { showModal(`<form class="modal sheet" id="license-form"><h2>Restore Supporter Pack</h2><div class="field"><label for="license-token">License token</label><textarea id="license-token" name="token" required autocomplete="off"></textarea></div><p class="status" id="license-status" role="status"></p><div class="actions"><button type="submit">Verify license</button><button type="button" class="secondary" data-close>Cancel</button></div></form>`); const form = modal.querySelector<HTMLFormElement>('#license-form')!; form.addEventListener('submit', async (event) => { event.preventDefault(); const status = modal.querySelector<HTMLElement>('#license-status')!; status.textContent = 'Checking license…'; try { const result = await verifyLicense(String(new FormData(form).get('token')).trim(), true); if (!result.valid) { status.textContent = 'This license is not active. Check the token or buy the Supporter Pack.'; return; } closeModal(); announce('Supporter Pack restored.'); void openDataTools(); } catch (error) { status.textContent = error instanceof Error ? error.message : 'Could not verify the license.'; } }); }

function showModal(html: string) { modal.innerHTML = html; modal.hidden = false; modal.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', closeModal)); modal.addEventListener('keydown', modalKeys); modal.querySelector<HTMLElement>('input,button')?.focus(); }
function closeModal() { modal.hidden = true; modal.innerHTML = ''; modal.removeEventListener('keydown', modalKeys); }
function modalKeys(event: KeyboardEvent) { if (event.key === 'Escape') closeModal(); if (event.key !== 'Tab') return; const focusables = [...modal.querySelectorAll<HTMLElement>('button,input,textarea,a[href]')].filter((el) => !el.hasAttribute('disabled')); if (!focusables.length) return; const first = focusables[0], last = focusables.at(-1)!; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }

document.querySelector('#new-recipe')?.addEventListener('click', openNewRecipe);
document.querySelector('#data-tools')?.addEventListener('click', () => void openDataTools());
void init().catch((error) => announce(`Could not open local notebook: ${String(error)}`, true));
