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
    "revision": "7623940ba5769b1ac78ec3702c1bd4e8"
  },
  {
    "url": "6ca0258f5e847422f2ddc9b8d077d6c0.js",
    "revision": "28667ee8e4dee110462ccbe086efd1c1"
  },
  {
    "url": "index.html",
    "revision": "b54034e8722d4ca60f767f8153817df8"
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
    "revision": "c9b6f23495b1cf767ac19ce66b64fc6d"
  },
  {
    "url": "tfjs/group1-shard2of5",
    "revision": "3dd1c575f71b1d67673107b84d35625e"
  },
  {
    "url": "tfjs/group1-shard3of5",
    "revision": "a62f367c99171633f24b4da33c9dc485"
  },
  {
    "url": "tfjs/group1-shard4of5",
    "revision": "46a4155749dd363d21a1486010fdfaa9"
  },
  {
    "url": "tfjs/group1-shard5of5",
    "revision": "96fe96c1dd1900263d1f6be1cdf08409"
  },
  {
    "url": "tfjs/tensorflowjs_model.pb",
    "revision": "4d09727db667640fb16d8e1d40925044"
  },
  {
    "url": "tfjs/weights_manifest.json",
    "revision": "4d64a9dcf8017125c0ec3e70a5d84130"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
