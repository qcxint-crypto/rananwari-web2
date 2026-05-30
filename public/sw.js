const STATIC_CACHE = "ran-works-static-v3";
const MEDIA_CACHE = "ran-works-media-v3";
const APP_SHELL = ["/", "/project-detail", "/certificates", "/favicon.ico", "/MWA.png", "/MWA.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(APP_SHELL);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => ![STATIC_CACHE, MEDIA_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "WARM_PROJECT_MEDIA" || !Array.isArray(event.data.assets)) {
    return;
  }

  event.waitUntil(warmProjectMedia(event.data.assets));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (isMediaRequest(url.pathname)) {
    event.respondWith(cacheFirst(event.request, MEDIA_CACHE));
    return;
  }

  if (isShellRequest(url.pathname)) {
    event.respondWith(networkFirst(event.request, STATIC_CACHE));
  }
});

function isShellRequest(pathname) {
  return pathname === "/" || pathname === "/project-detail" || pathname === "/certificates";
}

function isMediaRequest(pathname) {
  return (
    pathname.startsWith("/models/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/certificates/") ||
    pathname === "/MWA.png" ||
    pathname === "/MWA.svg" ||
    pathname === "/PP.JPG"
  );
}

async function warmProjectMedia(urls) {
  const uniqueUrls = [...new Set(urls)].filter((url) => typeof url === "string" && url.startsWith("/"));
  const cache = await caches.open(MEDIA_CACHE);
  const batchSize = 6;

  for (let index = 0; index < uniqueUrls.length; index += batchSize) {
    const batch = uniqueUrls.slice(index, index + batchSize);

    await Promise.allSettled(
      batch.map(async (url) => {
        if (await cache.match(url)) {
          return;
        }

        const response = await fetch(url, { cache: "reload" });
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      })
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    await cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    return cachedResponse || Response.error();
  }
}
