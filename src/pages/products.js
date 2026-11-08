// Products listing: /logiciels/
import { site } from '../config/site.js';
import { products, groups, productUrl, productStyle } from '../config/products.js';
import { esc, icon, money, price, button, waButton, screenshot, arrowLink } from '../components/ui.js';
import { breadcrumb, ctaBand } from '../components/sections.js';

const CHIPS = {
  salonpro: ['PC Windows ou tablette Android', 'Hors ligne'],
  garagepro: ['En ligne', 'Site vitrine inclus'],
  carrentpro: ['En ligne', 'Site public FR · AR'],
  safardesk: ['En ligne', 'Plusieurs agences'],
  matjarpro: ['Paiement à la livraison', 'Sans commission'],
  catalogpro: ['Site catalogue', 'Liens privés'],
};

function row(p, i) {
  const shot = p.shot.frame === 'phone' ? { ...p.shot, frame: 'browser' } : p.shot;
  return `
  <article class="prow card" ${productStyle(p)} data-group="${p.group}" aria-labelledby="prow-${p.id}">
    <div class="prow-main">
      <p class="prow-cat"><span class="phero-dot" aria-hidden="true"></span>${esc(p.industry)}</p>
      <h3 id="prow-${p.id}" class="prow-name"><a href="${productUrl(p)}">${esc(p.name)}</a></h3>
      <p class="prow-headline">${esc(p.headline)}</p>
      <p class="prow-text">${esc(p.summary)}</p>
      <p class="prow-benefit">${icon('check', { size: 18 })}<span>${esc(p.benefit)}</span></p>
      <ul class="chip-list">${CHIPS[p.id].map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
      <div class="prow-foot">
        ${price(p)}
        <div class="cta-row">
          ${button({ href: productUrl(p), label: `Découvrir ${esc(p.name)}`, variant: 'product', iconEnd: 'arrow-right' })}
          <a class="sc-wa" href="https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(p.whatsapp)}" target="_blank" rel="noopener">${icon('message-circle', { size: 16 })}<span>Demander une démonstration</span></a>
        </div>
      </div>
    </div>
    <div class="prow-visual">${screenshot(shot, { product: p })}</div>
  </article>`;
}

export default function productsPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Logiciels', href: '/logiciels/' },
  ]);
  let n = 0;
  const body = `
<section class="lhero bg-grid glow" aria-labelledby="lhero-title">
  <div class="container">
    ${bc.html}
    <div class="lhero-in reveal">
      <p class="eyebrow">Logiciels prêts à l’emploi</p>
      <h1 id="lhero-title">Un logiciel pour <span class="grad-text">chaque métier.</span></h1>
      <p class="lede">Six logiciels de gestion conçus pour des activités précises. Chacun est installé, configuré avec vos informations et accompagné d’une formation.</p>
    </div>
    <div class="filters reveal" role="group" aria-label="Filtrer par secteur" data-filters hidden>
      <button type="button" class="filter" aria-pressed="true" data-filter="all">Tous <span>${products.length}</span></button>
      ${groups.map((g) => `<button type="button" class="filter" aria-pressed="false" data-filter="${g.id}">${esc(g.label)} <span>${products.filter((p) => p.group === g.id).length}</span></button>`).join('')}
    </div>
  </div>
</section>

<section class="section listing" aria-label="Liste des logiciels">
  <div class="container">
    ${groups
      .map((g) => {
        const items = products.filter((p) => p.group === g.id);
        return `<div class="lgroup" data-group-block="${g.id}">
      <h2 class="lgroup-title"><span>${esc(g.label)}</span><small>${items.length} logiciel${items.length > 1 ? 's' : ''}</small></h2>
      <div class="lgroup-list">${items.map((p) => row(p, n++)).join('')}</div>
    </div>`;
      })
      .join('')}
    <aside class="lcustom card card-glow reveal" aria-labelledby="lcustom-title">
      <div>
        <p class="eyebrow">Votre métier n’est pas dans la liste ?</p>
        <h2 id="lcustom-title">Nous développons aussi des logiciels sur mesure.</h2>
        <p>ERP, gestion de stock, production, facturation, pointage et paie : un système conçu autour de vos processus.</p>
      </div>
      <div class="cta-row">
        ${button({ href: '/sur-mesure/', label: 'Découvrir le sur mesure', variant: 'primary', iconEnd: 'arrow-right' })}
        ${waButton(site.whatsappMessages.custom, 'Présenter mon projet', 'secondary')}
      </div>
    </aside>
  </div>
</section>
${ctaBand({
  title: 'Vous hésitez entre deux logiciels ?',
  text: 'Décrivez-nous votre activité : nous vous conseillons le logiciel adapté et vous en faisons la démonstration.',
  message: site.whatsappMessages.demo,
  label: 'Demander conseil',
  secondary: { href: '/tarifs/', label: 'Voir les tarifs' },
})}`;

  return {
    id: 'products',
    path: '/logiciels/',
    title: 'Nos logiciels de gestion · Salons, garages, location, voyages, e-commerce | FikraWeb',
    ogTitle: 'Les logiciels FikraWeb : un logiciel pour chaque métier',
    description:
      'SalonPro, GaragePro, CarRent Pro, SafarDesk, MatjarPro et CatalogPro : six logiciels de gestion pour les entreprises algériennes, en français et en arabe, avec installation et formation.',
    jsonld: [
      bc.jsonld,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: site.url.startsWith('http') ? `${site.url}${productUrl(p)}` : productUrl(p) })),
      },
    ],
    body,
  };
}
