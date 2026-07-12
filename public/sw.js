/* ============================================================
   Service Worker — UniqueBusinessName.com
   Cache-First for App Shell | Network-First for Pages
   ============================================================ */

const CACHE_NAME = 'ubn-wheel-v2';
const OFFLINE_URL = '/offline';

const APP_SHELL = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/offline',
  '/manifest.json',
];

// Install: pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: stale-while-revalidate for navigation, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Skip AdSense / GTM / analytics
  if (
    request.url.includes('googlesyndication') ||
    request.url.includes('googletagmanager') ||
    request.url.includes('google-analytics') ||
    request.url.includes('pagead')
  ) return;

  // Navigation requests: network-first, offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(OFFLINE_URL) || caches.match('/');
      })
    );
    return;
  }

  // Static assets (JS, CSS, fonts, images): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => {
        // For image requests, return nothing rather than error
        if (request.destination === 'image') return new Response('', { status: 204 });
      });
    })
  );
});
