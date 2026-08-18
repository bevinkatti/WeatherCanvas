# Contributing

Thanks for wanting to contribute! This project is designed to be friendly for both developers and artists who want to add landmark assets.

Asset rules (SVGs)
- Prefer vector (SVG) assets; aim for under 200KB each for performance.
- ViewBox defined and dimensions 200x120 are recommended for placeholders.
- Avoid embedded raster images inside SVG.
- Include a single root <svg> element. Add descriptive text/id attributes for layers if animation is intended.

Manifest schema
- Edit src/assets/manifest.json to add new cities. Follow src/assets/manifest.schema.json for the schema.
- Each city entry requires: lat, lon, timezone, asset (path), landmark (string). premium is optional.

Development
- Run locally with 'npm run dev' and 'npm run tauri:dev'.
- When adding new assets, add them to src/assets/landmarks and update manifest.json.

License
- This project uses the MIT license. By contributing you agree to license your contributions under MIT.
