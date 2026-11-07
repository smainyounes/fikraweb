// Pricing: /tarifs/ — every price comes from src/config/products.js.
import { site } from '../config/site.js';
import { products, productUrl, productStyle } from '../config/products.js';
import { esc, icon, money, button, waButton } from '../components/ui.js';
import { breadcrumb, faq, ctaBand } from '../components/sections.js';
import { faqGroups } from '../content/faq.js';

const SUPPORT = money(products.find((p) => p.id === 'salonpro').pricing.supportYearly);

const included = [
  { icon: 'settings', title: 'Configuration initiale', text: 'L’installation comprend la mise en place du logiciel avec vos informations : prestations, produits, prix, employés, paramètres.' },
  { icon: 'sliders-horizontal', title: 'À votre image', text: 'Le nom de votre entreprise, votre logo et vos réglages sont configurés pour vous.' },
  { icon: 'graduation-cap', title: 'Formation incluse', text: 'Votre équipe est formée à l’utilisation du logiciel au moment de l’installation.' },
];

const models = [
  { icon: 'globe', title: 'Logiciels en ligne', text: 'GaragePro, CarRent Pro, SafarDesk, MatjarPro et CatalogPro : une installation, puis un abonnement mensuel, nécessaire au fonctionnement du logiciel en ligne.' },
  { icon: 'monitor-smartphone', title: 'Licence à vie', text: `SalonPro : une licence payée une seule fois, pour un appareil (PC Windows ou tablette Android), qui fonctionne hors ligne. Support optionnel : environ ${SUPPORT} par an.` },
  { icon: 'layout-dashboard', title: 'Sur mesure', text: 'Les logiciels sur mesure et les fonctionnalités supplémentaires sont chiffrés sur devis, selon le périmètre du projet.' },
];

function row(p) {
  const { setup, monthly } = p.pricing;
  return `<tr ${productStyle(p)}>
    <th scope="row"><a href="${productUrl(p)}"><span class="pm-dot" aria-hidden="true"></span><span class="pt-name">${esc(p.name)}</span></a><span class="pt-ind">${esc(p.industryShort)}</span></th>
    <td data-label="${monthly ? 'Installation' : 'Licence'}"><strong>${money(setup)}</strong>${monthly ? '' : '<span class="pt-note">licence à vie</span>'}</td>
    <td data-label="Mensuel">${monthly ? `<strong>${money(monthly)}</strong><span class="pt-note">/mois</span>` : `<span class="pt-none">Aucun</span><span class="pt-note">support optionnel ≈ ${SUPPORT}/an</span>`}</td>
    <td class="pt-cta"><a class="link-arrow" href="${productUrl(p)}"><span>Détails</span>${icon('arrow-right', { size: 16 })}</a></td>
  </tr>`;
}

export default function pricingPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Tarifs', href: '/tarifs/' },
  ]);
  const pricingFaq = faqGroups.find((g) => g.id === 'tarifs').items.filter((f) => !f.q.startsWith('Combien coûte')).concat(faqGroups.find((g) => g.id === 'installation').items.slice(1));
  const qa = faq(pricingFaq, { id: 'faq-tarifs' });

  const body = `
<section class="lhero bg-grid glow" aria-labelledby="pricing-title">
  <div class="container">
    ${bc.html}
    <div class="lhero-in reveal">
      <p class="eyebrow">Tarifs</p>
      <h1 id="pricing-title">Des tarifs clairs, <span class="grad-text">en dinars.</span></h1>
      <p class="lede">Une installation qui comprend la configuration et la formation, puis un abonnement mensuel pour les logiciels en ligne. SalonPro est une licence à vie.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="table-title">
  <div class="container">
    <h2 id="table-title" class="visually-hidden">Tarifs des logiciels</h2>
    <div class="ptable-wrap card reveal">
      <table class="ptable">
        <caption class="visually-hidden">Prix d’installation et abonnement mensuel de chaque logiciel, en dinars algériens</caption>
        <thead><tr><th scope="col">Logiciel</th><th scope="col">Installation</th><th scope="col">Abonnement mensuel</th><th scope="col"><span class="visually-hidden">Lien</span></th></tr></thead>
        <tbody>${products.map(row).join('')}</tbody>
      </table>
    </div>
    <p class="ptable-foot reveal">Prix en dinars algériens (DA). ${waButton(site.whatsappMessages.demo, 'Demander une démonstration', 'whatsapp', 'btn-sm')}</p>
  </div>
</section>

<section class="section section-alt" aria-labelledby="included-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Ce qui est compris</p><h2 id="included-title">L’installation, ce n’est pas seulement l’installation.</h2></div>
    <ul class="cap-grid reveal">${included.map((c) => `<li class="card card-line"><span class="icon-box">${icon(c.icon, { size: 22 })}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`).join('')}</ul>
    <div class="section-head reveal" style="margin-top:clamp(56px,7vw,88px)"><p class="eyebrow">Les formules</p><h2>Trois façons de payer, selon le logiciel.</h2></div>
    <ul class="cap-grid reveal">${models.map((c) => `<li class="card"><span class="icon-box">${icon(c.icon, { size: 22 })}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`).join('')}</ul>
    <p class="pricing-more reveal">${button({ href: '/sur-mesure/#projet', label: 'Demander un devis sur mesure', variant: 'secondary', iconEnd: 'arrow-right' })}</p>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="section-head reveal"><p class="eyebrow">Questions fréquentes</p><h2 id="faq-title">Tarifs et abonnement.</h2><p class="section-lede"><a class="link-arrow" href="/faq/"><span>Toutes les questions</span>${icon('arrow-right', { size: 16 })}</a></p></div>
    <div class="reveal">${qa.html}</div>
  </div>
</section>
${ctaBand({ title: 'Un doute sur le logiciel ou la formule ?', text: 'Décrivez-nous votre activité : nous vous conseillons et vous faisons une démonstration.', message: site.whatsappMessages.demo, label: 'Demander conseil', secondary: { href: '/logiciels/', label: 'Voir les logiciels' } })}`;

  return {
    id: 'pricing',
    path: '/tarifs/',
    title: 'Tarifs des logiciels FikraWeb · Prix en dinars',
    ogTitle: 'Tarifs FikraWeb · Des prix clairs, en dinars',
    description: 'Tarifs de SalonPro, GaragePro, CarRent Pro, SafarDesk, MatjarPro et CatalogPro : installation, abonnement mensuel ou licence à vie, en dinars algériens. Configuration et formation incluses.',
    jsonld: [bc.jsonld, qa.jsonld],
    body,
  };
}
