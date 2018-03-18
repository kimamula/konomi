const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
(function(){
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'docs/sw.js',
    globDirectory: 'docs',
    globPatterns: [
      '**\/*.{js,css,html}',
      '**\/dl-manifest\/*'
    ]
  });
})();
