const assert=require('node:assert/strict');
const fs=require('node:fs');
const engine=require('../src/engine.js'),prior=require('../archive/serious-harm-veto-1.19/engine.js');
const examples=require('../src/examples.js'),labels=require('../src/dynamic-labels.js');
// The archive's require must resolve its original, unchanged precision implementation.
for(const e of examples.items){
 for(const variant of [false,true]){
  const d=examples.stateFor(e,variant),baseline=engine.quick(d);
  const old=prior.quick(d);
  for(const key of ['go','stay','diff','min','max','threshold','comparison','goForIt'])assert.deepEqual(baseline[key],old[key],e.id+' unchanged '+key);
  for(const ruinGo of [true,false,'true',1])for(const ruinStay of [true,false,'true',1]){
   const stale={...d,ruinGo,ruinStay};
   assert.deepEqual(engine.quick(stale),baseline,e.id+' legacy flags ignored');
   const a=labels.summary({...stale,templateId:e.id},engine.quick(stale));
   assert.equal(a,labels.summary({...d,templateId:e.id},baseline));
   assert.doesNotMatch(a,/serious|irreversible|harm/i);
  }
 }
 const c=labels.configs[e.id];assert.ok(c.displayPeriod.length);assert.equal(c.probabilityLabels.length,2);
 for(const key of 'ABCD')assert.ok(c.questions[key].length<=165,e.id+' concise '+key);
}
for(const kind of ['money','happiness']){
 const d={kind,p:50,resources:100,pay:{A:50,B:-100,C:0,D:0},ruinGo:true,ruinStay:true};
 const r=engine.quick(d);assert.equal(r.comparison.badGo,true);assert.equal(r.goForIt,false);
 const stayBad=engine.quick({...d,pay:{A:0,B:0,C:50,D:-100}});assert.equal(stayBad.comparison.badStay,true);assert.equal(stayBad.goForIt,true);
 const impossible=engine.quick({...d,p:100});assert.equal(impossible.comparison.badGo,false);assert.equal(impossible.goForIt,true);
}
const app=fs.readFileSync(require.resolve('../src/app.js'),'utf8');
assert.doesNotMatch(app,/id="ruinGo"|id="ruinStay"|Anything I couldn’t recover from|serious or irreversible harm/);
assert.doesNotMatch(app,/if\(d.ruinGo\|\|d.ruinStay/);
console.log('50 baseline decisions and numerical scores match the previous model; 800 stale-flag combinations ignored; resource exhaustion and zero-probability exclusions retained; all contextual records complete.');
