import { expect, test, chromium, type BrowserContext } from '@playwright/test';
import axe from 'axe-core';
import { createServer, type Server } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const extensionPath = resolve(import.meta.dirname, '../../.output/chrome-mv3');

async function startOriginServer(): Promise<Server> {
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<!doctype html><html><body><h1>Browser-delivered app</h1><p>Private screen</p></body></html>');
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

test('editor overlays expose modal semantics and restore keyboard focus', async () => {
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
    await expect.poll(() => page.evaluate(async () => {
      const runtimeAxe = (window as typeof window & { axe: typeof axe }).axe;
      return (await runtimeAxe.run()).violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? '')).length;
    })).toBe(0);
    await page.keyboard.press('Escape');
    await expect(newNotebook).toBeFocused();

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
