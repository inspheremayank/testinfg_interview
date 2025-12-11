Refactor summary
- Extracted CSS :root tokens into src/styles/_tokens.scss
- Created component SCSS partials in src/styles/components/ for grouped selectors (header, splash, title, card, backgroundOrb)
- Created src/styles/_base.scss for remaining rules
- Created src/styles/main.scss importing tokens and components
- Added src/animations/animations.js (GSAP skeleton) and src/tokens.js (JS mapping)
- Updated package.json to include gsap dependency

How to use
1. Install deps: npm install
2. If using Sass, ensure your build compiles src/styles/main.scss to CSS and that entry imports it (e.g. import './styles/main.scss')
3. Animation entrypoint: import { initSplash, initHero } from './animations/animations' and call them in your main script

Notes
- I grouped rules heuristically by selector keywords. Please review component partials and move rules if grouping needs refinement.
- I preserved original selectors and did not rename classes.
