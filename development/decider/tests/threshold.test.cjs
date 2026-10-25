const assert=require('node:assert/strict');
const {analyse,resourceThresholds}=require('../src/engine.js');
const base={kind:'money',resources:5,p:60,pay:{A:6,B:-4,C:-1,D:2}};
let t=resourceThresholds(base);assert.equal(t.roots.length,1);
assert.ok(Math.abs(t.roots[0].N-6.442037237136692)<1e-8);
assert.ok(Math.abs(analyse({...base,resources:t.roots[0].N}).diff)<1e-12);
assert.ok(Math.abs(t.roots[0].utility-1.8697815530456776)<1e-12);
assert.equal(resourceThresholds({...base,pay:{A:2,B:2,C:1,D:1}}).roots.length,0);
assert.equal(resourceThresholds({...base,pay:{A:1,B:2,C:1,D:2}}).equalEverywhere,true);
assert.equal(resourceThresholds({...base,p:100}).roots.length,0);
assert.equal(resourceThresholds({...base,p:0}).roots.length,0);
// Equal log utilities can also hold for different lotteries with identical distributions.
assert.equal(resourceThresholds({...base,p:50,pay:{A:1,B:2,C:2,D:1}}).equalEverywhere,true);
console.log('Resource threshold diagnostic checks passed:',t.roots);
const edge={...base,resources:10,pay:{A:3,B:-8,C:-2,D:-1}};
assert.ok(Math.abs(resourceThresholds(edge).roots[0].N-74.98306202377529)<1e-7);
const boundary=resourceThresholds({...edge,pay:{...edge.pay,B:-8.5}});
assert.equal(boundary.roots.length,0);assert.equal(boundary.noFiniteCrossing,true);assert.equal(boundary.preferred,'Cautious');
assert.ok(resourceThresholds({...edge,pay:{...edge.pay,B:-8.49999}}).roots[0].N>3e6);
assert.equal(resourceThresholds({...edge,pay:{...edge.pay,B:-8.51}}).roots.length,0);
console.log('Equal-mean boundary and large finite threshold checks passed.');
// Near-equal expected payoffs: a tiny stationary difference is not a crossing.
const lottery=resourceThresholds({kind:'money',resources:200000,p:0.0001,pay:{A:30000000,B:-10,C:20,D:20}});
assert.equal(lottery.roots.length,1);
// Independently checked with 65-digit decimal logarithms and bisection.
assert.ok(Math.abs(lottery.roots[0].N/44999964999989.444-1)<1e-8);
console.log('Lottery false-second-threshold regression passed.');
