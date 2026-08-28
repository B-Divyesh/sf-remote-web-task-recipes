import { describe, expect, it } from 'vitest';
import { dispatchToTargetTab, selectTargetTab, type BrowserTab } from '../src/tab-dispatch';

const lookAlike: BrowserTab = { id: 1, windowId: 11, active: true, url: 'http://app.test.evil/' };
const intended: BrowserTab = { id: 2, windowId: 22, url: 'http://app.test/weekly' };

function fakeBrowser() {
  const updates: number[] = [];
  const captures: Array<number | undefined> = [];
  const sent: Array<{ tabId: number; message: unknown }> = [];
  return {
    api: {
      tabs: {
        query: async (query: Record<string, unknown>) => query.active ? [lookAlike] : [lookAlike, intended],
        update: async (tabId: number) => { updates.push(tabId); },
        captureVisibleTab: async (windowId?: number) => { captures.push(windowId); return 'data:image/jpeg;base64,exact-origin'; },
        sendMessage: async (tabId: number, message: unknown) => { sent.push({ tabId, message }); }
      },
      windows: { update: async () => undefined }
    }, updates, captures, sent
  };
}

describe('exact-origin extension dispatch', () => {
  it('never selects a look-alike origin', () => {
    expect(selectTargetTab(lookAlike, [lookAlike, intended], 'http://app.test')?.id).toBe(2);
    expect(selectTargetTab(intended, [lookAlike, intended], 'http://app.test')?.id).toBe(2);
    expect(selectTargetTab(lookAlike, [lookAlike], 'http://app.test')).toBeUndefined();
  });

  it('captures and sends placement only to the exact-origin tab', async () => {
    const browser = fakeBrowser();
    await dispatchToTargetTab(browser.api, { type: 'CAPTURE_LANDMARK', recipeId: 'r1', name: 'Save', cue: 'Bottom right', targetOrigin: 'http://app.test' }, async () => undefined);
    expect(browser.updates).toEqual([2]);
    expect(browser.captures).toEqual([22]);
    expect(browser.sent).toEqual([{ tabId: 2, message: { type: 'SHOW_CAPTURE', recipeId: 'r1', name: 'Save', cue: 'Bottom right', targetOrigin: 'http://app.test', screenshot: 'data:image/jpeg;base64,exact-origin' } }]);
  });

  it('sends guides only to the exact-origin tab and never captures it', async () => {
    const browser = fakeBrowser();
    const recipe = { id: 'r1', name: 'Weekly', origin: 'http://app.test', landmarks: [], tasks: [], createdAt: 1, updatedAt: 1 };
    await dispatchToTargetTab(browser.api, { type: 'START_GUIDE', recipe, taskId: 't1', targetOrigin: 'http://app.test' });
    expect(browser.updates).toEqual([2]);
    expect(browser.captures).toEqual([]);
    expect(browser.sent).toEqual([{ tabId: 2, message: { type: 'SHOW_GUIDE', recipe, taskId: 't1', targetOrigin: 'http://app.test' } }]);
  });
});
