const PREFIX = "Kool-";
// IMPORTANT : Change cette version (ex: Kool-v3, Kool-v4...) à chaque fois que tu déploies une mise à jour majeure
const CACHE = "Kool-v2";
const ASSETS = ['./', './index.html', './manifest.json', './icon.png', './icon-192.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  
  e.respondWith(
    // no-cache : contourne le cache HTTP du navigateur et de GitHub Pages
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        // On ne garde en cache que les réponses valides (pas les 404 ou 500)
        if (res && res.ok && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});