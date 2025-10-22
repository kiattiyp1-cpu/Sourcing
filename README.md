# FlyerTrack

FlyerTrack is a mobile-first web application for planning, capturing, and analysing flyer distribution campaigns across multiple branches. The demo runs entirely in the browser and uses LocalStorage for persistence, making it easy to evaluate without a backend.

## Features

- **Role-based workspace** – log in as an administrator to monitor every branch or as a branch operator restricted to your own territory.
- **Interactive analytics** – animated KPI cards, an ECharts branch performance graph, and a Leaflet map with colour-coded markers per branch.
- **Comprehensive records** – complete CRUD workflow for flyer drops, including GPS coordinates, captured photos with preview, and multi-language customer-type options (English, Thai, Burmese).
- **Advanced filtering & export** – filter records by branch, customer type, or date and export the visible dataset to Excel (powered by SheetJS).
- **Data format management** – dedicated admin console for maintaining export templates with configurable metadata, status controls, and Excel export of individual or bulk configurations.
- **Responsive experience** – Tailwind CSS styling with Anime.js transitions optimised for mobile workflows.

## Running the demo

1. Open `index.html` in your browser (double-click the file or serve it via a simple web server).
2. Choose **Administrator** or pick a branch from the **Branch User** dropdown.
3. Explore the dashboard, records tab, or data format management area.

Data you add is stored in your browser’s LocalStorage so it will persist across refreshes on the same device.

## Tech stack

- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Leaflet](https://leafletjs.com/) for mapping
- [ECharts](https://echarts.apache.org/) for analytics visualisation
- [Anime.js](https://animejs.com/) for micro-interactions
- [SheetJS](https://sheetjs.com/) for Excel export
- LocalStorage for demo persistence

## Development notes

- Demo data seeds are automatically populated the first time the app loads.
- Customer type labels are translated for English, Thai, and Burmese. Change the language selector in the top bar to update the UI instantly.
- Images are stored as base64 strings in LocalStorage for preview purposes only. In production, replace this with a proper upload flow.
