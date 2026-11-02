const CACHE_NAME="d335aaed4dc8";
const FILES=["index.html","app.b182a9287ffd.js","dynamic-labels.7215e34148e3.js","engine.aa50e5af8461.js","examples.5b7491707d25.js","explanations.410db37443dd.js","icon-192.png","icon-512.png","icon-maskable.png","install.9c0275db6e06.js","manifest.webmanifest","precision.da96ebac7d60.js","services.969107269f68.js","settings.26e750c8d54b.js","style.4ec06b51bac1.css","threshold-chart.680702ffa774.js","welcome.e31d02b5605d.css","welcome.a340e31819fd.js"];
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
