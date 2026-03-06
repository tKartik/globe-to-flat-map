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

## License

MIT
