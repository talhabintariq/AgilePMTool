// Minimal service worker: cache the app shell + feed snapshot so the app
// opens offline and renders instantly. Network-first for the live feed
// (so users always get fresh meetings when online), cache-first for
// vendored assets that don't change between deploys.
const CACHE = "recovery-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./vendor/tailwind.css",
  "./vendor/react.min.js",
  "./vendor/react-dom.min.js",
  "./vendor/babel.min.js",
  "./data/aa-feed-snapshot.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Network-first for the live AA feed and CORS proxies — always try fresh.
  const isLiveFeed = /aaferndale\.org|corsproxy\.io|allorigins\.win/.test(url.hostname);
  if (isLiveFeed) {
    event.respondWith(
      fetch(request).catch(() => caches.match("./data/aa-feed-snapshot.json"))
    );
    return;
  }

  // Cache-first for same-origin shell assets, falling back to network.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((hit) =>
        hit || fetch(request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        }).catch(() => caches.match("./index.html"))
      )
    );
  }
});
