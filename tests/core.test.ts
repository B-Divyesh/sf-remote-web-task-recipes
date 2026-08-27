import { describe, expect, it } from 'vitest';
import { decryptNotebook, encryptNotebook } from '../src/crypto';
import { createRecipe, normalizeState, recipeForOrigin } from '../src/storage';
import { EMPTY_STATE } from '../src/types';

describe('local notebook model', () => {
  it('normalizes missing data to a usable empty notebook', () => {
    expect(normalizeState(null)).toEqual(EMPTY_STATE);
    expect(normalizeState({ recipes: [] }).preferences.speakSteps).toBe(true);
  });

  it('matches recipes to the exact site origin', () => {
    const recipe = createRecipe('Timesheets', 'https://remote.example.test');
    expect(recipeForOrigin([recipe], 'https://remote.example.test/week/4')).toEqual([recipe]);
    expect(recipeForOrigin([recipe], 'https://other.example.test/')).toEqual([]);
    expect(recipeForOrigin([recipe], 'not a url')).toEqual([]);
  });
});

describe('encrypted export', () => {
  it('round-trips notebook data without exposing its text', async () => {
    const state = structuredClone(EMPTY_STATE);
    state.recipes.push(createRecipe('Private payroll task', 'https://work.example.test'));
    const encrypted = await encryptNotebook(state, 'correct horse battery staple');
    expect(encrypted).not.toContain('Private payroll task');
    await expect(decryptNotebook(encrypted, 'correct horse battery staple')).resolves.toEqual(state);
  });

  it('rejects a wrong passphrase and short export passphrases', async () => {
    await expect(encryptNotebook(EMPTY_STATE, 'too short')).rejects.toThrow('at least 10');
    const encrypted = await encryptNotebook(EMPTY_STATE, 'a suitably long passphrase');
    await expect(decryptNotebook(encrypted, 'another long passphrase')).rejects.toThrow('incorrect');
  });
});
