(function (root) {
  const balance = { numerator: 25000, denominator: 9 };

  function compare(resources, atBalance = false) {
    if (!Number.isFinite(resources) || resources <= 0 || resources > 1e12) {
      throw new RangeError('Enter starting resources above zero and up to £1 trillion.');
    }
    // Scaling every terminal resource by the same positive factor preserves
    // the expected-log comparison. Ninths of a pound represent the exact
    // balance point without rounding it to a decimal input.
    const units = atBalance ? balance.denominator : 1;
    const startingResources = atBalance ? balance.numerator : resources;
    const input = {
      kind: 'money',
      p: 50,
      resources: startingResources,
      pay: { A: 1000000 * units, B: 0, C: 50000 * units, D: 50000 * units }
    };
    const result = root.SIGFI.quick(input);
    // An exact product identity establishes equality for this two-outcome,
    // equally weighted demonstration. Preferences come from the shared engine.
    const tied = Number.isSafeInteger(startingResources) &&
      BigInt(startingResources + input.pay.A) * BigInt(startingResources) ===
      BigInt(startingResources + input.pay.C) ** 2n;
    return {
      input,
      result,
      tied,
      recommendation: tied ? 'equal' : result.comparisonResolved ?
        (result.goForIt ? 'chance' : 'guaranteed') : 'unresolved'
    };
  }

  function resourcesAt(position) {
    return Math.round(Math.expm1(position / 1000 * Math.log1p(100000)));
  }

  function positionAt(resources) {
    return Math.min(1000, Math.log1p(resources) / Math.log1p(100000) * 1000);
  }

  root.DeciderOpening = { compare, balance, resourcesAt, positionAt };
  if (typeof module !== 'undefined') module.exports = root.DeciderOpening;
})(typeof globalThis !== 'undefined' ? globalThis : this);
