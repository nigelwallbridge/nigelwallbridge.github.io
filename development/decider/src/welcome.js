// Welcome preferences contain no decision inputs.
let welcomeSeen=false,currentExampleId=null,exampleFilter='all';
const welcomeSkipKey='decider-skip-welcome-v1';
let openingResources=1000,openingAtBalance=false;
let activeTeaser=0,teaserTimer=null,teaserStopped=false;
const teaserInterval=9000;
const teaserMotionPreference=matchMedia('(prefers-reduced-motion: reduce)');
function clearHomepageRotation(){
 if(teaserTimer!==null){clearTimeout(teaserTimer);teaserTimer=null;}
}
function stopHomepageRotation(){
 teaserStopped=true;
 clearHomepageRotation();
}
function scheduleHomepageRotation(){
 clearHomepageRotation();
 const carousel=document.getElementById('home-teaser');
 if(!carousel||teaserStopped||teaserMotionPreference.matches||document.hidden)return;
 if(carousel.matches(':hover')||carousel.contains(document.activeElement))return;
 teaserTimer=setTimeout(()=>{
  teaserTimer=null;
  // Recheck attention in case focus or visibility changed at the timer boundary.
  const current=document.getElementById('home-teaser');
  if(!current||teaserStopped||teaserMotionPreference.matches||document.hidden)return;
  if(current.matches(':hover')||current.contains(document.activeElement))return;
  activeTeaser=(activeTeaser+1)%4;
  renderTeaser(true);
  scheduleHomepageRotation();
 },teaserInterval);
}
document.addEventListener('visibilitychange',scheduleHomepageRotation);
teaserMotionPreference.addEventListener('change',scheduleHomepageRotation);
function skipWelcome(){try{return localStorage.getItem(welcomeSkipKey)==='yes';}catch{return false;}}
function rememberWelcomeSkip(value){try{if(value)localStorage.setItem(welcomeSkipKey,'yes');else localStorage.removeItem(welcomeSkipKey);}catch{}}
const exampleCategories=[['all','All examples'],['buying','Buying something'],['doing','Doing something'],['big','Making up my mind about big issues']];
const featuredExampleIds=['repair-or-replace','phone-warranty','difficult-conversation','new-city','first-employee','heathrow-third-runway','flood-defences'];
function exampleCategory(e){return exampleCategories.find(([id])=>id===e.navigationCategories[0])[1];}
function exampleFilterControl(){return `<label class="example-filter" for="example-filter">Choose a category<select id="example-filter">${exampleCategories.map(([id,label])=>`<option value="${id}" ${id===exampleFilter?'selected':''}>${label}</option>`).join('')}</select></label>`;}
function exampleCard(e){
 const answer=SIGFI.quick(DeciderExamples.stateFor(e)).goForIt;
 return `<a class="example-card ${e.kind} ${e.category==='public'?'public':''}" href="#example/${e.id}"><span class="example-category">${exampleCategory(e)}</span><strong>${escapeText(e.question)}</strong>${e.category==='public'?`<span class="card-perspective">${escapeText(e.perspective)}</span>`:''}<span class="card-answer ${answer?'is-yes':'is-no'}">The Decider’s AI-free decision is <b>${answer?'Yes':'No'}</b></span><span class="example-read">Explore why <span aria-hidden="true">↗</span></span></a>`;
}
function enterOwnDecision(){
 visitPage('choose',{fresh:true});
}
function recommendationMarkup(headline,reason,options={}){
 const id=options.financial?' id="demo-answer"':'';
 return `<div class="teaser-answer"${id} ${options.financial?'aria-live="polite" aria-atomic="true"':''}><p class="teaser-recommends">The Decider recommends</p><h2>${escapeText(headline)}</h2><p class="teaser-reason">${escapeText(reason)}</p></div>`;
}
function openingMarkup(){
 return `<h1 id="teaser-question">Would you rather have £50,000 guaranteed or a 50% chance of winning £1 million?</h1>
 <p class="teaser-context">The best choice depends on how much money you already have. Try changing the amount below.</p>
 <section class="opening-demo" id="opening-demo" aria-label="Change your starting money">
 <div class="demo-money-control"><label for="demo-exact">Starting money in £</label><input id="demo-exact" type="number" min="0.000001" max="1000000000000" step="any" value="${openingResources}"></div>
 <input type="range" id="demo-resources" min="1" max="1000" step="1" value="${DeciderOpening.positionAt(openingResources)}" aria-label="Starting financial resources">
 <div class="ends"><span>£1</span><span>£100,000</span></div>
 <p class="error" id="demo-error" role="alert"></p>
 ${recommendationMarkup('','',{financial:true})}
 <div class="teaser-explore"><a href="#how">Explore why →</a><button class="demo-balance" id="demo-balance">See the balance point</button></div>
 </section>`;
}
const openingAnswerCopy={
 guaranteed:['Take the guaranteed £50,000.','When you start with less, the certainty of £50,000 carries more weight than the chance of a larger prize.'],
 chance:['Take the chance of £1 million.','With more money to draw on, receiving nothing matters less relative to your starting position, so the larger prize comes out ahead.'],
 equal:['Both choices are equivalent.','At the exact balance point, the two choices have the same score under the mathematical rule.'],
 unresolved:['The choices are too close to separate reliably.','Try a slightly different starting amount to explore either side of the balance.']
 };
function paintOpening(){
 const input=document.getElementById('demo-resources');if(!input)return;
 const answer=DeciderOpening.compare(openingResources,openingAtBalance);
 input.value=DeciderOpening.positionAt(openingResources);
 input.style.setProperty('--pct',input.value/10+'%');
 const result=document.getElementById('demo-answer');result.hidden=false;result.dataset.recommendation=answer.recommendation;
 const copy=openingAnswerCopy[answer.recommendation];
 result.querySelector('h2').textContent=copy[0];
 result.querySelector('.teaser-reason').textContent=copy[1];
 document.getElementById('demo-error').textContent='';
}
function wireOpening(){
 document.getElementById('demo-resources').oninput=e=>{
  openingAtBalance=false;openingResources=Math.max(1,DeciderOpening.resourcesAt(+e.target.value));
  document.getElementById('demo-exact').value=openingResources;paintOpening();
 };
 document.getElementById('demo-exact').oninput=e=>{
  const n=Number(e.target.value);
  if(e.target.value===''||!e.target.validity.valid||!Number.isFinite(n)||n<=0){
   document.getElementById('demo-error').textContent='Enter starting resources above zero and up to £1 trillion.';
   document.getElementById('demo-answer').hidden=true;return;
  }
  openingAtBalance=false;openingResources=n;paintOpening();
 };
 document.getElementById('demo-balance').onclick=()=>{
  openingAtBalance=true;openingResources=DeciderOpening.balance.numerator/DeciderOpening.balance.denominator;
  document.getElementById('demo-exact').value=openingResources;paintOpening();
 };
 paintOpening();
}
function workedTeaserMarkup(id,question){
 const example=DeciderExamples.items.find(e=>e.id===id);
 const result=SIGFI.quick(DeciderExamples.stateFor(example));
 const headline=DeciderLabels.headline({templateId:id},result.goForIt);
 let reason;
 if(id==='repair-or-replace'){
  reason=result.goForIt?'Replacing costs more in a smooth year, but avoids the larger old-car bill in a bad one.':'On these costs and odds, repairing gives the better balance against the money available.';
 }else if(id==='difficult-conversation'){
  reason=result.goForIt?'On these answers, speaking up feels better than staying quiet in both scenarios.':'On these emotional estimates, holding back gives the better balance for the reserves available.';
 }else{
  reason=result.goForIt?'On these project assumptions, the possible upside justifies the downside relative to the investors’ resources.':'On these assumptions, a possible £20 billion loss weighs too heavily against the investors’ £30 billion starting resources.';
 }
 const context=id==='heathrow-third-runway'?'Investor finances · Government approval is a separate decision.':'Example · '+DeciderLabels.configs[id].displayPeriod;
 return `<h1 id="teaser-question">${escapeText(question)}</h1><p class="teaser-context">${escapeText(context)}</p>${recommendationMarkup(headline,reason)}<div class="teaser-explore"><a href="#example/${id}">Explore this example →</a></div>`;
}
function teaserSlides(){
 return [
  ()=>openingMarkup(),
  ()=>workedTeaserMarkup('repair-or-replace','Should I replace my car or repair it?'),
  ()=>workedTeaserMarkup('difficult-conversation','Should I have that difficult conversation?'),
  ()=>workedTeaserMarkup('heathrow-third-runway','Should investors back a third runway at Heathrow?')
 ];
}
function fitTeaserStage(){
 const stage=document.getElementById('teaser-stage');if(!stage)return;
 const probe=document.createElement('div');probe.className='teaser-content teaser-measure';
 probe.inert=true;probe.setAttribute('aria-hidden','true');stage.append(probe);
 let height=0;
 for(const [index,slide] of teaserSlides().entries()){
  probe.innerHTML=slide();
  for(const node of probe.querySelectorAll('[id]'))node.removeAttribute('id');
  if(index===0){
   // Different answer lines wrap differently at each phone/desktop width.
   for(const [headline,reason] of Object.values(openingAnswerCopy)){
    probe.querySelector('.teaser-answer h2').textContent=headline;
    probe.querySelector('.teaser-reason').textContent=reason;
    height=Math.max(height,probe.getBoundingClientRect().height);
   }
  }
  height=Math.max(height,probe.getBoundingClientRect().height);
 }
 probe.remove();stage.style.minHeight=Math.ceil(height)+'px';
}
window.addEventListener('resize',fitTeaserStage);
function renderTeaser(transition=false,direction=1){
 const body=document.getElementById('teaser-content');if(!body)return;
 const stage=document.getElementById('teaser-stage');
 body.getAnimations().forEach(animation=>animation.cancel());
 stage.querySelectorAll('.teaser-outgoing').forEach(node=>node.remove());
 let outgoing=null;
 if(transition&&!teaserMotionPreference.matches){
  outgoing=body.cloneNode(true);outgoing.removeAttribute('id');
  outgoing.classList.add('teaser-outgoing');outgoing.inert=true;outgoing.setAttribute('aria-hidden','true');
  for(const node of outgoing.querySelectorAll('[id]'))node.removeAttribute('id');
  stage.append(outgoing);
 }
 body.innerHTML=teaserSlides()[activeTeaser]();
 document.getElementById('teaser-position').textContent=(activeTeaser+1)+' of 4';
 if(activeTeaser===0)wireOpening();
 if(outgoing){
  const options={duration:700,easing:'cubic-bezier(.22,.61,.36,1)'};
  outgoing.animate([{transform:'translateX(0)',opacity:1},{transform:`translateX(${-direction*100}%)`,opacity:.35}],options).finished.catch(()=>{}).finally(()=>outgoing.remove());
  body.animate([{transform:`translateX(${direction*100}%)`,opacity:.35},{transform:'translateX(0)',opacity:1}],options).finished.catch(()=>{});
 }
}
function wireTeasers(){
 const carousel=document.getElementById('home-teaser');
 for(const event of ['pointerdown','input','change','click','keydown']){
  carousel.addEventListener(event,stopHomepageRotation,{capture:true});
 }
 carousel.addEventListener('pointerenter',clearHomepageRotation);
 carousel.addEventListener('pointerleave',scheduleHomepageRotation);
 carousel.addEventListener('focusin',clearHomepageRotation);
 carousel.addEventListener('focusout',event=>{
  if(!carousel.contains(event.relatedTarget))scheduleHomepageRotation();
 });
 for(const [id,step] of [['teaser-previous',-1],['teaser-next',1]]){
  document.getElementById(id).onclick=()=>{
   stopHomepageRotation();activeTeaser=(activeTeaser+step+4)%4;renderTeaser(true,step);
  };
 }
 renderTeaser();fitTeaserStage();scheduleHomepageRotation();
}
function renderWelcome(){
 document.body.classList.remove('results');
 const examples=featuredExampleIds.map(id=>DeciderExamples.items.find(e=>e.id===id));
 app.innerHTML=`<section class="opening-hero"><div class="opening-shortcuts"><button class="primary" id="welcome-start">Try my own decision →</button><a href="#examples">Explore worked examples</a></div><section class="home-teaser" id="home-teaser" aria-roledescription="carousel" aria-label="Four decisions to explore"><div class="teaser-stage" id="teaser-stage"><div class="teaser-content" id="teaser-content"></div></div><nav class="teaser-navigation" aria-label="Choose a teaser"><button id="teaser-previous" aria-label="Previous teaser" aria-controls="teaser-content">← Previous</button><span id="teaser-position">1 of 4</span><button id="teaser-next" aria-label="Next teaser" aria-controls="teaser-content">Next →</button></nav></section><label class="welcome-skip"><input type="checkbox" id="welcome-skip" ${skipWelcome()?'checked':''}><span>Skip this next time</span></label><nav class="opening-links" aria-label="Learn about The Decider"><a href="#how">How it works</a><a href="#about">About The Decider</a></nav></section><section class="welcome-examples" aria-labelledby="example-heading"><p class="welcome-eyebrow">Worked examples</p><h2 id="example-heading">When would you use The Decider?</h2><p class="welcome-description">Buying something. Doing something. Making up your mind about big issues.</p><div class="example-grid">${examples.map(exampleCard).join('')}</div><div class="example-browse"><a href="#examples">Browse all examples →</a></div></section>`;
 document.getElementById('welcome-start').onclick=enterOwnDecision;
 document.getElementById('welcome-skip').onchange=e=>rememberWelcomeSkip(e.target.checked);
 wireTeasers();
}
function renderExampleLibrary(){
 const examples=DeciderExamples.items.filter(e=>exampleFilter==='all'||e.navigationCategories.includes(exampleFilter));
 app.innerHTML=`<a class="back example-back" href="#welcome">← Back to welcome</a><p class="welcome-eyebrow collection-eyebrow">The example collection</p><h1 class="input-title">Find a decision like yours.</h1><button class="explore-button collection-own" id="library-start">Try my own decision →</button>${exampleFilterControl()}${exampleCategories.slice(1).filter(([id])=>exampleFilter==='all'||exampleFilter===id).map(([id,label])=>`<section class="example-library-group"><h2>${label}</h2><div class="example-grid">${examples.filter(e=>e.navigationCategories.includes(id)).map(exampleCard).join('')}</div></section>`).join('')}`;
 document.getElementById('library-start').onclick=enterOwnDecision;
 document.getElementById('example-filter').onchange=e=>{exampleFilter=e.target.value;renderExampleLibrary();document.getElementById('example-filter').focus({preventScroll:true});saveNavigation();};
}
function exampleMoney(n,e){return new Intl.NumberFormat('en-GB',{style:'currency',currency:e.currency,maximumFractionDigits:0}).format(n);}
function exampleFeeling(n,e){
 if(n===0)return 'Indifferent';
 const words=emotionalWords[e.importance],index=Math.min(4,Math.max(0,Math.ceil(Math.abs(n)/5)-1));
 return words[n>0?'positive':'negative'][index];
}
function renderExample(){
 const e=DeciderExamples.items.find(e=>e.id===currentExampleId);
 if(!e){app.innerHTML='<h1 class="input-title">Let’s find another example.</h1><p>That example isn’t in this collection.</p><a class="explore-button" href="#examples">Browse the examples</a>';return;}
 const cfg=DeciderLabels.configs[e.id];const r=SIGFI.quick(DeciderExamples.stateFor(e)),changed=SIGFI.quick(DeciderExamples.stateFor(e,true)),cash=e.kind==='money',labels=e.scenarioLabels||['As hoped','Things go wrong'];
 const amount=n=>cash?exampleMoney(n,e):exampleFeeling(n,e);
 const inputs=[['A','Go for it',labels[0]],['B','Go for it',labels[1]],['C','Don’t go for it',labels[0]],['D','Don’t go for it',labels[1]]];
 const outcomeRows=inputs.map(([key,choice,situation])=>`<div class="example-outcome"><div><span class="example-situation">${escapeText(cfg.questions[key])}</span><strong>${escapeText(amount(e.pay[key]))}</strong></div><p>${escapeText(e.notes[key])}</p></div>`).join('');
 const chance=new Intl.NumberFormat('en-GB',{maximumFractionDigits:6}).format(e.p)+'%';
 const sources=e.sources?.length?`<ul class="example-sources">${e.sources.map(s=>`<li><a href="${escapeText(s.url)}" target="_blank" rel="noopener noreferrer">${escapeText(s.label)}</a></li>`).join('')}</ul>`:'';
 app.innerHTML=`<a class="back example-back" href="#examples">← Back to examples</a><article class="worked-example compact-example"><p class="reading-mode">The example collection · Read &amp; explore</p><p class="example-category story-category ${e.kind}">${exampleCategory(e)}</p><h1 class="example-title">${escapeText(e.question)}</h1>${e.category==='public'?`<p class="example-perspective">${escapeText(e.perspective)}</p>`:''}<section class="example-verdict ${r.goForIt?'example-yes':'example-no'}"><span>The Decider’s AI-free decision is</span><h2>${r.goForIt?'Yes.':'No.'}</h2></section><h2>The Decider’s take</h2><p>${escapeText(e.shortWhy)}</p><section class="example-change"><h2>What would change it?</h2><p>${escapeText(e.shortChange)}</p><p class="example-change-answer">The Decider’s new decision: <strong>${changed.goForIt?'Yes.':'No.'}</strong></p></section><button class="example-try" id="example-own">Try changing this example →</button><p class="example-own-note">Opens the calculator with the example’s answers.</p><details class="example-details optional"><summary>Peek at the numbers &amp; assumptions</summary><p>${escapeText(e.story)}</p><div class="example-horizon"><span>Period</span><strong>${escapeText(e.period)}</strong></div><div class="example-scenarios"><p><span>${escapeText(labels[0])}</span>${escapeText(e.situations[0])}</p><p><span>${escapeText(labels[1])}</span>${escapeText(e.situations[1])}</p></div><p class="example-model-note">${cash?'Net gains or losses after the costs described, compared over the same period.':'Feelings are personal. These are the example’s answers.'}</p>${outcomeRows}<div class="example-context"><div><span>${escapeText(cfg.probabilityQuestion)}</span><strong>${chance}</strong></div><div><span>${cash?'Starting financial resources':'Emotional strength'}</span><strong>${cash?exampleMoney(e.resources,e):robustness(e.resources)}</strong></div></div>${cash?'':`<p class="example-model-note">${escapeText(e.importance)}. Emotional strength: ${e.resources} on the prototype scale. Outcome values: ${Object.values(e.pay).join(', ')}. These values are provisional, not a clinical measure.</p>`}<p class="example-model-note">${escapeText(e.basis||'These are the example’s inputs. Change them and see where The Decider lands.')}</p>${sources}<button class="explore-button" id="example-blank">Start this question from scratch</button></details>${e.category==='public'||e.category==='business'?`<a href="#contact" class="consultant-box example-consultant" id="example-consultant"><h2>A bigger decision to work through?</h2><p>Put The Decider to work on the choice that matters to you.</p><span>Explore it with a consultant →</span></a>`:''}<a class="plain example-all" href="#examples">Browse more examples →</a></article><div class="personal-exit"><p>Have a decision of your own?</p><button class="primary" id="example-personal">Start my own decision →</button></div>`;
 document.getElementById('example-personal').onclick=enterOwnDecision;document.getElementById('example-own').onclick=()=>startWorkedExample(e,true);document.getElementById('example-blank').onclick=()=>startWorkedExample(e,false);
 const consultant=document.getElementById('example-consultant');if(consultant)consultant.onclick=()=>{window.DeciderExampleContact={id:e.id};};
}
function startWorkedExample(e,withAnswers){
 saveNavigation();
 window.DeciderExampleContact=null;welcomeSeen=true;returnScreen=0;start(e.kind);
 state.title=e.question;state.importance=e.importance;state.templateId=e.id;if(e.scenarioLabels)state.exampleScenarios=e.scenarioLabels;
 if(withAnswers){const d=DeciderExamples.stateFor(e);Object.assign(state,d,{exampleId:e.id,simplePay:d.pay.C,normalPay:{C:d.pay.C,D:d.pay.D}});state.upside=niceScale(Math.max(0,...Object.values(state.pay)));state.downside=niceScale(Math.max(0,...Object.values(state.pay).map(n=>-n)));}
 else state.exampleQuestion=e.id;
 visitPage('decision',{save:false});
}
