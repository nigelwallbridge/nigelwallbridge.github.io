const assert=require('node:assert/strict');
const {analyse,quick}=require('../src/engine.js');
const base={kind:'money',resources:5,p:60,pay:{A:6,B:-4,C:-1,D:2},limit:5,capacity:5};
const r=analyse(base);
assert.ok(Math.abs(r.go-1.4387371636790224)<1e-10);
assert.ok(Math.abs(r.stay-(.6*Math.log(4)+.4*Math.log(7)))<1e-12);
assert.equal(quick(base).goForIt,false);
assert.equal(quick({...base,resources:6.43}).goForIt,false);
assert.equal(quick({...base,resources:6.45}).goForIt,true);
let low=6,high=7;for(let i=0;i<60;i++){const m=(low+high)/2;if(analyse({...base,resources:m}).diff>0)high=m;else low=m;}
console.log('Resource threshold:',(low+high)/2);
for(const N of [4,3]){const x=analyse({...base,resources:N});assert.equal(x.go,-Infinity);assert.equal(quick({...base,resources:N}).goForIt,false);}
assert.ok(Number.isFinite(analyse({...base,resources:4,p:100}).go));
assert.equal(analyse({...base,resources:4,p:0}).go,-Infinity);
const neither={...base,pay:{A:-5,B:-5,C:-6,D:-6}};
assert.equal(analyse(neither).verdict,'Rework the alternatives');assert.equal(quick(neither).goForIt,false);
assert.equal(quick({...base,pay:{A:1,B:1,C:1,D:1}}).goForIt,false);
assert.equal(quick({...base,resources:100,ruinGo:true}).goForIt,false);
assert.equal(quick({...base,uncertain:true,low:0,high:100}).goForIt,false);
for(const resources of [0,-1,NaN,undefined])assert.throws(()=>analyse({...base,resources}),RangeError);
for(const p of [-1,101,NaN])assert.throws(()=>analyse({...base,p}),RangeError);
assert.equal(analyse(base).p,.6);
console.log('Expected-log regression checks passed.');
