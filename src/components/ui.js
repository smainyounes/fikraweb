import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { whatsappUrl } from '../config/site.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- text ----------
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NNBSP = '\u00A0'; // no-break space as thousands separator (Instrument Sans has no narrow no-break space)
const NBSP = ' ';
export const number = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);
export const money = (n) => `${number(n)}${NBSP}DA`;

// ---------- icons (Lucide, inlined at build time) ----------
const iconCache = new Map();
export function icon(name, { size = 20, cls = '', label = '' } = {}) {
  if (!iconCache.has(name)) {
    const file = join(ROOT, 'assets/icons', `${name}.svg`);
    if (!existsSync(file)) throw new Error(`Icon not found: ${name}`);
    const inner = readFileSync(file, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim();
    iconCache.set(name, inner);
  }
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="icon i-${name} ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${iconCache.get(name)}</svg>`;
}

// ---------- links & buttons ----------
export const wa = (message) => whatsappUrl(message);

export function button({ href, label, variant = 'primary', iconName = '', iconEnd = '', external = false, cls = '', attrs = '' }) {
  const ext = external ? ' target="_blank" rel="noopener"' : '';
  return `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext} ${attrs}>${iconName ? icon(iconName, { size: 18 }) : ''}<span>${label}</span>${iconEnd ? icon(iconEnd, { size: 18, cls: 'icon-end' }) : ''}</a>`;
}

export const waButton = (message, label = 'Écrire sur WhatsApp', variant = 'whatsapp', cls = '') =>
  button({ href: wa(message), label, variant, iconName: 'message-circle', external: true, cls });

export const arrowLink = (href, label, cls = '') =>
  `<a class="link-arrow ${cls}" href="${esc(href)}"><span>${label}</span>${icon('arrow-right', { size: 16 })}</a>`;

// ---------- screenshot slots ----------
// Drop a real screenshot in src/assets/img/screens/<id>.webp (or .avif/.png/.jpg)
// and it replaces the placeholder automatically on the next build.
const SHOT_EXT = ['avif', 'webp', 'png', 'jpg', 'jpeg'];
export function findScreenshot(id) {
  for (const ext of SHOT_EXT) {
    if (existsSync(join(ROOT, 'assets/img/screens', `${id}.${ext}`))) return `/assets/img/screens/${id}.${ext}`;
  }
  return null;
}

const SHOT_SIZE = { browser: '1600 × 1000', window: '1600 × 1000', phone: '750 × 1600' };

export function screenshot({ id, label, frame = 'browser' }, { product = null, cls = '', compact = false, eager = false } = {}) {
  const src = findScreenshot(id);
  const style = product ? `style="--c-l:${product.color};--c-d:${product.colorDark}" data-pc` : '';
  const body = src
    ? `<img src="${src}" alt="${esc(label)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`
    : `<div class="slot" role="img" aria-label="Emplacement de capture d'écran : ${esc(label)}"><span class="slot-label">${icon('image', { size: 16 })}<span class="slot-title">${compact ? 'À remplacer' : 'Capture à remplacer'}</span><span class="slot-meta">${esc(label)}${compact ? '' : ` · ${SHOT_SIZE[frame]}`}</span></span></div>`;
  const shotAttr = `data-shot="${esc(id)}"`;

  if (frame === 'phone') {
    return `<div class="frame frame-phone ${cls}" ${style} ${shotAttr}><div class="frame-screen"><div class="frame-notch"><i></i></div>${body}</div></div>`;
  }
  if (frame === 'window') {
    const title = esc(label.split('·')[0].trim());
    return `<div class="frame frame-window ${cls}" ${style} ${shotAttr}><div class="frame-bar"><span class="frame-title">${title}</span><span class="frame-controls" aria-hidden="true"><i></i><i></i><i></i></span></div>${body}</div>`;
  }
  return `<div class="frame frame-browser ${cls}" ${style} ${shotAttr}><div class="frame-bar"><span class="frame-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="frame-url">${esc(label)}</span></div>${body}</div>`;
}

// ---------- price ----------
export function price(p, { from = true } = {}) {
  const { setup, monthly, setupLabel } = p.pricing;
  const tail = monthly ? `+ ${money(monthly)}/mois` : esc(setupLabel ? 'licence à vie' : '');
  return `<p class="price">${from ? '<span class="price-from">à partir de</span>' : ''}<strong class="price-main">${money(setup)}</strong>${tail ? `<span class="price-tail">${tail}</span>` : ''}</p>`;
}
