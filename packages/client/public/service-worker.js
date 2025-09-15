/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'middle-battle-ships-v2';
const urlsToCache = ['/'];

// Установка с принудительным кэшированием
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кэшируем ресурсы при установке');
      return cache
        .addAll(urlsToCache)
        .then(() => {
          console.log('Все ресурсы успешно кэшированы');
        })
        .catch((error) => {
          console.error('Ошибка кэширования:', error);
          // Продолжаем даже с ошибками
        });
    }),
  );
});

// Активация
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      // eslint-disable-next-line array-callback-return
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log('Удаляем старый кэш:', cacheName);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
  self.clients.claim();
});

// Перехват запросов - УПРОЩЕННАЯ версия
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  // Для навигационных запросов - стратегия "сеть сначала, потом кэш"
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/'))
        .catch(() => caches.match('/offline.html')),
    );
    // return;
  }

  /*
  // Для остальных ресурсов - стратегия "кэш сначала, потом сеть"
  if (event.request.method !== 'POST') {
  // типа POST не поддерживается кэшем, потому что он (как я понял) влияет на данные
  // из-за этого его не поддерживают, чтобы ничего "случайно" не изменилось
    event.respondWith(
      caches.match(event.request).then((response) => (
        response ||
          fetch(event.request)
            .then((fetchResponse) => {
              // Кэшируем для будущего использования
              const responseClone = fetchResponse.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseClone));
              return fetchResponse;
            })
            .catch(() => {
              // Fallback для разных типов ресурсов
              if (event.request.destination === 'image') {
                return caches.match('/images/placeholder.png');
              }
              return new Response('Офлайн режим');
            })
      )),
    );
  }
    */
});
