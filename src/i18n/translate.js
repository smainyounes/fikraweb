// ============================================================================
//  FikraWeb · page translation
//  Pages are written in French (the source language). For Arabic and English,
//  the French HTML is translated text by text from a dictionary keyed by the
//  French text (src/i18n/ar.js, src/i18n/en.js), and internal links are moved
//  under /ar/ or /en/. Anything without a translation is reported by the build.
// ============================================================================
import { products } from '../config/products.js';

export const LANGS = {
  fr: { code: 'fr', dir: 'ltr', prefix: '', locale: 'fr_DZ', label: 'FR', name: 'Français' },
  ar: { code: 'ar', dir: 'rtl', prefix: '/ar', locale: 'ar_DZ', label: 'AR', name: 'العربية' },
  en: { code: 'en', dir: 'ltr', prefix: '/en', locale: 'en_US', label: 'EN', name: 'English' },
};

// Never translated: product and brand names, numbers and punctuation.
const KEEP = new Set([
  ...products.map((p) => p.name),
  'FikraWeb', 'WhatsApp', 'Facebook', 'Instagram', 'Telegram', 'Google Sheets', 'Google Analytics',
  'BaridiMob', 'CCP', 'Yalidine', 'ZR Express', 'DHD', 'Maystro', 'Ecotrack', 'TikTok', 'ERP', 'FAQ', 'PDF', 'CSV',
  'FR', 'AR', 'EN', '404', 'WhatsApp ·',
]);
const NOTHING_TO_TRANSLATE = /^[\d\s  .,:;·•+\-–—/×()%#*?!«»"'’|→←↑↓]*$/u;

// Money as written by money(): "29 000 DA" with no-break spaces.
const MONEY_RE = /(\d{1,3}(?: \d{3})*) DA/g;
const formatMoney = (digits, lang) => {
  if (lang === 'en') return `${digits.replace(/ /g, ',')} DZD`;
  if (lang === 'ar') return `${digits} دج`;
  return `${digits} DA`;
};
const PRODUCT_RE = new RegExp(products.map((p) => p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length).join('|'), 'g');

const fill = (template, token, values) => {
  let i = 0;
  return template.replace(new RegExp(`\\{${token}\\}`, 'g'), () => values[i++] ?? '');
};

// Look up one piece of French text. Returns the translation, or null if missing.
export function lookup(key, dict, lang) {
  if (KEEP.has(key) || NOTHING_TO_TRANSLATE.test(key)) return key.replace(MONEY_RE, (m, d) => formatMoney(d, lang));
  if (dict[key] != null) return dict[key];
  // amounts → {money}
  const monies = [];
  const normMoney = key.replace(MONEY_RE, (m, d) => { monies.push(formatMoney(d, lang)); return '{money}'; });
  if (normMoney === '{money}') return monies[0];
  if (monies.length && dict[normMoney] != null) return fill(dict[normMoney], 'money', monies);
  // product names → {product}
  const names = [];
  const normProduct = normMoney.replace(PRODUCT_RE, (m) => { names.push(m); return '{product}'; });
  if (names.length && dict[normProduct] != null) return fill(fill(dict[normProduct], 'money', monies), 'product', names);
  // years → {year} (e.g. the copyright line)
  const years = [];
  const normYear = normProduct.replace(/\b(?:19|20)\d{2}\b/g, (m) => { years.push(m); return '{year}'; });
  if (years.length && dict[normYear] != null) return fill(fill(fill(dict[normYear], 'money', monies), 'product', names), 'year', years);
  return null;
}

// ---------------------------------------------------------------- HTML helpers
const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const encodeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const encodeAttr = (s) => encodeText(s).replace(/"/g, '&quot;');

const TRANSLATED_ATTRS = ['alt', 'aria-label', 'placeholder', 'title', 'data-intro', 'data-subject', 'data-label',
  'data-label-light', 'data-label-dark', 'data-label-open', 'data-label-close'];

export function createTranslator({ lang, dict, siteUrl, onMissing }) {
  const L = LANGS[lang];
  // Exact text first; then labels made of parts ("SalonPro · Caisse · 1600 × 1000",
  // "Emplacement de capture d'écran : SalonPro · Caisse") are translated part by part.
  const resolve = (key, where) => {
    const out = lookup(key, dict, lang);
    if (out != null) return out;
    const brand = key.match(/^(.+) \| FikraWeb$/);
    if (brand) { const b = resolve(brand[1], where); return b == null ? null : `${b} | FikraWeb`; }
    const prefix = key.match(/^(Emplacement de capture d['’]écran) : (.+)$/);
    if (prefix) {
      const a = resolve(prefix[1], where), b = resolve(prefix[2], where);
      return a == null || b == null ? null : `${a}${lang === 'fr' ? ' : ' : ': '}${b}`;
    }
    if (key.includes(' · ')) {
      const parts = key.split(' · ').map((part) => resolve(part, where));
      return parts.includes(null) ? null : parts.join(' · ');
    }
    onMissing(key, where);
    return null;
  };
  const tr = (raw, where) => {
    const key = raw.replace(/[ \t\r\n]+/g, ' ').trim();
    if (!key) return raw;
    const out = resolve(key, where);
    if (out == null) return raw;
    const lead = raw.match(/^[ \t\r\n]*/)[0];
    const trail = raw.match(/[ \t\r\n]*$/)[0];
    return lead + out + trail;
  };
  const localPath = (p) => (p.startsWith('/') && !p.startsWith('//') && !p.startsWith('/assets/') ? `${L.prefix}${p}` : p);
  const localUrl = (u) => {
    if (u.startsWith('/')) return localPath(u);
    if (siteUrl && u.startsWith(siteUrl + '/') && !u.startsWith(siteUrl + '/assets/')) return siteUrl + localPath(u.slice(siteUrl.length));
    return u;
  };
  const waUrl = (u, where) => {
    const m = u.match(/^(https:\/\/wa\.me\/\d+\?text=)(.*)$/);
    if (!m) return u;
    return m[1] + encodeURIComponent(tr(decodeURIComponent(m[2]), where));
  };

  const deep = (v, where) => {
    if (typeof v === 'string') {
      if (/^(https?:|\/)/.test(v)) return localUrl(v);
      return /[A-Za-zÀ-ÿ]/.test(v) ? tr(v, where) : v;
    }
    if (Array.isArray(v)) return v.map((x) => deep(x, where));
    if (v && typeof v === 'object') {
      const o = {};
      for (const [k, val] of Object.entries(v)) {
        // keep schema keywords and language codes as they are
        o[k] = k.startsWith('@') || ['inLanguage', 'priceCurrency', 'price', 'areaServed', 'telephone', 'availability', 'availableLanguage', 'applicationCategory', 'operatingSystem', 'contactType'].includes(k) ? val : deep(val, where);
      }
      return o;
    }
    return v;
  };

  function translateTag(tag, where) {
    if (/^<\/|^<!/.test(tag)) return tag;
    const keepLink = /\sdata-lang-link\b/.test(tag);
    let t = tag;
    // <html lang dir>
    if (/^<html\b/.test(t)) return t.replace(/lang="[^"]*"/, `lang="${L.code}"`).replace(/dir="[^"]*"/, `dir="${L.dir}"`);
    // meta contents
    if (/^<meta\b/.test(t)) {
      if (/property="og:locale"/.test(t)) return t.replace(/content="[^"]*"/, `content="${L.locale}"`);
      if (/(name="description"|property="og:(title|description)")/.test(t)) {
        return t.replace(/content="([^"]*)"/, (m, v) => `content="${encodeAttr(tr(decode(v), where + ' meta'))}"`);
      }
      if (/property="og:url"/.test(t)) return t.replace(/content="([^"]*)"/, (m, v) => `content="${localUrl(v)}"`);
      return t;
    }
    // translatable attributes
    for (const a of TRANSLATED_ATTRS) {
      t = t.replace(new RegExp(`(\\s${a}=")([^"]*)(")`), (m, pre, v, post) => (v ? pre + encodeAttr(tr(decode(v), `${where} @${a}`)) + post : m));
    }
    // links
    if (!keepLink) {
      t = t.replace(/(\shref=")([^"]*)(")/, (m, pre, v, post) => {
        const url = decode(v);
        if (url.includes('wa.me/')) return pre + encodeAttr(waUrl(url, where + ' whatsapp')) + post;
        return pre + encodeAttr(localUrl(url)) + post;
      });
      t = t.replace(/(\saction=")([^"]*)(")/, (m, pre, v, post) => pre + localUrl(v) + post);
    }
    return t;
  }

  return function translateHtml(html, where) {
    const parts = html.split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<svg\b[\s\S]*?<\/svg>|<!--[\s\S]*?-->|<[^>]+>)/);
    // Text between <!--notranslate--> and <!--/notranslate--> is left as it is (e.g. language names).
    let skip = false;
    return parts
      .map((part, i) => {
        if (part === '<!--notranslate-->') { skip = true; return part; }
        if (part === '<!--/notranslate-->') { skip = false; return part; }
        if (skip) return part;
        if (i % 2 === 0) return part && /[^\s]/.test(part) ? encodeText(tr(decode(part), where)) : part; // text
        if (part.startsWith('<script') && part.includes('application/ld+json')) {
          return part.replace(/(<script[^>]*>)([\s\S]*?)(<\/script>)/, (m, open, json, close) => open + JSON.stringify(deep(JSON.parse(json), where + ' json-ld')) + close);
        }
        if (part.startsWith('<script') || part.startsWith('<style') || part.startsWith('<!--')) return part;
        if (part.startsWith('<svg')) return part.replace(/(\saria-label=")([^"]*)(")/g, (m, pre, v, post) => pre + encodeAttr(tr(decode(v), where + ' svg')) + post);
        return translateTag(part, where);
      })
      .join('');
  };
}
