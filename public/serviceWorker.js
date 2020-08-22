const cacheName = "v1";

const cacheAssets = ["./", "index.html"];

self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request)
          .then((response) => {
            return caches.open(cacheName).then((cache) => {
              if (response.type === "basic") {
                cache.put(event.request.url, response.clone());
              }
              return response;
            });
          })
          .catch(() => {
            return caches.match("./").then((response) => {
              if (response) {
                console.log("Found ", event.request.url, " in cache");
                console.log(response);
                return response;
              }
            });
          });
      })
      .catch((error) => {
        console.log("error in loading pages");
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating new service worker...");

  const cacheAllowlist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
