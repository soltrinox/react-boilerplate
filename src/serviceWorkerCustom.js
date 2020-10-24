// Module Start
// JS imports
import { setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import * as googleAnalytics from 'workbox-google-analytics';

// Service Worker - Custom Configuration
self.addEventListener('install', (e) => { /* eslint-disable-line no-restricted-globals */
  /* eslint-disable-next-line no-restricted-globals */
  e.waitUntil(self.skipWaiting());

  // Cache names
  setCacheNameDetails({
    prefix: '',
    googleAnalytics: 'ga',
  });
  // Files precaching
  /* eslint-disable-next-line no-restricted-globals */
  precacheAndRoute(self.__WB_MANIFEST || []);
  // Route Requests
  // app-shell
  registerRoute('/', new NetworkFirst());
  // CDN Resources
  registerRoute(
    /.*(?:googleapis|gstatic|googletagmanager|google|google-analytics|doubleclick)\.com/,
    new StaleWhileRevalidate({
      cacheName: '-resources'
    })
  );
  // Fonts - CSS
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: '-google-fonts-stylesheets'
    })
  );
  // Fonts - Webfonts
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: '-google-fonts-webfonts',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  );
  // Images
  registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new CacheFirst({
      cacheName: '-images',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );
  // CSS
  registerRoute(
    new RegExp('.+\\.css$'),
    new CacheFirst({
      cacheName: '-css',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );
  // JS
  registerRoute(
    new RegExp('.+\\.js$'),
    new NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: '-js',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // Google Analytics
  googleAnalytics.initialize();
});
self.addEventListener('activate', (e) => { /* eslint-disable-line no-restricted-globals */
  const cacheWhiteList = [
    '-resources',
    '-google-fonts-stylesheets',
    '-google-fonts-webfonts',
    '-images',
    '-css',
    '-js'
  ];

  // Old cache deletion
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (cacheWhiteList.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  }).then(() => {
    /* eslint-disable-next-line no-restricted-globals */
    self.clients.claim();
  }));
});
self.addEventListener('fetch', (e) => { /* eslint-disable-line no-restricted-globals */
  e.respondWith(caches.match(e.request).then((response) => {
    if (response) {
      return response;
    }
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
      return;
    }

    return fetch(e.request).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const responseToCache = response.clone();

      caches.keys().then((keyList) => {
        keyList.forEach((key) => {
          caches.open(key).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        });
      });

      return response;
    });
  }));
});
self.addEventListener('message', (e) => { /* eslint-disable-line no-restricted-globals */
  if (e.data && e.data.type === 'SKIP_WAITING') {
    /* eslint-disable-next-line no-restricted-globals */
    self.skipWaiting();
  }
});
self.addEventListener('push', (e) => { /* eslint-disable-line no-restricted-globals */
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: 'img/-128.png',
    vibrate: [50, 50, 50, 50],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [{
      action: 'close',
      title: data.action,
      icon: 'img/-128.png'
    }]
  };

  /* eslint-disable-next-line no-restricted-globals */
  e.waitUntil(self.registration.showNotification(data.title, options));
});
// Module End
