import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve('dist/site');
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.zip': 'application/zip'
};

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidate = resolve(root, `.${decoded}`);
  return candidate === root || candidate.startsWith(`${root}${sep}`) ? candidate : null;
}

async function fileFor(pathname) {
  const candidate = safePath(pathname);
  if (!candidate) return null;
  try {
    const info = await stat(candidate);
    if (info.isDirectory()) return resolve(candidate, 'index.html');
    return candidate;
  } catch {
    if (!extname(candidate)) {
      try {
        const index = resolve(candidate, 'index.html');
        if ((await stat(index)).isFile()) return index;
      } catch { /* handled as 404 */ }
    }
    return null;
  }
}

createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
  const found = await fileFor(pathname);
  const file = found ?? resolve(root, '404.html');
  response.writeHead(found ? 200 : 404, {
    'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': pathname === '/sw.js' ? 'no-cache' : 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  createReadStream(file).pipe(response);
}).listen(4173, '127.0.0.1');
