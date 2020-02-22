var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/canhao.png',
                '/escudo (1).png',
                '/escudo (2).png',
                '/escudo (3).png',
                '/escudo (4).png',
                '/escudo (5).png',
                '/escudo (6).png',
                '/escudo (7).png',
                '/escudo (8).png',
                '/escudo (9).png',
                '/escudo (10).png',
                '/escudo (11).png',
                '/escudo (12).png',
                '/escudo (13).png',
                '/escudo (14).png',
                '/escudo (15).png',
                '/escudo (16).png',
                '/escudo.png',
                '/escudo2 (1).png',
                '/escudo2 (2).png',
                '/escudo2 (3).png',
                '/escudo2 (4).png',
                '/escudo2 (5).png',
                '/escudo2 (6).png',
                '/escudo2 (7).png',
                '/escudo2 (8).png',
                '/escudo2 (9).png',
                '/escudo2 (10).png',
                '/escudo2 (11).png',
                '/escudo2 (12).png',
                '/escudo2 (13).png',
                '/escudo2 (14).png',
                '/escudo2 (15).png',
                '/escudo2 (16).png',
                '/metranca.png',
                '/nvlArma.png',
                '/tps.png',
                '/vida.png'
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