import { site, isSet, whatsappUrl } from '../config/site.js';
import { products, groups, productUrl, productStyle } from '../config/products.js';
import { esc, icon, wa } from './ui.js';

// Main navigation. `match` marks the current section.
const NAV = [
  { href: '/sur-mesure/', label: 'Sur mesure' },
  { href: '/tarifs/', label: 'Tarifs' },
  { href: '/methode/', label: 'Méthode' },
  { href: '/faq/', label: 'FAQ' },
];

function productMenu() {
  return groups
    .map((g) => {
      const items = products.filter((p) => p.group === g.id);
      return `<div class="pm-group"><p class="pm-group-label">${esc(g.label)}</p><ul>${items
        .map(
          (p) =>
            `<li><a href="${productUrl(p)}" ${productStyle(p)}><span class="pm-dot" aria-hidden="true"></span><span class="pm-name">${esc(p.name)}</span><span class="pm-ind">${esc(p.industryShort)}</span></a></li>`,
        )
        .join('')}</ul></div>`;
    })
    .join('');
}

// The original logo has white "Fikra" lettering: a copy with dark lettering is shown in light mode.
const logo = (lazy = false) =>
  `<img class="logo-on-dark" src="/assets/img/brand/logo-fikraweb.webp" width="159" height="48" alt="${esc(site.name)}"${lazy ? ' loading="lazy"' : ''}>` +
  `<img class="logo-on-light" src="/assets/img/brand/logo-fikraweb-light.webp" width="159" height="48" alt=""${lazy ? ' loading="lazy"' : ''} aria-hidden="true">`;

const themeToggle = () =>
  `<button class="theme-toggle" type="button" aria-label="Activer le mode clair" title="Mode clair / sombre">${icon('sun', { size: 18, cls: 'i-sun' })}${icon('moon', { size: 18, cls: 'i-moon' })}</button>`;

function header(page) {
  const cur = (href) => (page.path === href || (href !== '/' && page.path.startsWith(href)) ? ' aria-current="page"' : '');
  const inProducts = page.path.startsWith('/logiciels/');
  return `
<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)}, accueil">
      ${logo()}
    </a>
    <nav class="nav" aria-label="Navigation principale">
      <ul class="nav-list">
        <li class="nav-item has-menu">
          <button class="nav-link nav-trigger" type="button" aria-expanded="false" aria-controls="products-menu"${inProducts ? ' data-current' : ''}>Logiciels ${icon('chevron-down', { size: 16, cls: 'chev' })}</button>
          <div class="products-menu" id="products-menu" hidden>
            <div class="pm-grid">${productMenu()}</div>
            <div class="pm-foot"><a href="/logiciels/" class="link-arrow"><span>Tous les logiciels</span>${icon('arrow-right', { size: 16 })}</a><span class="pm-foot-note">Démonstration sur demande</span></div>
          </div>
        </li>
        ${NAV.map((n) => `<li class="nav-item"><a class="nav-link" href="${n.href}"${cur(n.href)}>${n.label}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="header-actions">
      ${themeToggle()}
      <a class="btn btn-whatsapp btn-sm header-wa" href="${esc(wa(site.whatsappMessages.general))}" target="_blank" rel="noopener">${icon('message-circle', { size: 18 })}<span>WhatsApp</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Ouvrir le menu">${icon('menu', { size: 22, cls: 'i-open' })}${icon('x', { size: 22, cls: 'i-close' })}</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <div class="container">
      <p class="mm-label">Logiciels</p>
      <ul class="mm-products">${products
        .map((p) => `<li><a href="${productUrl(p)}" ${productStyle(p)}><span class="pm-dot" aria-hidden="true"></span><span class="pm-name">${esc(p.name)}</span><span class="pm-ind">${esc(p.industryShort)}</span></a></li>`)
        .join('')}</ul>
      <a class="mm-all" href="/logiciels/">Tous les logiciels ${icon('arrow-right', { size: 16 })}</a>
      <ul class="mm-links">${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}<li><a href="/contact/">Contact</a></li></ul>
      <a class="btn btn-whatsapp btn-block" href="${esc(wa(site.whatsappMessages.general))}" target="_blank" rel="noopener">${icon('message-circle', { size: 18 })}<span>Écrire sur WhatsApp</span></a>
    </div>
  </div>
</header>`;
}

function footer() {
  const c = site.contact;
  const contactItems = [
    `<li><a href="${esc(whatsappUrl())}" target="_blank" rel="noopener">${icon('message-circle', { size: 16 })}<span>WhatsApp · ${esc(c.whatsappDisplay)}</span></a></li>`,
    isSet(c.email) ? `<li><a href="mailto:${esc(c.email)}">${icon('mail', { size: 16 })}<span>${esc(c.email)}</span></a></li>` : '',
    isSet(site.social.facebook) ? `<li><a href="${esc(site.social.facebook)}" target="_blank" rel="noopener">${icon('facebook', { size: 16 })}<span>Facebook</span></a></li>` : '',
    isSet(site.social.instagram) ? `<li><a href="${esc(site.social.instagram)}" target="_blank" rel="noopener">${icon('instagram', { size: 16 })}<span>Instagram</span></a></li>` : '',
  ].join('');
  return `
<footer class="site-footer is-dark">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="${esc(site.name)}, accueil">${logo(true)}</a>
        <p>${esc(site.descriptor)}.<br>Des logiciels de gestion conçus en Algérie, pour les entreprises algériennes.</p>
      </div>
      <nav class="footer-cols" aria-label="Pied de page">
        <div><p class="footer-title">Logiciels</p><ul>${products.map((p) => `<li><a href="${productUrl(p)}">${esc(p.name)}</a></li>`).join('')}</ul></div>
        <div><p class="footer-title">FikraWeb</p><ul><li><a href="/logiciels/">Tous les logiciels</a></li><li><a href="/sur-mesure/">Développement sur mesure</a></li><li><a href="/tarifs/">Tarifs</a></li><li><a href="/methode/">Notre méthode</a></li><li><a href="/faq/">Questions fréquentes</a></li><li><a href="/contact/">Contact</a></li></ul></div>
        <div><p class="footer-title">Contact</p><ul class="footer-contact">${contactItems}</ul></div>
      </nav>
    </div>
    <div class="footer-bottom"><p>© ${new Date().getFullYear()} ${esc(site.name)}. Tous droits réservés.</p><a href="#top" class="to-top">Haut de page ${icon('arrow-right', { size: 14, cls: 'up' })}</a></div>
  </div>
</footer>`;
}

export function layout(page) {
  const urlSet = isSet(site.url);
  const canonical = urlSet ? `${site.url}${page.path}` : '';
  const title = page.title;
  const ogImage = urlSet ? `${site.url}/assets/img/og-default.png` : '/assets/img/og-default.png';
  const jsonld = (page.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="${site.lang}" dir="ltr" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>(function(d){d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}d.dataset.theme=t==='light'||t==='dark'?t:'dark'})(document.documentElement)</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(page.ogTitle || title)}">
<meta property="og:description" content="${esc(page.description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#050816">
<meta name="color-scheme" content="dark light">
<link rel="icon" href="/assets/img/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/img/brand/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=${page.assetVersion}">
${jsonld}
</head>
<body class="page-${page.id}" ${page.bodyAttrs || ''}>
<a class="skip-link" href="#main">Aller au contenu</a>
${header(page)}
<main id="main">
${page.body}
</main>
${footer()}
<a class="wa-float" href="${esc(wa(page.whatsapp || site.whatsappMessages.general))}" target="_blank" rel="noopener" aria-label="Écrire à FikraWeb sur WhatsApp">${icon('message-circle', { size: 26 })}</a>
<script src="/assets/js/main.js?v=${page.assetVersion}" defer></script>
</body>
</html>`;
}
