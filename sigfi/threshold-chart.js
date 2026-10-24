(function(root){
function thresholdChart(d){
 const money=true,isCash=d.kind==='money',r=SIGFI.analyse(d),t=money?SIGFI.resourceThresholds(d):null;
 const current=money?d.resources:d.p;
 const roots=money?t.roots.map(x=>x.N):r.threshold!==null&&r.threshold>=0&&r.threshold<=1?[r.threshold*100]:[];
 const anchors=[current,...roots].filter(n=>Number.isFinite(n)&&n>0);
 const payoffScale=Math.max(1,...Object.values(d.pay).map(Math.abs));
 // Size the view around the user and crossings, not a possibly huge prize.
 const scale=Math.max(Number.MIN_VALUE,Math.min(...anchors)/3);
 const rawEnd=roots.length?Math.max(...anchors)*1.5:Math.max(current*1.5,payoffScale*2);
 const decade=10**Math.floor(Math.log10(rawEnd));
 const end=[1,2,5,10].find(n=>n*decade>=rawEnd)*decade;
 const transform=n=>money?Math.log1p(n/scale):n;
 const inverse=n=>money?Math.expm1(n)*scale:n;
 const x=n=>48+264*transform(n)/transform(end);
 const positions=[...new Set([...Array.from({length:201},(_,i)=>inverse(transform(end)*i/200)),current,...roots])].sort((a,b)=>a-b);
 const samples=positions.map(n=>{if(money&&n<=0)return {n,go:NaN,stay:NaN};const a=SIGFI.analyse({...d,...(money?{resources:n}:{p:n})});return {n,go:a.go,stay:a.stay};});
 const finite=[r.go,r.stay,...samples.flatMap(a=>[a.go,a.stay])].filter(Number.isFinite);
 if(!finite.length)return '<p>No finite utility values to plot for these outcomes.</p>';
 let low=Math.min(...finite),high=Math.max(...finite);const pad=Math.max((high-low)*.08,.05);low-=pad;high+=pad;
 const y=n=>200-160*(n-low)/(high-low);
 const path=key=>{let open=false;return samples.map(a=>{if(!Number.isFinite(a[key])){open=false;return '';}const cmd=open?'L':'M';open=true;return cmd+x(a.n).toFixed(2)+','+y(a[key]).toFixed(2);}).join(' ');};
 const fmt=n=>isCash?new Intl.NumberFormat('en-GB',{style:'currency',currency:d.currency||'GBP',maximumSignificantDigits:5}).format(n):new Intl.NumberFormat('en-GB',{maximumSignificantDigits:5}).format(n)+' reserve points';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const label=isCash?'Current resources (N)':'Emotional reserve (H)';
 const markers=roots.map(n=>`<line x1="${x(n)}" x2="${x(n)}" y1="32" y2="200" stroke="#d0ff72" stroke-dasharray="4 4"/>`).join('');
 const dots=[['go','#d0ff72'],['stay','#ffac8b']].filter(([k])=>Number.isFinite(r[k])).map(([k,c])=>`<circle cx="${x(current)}" cy="${y(r[k])}" r="4" fill="${c}"/>`).join('');
 const status=money?(t.equalEverywhere?'The curves coincide: no unique threshold.':roots.length?'Threshold'+(roots.length>1?'s':'')+': '+roots.map(fmt).join(', ')+'.':t.noFiniteCrossing?'There is no finite resource threshold for these inputs.':'No crossing found within the numerical search range.'):(roots.length?'Threshold: '+fmt(roots[0])+'.':'No probability threshold between 0% and 100%.');
 const annotations=`<path d="M${x(current)},200 L${x(current)},225 L180,225" fill="none" stroke="#ffffff"/><text x="180" y="242" text-anchor="middle" fill="#ffffff" font-size="12">Current position: ${esc(fmt(current))}</text>`+roots.map((n,i)=>`<path d="M${x(n)},200 L${x(n)},${253+i*30} L180,${253+i*30}" fill="none" stroke="#d0ff72" stroke-dasharray="3 3"/><text x="180" y="${270+i*30}" text-anchor="middle" fill="#d0ff72" font-size="12">Threshold${roots.length>1?' '+(i+1):''}: ${esc(fmt(n))}</text>`).join('');
 const intersections=money?t.roots.map(pt=>`<circle cx="${x(pt.N)}" cy="${y(pt.utility)}" r="5" fill="#182620" stroke="#d0ff72" stroke-width="2"/>`).join(''):'';
 const height=320+Math.max(0,roots.length-1)*30;
 return `<section class="threshold-chart"><h2>Where you are</h2><p>Your current position: <strong>${esc(fmt(current))}</strong>.</p><p>${esc(status)}</p><svg viewBox="0 0 340 ${height}" role="img" aria-label="${esc(label+'. '+status+' Your position: '+fmt(current))}"><line x1="48" x2="312" y1="200" y2="200" stroke="#72877c"/><line x1="48" x2="48" y1="32" y2="200" stroke="#72877c"/><text x="48" y="22" fill="#c5d3cb" font-size="11">${money?'Expected log utility':'Average happiness score'}</text><text x="43" y="45" text-anchor="end" fill="#a1b4ac" font-size="10">${high.toFixed(1)}</text><text x="43" y="200" text-anchor="end" fill="#a1b4ac" font-size="10">${low.toFixed(1)}</text>${markers}<path d="${path('go')}" fill="none" stroke="#d0ff72" stroke-width="2.5"/><path d="${path('stay')}" fill="none" stroke="#ffac8b" stroke-width="2.5"/><line x1="${x(current)}" x2="${x(current)}" y1="32" y2="200" stroke="#ffffff" stroke-width="2"/>${dots}${intersections}<text x="48" y="214" fill="#a1b4ac" font-size="10">${esc(fmt(0))}</text><text x="312" y="214" text-anchor="end" fill="#a1b4ac" font-size="10">Axis end: ${esc(fmt(end))}</text>${annotations}<text x="180" y="${height-12}" text-anchor="middle" fill="#c5d3cb" font-size="11">${label}</text></svg><p class="chart-key"><span>Green: go ahead</span><span>Peach: don’t go ahead</span></p><p class="quiet">White line: your current position. Dashed green line and ring: the threshold where the choices have equal utility. Axis end is only the displayed range, not your position or the threshold. The higher curve has the better comparison score. ${money?'The horizontal scale is compressed logarithmically and sized around your position and the thresholds. Equal spacing does not mean equal amounts. Probabilities and payoffs stay fixed.':'Outcomes stay fixed as the probability changes.'} Harm flags${money?'':' and emotional loss limits'} can override the comparison. A threshold is not a safety guarantee.</p></section>`;
}
root.SIGFI.thresholdChart=thresholdChart;
})(typeof globalThis!=='undefined'?globalThis:this);
