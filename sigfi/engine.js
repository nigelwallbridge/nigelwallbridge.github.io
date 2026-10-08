(function(root){
function analyse(d){
 const p=d.p/100,lo=d.uncertain?d.low/100:p,hi=d.uncertain?d.high/100:p;
 const {A,B,C,D}=d.pay;
 const go=q=>q*A+(1-q)*B,stay=q=>q*C+(1-q)*D;
 const diff=q=>go(q)-stay(q),slope=(A-C)-(B-D);
 const threshold=Math.abs(slope)<1e-10?null:-(B-D)/slope;
 const risk=(x,y,flag)=>({worst:Math.min(x,y),loss:Math.max(0,-Math.min(x,y)),blocked:flag||Math.max(0,-Math.min(x,y))>d.limit||d.kind==='money'&&Math.max(0,-Math.min(x,y))>d.capacity,flag});
 const rg=risk(A,B,d.ruinGo),rs=risk(C,D,d.ruinStay);
 const dl=diff(lo),dh=diff(hi),min=Math.min(dl,dh),max=Math.max(dl,dh),tol=1e-8;
 let verdict,reason;
 if(rg.blocked&&rs.blocked){verdict='Rework the alternatives';reason='Both choices breach a risk limit you set. Look for a smaller commitment or a different alternative.';}
 else if(rg.blocked){verdict='Hold off on this version';reason='Going for it breaches a risk limit you set. The alternative stays within those limits in the outcomes you described.';}
 else if(rs.blocked){verdict='Going for it passes your risk screen';reason='Not going for it breaches a risk limit you set. Check for other alternatives before committing.';}
 else if(min>tol){verdict='Go for it, on these assumptions';reason='Going for it has the higher average outcome throughout your stated belief range and passes your risk screen.';}
 else if(max<-tol){verdict='Hold off, on these assumptions';reason='Not going for it has the higher average outcome throughout your stated belief range and passes your risk screen.';}
 else if(Math.abs(min)<tol&&Math.abs(max)<tol){verdict='The comparison is evenly balanced';reason='These inputs give both choices the same average outcome. Other consequences or better evidence could settle the choice.';}
 else{verdict='Clarify the uncertainty first';reason='The preferred choice changes within your belief range. Evidence about the favourable circumstance could change the decision.';}
 return {p,lo,hi,go:go(p),stay:stay(p),goRange:[go(lo),go(hi)].sort((a,b)=>a-b),stayRange:[stay(lo),stay(hi)].sort((a,b)=>a-b),diff:diff(p),threshold,slope,rg,rs,verdict,reason,min,max};
}
root.SIGFI={analyse};
if(typeof module!=='undefined')module.exports={analyse};
})(typeof globalThis!=='undefined'?globalThis:this);
