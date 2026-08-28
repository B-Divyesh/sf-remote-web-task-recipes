const CACHE = 'rwtr-site-v4';
const SHELL = ['/', '/demo/', '/privacy/', '/terms/', '/404.html', '/assets/hero-notebook-800.webp'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response;
  }).catch(async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode !== 'navigate') return Response.error();
    const notFound = await caches.match('/404.html');
    if (!notFound) return Response.error();
    return new Response(await notFound.blob(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
