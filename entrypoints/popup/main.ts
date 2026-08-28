import '../../src/notebook.css';
import { browser } from 'wxt/browser';
import { loadState, recipeForOrigin } from '../../src/storage';
import type { TaskRecipe } from '../../src/types';
import './popup.css';

const tasks = document.querySelector<HTMLElement>('#tasks')!;
const status = document.querySelector<HTMLElement>('#status')!;
const escapeHtml = (value: string) => { const span = document.createElement('span'); span.textContent = value; return span.innerHTML; };

async function init() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const state = await loadState(); const recipes = recipeForOrigin(state.recipes, tab?.url);
  if (!tab?.url?.startsWith('http')) { status.textContent = 'Open a regular web app tab to use a recipe.'; return; }
  if (!recipes.length) { status.textContent = 'No notebook for this app yet.'; tasks.innerHTML = '<p class="empty-popup">Open the editor to save its first landmark.</p>'; return; }
  status.textContent = `${recipes.length} local notebook${recipes.length === 1 ? '' : 's'} for this app.`;
  tasks.innerHTML = recipes.map((recipe) => `<section><h2>${escapeHtml(recipe.name)}</h2>${recipe.tasks.length ? recipe.tasks.map((task) => `<button type="button" data-recipe="${recipe.id}" data-task="${task.id}" ${task.steps.length ? '' : 'disabled'}>${escapeHtml(task.name)} <small>${task.steps.length} steps</small></button>`).join('') : '<p class="meta">No task steps yet.</p>'}</section>`).join('');
  tasks.querySelectorAll<HTMLButtonElement>('[data-task]').forEach((button) => button.addEventListener('click', async () => { const recipe = recipes.find((item) => item.id === button.dataset.recipe) as TaskRecipe; await browser.runtime.sendMessage({ type: 'START_GUIDE', recipe, taskId: button.dataset.task, targetOrigin: recipe.origin }); window.close(); }));
}
document.querySelector('#open-editor')?.addEventListener('click', () => { void browser.runtime.openOptionsPage(); window.close(); });
void init().catch(() => { status.textContent = 'Could not read local notebooks. Reopen the extension and try again.'; status.dataset.kind = 'error'; });
