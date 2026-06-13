// NovaLog service worker — phase-2 stub.
// Just enough to make Chrome / Edge consider the app installable.
// Real offline support (asset cache + write queue) comes in phase 4.

const CACHE = 'novalog-shell-v1';
const SHELL = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  '../assets/novalog-icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => {/* tolerate misses */}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Network-first for everything. Phase 4 will switch to a real
  // offline-first strategy with a write queue.
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    fetch(req).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
