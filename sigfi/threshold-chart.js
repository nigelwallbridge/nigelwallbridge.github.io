(function(root){
function thresholdChart(d){
 const money=d.kind==='money',r=SIGFI.analyse(d),t=money?SIGFI.resourceThresholds(d):null;
 const current=money?d.resources:d.p;
 const roots=money?t.roots.map(x=>x.N):r.threshold!==null&&r.threshold>=0&&r.threshold<=1?[r.threshold*100]:[];
 const scale=money?Math.max(1,...Object.values(d.pay).map(x=>Math.abs(x)/10)):1;
 const end=money?Math.max(scale*20,current*1.3,...roots.map(x=>x*1.3)):100;
 const transform=n=>money?Math.log1p(n/scale):n;
 const inverse=n=>money?Math.expm1(n)*scale:n;
 const x=n=>48+264*transform(n)/transform(end);
 const samples=Array.from({length:201},(_,i)=>{const n=inverse(transform(end)*i/200);if(money&&n<=0)return {n,go:NaN,stay:NaN};const a=SIGFI.analyse({...d,...(money?{resources:n}:{p:n})});return {n,go:a.go,stay:a.stay};});
 const finite=[r.go,r.stay,...samples.flatMap(a=>[a.go,a.stay])].filter(Number.isFinite);
 if(!finite.length)return '<p>No finite utility values to plot for these outcomes.</p>';
 let low=Math.min(...finite),high=Math.max(...finite);const pad=Math.max((high-low)*.08,.05);low-=pad;high+=pad;
 const y=n=>200-160*(n-low)/(high-low);
 const path=key=>{let open=false;return samples.map(a=>{if(!Number.isFinite(a[key])){open=false;return '';}const cmd=open?'L':'M';open=true;return cmd+x(a.n).toFixed(2)+','+y(a[key]).toFixed(2);}).join(' ');};
 const fmt=n=>money?new Intl.NumberFormat('en-GB',{style:'currency',currency:d.currency||'GBP',maximumSignificantDigits:5}).format(n):new Intl.NumberFormat('en-GB',{maximumSignificantDigits:5}).format(n)+'%';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const label=money?'Current resources (N)':'Chance of things going well';
 const markers=roots.map(n=>`<line x1="${x(n)}" x2="${x(n)}" y1="32" y2="200" stroke="#d0ff72" stroke-dasharray="4 4"/>`).join('');
 const dots=[['go','#d0ff72'],['stay','#ffac8b']].filter(([k])=>Number.isFinite(r[k])).map(([k,c])=>`<circle cx="${x(current)}" cy="${y(r[k])}" r="4" fill="${c}"/>`).join('');
 const status=money?(t.equalEverywhere?'The curves coincide: no unique threshold.':roots.length?'Threshold'+(roots.length>1?'s':'')+': '+roots.map(fmt).join(', ')+'.':t.noFiniteCrossing?'There is no finite resource threshold for these inputs.':'No crossing found within the numerical search range.'):(roots.length?'Threshold: '+fmt(roots[0])+'.':'No probability threshold between 0% and 100%.');
 return `<section class="threshold-chart"><h2>Where you are</h2><p>You: <strong>${esc(fmt(current))}</strong>. ${esc(status)}</p><svg viewBox="0 0 340 260" role="img" aria-label="${esc(label+'. '+status+' Your position: '+fmt(current))}"><line x1="48" x2="312" y1="200" y2="200" stroke="#72877c"/><line x1="48" x2="48" y1="32" y2="200" stroke="#72877c"/><text x="48" y="22" fill="#c5d3cb" font-size="11">${money?'Expected log utility':'Average happiness score'}</text><text x="43" y="45" text-anchor="end" fill="#a1b4ac" font-size="10">${high.toFixed(1)}</text><text x="43" y="200" text-anchor="end" fill="#a1b4ac" font-size="10">${low.toFixed(1)}</text>${markers}<path d="${path('go')}" fill="none" stroke="#d0ff72" stroke-width="2.5"/><path d="${path('stay')}" fill="none" stroke="#ffac8b" stroke-width="2.5"/><line x1="${x(current)}" x2="${x(current)}" y1="32" y2="200" stroke="#ffffff" stroke-width="2"/>${dots}<text x="48" y="220" fill="#a1b4ac" font-size="10">${esc(fmt(0))}</text><text x="312" y="220" text-anchor="end" fill="#a1b4ac" font-size="10">${esc(fmt(end))}</text><text x="180" y="244" text-anchor="middle" fill="#c5d3cb" font-size="11">${label}</text></svg><p class="chart-key"><span>Green: go ahead</span><span>Peach: don’t go ahead</span></p><p class="quiet">White line: you. Dashed green: equal-outcome threshold. The higher curve has the better comparison score. ${money?'The horizontal scale is compressed logarithmically to fit large resource ranges. Probabilities and payoffs stay fixed.':'Outcomes stay fixed as the probability changes.'} Harm flags${money?'':' and emotional loss limits'} can override the comparison. A threshold is not a safety guarantee.</p></section>`;
}
root.SIGFI.thresholdChart=thresholdChart;
})(typeof globalThis!=='undefined'?globalThis:this);
