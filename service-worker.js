// Define the cache name and version
const cacheName = 'qr-scanner-v1';

// List of URLs to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== cacheName)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached response if found
        if (response) {
          return response;
        }

        // Clone the request
        const requestClone = event.request.clone();

        return fetch(requestClone)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseClone = response.clone();

            // Cache the fetched response
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return response;
          });
      })
  );
});