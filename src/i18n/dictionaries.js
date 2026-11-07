// Builds the English and Arabic dictionaries from every table in src/i18n/strings/.
// Each table row is [French, English, Arabic]. {money}, {product} and {year} are placeholders.
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), 'strings');
const files = readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const tables = await Promise.all(files.map(async (f) => [f, (await import(pathToFileURL(join(dir, f)).href)).default]));

const en = {};
const ar = {};
export const conflicts = [];
for (const [file, rows] of tables) {
  for (const [fr, enText, arText] of rows) {
    if (fr in en && (en[fr] !== enText || ar[fr] !== arText)) conflicts.push(`${file}: "${fr}"`);
    en[fr] = enText;
    ar[fr] = arText;
  }
}
export { en, ar };
