# Werkafspraken voor deze site

- Statische site: homepage `index.html` plus vier dienstpagina's, live via Vercel vanaf `main`. Zie `README.md`.
- De dienstpagina's (`vastgoedvideo.html`, `dronefotografie.html`, `360-graden-tour.html`, `nen-2580-meetrapport.html`)
  worden gemaakt door `node tools/build-pages.mjs`; pas de tekst daar aan, niet in de .html-bestanden.
- Grote wijzigingen eerst op een previewbranch; pas naar `main` (productie) met akkoord van Freek.
- Dezelfde feiten staan op vier plekken: zichtbare tekst in `index.html`, de JSON-LD bovenin `index.html`,
  `index.md` en `llms.txt` (en voor diensten ook `tools/build-pages.mjs`). Pas bij elke inhoudelijke wijziging (diensten, werkgebied, levertijd, portfolio,
  contact) alle vier aan, en zet de datum in `sitemap.xml` en `dateModified` in de JSON-LD op vandaag.
- Belangrijke tekst hoort in de HTML zelf, niet alleen in JavaScript: AI-crawlers voeren geen JavaScript uit.
- Nieuwe pagina's en portfoliofoto's ook in `sitemap.xml` zetten.
- Geen verzonnen gegevens: geen adres, openingstijden, reviews of klantnamen zonder bevestiging van Freek.
