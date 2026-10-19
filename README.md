# Playwright Visual Assertions Demo

Minimal JavaScript project demonstrating `toHaveScreenshot()` with `maxDiffPixels`, `threshold`, `maxDiffPixelRatio`, and `locator.boundingBox()`.

## Install

```bash
npm install
npx playwright install chromium
```

## Run the site manually

```bash
node server.js
```

Open http://127.0.0.1:4173 and stop the server with Ctrl+C. Playwright also starts the server automatically during test runs.

## Generate baselines (first run)

```bash
npm run test:update
```

Review the images created under `tests/visual.spec.js-snapshots/` before committing them.

## Run tests

```bash
npm test
npm run report
```

## Try a visual regression

Change `.product-image { height: 190px; }` to `height: 215px;` in `public/styles.css`, then run `npm test`. Do not update baselines for this experiment.

## Concepts

- `maxDiffPixels: 100`: allow at most 100 pixels to be classified as different.
- `threshold: 0.1`: per-pixel color-difference sensitivity, not a 10% image allowance.
- `maxDiffPixelRatio: 0.001`: allow a mismatch ratio of 0.1%.
- `boundingBox()`: returns element `x`, `y`, `width`, and `height` relative to the viewport in CSS pixels.

Test E is a syntax demonstration, not a useful regression check, because it uses the current coordinates as the expected coordinates. In a real test, use approved design coordinates or a stable expected layout.

## Git

```bash
git init
git add .
git commit -m "Add Playwright visual assertions demo"
```
