# Werkafspraken voor deze site

- Statische site: homepage `index.html` plus dienstpagina's, pagina's voor makelaars, plaatspagina's (Amsterdam, Amstelveen) en `/boeken`, live via Vercel vanaf `main`. Zie `README.md`.
- De dienstpagina's (`vastgoedvideo.html`, `dronefotografie.html`, `360-graden-tour.html`, `nen-2580-meetrapport.html`),
  en alle pagina's uit `PAGES2` (onder meer `voor-makelaars`, `hoger-op-funda`, `plattegrond-laten-maken`,
  `nieuwbouw`, `woningfotografie-amsterdam`, `vastgoedfotograaf-amstelveen`, `boeken`) worden gemaakt door `node tools/build-pages.mjs`;
  pas de tekst daar aan, niet in de .html-bestanden.
- Geen prijzen op de site (ook niet in JSON-LD). Freek maakt geen WWS-puntentellingen; noem die niet als dienst. Pakketten: Foto + Meting, Alles in één, Verhuur.
- Het boekformulier (`/boeken`, noindex) verstuurt via het mailprogramma en zoekt de woonoppervlakte op in de BAG (PDOK).
  Makelaarskantoren vult het aan uit `tools/makelaars.txt` (wordt `data/makelaars.json`, script in `tools/boeken-ac.js`).
  Namen van personen staan niet op de site; die onthoudt alleen het apparaat van de bezoeker.
- Geen zichtbare 'Meer over'-links of linkregels: de homepage verwijst alleen via de titels van de diensten (zelfde uiterlijk als gewone tekst).
- Grote wijzigingen eerst op een previewbranch; pas naar `main` (productie) met akkoord van Freek.
- Dezelfde feiten staan op vier plekken: zichtbare tekst in `index.html`, de JSON-LD bovenin `index.html`,
  `index.md` en `llms.txt` (en voor diensten ook `tools/build-pages.mjs`). Pas bij elke inhoudelijke wijziging (diensten, werkgebied, levertijd, portfolio,
  contact) alle vier aan, en zet de datum in `sitemap.xml` en `dateModified` in de JSON-LD op vandaag.
- Belangrijke tekst hoort in de HTML zelf, niet alleen in JavaScript: AI-crawlers voeren geen JavaScript uit.
- Nieuwe pagina's en portfoliofoto's ook in `sitemap.xml` zetten.
- Geen verzonnen gegevens: geen adres, openingstijden, reviews of klantnamen zonder bevestiging van Freek.
