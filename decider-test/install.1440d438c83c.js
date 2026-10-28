// Installs only inside this app's folder. No decision or contact data is cached.
(()=>{
 const host=document.createElement('aside');host.className='app-tools';host.setAttribute('aria-label','App installation and updates');
 host.innerHTML='<div class="app-availability" role="status"></div><button type="button" class="install-app">Add to your phone</button><div class="install-help" hidden><p>On iPhone or iPad: open Share, then Add to Home Screen. On Android: use your browser’s Install app or Add to Home screen option.</p><button type="button" class="close-install-help">Close</button></div><div class="app-update" hidden role="status"><p>A new version is ready. Restarting clears the answers on this page.</p><button type="button" class="apply-update">Update &amp; restart</button><button type="button" class="defer-update">Later</button></div>';
 document.querySelector('footer').before(host);
 const status=host.querySelector('.app-availability'),install=host.querySelector('.install-app'),help=host.querySelector('.install-help'),update=host.querySelector('.app-update');
 let registration,prompt,requested=false,ready=false,lastCheck=0;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const supported='serviceWorker' in navigator&&isSecureContext&&['http:','https:'].includes(location.protocol);
 const hadController=supported&&!!navigator.serviceWorker.controller;
 function refreshContactState(){
  const note=document.getElementById('contact-connection'),button=document.querySelector('#contact-form button[type=submit]');
  if(note)note.textContent=navigator.onLine===false?'You’re offline. Reconnect to send your request. Nothing is sent automatically.':'';
  if(button)button.disabled=navigator.onLine===false;
 }
 function refresh(){
  status.textContent=!supported?'Installable preview: open this app over HTTPS or on localhost.':navigator.onLine===false?(ready?'Offline · decisions and Explore are available.':'Offline · open online once to prepare this app.'):ready?'Ready to use offline':'Preparing offline access…';
  install.hidden=!supported||standalone();refreshContactState();
 }
 function offerUpdate(){if(registration?.waiting)update.hidden=false;}
 async function check(){
  refresh();if(!registration||navigator.onLine===false||Date.now()-lastCheck<60000)return;
  lastCheck=Date.now();try{await registration.update();offerUpdate();}catch{}
 }
 install.onclick=async()=>{
  if(prompt){const p=prompt;prompt=null;await p.prompt();await p.userChoice;refresh();}
  else help.hidden=!help.hidden;
 };
 host.querySelector('.close-install-help').onclick=()=>{help.hidden=true;};
 host.querySelector('.defer-update').onclick=()=>{update.hidden=true;};
 host.querySelector('.apply-update').onclick=()=>{
  requested=true;
  if(registration?.waiting)registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});
  else location.reload();
 };
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;refresh();});
 window.addEventListener('appinstalled',()=>{prompt=null;install.hidden=true;help.hidden=true;});
 window.addEventListener('online',check);window.addEventListener('offline',refresh);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check();});
 if(supported){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
   ready=true;refresh();if(requested)location.reload();
   // Other open tabs retain their answers; they may restart in their own time.
   else if(hadController&&registration?.active)update.hidden=false;
  });
  navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
   registration=reg;ready=!!reg.active;refresh();offerUpdate();
   reg.addEventListener('updatefound',()=>{
    const worker=reg.installing;if(!worker)return;
    worker.addEventListener('statechange',()=>{
     if(worker.state==='installed'){if(navigator.serviceWorker.controller)offerUpdate();else{ready=true;refresh();}}
     if(worker.state==='redundant'&&!reg.active){status.textContent='Offline setup could not finish. Reconnect and reopen to try again.';}
    });
   });
   navigator.serviceWorker.ready.then(()=>{ready=true;refresh();});
  }).catch(()=>{status.textContent='Offline access is unavailable here. You can still use the app online.';});
 }
 window.DeciderInstall={refreshContactState};refresh();
})();
