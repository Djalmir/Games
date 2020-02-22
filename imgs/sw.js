var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/dj-72.png',
                '/dj-96.png',
                '/dj-128.png',
                '/dj-144.png',
                '/dj-152.png',
                '/dj-192.png',
                '/dj-384.png',
                '/dj-512.png',
                '/dj.png',
                '/djgames.png',
                '/djGit.png',
                '/fullScreen.png',
                '/ico.ico',
                '/loading.gif'
            ])
        })
    )
})

self.addEventListener('activate', function activator(event){
    event.waitUntil(
        caches.keys().then(function (keys){
            return Promise.all(keys
                .filter(function (key){
                    return key.indexOf(CACHE_NAME)!==0
                })
                .map(function (key){
                    return caches.delete(key)
                })
            )
        })
    )
})

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse){
            return cachedResponse || fetch(event.request)
        })
    )
})