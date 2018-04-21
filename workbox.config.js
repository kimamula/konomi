module.exports = {
  globDirectory: 'docs/',
  globPatterns: [
    '**\/*.{js,css,html,png,mp3}',
    '**\/opencv\/*',
    '**\/tfjs\/*',
  ],
  swDest: 'docs/sw.js',
  skipWaiting: true,
  cacheId: 'konomi',
  maximumFileSizeToCacheInBytes: 12 * 1024 * 1024
};