const assert=require('node:assert/strict');
const {items,stateFor,choose}=require('../src/examples.js');
const maths=require('../src/engine.js');
assert.equal(items.length,25);
assert.equal(new Set(items.map(e=>e.id)).size,25);
for(const [category,n] of [['public',4],['business',5],['money',6],['happiness',10]])assert.equal(items.filter(e=>e.category===category).length,n);
for(const e of items){
 assert.ok(e.question&&e.why&&e.lesson&&e.change);
 assert.equal(e.situations.length,2);assert.deepEqual(Object.keys(e.notes),['A','B','C','D']);
 const original=JSON.stringify(e),a=stateFor(e),b=stateFor(e,true);
 for(const d of [a,b]){
  assert.ok(d.p>=0&&d.p<=100&&d.resources>0);
  assert.equal(d.mode==='simplified',d.pay.C===d.pay.D);
  assert.ok(Object.values(d.pay).every(n=>Number.isFinite(n)&&d.resources+n>0));
  if(d.kind==='happiness')assert.ok(Object.values(d.pay).every(n=>n>=-25&&n<=25));
 }
 const result=maths.quick(a),changed=maths.quick(b);
 assert.equal(result.comparisonResolved,true,e.id);assert.equal(changed.comparisonResolved,true,e.id);
 assert.equal(result.goForIt,e.expected,e.id+' result');assert.equal(changed.goForIt,e.variant.expected,e.id+' variation');
 assert.notEqual(result.goForIt,changed.goForIt,e.id+' must illustrate an actual change');
 assert.equal(JSON.stringify(e),original,'example templates must not change when loaded');
}
let seed=8172;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
let previous=[];const seen=new Set();
for(let i=0;i<500;i++){
 const draw=choose(previous,random),ids=draw.map(e=>e.id);
 assert.equal(draw.length,4);assert.equal(new Set(ids).size,4);
 assert.equal(draw.filter(e=>e.category==='public').length,1);
 assert.equal(draw.filter(e=>e.category==='business').length,1);
 assert.equal(draw.filter(e=>e.category==='money').length,1);
 assert.equal(draw.filter(e=>e.category==='happiness').length,1);
 assert.ok(ids.every(id=>!previous.includes(id)),'avoid repeating the last welcome selection');
 ids.forEach(id=>seen.add(id));previous=ids;
}
assert.equal(seen.size,25);
for(const category of ['public','business','money','happiness']){for(let i=0;i<50;i++){const draw=choose([],random,category);assert.equal(draw.length,4);assert.ok(draw.every(e=>e.category===category));assert.equal(new Set(draw.map(e=>e.id)).size,4);}}
console.log('25 results and 25 variations; 500 balanced mixed draws; all category filters verified.');
