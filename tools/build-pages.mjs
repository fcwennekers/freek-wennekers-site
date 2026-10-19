// Bouwt de dienstpagina's (vastgoedvideo.html, dronefotografie.html, 360-graden-tour.html,
// nen-2580-meetrapport.html) uit één sjabloon, zodat opmaak, structured data en links overal gelijk blijven.
// Daarnaast de nieuwe pagina's (boeken.html, woningfotografie-amsterdam.html) uit PAGES2. Geen prijzen op de site.
// Gebruik: node tools/build-pages.mjs   (daarna de .html-bestanden committen; Vercel zet ze online)
// Tekst aanpassen: hieronder in PAGES of PAGES2. Een voorbeeld toevoegen (video, tour, plattegrond): vul `example` in.
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://freekwennekers.com';
const NAME = 'Freek Wennekers Vastgoedfotografie';
const TEL = '+31628186551', TEL_TXT = '+31 6 28 18 65 51', MAIL = 'freekwennekers@gmail.com';
const KVK = '88955672', LINKEDIN = 'https://www.linkedin.com/in/freekwennekers';
const MODIFIED = '2026-10-19';
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
  'Boek de opname via het formulier. Ik plan de afspraak direct met de verkoper.',
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
      ['Mag je overal met een drone vliegen?', 'Nee. Rond Schiphol gelden strenge regels voor drones, en die verschillen per plek, ook in Haarlem en Amsterdam. Per adres bekijk ik vooraf wat er mogelijk is.'],
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
      ['Waarom gebruiken expats een 360°-tour?', 'Kopers die nog in het buitenland wonen of niet snel kunnen langskomen, lopen met een tour toch door de woning, voordat ze een bezichtiging plannen.'],
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
      ['Waarom een woning laten inmeten?', 'Met een meetrapport vermeld je de gebruiksoppervlakte eenduidig, bijvoorbeeld op Funda. Zo weten kopers precies hoeveel vierkante meter ze krijgen.'],
      ['Waarom is de meetinstructie belangrijk voor makelaars?', 'NVM-makelaars vermelden de gebruiksoppervlakte volgens de meetinstructie. In 2018 oordeelde de Hoge Raad dat kopers daarop mogen vertrouwen; een makelaar die anders meet, kan aansprakelijk zijn voor de schade.']],
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
.bar nav{display:flex;align-items:center;gap:24px;font-size:14px}
.bar nav .nb{margin:-7px 0;padding:7px 13px;background:var(--ink);color:var(--bg);transition:background .3s var(--soft)}
.bar nav .nb:hover,.bar nav .nb[aria-current=page]{background:#35332f}
.c-intro .btn{justify-self:start;margin-top:8px}
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
    { '@type': 'FAQPage', '@id': `${url}#vragen`, url, inLanguage: 'nl-NL', mainEntity: p.qa.map(([q, a]) => ({
      '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) },
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
    <nav aria-label="Hoofdmenu"><a href="/#diensten">Diensten</a><a href="/#werk">Werk</a><a class="opt" href="/#over">Over</a><a class="opt" href="#contact">Contact</a><a class="nb" href="/boeken">Boeken</a></nav>
  </div>
</header>

<main id="inhoud">
  <section class="hero wrap" aria-labelledby="h-pagina">
    <nav class="crumbs" aria-label="Kruimelpad"><ol><li><a class="ul" href="/">Home</a></li><li aria-current="page">${p.crumb}</li></ol></nav>
    <h1 class="display" id="h-pagina">${p.h1}</h1>
    <p class="lead">${p.lead}</p>
    <div class="cta"><a class="btn" href="/boeken">Boek een opname</a><a class="ul" href="tel:${TEL}">${TEL_TXT}</a></div>
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
      <div class="c-intro"><p class="display">Opname boeken?</p><p class="note">Vul het formulier in, dan plan ik de afspraak direct met de verkoper. Bellen of mailen kan ook als je nog aan het oriënteren bent.</p><a class="btn" href="/boeken">Boek een opname</a></div>
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

// ===== Nieuwe pagina's (boeken, lokale pagina's): zelfde stijl, meer bouwstenen =====
// Teksten in PAGES2. Links schrijf je als [tekst](/pad): bestaat de pagina nog niet, dan blijft alleen de tekst staan.
// Op de site staan bewust geen prijzen.
const TEL_NL = '06 28 18 65 51';

const PACKAGES = [
  { id: 'meting', name: 'Foto + Meting', text: 'Foto’s en een NEN 2580-meetrapport met 2D- en 3D-plattegrond.', short: 'Foto’s en meetrapport met plattegrond' },
  { id: 'alles', name: 'Alles in één', text: 'Foto’s, meetrapport en plattegrond, plus video (liggend en staand) en een 360°-tour.', short: 'Ook video en een 360°-tour' },
  { id: 'verhuur', name: 'Verhuur', text: 'Foto’s en een plattegrond met NEN 2580-maten, voor de verhuur van de woning.', short: 'Foto’s en plattegrond met maten' },
];
const EXTRAS = [
  { name: 'Schemerfoto’s', text: 'Buitenfoto’s in de schemering, met de lichten aan.' },
  { name: 'Sleutelservice', text: 'Ik haal de sleutel op en breng hem terug.' },
];

// werkgebied-pagina's en diensten, voor de linklijsten onderaan
const PLACES = [['/vastgoedfotograaf-haarlem', 'Haarlem'], ['/vastgoedfotograaf-heemstede-bloemendaal', 'Heemstede en Bloemendaal'],
  ['/woningfotografie-amsterdam', 'Amsterdam'], ['/vastgoedfotograaf-amstelveen', 'Amstelveen'], ['/vastgoedfotograaf-haarlemmermeer', 'Haarlemmermeer']];
const SERVICES2 = [...SERVICES,
  { href: '/plattegrond-laten-maken', name: 'Plattegrond laten maken', text: '2D en 3D, als losse bestanden voor Funda.' },
  { href: '/nieuwbouw', name: 'Nieuwbouw', text: 'Modelwoningen en opleveringen, per fase.' },
  { href: '/voor-makelaars', name: 'Voor makelaars', text: 'Vaste fotograaf, vaste stijl, één factuur.' }];

const PAGES2 = [
  {
    slug: 'woningfotografie-amsterdam', crumb: 'Woningfotografie Amsterdam',
    title: 'Woningfotografie in Amsterdam voor makelaars · Freek Wennekers',
    description: 'Woningfotografie in Amsterdam: foto’s, video, 360°-tour en NEN 2580-meetrapport in één afspraak. Van Jordaanpand tot villa, binnen 3 werkdagen klaar.',
    h1: 'Woningfotografie in Amsterdam, van Jordaanpand tot villa aan het water.',
    lead: 'Vanuit Haarlem fotografeer ik woningen in heel Amsterdam. Foto’s, video, een 360°-tour en het NEN 2580-meetrapport maak ik in één afspraak, en binnen 3 werkdagen na de opname heb je alles.',
    facts: ['Ruim 2.400 woningen gefotografeerd', 'Eén vaste fotograaf en stijl', 'Echte foto’s, kloppende maten'],
    hero: ['egelantiersstraat-01', 'Woonkamer met stalen trap en hoge ramen in een pand aan de Egelantiersstraat in Amsterdam'],
    place: { type: 'City', name: 'Amsterdam' },
    service: 'Woningfotografie in Amsterdam', serviceType: 'Woningfotografie, vastgoedvideo, 360°-tour en NEN 2580-meetrapport',
    sections: [
      { kind: 'projects', id: 'woningen', label: 'Woningen in Amsterdam', items: [
        ['egelantiersstraat-33', 'Binnenplaats met loungebank en bakstenen muur bij een pand aan de Egelantiersstraat in Amsterdam', 'Egelantiersstraat', 'Jordaan, Amsterdam', 'Pand met vide, stalen trap en een binnenplaats.'],
        ['valeriusterras-18', 'Woonkamer met glazen pui naar het terras aan het Valeriusterras in Amsterdam', 'Valeriusterras', 'Amsterdam', 'Nieuwbouwappartement met open keuken en een groot terras.'],
        ['larikslaan-02', 'Slaapkamer met glazen wand en uitzicht op het water aan de Larikslaan in Amsterdam', 'Larikslaan 33', 'Amsterdam', 'Moderne villa aan het water, met veel glas en een open trap.']] },
      { kind: 'text', id: 'amsterdam', label: 'In Amsterdam', paras: [
        'In Amsterdam fotografeer ik smalle panden met steile trappen, bovenwoningen, nieuwbouwappartementen en villa’s aan de rand van de stad. Ik houd de lijnen recht en laat zien hoe het licht binnenvalt, zodat kopers bij de bezichtiging herkennen wat ze online zagen.',
        'Licht, kleur en lijnen bewerk ik. Aan de woning zelf verander ik niets: echte foto’s, kloppende maten.',
        'In dezelfde afspraak meet ik de woning in volgens NEN 2580. Je krijgt het [meetrapport](/nen-2580-meetrapport) met 2D- en 3D-plattegronden, zodat de vierkante meters in de advertentie kloppen, ook bij appartementen.'] },
      { kind: 'packs', id: 'pakketten', label: 'Pakketten' },
      { kind: 'list', id: 'krijgt', label: 'Wat je krijgt', items: [
        'Foto’s van interieur, exterieur en details, klaar voor Funda.',
        '[Video](/vastgoedvideo), liggend en staand.',
        'Een [360°-tour](/360-graden-tour), handig voor kopers van buiten de stad en expats.',
        'Een [NEN 2580-meetrapport](/nen-2580-meetrapport) met 2D- en 3D-plattegrond.',
        'Alles binnen 3 werkdagen na de opname, in één downloadlink.'] },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Kom je voor een opname naar Amsterdam?', 'Ja. Vanuit Haarlem werk ik in heel Amsterdam, en ook in Amstelveen en Abcoude.'],
        ['Hoe snel heb ik de foto’s en het meetrapport?', 'Binnen 3 werkdagen na de opname. Alles komt tegelijk, in één downloadlink.'],
        ['Plan je de afspraak zelf met de verkoper?', 'Ja. Geef het adres en het telefoonnummer van de verkoper door, dan plan ik de afspraak zelf.'],
        ['Kan er in Amsterdam een drone vliegen?', 'Op veel plekken in Amsterdam gelden strenge regels voor drones. Per adres bekijk ik vooraf wat er mogelijk is.']] },
      { kind: 'places', id: 'buurt', label: 'Ook in de buurt' },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
    ],
  },
  {
    slug: 'voor-makelaars', crumb: 'Voor makelaars',
    title: 'Fotograaf voor makelaars · Haarlem en Amsterdam | Freek Wennekers',
    description: 'Vastgoedfotograaf voor makelaars in Haarlem, Amsterdam en omstreken: foto’s, video, 360°-tour en NEN 2580-meetrapport in één afspraak, binnen 3 werkdagen.',
    h1: 'Voor makelaars: één afspraak, alles binnen 3 werkdagen.',
    lead: 'Foto’s, video liggend en staand, een 360°-tour en het NEN 2580-meetrapport met 2D- en 3D-plattegrond maak ik in één afspraak. Ik plan direct met de verkoper, en binnen 3 werkdagen na de opname staat alles klaar, ook het meetrapport.',
    facts: ['Ruim 2.400 woningen gefotografeerd', 'Eén vaste fotograaf en stijl', 'Echte foto’s, kloppende maten'],
    hero: ['larikslaan-01', 'Moderne villa aan de Larikslaan in Amsterdam bij schemering'],
    service: 'Vastgoedfotografie voor makelaars', serviceType: 'Woningfotografie, vastgoedvideo, 360°-tour en NEN 2580-meetrapport voor makelaars',
    sections: [
      { kind: 'flow', id: 'werkwijze', label: 'Zo werkt het', items: [
        'Je [boekt de opname](/boeken) online of belt. Adres en pakket zijn genoeg.',
        'Ik plan de afspraak direct met de verkoper. Jij hoeft niets te regelen.',
        'In één afspraak maak ik foto’s, video, de 360°-tour en het meetrapport.',
        'Binnen 3 werkdagen na de opname staat alles in één downloadlink.'] },
      { kind: 'list', id: 'krijgt', label: 'Wat je krijgt', intro: 'Bij Alles in één krijg je, in één downloadlink met vaste mapnamen:', items: [
        '25 tot 40 foto’s, klaar voor Funda.',
        'Video, liggend voor je website en staand voor social media.',
        'Een link naar de 360°-tour.',
        'Het NEN 2580-meetrapport als pdf.',
        '2D- en 3D-plattegronden als losse bestanden.'] },
      { kind: 'text', id: 'stijl', label: 'Vaste fotograaf, vaste stijl', paras: [
        'Elke woning fotografeer en bewerk ik zelf. Zo ziet al je aanbod er hetzelfde uit, van het appartement tot de villa, en weet je wat je krijgt.',
        'Heb je meerdere woningen per maand, dan plan ik graag een vaste fotodag met je kantoor. Je krijgt één factuur per maand.'] },
      { kind: 'text', id: 'echt', label: 'Echte foto’s, kloppende maten', paras: [
        'Licht, kleur en lijnen bewerk ik. Aan de woning zelf verander ik niets. Virtual staging doe ik alleen op verzoek, apart en duidelijk als bewerkt aangegeven.',
        'De woning meet ik in volgens NEN 2580, dus de vierkante meters in je advertentie kloppen. Waarom dat voor makelaars telt, lees je bij [NEN 2580 inmeten](/nen-2580-meetrapport).'] },
      { kind: 'packs', id: 'pakketten', label: 'Pakketten' },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Hoe snel lever je op?', 'Binnen 3 werkdagen na de opname, ook het meetrapport. Alles komt tegelijk, in één downloadlink met vaste mapnamen.'],
        ['Moet ik zelf bij de opname zijn?', 'Nee. Ik plan de afspraak direct met de verkoper. Met de sleutelservice haal ik de sleutel op en breng ik hem terug.'],
        ['In welke plaatsen werk je?', 'Vanuit Haarlem werk ik in Haarlem, Heemstede, Bloemendaal, Zandvoort, Velsen, Haarlemmermeer, Amsterdam, Amstelveen en Abcoude.'],
        ['Kan de plattegrond los op Funda?', 'Ja. Je krijgt de 2D- en 3D-plattegronden als losse bestanden, zodat ze niet tussen de foto’s staan. Bij [hoger op Funda](/hoger-op-funda) lees je waarom dat telt.']] },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
      { kind: 'places', id: 'werkgebied', label: 'Werkgebied' },
    ],
  },
  {
    slug: 'hoger-op-funda', crumb: 'Hoger op Funda',
    title: 'Hoger op Funda: complete woningpresentatie | Freek Wennekers',
    description: 'Hoe Funda sinds 16 september 2026 woningen sorteert, wat compleet betekent en hoe je met foto’s, video, 360°-tour en plattegrond alles uit je pakket haalt.',
    h1: 'Hoger op Funda: zo zet je een woning compleet online.',
    lead: 'Sinds 16 september 2026 kijkt Funda bij de volgorde in de resultaten naar het pakket en naar hoe compleet de woningpresentatie is. Met alles uit één afspraak haal je het meeste uit de eerste dagen.',
    hero: ['tjalk-05', 'Lichte woon- en eetkamer met hoge ramen naar de tuin in een villa aan de Tjalk in Amstelveen'],
    service: 'Complete woningpresentatie voor Funda', serviceType: 'Foto’s, video, 360°-tour en plattegrond voor Funda',
    sections: [
      { kind: 'flow', id: 'volgorde', label: 'De volgorde op Funda', items: [
        'Eerst woningen die in de afgelopen 48 uur met een pakket online zijn gekomen.',
        'Daarna beschikbare woningen, vóór woningen die onder bod staan.',
        'Binnen die groepen telt het pakket: Goud boven Zilver, Zilver boven Brons.',
        'Daarbinnen telt hoe compleet de woningpresentatie is.'],
        after: 'Bron: [Funda voor Makelaars](https://www.funda.nl/voormakelaars/artikel-makelaar/hoe-komt-mijn-object-zo-hoog-mogelijk-in-de-resultatenlijst/), juni en september 2026.' },
      { kind: 'list', id: 'compleet', label: 'Wat Funda compleet noemt', items: [
        'Minstens 10 foto’s.',
        'Vier 360°-foto’s of een 3D-tour.',
        'Een video.',
        'Een losse plattegrond, niet tussen de foto’s.',
        'Ingevulde kenmerken.'],
        after: 'Met het pakket Alles in één lever ik de foto’s, de video, de 360°-tour en de losse plattegrond, uit één afspraak. De kenmerken vul je zelf in.' },
      { kind: 'text', id: 'eerste', label: 'De eerste 48 uur', paras: [
        'In de eerste 48 uur met een pakket staat een woning bovenaan, en die kans krijg je maar één keer. Zet de woning daarom pas online als alles binnen is: foto’s, video, tour, plattegrond en kenmerken.',
        'Omdat ik alles binnen 3 werkdagen na de opname aanlever, ook het meetrapport, hoef je niet te kiezen tussen snel en compleet.'] },
      { kind: 'text', id: 'pakket', label: 'Welk Funda-pakket?', paras: [
        'Bij Brons draait het om foto’s en een plattegrond. Zilver en Goud voegen video, 360°-foto’s en een 3D-tour toe.',
        'Foto + Meting levert alles voor Brons. Alles in één levert ook de video en de 360°-tour, zodat je alles uit Zilver en Goud haalt.'] },
      { kind: 'packs', id: 'pakketten', label: 'Pakketten' },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Hoe bepaalt Funda de volgorde?', 'Eerst komen woningen die in de afgelopen 48 uur met een pakket online kwamen, en beschikbare woningen vóór woningen onder bod. Daarna tellen het pakket (Goud, Zilver, Brons) en hoe compleet de presentatie is.'],
        ['Wanneer zet ik een woning het best online?', 'Als alles binnen is. De eerste 48 uur bovenaan krijg je maar één keer.'],
        ['Wat is een losse plattegrond?', 'Een plattegrond die apart op Funda staat, niet als foto tussen de andere foto’s. Daarom lever ik de plattegronden als losse bestanden.'],
        ['Ben je verbonden aan Funda?', 'Nee. Ik ben een zelfstandige vastgoedfotograaf. De informatie op deze pagina komt van Funda voor Makelaars.']] },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
    ],
  },
  {
    slug: 'plattegrond-laten-maken', crumb: 'Plattegrond laten maken',
    title: 'Plattegrond laten maken in 2D en 3D · Freek Wennekers',
    description: 'Plattegrond van je woning laten maken in 2D en 3D, ingemeten volgens NEN 2580. Losse bestanden voor Funda, in één afspraak met de foto’s, binnen 3 werkdagen.',
    h1: 'Plattegrond laten maken: 2D en 3D, ingemeten volgens NEN 2580.',
    lead: 'Ik meet de woning in en maak er 2D- en 3D-plattegronden van. Je krijgt ze als losse bestanden, klaar voor Funda, binnen 3 werkdagen na de opname.',
    facts: ['Ruim 2.400 woningen gefotografeerd', 'Echte foto’s, kloppende maten'],
    hero: ['valeriusterras-01', 'Woonkamer met trap in een nieuwbouwappartement aan het Valeriusterras in Amsterdam'],
    service: 'Plattegrond laten maken', serviceType: '2D- en 3D-plattegronden met NEN 2580-meting',
    sections: [
      { kind: 'list', id: 'krijgt', label: 'Wat je krijgt', items: [
        '2D-plattegronden van de woning.',
        '3D-plattegronden die de indeling in één oogopslag laten zien.',
        'De plattegronden als losse bestanden, apart van de foto’s.',
        'Het NEN 2580-meetrapport met de gebruiksoppervlakte.',
        'Alles binnen 3 werkdagen na de opname, samen met de foto’s.'] },
      { kind: 'text', id: 'verschil', label: '2D of 3D?', paras: [
        'Een 2D-plattegrond is de tekening van bovenaf: muren, deuren, ramen en de indeling. Kopers zien meteen hoe de ruimtes zich tot elkaar verhouden.',
        'Een 3D-plattegrond laat dezelfde indeling zien in perspectief. Zo begrijpen ook kopers die geen tekeningen lezen hoe de woning in elkaar zit. Je krijgt ze allebei.'] },
      { kind: 'text', id: 'meting', label: 'Ingemeten, niet geschat', paras: [
        'Ik meet de woning ter plekke in volgens NEN 2580. De plattegrond en het meetrapport komen uit dezelfde meting, dus de vierkante meters op de tekening en in de advertentie zijn gelijk.',
        'Meer over de meting lees je bij [NEN 2580 inmeten](/nen-2580-meetrapport).'] },
      { kind: 'text', id: 'funda', label: 'Los op Funda', paras: [
        'Funda telt een plattegrond pas mee voor een complete presentatie als hij los staat, niet als foto tussen de andere foto’s. Daarom lever ik de plattegronden als aparte bestanden. Zie ook [hoger op Funda](/hoger-op-funda).'] },
      { kind: 'packs', id: 'pakketten', label: 'Pakketten' },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Bij welk pakket hoort een plattegrond?', 'Bij alle drie: Foto + Meting, Alles in één en Verhuur.'],
        ['Wanneer heb ik de plattegrond?', 'Binnen 3 werkdagen na de opname, samen met de foto’s en het meetrapport.'],
        ['Wat is het verschil tussen een plattegrond en een meetrapport?', 'De plattegrond laat de indeling zien. Het meetrapport legt de gebruiksoppervlakte vast volgens NEN 2580. Je krijgt ze uit één meting.'],
        ['Waarom de plattegrond los aanleveren?', 'Funda telt een losse plattegrond mee voor een complete presentatie. Tussen de foto’s telt hij niet als plattegrond.']] },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
      { kind: 'places', id: 'werkgebied', label: 'Werkgebied' },
    ],
  },
  {
    slug: 'nieuwbouw', crumb: 'Nieuwbouw',
    title: 'Nieuwbouwfotografie voor modelwoningen · Freek Wennekers',
    description: 'Foto’s, video en 360°-tours van nieuwbouw: modelwoningen voor de verkoop, de oplevering en elke bouwfase. Voor makelaars en ontwikkelaars, Haarlem en Amsterdam.',
    h1: 'Nieuwbouwfotografie: modelwoningen, opleveringen en elke fase.',
    lead: 'Voor nieuwbouw fotografeer ik de modelwoning voor de verkoop, leg ik de oplevering vast en kom ik per fase terug. Steeds in dezelfde stijl, zodat het hele project één verhaal vertelt.',
    facts: ['Ruim 2.400 woningen gefotografeerd', 'Eén vaste fotograaf en stijl'],
    hero: ['valeriusterras-18', 'Nieuwbouwappartement met glazen pui en terras aan het Valeriusterras in Amsterdam'],
    service: 'Nieuwbouwfotografie', serviceType: 'Fotografie, video en 360°-tours van nieuwbouwprojecten',
    sections: [
      { kind: 'list', id: 'maak', label: 'Wat ik maak', items: [
        'Foto’s, video en een 360°-tour van de modelwoning, voor de verkoop.',
        'Foto’s bij de oplevering, voor het opleveringsrapport.',
        'Vastlegging per bouwfase, in dezelfde stijl.',
        'Alles binnen 3 werkdagen na elke opname.'] },
      { kind: 'text', id: 'verkoop', label: 'Voor de verkoop', paras: [
        'Een modelwoning verkoopt de rest van het project. Met video en een 360°-tour lopen kopers er online doorheen, ook als ze niet naar de bouwplaats kunnen komen.',
        'Ik fotografeer en bewerk alles zelf. Zo blijven licht, kleur en kadrering gelijk, van de eerste modelwoning tot de laatste oplevering: in de brochure, op Funda en op de projectsite.'] },
      { kind: 'text', id: 'fase', label: 'Per fase', paras: [
        'Per fase leg ik vast hoe het project groeit, van de eerste opgeleverde woningen tot de afgewerkte omgeving. Zo heb je voor de verkoop en de communicatie met kopers steeds beelden die bij elkaar passen.'] },
      { kind: 'projects', id: 'portfolio', label: 'Nieuwbouw in het portfolio', items: [
        ['valeriusterras-07', 'Open woonkeuken in een nieuwbouwappartement aan het Valeriusterras in Amsterdam', 'Woonkeuken', 'Valeriusterras, Amsterdam', 'Open keuken met kookeiland en eettafel.'],
        ['valeriusterras-01', 'Woonkamer met houten trap in een nieuwbouwappartement aan het Valeriusterras in Amsterdam', 'Woonkamer', 'Valeriusterras, Amsterdam', 'Houten trap en visgraatvloer.'],
        ['valeriusterras-11', 'Slaapkamer met openslaande deuren naar het balkon aan het Valeriusterras in Amsterdam', 'Slaapkamer', 'Valeriusterras, Amsterdam', 'Openslaande deuren naar het balkon.']] },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Fotografeer je ook een modelwoning?', 'Ja. Foto’s, video en een 360°-tour van de modelwoning maak ik in één afspraak.'],
        ['Kun je per fase terugkomen?', 'Ja. Ik leg het project per fase vast, in dezelfde stijl.'],
        ['Kunnen kopers de modelwoning online bekijken?', 'Ja. Met een [360°-tour](/360-graden-tour) lopen kopers zelf door de modelwoning, wanneer het hun uitkomt.'],
        ['Hoe snel lever je op?', 'Binnen 3 werkdagen na elke opname.']] },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
      { kind: 'places', id: 'werkgebied', label: 'Werkgebied' },
    ],
  },
  {
    slug: 'vastgoedfotograaf-amstelveen', crumb: 'Vastgoedfotograaf Amstelveen',
    title: 'Vastgoedfotograaf Amstelveen · Woningfotografie | Freek Wennekers',
    description: 'Vastgoedfotograaf in Amstelveen: foto’s, video, 360°-tour en NEN 2580-meetrapport in één afspraak. Voor makelaars, binnen 3 werkdagen na de opname klaar.',
    h1: 'Vastgoedfotograaf in Amstelveen, met oog voor licht, tuin en ligging.',
    lead: 'Vanuit Haarlem fotografeer ik woningen in heel Amstelveen. Foto’s, video, een 360°-tour en het NEN 2580-meetrapport maak ik in één afspraak, en binnen 3 werkdagen na de opname heb je alles.',
    facts: ['Ruim 2.400 woningen gefotografeerd', 'Eén vaste fotograaf en stijl', 'Echte foto’s, kloppende maten'],
    hero: ['tjalk-45', 'Vrijstaande villa aan de Tjalk in Amstelveen bij schemering'],
    place: { type: 'City', name: 'Amstelveen' },
    service: 'Vastgoedfotografie in Amstelveen', serviceType: 'Woningfotografie, vastgoedvideo, 360°-tour en NEN 2580-meetrapport',
    sections: [
      { kind: 'projects', id: 'woningen', label: 'Woningen in Amstelveen', items: [
        ['tjalk-15', 'Achtergevel en tuin van een vrijstaande villa aan de Tjalk in Amstelveen', 'Tjalk', 'Amstelveen', 'Vrijstaande villa met grote tuin en tuindeuren.'],
        ['deschulp-02', 'Binnenzwembad in een moderne villa aan De Schulp in Amstelveen', 'De Schulp 9', 'Amstelveen', 'Moderne villa met binnenzwembad.'],
        ['tjalk-06', 'Keuken met kookeiland en tuindeuren in een villa aan de Tjalk in Amstelveen', 'Tjalk', 'Amstelveen', 'Keuken met kookeiland en zicht op de tuin.']] },
      { kind: 'text', id: 'amstelveen', label: 'In Amstelveen', paras: [
        'In Amstelveen staan veel woningen met een tuin of aan het groen. Ik laat zien hoe binnen en buiten in elkaar overlopen, en hoe het licht door de woning valt.',
        'Licht, kleur en lijnen bewerk ik. Aan de woning zelf verander ik niets: echte foto’s, kloppende maten.',
        'In dezelfde afspraak meet ik de woning in volgens NEN 2580. Je krijgt het [meetrapport](/nen-2580-meetrapport) met 2D- en 3D-plattegronden.'] },
      { kind: 'list', id: 'krijgt', label: 'Wat je krijgt', items: [
        'Foto’s van interieur, exterieur en details, klaar voor Funda.',
        '[Video](/vastgoedvideo), liggend en staand.',
        'Een [360°-tour](/360-graden-tour), handig voor kopers van verder weg en expats.',
        'Een [NEN 2580-meetrapport](/nen-2580-meetrapport) met 2D- en 3D-plattegrond.',
        'Alles binnen 3 werkdagen na de opname, in één downloadlink.'] },
      { kind: 'packs', id: 'pakketten', label: 'Pakketten' },
      { kind: 'faq', id: 'weten', label: 'Goed om te weten', qa: [
        ['Kom je voor een opname naar Amstelveen?', 'Ja. Vanuit Haarlem werk ik in heel Amstelveen, en ook in Amsterdam en Abcoude.'],
        ['Kan er in Amstelveen een drone vliegen?', 'Amstelveen ligt dicht bij Schiphol. Daar gelden strenge regels voor drones, dus per adres bekijk ik vooraf wat er mogelijk is.'],
        ['Hoe snel heb ik alles?', 'Binnen 3 werkdagen na de opname, ook het meetrapport.']] },
      { kind: 'places', id: 'buurt', label: 'Ook in de buurt' },
      { kind: 'services', id: 'diensten', label: 'Diensten' },
    ],
  },
  {
    slug: 'boeken', crumb: 'Boeken', noindex: true,
    title: 'Opname boeken · Freek Wennekers Vastgoedfotografie',
    description: 'Boek een opname: foto’s, video, 360°-tour en NEN 2580-meetrapport in één afspraak. Kies je pakket, ik plan de afspraak met de verkoper.',
    h1: 'Opname boeken.',
    lead: 'Vul de woning in en kies je pakket. Ik plan de afspraak direct met de verkoper, en binnen 3 werkdagen na de opname heb je alles, ook het meetrapport.',
    sections: [
      { kind: 'form', id: 'formulier', label: 'Boekingsformulier' },
      { kind: 'flow', id: 'verder', label: 'Zo gaat het verder', items: [
        'Je aanvraag komt direct bij mij binnen.',
        'Ik neem contact op met de verkoper en plan de afspraak.',
        'Op de afgesproken dag maak ik alles in één afspraak.',
        'Binnen 3 werkdagen na de opname staat alles in één downloadlink, ook het meetrapport.'] },
    ],
  },
];

const ROUTES = new Set(['/', ...PAGES.map(p => `/${p.slug}`), ...PAGES2.map(p => `/${p.slug}`)]);
const route = h => h.split(/[?#]/)[0] || '/';
const md = s => s.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, (_, t, h) => ROUTES.has(route(h)) ? `<a class="ul" href="${h}">${t}</a>` : t)
  .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, (_, t, h) => `<a class="ul" href="${h}" rel="noopener" target="_blank">${t}</a>`);
const plain = s => strip(md(s)).replace(/\s+/g, ' ').trim();

const CSS2 = `
.vh{position:absolute!important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.bar nav a[aria-current=page]{background-size:100% 1px}
@media (max-width:400px){.bar .wrap{gap:14px}.bar nav{gap:14px}.bar .sig{height:20px}}
.facts{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:clamp(20px,2.4vw,28px);font-size:14px;color:var(--ink-3)}
.facts li{display:flex;align-items:center;gap:9px}
.facts li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--ink)}
.sec.tight{padding-top:0}
.prose{display:grid;gap:18px;max-width:60ch}
.prose p{font-size:clamp(17px,1.35vw,20px);line-height:1.5;letter-spacing:-.01em;text-wrap:pretty}
.projs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap)}
.projs a{display:grid;gap:8px}
.projs .im{margin-bottom:6px;overflow:hidden;border-radius:6px;background:var(--bg-2)}
.projs img{width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform 1.8s var(--out)}
.projs a:hover img{transform:scale(1.02)}
.projs h3{font-size:18px;font-weight:500;letter-spacing:-.015em;line-height:1.25}
.projs .pl{margin-top:-6px;font-size:14px;color:var(--ink-3)}
.projs p:last-child{font-size:15px;color:var(--ink-2);text-wrap:pretty}
@media (max-width:640px){.projs{grid-template-columns:1fr;row-gap:30px}}
.packs{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:var(--gap)}
.packs li{display:flex;flex-direction:column;gap:12px;padding:clamp(22px,2.2vw,28px);border-radius:14px;background:#fff}
.packs h3{font-size:clamp(20px,1.7vw,24px);font-weight:500;letter-spacing:-.025em;line-height:1.15}
.packs p{font-size:15px;color:var(--ink-2);text-wrap:pretty}
.packs a{margin-top:auto;padding-top:8px;font-size:15px;font-weight:500;justify-self:start;align-self:flex-start}
.intro,.after{max-width:62ch;color:var(--ink-2);text-wrap:pretty}
.intro{margin-bottom:20px}
.after{margin-top:24px}
.places{display:flex;flex-wrap:wrap;gap:10px}
.places a,.places span{display:inline-block;padding:8px 15px;border:1px solid var(--line);border-radius:99px;font-size:15px;color:var(--ink-2)}
.places a{border-color:var(--ink);color:var(--ink);font-weight:500;transition:background .3s var(--soft),color .3s var(--soft)}
.places a:hover{background:var(--ink);color:var(--bg)}
.book{max-width:760px}
.book fieldset{min-width:0;margin:0 0 clamp(34px,3.6vw,50px);padding:0;border:0}
.book legend{float:left;width:100%;margin:0 0 22px;padding:16px 0 0;border-top:1px solid var(--ink);font-size:14px;font-weight:500}
.book legend+*{clear:both}
.fg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px var(--gap)}
.fg .full{grid-column:1/-1}
.f{display:grid;gap:7px;align-content:start}
.f label{font-size:14px;font-weight:500}
.f label i,.sub i{font-style:normal;font-weight:400;color:var(--ink-3)}
.h{font-size:13.5px;line-height:1.45;color:var(--ink-3);text-wrap:pretty}
.book input:not([type=radio]):not([type=checkbox]),.book textarea{width:100%;min-width:0;padding:12px 14px;border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--ink);font:inherit;font-size:16px;line-height:1.4;transition:border-color .2s var(--soft),box-shadow .2s var(--soft)}
.book input:focus,.book textarea:focus{outline:none;border-color:var(--ink);box-shadow:0 0 0 1px var(--ink)}
.book textarea{min-height:112px;resize:vertical}
.book input[type=date]{min-height:48px}
.unit{position:relative}
.unit span{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--ink-3);pointer-events:none}
.book .unit input{padding-right:46px}
.opts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.oc{position:relative;display:grid;gap:4px;align-content:start;padding:15px 16px 16px 44px;border:1px solid var(--line);border-radius:10px;background:#fff;cursor:pointer;transition:border-color .2s var(--soft),box-shadow .2s var(--soft)}
.oc input{position:absolute;left:16px;top:18px;width:18px;height:18px;margin:0;accent-color:var(--ink)}
.oc:has(input:checked){border-color:var(--ink);box-shadow:0 0 0 1px var(--ink)}
.oc b{font-size:17px;font-weight:500;letter-spacing:-.01em}
.oc span{font-size:13.5px;line-height:1.4;color:var(--ink-3)}
.sub{margin:28px 0 8px;font-size:14px;font-weight:500}
.chk{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:start;gap:4px 12px;padding:13px 0;border-top:1px solid var(--line);cursor:pointer}
.checks .chk:last-child{border-bottom:1px solid var(--line)}
.chk input{width:18px;height:18px;margin:2px 0 0;accent-color:var(--ink)}
.chk small{display:block;font-size:13.5px;color:var(--ink-3)}
.send{display:grid;gap:14px;justify-items:start}
.send .btn{border:0;font:inherit;font-size:15px;font-weight:500;cursor:pointer}
.send .ok{font-size:14px;font-weight:500}
.send .ok:empty{display:none}
.ac{position:relative}
.ac ul{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:30;max-height:300px;margin:0;padding:6px;overflow:auto;list-style:none;border:1px solid var(--line);border-radius:10px;background:#fff;box-shadow:0 14px 34px rgba(19,19,18,.12)}
.ac li{display:flex;justify-content:space-between;align-items:baseline;gap:14px;padding:10px 12px;border-radius:6px;font-size:15px;cursor:pointer}
.ac li small{flex:none;font-size:13px;color:var(--ink-3)}
.ac li[aria-selected=true],.ac li:hover{background:var(--bg)}
.lnk{padding:0;border:0;background:none;color:var(--ink);font:inherit;text-decoration:underline;text-underline-offset:2px;cursor:pointer}
@media (max-width:640px){.fg,.opts{grid-template-columns:1fr}.send .btn{width:100%;justify-content:center}}
`.trim();

// boekingsformulier: pakket uit de link overnemen en (voorlopig) versturen via het mailprogramma
const AC_JS = readFileSync(join(ROOT, 'tools/boeken-ac.js'), 'utf8').replace(/^\/\/.*\n/gm, '').trim();
const FORM_JS = `(function(){var f=document.getElementById('boek');if(!f)return;
function q(s){return f.querySelector(s)}
var pq=(location.search.match(/[?&]pakket=([a-z]+)/)||[])[1];if(pq){var r0=q('input[data-id='+pq+']');if(r0)r0.checked=true}
var dag=q('#f-dag'),t=new Date();t.setDate(t.getDate()+1);dag.min=t.toISOString().slice(0,10);
var m2=q('#f-m2'),hint=document.getElementById('f-m2-h'),own=false,timer,seq=0;m2.addEventListener('input',function(){own=!!m2.value.trim()});
function say(s){hint.textContent=s}
function zoek(){var a=q('#f-adres').value.trim(),pl=q('#f-plaats').value.trim();if(!/\\d/.test(a)||pl.length<2)return;var n=++seq;say('Woonoppervlakte opzoeken…');
fetch('https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=type:adres&rows=1&fl=weergavenaam,adresseerbaarobject_id,centroide_ll&q='+encodeURIComponent(a+' '+pl)).then(function(r){return r.json()}).then(function(j){
var d=j.response&&j.response.docs&&j.response.docs[0];if(!d||!d.centroide_ll)throw 0;var c=d.centroide_ll.match(/[-\\d.]+/g),x=+c[0],y=+c[1],id=String(d.adresseerbaarobject_id).replace(/^0+/,'');
return fetch('https://api.pdok.nl/kadaster/bag/ogc/v2/collections/verblijfsobject/items?f=json&limit=100&bbox='+[x-0.0004,y-0.0003,x+0.0004,y+0.0003].join(',')).then(function(r){return r.json()}).then(function(g){
var fs=(g.features||[]).filter(function(f){return String(f.properties.identificatie||f.id||'').replace(/^0+/,'')===id});var o=fs[0]&&+fs[0].properties.oppervlakte;if(!o)throw 0;
if(n!==seq)return;if(!own)m2.value=o;say('Gevonden in het Kadaster: '+o+' m² voor '+d.weergavenaam+'. Klopt het niet? Pas het gerust aan.')})}).catch(function(){if(n===seq)say('Ik kon de woonoppervlakte niet vinden. Weet je hem, vul hem dan in; anders zoek ik hem zelf op.')})}
['#f-adres','#f-plaats'].forEach(function(s){q(s).addEventListener('input',function(){clearTimeout(timer);timer=setTimeout(zoek,700)})});
f.addEventListener('submit',function(e){e.preventDefault();function v(id){var el=q('#'+id);return el?el.value.trim():''}
var r=q('input[name=Pakket]:checked'),xs=[].map.call(f.querySelectorAll('input[name=Extra]:checked'),function(c){return c.value}),d=v('f-dag');
if(d){d=new Date(d+'T12:00').toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
var body=['Adres: '+v('f-adres'),'Plaats: '+v('f-plaats'),'Woonoppervlakte: '+(v('f-m2')?v('f-m2')+' m²':'onbekend'),'Pakket: '+(r?r.value:''),'Extra’s: '+(xs.join(', ')||'geen'),'Voorkeursdag: '+(d||'geen voorkeur'),'Verkoper: '+[v('f-vnaam'),v('f-vtel')].filter(Boolean).join(', '),'Makelaarskantoor: '+(v('f-kantoor')||'particulier'),'Naam: '+v('f-naam'),'E-mail: '+v('f-mail'),'Telefoon: '+v('f-tel'),'','Opmerkingen:',v('f-opm')];
location.href='mailto:${MAIL}?subject='+encodeURIComponent('Opname '+v('f-adres')+', '+v('f-plaats'))+'&body='+encodeURIComponent(body.join('\\r\\n'));
document.getElementById('f-msg').textContent='Je mailprogramma opent nu met je aanvraag. Verstuur die mail, dan neem ik contact op met de verkoper.'})})();`;

function section(id, label, inner, cls = 'sec wrap') {
  return `
  <section class="${cls}" aria-labelledby="h-${id}">
    <div class="split">
    <h2 class="label" id="h-${id}">${label}</h2>
${inner}
    </div>
  </section>
`;
}

function renderSection(s, p) {
  switch (s.kind) {
    case 'list': return section(s.id, s.label, `    <div>${s.intro ? `
      <p class="intro">${md(s.intro)}</p>` : ''}
      <ul class="list">
${s.items.map(t => `        <li>${md(t)}</li>`).join('\n')}
      </ul>${s.after ? `
      <p class="after">${md(s.after)}</p>` : ''}
    </div>`);
    case 'text': return section(s.id, s.label, `    <div class="prose">
${s.paras.map(t => `      <p>${md(t)}</p>`).join('\n')}
    </div>`);
    case 'faq': return section(s.id, s.label, `    <div class="qa">
${s.qa.map(([q, a]) => `      <div><h3>${q}</h3><p>${md(a)}</p></div>`).join('\n')}
    </div>`);
    case 'projects': return section(s.id, s.label, `    <ul class="projs">
${s.items.map(([f, alt, name, where, t]) => `      <li><a href="/#werk"><div class="im"><img src="img/${f}-640.webp" srcset="img/${f}-640.webp 640w, img/${f}-1200.webp 1200w" sizes="(min-width: 1280px) 290px, (min-width: 861px) 23vw, (min-width: 641px) 31vw, 100vw" alt="${esc(alt)}" loading="lazy" decoding="async"></div><h3>${name}</h3><p class="pl">${where}</p><p>${t}</p></a></li>`).join('\n')}
    </ul>`);
    case 'packs': return section(s.id, s.label, `    <ul class="packs">
${PACKAGES.map(k => `      <li><h3>${k.name}</h3><p>${k.text}</p><a class="ul" href="/boeken?pakket=${k.id}">Boek ${k.name}</a></li>`).join('\n')}
    </ul>`);
    case 'services': return section(s.id, s.label, `    <ul class="svcs">
${SERVICES2.filter(x => x.href !== `/${p.slug}` && ROUTES.has(x.href)).map(x => `      <li><a class="ul" href="${x.href}">${x.name}</a><p>${x.text}</p></li>`).join('\n')}
    </ul>`);
    case 'places': return section(s.id, s.label, `    <ul class="places">
${PLACES.filter(([h]) => h !== `/${p.slug}`).map(([h, n]) => `      <li>${ROUTES.has(h) ? `<a href="${h}">${n}</a>` : `<span>${n}</span>`}</li>`).join('\n')}
    </ul>`);
    case 'flow': return section(s.id, s.label, `    <div>
      <ol class="flow">
${s.items.map((t, i) => `        <li><b>${String(i + 1).padStart(2, '0')}</b><p>${md(t)}</p></li>`).join('\n')}
      </ol>${s.after ? `
      <p class="after">${md(s.after)}</p>` : ''}
    </div>`);
    case 'form': return `
  <section class="sec tight wrap" aria-labelledby="h-${s.id}">
    <h2 class="vh" id="h-${s.id}">${s.label}</h2>
    <form class="book" id="boek" action="mailto:${MAIL}" method="post" enctype="text/plain">
      <fieldset><legend>De woning</legend><div class="fg">
        <div class="f full"><label for="f-adres">Adres</label><input id="f-adres" name="Adres" required autocomplete="off" placeholder="Straat en huisnummer, of postcode en huisnummer"></div>
        <div class="f"><label for="f-plaats">Plaats</label><input id="f-plaats" name="Plaats" required autocomplete="off"></div>
        <div class="f"><label for="f-m2">Woonoppervlakte</label><div class="unit"><input id="f-m2" name="Woonoppervlakte" inputmode="numeric" autocomplete="off" placeholder="Zoek ik voor je op"><span>m²</span></div></div>
          <p class="h full" id="f-m2-h" aria-live="polite">Vul adres en plaats in, dan zoek ik de woonoppervlakte op in het Kadaster.</p>
      </div></fieldset>
      <fieldset><legend>Pakket</legend><div>
        <div class="opts">
${PACKAGES.map(k => `          <label class="oc"><input type="radio" name="Pakket" value="${k.name}" data-id="${k.id}" required><b>${k.name}</b><span>${k.short}</span></label>`).join('\n')}
        </div>
        <p class="sub">Extra’s <i>(optioneel)</i></p>
        <div class="checks">
${EXTRAS.map(x => `          <label class="chk"><input type="checkbox" name="Extra" value="${esc(x.name)}"><span>${x.name}<small>${x.text}</small></span></label>`).join('\n')}
        </div>
      </div></fieldset>
      <fieldset><legend>Afspraak</legend><div class="fg">
        <div class="f full"><label for="f-dag">Voorkeursdag <i>(optioneel)</i></label><input id="f-dag" name="Voorkeursdag" type="date"></div>
        <div class="f"><label for="f-vnaam">Naam verkoper</label><input id="f-vnaam" name="Naam verkoper" autocomplete="off"></div>
        <div class="f"><label for="f-vtel">Telefoon verkoper</label><input id="f-vtel" name="Telefoon verkoper" type="tel" autocomplete="off"></div>
        <p class="h full">Ik plan de afspraak direct met de verkoper.</p>
      </div></fieldset>
      <fieldset><legend>Jouw gegevens</legend><div class="fg">
        <div class="f full"><label for="f-kantoor">Makelaarskantoor</label><input id="f-kantoor" name="Makelaarskantoor" autocomplete="off" spellcheck="false" placeholder="Begin te typen, bijvoorbeeld Overs…"><span class="h">Leeg laten als je de woning zelf verkoopt of verhuurt.</span></div>
        <div class="f"><label for="f-naam">Je naam</label><input id="f-naam" name="Naam" required autocomplete="name"></div>
        <div class="f"><label for="f-tel">Telefoon</label><input id="f-tel" name="Telefoon" type="tel" autocomplete="tel"></div>
        <div class="f full"><label for="f-mail">E-mail</label><input id="f-mail" name="E-mail" type="email" required autocomplete="email"></div>
        <div class="f full"><label for="f-opm">Opmerkingen <i>(optioneel)</i></label><textarea id="f-opm" name="Opmerkingen" rows="4" placeholder="Bijvoorbeeld over de sleutel, parkeren of de woning zelf"></textarea></div>
      </div></fieldset>
      <div class="send">
        <button class="btn" type="submit">Opname aanvragen</button>
        <p class="ok" id="f-msg" role="status"></p>
        <p class="h">Ik gebruik je gegevens en die van de verkoper alleen om de opname te plannen. Je eigen naam en kantoor onthoudt dit apparaat voor een volgende boeking. <button class="lnk" type="button" id="f-vergeet" hidden>Vergeet mijn gegevens</button></p>
      </div>
    </form>
  </section>
`;
    default: throw new Error(`onbekend sectietype ${s.kind}`);
  }
}

function page2(p) {
  const url = `${SITE}/${p.slug}`, B = `${SITE}/#bedrijf`;
  const heroUrl = p.hero ? `${SITE}/img/${p.hero[0]}-1800.webp` : null;
  const ogUrl = p.hero ? `${SITE}/og/${p.slug}.jpg` : `${SITE}/og.jpg`;
  const faq = p.sections.filter(s => s.kind === 'faq').flatMap(s => s.qa);
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: p.title, description: p.description, inLanguage: 'nl-NL',
      isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': p.service ? `${url}#dienst` : B }, breadcrumb: { '@id': `${url}#kruimelpad` },
      ...(heroUrl ? { primaryImageOfPage: heroUrl } : {}), dateModified: MODIFIED },
    { '@type': 'BreadcrumbList', '@id': `${url}#kruimelpad`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: p.crumb, item: url }] },
  ];
  if (p.service) {
    graph.push({ '@type': 'Service', '@id': `${url}#dienst`, name: p.service, serviceType: p.serviceType, description: p.description, url,
      ...(heroUrl ? { image: heroUrl } : {}), provider: { '@id': B }, areaServed: p.place ? { '@type': p.place.type, name: p.place.name } : AREAS.map(([t, n]) => ({ '@type': t, name: n })),
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Pakketten', itemListElement: PACKAGES.map(k => ({
        '@type': 'Offer', itemOffered: { '@type': 'Service', name: k.name, description: k.text }, url: `${SITE}/boeken?pakket=${k.id}` })) } });
  }
  if (faq.length) {
    graph.push({ '@type': 'FAQPage', '@id': `${url}#vragen`, url, inLanguage: 'nl-NL', mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) });
  }
  graph.push(
    { '@type': 'LocalBusiness', '@id': B, name: NAME, url: `${SITE}/`, telephone: TEL, email: MAIL,
      address: { '@type': 'PostalAddress', addressLocality: 'Haarlem', addressRegion: 'Noord-Holland', addressCountry: 'NL' } },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: NAME, inLanguage: 'nl-NL' });
  const ldJson = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const navLink = (h, t, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${h}"${h === `/${p.slug}` ? ' aria-current="page"' : ''}>${t}</a>`;
  const isForm = p.sections.some(s => s.kind === 'form');
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
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
/* pagina gemaakt door tools/build-pages.mjs: zelfde letters, kleuren en raster als de homepage */
${CSS}
${CSS2}
</style>
</head>
<body>
<a class="skip" href="#inhoud">Naar de inhoud</a>

<header class="bar" id="top">
  <div class="wrap">
    <a href="/" aria-label="${NAME}, naar de homepage"><i class="sig" aria-hidden="true"></i></a>
    <nav aria-label="Hoofdmenu">${navLink('/#diensten', 'Diensten')}${navLink('/#werk', 'Werk')}${navLink('/#over', 'Over', 'opt')}${navLink('/boeken', 'Boeken', 'nb')}</nav>
  </div>
</header>

<main id="inhoud">
  <section class="hero wrap" aria-labelledby="h-pagina">
    <nav class="crumbs" aria-label="Kruimelpad"><ol><li><a class="ul" href="/">Home</a></li><li aria-current="page">${p.crumb}</li></ol></nav>
    <h1 class="display" id="h-pagina">${p.h1}</h1>
    <p class="lead">${p.lead}</p>
    ${isForm ? `<p class="cta">Liever bellen? <a class="ul" href="tel:${TEL}">${TEL_NL}</a></p>` : `<div class="cta"><a class="btn" href="/boeken">Boek een opname</a><a class="ul" href="tel:${TEL}">Bel ${TEL_NL}</a></div>`}${p.facts ? `
    <ul class="facts">${p.facts.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}${p.hero ? `
    <figure class="hero-img"><img src="img/${p.hero[0]}-1200.webp" srcset="${srcset(p.hero[0])}" sizes="(min-width: 1280px) 1200px, 100vw" alt="${esc(p.hero[1])}" fetchpriority="high" decoding="async"></figure>` : ''}
  </section>
${p.sections.map(s => renderSection(s, p)).join('')}${isForm ? '' : `
  <section class="sec wrap" id="contact" aria-labelledby="h-contact">
    <div class="split">
    <h2 class="label" id="h-contact">Boeken</h2>
    <div class="cbox">
      <div class="c-intro"><p class="display">Opname boeken?</p><p class="note">Vul het formulier in, dan plan ik de afspraak direct met de verkoper. Binnen 3 werkdagen na de opname heb je alles, ook het meetrapport.</p><a class="btn" href="/boeken">Boek een opname</a></div>
      <div class="c-ways">
        <div class="way"><span class="k">Telefoon</span><a class="ul" href="tel:${TEL}">${TEL_NL}</a></div>
        <div class="way"><span class="k">E-mail</span><a class="ul" href="mailto:${MAIL}">${MAIL}</a></div>
      </div>
    </div>
    </div>
  </section>
`}</main>

<footer class="foot">
  <div class="wrap"><div>
    <i class="sig" aria-hidden="true"></i>
    <span>© 2026 ${NAME}</span>
    <span>Haarlem · KvK ${KVK}</span>
    <a class="ul" href="${LINKEDIN}" rel="me noopener" target="_blank">LinkedIn</a>
    <a class="ul" href="llms.txt">llms.txt</a>
    <a class="ul" href="#top">Naar boven</a>
  </div></div>
</footer>${isForm ? `
<script>${FORM_JS}
${AC_JS}</script>` : ''}
</body>
</html>
`;
}

const check = p => {
  for (const [k, max] of [['title', 65], ['description', 160]]) {
    if (strip(p[k]).length > max) throw new Error(`${p.slug}: ${k} is ${strip(p[k]).length} tekens (max ${max})`);
  }
};
// kantorenlijst voor het boekformulier
const kantoren = readFileSync(join(ROOT, 'tools/makelaars.txt'), 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
  .map(l => { const [n, pl] = l.split('|').map(x => x.trim()); return { n, p: pl || '' }; }).sort((a, b) => a.n.localeCompare(b.n, 'nl'));
mkdirSync(join(ROOT, 'data'), { recursive: true });
writeFileSync(join(ROOT, 'data/makelaars.json'), JSON.stringify(kantoren) + '\n');
console.log('ok', `data/makelaars.json (${kantoren.length} kantoren)`);

for (const p of PAGES) {
  check(p);
  writeFileSync(join(ROOT, `${p.slug}.html`), page(p));
  console.log('ok', `${p.slug}.html`);
}
for (const p of PAGES2) {
  check(p);
  writeFileSync(join(ROOT, `${p.slug}.html`), page2(p));
  console.log('ok', `${p.slug}.html`);
}
export { PAGES, PAGES2, SERVICES, PACKAGES, EXTRAS };
