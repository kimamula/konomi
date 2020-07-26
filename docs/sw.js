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
    "url": "38cfd497e03c71860e2f82f00b57c116.js",
    "revision": "4eedd75d4698f594582d11d24ce9992f"
  },
  {
    "url": "3ebbe2c659b0794368436da9ef94b740.png",
    "revision": "4f85e93da100083112a94e7c47da28fe"
  },
  {
    "url": "8e2b38d45099c3a0986c5912fc16dfea.png",
    "revision": "a4b3cec594b2f9f36e110e5b080ce0cc"
  },
  {
    "url": "aca1c67189d0fab7034d82d4fc34d3e4.js",
    "revision": "a2e3813e9e2316a8d011fe813bdb0bc4"
  },
  {
    "url": "d245fec481001cc136549f4c48368286.png",
    "revision": "561dd548067fbaea3278683f9128b8a0"
  },
  {
    "url": "index.html",
    "revision": "699c03beacc8c2edc629758fa27a75f2"
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
    "revision": "bdf812dbae25c02ac22d90ddf8303b4e"
  },
  {
    "url": "tfjs/weights_manifest.json",
    "revision": "4d64a9dcf8017125c0ec3e70a5d84130"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
