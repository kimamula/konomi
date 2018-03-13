importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.2/workbox-sw.js');

workbox.routing.registerRoute(
  /.*\.(js|bin|html)$/,
  workbox.strategies.cacheFirst()
);