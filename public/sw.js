// Service Worker for AITEA Website
const CACHE_NAME = 'aitea-unsplash-images-cache-v1';

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Intercept requests to Unsplash images
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Stale-While-Revalidate Strategy
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch((err) => {
            console.warn('SW: Fetch from Unsplash failed, utilizing cached content', err);
          });

          // Return cached response if available, else wait for network response
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
