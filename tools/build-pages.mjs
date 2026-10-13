// Bouwt de dienstpagina's (vastgoedvideo.html, dronefotografie.html, 360-graden-tour.html,
// nen-2580-meetrapport.html) uit één sjabloon, zodat opmaak, structured data en links overal gelijk blijven.
// Gebruik: node tools/build-pages.mjs   (daarna de .html-bestanden committen; Vercel zet ze online)
// Tekst aanpassen: hieronder in PAGES. Een voorbeeld toevoegen (video, tour, plattegrond): vul `example` in.
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://freekwennekers.com';
const NAME = 'Freek Wennekers Vastgoedfotografie';
const TEL = '+31628186551', TEL_TXT = '+31 6 28 18 65 51', MAIL = 'freekwennekers@gmail.com';
const KVK = '88955672', LINKEDIN = 'https://www.linkedin.com/in/freekwennekers';
const MODIFIED = '2026-10-13';
const AREAS = [['City', 'Haarlem'], ['City', 'Heemstede'], ['City', 'Bloemendaal'], ['City', 'Zandvoort'],
  ['AdministrativeArea', 'Velsen'], ['AdministrativeArea', 'Haarlemmermeer'], ['City', 'Amsterdam'],
  ['City', 'Amstelveen'], ['City', 'Abcoude']];

// alle diensten, voor de lijst "Andere diensten" (Fotografie verwijst naar de homepage)
const SERVICES = [
  { href: '/', name: 'Vastgoedfotografie', text: 'Interieur, exterieur en details, klaar voor Funda.' },
  { href: '/vastgoedvideo', name: 'Vastgoedvideo', text: 'Een rustige rondgang door de woning, liggend en staand.' },
  { href: '/dronefotografie', name: 'Dronefotografie', text: 'Foto’s en video vanuit de lucht: tuin, ligging en omgeving.' },
  { href: '/360-graden-tour', name: '360°-tour', text: 'Kopers lopen zelf door de woning.' },
  { href: '/nen-2580-meetrapport', name: 'NEN 2580 inmeten', text: 'Meetrapport met 2D- en 3D-plattegronden.' },
];

const FLOW = [
  'Stuur het adres van de woning en wat je nodig hebt. Je krijgt een vrijblijvende offerte op maat.',
  'In één afspraak maak ik alles wat je kiest: foto’s, video, dronebeelden, 360°-tour en meetrapport.',
  'Ik bewerk al het materiaal zelf, zodat alles dezelfde stijl heeft.',
  'Binnen 3 werkdagen staat alles klaar.',
];

const PAGES = [
  {
    slug: 'vastgoedvideo', crumb: 'Vastgoedvideo', service: 'Vastgoedvideo', serviceType: 'Vastgoedvideo en woningvideo',
    title: 'Vastgoedvideo en woningvideo’s in Haarlem · Freek Wennekers',
    description: 'Woningvideo’s voor makelaars in Haarlem, Amsterdam en omstreken: een rustige rondgang, liggend en staand. In dezelfde afspraak als de foto’s.',
    h1: 'Vastgoedvideo voor makelaars in Haarlem en omstreken.',
    lead: 'Een rustige rondgang door de woning, liggend voor je website en de woningpresentatie, staand voor social media. Ik film in dezelfde afspraak als de foto’s, dus de woning hoeft maar één keer klaar te staan.',
    hero: ['egelantiersstraat-05', 'Woonkamer met trap en vide in een grachtenpand aan de Egelantiersstraat in Amsterdam'],
    get: ['Een liggende video voor je website en de online woningpresentatie.',
      'Een staande versie voor Instagram, Facebook en andere social media.',
      'Als je wilt dronebeelden van de woning, de tuin en de omgeving.',
      'Alles binnen 3 werkdagen, samen met de foto’s.'],
    qa: [['Waarom een video naast foto’s?', 'Een video laat zien hoe de ruimtes in elkaar overlopen en hoe het licht door de woning valt. Op losse foto’s is dat lastiger te zien.'],
      ['Kan de video in dezelfde afspraak als de foto’s?', 'Ja. Foto’s, video, dronebeelden, een 360°-tour en het meetrapport maak ik in één afspraak. De woning hoeft dus maar één keer opgeruimd en klaargezet te worden.'],
      ['Waarom ook een staande versie?', 'Op een telefoon vult staand beeld het hele scherm. Daarom krijg je naast de liggende video ook een staande versie.']],
    thumbs: [['egelantiersstraat-03', 'Egelantiersstraat, Amsterdam', 'Woonkamer met vide in een grachtenpand aan de Egelantiersstraat'],
      ['larikslaan-02', 'Larikslaan 33, Amsterdam', 'Slaapkamer met uitzicht op het water aan de Larikslaan'],
      ['valeriusterras-10', 'Valeriusterras, Amsterdam', 'Woonkamer in een nieuwbouwappartement aan het Valeriusterras']],
    example: null, // bijvoorbeeld { kind: 'video', src: 'https://player.vimeo.com/video/…', title: '…' }
  },
  {
    slug: 'dronefotografie', crumb: 'Dronefotografie', service: 'Dronefotografie en dronevideo', serviceType: 'Dronefotografie en dronevideo van woningen',
    title: 'Dronefotografie voor woningen in Haarlem · Freek Wennekers',
    description: 'Dronefoto’s en dronevideo van woningen in Haarlem, Amsterdam en omstreken: de tuin, de ligging en de omgeving vanuit de lucht. In één afspraak met de foto’s.',
    h1: 'Dronefotografie en dronevideo voor woningen in Haarlem en omstreken.',
    lead: 'Vanuit de lucht laat je zien wat je vanaf de straat niet ziet: de tuin, de ligging en het groen of water eromheen. Ik maak de dronebeelden in dezelfde afspraak als de foto’s.',
    hero: ['tjalk-01', 'Vrijstaande villa aan de Tjalk in Amstelveen, van bovenaf gefotografeerd'],
    get: ['Dronefoto’s van de woning, de tuin en de omgeving.',
      'Dronebeelden in de woningvideo, liggend en staand.',
      'Alles binnen 3 werkdagen, samen met de andere foto’s.'],
    qa: [['Wanneer hebben dronebeelden meerwaarde?', 'Bij vrijstaande woningen en villa’s, bij woningen aan het water of met een grote tuin, en overal waar de ligging een verkoopargument is.'],
      ['Mag je overal met een drone vliegen?', 'Nee. Delen van Haarlem en Amsterdam liggen in het luchtruim rond Schiphol, waar je alleen met toestemming mag vliegen. Per adres bekijk ik vooraf wat er mogelijk is.'],
      ['Kan het samen met foto’s en video?', 'Ja. Dronebeelden maak ik in dezelfde afspraak als de foto’s en de <a class="ul" href="/vastgoedvideo">woningvideo</a>, en ze kunnen ook in die video.']],
    thumbs: [['tjalk-47', 'Tjalk, Amstelveen', 'Tuin van een villa aan de Tjalk, van bovenaf gefotografeerd'],
      ['larikslaan-03', 'Larikslaan 33, Amsterdam', 'Achtergevel en tuin van een moderne villa aan de Larikslaan'],
      ['deschulp-03', 'De Schulp 9, Amstelveen', 'Moderne villa aan De Schulp, vanaf de straat']],
    example: null,
  },
  {
    slug: '360-graden-tour', crumb: '360°-tour', service: '360°-tour', serviceType: '360°-fotografie en virtuele tour van woningen',
    title: '360°-tour voor woningen in Haarlem · Freek Wennekers',
    description: 'Een 360°-tour van de woning voor makelaars in Haarlem, Amsterdam en omstreken: kopers lopen zelf door de woning. In één afspraak met de foto’s.',
    h1: '360°-tour en virtuele rondleiding voor woningen in Haarlem en omstreken.',
    lead: 'Met een 360°-tour lopen kopers zelf door de woning, wanneer het hun uitkomt. Ik maak de tour in dezelfde afspraak als de foto’s en lever hem binnen 3 werkdagen op.',
    hero: ['peppinghof-01', 'Woonkeuken met daklichten aan de Peppinghof in Abcoude'],
    get: ['360°-foto’s van de ruimtes, gekoppeld tot een virtuele tour.',
      'Een tour die je online bij de woning plaatst.',
      'Binnen 3 werkdagen klaar, samen met de foto’s.'],
    qa: [['Wat is het verschil tussen een 360°-foto en een virtuele tour?', 'Een 360°-foto toont één ruimte in alle richtingen. In een virtuele tour zijn die foto’s aan elkaar gekoppeld, zodat je van ruimte naar ruimte loopt.'],
      ['Voor welke woningen is een tour handig?', 'Voor kopers die van verder weg komen of eerst online rondkijken, en voor woningen waarin de indeling het verhaal vertelt.'],
      ['Kan het samen met een plattegrond?', 'Ja. Het <a class="ul" href="/nen-2580-meetrapport">NEN 2580-meetrapport</a> met 2D- en 3D-plattegronden maak ik in dezelfde afspraak.']],
    thumbs: [['egelantiersstraat-13', 'Egelantiersstraat, Amsterdam', 'Open keuken en eethoek in een grachtenpand aan de Egelantiersstraat'],
      ['valeriusterras-01', 'Valeriusterras, Amsterdam', 'Woonkamer met trap in een nieuwbouwappartement aan het Valeriusterras'],
      ['peppinghof-03', 'Peppinghof 24, Abcoude', 'Woonkamer met tuindeuren aan de Peppinghof']],
    example: null,
  },
  {
    slug: 'nen-2580-meetrapport', crumb: 'NEN 2580 inmeten', service: 'NEN 2580 inmeten', serviceType: 'NEN 2580-meetrapport en plattegronden',
    title: 'NEN 2580 inmeten in Haarlem · Meetrapport | Freek Wennekers',
    description: 'Woning laten inmeten volgens NEN 2580 in Haarlem, Amsterdam en omstreken: meetrapport met 2D- en 3D-plattegronden, in één afspraak met de foto’s.',
    h1: 'NEN 2580 inmeten: meetrapport en plattegronden in Haarlem en omstreken.',
    lead: 'Ik meet de woning in volgens NEN 2580 en lever een meetrapport met 2D- en 3D-plattegronden. Dat gebeurt in dezelfde afspraak als de foto’s, en binnen 3 werkdagen heb je alles.',
    hero: ['valeriusterras-07', 'Open woonkeuken in een nieuwbouwappartement aan het Valeriusterras in Amsterdam'],
    get: ['Een meetrapport met de gebruiksoppervlakte van de woning.',
      '2D-plattegronden van de woning.',
      '3D-plattegronden die de indeling in één oogopslag laten zien.',
      'Alles binnen 3 werkdagen, samen met de foto’s.'],
    qa: [['Wat is NEN 2580?', 'NEN 2580 is de Nederlandse norm voor het meten van oppervlakten en inhouden van gebouwen. Hij legt vast wat wel en niet meetelt als gebruiksoppervlakte.'],
      ['Wat is het verschil met de meetinstructie van makelaars?', 'Makelaars werken vaak met een branchebrede meetinstructie. Die is gebaseerd op NEN 2580, maar wijkt op enkele punten af.'],
      ['Waarom een woning laten inmeten?', 'Met een meetrapport vermeld je de gebruiksoppervlakte eenduidig, bijvoorbeeld op Funda. Zo weten kopers precies hoeveel vierkante meter ze krijgen.']],
    thumbs: [['egelantiersstraat-16', 'Egelantiersstraat, Amsterdam', 'Keuken met kookeiland in een grachtenpand aan de Egelantiersstraat'],
      ['larikslaan-04', 'Larikslaan 33, Amsterdam', 'Keuken met kookeiland in een moderne villa aan de Larikslaan'],
      ['deschulp-01', 'De Schulp 9, Amstelveen', 'Keuken met raam over de volle breedte aan De Schulp']],
    example: null, // bijvoorbeeld { kind: 'image', file: 'img/voorbeeld-plattegrond-1200.webp', alt: '…' }
  },
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');
const srcset = f => `img/${f}-640.webp 640w, img/${f}-1200.webp 1200w, img/${f}-1800.webp 1800w`;

const CSS = `
@font-face{font-family:"Switzer";src:url(fonts/switzer-400.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Switzer";src:url(fonts/switzer-500.woff2) format("woff2");font-weight:500;font-display:swap}
:root{--bg:#F7F6F2;--bg-2:#ECE9E3;--ink:#131312;--ink-2:#55514B;--ink-3:#736E67;--line:#DEDAD2;--sans:"Switzer","Helvetica Neue",Helvetica,Arial,sans-serif;--max:1280px;--pad:clamp(18px,3vw,40px);--gap:clamp(14px,1.8vw,26px);--out:cubic-bezier(.16,1,.3,1);--soft:cubic-bezier(.4,0,.2,1);color-scheme:light}
*,*::before,*::after{box-sizing:border-box}
html{background:var(--bg);-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:72px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.55 var(--sans);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
@media (min-width:1024px){body{font-size:17px}}
img{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
h1,h2,h3,p,ol,ul,figure{margin:0}
ol,ul{padding:0;list-style:none}
::selection{background:var(--ink);color:var(--bg)}
:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.nw{white-space:nowrap}
.wrap{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:var(--pad)}
.skip{position:absolute;left:var(--pad);top:-64px;z-index:200;background:var(--ink);color:var(--bg);padding:12px 16px;font-size:14px}
.skip:focus{top:12px}
.sig{display:block;height:30px;aspect-ratio:1004/186;background:currentColor;-webkit-mask:url(logo.png) left center/contain no-repeat;mask:url(logo.png) left center/contain no-repeat}
.ul{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;padding-bottom:2px;transition:background-size .55s var(--out)}
.ul:hover{background-size:0 1px;background-position:100% 100%}
.btn{display:inline-flex;align-items:center;height:46px;padding:0 20px;background:var(--ink);color:var(--bg);font-size:15px;font-weight:500;white-space:nowrap;transition:background .3s var(--soft)}
.btn:hover{background:#35332f}
nav a{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;padding-bottom:2px;transition:background-size .5s var(--out)}
nav a:hover{background-size:100% 1px}
.bar{position:sticky;top:0;z-index:60;background:rgba(247,246,242,.92);background:color-mix(in srgb,var(--bg) 88%,transparent);-webkit-backdrop-filter:saturate(1.3) blur(14px);backdrop-filter:saturate(1.3) blur(14px);box-shadow:0 1px 0 var(--line)}
.bar .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;height:56px}
.bar .sig{height:24px}
.bar nav{display:flex;gap:24px;font-size:14px}
@media (max-width:560px){.bar nav{gap:18px}nav .opt{display:none}.bar .sig{height:22px}}
.hero{padding-top:clamp(40px,6vw,88px);padding-bottom:clamp(40px,5vw,64px)}
.crumbs ol{display:flex;flex-wrap:wrap;gap:8px;font-size:14px;color:var(--ink-3)}
.crumbs li+li::before{content:"/";margin-right:8px;color:var(--line)}
.crumbs a{color:var(--ink)}
.display{font-size:clamp(32px,4.2vw,62px);font-weight:500;line-height:1.02;letter-spacing:-.04em;text-wrap:balance}
.hero h1{max-width:17em;margin-top:clamp(28px,4vw,56px)}
.lead{max-width:46ch;margin-top:clamp(18px,2vw,26px);color:var(--ink-2);font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty}
.cta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;margin-top:clamp(24px,3vw,36px);font-size:15px;font-weight:500}
.hero-img{margin-top:clamp(40px,5vw,72px)}
.hero-img img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:6px;background:var(--bg-2)}
@media (min-width:900px){.hero-img img{aspect-ratio:21/9}}
.sec{padding-top:clamp(56px,7vw,104px)}
.split{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:18px;align-items:start;padding-top:16px;border-top:1px solid var(--ink)}
.split>.label{grid-column:1/span 3;font-size:14px;font-weight:500;line-height:1.2}
.split>:not(.label){grid-column:4/-1}
@media (max-width:860px){.split>.label,.split>:not(.label){grid-column:1/-1}.split{row-gap:28px}}
.list{display:grid;gap:12px;max-width:60ch}
.list li{position:relative;padding-left:22px;font-size:clamp(17px,1.35vw,20px);line-height:1.45;letter-spacing:-.01em}
.list li::before{content:"";position:absolute;left:0;top:.62em;width:8px;height:1px;background:var(--ink)}
.flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--gap)}
.flow li{display:grid;gap:10px;align-content:start;padding-top:14px;border-top:1px solid var(--line)}
.flow b{font-size:13px;font-weight:500;color:var(--ink-3);font-variant-numeric:tabular-nums}
.flow p{font-size:15px;line-height:1.5;color:var(--ink-2);text-wrap:pretty}
@media (max-width:1000px){.flow{grid-template-columns:1fr 1fr;row-gap:28px}}
@media (max-width:520px){.flow{grid-template-columns:1fr}}
.qa{display:grid;gap:28px;max-width:62ch}
.qa h3{font-size:clamp(18px,1.4vw,21px);font-weight:500;letter-spacing:-.015em;line-height:1.3}
.qa p{margin-top:8px;color:var(--ink-2);text-wrap:pretty}
.example video,.example iframe,.example img{width:100%;aspect-ratio:16/9;border:0;border-radius:6px;background:var(--bg-2)}
.thumbs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap)}
.thumbs a{display:grid;gap:10px}
.thumbs img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;background:var(--bg-2);transition:transform 1.8s var(--out)}
.thumbs a:hover img{transform:scale(1.02)}
.thumbs span{font-size:14px;color:var(--ink-3)}
.thumbs-more{margin-top:20px;font-size:15px;font-weight:500}
@media (max-width:640px){.thumbs{grid-template-columns:1fr 1fr}.thumbs a:nth-child(3){display:none}}
.svcs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px var(--gap)}
.svcs a{font-size:clamp(17px,1.35vw,20px);font-weight:500;letter-spacing:-.015em}
.svcs p{margin-top:4px;font-size:15px;color:var(--ink-3)}
@media (max-width:560px){.svcs{grid-template-columns:1fr}}
.cbox{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:36px clamp(32px,5vw,72px);padding:clamp(28px,4vw,56px);border-radius:16px;background:#fff}
.c-intro{flex:1 1 300px;max-width:30rem;display:grid;gap:14px}
.c-intro .display{font-size:clamp(28px,3vw,44px);letter-spacing:-.035em;line-height:1.06}
.note{color:var(--ink-2);max-width:40ch;text-wrap:pretty}
.c-ways{flex:0 1 auto;min-width:0;display:grid;gap:28px}
.way{display:grid;gap:4px}
.way .k{font-size:13px;color:var(--ink-3)}
.way a{justify-self:start;font-size:clamp(19px,1.7vw,24px);font-weight:500;letter-spacing:-.02em;overflow-wrap:anywhere}
.foot{margin-top:clamp(88px,10vw,150px)}
.foot .wrap>div{display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;padding:24px 0 calc(28px + env(safe-area-inset-bottom));border-top:1px solid var(--ink);font-size:13px;color:var(--ink-3)}
.foot .sig{height:24px;margin-right:auto;color:var(--ink)}
.foot a{color:var(--ink);font-weight:500}
`.trim().replace(/\n/g, '\n');

function page(p) {
  const url = `${SITE}/${p.slug}`, B = `${SITE}/#bedrijf`;
  const heroUrl = `${SITE}/img/${p.hero[0]}-1800.webp`, ogUrl = `${SITE}/og/${p.slug}.jpg`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: p.title, description: p.description, inLanguage: 'nl-NL',
      isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#dienst` }, breadcrumb: { '@id': `${url}#kruimelpad` },
      primaryImageOfPage: heroUrl, dateModified: MODIFIED },
    { '@type': 'BreadcrumbList', '@id': `${url}#kruimelpad`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: p.crumb, item: url }] },
    { '@type': 'Service', '@id': `${url}#dienst`, name: p.service, serviceType: p.serviceType, description: p.description, url,
      image: heroUrl, provider: { '@id': B }, areaServed: AREAS.map(([t, n]) => ({ '@type': t, name: n })) },
    { '@type': 'LocalBusiness', '@id': B, name: NAME, url: `${SITE}/`, telephone: TEL, email: MAIL,
      address: { '@type': 'PostalAddress', addressLocality: 'Haarlem', addressRegion: 'Noord-Holland', addressCountry: 'NL' } },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: NAME, inLanguage: 'nl-NL' },
  ] };
  const ldJson = JSON.stringify(ld).replace(/</g, '\\u003c');
  const example = !p.example ? '' : `
    <section class="sec wrap" aria-labelledby="h-voorbeeld">
      <div class="split">
      <h2 class="label" id="h-voorbeeld">Voorbeeld</h2>
      <div class="example">${p.example.kind === 'video'
        ? `<iframe src="${esc(p.example.src)}" title="${esc(p.example.title)}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>`
        : `<img src="${esc(p.example.file)}" alt="${esc(p.example.alt)}" loading="lazy" decoding="async">`}</div>
      </div>
    </section>
`;
  const others = SERVICES.filter(s => s.href !== `/${p.slug}`);
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#F7F6F2">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="nl_NL">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${ogUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${ogUrl}">
<link rel="preload" href="fonts/switzer-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/switzer-400.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">${ldJson}</script>
<style>
/* dienstpagina: zelfde letters, kleuren en raster als de homepage; gemaakt door tools/build-pages.mjs */
${CSS}
</style>
</head>
<body>
<a class="skip" href="#inhoud">Naar de inhoud</a>

<header class="bar" id="top">
  <div class="wrap">
    <a href="/" aria-label="${NAME}, naar de homepage"><i class="sig" aria-hidden="true"></i></a>
    <nav aria-label="Hoofdmenu"><a href="/#diensten">Diensten</a><a href="/#werk">Werk</a><a class="opt" href="/#over">Over</a><a href="#contact">Contact</a></nav>
  </div>
</header>

<main id="inhoud">
  <section class="hero wrap" aria-labelledby="h-pagina">
    <nav class="crumbs" aria-label="Kruimelpad"><ol><li><a class="ul" href="/">Home</a></li><li aria-current="page">${p.crumb}</li></ol></nav>
    <h1 class="display" id="h-pagina">${p.h1}</h1>
    <p class="lead">${p.lead}</p>
    <div class="cta"><a class="btn" href="#contact">Offerte aanvragen</a><a class="ul" href="tel:${TEL}">${TEL_TXT}</a></div>
    <figure class="hero-img"><img src="img/${p.hero[0]}-1200.webp" srcset="${srcset(p.hero[0])}" sizes="(min-width: 1280px) 1200px, 100vw" alt="${esc(p.hero[1])}" fetchpriority="high" decoding="async"></figure>
  </section>

  <section class="sec wrap" aria-labelledby="h-krijgt">
    <div class="split">
    <h2 class="label" id="h-krijgt">Wat je krijgt</h2>
    <ul class="list">
${p.get.map(t => `      <li>${t}</li>`).join('\n')}
    </ul>
    </div>
  </section>

  <section class="sec wrap" aria-labelledby="h-werkwijze">
    <div class="split">
    <h2 class="label" id="h-werkwijze">Zo werkt het</h2>
    <ol class="flow">
${FLOW.map((t, i) => `      <li><b>${String(i + 1).padStart(2, '0')}</b><p>${t}</p></li>`).join('\n')}
    </ol>
    </div>
  </section>

  <section class="sec wrap" aria-labelledby="h-weten">
    <div class="split">
    <h2 class="label" id="h-weten">Goed om te weten</h2>
    <div class="qa">
${p.qa.map(([q, a]) => `      <div><h3>${q}</h3><p>${a}</p></div>`).join('\n')}
    </div>
    </div>
  </section>
${example}
  <section class="sec wrap" aria-labelledby="h-portfolio">
    <div class="split">
    <h2 class="label" id="h-portfolio">Uit het portfolio</h2>
    <div>
      <div class="thumbs">
${p.thumbs.map(([f, cap, alt]) => `        <a href="/#werk"><img src="img/${f}-640.webp" srcset="img/${f}-640.webp 640w, img/${f}-1200.webp 1200w" sizes="(min-width: 1280px) 290px, (min-width: 861px) 23vw, (min-width: 641px) 31vw, 46vw" alt="${esc(alt)}" loading="lazy" decoding="async"><span>${cap}</span></a>`).join('\n')}
      </div>
      <p class="thumbs-more"><a class="ul" href="/#werk">Bekijk alle woningen in het portfolio</a></p>
    </div>
    </div>
  </section>

  <section class="sec wrap" aria-labelledby="h-diensten">
    <div class="split">
    <h2 class="label" id="h-diensten">Andere diensten</h2>
    <ul class="svcs">
${others.map(s => `      <li><a class="ul" href="${s.href}">${s.name}</a><p>${s.text}</p></li>`).join('\n')}
    </ul>
    </div>
  </section>

  <section class="sec wrap" id="contact" aria-labelledby="h-contact">
    <div class="split">
    <h2 class="label" id="h-contact">Contact</h2>
    <div class="cbox">
      <div class="c-intro"><p class="display">Offerte aanvragen?</p><p class="note">Stuur het adres van de woning en wat je nodig hebt, dan maak ik een vrijblijvende offerte op maat. Bellen of mailen kan ook als je nog aan het oriënteren bent.</p></div>
      <div class="c-ways">
        <div class="way"><span class="k">E-mail</span><a class="ul" href="mailto:${MAIL}">${MAIL}</a></div>
        <div class="way"><span class="k">Telefoon</span><a class="ul" href="tel:${TEL}">${TEL_TXT}</a></div>
      </div>
    </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap"><div>
    <i class="sig" aria-hidden="true"></i>
    <span>© 2026 ${NAME}</span>
    <span>Haarlem · KvK ${KVK}</span>
    <a class="ul" href="${LINKEDIN}" rel="me noopener" target="_blank">LinkedIn</a>
    <a class="ul" href="llms.txt">llms.txt</a>
    <a class="ul" href="#top">Naar boven</a>
  </div></div>
</footer>
</body>
</html>
`;
}

for (const p of PAGES) {
  for (const [k, max] of [['title', 65], ['description', 160]]) {
    if (strip(p[k]).length > max) throw new Error(`${p.slug}: ${k} is ${strip(p[k]).length} tekens (max ${max})`);
  }
  writeFileSync(join(ROOT, `${p.slug}.html`), page(p));
  console.log('ok', `${p.slug}.html`);
}
export { PAGES, SERVICES };
