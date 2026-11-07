#!/usr/bin/env node
// ============================================================================
//  FikraWeb · static site build (no dependencies, Node 18+)
//
//    node build.mjs           build the site into this folder (index.html, assets/, page folders)
//    node build.mjs --serve   build, then preview on http://localhost:4173
//
//  Edit content in src/config (contact, prices, products) and src/pages.
//  The generated files are listed in .build-manifest.json. The build only ever
//  deletes or overwrites files from that list, so src/, docs/ and your own
//  files are never touched.
// ============================================================================
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync, rmdirSync } from 'node:fs';
import { join, dirname, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';

import { site, isSet } from './src/config/site.js';
import { layout } from './src/components/layout.js';
import home from './src/pages/home.js';
import productsPage from './src/pages/products.js';
import productPages from './src/pages/product.js';
import customPage from './src/pages/custom.js';
import pricingPage from './src/pages/pricing.js';
import methodPage from './src/pages/method.js';
import faqPage from './src/pages/faq.js';
import contactPage from './src/pages/contact.js';
import notFoundPage from './src/pages/notfound.js';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = ROOT; // the site is written at the root of the project
const MANIFEST = join(ROOT, '.build-manifest.json');

// Files that existed before the build took over and may be replaced once.
// index.html is the previous one-page site (still available in git history).
const REPLACEABLE = new Set(['index.html']);

// Pages are added here as each stage is built. A page function may return one page or a list.
const PAGES = [home, productsPage, productPages, customPage, pricingPage, methodPage, faqPage, contactPage, notFoundPage];

// ---------------------------------------------------------------- clean previous output
const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : { files: [] };
const owned = new Set(previous.files);
for (const rel of previous.files) rmSync(join(OUT, rel), { force: true });
// remove folders the previous build left empty (never the root itself)
const dirs = [...new Set(previous.files.flatMap((f) => {
  const parts = f.split('/').slice(0, -1);
  return parts.map((_, i) => parts.slice(0, i + 1).join('/'));
}))].sort((a, b) => b.length - a.length);
for (const d of dirs) {
  const p = join(OUT, d);
  if (existsSync(p) && statSync(p).isDirectory() && readdirSync(p).length === 0) rmdirSync(p);
}

const written = [];
const toRel = (abs) => relative(OUT, abs).split(sep).join('/');
function guard(abs) {
  const rel = toRel(abs);
  if (existsSync(abs) && !owned.has(rel) && !REPLACEABLE.has(rel)) {
    throw new Error(`Refusing to overwrite ${rel}: it was not created by the build. Move or rename it first.`);
  }
  if (existsSync(abs) && REPLACEABLE.has(rel) && !owned.has(rel)) {
    console.log(`  · Replacing the previous ${rel} (it is still in git history).`);
  }
}
function write(abs, content) {
  guard(abs);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  written.push(toRel(abs));
}
function copyDir(from, to) {
  for (const name of readdirSync(from)) {
    const a = join(from, name), b = join(to, name);
    if (statSync(a).isDirectory()) copyDir(a, b);
    else if (!name.endsWith('.md')) { guard(b); mkdirSync(to, { recursive: true }); cpSync(a, b); written.push(toRel(b)); }
  }
}

// ---------------------------------------------------------------- assets
for (const dir of ['fonts', 'img', 'js']) copyDir(join(SRC, 'assets', dir), join(OUT, 'assets', dir));

const cssDir = join(SRC, 'assets/css');
const css = readdirSync(cssDir)
  .filter((f) => f.endsWith('.css'))
  .sort()
  .map((f) => readFileSync(join(cssDir, f), 'utf8'))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '\n')
  .replace(/\n{2,}/g, '\n')
  .trim();
write(join(OUT, 'assets/css/site.css'), css);

const assetVersion = createHash('sha1')
  .update(css)
  .update(readFileSync(join(SRC, 'assets/js/main.js')))
  .digest('hex')
  .slice(0, 8);

// ---------------------------------------------------------------- pages
const outFile = (path) => join(OUT, path.endsWith('/') ? `${path}index.html` : path);
const built = [];
// French typography: a no-break space before ? ! : ; » and after «, in visible text only
// (the lookahead keeps it out of tags and attributes), so "spécifique ?" never wraps alone.
const frenchSpaces = (html) =>
  html
    .replace(/ ([?!:;»])(?=[^<>]*<)/g, '\u00A0$1')
    .replace(/« (?=[^<>]*<)/g, '«\u00A0');

for (const make of PAGES) {
  for (const p of [make()].flat()) {
    const page = { ...p, assetVersion };
    write(outFile(page.path), frenchSpaces(layout(page)));
    built.push(page);
  }
}

// ---------------------------------------------------------------- robots & sitemap
if (isSet(site.url)) {
  write(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /docs/\nSitemap: ${site.url}/sitemap.xml\n`);
  const urls = built.filter((p) => !p.noindex).map((p) => `  <url><loc>${site.url}${p.path}</loc></url>`).join('\n');
  write(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
} else {
  write(join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /docs/\n');
}

writeFileSync(MANIFEST, JSON.stringify({ note: 'Files generated by build.mjs. Do not edit them by hand: edit src/ and rebuild.', files: written.sort() }, null, 2) + '\n');

// ---------------------------------------------------------------- link check (generated pages only)
const htmlFiles = written.filter((f) => f.endsWith('.html')).map((f) => join(OUT, f));
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const pending = new Map();
const broken = [];
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const pagePath = '/' + toRel(f).replace(/index\.html$/, '');
  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [pathPart, hash] = value.split('#');
    const targetPath = pathPart.split('?')[0] || pagePath;
    const target = outFile(targetPath);
    const generated = written.includes(toRel(target));
    if (!generated) {
      if (attr === 'href' && targetPath.endsWith('/')) pending.set(targetPath, (pending.get(targetPath) || 0) + 1);
      else broken.push(`${pagePath} → ${value}`);
      continue;
    }
    if (hash && hash !== 'top' && target.endsWith('.html') && !idsOf(readFileSync(target, 'utf8')).has(hash)) {
      broken.push(`${pagePath} → ${value} (missing #${hash})`);
    }
  }
}

// ---------------------------------------------------------------- screenshot slots list (docs/screenshot-slots.md)
const slots = new Map(); // id -> { label, frame, pages:Set, filled }
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const pagePath = '/' + toRel(f).replace(/index\.html$/, '');
  const opens = [...html.matchAll(/<div class="frame frame-(\w+)[^"]*"[^>]*data-shot="([^"]+)"[^>]*>/g)];
  opens.forEach((m, i) => {
    const [, frame, id] = m;
    // only look inside this frame: up to the next frame (or a safe distance)
    const end = i + 1 < opens.length ? opens[i + 1].index : m.index + 3000;
    const inner = html.slice(m.index + m[0].length, end);
    const img = inner.match(/^[\s\S]*?<img [^>]*alt="([^"]+)"/);
    const meta = inner.match(/slot-meta">([^<]+?)(?: · \d+ × \d+)?</);
    const label = (img && !inner.slice(0, inner.indexOf('<img')).includes('class="slot"') ? img[1] : meta ? meta[1] : id).trim();
    const filled = !!img && !inner.slice(0, inner.indexOf('<img')).includes('class="slot"');
    const s = slots.get(id) || { label, frame, pages: new Set(), filled };
    if (label.length > s.label.length) s.label = label; // keep the most descriptive label
    s.pages.add(pagePath);
    slots.set(id, s);
  });
}
const SIZES = { browser: '1600 × 1000', window: '1600 × 1000', phone: '750 × 1600' };
const filledCount = [...slots.values()].filter((s) => s.filled).length;
writeFileSync(join(ROOT, 'docs/screenshot-slots.md'), `# Screenshot slots

Generated by \`node build.mjs\`: do not edit by hand.
Put a file named \`<id>.webp\` (or .avif / .png / .jpg) in \`src/assets/img/screens/\` and rebuild:
it replaces the placeholder everywhere that slot is used.

${filledCount} of ${slots.size} slots filled.

| File name (id) | Shows | Frame | Recommended size | Used on | Status |
|---|---|---|---|---|---|
${[...slots.entries()].sort().map(([id, s]) => `| \`${id}\` | ${s.label} | ${s.frame} | ${SIZES[s.frame]} | ${[...s.pages].sort().join(', ')} | ${s.filled ? '✓ filled' : 'to add'} |`).join('\n')}
`);

console.log(`Built ${built.length} page(s) and ${written.length} file(s)  ·  assets v${assetVersion}`);
console.log(`  · Screenshot slots: ${filledCount}/${slots.size} filled (list in docs/screenshot-slots.md).`);
if (!isSet(site.url)) console.log('  ! site.url is not set (src/config/site.js): canonical URLs and sitemap.xml are skipped.');
if (pending.size) console.log(`  · Links to pages not built yet: ${[...pending.keys()].sort().join('  ')}`);
if (broken.length) { console.log('  ✗ Broken links:'); broken.forEach((b) => console.log('    ' + b)); process.exitCode = 1; }
else console.log('  ✓ No broken links or anchors.');

// ---------------------------------------------------------------- preview server
if (process.argv.includes('--serve')) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
  const port = Number(process.env.PORT) || 4173;
  createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = join(OUT, p);
    if (!file.startsWith(OUT) || !existsSync(file) || statSync(file).isDirectory()) {
      const nf = join(OUT, '404.html');
      res.writeHead(404, { 'content-type': types['.html'] });
      return res.end(existsSync(nf) ? readFileSync(nf) : 'Page non trouvée');
    }
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  }).listen(port, () => console.log(`\nPreview: http://localhost:${port}  (Ctrl+C to stop)`));
}
