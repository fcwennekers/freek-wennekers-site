# Werkafspraken voor deze site

- Eén statische pagina (`index.html`), live via Vercel vanaf `main`. Zie `README.md`.
- Dezelfde feiten staan op vier plekken: zichtbare tekst in `index.html`, de JSON-LD bovenin `index.html`,
  `index.md` en `llms.txt`. Pas bij elke inhoudelijke wijziging (diensten, werkgebied, levertijd, portfolio,
  veelgestelde vragen, contact) alle vier aan, en zet de datum in `sitemap.xml` en `dateModified` in de JSON-LD op vandaag.
- Antwoorden in de vragensectie en in de FAQPage-JSON-LD zijn letterlijk gelijk.
- Belangrijke tekst hoort in de HTML zelf, niet alleen in JavaScript: AI-crawlers voeren geen JavaScript uit.
- Nieuwe portfoliofoto's ook in `sitemap.xml` zetten.
