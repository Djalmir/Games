var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/estrela (1).png',
                '/estrela (2).png',
                '/nebulosa (1).png',
                '/nebulosa (2).png',
                '/nebulosa (3).png',
                '/nebulosaFundo (5).png',
                '/nebulosaFundo (6).png',
                '/planeta (1).png',
                '/planeta (2).png',
                '/planeta (3).png',
                '/planeta (4).png',
                '/planeta (5).png',
                '/planeta (6).png',
                '/sol.png',
                '/z (1).png',
                '/z (2).png',
                '/z (3).png'
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