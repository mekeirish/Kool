const CACHE_NAME = 'kool-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-database-compat.js',
  'https://cdn.tailwindcss.com'
];

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Stratégie Network-first pour la page HTML (toujours la version la plus récente)
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Stratégie Cache-first pour les assets (scripts, icônes, manifeste)
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});