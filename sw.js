// Service Worker Install
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Service Worker Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
