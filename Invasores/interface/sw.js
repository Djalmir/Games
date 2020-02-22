var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/btContinuar1.png',
                '/btContinuar2.png',
                '/btContinuar3.png',
                '/btJogar1.png',
                '/btJogar2.png',
                '/btJogar3.png',
                '/btSair1.png',
                '/btSair2.png',
                '/btSair3.png',
                '/edit1.png',
                '/edit2.png',
                '/loading.png',
                '/logo.png',
                '/menu.png'
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