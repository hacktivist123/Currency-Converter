let cacheName = 'v2';
let cacheFiles = [
    './',
    './index.html',
    './css/styles.css',
    'https://fonts.googleapis.com/css?family=Jura',
    './js/app.js',
    './js/scripts.js'
];

self.addEventListener('install', (e) => {
    console.log("[ServiceWorker] installed");

    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', (e) => {
    console.log("[ServiceWorker] Activated");

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((thisCasheName) => {
                if (thisCasheName !== cacheName) {
                    console.log("[ServiceWorker] Removing cache files from", thisCasheName);
                    return caches.delete(thisCasheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', (e) => {
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(
        caches.match(e.request).then((response) => {
            if (response){
                console.log('[ServiceWorker] Found in cache', e.request.url);
                return response;
            }

            let requestClone = e.request.clone();

            fetch(requestClone).then((response) => {
                if (!response) {
                    console.log('[ServiceWorker] No response from fetch');
                    return response;
                }

                let responseClone = response.clone();

                caches.open(cacheName).then((cache) => {
                    cache.put(e.request, responseClone);
                    return fetch(e.request);
                });

            }).catch((err) => {
                console.log('[ServiceWorker] Error fetching & caching');
            });
        })
    )

});