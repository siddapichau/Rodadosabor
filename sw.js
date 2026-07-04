const CACHE_NAME = 'roda-sabor-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/core.js',
  '/logo.png',
  '/manifest.json',
  '/sons.js',
  '/comidas.js',
  '/efeitos-lista.js',
  '/efeitos.js',
  '/roleta.js',
  '/temas.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});