import { site } from '../config/site.js';
import { products, productUrl, productStyle, lowestSetup } from '../config/products.js';
import { esc, icon, money, button, waButton, arrowLink, screenshot, price, wa } from '../components/ui.js';

const byId = Object.fromEntries(products.map((p) => [p.id, p]));

// ---------------------------------------------------------------- content
const strengths = [
  { icon: 'map-pin', title: 'Développé en Algérie', text: 'Des logiciels conçus ici, pour la façon dont les entreprises algériennes travaillent réellement.' },
  { icon: 'languages', title: 'Français et arabe', text: 'Selon le logiciel, l’interface de gestion ou le site public sont disponibles dans les deux langues.' },
  { icon: 'sliders-horizontal', title: 'Adapté aux méthodes locales', text: 'Montants en dinars, paiements partiels, soldes clients : les habitudes du terrain sont prévues.' },
  { icon: 'settings', title: 'Installation personnalisée', text: 'Nous installons et configurons le logiciel avec votre nom, votre logo et vos paramètres.' },
  { icon: 'graduation-cap', title: 'Formation et accompagnement', text: 'Votre équipe est formée à l’utilisation, pour démarrer rapidement et sans erreur.' },
  { icon: 'headset', title: 'Support local sur WhatsApp', text: 'Une question, un blocage ? Vous écrivez directement à l’équipe qui a conçu le logiciel.' },
];

const capabilities = [
  { icon: 'layout-dashboard', title: 'ERP et systèmes de gestion', text: 'Un seul outil pour relier les services de l’entreprise.' },
  { icon: 'boxes', title: 'Stock et inventaire', text: 'Entrées, sorties, dépôts et inventaires.' },
  { icon: 'factory', title: 'Gestion de production', text: 'Nomenclatures, ordres de fabrication, suivi.' },
  { icon: 'receipt', title: 'Ventes, achats et facturation', text: 'Devis, commandes, bons de livraison, factures.' },
  { icon: 'users', title: 'Employés et pointage', text: 'Présences, congés, paie et avances.' },
  { icon: 'chart-column', title: 'Tableaux de bord et rapports', text: 'Les chiffres utiles, au bon moment.' },
  { icon: 'workflow', title: 'Automatisation', text: 'Moins de saisies répétées, moins d’oublis.' },
  { icon: 'app-window', title: 'Applications web sur mesure', text: 'Plateformes internes ou ouvertes à vos clients.' },
];

const erpFlow = [
  { title: 'Achats & fournisseurs', text: 'Commandes, réceptions' },
  { title: 'Stock multi-dépôts', text: 'Mouvements, inventaire' },
  { title: 'Production', text: 'Nomenclatures, ordres de fabrication' },
  { title: 'Ventes & livraisons', text: 'Proformas, bons de livraison' },
  { title: 'Caisse', text: 'Encaissements, trésorerie' },
];
const erpPeople = [
  { title: 'Employés', text: 'Fiches, équipes' },
  { title: 'Pointage', text: 'Import de la pointeuse' },
  { title: 'Paie', text: 'Salaires, avances, congés' },
];

const steps = [
  { icon: 'lightbulb', title: 'Découverte', text: 'Nous prenons le temps de comprendre votre activité, votre organisation et ce qui vous fait perdre du temps aujourd’hui.' },
  { icon: 'presentation', title: 'Démonstration', text: 'Nous vous présentons le logiciel adapté à votre métier, ou la solution que nous proposons pour votre projet.' },
  { icon: 'rocket', title: 'Installation ou développement', text: 'Nous configurons le logiciel avec vos informations, ou nous développons le système demandé, étape par étape.' },
  { icon: 'life-buoy', title: 'Formation & support', text: 'Nous formons votre équipe et restons disponibles sur WhatsApp pour vous accompagner au quotidien.' },
];

// ---------------------------------------------------------------- sections
const hero = () => `
<section class="hero bg-grid glow" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy reveal">
      <p class="eyebrow">${esc(site.descriptor)}</p>
      <h1 id="hero-title">Des logiciels qui <span class="grad-text">simplifient votre activité.</span></h1>
      <p class="lede">FikraWeb conçoit des logiciels de gestion prêts à l’emploi et développe des solutions sur mesure pour aider les entreprises à mieux organiser leur activité, maîtriser leurs opérations et gagner du temps.</p>
      <div class="cta-row">
        ${button({ href: '#logiciels', label: 'Découvrir nos logiciels', variant: 'primary', iconEnd: 'arrow-down' })}
        ${button({ href: '#sur-mesure', label: 'Un projet sur mesure ?', variant: 'secondary' })}
      </div>
      <p class="hero-note">${icon('message-circle', { size: 16 })}<span>Démonstration sur demande, directement sur <a href="${esc(wa(site.whatsappMessages.demo))}" target="_blank" rel="noopener">WhatsApp</a>.</span></p>
    </div>
    <div class="hero-stage reveal" aria-hidden="true">
      ${screenshot({ id: 'safardesk-tableau-de-bord', label: 'SafarDesk · Tableau de bord', frame: 'browser' }, { product: byId.safardesk, cls: 'stage-1', eager: true })}
      ${screenshot({ id: 'salonpro-planning', label: 'SalonPro · Planning', frame: 'window' }, { product: byId.salonpro, cls: 'stage-2', eager: true })}
      ${screenshot({ id: 'matjarpro-boutique-mobile', label: 'MatjarPro', frame: 'phone' }, { product: byId.matjarpro, cls: 'stage-3', compact: true, eager: true })}
    </div>
  </div>
  <div class="container">
    <nav class="product-strip" aria-label="Nos six logiciels">
      <ol>${products
        .map(
          (p, i) =>
            `<li ${productStyle(p)}><a href="${productUrl(p)}"><span class="ps-n">${String(i + 1).padStart(2, '0')}</span><span class="ps-name">${esc(p.name)}</span><span class="ps-ind">${esc(p.industryShort)}</span></a></li>`,
        )
        .join('')}</ol>
    </nav>
  </div>
</section>`;

const twoWays = () => `
<section class="section two-ways" aria-labelledby="two-ways-title">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Deux façons de travailler avec nous</p>
      <h2 id="two-ways-title">Un logiciel prêt à l’emploi, ou un logiciel construit pour vous.</h2>
    </div>
    <div class="ways reveal">
      <article class="way card card-hover">
        <p class="way-n">01</p>
        <h3>Logiciels prêts à l’emploi</h3>
        <p>Six logiciels conçus pour des métiers précis : salons, garages, location de voitures, agences de voyages, e-commerce et grossistes. Installés, configurés avec vos informations, et prêts à l’emploi.</p>
        <ul class="way-tags">${products.map((p) => `<li ${productStyle(p)}>${esc(p.name)}</li>`).join('')}</ul>
        <div class="way-foot"><p class="way-price">À partir de <strong>${money(lowestSetup())}</strong></p>${arrowLink('#logiciels', 'Voir les logiciels')}</div>
      </article>
      <article class="way card card-glow">
        <p class="way-n">02</p>
        <h3>Développement sur mesure</h3>
        <p>ERP, gestion de stock, production, facturation, pointage et paie : nous concevons le logiciel autour de vos processus, de vos équipes et de vos objectifs.</p>
        <ul class="way-tags"><li>ERP</li><li>Stock</li><li>Production</li><li>Facturation</li><li>RH & paie</li><li>Tableaux de bord</li></ul>
        <div class="way-foot"><p class="way-price">Sur devis, selon votre projet</p>${arrowLink('#sur-mesure', 'Découvrir le sur mesure')}</div>
      </article>
    </div>
  </div>
</section>`;

const why = () => `
<section class="section why section-alt" aria-labelledby="why-title">
  <div class="container">
    <div class="section-head section-head-center reveal">
      <p class="eyebrow">Pourquoi FikraWeb</p>
      <h2 id="why-title">Des logiciels pensés pour le terrain algérien.</h2>
      <p class="section-lede">Pas un outil étranger à adapter : des solutions qui parlent votre langue, comptent en dinars et sont accompagnées par une équipe locale.</p>
    </div>
    <ul class="strengths reveal">${strengths
      .map((s) => `<li class="card card-hover card-line"><span class="icon-box">${icon(s.icon, { size: 22 })}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
      .join('')}</ul>
  </div>
</section>`;

const showcase = () => `
<section class="section showcase" id="logiciels" aria-labelledby="showcase-title">
  <div class="container">
    <div class="section-head section-head-split reveal">
      <div><p class="eyebrow">Logiciels prêts à l’emploi</p><h2 id="showcase-title">Six logiciels, chacun pensé pour un métier.</h2></div>
      ${arrowLink('/logiciels/', 'Voir tous les logiciels')}
    </div>
    <div class="sc reveal" data-showcase>
      ${products
        .map((p, i) => {
          const open = i === 0;
          return `
      <h3 class="sc-heading" style="--row:${i + 1}">
        <button class="sc-tab" type="button" id="sc-tab-${p.id}" aria-expanded="${open}" aria-controls="sc-panel-${p.id}" ${productStyle(p)}>
          <span class="sc-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="sc-title"><span class="sc-name">${esc(p.name)}</span><span class="sc-ind">${esc(p.industryShort)}</span></span>
          <span class="sc-price">dès ${money(p.pricing.setup)}</span>
          ${icon('chevron-down', { size: 18, cls: 'sc-chev' })}
        </button>
      </h3>
      <div class="sc-panel" id="sc-panel-${p.id}" role="region" aria-labelledby="sc-tab-${p.id}" ${productStyle(p)}${open ? '' : ' hidden'}>
        <div class="sc-panel-in">
          <p class="sc-cat">${esc(p.category)}</p>
          <p class="sc-pname">${esc(p.name)}</p>
          <p class="sc-desc">${esc(p.summary)}</p>
          <p class="sc-benefit">${icon('check', { size: 18 })}<span>${esc(p.benefit)}</span></p>
          ${screenshot(p.shot.frame === 'phone' ? { ...p.shot, frame: 'browser' } : p.shot, { product: p, cls: 'sc-shot' })}
          <div class="sc-foot">
            ${price(p)}
            <div class="sc-actions">
              ${button({ href: productUrl(p), label: `Découvrir ${esc(p.name)}`, variant: 'product', iconEnd: 'arrow-right' })}
              <a class="sc-wa" href="${esc(wa(p.whatsapp))}" target="_blank" rel="noopener">${icon('message-circle', { size: 16 })}<span>Demander une démonstration</span></a>
            </div>
          </div>
        </div>
      </div>`;
        })
        .join('')}
    </div>
  </div>
</section>`;

const custom = () => `
<section class="section custom is-dark bg-grid glow" id="sur-mesure" aria-labelledby="custom-title">
  <div class="container">
    <div class="custom-grid">
      <div class="custom-copy reveal">
        <p class="eyebrow eyebrow-light">Développement sur mesure</p>
        <h2 id="custom-title">Votre activité est unique. Votre logiciel aussi.</h2>
        <p class="section-lede">Nous concevons des applications et systèmes de gestion adaptés à vos processus, vos équipes et vos objectifs.</p>
        <p class="custom-note">Chaque projet est étudié avec vous, puis chiffré selon son périmètre. Le développement avance par étapes validées.</p>
        <div class="cta-row">
          ${waButton(site.whatsappMessages.custom, 'Discuter de mon projet', 'whatsapp')}
          ${button({ href: '/sur-mesure/', label: 'En savoir plus', variant: 'ghost-light' })}
        </div>
      </div>
      <ul class="capabilities reveal">${capabilities
        .map((c) => `<li><span class="icon-box">${icon(c.icon, { size: 20 })}</span><div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div></li>`)
        .join('')}</ul>
    </div>
  </div>
</section>`;

const caseStudy = () => `
<section class="section case section-alt" id="etude-de-cas" aria-labelledby="case-title">
  <div class="container">
    <div class="case-head reveal">
      <div>
        <p class="eyebrow">Étude de cas · Réalisation sur mesure</p>
        <h2 id="case-title">ERP pour un fabricant de meubles</h2>
      </div>
      <p class="case-badge">Projet sur mesure · non commercialisé</p>
    </div>
    <div class="case-grid">
      <div class="case-story reveal">
        <div><h3>Le besoin</h3><p>Relier dans un seul système toutes les étapes de l’entreprise : l’achat des matières premières, le stock, la fabrication, la vente, la livraison, la caisse, et le suivi des employés.</p></div>
        <div><h3>La réalisation</h3><p>Un ERP conçu autour des processus de l’atelier, où chaque service travaille sur les mêmes données, avec des accès limités selon le rôle de chacun.</p></div>
        <div><h3>Ce que cela démontre</h3><p>Notre capacité à analyser une organisation complète et à livrer un système de gestion complexe, module par module.</p></div>
        ${waButton('Bonjour, j’ai un projet de logiciel sur mesure, comparable à un ERP.', 'Un projet similaire ? Parlons-en', 'secondary')}
      </div>
      <figure class="flow reveal" aria-label="Modules de l’ERP et circulation des informations">
        <ol class="flow-row">${erpFlow
          .map((f, i) => `<li><span class="flow-n">${String(i + 1).padStart(2, '0')}</span><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></li>`)
          .join('')}</ol>
        <ol class="flow-row flow-row-people">${erpPeople
          .map((f, i) => `<li><span class="flow-n">${String(i + 6).padStart(2, '0')}</span><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></li>`)
          .join('')}</ol>
        <div class="flow-base"><strong>Rapports, rôles et permissions</strong><span>Journal d’activité · sauvegardes · aide intégrée</span></div>
        <figcaption>Les modules réalisés pour ce projet. Aucune donnée ni information du client n’est publiée.</figcaption>
      </figure>
    </div>
  </div>
</section>`;

const method = () => `
<section class="section method" aria-labelledby="method-title">
  <div class="container">
    <div class="section-head section-head-center reveal">
      <p class="eyebrow">Notre méthode</p>
      <h2 id="method-title">De la première discussion à l’utilisation au quotidien.</h2>
    </div>
    <ol class="process reveal">${steps
      .map(
        (s, i) =>
          `<li class="card card-line card-hover"><span class="icon-box">${icon(s.icon, { size: 24 })}</span><span class="process-label">Étape ${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${i < steps.length - 1 ? `<span class="process-arrow" aria-hidden="true">${icon('arrow-right', { size: 18 })}</span>` : ''}</li>`,
      )
      .join('')}</ol>
  </div>
</section>`;

const finalCta = () => `
<section class="section final-cta glow" aria-labelledby="final-title">
  <div class="container"><div class="final-inner card card-glow reveal">
    <h2 id="final-title">Prêt à mieux gérer votre activité ?</h2>
    <p class="section-lede">Choisissez un logiciel pour votre métier, ou présentez-nous votre projet. Nous vous répondons sur WhatsApp.</p>
    <div class="cta-row cta-row-center">
      ${button({ href: '/logiciels/', label: 'Découvrir nos logiciels', variant: 'primary', iconEnd: 'arrow-right' })}
      ${button({ href: '/sur-mesure/#projet', label: 'Présenter mon projet', variant: 'secondary' })}
    </div>
    <p class="final-wa">${icon('message-circle', { size: 16 })}<span>Ou écrivez-nous directement : <a href="${esc(wa(site.whatsappMessages.general))}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a></span></p>
  </div></div>
</section>`;

// ---------------------------------------------------------------- page
export default function home() {
  return {
    id: 'home',
    path: '/',
    title: 'FikraWeb · Logiciels de gestion et développement sur mesure en Algérie',
    ogTitle: 'FikraWeb · Des logiciels qui simplifient votre activité',
    description:
      'Logiciels de gestion prêts à l’emploi pour salons, garages, location de voitures, agences de voyages, e-commerce et grossistes, et développement de logiciels sur mesure en Algérie.',
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        description: 'Logiciels de gestion et développement de solutions sur mesure pour les entreprises algériennes.',
        areaServed: 'DZ',
        ...(site.url.startsWith('http') ? { url: site.url, logo: `${site.url}/assets/img/brand/icon-512.png` } : {}),
        sameAs: [site.social.facebook, site.social.instagram].filter((u) => u.startsWith('http')),
        contactPoint: { '@type': 'ContactPoint', telephone: `+${site.contact.whatsapp}`, contactType: 'sales', availableLanguage: ['French', 'Arabic'] },
      },
    ],
    body: [hero(), twoWays(), why(), showcase(), custom(), caseStudy(), method(), finalCta()].join('\n'),
  };
}
