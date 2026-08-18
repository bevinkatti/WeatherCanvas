# Weather Canvas

Transform your Windows desktop into a living, breathing canvas with Weather Canvas - a lightweight desktop widget that pairs hyperlocal, real-time weather with stunning aesthetic art.

This repository is a starter scaffold (Tauri + Vite) that includes:
- Transparent, always-on-top window configured in tauri.conf.json
- Weather fetcher (OpenWeatherMap) with 10-minute cache
- Inline SVG landmark loader and 10 placeholder SVGs
- Simple canvas-based rain/snow overlays
- System tray wiring (Tauri) and a simple store abstraction

Quick start
1. Copy .env.example to .env and set VITE_OWM_API_KEY
2. npm install
3. npm run dev
4. npm run tauri:dev (in a separate terminal)

Notes
- No API keys are committed. Add your OpenWeatherMap key to .env or CI secrets.
- This branch ('feature/starter-scaffold') contains the initial scaffold. Open a PR against main when ready.
