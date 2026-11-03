// Cloudflare Worker: reicht die Abfahrten der Wiener Linien für drei feste Steige weiter:
// Hoechlegasse (RBL 8680, 98A), Lohwaggasse (RBL 1049, 26A Richtung Kagran U) und Aspernstraße (RBL 4251, U2 Richtung Karlsplatz).
// Die Antwort enthält alle drei Monitore und geht an die Seite auf GitHub Pages. Der Worker setzt dabei die Freigabe (CORS), die die Wiener Linien selbst nicht senden.
// Die Steige sind fest eingetragen, der Worker lässt sich also nicht als offener Weiterleiter für andere Abfragen nutzen.

const RBLS = [8680, 1049, 4251];
const UPSTREAM = 'https://www.wienerlinien.at/ogd_realtime/monitor?' + RBLS.map((r) => 'rbl=' + r).join('&');
const ALLOWED_ORIGINS = ['https://marioaininger-bot.github.io', 'https://abfahrt.aininger.com'];

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const cors = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET') return new Response('Nur GET erlaubt', { status: 405, headers: cors });

    try {
      const r = await fetch(UPSTREAM, {
        headers: { Accept: 'application/json' },
        cf: { cacheTtl: 15, cacheEverything: true },
      });
      return new Response(r.body, {
        status: r.status,
        headers: {
          ...cors,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=15',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Wiener Linien nicht erreichbar' }), {
        status: 502,
        headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' },
      });
    }
  },
};
