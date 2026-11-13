# Hinweise für Claude

Abfahrtsmonitor der Wiener Linien für drei feste Steige: Statisches Frontend (`index.html`) auf GitHub Pages plus Cloudflare Worker `oeffi` (`worker.js`). Live unter `abfahrt.aininger.com`.

## README und Wiki aktuell halten (wichtig)

Die `README.md` ist die einzige Quelle für das interne Wiki (`marioaininger-bot/wiki`). Das Wiki zieht sie jede Nacht vom Branch `main`, schreibt sie aber nie selbst um. Veraltet die README, veraltet das Wiki.

**Passe die README im selben Commit an, wenn du Folgendes änderst:**

- **Verbindungen** (`RBLS` in `worker.js`, `CONNS` in `index.html`): die Liste in der README oben mitändern
- **`ALLOWED_ORIGINS`**, Worker-URL (`URL_API`) oder Domain
- **Datenquelle** (Wiener Linien OGD) oder Abfrageintervall und Cache
- **Ansichten** der Seite (`hell`, `tafel`, `modern`)
- **Deployment**: Es gibt **kein `wrangler.toml`**, der Worker wird von Hand in Cloudflare aktualisiert. Ändert sich das, den Abschnitt „Einrichtung / Deployment“ anpassen.

Bei **neuen Projekten, Workern oder Secrets** zusätzlich im Wiki-Repo ergänzen: `docs/architektur.md` und `docs/betrieb/accounts.md`.

## Regeln

- **`RBLS` (Worker) und `CONNS` (Seite) müssen immer übereinstimmen.** Beide im selben Commit ändern und darauf hinweisen, dass der Worker danach neu deployt werden muss (von Hand, siehe README).
- Der Worker reicht nur die fest eingetragenen Steige weiter und ist kein offener Weiterleiter. Das so lassen.
- **Nie Geheimnisse in Dateien schreiben.** Der Worker hat derzeit keine Secrets.
- Die README folgt dieser Gliederung: Zweck, auf einen Blick (Tabelle), Datenfluss, Ansichten, Verbindung ändern, Einrichtung/Deployment, Fallstricke. Das Diagramm in Mermaid.
- Sprache der Doku und der Oberfläche: Deutsch (Österreich).
