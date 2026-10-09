// Service worker mínimo: busca siempre la versión nueva en la red y, si no hay conexión, usa la última guardada.
const CACHE = 'calavera-app-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;   // las APIs (LLM, voz) pasan directo
  e.respondWith(
    fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })
              .catch(() => caches.match(req))
  );
});
