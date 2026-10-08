# Freek Wennekers Vastgoedfotografie

De website van Freek Wennekers, vastgoedfotograaf in Haarlem en omstreken.
Eén statische pagina: geen framework, geen build-stap. Live op https://freekwennekers.com

## Inhoud

| Pad | Wat |
| --- | --- |
| `index.html` | De hele site: opening, intro, diensten, werk, over, contact (HTML, CSS en JS in één bestand) |
| `llms.txt`, `index.md` | Samenvatting en volledige tekstversie van de site voor AI-assistenten |
| `img/` | Alle foto's als WebP in 320, 640, 1200 en 1800 px breed |
| `fonts/` | Switzer 400 en 500 (Indian Type Foundry, via fontshare.com, vrij voor commercieel gebruik) |
| `404.html` | Pagina voor links die niet bestaan |
| `robots.txt`, `sitemap.xml` | Voor zoekmachines en AI-crawlers (trainingsbots mogen de foto's niet ophalen) |
| `vercel.json` | Nette url's, caching van foto's en fonts, security-headers, tekstversie voor AI-agents |
| `tools/build-img.mjs` | Zet nieuwe foto's om naar de juiste formaten (wordt niet online gezet) |

## AI-vindbaarheid

Dezelfde feiten staan op vier plekken: de zichtbare tekst in `index.html`, de JSON-LD bovenin `index.html`,
`index.md` en `llms.txt`. Verander je iets aan diensten, werkgebied, levertijd, portfolio of contact,
pas het dan overal aan. Werk ook `sitemap.xml` bij (datum en foto's).

## Foto's toevoegen of vervangen

1. Zet de jpg's in een map, genoemd als `<straat>-<nummer>.jpg` (bijvoorbeeld `tjalk-45.jpg`).
2. `npm i --no-save sharp` en daarna `node tools/build-img.mjs <map>`.
3. Pas in `index.html` de lijst `P` (reeks per woning) en de werkkaarten aan.

## Foto bij Over

Bij Over staat nog een tijdelijke woningfoto (`schotersingel-21`). Vervang die door een foto van
Freek die door een woning loopt en fotografeert: zet hem om met `tools/build-img.mjs`, pas in
`index.html` bij `<figure class="pic">` de bestandsnamen aan en zet de alt-tekst op
"Freek Wennekers fotografeert een woning".

## Online zetten

Elke push naar `main` gaat automatisch live via Vercel (account van Freek). Er is geen testomgeving:
wat op `main` staat, staat op de site. Terugdraaien kan in Vercel onder Deployments (Instant Rollback).

## Domein

Hoofdadres `freekwennekers.com`; `www.freekwennekers.com` stuurt door naar het hoofdadres.
De DNS-instellingen en de rest van de uitleg staan in `docs/handleiding.pdf`.
Wordt het domein ooit anders, vervang dan `https://freekwennekers.com` in `index.html`
(canonical, og:url, og:image, twitter:image en de structured data), `robots.txt` en `sitemap.xml`.
