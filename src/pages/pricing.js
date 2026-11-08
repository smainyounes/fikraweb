// Pricing: /tarifs/ — every price comes from src/config/products.js.
import { site } from '../config/site.js';
import { products, productUrl, productStyle } from '../config/products.js';
import { esc, icon, money, button, waButton } from '../components/ui.js';
import { breadcrumb, faq, ctaBand } from '../components/sections.js';
import { faqGroups } from '../content/faq.js';

const SUPPORT = money(products.find((p) => p.id === 'salonpro').pricing.yearly);

const included = [
  { icon: 'settings', title: 'Installation et configuration', text: 'Nous installons le logiciel et le configurons avec vos informations : prestations, produits, prix, employés, paramètres.' },
  { icon: 'sliders-horizontal', title: 'À votre image', text: 'Le nom de votre entreprise, votre logo et vos réglages sont configurés pour vous.' },
  { icon: 'graduation-cap', title: 'Formation incluse', text: 'Votre équipe est formée à l’utilisation du logiciel au moment de l’installation.' },
];

const models = [
  { icon: 'calendar', title: 'Abonnement mensuel', text: 'Vous commencez sans frais d’installation et vous payez chaque mois. Hébergement, mises à jour et assistance sont compris.' },
  { icon: 'wallet', title: 'Achat en une fois', text: `Une licence à vie, payée une seule fois. Pour les logiciels en ligne, la première année d’hébergement est comprise, puis un forfait annuel couvre l’hébergement, les mises à jour et l’assistance. Pour SalonPro, le support est optionnel : ${SUPPORT} par an.` },
  { icon: 'layout-dashboard', title: 'Sur mesure', text: 'Les logiciels sur mesure et les fonctionnalités supplémentaires sont chiffrés sur devis, selon le périmètre du projet.' },
];

function row(p) {
  const { monthly, once, yearly, yearlyOptional } = p.pricing;
  return `<tr ${productStyle(p)}>
    <th scope="row"><a href="${productUrl(p)}"><span class="pm-dot" aria-hidden="true"></span><span class="pt-name">${esc(p.name)}</span></a><span class="pt-ind">${esc(p.industryShort)}</span></th>
    <td data-label="Abonnement mensuel"><strong>${money(monthly)}</strong><span class="pt-note">/mois</span></td>
    <td data-label="Achat en une fois"><strong>${money(once)}</strong><span class="pt-note">licence à vie</span></td>
    <td data-label="Après achat"><strong>${money(yearly)}</strong><span class="pt-note">${yearlyOptional ? '/an, optionnel' : '/an, dès la 2e année'}</span></td>
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
      <p class="lede">Aucun frais d’installation. Chaque logiciel se paie au choix : chaque mois, ou en une seule fois. Installation, configuration et formation sont offertes dans les deux cas.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="table-title">
  <div class="container">
    <h2 id="table-title" class="visually-hidden">Tarifs des logiciels</h2>
    <div class="ptable-wrap card reveal">
      <table class="ptable">
        <caption class="visually-hidden">Abonnement mensuel, prix d’achat en une fois et forfait annuel de chaque logiciel, en dinars algériens</caption>
        <thead><tr><th scope="col">Logiciel</th><th scope="col">Abonnement mensuel</th><th scope="col">Achat en une fois</th><th scope="col">Après achat</th><th scope="col"><span class="visually-hidden">Lien</span></th></tr></thead>
        <tbody>${products.map(row).join('')}</tbody>
      </table>
    </div>
    <p class="ptable-foot reveal">Prix en dinars algériens (DA). ${waButton(site.whatsappMessages.demo, 'Demander une démonstration', 'whatsapp', 'btn-sm')}</p>
  </div>
</section>

<section class="section section-alt" aria-labelledby="included-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Offert avec chaque logiciel</p><h2 id="included-title">Pas de frais d’installation, et tout est compris.</h2></div>
    <ul class="cap-grid reveal">${included.map((c) => `<li class="card card-line"><span class="icon-box">${icon(c.icon, { size: 22 })}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`).join('')}</ul>
    <div class="section-head reveal" style="margin-top:clamp(56px,7vw,88px)"><p class="eyebrow">Les formules</p><h2>Deux façons de payer, au choix.</h2></div>
    <ul class="cap-grid reveal">${models.map((c) => `<li class="card"><span class="icon-box">${icon(c.icon, { size: 22 })}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`).join('')}</ul>
    <p class="pricing-more reveal">${button({ href: '/sur-mesure/#projet', label: 'Demander un devis sur mesure', variant: 'secondary', iconEnd: 'arrow-right' })}</p>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="section-head reveal"><p class="eyebrow">Questions fréquentes</p><h2 id="faq-title">Tarifs et paiement.</h2><p class="section-lede"><a class="link-arrow" href="/faq/"><span>Toutes les questions</span>${icon('arrow-right', { size: 16 })}</a></p></div>
    <div class="reveal">${qa.html}</div>
  </div>
</section>
${ctaBand({ title: 'Un doute sur le logiciel ou la formule ?', text: 'Décrivez-nous votre activité : nous vous conseillons et vous faisons une démonstration.', message: site.whatsappMessages.demo, label: 'Demander conseil', secondary: { href: '/logiciels/', label: 'Voir les logiciels' } })}`;

  return {
    id: 'pricing',
    path: '/tarifs/',
    title: 'Tarifs des logiciels FikraWeb · Prix en dinars',
    ogTitle: 'Tarifs FikraWeb · Des prix clairs, en dinars',
    description: 'Tarifs de SalonPro, GaragePro, CarRent Pro, SafarDesk, MatjarPro et CatalogPro en dinars algériens : abonnement mensuel ou achat en une fois, sans frais d’installation. Configuration et formation offertes.',
    jsonld: [bc.jsonld, qa.jsonld],
    body,
  };
}
