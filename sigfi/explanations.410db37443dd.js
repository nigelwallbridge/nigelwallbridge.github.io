(function(root){
function explain(d){const r=root.SIGFI.quick(d);return {title:r.verdict,text:r.reason,change:'Compare again if resources, payoffs or probabilities change.',go:r.go,stay:r.stay,goLoss:r.rg.loss,stayLoss:r.rs.loss,near:false,threshold:r.threshold};}
root.SIGFI.explain=explain;
})(typeof globalThis!=='undefined'?globalThis:this);
