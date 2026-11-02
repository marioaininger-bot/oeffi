# oeffi

Abfahrtszeiten der Wiener Linien (Linie 98A, Haltestelle Hoechlegasse, Richtung Aspernstraße U) als schlanke Webseite.

- `index.html` – die Seite (GitHub Pages)
- `worker.js` – Cloudflare Worker, der die Wiener-Linien-Daten (RBL 8680) mit CORS-Freigabe weiterreicht

## Einrichtung

1. `worker.js` als Cloudflare Worker deployen.
2. Die Worker-Adresse in `index.html` bei `URL_API` eintragen (statt `WORKER_URL_HIER`).
3. GitHub Pages für dieses Repo aktivieren (Branch `main`, Ordner `/`).
4. In `worker.js` bei `ALLOWED_ORIGINS` die eigene Pages-Domain eintragen.
