// One page per product: /logiciels/<slug>/
import { site } from '../config/site.js';
import { products, groups, productUrl, productStyle } from '../config/products.js';
import { esc, icon, money, button, waButton, screenshot } from '../components/ui.js';
import { breadcrumb, faq, ctaBand, relatedProducts } from '../components/sections.js';

import salonpro from '../content/products/salonpro.js';
import garagepro from '../content/products/garagepro.js';
import carrentpro from '../content/products/carrentpro.js';
import safardesk from '../content/products/safardesk.js';
import matjarpro from '../content/products/matjarpro.js';
import catalogpro from '../content/products/catalogpro.js';

const CONTENT = { salonpro, garagepro, carrentpro, safardesk, matjarpro, catalogpro };

function priceBox(p) {
  const { setup, monthly, setupLabel, supportYearly } = p.pricing;
  const note = supportYearly ? `Support optionnel : environ ${money(supportYearly)}/an` : '';
  return `<div class="price-box">
    <div class="price-box-row"><span class="price-box-label">${monthly ? 'Installation' : 'Licence'}</span><strong class="price-box-value">${money(setup)}</strong></div>
    ${monthly
      ? `<div class="price-box-row"><span class="price-box-label">Abonnement</span><strong class="price-box-value">${money(monthly)}<small>/mois</small></strong></div>`
      : `<p class="price-box-note">${esc(setupLabel)}</p>`}
    ${note ? `<p class="price-box-note">${esc(note)}</p>` : ''}
  </div>`;
}

function page(p) {
  const c = CONTENT[p.id];
  const group = groups.find((g) => g.id === p.group);
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Logiciels', href: '/logiciels/' },
    { label: p.name, href: productUrl(p) },
  ]);
  const questions = faq(c.faq, { id: `faq-${p.id}` });

  const hero = `
<section class="phero bg-grid glow" ${productStyle(p)} aria-labelledby="phero-title">
  <div class="container">
    ${bc.html}
    <div class="phero-grid">
      <div class="phero-copy reveal">
        <p class="phero-cat"><span class="phero-dot" aria-hidden="true"></span>${esc(p.category)}</p>
        <h1 id="phero-title"><span class="phero-name">${esc(p.name)}</span>${esc(p.headline)}</h1>
        <p class="lede">${esc(c.description)}</p>
        <ul class="chip-list">${c.chips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="cta-row">
          ${waButton(p.whatsapp, 'Demander une démonstration')}
          ${button({ href: '#tarif', label: 'Voir le tarif', variant: 'secondary', iconEnd: 'arrow-down' })}
        </div>
      </div>
      <div class="phero-visual reveal ${c.heroShot.frame === 'phone' ? 'is-phone' : ''}">
        ${screenshot(c.heroShot, { product: p, cls: 'phero-shot', eager: true })}
      </div>
    </div>
  </div>
</section>`;

  const audience = `
<section class="section" aria-labelledby="audience-title">
  <div class="container audience-grid">
    <div class="section-head reveal"><p class="eyebrow">Pour qui</p><h2 id="audience-title">${esc(c.audience.title)}</h2></div>
    <ul class="audience-list reveal">${c.audience.items
      .map((a, i) => `<li><span class="audience-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div></li>`)
      .join('')}</ul>
  </div>
</section>`;

  const problems = `
<section class="section section-alt" aria-labelledby="problems-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Ce que ${esc(p.name)} change</p><h2 id="problems-title">Les problèmes du quotidien, réglés.</h2></div>
    <ul class="problems reveal">${c.problems
      .map((pr) => `<li class="card"><div class="pb-before"><span class="pb-label">Avant</span><p>${esc(pr.before)}</p></div><div class="pb-after"><span class="pb-label">Avec ${esc(p.name)}</span><p>${esc(pr.after)}</p></div></li>`)
      .join('')}</ul>
  </div>
</section>`;

  const features = `
<section class="section" id="fonctionnalites" aria-labelledby="features-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Fonctionnalités</p><h2 id="features-title">Tout ce que fait ${esc(p.name)}, module par module.</h2></div>
    <div class="modules reveal">${c.modules
      .map((m) => `<article class="module card card-line"><div class="module-head"><span class="icon-box">${icon(m.icon, { size: 22 })}</span><h3>${esc(m.title)}</h3></div><ul>${m.items.map((it) => `<li>${icon('check', { size: 16 })}<span>${esc(it)}</span></li>`).join('')}</ul></article>`)
      .join('')}</div>
  </div>
</section>`;

  const gallery = `
<section class="section section-alt" aria-labelledby="gallery-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Aperçu</p><h2 id="gallery-title">${esc(p.name)} en images.</h2></div>
    <div class="gallery reveal">${c.gallery
      .map((g) => {
        const frame = g.frame || (p.shot.frame === 'window' ? 'window' : 'browser');
        return `<figure class="gallery-item ${frame === 'phone' ? 'is-phone' : ''}">${screenshot({ id: g.id, label: g.label, frame }, { product: p, compact: frame === 'phone' })}<figcaption>${esc(g.caption)}</figcaption></figure>`;
      })
      .join('')}</div>
  </div>
</section>`;

  const how = `
<section class="section" aria-labelledby="how-title">
  <div class="container">
    <div class="section-head section-head-center reveal"><p class="eyebrow">Comment ça se passe</p><h2 id="how-title">De la démonstration à l’utilisation.</h2></div>
    <ol class="process reveal">${c.howItWorks
      .map((s, i) => `<li class="card card-line"><span class="process-label">Étape ${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${i < c.howItWorks.length - 1 ? `<span class="process-arrow" aria-hidden="true">${icon('arrow-right', { size: 18 })}</span>` : ''}</li>`)
      .join('')}</ol>
  </div>
</section>`;

  const pricing = `
<section class="section section-alt" id="tarif" aria-labelledby="pricing-title">
  <div class="container pricing-grid">
    <div class="section-head reveal">
      <p class="eyebrow">Tarif</p>
      <h2 id="pricing-title">${p.pricing.monthly ? 'Une installation, puis un abonnement mensuel.' : 'Une licence, payée une seule fois.'}</h2>
      <ul class="pricing-notes">${c.pricingNotes.map((n) => `<li>${icon('check', { size: 18 })}<span>${esc(n)}</span></li>`).join('')}</ul>
      <p class="pricing-more"><a class="link-arrow" href="/tarifs/"><span>Comparer tous les tarifs</span>${icon('arrow-right', { size: 16 })}</a></p>
    </div>
    <div class="pricing-card card card-glow reveal" ${productStyle(p)}>
      <p class="pricing-card-name">${esc(p.name)}</p>
      ${priceBox(p)}
      ${waButton(p.whatsapp, 'Demander une démonstration', 'whatsapp', 'btn-block')}
      <p class="pricing-card-foot">Prix en dinars algériens. Développements spécifiques sur devis.</p>
    </div>
  </div>
</section>`;

  const faqSection = `
<section class="section" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="section-head reveal"><p class="eyebrow">Questions fréquentes</p><h2 id="faq-title">Vos questions sur ${esc(p.name)}.</h2><p class="section-lede">Une autre question ? Écrivez-nous sur WhatsApp.</p></div>
    <div class="reveal">${questions.html}</div>
  </div>
</section>`;

  const cta = ctaBand({
    title: `${p.name} pour votre ${p.group === 'commerce' ? 'activité' : 'entreprise'} ?`,
    text: 'Demandez une démonstration : nous vous répondons sur WhatsApp.',
    message: p.whatsapp,
    label: 'Demander une démonstration',
    secondary: { href: '/logiciels/', label: 'Voir les autres logiciels' },
  });

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: p.id === 'salonpro' ? 'Windows, Android' : 'Web',
    description: c.description,
    inLanguage: ['fr', 'ar'],
    offers: { '@type': 'Offer', price: String(p.pricing.setup), priceCurrency: 'DZD', availability: 'https://schema.org/InStock' },
    publisher: { '@type': 'Organization', name: site.name },
  };

  return {
    id: 'product',
    path: productUrl(p),
    title: `${p.name} · ${p.category} | FikraWeb`,
    ogTitle: `${p.name} · ${p.headline}`,
    description: c.seoDescription,
    whatsapp: p.whatsapp,
    bodyAttrs: productStyle(p),
    jsonld: [softwareLd, bc.jsonld, questions.jsonld],
    body: [hero, audience, problems, features, gallery, how, pricing, faqSection, cta, relatedProducts(c.related)].join('\n'),
  };
}

export default function productPages() {
  return products.map(page);
}
