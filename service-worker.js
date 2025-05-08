self.addEventListener('install', (e) => {
  self.skipWaiting(); // Skip waiting to activate immediately
});

self.addEventListener('activate', (e) => {
  // You can leave this empty or perform actions if needed
});