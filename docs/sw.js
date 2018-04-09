/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "konomi"});

workbox.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "330df6ab5699c2016aa1d93deb7a72de.png",
    "revision": "561dd548067fbaea3278683f9128b8a0"
  },
  {
    "url": "34342e9fed88a6fe37e38cddc9af7fb3.js",
    "revision": "90215daaa67425f09e55e09e65a7f73b"
  },
  {
    "url": "6ca0258f5e847422f2ddc9b8d077d6c0.js",
    "revision": "b5fad26857b8a8631e99d33747df6b38"
  },
  {
    "url": "index.html",
    "revision": "4855e36d47fcd5178c601b0e3912dbfb"
  },
  {
    "url": "opencv/opencv.js",
    "revision": "808c303d6a4e11c9d63199d520aab5e3"
  },
  {
    "url": "opencv/haarcascade_frontalface_default.xml",
    "revision": "a03f92a797e309e76e6a034ab9e02616"
  },
  {
    "url": "tfjs/group1-shard1of5",
    "revision": "815e50504e615d027b88c3ef26f8137e"
  },
  {
    "url": "tfjs/group1-shard2of5",
    "revision": "b65f6b3a52d47a8cb3fdd7e559c4b02b"
  },
  {
    "url": "tfjs/group1-shard3of5",
    "revision": "3872ef2ec17c04ffdb4519a7d92709f2"
  },
  {
    "url": "tfjs/group1-shard4of5",
    "revision": "1b56d2ffd1e9f09ff03d3c890b24ae79"
  },
  {
    "url": "tfjs/group1-shard5of5",
    "revision": "4bae6fafcdd41b5faf20f3c5b5f23b24"
  },
  {
    "url": "tfjs/tensorflowjs_model.pb",
    "revision": "31bef154b246db257bf21002da5f8392"
  },
  {
    "url": "tfjs/weights_manifest.json",
    "revision": "7e23d3998d3c9caacb6a8b8fdfe3ce59"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
