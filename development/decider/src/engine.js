(function(root){
const precision=root.DeciderPrecision||(typeof require==='function'?require('./precision.js'):null);
if(!precision)throw Error('Numerical comparison module is missing.');
function analyse(d){
 const p=d.p/100,lo=d.uncertain?d.low/100:p,hi=d.uncertain?d.high/100:p;
 const {A,B,C,D}=d.pay,N=d.resources;
 if(!Number.isFinite(d.p)||d.p<0||d.p>100)throw new RangeError('Probability must be a percentage from 0 to 100.');
 if(![A,B,C,D].every(Number.isFinite))throw new RangeError('Payoffs must be finite.');
 if(!Number.isFinite(N)||N<=0)throw new RangeError('Starting resources must be positive.');
 if(!Number.isFinite(lo)||!Number.isFinite(hi)||lo<0||hi>1||lo>hi)throw new RangeError('Invalid probability range.');
 const u=x=>N+x>0?Math.log(N+x):-Infinity;
 const [a,b,c,e]=[A,B,C,D].map(u),mean=(q,x,y)=>q===0?y:q===1?x:q*x+(1-q)*y;
 const go=q=>mean(q,a,b),stay=q=>mean(q,c,e);
 const percent=q=>q===p?d.p:q===lo&&d.uncertain?d.low:q===hi&&d.uncertain?d.high:q*100;
 const comparison=precision.compare(d),cl=precision.compare(d,percent(lo)),ch=precision.compare(d,percent(hi));
 const diff=comparison.difference,min=Math.min(cl.difference,ch.difference),max=Math.max(cl.difference,ch.difference);
 const slope=(a-c)-(b-e),threshold=!Number.isFinite(slope)||slope===0?null:-(b-e)/slope;
 const risk=(x,y,flag)=>({worst:Math.min(x,y),loss:Math.max(0,-Math.min(x,y)),blocked:!!flag,flag:!!flag});
 const rg=risk(A,B,d.ruinGo),rs=risk(C,D,d.ruinStay);
 const resolved=comparison.resolved&&cl.resolved&&ch.resolved;
 let verdict,reason;
 if((rg.blocked||comparison.badGo)&&(rs.blocked||comparison.badStay)){verdict='Rework the alternatives';reason='Neither choice is admissible. Check harm flags and nonpositive terminal resources.';}
 else if(rg.blocked||comparison.badGo){verdict='Hold off on this version';reason=rg.blocked?'Going ahead carries serious or irreversible harm you flagged.':'A possible outcome leaves going ahead with zero or negative resources.';}
 else if(rs.blocked||comparison.badStay){verdict='Going for it passes your risk screen';reason='Staying put is inadmissible; going ahead passes the resource and harm checks.';}
 else if(!resolved){verdict='The numerical comparison is unresolved';reason='The utility difference is too small to resolve at the available precision. The red answer does not establish that the choices are equal.';}
 else if(cl.sign>0&&ch.sign>0){verdict='Go for it, on these assumptions';reason='Going ahead has higher expected logarithmic utility of starting resources plus outcome.';}
 else if(cl.sign<0&&ch.sign<0){verdict='Hold off, on these assumptions';reason='Staying put has higher expected logarithmic utility of starting resources plus outcome.';}
 else if(cl.exactTie&&ch.exactTie){verdict='The comparison is evenly balanced';reason='Both choices have equal expected logarithmic utility.';}
 else{verdict='Clarify the uncertainty first';reason='The preferred choice changes or ties within your stated probability range.';}
 return {p,lo,hi,go:go(p),stay:stay(p),goRange:[go(lo),go(hi)].sort((a,b)=>a-b),stayRange:[stay(lo),stay(hi)].sort((a,b)=>a-b),diff,threshold,slope,rg,rs,verdict,reason,min,max,comparison,comparisonResolved:resolved};
}
function quick(d){
 const r=analyse(d),admissible=!r.comparison.badGo&&!r.rg.blocked;
 const goForIt=admissible&&(r.rs.blocked||r.comparison.badStay||(r.comparisonResolved&&r.min>0));
 return {...r,goForIt};
}
// Diagnostic only: hold probability/payoffs fixed and solve EU_Go(N)=EU_Cautious(N).
// Split at every stationary point, so a non-monotone difference can have two roots.
function resourceThresholds(d){
 analyse(d); // Use the same input validation as the decision engine.

 const p=d.p/100,{A,B,C,D}=d.pay;
 const active=p===0?[B,D]:p===1?[A,C]:[A,B,C,D];
 const scale=Math.max(1,...active.map(Math.abs));
 const [a,b,c,e]=[A,B,C,D].map(x=>x/scale);
 const floor=Math.max(0,-Math.min(...active))/scale;
 const start=floor+Math.max(1,floor)*1e-12,end=1e12;
 const q=(100-d.p)/100;
 // Equal means and a wider two-point distribution imply strictly lower log
 // utility at every finite admissible N (a mean-preserving spread).
 const meanDifference=d.p*(A-C)+(100-d.p)*(B-D);
 const goWider=Math.min(A,B)<=Math.min(C,D)&&Math.max(A,B)>=Math.max(C,D);
 const stayWider=Math.min(C,D)<=Math.min(A,B)&&Math.max(C,D)>=Math.max(A,B);
 if(p>0&&p<1&&precision.meanSign(d)===0&&(goWider||stayWider)&&Math.max(A,B)!==Math.min(A,B)&&!(A===C&&B===D)&&!(p===.5&&A===D&&B===C))return {roots:[],equalEverywhere:false,lower:floor*scale,upper:end*scale,noFiniteCrossing:true,preferred:goWider?'Cautious':'Go',reason:'Both choices have the same expected payoff. The more spread-out outcomes have lower expected logarithmic utility at every finite admissible N. Equality is approached only as N tends to infinity.'};
 const f=x=>precision.compare({...d,resources:x*scale}).difference;

 const k=p*(c-a),l=(1-p)*(e-b);
 const qa=k+l,qb=k*(b+e)+l*(a+c),qc=k*b*e+l*a*c;
 if(((p===0||A===C)&&(p===1||B===D))||(p===.5&&A===D&&B===C))return {roots:[],equalEverywhere:true,lower:floor*scale,upper:end*scale};
 let stationary=[];
 if(qa===0){if(qb!==0)stationary=[-qc/qb];}
 else{const disc=qb*qb-4*qa*qc;if(disc>=0){const t=-.5*(qb+(qb>=0?1:-1)*Math.sqrt(disc));stationary=t===0?[-qb/(2*qa)]:[t/qa,qc/t];}}
 const points=[start,...stationary.filter(x=>Number.isFinite(x)&&x>start&&x<end).sort((x,y)=>x-y),end];
 const roots=[];
 const add=(x,bracket,touches=false)=>{
  const N=x*scale;
  if(roots.some(r=>Math.abs(r.N-N)<32*Number.EPSILON*Math.max(1,N)))return;
  const gap=Math.max(Math.abs(N)*1e-8,scale*1e-10);
  const left=Math.max(start*scale,N-gap),right=N+gap;
  const before=precision.compare({...d,resources:left}),after=precision.compare({...d,resources:right});
  const crossing=before.resolved&&after.resolved&&before.sign!==0&&after.sign!==0&&before.sign!==after.sign;
  if(!crossing&&!touches)return;
  roots.push({N,utility:(p===0?0:p*Math.log(N+A))+(p===1?0:(1-p)*Math.log(N+B)),type:crossing?'crossing':'touch',bracket:bracket.map(v=>v*scale),verified:crossing,before:before.sign,after:after.sign});
 };

 for(let i=0;i<points.length-1;i++){
  let lo=points[i],hi=points[i+1],fl=f(lo),fh=f(hi);
  // Compare rounding error with the local term magnitudes, not a fixed
  // absolute utility tolerance: utilities converge at large resources.
  const localError=32*Number.EPSILON*(Math.abs(k)+Math.abs(l))/lo;
  if(i>0&&fl===0&&precision.compare({...d,resources:lo*scale}).exactTie)add(lo,[lo,lo],true);
  if(fl===0||fh===0||Math.sign(fl)===Math.sign(fh))continue;
  for(let j=0;j<120;j++){const m=(lo+hi)/2,fm=f(m);if(fm===0){lo=hi=m;break;}if(Math.sign(fm)===Math.sign(fl)){lo=m;fl=fm;}else hi=m;}
  add((lo+hi)/2,[lo,hi]);
 }
 return {roots,equalEverywhere:false,lower:floor*scale,upper:end*scale,searchLimited:true};
}
root.SIGFI={analyse,quick,resourceThresholds};
if(typeof module!=='undefined')module.exports={analyse,quick,resourceThresholds};
})(typeof globalThis!=='undefined'?globalThis:this);

