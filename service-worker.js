const CACHE_NAME = "rawbt-v3";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon.png",
    "./icon-192.png",
    "./icon-512.png",
    "./css/style.css",
    "./js/bluetooth.js",
    "./js/escpos.js",
    "./js/thermal.js"
];

// INSTALL
self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );
});

// ACTIVATE
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
            .then(response => {

                const clone = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, clone));

                return response;

            })
            .catch(() => caches.match(event.request))

    );

});
