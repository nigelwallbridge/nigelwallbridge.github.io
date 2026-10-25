# Decider development workspace

This starts from the local version 1.13 prototype. The public `sigfi/` files are not changed by this workspace or its workflow. Confirm any newer changes made directly on GitHub before replacing source files here. The working brand remains Decider pending a confirmed naming change.

## Structure

- `src/`: editable website source. `engine.js` owns the mathematics, `app.js` owns the interface and current wording, `threshold-chart.js` owns graph rendering, and `settings.js` owns service configuration.
- `tests/`: Money, Happiness and resource-threshold regression cases, including the false second lottery threshold.
- `scripts/`: syntax checks, deterministic file build and a local preview server.
- `dist/`: generated preview; not committed or deployed automatically.

Node.js 24 or newer is required. No third-party packages or installation step are needed.

```
npm run check
npm test
npm run build
npm start
```

Then open http://127.0.0.1:4173. Stop the local server with Ctrl+C.

## GitHub checks and review

The workflow runs for changes on `decider-development` and relevant pull requests. It checks syntax, runs the regression cases and uploads a preview artifact. Under Actions, open the successful run and download `decider-development-preview`. Extract it and open index.html to try the app. This is a downloadable preview, not a hosted preview URL.

Review source changes in pull requests. Do not merge automatically. No Pages publishing action or publishing credentials are included. Keep the existing Pages configuration on `main`.

## Development numerics 1

The engine now calculates log utility differences directly with log1p. Near cancellation, near terminal-resource boundaries, or at very large resources it switches to an 80-decimal BigInt fixed-point logarithm. Input numbers are interpreted using their JavaScript decimal representations. Precision already lost in input parsing cannot be recovered. No third-party numerical library or network service is used.

Recommendations and resource-threshold searches share the comparator. The old fixed 1e-8 decision cutoff has been removed. An unresolved comparison is explicitly reported as unresolved, with a red headline; it is not called a tie. Exact equalities handled structurally remain ties. Displayed full utility totals can round to the same number even when the direct difference is resolved.

Reported crossing candidates are checked on both sides and include bracket and verification metadata. Tests cover genuine two-crossing behaviour as well as the false second lottery crossing. The high-precision series uses 80 fixed decimal places and a conservative 1e-72 uncertainty guard; this is a numerical safeguard, not formal interval certification. The derivative-polynomial partition still uses ordinary floating point. Tangencies, extremely close crossings, and crossings inside the initial boundary offset are not exhaustively certified. Searches remain bounded at one trillion times the payoff scale. Absence of a found crossing must not be interpreted as universal proof that none exists.

The suite includes 73 reference cases generated independently using Python Decimal with 115-digit precision. Run `python scripts/generate-reference.py` to reproduce them. Normal checks require only Node. Passing these cases is not proof of accuracy for every possible input. Further work should strengthen derivative partitioning and rigorous error bounds.

Wording is still inside app.js; extracting it into a content module is the next interface refactor. Historical tests for the superseded linear Happiness model were not carried over as current acceptance tests.

Contact still uses an email-app fallback. Central analytics and automatic form delivery are not connected. Preserve private API keys outside browser source.
