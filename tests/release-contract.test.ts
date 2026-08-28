import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');

describe('static release contract', () => {
  it('keeps extension downloads out of the single-page-app fallback', async () => {
    const raw = await readFile(resolve(root, 'site/public/staticwebapp.config.json'), 'utf8');
    const config = JSON.parse(raw) as { navigationFallback: { exclude: string[] }; routes: Array<{ route: string; headers?: Record<string, string> }> };
    expect(config.navigationFallback.exclude).toContain('/downloads/*');
    expect(config.routes).toContainEqual({ route: '/downloads/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } });
  });

  it('ships headers that constrain the static site', async () => {
    const raw = await readFile(resolve(root, 'site/public/staticwebapp.config.json'), 'utf8');
    const headers = (JSON.parse(raw) as { globalHeaders: Record<string, string> }).globalHeaders;
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Permissions-Policy']).toContain('camera=()');
  });

  it('does not advertise the unregistered checkout endpoint', async () => {
    const [home, editor] = await Promise.all([
      readFile(resolve(root, 'site/index.html'), 'utf8'),
      readFile(resolve(root, 'entrypoints/options/main.ts'), 'utf8')
    ]);

    expect(home).not.toMatch(/products\/remote-web-task-recipes\/checkout/);
    expect(editor).not.toMatch(/products\/remote-web-task-recipes\/checkout/);
    expect(home).toContain('/downloads/remote-web-task-recipes.zip');
  });
});
