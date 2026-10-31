// Basic counters and optional Google Analytics are separate services.
// Only fixed event labels are accepted. Form fields and decision inputs are excluded.
const DeciderUsage=(()=>{
 const settings=window.DECIDER_SETTINGS||{},raw=settings.aggregateEndpoint||'',id=settings.googleMeasurementId||'';
 const aggregateValid=/^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/.test(raw);
 const googleValid=/^G-[A-Z0-9]+$/.test(id),consentKey='decider-google-consent-v3';
 const allowed=new Set(['page_view','decision_started','decision_completed','mode_changed','explore_opened','page_opened','contact_opened','contact_submitted','contact_email_prepared','analytics_consent_given']);
 const pending=new Set();let optedOut=false,googleAllowed=false,googleLoaded=false,consentTime=0;
 const privateBrowser=()=>navigator.globalPrivacyControl===true||navigator.doNotTrack==='1';
 try{
  optedOut=localStorage.getItem('decider-counting-optout')==='yes';
  const stored=JSON.parse(localStorage.getItem(consentKey)||'null');
  googleAllowed=stored?.allowed===true&&Date.now()-stored.time<180*86400000;consentTime=stored?.time||0;
  for(const k of ['decider-usage-consent','decider-usage-consent-v2','decider-usage-counts'])localStorage.removeItem(k);
 }catch{}
 function clearGoogleCookies(){
  for(const name of ['_ga','_ga_'+id.slice(2)]){document.cookie=name+'=; Max-Age=0; path=/';const parts=location.hostname.split('.');for(let i=0;i<parts.length-1;i++)document.cookie=name+'=; Max-Age=0; path=/; domain='+parts.slice(i).join('.');}
 }
 if(!googleAllowed||privateBrowser())clearGoogleCookies();
 function initGoogle(){
  if(!googleValid||googleLoaded||!googleAllowed||privateBrowser())return;
  googleLoaded=true;window['ga-disable-'+id]=false;window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_title:'Decider',page_referrer:''});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
 }
 function track(event){
  if(!allowed.has(event)||privateBrowser()||navigator.onLine===false)return;
  if(aggregateValid&&!optedOut&&['http:','https:'].includes(location.protocol)&&event!=='analytics_consent_given'){
   const url=new URL(raw);url.searchParams.set('p',event==='page_view'?'/sigfi/':event);url.searchParams.set('t','Decider');url.searchParams.set('e',event==='page_view'?'false':'true');url.searchParams.set('r','');url.searchParams.set('rnd',Math.random().toString(36).slice(2));
   fetch(url.href,{method:'GET',mode:'no-cors',credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',keepalive:true}).catch(()=>{});
  }
  if(googleValid&&googleAllowed){initGoogle();gtag('event',event,{send_to:id,app_version:'1.17-installable',page_location:location.origin+location.pathname,page_title:'Decider',page_referrer:''});}
 }
 function setGoogleConsent(value){
  googleAllowed=!!value;consentTime=Date.now();
  try{localStorage.setItem(consentKey,JSON.stringify({allowed:googleAllowed,time:consentTime}));}catch{}
  window['ga-disable-'+id]=!googleAllowed;
  if(googleAllowed){if(googleLoaded)gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});track('analytics_consent_given');}
  else{clearGoogleCookies();}
 }
 function setOptOut(value){optedOut=!!value;try{if(optedOut)localStorage.setItem('decider-counting-optout','yes');else localStorage.removeItem('decider-counting-optout');}catch{}}
 track('page_view');return {track,setOptOut,isOptedOut:()=>optedOut,isConfigured:()=>aggregateValid,setGoogleConsent,isGoogleAllowed:()=>googleAllowed,googleAvailable:()=>googleValid&&!privateBrowser()};
})();
let contactDraft={email:'',phone:'',comments:'',ack:false};
function renderContact(){DeciderUsage.track('contact_opened');
 const endpoint=DECIDER_SETTINGS.contactEndpoint,automatic=endpoint.startsWith('https://');
 app.innerHTML=`<button class="back" id="contact-back">${window.DeciderExampleContact?'← Back to example':'← Back to Explore'}</button><h1 class="input-title">Let’s talk.</h1><p>Would you like one of our consultants to contact you to consider your decision in more detail?</p><p>We’ll review your request and respond only if we believe we can add value to your decision. Submitting a request does not guarantee a response or a consultation.</p><form class="contact-form" id="contact-form"><div style="display:none" aria-hidden="true"><label>Leave this empty<input name="_gotcha" type="text" tabindex="-1" autocomplete="off"></label></div><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" value="${escapeText(contactDraft.email)}"><label for="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="60" value="${escapeText(contactDraft.phone)}"><p class="quiet">Provide an email address, a phone number, or both.</p><label for="contact-comments">What would you like to discuss? (optional)</label><textarea id="contact-comments" name="comments" maxlength="3000">${escapeText(contactDraft.comments)}</textarea><label class="check"><input id="contact-ack" name="acknowledgement" type="radio" value="acknowledged" required ${contactDraft.ack?'checked':''}><span>I acknowledge that additional services may be chargeable.</span></label><label class="check optional-analytics"><input id="contact-analytics" type="checkbox" ${DeciderUsage.isGoogleAllowed()?'checked':''} ${DeciderUsage.googleAvailable()?'':'disabled'}><span>Optional: I allow Google Analytics to measure my use of Decider from now on, using analytics cookies and technical browsing information. My contact details and decision inputs are excluded from our analytics events. This is separate from my contact request.</span></label><p class="quiet">You can withdraw this permission in About. There is no need to agree to request a conversation.</p><p class="quiet">Your contact details and comments will be shared with Nigel Wallbridge only when you send this request. With automatic delivery enabled, Formspree processes the submission to deliver it to us. Your decision inputs are not included automatically.</p><p>${automatic?'Send a request to nigel.wallbridge@bluewin.ch.':'This opens your email app with a message to nigel.wallbridge@bluewin.ch. Review it and press Send there. If no email app opens, email that address directly.'}</p><div id="contact-status" role="status"></div><p id="contact-connection" role="status" class="connection-note"></p><button class="primary" type="submit">${automatic?'Send contact request':'Prepare email request'}</button><button class="explore-button" id="contact-explore" type="button">${window.DeciderExampleContact?'Back to example':'Back to Explore'}</button></form>`;
 window.DeciderInstall?.refreshContactState();
 document.getElementById('contact-analytics').onchange=e=>DeciderUsage.setGoogleConsent(e.target.checked);
 const save=()=>{contactDraft={email:document.getElementById('contact-email').value.trim(),phone:document.getElementById('contact-phone').value.trim(),comments:document.getElementById('contact-comments').value,ack:document.getElementById('contact-ack').checked};};
 const backToExplore=()=>{save();if(window.DeciderExampleContact){const id=window.DeciderExampleContact.id;window.DeciderExampleContact=null;location.hash='example/'+id;}else location.hash='explore';};
 document.getElementById('contact-back').onclick=backToExplore;
 document.getElementById('contact-explore').onclick=backToExplore;
 document.getElementById('contact-form').onsubmit=async event=>{event.preventDefault();save();const status=document.getElementById('contact-status');if(navigator.onLine===false){status.textContent='You’re offline. Reconnect, then press Send contact request. Nothing has been sent or queued.';return;}if(!contactDraft.email&&!contactDraft.phone){status.textContent='Please provide an email address or phone number.';return;}if(!contactDraft.ack)return;
  if(automatic){const button=event.target.querySelector('button[type=submit]');button.disabled=true;try{const body=new FormData(event.target);body.set('email',contactDraft.email);body.set('phone',contactDraft.phone);body.set('_subject','Decider consultation request');if(!contactDraft.email)body.delete('email');const response=await fetch(endpoint,{method:'POST',body,headers:{Accept:'application/json'},credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw Error('Delivery failed');status.textContent='Your request has been submitted for review. We will respond only if we believe we can add value.';event.target.reset();contactDraft={email:'',phone:'',comments:'',ack:false};DeciderUsage.track('contact_submitted');}catch{status.textContent='The request could not be sent. Please email nigel.wallbridge@bluewin.ch directly.';}finally{button.disabled=false;}}
  else{const body=`Please contact me about a decision.\n\nEmail: ${contactDraft.email}\nPhone: ${contactDraft.phone}\n\n${contactDraft.comments}\n\nI acknowledge that additional services may be chargeable.`;window.location.href='mailto:nigel.wallbridge@bluewin.ch?subject='+encodeURIComponent('Decider consultation request')+'&body='+encodeURIComponent(body);status.textContent='Email request prepared. Please send it from your email app; it has not been sent by this website.';DeciderUsage.track('contact_email_prepared');}
 };
}

