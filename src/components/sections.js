// Sections shared by several pages.
import { site } from '../config/site.js';
import { products, productUrl, productStyle } from '../config/products.js';
import { esc, icon, money, waButton, button, arrowLink } from './ui.js';

const absolute = (path) => (site.url.startsWith('http') ? `${site.url}${path}` : path);

// Breadcrumb: visible trail + BreadcrumbList structured data.
export function breadcrumb(items) {
  const html = `<nav class="breadcrumb" aria-label="Fil d’Ariane"><ol>${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${esc(it.label)}</span></li>`
        : `<li><a href="${it.href}">${esc(it.label)}</a>${icon('chevron-right', { size: 14 })}</li>`,
    )
    .join('')}</ol></nav>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: absolute(it.href) })),
  };
  return { html, jsonld };
}

// FAQ as native <details> (works without JavaScript) + FAQPage structured data.
export function faq(items, { id = 'faq' } = {}) {
  const html = `<div class="faq-list" id="${id}">${items
    .map(
      (f) => `<details class="faq-item"><summary><span>${esc(f.q)}</span>${icon('chevron-down', { size: 18, cls: 'faq-chev' })}</summary><div class="faq-a"><p>${esc(f.a)}</p></div></details>`,
    )
    .join('')}</div>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return { html, jsonld };
}

// Full-width WhatsApp call to action.
export function ctaBand({ title, text, message, label = 'Écrire sur WhatsApp', secondary = null }) {
  return `
<section class="section cta-band glow" aria-labelledby="cta-band-title">
  <div class="container"><div class="cta-band-in card card-glow reveal">
    <div>
      <h2 id="cta-band-title">${esc(title)}</h2>
      <p class="section-lede">${esc(text)}</p>
    </div>
    <div class="cta-row">
      ${waButton(message, label)}
      ${secondary ? button({ href: secondary.href, label: secondary.label, variant: 'secondary' }) : ''}
    </div>
    <p class="cta-band-note">${icon('message-circle', { size: 16 })}<span>WhatsApp : <a href="https://wa.me/${site.contact.whatsapp}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a></span></p>
  </div></div>
</section>`;
}

// Compact product card, used for related products and the listing page.
export function productCard(p, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const monthly = p.pricing.monthly ? `<span class="price-tail">+ ${money(p.pricing.monthly)}/mois</span>` : '<span class="price-tail">licence à vie</span>';
  return `<article class="pcard card card-hover" ${productStyle(p)}>
    <p class="pcard-cat">${esc(p.industryShort)}</p>
    <${h} class="pcard-name"><a href="${productUrl(p)}">${esc(p.name)}</a></${h}>
    <p class="pcard-text">${esc(p.summary)}</p>
    <div class="pcard-foot"><p class="price"><span class="price-from">dès</span><strong class="price-main">${money(p.pricing.setup)}</strong>${monthly}</p>${icon('arrow-right', { size: 20, cls: 'pcard-arrow' })}</div>
  </article>`;
}

export function relatedProducts(ids, { title = 'Découvrez aussi' } = {}) {
  const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return `
<section class="section related" aria-labelledby="related-title">
  <div class="container">
    <div class="section-head section-head-split reveal"><div><p class="eyebrow">Nos autres logiciels</p><h2 id="related-title">${esc(title)}</h2></div>${arrowLink('/logiciels/', 'Tous les logiciels')}</div>
    <div class="pcard-grid reveal">${list.map((p) => productCard(p)).join('')}</div>
  </div>
</section>`;
}
