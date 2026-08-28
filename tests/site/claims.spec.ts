import { expect, test } from '@playwright/test';
import axe from 'axe-core';

const demoKey = 'demo:remote-web-task-recipes';

test('@claim:demo-workflow shows the named sample and a guide that never operates it', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.getByRole('heading', { name: 'Find the payroll submit control again.' })).toBeVisible();
  await expect(page.locator('#landmark-list li')).toHaveCount(3);
  await expect(page.getByText('Northstar Payroll', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Step 1 of 3')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Previous step' })).toBeVisible();

  await page.locator('#submit-button').evaluate((target) => {
    target.addEventListener('click', () => { document.body.dataset.sampleClicks = '1'; });
  });
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.getByText('Step 2 of 3')).toBeVisible();
  await page.getByRole('button', { name: 'Speak step' }).click();
  await expect(page.locator('body')).toHaveAttribute('data-spoken', 'true');
  await expect(page.locator('body')).not.toHaveAttribute('data-sample-clicks', '1');
});

test('@claim:demo-isolation keeps sample changes separate and discards them on exit', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page).toHaveURL(/\/demo\//);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([demoKey]);

  await page.getByRole('button', { name: 'Next step' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('Sample notebook reset.')).toBeVisible();
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).step, demoKey)).toBe(0);

  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/#support$/);
  await expect(page.getByRole('link', { name: 'Download extension' }).last()).toBeFocused();
  expect(await page.evaluate((key) => localStorage.getItem(key), demoKey)).toBeNull();
});

test('@claim:demo-positioning supports pointer, Arrow, Shift+Arrow, Enter, and Escape', async ({ page }) => {
  await page.goto('/demo/');
  const original = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).landmarks[2], demoKey);

  await page.getByRole('button', { name: 'Move landmark 3' }).click();
  await expect(page.getByRole('dialog', { name: 'Move confirmation landmark' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Shift+ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Landmark 3 saved in demo storage.')).toBeVisible();
  const keyboardPosition = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).landmarks[2], demoKey);
  expect(keyboardPosition.x).toBeCloseTo(original.x + .01, 5);
  expect(keyboardPosition.y).toBeCloseTo(original.y + .05, 5);

  await page.getByRole('button', { name: 'Move landmark 3' }).click();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Escape');
  await expect(page.getByText('Placement cancelled. No sample data changed.')).toBeVisible();
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).landmarks[2], demoKey)).toEqual(keyboardPosition);

  await page.getByRole('button', { name: 'Move landmark 3' }).click();
  const layer = page.locator('#practice-layer');
  const box = (await layer.boundingBox())!;
  await page.mouse.click(box.x + box.width * .3, box.y + box.height * .35);
  const pointerPosition = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).landmarks[2], demoKey);
  expect(pointerPosition.x).toBeCloseTo(.3, 1);
  expect(pointerPosition.y).toBeCloseTo(.35, 1);
});

test('@claim:site-private makes only same-origin requests through the full sample flow', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo/');
  const productOrigin = new URL(page.url()).origin;
  await page.getByRole('button', { name: 'Move landmark 3' }).click();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Next step' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await page.getByRole('link', { name: 'Start for real' }).click();
  const remote = requests.filter((url) => /^https?:/.test(url) && new URL(url).origin !== productOrigin);
  expect(remote).toEqual([]);
});

test('all public routes have complete metadata, focus, mobile layout, and no serious accessibility violations', async ({ page }) => {
  await page.addInitScript({ content: axe.source });
  await page.setViewportSize({ width: 390, height: 844 });
  const routes = [
    ['/', 'Remote Web Task Recipes — save task landmarks'],
    ['/demo/', 'Demo — Remote Web Task Recipes'],
    ['/privacy/', 'Privacy — Remote Web Task Recipes'],
    ['/terms/', 'Terms — Remote Web Task Recipes']
  ] as const;

  for (const [route, title] of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('main h1')).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveText(['Home', 'Demo', 'Privacy', 'Download extension']);
    expect(await page.locator('h1').count()).toBe(1);
    expect(await page.locator('main').count()).toBe(1);
    expect(await page.locator('meta[name="description"]').count()).toBe(1);
    expect(await page.locator('link[rel="canonical"]').count()).toBe(1);
    expect(await page.locator('meta[property="og:title"],meta[property="og:description"],meta[property="og:image"]').count()).toBe(3);
    expect(await page.locator('meta[name="twitter:title"],meta[name="twitter:description"],meta[name="twitter:image"]').count()).toBe(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const result = await page.evaluate(async () => (window as typeof window & { axe: typeof axe }).axe.run());
    expect(result.violations).toEqual([]);
  }

  await page.goto('/');
  const firstScreenAction = page.getByRole('link', { name: 'Try it with sample data' });
  await expect(firstScreenAction).toBeVisible();
  expect((await firstScreenAction.boundingBox())!.y).toBeLessThan(844);
  expect((await page.locator('.facts span').last().boundingBox())!.y).toBeLessThan(844);
  await firstScreenAction.click();
  await expect(page.locator('main h1')).toBeFocused();
  await page.goBack();
  await expect(page.locator('main h1')).toBeFocused();
  await page.evaluate(() => { document.documentElement.style.fontSize = '36px'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');

  const missing = await page.goto('/not-a-real-route');
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle('Page not found — Remote Web Task Recipes');
  await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeFocused();
  expect(await page.locator('meta[name="twitter:title"]').count()).toBe(1);
  expect(await page.locator('link[rel="apple-touch-icon"]').count()).toBe(1);
});

test('the site shell reloads offline after the first visit', async ({ page, context }) => {
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page).toHaveTitle('Remote Web Task Recipes — save task landmarks');
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  await context.setOffline(false);
});
