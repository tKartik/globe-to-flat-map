# WebGL Globe Morph

Interactive 3D globe that morphs into a Van der Grinten flat map. Built with Three.js and GeoJSON world data.

![Globe to flat map morph](https://img.shields.io/badge/WebGL-Three.js-blue)

## Features

- **3D Globe** – Rotate by dragging; idle spin when not interacting
- **Flat Map** – Van der Grinten projection with hex land tiles
- **Smooth Morph** – Animated transition between globe and flat views
- **Toggle** – Double-click or use the top-right button to switch projections
- **No build step** – Single HTML file, runs in any modern browser

## Tech Stack

- [Three.js](https://threejs.org/) – WebGL rendering
- GeoJSON – World country polygons (Natural Earth)
- Vanilla JavaScript (ES modules)

## How to Run

1. Open `van-der-grinten-map.html` in a browser, or
2. Serve locally (required for ES modules):

   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

3. Open `http://localhost:8080` (or the port shown)

## Project Structure

```
├── van-der-grinten-map.html   # Main app (HTML, CSS, JS, embedded GeoJSON)
├── world.json                 # GeoJSON world data (optional; data also embedded in HTML)
└── README.md
```

## Framer Property Panel

To use the globe in Framer with the Property Panel (color, opacity, density controls):

1. **Host the globe** – Enable [GitHub Pages](https://github.com/tKartik/globe-to-flat-map/settings/pages) on your repo (branch: `main`, folder: `/`).

2. **Add the Code Component** – In Framer: Insert → Code → Create new component. Paste the contents of `GlobeMorphFramer.tsx` and set `GLOBE_URL` to your GitHub Pages URL (e.g. `https://tkartik.github.io/globe-to-flat-map/van-der-grinten-map.html`).

3. **Use it** – Drag the component onto the canvas. When selected, Framer’s Property Panel (right side) shows Land Color, Ocean Color, Background, opacity, and density controls.

## License

MIT
