/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// Module Start
// JS imports
import { setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import * as googleAnalytics from 'workbox-google-analytics';

// Service Worker - Custom Configuration
declare const self: ServiceWorkerGlobalScope;

// Types
type PushNotification = {
  title: string;
  action: string;
  body: string;
};

self.addEventListener('install', (e: ExtendableEvent): void => {
  e.waitUntil(self.skipWaiting());

  // Cache names
  setCacheNameDetails({
    prefix: 'app',
    googleAnalytics: 'ga',
  });
  // Files precaching
  precacheAndRoute(self.__WB_MANIFEST || []);
  // Route Requests
  // app-shell
  registerRoute('/', new NetworkFirst());
  // CDN Resources
  registerRoute(
    /.*(?:googleapis|creativecommons|licensebuttons|gstatic|googletagmanager|google|google-analytics|doubleclick)\.(?:com|io|org|net)/,
    new StaleWhileRevalidate({
      cacheName: 'app-resources',
    }),
  );
  // Fonts - CSS
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: 'app-google-fonts-stylesheets',
    }),
  );
  // Fonts - Webfonts
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: 'app-google-fonts-webfonts',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
  );
  // Images
  registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new CacheFirst({
      cacheName: 'app-images',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );
  // CSS
  registerRoute(
    new RegExp('.+\\.css$'),
    new CacheFirst({
      cacheName: 'app-css',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );
  // JS
  registerRoute(
    new RegExp('.+\\.js$'),
    new NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: 'app-js',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          // 1 month
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  // Google Analytics
  googleAnalytics.initialize();
});
self.addEventListener('activate', (e: ExtendableEvent): void => {
  const cacheWhiteList: Array<string> = [
    'app-resources',
    'app-google-fonts-stylesheets',
    'app-google-fonts-webfonts',
    'app-images',
    'app-css',
    'app-js',
  ];

  // Old cache deletion
  e.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (cacheWhiteList.indexOf(key) === -1) {
              return caches.delete(key);
            }
          }),
        );
      })
      .then(() => {
        self.clients.claim();
      }),
  );
});
self.addEventListener('fetch', (e: FetchEvent): void => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }
      if (
        e.request.cache === 'only-if-cached' &&
        e.request.mode !== 'same-origin'
      ) {
        return;
      }

      return fetch(e.request).then((res) => {
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        const responseToCache: Response = res.clone();

        caches.keys().then((keyList) => {
          keyList.forEach((key) => {
            caches.open(key).then((cache) => {
              cache.put(e.request, responseToCache);
            });
          });
        });

        return res;
      });
    }),
  );
});
self.addEventListener('message', (e: ExtendableMessageEvent): void => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('push', (e: PushEvent): void => {
  const data: PushNotification = e.data!.json();
  const options: NotificationOptions = {
    body: data.body,
    icon: 'img/-128.png',
    vibrate: [50, 50, 50],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1',
    },
    actions: [
      {
        action: 'close',
        title: data.action,
        icon: 'img/-128.png',
      },
    ],
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});
