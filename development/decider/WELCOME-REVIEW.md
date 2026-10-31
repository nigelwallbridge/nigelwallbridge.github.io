# The Decider 1.18

Public promotion of the tested welcome and example experience.

- Original brand promise and distinct personal/example journeys.
- 25 examples with The Decider's AI-free decision, concise explanations and editable assumptions.
- Topic selectors below the example cards; phone extended-warranty example.
- Installation and offline calculations, with a deliberate update-and-restart flow.
- Content-hashed JavaScript and CSS assets to avoid mixing releases.

Public app: /sigfi/. The repository home forwards there. Test preview: /decider-test/.

Builds: npm run build produces the labelled development preview in dist/. npm run build:public produces the public app in dist-public/, with public app name and no development banner. Both builds use the same source and mathematical engine. Version 1.18 is shown in the footer.

Calculation, precision, threshold and example checks pass. Browser checks cover all 25 examples, both tracks, results and Explore, offline operation, contact navigation, topic selection, and mobile/desktop layouts. No live forms are submitted during verification.

Rollback: retain the previous main commit and the /sigfi/ tree recorded in the local deployment record. Do not merge the whole development branch over main.
