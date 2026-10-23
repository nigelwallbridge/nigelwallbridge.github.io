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

## What this first step does not change

The calculation engine is copied unchanged. Adaptive precision, systematically verified crossings, stable decision differences, and consistent numerical tolerance across recommendations and diagnostics remain the next mathematical-engine work. Passing these tests is not proof of accuracy for every possible input.

Wording is still inside app.js; extracting it into a content module is the next interface refactor. Historical tests for the superseded linear Happiness model were not carried over as current acceptance tests.

Contact still uses an email-app fallback. Central analytics and automatic form delivery are not connected. Preserve private API keys outside browser source.
