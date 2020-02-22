var CACHE_NAME = 'static-v1'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll([
                '/',
                '/index.html',
                '/index.css',
                '/index.js',
                '/contacts.html',
                '/manifest.json',
                '/menu.css',
                '/menu.html',
                '/studies.html',
                '/AtaquEstok/AtaquEstok.html',
                '/AtaquEstok/css.css',
                '/AtaquEstok/js.js',
                '/AtaquEstok/load.js',
                '/AtaquEstok/objects.js',
                '/AtaquEstok/preview.js',
                '/Invasores/css.css',
                '/Invasores/Invasores.html',
                '/Invasores/js.js',
                '/Invasores/load.js',
                '/Quebra Tudo/css.css',
                '/Quebra Tudo/js.js',
                '/Quebra Tudo/load.js',
                '/Quebra Tudo/Quebra Tudo.html',
                '/S.i.n.S/estilo.css',
                '/S.i.n.S/load.js',
                '/S.i.n.S/nodo.js',
                '/S.i.n.S/S.i.n.S.html',
                '/S.i.n.S/script.js',
                '/S.i.n.S2/css.css',
                '/S.i.n.S2/js.js',
                '/S.i.n.S2/load.js',
                '/S.i.n.S2/nomes.js',
                '/S.i.n.S2/S.i.n.S2.html',
                '/S.i.n.S2/sins.js',
                '/Tetris/arena.js',
                '/Tetris/btn.js',
                '/Tetris/css.css',
                '/Tetris/edit.js',
                '/Tetris/js.js',
                '/Tetris/main.js',
                '/Tetris/player.js',
                '/Tetris/sounds.js',
                '/Tetris/tetris.html'
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