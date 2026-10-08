# SIGFI MVP

A static, browser-only prototype of “Should I go for it?” designed for phones. Three screens: Money or Happiness, four main sliders, and a green Go for it or red Don’t result.

## Put it on GitHub Pages

1. Unzip `SIGFI_Simple_GitHub_Pages.zip`.
2. Open the GitHub repository you want to use. Choose **Add file → Upload files**.
3. Upload the contents of the unzipped folder to the repository root: `index.html`, `style.css`, `app.js`, `engine.js` and `.nojekyll`. Upload the files themselves, not an enclosing folder.
4. Commit the upload.
5. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then your branch (usually `main`) and **/(root)**. Save.
6. GitHub will show the published address when deployment finishes. If Pages is already enabled, uploading to its configured branch and folder updates the existing site.

If the repository already contains your main website, use a `sigfi` folder instead of replacing its files. Keep these files together and visit the existing Pages address followed by `/sigfi/`. Preserve the existing Pages publishing configuration.

## Run locally

Open `index.html` in a browser. There is no build step, database, API key or login.

## What it does

- Keeps Money and Happiness as the two opening choices.
- Takes A and B, a likelihood estimate, and a maximum tolerable downside on one screen.
- Sets C and D to zero initially. Users can open “What if I don’t go for it?” to change them.
- Provides optional flags for serious or irreversible harm for both choices.
- Uses an optional decision name, with no required written answers.
- Compares `p*A + (1-p)*B` with `p*C + (1-p)*D`.
- Returns green when going for it passes the risk screen and either has a strictly better weighted average or the alternative fails the risk screen.
- Returns red when going for it breaches the risk limit, on a tie, or when its weighted average is lower and both choices are admissible. Both inadmissible also returns red, with an explanation that this does not make the alternative safe.
- Shows one short reason. Calculations and a threshold appear under “Why this answer?”.
- Supports editing and starting another decision.

## Boundaries of the prototype

The headline is intentionally binary. Recommendations still depend on user inputs. The simplified route combines willingness and ability to absorb a loss into “Biggest loss I can live with”. It does not infer probabilities, predict outcomes, calculate a statistical probability of ruin, or model additional scenarios, cash-flow timing or repeated decisions. Happiness scores assume meaningful numerical differences in the user's ratings. It assumes payoffs refer to the same period and the same two underlying circumstances. No AI analyses free text. Removing uncertainty ranges and detailed state questions is an intentional simplification for this prototype.

Answers are held only in page memory and disappear on refresh. There are no analytics, external fonts, API calls or data submissions. Publishing on GitHub Pages may make the app publicly accessible, depending on the repository and Pages configuration. The app does not upload users' answers to the repository.

## Update the existing /sigfi/ app

Replace the four files in the existing `sigfi` folder on the `main` branch: `index.html`, `style.css`, `app.js`, `engine.js`. Keep the existing GitHub Pages settings (`main` and `/(root)`). The site remains at `https://nigelwallbridge.github.io/sigfi/`. Hard-refresh after publishing if you see the previous version.
