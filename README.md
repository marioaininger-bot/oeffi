# oeffi

Abfahrtszeiten der Wiener Linien als schlanke Webseite, drei Verbindungen untereinander:

- 98A, Hoechlegasse, Richtung Aspernstraße U (RBL 8680)
- 26A, Lohwaggasse, Richtung Kagran U (RBL 1049)
- U2, Aspernstraße, Richtung Karlsplatz (RBL 4251)

- `index.html` – die Seite (GitHub Pages)
- `worker.js` – Cloudflare Worker, der die Wiener-Linien-Daten der drei Steige mit CORS-Freigabe weiterreicht

## Einrichtung

1. `worker.js` als Cloudflare Worker deployen.
2. Die Worker-Adresse in `index.html` bei `URL_API` eintragen (statt `WORKER_URL_HIER`).
3. GitHub Pages für dieses Repo aktivieren (Branch `main`, Ordner `/`).
4. In `worker.js` bei `ALLOWED_ORIGINS` die eigene Pages-Domain eintragen.

## Verbindung ändern oder ergänzen

Die RBL-Nummern stehen an zwei Stellen und müssen übereinstimmen: in `worker.js` bei `RBLS` und in `index.html` bei `CONNS`. Danach den Worker neu deployen.
