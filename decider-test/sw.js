const CACHE_NAME="e8e7d597218f";
const FILES=["index.html","app.6cde9eaa3633.js","dynamic-labels.bb97f5b0fe28.js","engine.aa50e5af8461.js","examples.c82ae16233e9.js","explanations.410db37443dd.js","icon-192.png","icon-512.png","icon-maskable.png","information.c65482b40aec.js","install.9c0275db6e06.js","manifest.webmanifest","opening-demo.ab6d2bb9cc12.js","precision.da96ebac7d60.js","services.f596c2a358c4.js","settings.26e750c8d54b.js","style.4ec06b51bac1.css","threshold-chart.680702ffa774.js","welcome.c300780e6f14.css","welcome.f06c17c13dd2.js"];
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
