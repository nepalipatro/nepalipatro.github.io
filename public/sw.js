'use strict'

var CACHE_NAME = 'nepalipatro-v1.0.1'
var ASSETS = [
  '/global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  '/icons/icon-152.png',
  '/icons/icon-180.png',
  '/icons/icon-167.png',
  '/icons/icon-192.png',
  '/icons/icon-196.png',
  '/icons/icon-512.png',
  '/lang/en.json',
  '/lang/ne.json',
  '/data/2077-01.json',
  '/data/2077-02.json',
  '/data/2077-03.json',
  '/data/2077-04.json',
  '/data/2077-05.json',
  '/data/2077-06.json',
  '/data/2077-07.json',
  '/data/2077-08.json',
  '/data/2077-09.json',
  '/data/2077-10.json',
  '/data/2077-11.json',
  '/data/2077-12.json',
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
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone())
            return response
          })
        )
      })
    }),
  )
})
