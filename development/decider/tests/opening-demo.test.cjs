const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
require('../src/engine.js');
const opening = require('../src/opening-demo.js');
const examples = require('../src/examples.js');
const labels = require('../src/dynamic-labels.js');

for (const [resources, expected] of [[1,'guaranteed'],[1000,'guaranteed'],[2777,'guaranteed'],[2778,'chance'],[10000,'chance'],[1e12,'chance']]) {
  const answer = opening.compare(resources);
  assert.equal(answer.recommendation, expected);
  assert.equal(answer.input.p, 50);
  assert.deepEqual(answer.input.pay, {A:1000000,B:0,C:50000,D:50000});
}
const equality = opening.compare(25000/9, true);
assert.equal(equality.tied, true);
assert.equal(equality.recommendation, 'equal');
assert.equal(equality.input.resources, 25000);
assert.equal(equality.input.pay.A, 9000000);
for (const value of [0,-1,Infinity,NaN,1e12+1]) assert.throws(()=>opening.compare(value), RangeError);

const baseline = require('./v119-baseline.json');
const priorById = new Map(baseline.examples.map(e=>[e.id,e]));
for (const example of examples.items) {
  const prior = priorById.get(example.id);
  for (const field of ['pay','p','resources','variant','kind','currency','importance']) {
    assert.deepEqual(example[field], prior[field], example.id+' preserves '+field);
  }
  assert.equal(example.navigationCategories.length, 1);
  assert.ok(['buying','doing','big'].includes(example.navigationCategories[0]));
}
for (const file of ['engine.js','precision.js']) {
  const text = fs.readFileSync(path.join(__dirname,'../src',file),'utf8').replace(/\r\n/g,'\n');
  const digest = crypto.createHash('sha256').update(text).digest('hex');
  assert.equal(digest,baseline.hashes[file],file+' has unchanged source content');
}
assert.match(labels.configs['phone-warranty'].probabilityQuestion,/avoid a covered fault/);
assert.equal(examples.items.find(e=>e.id==='phone-warranty').p,90);
console.log('Opening uses shared engine below and above exact rational balance; equality is explicit; all 25 numeric assumptions and calculation files are unchanged.');
