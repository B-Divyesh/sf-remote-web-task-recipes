import { expect, test, chromium, type BrowserContext, type Page } from '@playwright/test';
import axe from 'axe-core';
import { createServer, type Server } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import type { TaskRecipe } from '../../src/types';

const extensionPath = resolve(import.meta.dirname, '../../.output/chrome-mv3');

async function startOriginServer(): Promise<Server> {
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<!doctype html><html lang="en"><head><title>Browser app</title></head><body>
      <h1>Browser-delivered app</h1><p id="private-copy">Private payroll total 4816</p>
      <label>Password <input id="password" type="password" value="never-read-this"></label>
      <button id="target" onclick="document.body.dataset.targetClicks=String(Number(document.body.dataset.targetClicks||0)+1)">Submit payroll</button>
    </body></html>`);
  });
  await new Promise<void>((resolveServer, reject) => {
    server.once('error', reject);
    server.listen(80, '127.0.0.1', () => { server.off('error', reject); resolveServer(); });
  });
  return server;
}

async function launchExtension(): Promise<{ context: BrowserContext; extensionId: string; profile: string }> {
  const profile = await mkdtemp(resolve(tmpdir(), 'rwtr-playwright-'));
  const context = await chromium.launchPersistentContext(profile, {
    // The regular Chromium channel supports MV3 extensions in headless mode;
    // the lightweight headless shell deliberately disables them.
    channel: 'chromium',
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--host-resolver-rules=MAP app.test 127.0.0.1,MAP app.test.evil 127.0.0.1'
    ]
  });
  let [worker] = context.serviceWorkers();
  if (!worker) worker = await context.waitForEvent('serviceworker');
  // The extension opens its options page once on install. Let that one-time
  // navigation settle before a test explicitly opens the editor.
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  return { context, extensionId: new URL(worker.url()).host, profile };
}

const sampleRecipe: TaskRecipe = {
  id: 'recipe', name: 'Weekly timesheet', origin: 'http://app.test',
  landmarks: [],
  tasks: [{ id: 'task', name: 'Submit hours', steps: [
    { id: 'step-1', text: 'Review the total.' },
    { id: 'step-2', text: 'Choose Submit payroll.' }
  ] }],
  createdAt: 1, updatedAt: 1
};

async function seedNotebook(editor: Page, recipe = sampleRecipe): Promise<void> {
  await editor.evaluate(async (notebook) => {
    await chrome.storage.local.clear();
    await chrome.storage.local.set({ notebookState: { version: 1, recipes: [notebook], preferences: { speakSteps: true, largeOverlay: true, theme: 'field' } } });
  }, recipe);
}

async function storageSnapshot(editor: Page): Promise<Record<string, unknown>> {
  return editor.evaluate(async () => chrome.storage.local.get(null));
}

async function sendCapture(editor: Page, name = 'Submit payroll'): Promise<void> {
  const result = await editor.evaluate(async ({ recipeId, landmarkName }) => new Promise<{ error?: string }>((resolveMessage) => {
    chrome.runtime.sendMessage({ type: 'CAPTURE_LANDMARK', recipeId, name: landmarkName, cue: 'Lower-right control', targetOrigin: 'http://app.test' }, () => resolveMessage({ error: chrome.runtime.lastError?.message }));
  }), { recipeId: sampleRecipe.id, landmarkName: name });
  expect(result.error).toBeUndefined();
}

async function setTextDetector(editor: Page, available: boolean): Promise<void> {
  await editor.evaluate(async (enabled) => {
    const tabs = await chrome.tabs.query({});
    const target = tabs.find((tab) => {
      try { return new URL(tab.url ?? '').origin === 'http://app.test'; } catch { return false; }
    });
    if (!target?.id) throw new Error('Target tab was not found.');
    await chrome.scripting.executeScript({
      target: { tabId: target.id },
      world: 'ISOLATED',
      func: (hasDetector: boolean) => {
        if (hasDetector) {
          class FixtureTextDetector {
            async detect() {
              document.documentElement.dataset.detectorCalled = 'true';
              return [{ rawValue: 'Submit payroll' }];
            }
          }
          Object.defineProperty(globalThis, 'TextDetector', { configurable: true, value: FixtureTextDetector });
        } else {
          Reflect.deleteProperty(globalThis, 'TextDetector');
          document.documentElement.dataset.detectorCalled = 'false';
        }
      },
      args: [enabled]
    });
  }, available);
}

test('@claim:package-ready the built MV3 package loads with accessible editor dialogs', async () => {
  const { context, extensionId, profile } = await launchExtension();
  try {
    await context.addInitScript({ content: axe.source });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(`chrome-extension://${extensionId}/options.html`);
    await expect.poll(() => page.evaluate(async () => {
      const runtimeAxe = (window as typeof window & { axe: typeof axe }).axe;
      return (await runtimeAxe.run()).violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? '')).length;
    })).toBe(0);
    const newNotebook = page.getByRole('button', { name: 'New' });
    await newNotebook.focus();
    await newNotebook.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby');
    await expect(page.locator('main')).toHaveAttribute('inert', '');
    await expect.poll(() => page.evaluate(async () => {
      const runtimeAxe = (window as typeof window & { axe: typeof axe }).axe;
      return (await runtimeAxe.run()).violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? '')).length;
    })).toBe(0);
    await page.keyboard.press('Escape');
    await expect(newNotebook).toBeFocused();
    await expect(page.locator('main')).not.toHaveAttribute('inert', '');

    await page.getByRole('button', { name: 'Backup & appearance' }).click();
    const exportButton = page.getByRole('button', { name: 'Export encrypted backup' });
    await exportButton.focus();
    await exportButton.press('Enter');
    await expect(page.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    await page.keyboard.press('Escape');
    await expect(exportButton).toBeFocused();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});

test('@claim:capture-and-origin-scope capture and guide dispatch reject a look-alike origin in a real MV3 session', async () => {
  const server = await startOriginServer();
  const { context, extensionId, profile } = await launchExtension();
  try {
    const wrong = await context.newPage();
    await wrong.goto('http://app.test.evil/');
    const right = await context.newPage();
    await right.goto('http://app.test/');
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);

    const capture = await editor.evaluate(async () => {
      return new Promise<{ error?: string }>((resolve) => {
        chrome.runtime.sendMessage({ type: 'CAPTURE_LANDMARK', recipeId: 'recipe', name: 'Save', cue: 'Bottom right', targetOrigin: 'http://app.test' }, () => resolve({ error: chrome.runtime.lastError?.message }));
      });
    });
    expect(capture.error).toBeUndefined();
    await expect(right.locator('#rwtr-overlay')).toBeAttached();
    await expect(wrong.locator('#rwtr-overlay')).toHaveCount(0);
    await right.keyboard.press('Escape');
    await expect(right.locator('#rwtr-overlay')).toHaveCount(0);

    const recipe = { id: 'recipe', name: 'Weekly', origin: 'http://app.test', landmarks: [], tasks: [{ id: 'task', name: 'Submit hours', steps: [{ id: 'step', text: 'Choose save' }] }], createdAt: 1, updatedAt: 1 };
    const guide = await editor.evaluate(async (payload) => {
      return new Promise<{ error?: string }>((resolve) => {
        chrome.runtime.sendMessage(payload, () => resolve({ error: chrome.runtime.lastError?.message }));
      });
    }, { type: 'START_GUIDE', recipe, taskId: 'task', targetOrigin: 'http://app.test' });
    expect(guide.error).toBeUndefined();
    await expect(right.locator('#rwtr-overlay')).toBeAttached();
    await expect(wrong.locator('#rwtr-overlay')).toHaveCount(0);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
    await new Promise<void>((resolveServer) => server.close(() => resolveServer()));
  }
});

test('@claim:local-notebooks notebook data uses only extension storage and can be deleted', async () => {
  const { context, extensionId, profile } = await launchExtension();
  try {
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);
    await editor.getByRole('button', { name: 'New' }).click();
    await editor.getByLabel('Notebook name').fill('Weekly payroll');
    await editor.getByLabel('App address').fill('http://app.test/private/page');
    await editor.getByRole('button', { name: 'Create notebook' }).click();
    await expect(editor.getByRole('heading', { name: 'Weekly payroll' })).toBeVisible();
    await editor.getByRole('tab', { name: 'Landmarks' }).focus();
    await editor.keyboard.press('ArrowRight');
    await expect(editor.getByRole('tab', { name: 'Task steps' })).toBeFocused();
    await expect(editor.getByRole('tab', { name: 'Task steps' })).toHaveAttribute('aria-selected', 'true');
    await editor.getByRole('tab', { name: 'Landmarks' }).click();

    const stored = await storageSnapshot(editor);
    expect(Object.keys(stored)).toEqual(['notebookState']);
    expect(JSON.stringify(stored)).toContain('http://app.test');
    expect(JSON.stringify(stored)).not.toContain('/private/page');

    await editor.getByRole('button', { name: 'Delete notebook' }).click();
    await editor.getByRole('alertdialog').getByRole('button', { name: 'Delete notebook' }).click();
    await expect(editor.getByText('No notebooks yet.')).toBeVisible();
    const emptied = await storageSnapshot(editor) as { notebookState: { recipes: unknown[] } };
    expect(emptied.notebookState.recipes).toEqual([]);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});

test('@claim:temporary-capture screenshot pixels disappear after placement and are never stored or requested remotely', async () => {
  const server = await startOriginServer();
  const { context, extensionId, profile } = await launchExtension();
  const requests: string[] = [];
  context.on('request', (request) => requests.push(request.url()));
  try {
    const app = await context.newPage();
    await app.goto('http://app.test/');
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);
    await seedNotebook(editor);

    await sendCapture(editor);
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-mode', 'capture');
    expect(JSON.stringify(await storageSnapshot(editor))).not.toContain('data:image');
    await app.keyboard.press('Escape');
    await expect(app.locator('#rwtr-overlay')).toHaveCount(0);
    expect(JSON.stringify(await storageSnapshot(editor))).not.toContain('data:image');

    const remote = requests.filter((url) => /^https?:/.test(url) && new URL(url).origin !== 'http://app.test');
    expect(remote).toEqual([]);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
    await new Promise<void>((resolveServer) => server.close(() => resolveServer()));
  }
});

test('@claim:manual-suggestions manual placement works with and without browser text suggestions', async () => {
  const server = await startOriginServer();
  const { context, extensionId, profile } = await launchExtension();
  try {
    const app = await context.newPage();
    await app.goto('http://app.test/');
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);
    await seedNotebook(editor);

    await setTextDetector(editor, true);
    await sendCapture(editor, 'First manual landmark');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-suggestion', 'available');
    await expect(app.locator('html')).toHaveAttribute('data-detector-called', 'true');
    await app.keyboard.press('ArrowRight');
    await app.keyboard.press('Shift+ArrowDown');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-x', '0.51');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-y', '0.55');
    await app.keyboard.press('Enter');
    await expect(app.locator('#rwtr-overlay')).toHaveCount(0);

    await app.waitForTimeout(1100);
    await setTextDetector(editor, false);
    await sendCapture(editor, 'Second manual landmark');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-suggestion', 'unavailable');
    await app.mouse.click(100, 200);
    await expect(app.locator('#rwtr-overlay')).toHaveCount(0);

    const stored = await storageSnapshot(editor) as { notebookState: { recipes: Array<{ landmarks: Array<{ name: string; x: number; y: number }> }> } };
    expect(stored.notebookState.recipes[0].landmarks).toHaveLength(2);
    expect(stored.notebookState.recipes[0].landmarks[0]).toMatchObject({ name: 'First manual landmark', x: .51, y: .55 });

    await app.waitForTimeout(1100);
    await sendCapture(editor, 'Cancelled landmark');
    await app.keyboard.press('Escape');
    const afterCancel = await storageSnapshot(editor) as typeof stored;
    expect(afterCancel.notebookState.recipes[0].landmarks).toHaveLength(2);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
    await new Promise<void>((resolveServer) => server.close(() => resolveServer()));
  }
});

test('@claim:user-control guides show one step without reading or operating the website', async () => {
  const server = await startOriginServer();
  const { context, extensionId, profile } = await launchExtension();
  try {
    const app = await context.newPage();
    await app.goto('http://app.test/');
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);
    const recipe = structuredClone(sampleRecipe);
    recipe.landmarks.push({ id: 'landmark', name: 'Submit payroll', cue: 'Lower-right control', x: .75, y: .8, createdAt: 1 });
    recipe.tasks[0].steps[1].landmarkId = 'landmark';
    await seedNotebook(editor, recipe);

    const result = await editor.evaluate(async (payload) => new Promise<{ error?: string }>((resolveMessage) => {
      chrome.runtime.sendMessage(payload, () => resolveMessage({ error: chrome.runtime.lastError?.message }));
    }), { type: 'START_GUIDE', recipe, taskId: 'task', targetOrigin: 'http://app.test' });
    expect(result.error).toBeUndefined();
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-step', '1');
    await app.keyboard.press('ArrowRight');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-step', '2');
    expect(await app.locator('body').getAttribute('data-target-clicks')).toBeNull();
    const storedText = JSON.stringify(await storageSnapshot(editor));
    expect(storedText).not.toContain('never-read-this');
    expect(storedText).not.toContain('Private payroll total 4816');
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
    await new Promise<void>((resolveServer) => server.close(() => resolveServer()));
  }
});

test('@claim:free-complete landmarks, guides, speech, appearance, and encrypted backup work without an account or payment', async () => {
  const server = await startOriginServer();
  const { context, extensionId, profile } = await launchExtension();
  const requests: string[] = [];
  context.on('request', (request) => requests.push(request.url()));
  try {
    const app = await context.newPage();
    await app.goto('http://app.test/');
    const editor = await context.newPage();
    await editor.goto(`chrome-extension://${extensionId}/options.html`);

    await editor.getByRole('button', { name: 'New' }).click();
    await editor.getByLabel('Notebook name').fill('Weekly payroll');
    await editor.getByLabel('App address').fill('http://app.test/weekly');
    await editor.getByRole('button', { name: 'Create notebook' }).click();
    await editor.getByLabel('Short name').fill('Submit payroll');
    await editor.getByLabel('Landmark description').fill('Lower-right control');
    await editor.getByRole('button', { name: 'Place on app' }).click();
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-mode', 'capture');
    await app.keyboard.press('Enter');

    await editor.bringToFront();
    await expect(editor.getByRole('heading', { name: 'Submit payroll' })).toBeVisible();
    await editor.getByRole('tab', { name: 'Task steps' }).click();
    await editor.getByLabel('Task name').fill('Submit weekly hours');
    await editor.getByRole('button', { name: 'Create task' }).click();
    await editor.getByLabel('New step').fill('Check the total, then submit.');
    await editor.getByLabel('Point to landmark (optional)').selectOption({ label: 'Submit payroll' });
    await editor.getByRole('button', { name: 'Add step' }).click();
    await editor.getByRole('button', { name: 'Start guide' }).click();
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-mode', 'guide');
    await app.keyboard.press('Tab');
    await app.keyboard.press('Space');
    await expect(app.locator('#rwtr-overlay')).toHaveAttribute('data-spoken', 'true');
    await app.keyboard.press('Escape');

    await editor.bringToFront();
    await editor.getByRole('button', { name: 'Backup & appearance' }).click();
    await editor.getByLabel('Blueprint').check();
    await expect(editor.locator('body')).toHaveAttribute('data-theme', 'blueprint');
    await editor.getByRole('button', { name: 'Export encrypted backup' }).click();
    await editor.getByLabel('Passphrase', { exact: true }).fill('correct horse battery staple');
    const downloadEvent = editor.waitForEvent('download');
    await editor.getByRole('button', { name: 'Encrypt & download' }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toMatch(/\.rwtr$/);

    await expect(editor.locator('[href*="checkout"], input[type="email"]')).toHaveCount(0);
    const remote = requests.filter((url) => /^https?:/.test(url) && new URL(url).origin !== 'http://app.test');
    expect(remote).toEqual([]);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
    await new Promise<void>((resolveServer) => server.close(() => resolveServer()));
  }
});
