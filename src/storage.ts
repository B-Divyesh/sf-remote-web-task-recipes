import { browser } from 'wxt/browser';
import { EMPTY_STATE, type NotebookState, type TaskRecipe } from './types';

const STORAGE_KEY = 'notebookState';

export function normalizeState(value: unknown): NotebookState {
  if (!value || typeof value !== 'object') return structuredClone(EMPTY_STATE);
  const candidate = value as Partial<NotebookState>;
  return {
    version: 1,
    recipes: Array.isArray(candidate.recipes) ? candidate.recipes : [],
    preferences: {
      ...EMPTY_STATE.preferences,
      ...(candidate.preferences ?? {})
    }
  };
}

export async function loadState(): Promise<NotebookState> {
  const stored = await browser.storage.local.get(STORAGE_KEY);
  return normalizeState(stored[STORAGE_KEY]);
}

export async function saveState(state: NotebookState): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: state });
}

export async function updateRecipe(updated: TaskRecipe): Promise<NotebookState> {
  const state = await loadState();
  const found = state.recipes.findIndex((recipe) => recipe.id === updated.id);
  if (found >= 0) state.recipes[found] = updated;
  else state.recipes.push(updated);
  await saveState(state);
  return state;
}

export function createRecipe(name: string, origin: string): TaskRecipe {
  const now = Date.now();
  return {
    id: crypto.randomUUID(), name, origin, landmarks: [], tasks: [],
    createdAt: now, updatedAt: now
  };
}

export function recipeForOrigin(recipes: TaskRecipe[], url?: string): TaskRecipe[] {
  if (!url) return [];
  try {
    return recipes.filter((recipe) => recipe.origin === new URL(url).origin);
  } catch {
    return [];
  }
}
