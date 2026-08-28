import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');

function decodeEntities(value: string): string {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function visibleLandingUnits(html: string): string[] {
  const strip = (value: string) => decodeEntities(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
  const tagged = [...html.matchAll(/<(a|h1|h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((match) => strip(match[2]));
  const actionNote = html.match(/<span class="action-note">([\s\S]*?)<\/span>/)?.[1];
  const alt = html.match(/<img\b[^>]*\balt="([^"]*)"[^>]*>/)?.[1];
  return [...tagged, ...(actionNote ? [strip(actionNote)] : []), ...(alt ? [decodeEntities(alt)] : [])]
    .flatMap((unit) => unit.split(/(?<=[.!?])\s+|\s+·\s+/))
    .filter(Boolean);
}

function auditWordCount(value: string): number {
  return value.trim().split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

function visibleReadmeText(markdown: string): string {
  return decodeEntities(markdown.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[\*`]/g, '')).replace(/\s+/g, ' ');
}

describe('static release contract', () => {
  it('serves extension downloads directly and uses a real 404 response', async () => {
    const raw = await readFile(resolve(root, 'site/public/staticwebapp.config.json'), 'utf8');
    const config = JSON.parse(raw) as { navigationFallback?: unknown; responseOverrides: Record<string, { rewrite: string; statusCode: number }>; routes: Array<{ route: string; headers?: Record<string, string> }> };
    expect(config.navigationFallback).toBeUndefined();
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
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

  it('keeps every editor overlay semantic and restores focus on close', async () => {
    const editor = await readFile(resolve(root, 'entrypoints/options/main.ts'), 'utf8');
    expect(editor).toContain("dialog.setAttribute('role', 'dialog')");
    expect(editor).toContain("dialog.setAttribute('aria-modal', 'true')");
    expect(editor).toContain('if (trigger?.isConnected) trigger.focus();');
  });

  it('makes site builds self-sufficient in a clean clone', async () => {
    const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    expect(manifest.scripts['prebuild:site:assets']).toBe('npm run prepare:wxt');
    expect(manifest.scripts['test:claims']).toContain('build:site:assets');
    expect(manifest.scripts.build).toBe('npm run build:site');
  });

  it('lists every claim tag exactly once and no undeclared claim tags', async () => {
    const claims = JSON.parse(await readFile(resolve(root, '.factory/claims.json'), 'utf8')) as Array<{ id: string; test: string }>;
    const testSources = (await Promise.all([
      'tests/core.test.ts',
      'tests/browser/extension.spec.ts',
      'tests/site/claims.spec.ts',
      'tests/release-contract.test.ts'
    ].map((file) => readFile(resolve(root, file), 'utf8')))).join('\n');
    const found = [...testSources.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]);
    expect(new Set(found)).toEqual(new Set(claims.map((claim) => claim.id)));
    for (const claim of claims) {
      expect(found.filter((id) => id === claim.id)).toHaveLength(1);
      expect(claim.test).toContain(`@claim:${claim.id}`);
    }
  });

  it('ships full metadata and route-focus handling on every static page', async () => {
    const pages = ['site/index.html', 'site/demo/index.html', 'site/privacy/index.html', 'site/terms/index.html', 'site/404.html'];
    for (const file of pages) {
      const html = await readFile(resolve(root, file), 'utf8');
      expect(html).toMatch(/<html lang="en">/);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toMatch(/<main\b/);
      expect(html).toMatch(/<meta name="description"/);
      expect(html).toMatch(/<link rel="canonical"/);
      expect(html).toMatch(/<meta property="og:title"/);
      expect(html).toMatch(/<meta name="twitter:title"/);
      expect(html).toMatch(/<link rel="apple-touch-icon"/);
      expect(html).toContain('Built by Param Factory');
      expect(html).toContain('/privacy/');
      expect(html).toContain('/terms/');
    }
  });

  it('keeps the complete copy audit synchronized with landing and README source', async () => {
    const [audit, home, readme, catalog] = await Promise.all([
      readFile(resolve(root, '.factory/copy-audit.md'), 'utf8'),
      readFile(resolve(root, 'site/index.html'), 'utf8'),
      readFile(resolve(root, 'README.md'), 'utf8'),
      readFile(resolve(root, '.factory/catalog-description.txt'), 'utf8')
    ]);
    const rows = [...audit.matchAll(/^\| ([LR]\d+) \| (\d+) \| (.*?) \| .* \|$/gm)].map((match) => ({ id: match[1], words: Number(match[2]), text: decodeEntities(match[3]) }));
    const landingRows = rows.filter((row) => row.id.startsWith('L'));
    const readmeRows = rows.filter((row) => row.id.startsWith('R'));
    expect(landingRows.map((row) => row.id)).toEqual(Array.from({ length: 46 }, (_, index) => `L${String(index + 1).padStart(2, '0')}`));
    expect(readmeRows.map((row) => row.id)).toEqual(Array.from({ length: 59 }, (_, index) => `R${String(index + 1).padStart(2, '0')}`));
    for (const row of rows) {
      const source = row.id.startsWith('L') ? `${home.replace(/<[^>]*>/g, ' ')} ${visibleLandingUnits(home).join(' ')}` : visibleReadmeText(readme);
      expect(decodeEntities(source).replace(/\s+/g, ' ')).toContain(row.text.replace(/\s+/g, ' '));
      expect(auditWordCount(row.text)).toBe(row.words);
    }
    for (const unit of visibleLandingUnits(home)) expect(landingRows.some((row) => row.text.includes(unit))).toBe(true);
    const catalogLine = catalog.trim();
    expect(catalogLine).toMatch(/^Save\b/);
    expect(catalogLine.length).toBeLessThanOrEqual(120);
    expect(audit).toContain(`| 10 | ${catalogLine} |`);
  });

  it('@claim:artwork-provenance documents the AI-assisted landing artwork with its source record', async () => {
    const [home, provenance, source] = await Promise.all([
      readFile(resolve(root, 'site/index.html'), 'utf8'),
      readFile(resolve(root, 'assets/src/hero-notebook.json'), 'utf8'),
      readFile(resolve(root, 'assets/src/hero-notebook-clean.png'))
    ]);
    const record = JSON.parse(provenance) as { generated: string; tool: string; deployment: string; selected: string; prompt: string; edit_prompt: string };
    const sourceInfo = await stat(resolve(root, 'assets/src/hero-notebook-clean.png'));
    expect(home).toContain('AI-assisted project artwork.');
    expect(record).toMatchObject({ generated: '2026-08-27', tool: '/opt/fleet/lib/gen-image.sh', deployment: 'factory-image', selected: 'hero-notebook-clean.png' });
    expect(record.prompt).toContain('accessibility field notebook');
    expect(record.edit_prompt).toContain('No readable text');
    expect(source.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect([source.readUInt32BE(16), source.readUInt32BE(20)]).toEqual([1024, 1024]);
    expect(sourceInfo.size).toBeGreaterThan(100_000);
    expect(createHash('sha256').update(source).digest('hex')).toBe('2d7170f3816d2bdb21b33de142bd105b2523e112ea278f11e26f5f1d1300d8c7');
  });
});
