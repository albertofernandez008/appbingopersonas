const CACHE = 'people-bingo-v2';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebase') || e.request.url.includes('googleapis')) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(r => r || fetch(e.request).then(res => {
        cache.put(e.request, res.clone()); return res;
      }))
    )
  );
});
