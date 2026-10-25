# 1.17 development preview

Based on fresh downloads of both GitHub branches. Editable source was aligned to the current `main/sigfi` release before presentation edits were applied.

- Front page: The Decider; “There is a best choice. Let’s find it.”
- Diagonal red launch banner with white “New” script and “and completely free from AI”.
- Supporting line: “Understand the risk. Make a choice you can explain and defend.” followed by “Information science, not AI guesswork.”
- Simplified/Normal control now sits after A/B, immediately before the C/D alternatives on both routes. Its semantics and saved values are unchanged.
- Browser title, header, About and return/result labels updated for The Decider.

The numerical engine, precision module, graph, service code and service settings match current `main/sigfi` byte-for-byte. GoatCounter, optional Google Analytics consent, and Formspree endpoints are retained. The live `sigfi` folder is not included in this update.

Checks: all four existing calculation test files pass, including 73 independent decimal reference cases. Browser tests at 320, 390 and 1024 pixels confirm no horizontal overflow, correct switch placement in both tracks, and preservation of entered normal/simplified values. External service requests were blocked during presentation tests.

Upload the outer `development` folder at the repository root on `decider-development`. Do not upload into `sigfi`. The existing GitHub Actions workflow builds the downloadable preview. Review it before a separate public release.
