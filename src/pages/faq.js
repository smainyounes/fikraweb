// Main FAQ: /faq/
import { site } from '../config/site.js';
import { products, productUrl, productStyle } from '../config/products.js';
import { esc, icon } from '../components/ui.js';
import { breadcrumb, faq, ctaBand } from '../components/sections.js';
import { faqGroups } from '../content/faq.js';

export default function faqPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Questions fréquentes', href: '/faq/' },
  ]);
  const groups = faqGroups.map((g) => ({ ...g, rendered: faq(g.items, { id: `faq-${g.id}` }) }));
  const allItems = faqGroups.flatMap((g) => g.items);
  const jsonld = faq(allItems).jsonld;

  const body = `
<section class="lhero bg-grid glow" aria-labelledby="faq-page-title">
  <div class="container">
    ${bc.html}
    <div class="lhero-in reveal">
      <p class="eyebrow">Questions fréquentes</p>
      <h1 id="faq-page-title">Vos questions, <span class="grad-text">nos réponses.</span></h1>
      <p class="lede">Langues, fonctionnement hors ligne, installation, formation, tarifs : les réponses aux questions qu’on nous pose le plus souvent.</p>
    </div>
    <nav class="faq-nav reveal" aria-label="Thèmes">
      ${groups.map((g) => `<a class="filter" href="#${g.id}">${esc(g.title)}</a>`).join('')}
    </nav>
  </div>
</section>

<section class="section" aria-label="Questions fréquentes">
  <div class="container faq-page">
    ${groups
      .map(
        (g) => `<div class="faq-group reveal" id="${g.id}">
      <h2>${esc(g.title)}</h2>
      ${g.rendered.html}
    </div>`,
      )
      .join('')}
    <aside class="faq-products card reveal" aria-labelledby="faq-products-title">
      <h2 id="faq-products-title">Une question sur un logiciel précis ?</h2>
      <p>Chaque page produit a sa propre foire aux questions.</p>
      <ul>${products.map((p) => `<li ${productStyle(p)}><a href="${productUrl(p)}#faq-${p.id}"><span class="pm-dot" aria-hidden="true"></span>${esc(p.name)}${icon('arrow-right', { size: 16 })}</a></li>`).join('')}</ul>
    </aside>
  </div>
</section>
${ctaBand({ title: 'Vous n’avez pas trouvé votre réponse ?', text: 'Posez-nous directement votre question sur WhatsApp.', message: 'Bonjour, j’ai une question sur vos logiciels.', label: 'Poser ma question', secondary: { href: '/contact/', label: 'Nous contacter' } })}`;

  return {
    id: 'faq',
    path: '/faq/',
    title: 'Questions fréquentes · Logiciels FikraWeb',
    ogTitle: 'FikraWeb · Questions fréquentes',
    description: 'Langue arabe, fonctionnement sans Internet, installation, formation, abonnement, données séparées, démonstration : les réponses aux questions fréquentes sur les logiciels FikraWeb.',
    jsonld: [bc.jsonld, jsonld],
    body,
  };
}
