const DeciderUsage=(()=>{
 const settings=window.DECIDER_SETTINGS||{},id=settings.googleMeasurementId||'';
 const enabled=/^G-[A-Z0-9]+$/.test(id),key='decider-usage-consent-v2';
 const allowed=new Set(['page_view','decision_started','decision_completed','mode_changed','explore_opened','page_opened','contact_opened','contact_submitted','contact_email_prepared']);
 let consent=false,counts={},loaded=false;
 try{consent=localStorage.getItem(key)==='yes';}catch{}
 function init(){
  if(!enabled||loaded||!consent)return;
  loaded=true;window['ga-disable-'+id]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_title:'Decider',page_referrer:''});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
 }
 function track(event){
  if(!consent||!allowed.has(event))return;
  counts[event]=(counts[event]||0)+1;init();
  if(enabled)gtag('event',event,{send_to:id,app_version:'1.15',page_location:location.origin+location.pathname,page_title:'Decider',page_referrer:''});
 }
 function revoke(){
  consent=false;counts={};window['ga-disable-'+id]=true;
  try{localStorage.setItem(key,'no');localStorage.removeItem('decider-usage-counts');localStorage.removeItem('decider-usage-consent');}catch{}
  for(const item of document.cookie.split(';')){const name=item.trim().split('=')[0];if(!/^_ga(?:_|$)/.test(name))continue;const parts=location.hostname.split('.');for(let i=0;i<parts.length;i++){const domain=parts.slice(i).join('.');document.cookie=name+'=; Max-Age=0; path=/; domain='+domain;}document.cookie=name+'=; Max-Age=0; path=/;';}
 }
 const box=document.createElement('div');box.className='usage-choice';
 box.innerHTML='<p>'+(enabled?'Allow Google Analytics to measure visits and use of Decider? It uses analytics cookies and receives technical browsing information.':'Allow basic usage counts in this browser?')+' Decision inputs and contact details are excluded from our events. You can change your choice here.</p><button id="usage-yes">Allow</button><button id="usage-no">Decline</button><span id="usage-status"></span>';
 document.querySelector('footer').append(box);
 const status=()=>document.getElementById('usage-status').textContent=consent?'Usage counting allowed.':'Usage counting off.';
 document.getElementById('usage-yes').onclick=()=>{if(consent)return;consent=true;window['ga-disable-'+id]=false;try{localStorage.setItem(key,'yes');}catch{}status();track('page_view');};
 document.getElementById('usage-no').onclick=()=>{revoke();status();};status();track('page_view');
 return {track,localCounts:()=>({...counts})};
})();
let contactDraft={email:'',phone:'',comments:'',ack:false};
function renderContact(){DeciderUsage.track('contact_opened');
 const endpoint=DECIDER_SETTINGS.contactEndpoint,automatic=endpoint.startsWith('https://');
 app.innerHTML=`<button class="back" id="contact-back">Back</button><h1 class="input-title">Let’s talk.</h1><p>Would you like one of our consultants to contact you to consider your decision in more detail?</p><p>We’ll review your request and respond only if we believe we can add value to your decision. Submitting a request does not guarantee a response or a consultation.</p><form class="contact-form" id="contact-form"><div style="display:none" aria-hidden="true"><label>Leave this empty<input name="_gotcha" type="text" tabindex="-1" autocomplete="off"></label></div><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" value="${escapeText(contactDraft.email)}"><label for="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="60" value="${escapeText(contactDraft.phone)}"><p class="quiet">Provide an email address, a phone number, or both.</p><label for="contact-comments">What would you like to discuss? (optional)</label><textarea id="contact-comments" name="comments" maxlength="3000">${escapeText(contactDraft.comments)}</textarea><label class="check"><input id="contact-ack" name="acknowledgement" type="radio" value="acknowledged" required ${contactDraft.ack?'checked':''}><span>I acknowledge that additional services may be chargeable.</span></label><p class="quiet">Your contact details and comments will be shared with Nigel Wallbridge only when you send this request. With automatic delivery enabled, Formspree processes the submission to deliver it to us. Your decision inputs are not included automatically.</p><p>${automatic?'Send a request to nigel.wallbridge@bluewin.ch.':'This opens your email app with a message to nigel.wallbridge@bluewin.ch. Review it and press Send there. If no email app opens, email that address directly.'}</p><div id="contact-status" role="status"></div><button class="primary" type="submit">${automatic?'Send contact request':'Prepare email request'}</button></form>`;
 const save=()=>{contactDraft={email:document.getElementById('contact-email').value.trim(),phone:document.getElementById('contact-phone').value.trim(),comments:document.getElementById('contact-comments').value,ack:document.getElementById('contact-ack').checked};};
 document.getElementById('contact-back').onclick=()=>{save();goBackInfo();};
 document.getElementById('contact-form').onsubmit=async event=>{event.preventDefault();save();const status=document.getElementById('contact-status');if(!contactDraft.email&&!contactDraft.phone){status.textContent='Please provide an email address or phone number.';return;}if(!contactDraft.ack)return;
  if(automatic){const button=event.target.querySelector('button[type=submit]');button.disabled=true;try{const body=new FormData(event.target);body.set('email',contactDraft.email);body.set('phone',contactDraft.phone);body.set('_subject','Decider consultation request');if(!contactDraft.email)body.delete('email');const response=await fetch(endpoint,{method:'POST',body,headers:{Accept:'application/json'},credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw Error('Delivery failed');status.textContent='Your request has been submitted for review. We will respond only if we believe we can add value.';event.target.reset();contactDraft={email:'',phone:'',comments:'',ack:false};DeciderUsage.track('contact_submitted');}catch{status.textContent='The request could not be sent. Please email nigel.wallbridge@bluewin.ch directly.';}finally{button.disabled=false;}}
  else{const body=`Please contact me about a decision.\n\nEmail: ${contactDraft.email}\nPhone: ${contactDraft.phone}\n\n${contactDraft.comments}\n\nI acknowledge that additional services may be chargeable.`;window.location.href='mailto:nigel.wallbridge@bluewin.ch?subject='+encodeURIComponent('Decider consultation request')+'&body='+encodeURIComponent(body);status.textContent='Email request prepared. Please send it from your email app; it has not been sent by this website.';DeciderUsage.track('contact_email_prepared');}
 };
}
