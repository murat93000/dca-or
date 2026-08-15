// v3 : plus aucune mise en cache. Le service worker existe uniquement pour satisfaire
// les critères d'installation PWA de Chrome — toutes les requêtes passent en direct par le réseau.
// Ça évite définitivement les soucis de "version obsolète affichée".
const CACHE = "dca-or-v3";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  // purge tout cache laissé par les anciennes versions (v1, v2)
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request));
});
