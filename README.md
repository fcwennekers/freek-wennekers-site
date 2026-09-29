# Freek Wennekers Vastgoedfotografie

De website van Freek Wennekers, vastgoedfotograaf in Haarlem en omstreken.
Eén statische pagina: geen framework, geen build-stap. Live op https://freek-wennekers.vercel.app

## Inhoud

| Pad | Wat |
| --- | --- |
| `index.html` | De hele site: opening, intro, diensten, werk, over, contact (HTML, CSS en JS in één bestand) |
| `img/` | Alle foto's als WebP in 320, 640, 1200 en 1800 px breed |
| `fonts/` | Switzer 400 en 500 (Indian Type Foundry, via fontshare.com, vrij voor commercieel gebruik) |
| `404.html` | Pagina voor links die niet bestaan |
| `robots.txt`, `sitemap.xml` | Voor zoekmachines |
| `vercel.json` | Nette url's, caching van foto's en fonts, security-headers |
| `tools/build-img.mjs` | Zet nieuwe foto's om naar de juiste formaten (wordt niet online gezet) |

## Foto's toevoegen of vervangen

1. Zet de jpg's in een map, genoemd als `<straat>-<nummer>.jpg` (bijvoorbeeld `tjalk-45.jpg`).
2. `npm i --no-save sharp` en daarna `node tools/build-img.mjs <map>`.
3. Pas in `index.html` de lijst `P` (reeks per woning) en de werkkaarten aan.

## Online zetten

```bash
vercel deploy --prod
```

## Eigen domein

Bij een eigen domein de url `https://freek-wennekers.vercel.app` vervangen in `index.html`
(canonical, og:url, og:image, twitter:image en de structured data), `robots.txt` en `sitemap.xml`.
