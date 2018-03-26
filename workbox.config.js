module.exports = {
  globDirectory: 'docs/',
  globPatterns: [
    '**\/*.{js,css,html,png}',
    '**\/dl-manifest\/*'
  ],
  swDest: 'docs/sw.js',
  skipWaiting: true,
  cacheId: 'konomi',
  maximumFileSizeToCacheInBytes: 8 * 1024 * 1024
};