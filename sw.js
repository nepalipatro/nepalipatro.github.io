'use strict'

var appVersion = '1.2.1'
var CACHE_NAME = 'nepalipatro-v' + appVersion

var ASSETS = [
  '/global.css?v=' + appVersion,
  '/build/bundle.css?v=' + appVersion,
  '/build/bundle.js?v=' + appVersion,
  '/icons/icon-152.png',
  '/icons/icon-180.png',
  '/icons/icon-167.png',
  '/icons/icon-192.png',
  '/icons/icon-196.png',
  '/icons/icon-512.png',
  '/lang/en.json',
  '/lang/ne.json',
  '/data/years.json?v=' + appVersion,
  '/data/2079-01.json',
  '/data/2079-02.json',
  '/data/2079-03.json',
  '/data/2079-04.json',
  '/data/2079-05.json',
  '/data/2079-06.json',
  '/data/2079-07.json',
  '/data/2079-08.json',
  '/data/2079-09.json',
  '/data/2079-10.json',
  '/data/2079-11.json',
  '/data/2079-12.json',
]

self.addEventListener('install', function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      cache.addAll(ASSETS)
    }),
  )

  self.skipWaiting()
})

self.addEventListener('activate', function (evt) {
  evt.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        }),
      )
    }),
  )

  self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache
          .match(event.request)
          .then(function (response) {
            return (
              response ||
              fetch(event.request)
                .then(function (response) {
                  cache.put(event.request, response.clone())
                  return response
                })
                .catch(console.error)
            )
          })
          .catch(console.error)
      })
      .catch(console.error),
  )
})
