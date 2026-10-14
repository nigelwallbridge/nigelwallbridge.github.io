(function(root){
function explain(d){
 const r=root.SIGFI.quick(d),{A,B,C,D}=d.pay,tol=1e-8;
 if(true)return {title:r.verdict,text:r.reason,change:'Compare again if resources, payoffs or probabilities change.',go:r.go,stay:r.stay,goLoss:r.rg.loss,stayLoss:r.rs.loss,near:false,threshold:r.threshold};
 const pct=n=>new Intl.NumberFormat('en-GB',{maximumSignificantDigits:6}).format(n*100)+'%';
 const amount=n=>d.kind==='money'?new Intl.NumberFormat('en-GB',{style:'currency',currency:d.currency||'GBP',maximumFractionDigits:2}).format(n):new Intl.NumberFormat('en-GB',{maximumFractionDigits:2}).format(n)+' happiness points';
 const limit=Math.min(d.limit,d.kind==='money'?d.capacity:d.limit);
 const interior=r.threshold!==null&&r.threshold>0&&r.threshold<1;
 const near=interior&&Math.abs(r.p-r.threshold)<=.05;
 let title,text,change;
 if(r.rg.blocked&&r.rs.blocked){title='Both choices cross your limits';text='Going ahead and staying put both breach a limit you set. The red answer does not mean staying put is safe.';change='Look for a different option, a smaller commitment or a way to reduce the downside of both choices. Then compare them again.';}
 else if(r.rg.blocked){title=r.rg.flag?'Going ahead carries harm you flagged':'The possible loss is beyond your limit';text=r.rg.flag?'You marked going ahead as potentially causing serious or irreversible harm. That takes priority over the possible upside.':`Going ahead could lose ${amount(r.rg.loss)}. Your limit is ${amount(limit)}, so the risk screen stops it even if the potential upside is attractive.`;change=r.rg.flag?'Find a way to remove the serious or irreversible harm before reconsidering. Better odds alone will not remove this block.':`Reducing the possible loss to ${amount(limit)} or less would clear the financial or emotional loss screen. We would then compare the two choices again. Better odds alone do not clear this screen.`;}
 else if(r.rs.blocked){title='Staying put crosses your limits';text='Going ahead passes your risk screen. Not going ahead breaches a loss limit or carries serious or irreversible harm you flagged. That is why the answer is green.';change='If the downside of staying put can be brought within your limits, compare both choices again. The expected outcomes may then favour a different answer.';}
 else if(Math.abs(r.diff)<=tol){title='The comparison is evenly balanced';text='Your estimates give both choices the same average outcome. SIGFI returns red because going ahead has no clear numerical advantage.';}
 else if(A-C>tol&&B-D>tol){title='Going ahead wins in both scenarios';text='Going ahead comes out better whether things go well or badly, and its downside is within your limit. Changing the odds alone will not reverse this answer.';}
 else if(A-C<-tol&&B-D<-tol){title='Staying put wins in both scenarios';text='Not going ahead comes out better whether things go well or badly. Changing the odds alone will not make going ahead preferable.';}
 else if(near){title=r.goForIt?'A narrow go':'A narrow don’t';text=`${r.goForIt?'Going ahead':'Not going ahead'} comes out slightly ahead. A small change in the odds could change the answer. Both choices are within the limits you set. Being close to the threshold does not itself mean a large risk.`;}
 else {title=r.goForIt?'Going ahead has the advantage':'Staying put has the advantage';text=r.goForIt?'On your estimates, going ahead has the better average outcome and its downside is within your limit.':'On your estimates, not going ahead has the better average outcome. Both choices pass your risk screen.';}
 if(!change){
  if(interior){change=`You give things a ${pct(r.p)} chance of going well. Going ahead has the better average outcome ${r.slope>0?'above':'below'} ${pct(r.threshold)}. At the threshold the averages tie, so SIGFI returns red. This assumes the outcomes and risk limits stay the same.`;}
  else if(r.threshold!==null&&(r.threshold===0||r.threshold===1)){change=`The averages tie at ${pct(r.threshold)}. ${r.slope>0?'Above':'Below'} that probability, going ahead has the better average outcome, where that probability is possible. Elsewhere, the comparison favours staying put. Risk limits still apply.`;}
  else change='Changing the odds alone cannot reverse the comparison. The consequences of one or both choices would need to change. Look for a real change in the opportunity, cost or downside.';
 }
 return {title,text,change,go:r.go,stay:r.stay,goLoss:r.rg.loss,stayLoss:r.rs.loss,near,threshold:r.threshold};
}
root.SIGFI.explain=explain;
})(typeof globalThis!=='undefined'?globalThis:this);
