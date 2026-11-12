const PREFIX = "Kool-";
const CACHE = "Kool-v3";
const ASSETS = ['./', './index.html', './manifest.json', './icon.png', './icon-192.png'];

// ---------- Notifications push (Firebase Cloud Messaging) ----------
try {
  importScripts(
    'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js'
  );
  firebase.initializeApp({
    apiKey: "AIzaSyD4ekJLYuL5QTsroQj_QlOUPohDwhlQ14s",
    authDomain: "koul-ec357.firebaseapp.com",
    projectId: "koul-ec357",
    storageBucket: "koul-ec357.firebasestorage.app",
    messagingSenderId: "461125460557",
    appId: "1:461125460557:web:31b3f4366ec233bf9b3204"
  });
  const messaging = firebase.messaging();
  // Appelé quand l'app n'est pas au premier plan
  messaging.onBackgroundMessage(payload => {
    const d = (payload && payload.data) || {};
    if (!d.title && !d.body) return;
    return self.registration.showNotification(d.title || 'Kool', {
      body: d.body || '',
      tag: d.tag || undefined,
      renotify: !!d.tag,
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [200, 100, 200]
    });
  });
} catch (e) {
  // Hors ligne à l'installation : le service worker reste utilisable sans push
  console.error('[sw] push indisponible', e);
}

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow(self.registration.scope);
    })
  );
});

// ---------- Cache ----------
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
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res && res.ok && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});