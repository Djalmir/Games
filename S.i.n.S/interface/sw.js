var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/1-2.png',
                '/checked.png',
                '/Continuar1.png',
                '/Continuar2.png',
                '/edit.png',
                '/ia1.png',
                '/ia2.png',
                '/Jogar1.png',
                '/Jogar2.png',
                '/loading.png',
                '/logo.png',
                '/menu.png',
                '/modo.png',
                '/range.png',
                '/S.i.n.S.png',
                '/Sair1.png',
                '/Sair2.png',
                '/selVel.png',
                '/unchecked.png'
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