const CACHE_NAME = 'middle-battle-ships'
const urlsToCache = ['/']

// Установка
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  )
})

// Активация и очистка старого кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Перехват запросов
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    caches.match(event.request).then(response => {
      // Возвращаем кэш или делаем сетевой запрос
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            // Кэшируем новый ресурс
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request.url, fetchResponse.clone())
              return fetchResponse
            })
          })
          .catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/offline.html')
            }
          })
      )
    })
  )
})
