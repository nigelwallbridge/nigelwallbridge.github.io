# The Decider 1.19 — dynamic-labelling development trial

All 25 current examples have explicit labels for the four outcomes, simplified alternative, probability, starting resources, outcome-slider endpoints, result and Explore. Direct entry retains its general wording. Monetary input remains net gain/loss (negative for costs), and existing happiness numbers and scales are preserved. No example outcomes, odds or financial resources have been changed.

The probability meaning is explicit: warranty = no covered fault; refundable booking = trip goes ahead; lottery = chosen numbers win; flood defences = damaging flood during the whole appraisal period. UI help shows the complementary probability. Both alternatives use the same two scenarios.

Dynamic labels live in src/dynamic-labels.js. DYNAMIC-LABELLING.md lists all wording for review. Tests enforce coverage, scenario/choice mappings, probability orientation and calculation invariance. Context-aware results and Explore derive from current answers; example commentary is never reused as a computed personal explanation.

The welcome page no longer states the collection size. Resolution Advisory is applied to this development version. Installation, contact and analytics configuration are unchanged. Public 1.18 is not replaced by this trial.
