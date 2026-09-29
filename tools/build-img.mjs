// Zet nieuwe foto's (jpg) om naar de WebP-formaten die index.html gebruikt:
// img/<naam>-320.webp, -640, -1200 en -1800 (geen vergroting; kleinere bronnen krijgen geen 1800).
// Eenmalig:  npm i --no-save sharp
// Gebruik:   node tools/build-img.mjs <map-met-jpgs>
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const { default: sharp } = await import('sharp');
const SRC = process.argv[2];
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'img');
if (!SRC) { console.error('Gebruik: node tools/build-img.mjs <map-met-jpgs>'); process.exit(1); }
for (const f of readdirSync(SRC).filter(f => /\.jpe?g$/i.test(f)).sort()) {
  const base = f.replace(/\.jpe?g$/i, '');
  const { width } = await sharp(join(SRC, f)).metadata();
  for (const w of [320, 640, 1200, 1800]) {
    if (w > width + 10) continue;
    await sharp(join(SRC, f)).rotate().resize({ width: w, withoutEnlargement: true })
      .webp({ quality: w <= 320 ? 68 : w >= 1800 ? 76 : 78, effort: 5, smartSubsample: true })
      .toFile(join(OUT, `${base}-${w}.webp`));
  }
  console.log('ok', base);
}
