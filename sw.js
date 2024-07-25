var GHPATH = '/censored.space';
var APP_PREFIX = 'gppwa_';
var VERSION = 'version_002';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/index.css`,
  `${GHPATH}/index.js`,
  `${GHPATH}/manifest.webmanifest`,
  `${GHPATH}/favicon.ico`,
  `${GHPATH}/common/style.css`,
  `${GHPATH}/common/assets/img/icon.png`,
  `${GHPATH}/common/assets/img/altstore-2.0.jpg`,
  `${GHPATH}/common/assets/img/generic_app.jpeg`,
  `${GHPATH}/common/assets/img/loading.gif`,
  `${GHPATH}/common/components/AltStoreBanner.js`,
  `${GHPATH}/common/components/AppHeader.js`,
  `${GHPATH}/common/components/AppPermissionItem.js`,
  `${GHPATH}/common/components/NavigationBar.js`,
  `${GHPATH}/common/components/NewsItem.js`,
  `${GHPATH}/common/components/VersionHistoryItem.js`,
  `${GHPATH}/common/components/AppHeader.js`,
  `${GHPATH}/common/modules/constants.js`,
  `${GHPATH}/common/modules/main.js`,
  `${GHPATH}/common/modules/utilities.js`,
  `${GHPATH}/view/all-apps/index.html`,
  `${GHPATH}/view/all-apps/all-apps.css`,
  `${GHPATH}/view/all-apps/all-apps.js`,
  `${GHPATH}/view/app/version-history/index.html`,
  `${GHPATH}/view/app/version-history/version-history.css`,
  `${GHPATH}/view/app/version-history/version-history.js`,
  `${GHPATH}/view/app/app.css`,
  `${GHPATH}/view/app/app.js`,
  `${GHPATH}/view/app/index.html`,
  `${GHPATH}/view/news/index.html`,
  `${GHPATH}/view/news/news.css`,
  `${GHPATH}/view/news/news.js`,
  `${GHPATH}/view/index.html`,
  `${GHPATH}/view/view.js`,
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
