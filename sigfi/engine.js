(function(root){
function analyse(d){
 const p=d.p/100,lo=d.uncertain?d.low/100:p,hi=d.uncertain?d.high/100:p;
 const {A,B,C,D}=d.pay;
 const money=true,N=d.resources; // Both routes use positive starting resources and logarithmic utility.
 if(!Number.isFinite(d.p)||d.p<0||d.p>100)throw new RangeError('Probability must be a percentage from 0 to 100.');
 if(![A,B,C,D].every(Number.isFinite))throw new RangeError('Payoffs must be finite.');
 if(money&&(!Number.isFinite(N)||N<=0))throw new RangeError('Current resources N must be positive.');
 if(!Number.isFinite(lo)||!Number.isFinite(hi)||lo<0||hi>1||lo>hi)throw new RangeError('Invalid probability range.');
 const u=x=>money?(N+x>0?Math.log(N+x):-Infinity):x;
 const [a,b,c,e]=[A,B,C,D].map(u);
 const mean=(q,x,y)=>q===0?y:q===1?x:q*x+(1-q)*y;
 const go=q=>mean(q,a,b),stay=q=>mean(q,c,e);
 const diff=q=>go(q)===stay(q)?0:go(q)-stay(q),slope=(a-c)-(b-e);
 const threshold=!Number.isFinite(slope)||Math.abs(slope)<1e-10?null:-(b-e)/slope;
 const risk=(x,y,flag)=>({worst:Math.min(x,y),loss:Math.max(0,-Math.min(x,y)),blocked:flag||Math.max(0,-Math.min(x,y))>d.limit||d.kind==='money'&&Math.max(0,-Math.min(x,y))>d.capacity,flag});
 const rg=risk(A,B,d.ruinGo),rs=risk(C,D,d.ruinStay);
 if(money){rg.blocked=!!d.ruinGo;rs.blocked=!!d.ruinStay;}
 const dl=diff(lo),dh=diff(hi),min=Math.min(dl,dh),max=Math.max(dl,dh),tol=1e-8;
 let verdict,reason;
 if((rg.blocked||go(p)===-Infinity)&&(rs.blocked||stay(p)===-Infinity)){verdict='Rework the alternatives';reason='Neither choice is admissible. Check harm flags and nonpositive terminal resources.';}
 else if(rg.blocked){verdict='Hold off on this version';reason='Going for it breaches a risk limit you set. The alternative stays within those limits in the outcomes you described.';}
 else if(rs.blocked){verdict='Going for it passes your risk screen';reason='Not going for it breaches a risk limit you set. Check for other alternatives before committing.';}
 else if(min>tol){verdict='Go for it, on these assumptions';reason='Going for it has the higher average outcome throughout your stated belief range and passes your risk screen.';}
 else if(max<-tol){verdict='Hold off, on these assumptions';reason='Not going for it has the higher average outcome throughout your stated belief range and passes your risk screen.';}
 else if(Math.abs(min)<tol&&Math.abs(max)<tol){verdict='The comparison is evenly balanced';reason='These inputs give both choices the same average outcome. Other consequences or better evidence could settle the choice.';}
 else{verdict='Clarify the uncertainty first';reason='The preferred choice changes within your belief range. Evidence about the favourable circumstance could change the decision.';}
 if(money&&!rg.blocked&&!rs.blocked&&verdict!=='Rework the alternatives')reason=verdict==='Clarify the uncertainty first'?'The preferred choice changes within your belief range.':`The ${diff(p)>1e-8?'go':'cautious'} choice has ${Math.abs(diff(p))<=1e-8?'equal':'higher'} expected logarithmic utility of N plus payoff.`;
 return {p,lo,hi,go:go(p),stay:stay(p),goRange:[go(lo),go(hi)].sort((a,b)=>a-b),stayRange:[stay(lo),stay(hi)].sort((a,b)=>a-b),diff:diff(p),threshold,slope,rg,rs,verdict,reason,min,max};
}
function quick(d){
 const r=analyse(d);
 const goForIt=r.go!==-Infinity&&!r.rg.blocked&&(r.rs.blocked||r.min>1e-8);
 let reason;
 if(r.rg.blocked)reason='The downside is more than you can live with.';
 else if(r.rs.blocked)reason='Staying put crosses your risk limits. Going for it doesn’t.';
 else if(Math.abs(r.diff)<=1e-8)reason='There’s no advantage in going for it.';
 else reason=goForIt?'The upside wins, and the downside is within your limit.':'The other choice comes out better.';
 return {...r,goForIt,reason:r.reason};
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
 if(p>0&&p<1&&meanDifference===0&&(goWider||stayWider)&&Math.max(A,B)!==Math.min(A,B)&&!(A===C&&B===D)&&!(p===.5&&A===D&&B===C))return {roots:[],equalEverywhere:false,lower:floor*scale,upper:end*scale,noFiniteCrossing:true,preferred:goWider?'Cautious':'Go',reason:'Both choices have the same expected payoff. The more spread-out outcomes have lower expected logarithmic utility at every finite admissible N. Equality is approached only as N tends to infinity.'};
 const f=x=>{
  if(x<=32)return (p===0?0:p*Math.log1p((a-c)/(x+c)))+(p===1?0:q*Math.log1p((b-e)/(x+e)));
  // Expand the difference directly; subtracting near-equal logs loses precision.
  let sum=0,power=1;
  for(let n=1;n<=24;n++){
   power/=x;
   const coefficient=n===1?meanDifference/(100*scale):p*(a**n-c**n)+q*(b**n-e**n);
   sum+=(n%2?1:-1)*coefficient*power/n;
  }
  return sum;
 };
 const k=p*(c-a),l=(1-p)*(e-b);
 const qa=k+l,qb=k*(b+e)+l*(a+c),qc=k*b*e+l*a*c;
 if((p===0||A===C)&&(p===1||B===D)||qa===0&&qb===0&&qc===0)return {roots:[],equalEverywhere:true,lower:floor*scale,upper:end*scale};
 let stationary=[];
 if(qa===0){if(qb!==0)stationary=[-qc/qb];}
 else{const disc=qb*qb-4*qa*qc;if(disc>=0){const t=-.5*(qb+(qb>=0?1:-1)*Math.sqrt(disc));stationary=t===0?[-qb/(2*qa)]:[t/qa,qc/t];}}
 const points=[start,...stationary.filter(x=>Number.isFinite(x)&&x>start&&x<end).sort((x,y)=>x-y),end];
 const roots=[];
 const add=x=>{const N=x*scale;if(!roots.some(r=>Math.abs(r.N-N)<1e-7*Math.max(1,N)))roots.push({N,utility:(p===0?0:p*Math.log(N+A))+(p===1?0:(1-p)*Math.log(N+B))});};
 for(let i=0;i<points.length-1;i++){
  let lo=points[i],hi=points[i+1],fl=f(lo),fh=f(hi);
  // Compare rounding error with the local term magnitudes, not a fixed
  // absolute utility tolerance: utilities converge at large resources.
  const localError=32*Number.EPSILON*(Math.abs(k)+Math.abs(l))/lo;
  if(i>0&&Math.abs(fl)<=localError)add(lo);
  if(fl===0||fh===0||Math.sign(fl)===Math.sign(fh))continue;
  for(let j=0;j<120;j++){const m=(lo+hi)/2,fm=f(m);if(fm===0){lo=hi=m;break;}if(Math.sign(fm)===Math.sign(fl)){lo=m;fl=fm;}else hi=m;}
  add((lo+hi)/2);
 }
 return {roots,equalEverywhere:false,lower:floor*scale,upper:end*scale};
}
root.SIGFI={analyse,quick,resourceThresholds};
if(typeof module!=='undefined')module.exports={analyse,quick,resourceThresholds};
})(typeof globalThis!=='undefined'?globalThis:this);
