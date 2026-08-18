# Weather Canvas

Transform your Windows desktop into a living, breathing canvas — a lightweight, beautiful weather widget that pairs hyperlocal, real-time weather with stylized landmark art.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Repo size](https://img.shields.io/github/repo-size/bevinkatti/WeatherCanvas)](https://github.com/bevinkatti/WeatherCanvas) ![Made for Windows](https://img.shields.io/badge/platform-Windows-lightgrey)

Demo
- Animated demo GIF placeholder:  
  ![demo](assets/demo.gif)  
  (Replace `assets/demo.gif` with a high-quality demo in the repo for best presentation.)

Why Weather Canvas?
- Minimal and fast: Tauri + Vite keeps the app lightweight.
- Aesthetic-first: SVG landmarks + canvas/Lottie overlays for beautiful visuals.
- Always-on-top, transparent widget designed to blend with your desktop.
- Extensible: manifest-driven assets and a plugin-friendly architecture.

Highlights (MVP)
- Current temperature, condition, humidity (OpenWeatherMap)
- Local time display for the selected city
- 10 curated SVG landmark placeholders (swap for polished art)
- Rain / snow / fog overlays (canvas starter) + Lottie-ready stub
- Transparent, always-on-top borderless window for a desktop widget
- System tray with quick access (open/quit) and renderer wiring
- Settings persistence (localStorage starter; Tauri fs suggested for disk)
- Auto-refresh every 10 minutes

Table of Contents
- Quick start
- Development (dev / debug)
- Build & package
- Adding landmarks & manifest
- Design & asset guidelines
- Contributing
- Roadmap
- Troubleshooting & FAQ
- License & Credits

Quick start (developer)
1. Clone
   git clone https://github.com/bevinkatti/WeatherCanvas.git
   cd WeatherCanvas
2. Copy environment example and add OpenWeatherMap API key
   cp .env.example .env
   # Edit .env and set:
   VITE_OWM_API_KEY=your_openweathermap_api_key_here
3. Install node deps
   npm install
4. Start the renderer
   npm run dev
5. In another terminal, start Tauri (desktop window)
   npm run tauri:dev

Requirements
- Node.js (18+ recommended) and npm
- Rust + cargo (stable) and Tauri prerequisites (Windows toolchain and dev dependencies)
  - See: https://tauri.app for platform-specific setup instructions
- OpenWeatherMap API key (free tier is sufficient for dev)

Development scripts
- npm run dev — start Vite dev server (renderer)
- npm run build — build frontend assets to dist
- npm run tauri:dev — run Tauri in dev mode (desktop app)
- npm run tauri:build — create distributable builds (release)

Recommended workflow
- Work in a feature branch, open a PR to `main`, and use GitHub Actions CI (optional).
- Replace placeholder SVGs in `src/assets/landmarks/` with optimized artwork.
- Add new cities to `src/assets/manifest.json`.

Adding landmarks & manifest
- Manifest: `src/assets/manifest.json` maps city names to metadata and an asset path.
- Example entry:
  {
    "Paris": {
      "lat": 48.8566,
      "lon": 2.3522,
      "timezone": "Europe/Paris",
      "landmark": "Eiffel Tower",
      "asset": "assets/landmarks/paris_eiffel.svg",
      "premium": false
    }
  }
- Schema: `src/assets/manifest.schema.json` (JSON Schema v7) — use it to validate contributions.

Design & asset guidelines (short)
- Prefer vector SVG for crisp scaling. Keep each asset < 200KB when possible.
- Provide a clear viewBox (the project uses 200×120 for placeholders; adapt as needed).
- Avoid embedded raster images inside SVG assets unless necessary.
- If you want animatable layers, add id/class attributes to SVG groups and explain intended animations in the PR.

Polish & performance tips
- Inline SVG injection (renderer util) allows CSS theming and DOM animations.
- For higher-performance effects, use Lottie (Lottie Web) or WebGL shaders for overlays.
- Cache API responses (project uses a 10-minute in-memory cache by default). Consider persistent caching for offline behavior.
- Persist settings to disk with Tauri fs when moving from prototype localStorage.

Contributing
- See CONTRIBUTING.md for the contribution process, asset rules, and manifest schema.
- When adding new assets:
  - Put files in `src/assets/landmarks/`
  - Update `src/assets/manifest.json`
  - Add a small preview thumbnail or GIF under `assets/` for the README

Roadmap (short-term)
- Replace placeholder artwork with 10 polished landmark packs
- Improve overlays: Lottie support, shader-based effects, aurora & lightning
- System tray menu with direct city switching and preferences window
- Settings persistence to disk and cloud sync (premium)
- Packaging CI & release artifacts for Windows

Roadmap (long-term / premium ideas)
- 4K asset packs, Live Wallpaper mode (full-screen), Multi-widget support, Premium asset store, Notifications & severe weather alerts, Plugin API for custom overlays.

Troubleshooting & FAQ
- Tauri build fails with missing Rust toolchain?
  - Install rustup and the stable toolchain: https://rustup.rs
  - On Windows ensure `Visual Studio Build Tools` are installed (C/C++ build tools).
- “Weather fetch failed” or empty temperature:
  - Ensure VITE_OWM_API_KEY is set in `.env` and your rate limit hasn't been exceeded.
- SVG looks clipped or too large:
  - Check viewBox and width/height attributes. The inline injector will add `.landmark-svg` class for styling.

Security & privacy
- The app uses OpenWeatherMap. No API keys are committed — keep keys out of repo.
- Consider exposing a small proxy in Tauri if you need to hide keys from distributed builds (or use per-user keys).

License
- MIT License — see LICENSE (Copyright © 2026 Abhishek bevinkatti)

Credits & authors
- Main author: Abhishek bevinkatti
- Co-author / helper: GitHub Copilot (Co-authored-by: GitHub Copilot <copilot@github.com>)  
  (Thanks to contributors and artists who will help refine the landmark packs.)

Contact & community
- Repo: https://github.com/bevinkatti/WeatherCanvas
- Open an issue to report bugs or propose features.
- Consider a Discussions/Discord space for artists & contributors (planned).

Showcase & marketing
- Add a high-quality demo GIF in `assets/` and update the README header.
- Create a small landing screenshot gallery in `.github/` or `docs/` and link to it in the README.

Want me to
- Create a polished README hero image + demo GIF from the current placeholders, or
- Add a GitHub Actions workflow that builds the app on every PR and creates an artifact?

Pick one and I’ll add it next.