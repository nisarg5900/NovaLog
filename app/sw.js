// NovaLog service worker — offline-first asset caching.
// Strategy:
//   - HTML / JS / CSS / SVG (the app shell)     → stale-while-revalidate
//   - Same-origin GET (manifest, icons)         → cache-first then network
//   - Cross-origin GET (Supabase, hCaptcha CDN) → network-only
//   - All non-GET requests                      → bypass SW (network only)
//
// Writes to Supabase that fail when offline are NOT queued at the SW
// layer — that's handled in the app via localStorage queue + drain on
// the 'online' window event. Keeps the SW simple and consistent
// across browsers (no Background Sync dependency).

const VERSION = 'novalog-shell-v2';
const SHELL_URLS = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  '../assets/novalog-icon.svg',
  '../assets/novalog-wordmark.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await Promise.all(SHELL_URLS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // POST/PATCH go straight to network

  const url = new URL(req.url);

  // Don't touch Supabase API, auth, or third-party CDNs.
  if (url.origin !== self.location.origin) return;

  // Stale-while-revalidate for everything same-origin.
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => null);
    return cached || (await network) || cache.match('./index.html');
  })());
});
