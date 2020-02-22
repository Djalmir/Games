var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/movendo (1).png',
                '/movendo (2).png',
                '/movendo (3).png',
                '/movendo (4).png',
                '/movendoC (1).png',
                '/movendoC (2).png',
                '/movendoC (3).png',
                '/movendoC (4).png',
                '/movendoM (1).png',
                '/movendoM (2).png',
                '/movendoM (3).png',
                '/movendoM (4).png',
                '/parado (1).png',
                '/parado (2).png',
                '/parado (3).png',
                '/parado (4).png',
                '/paradoC (1).png',
                '/paradoC (2).png',
                '/paradoC (3).png',
                '/paradoC (4).png',
                '/paradoM (1).png',
                '/paradoM (2).png',
                '/paradoM (3).png',
                '/paradoM (4).png',
                '/tiro.png',
                '/tiroCan.png',
                '/tiroCan2.png',
                '/tiroMet.png',
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