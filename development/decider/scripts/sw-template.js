const CACHE_NAME=__CACHE_NAME__;
const FILES=__FILES__;
const BASE=new URL('./',self.location.href);
const PREFIX='decider:'+BASE.href+':';
const CACHE=PREFIX+CACHE_NAME;
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(file=>new Request(new URL(file,BASE),{cache:'reload'})))));
 // A replacement waits for a deliberate restart or for all old tabs to close.
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  // Keep prior snapshots for open tabs using older content-hashed asset URLs.
  // They are confined to this app's scope and can be cleared in browser storage.
  await self.clients.claim();
 })());
});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 if(event.request.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===BASE.pathname+'index.html')){
  event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL('index.html',BASE))).then(response=>response||fetch(event.request)));
  return;
 }
 const isAsset=FILES.some(file=>new URL(file,BASE).href===url.href);
 if(isAsset)event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request)).then(response=>response||fetch(event.request)));
 // All other requests, including forms and analytics, pass through untouched.
});
