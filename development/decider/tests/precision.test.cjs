const assert=require('node:assert/strict');
const {compare}=require('../src/precision.js');
const {analyse,quick,resourceThresholds}=require('../src/engine.js');
const cases=require('./reference.json');
for(const [i,c]of cases.entries()){
 const actual=compare(c.input),expected=Number(c.expectedDifference);
 if(expected===0){assert.ok(actual.exactTie,`case ${i}: exact tie`);continue;}
 if(Math.abs(expected)<1e-72){assert.equal(actual.resolved,false,`case ${i}: do not invent an answer`);continue;}
 assert.equal(actual.resolved,true,`case ${i}: resolved`);
 assert.equal(actual.sign,c.sign,`case ${i}: sign`);
 assert.ok(Math.abs((actual.difference-expected)/expected)<1e-10,`case ${i}: value`);
 assert.equal(quick(c.input).goForIt,c.sign>0,`case ${i}: verdict matches comparison`);
}
const lottery={kind:'money',resources:200000,p:.0001,pay:{A:30000000,B:-10,C:20,D:20}};
const threshold=resourceThresholds(lottery).roots;
assert.equal(threshold.length,1);assert.equal(threshold[0].verified,true);
assert.ok(Math.abs(threshold[0].N/44999964999989.444-1)<1e-12);
assert.equal(quick({...lottery,resources:4e13}).goForIt,false);
assert.equal(quick({...lottery,resources:5e13}).goForIt,true);
const tiny={kind:'happiness',resources:1e80,p:50,pay:{A:1,B:1,C:0,D:0}};
assert.equal(analyse(tiny).comparisonResolved,false);
assert.match(analyse(tiny).reason,/too small to resolve/);
assert.equal(quick(tiny).goForIt,false);
const two={kind:'money',resources:100,p:40,pay:{A:-15,B:6,C:20,D:-14}};
const pair=resourceThresholds(two).roots;
assert.equal(pair.length,2);assert.ok(pair.every(x=>x.verified));
assert.equal(quick({...two,resources:15.1}).goForIt,false);
assert.equal(quick({...two,resources:20}).goForIt,true);
assert.equal(quick({...two,resources:50}).goForIt,false);
console.log(`${cases.length} independent decimal references and lottery/uncertainty regressions passed.`);
