// Custom development: /sur-mesure/
import { site, isSet, whatsappUrl } from '../config/site.js';
import { esc, icon, button, waButton } from '../components/ui.js';
import { breadcrumb, faq, erpFlowFigure } from '../components/sections.js';
import { capabilities, process, projectTypes, erpModules } from '../content/custom.js';

const whenCustom = [
  'Vos méthodes de travail ne rentrent dans aucun logiciel standard.',
  'Plusieurs services travaillent chacun sur leurs cahiers ou leurs fichiers Excel.',
  'Vous voulez un outil à votre nom, qui évolue avec votre entreprise.',
  'Vous devez relier des outils qui ne communiquent pas entre eux.',
];

const erpDocuments = ['Proformas', 'Bons de livraison', 'Bons de commande', 'Réceptions', 'Ordres de fabrication', 'Sorties de stock', 'Reçus de caisse', 'Présences du mois'];

const questions = [
  { q: 'Combien coûte un logiciel sur mesure ?', a: 'Il n’y a pas de prix fixe : chaque projet est chiffré selon son périmètre. Après l’analyse de votre besoin, vous recevez une proposition détaillée avec les étapes, les délais et le prix.' },
  { q: 'Faut-il un cahier des charges ?', a: 'Non. Expliquez votre activité et vos difficultés avec vos mots. Nous définissons ensemble ce que le logiciel doit faire.' },
  { q: 'Combien de temps faut-il ?', a: 'Cela dépend de l’ampleur du projet. Les délais sont fixés dans la proposition, et le développement avance par étapes que vous validez.' },
  { q: 'Puis-je commencer par une partie seulement ?', a: 'Oui. On peut commencer par le module le plus utile, puis ajouter les autres par étapes.' },
  { q: 'Que se passe-t-il après la mise en service ?', a: 'Vos équipes sont formées, et nous assurons le suivi et la maintenance du logiciel.' },
  { q: 'Un de vos logiciels existants peut-il être adapté ?', a: 'Oui, c’est souvent la solution la plus rapide : nous partons d’un de nos logiciels et l’adaptons à vos besoins. Parlez-nous de votre projet.' },
];

function form() {
  const emailSet = isSet(site.contact.email);
  return `
<form class="pform card card-glow" id="project-form" data-project-form novalidate
      data-whatsapp="${esc(site.contact.whatsapp)}" ${emailSet ? `data-email="${esc(site.contact.email)}"` : ''}>
  <div class="pform-head">
    <h3>Présentez votre projet</h3>
    <p>Vos réponses sont envoyées sur WhatsApp. Nous vous répondons pour en discuter.</p>
  </div>
  <div class="pform-grid">
    <div class="field">
      <label for="pf-name">Nom complet <span aria-hidden="true">*</span></label>
      <input id="pf-name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="pf-name-err">
      <p class="field-error" id="pf-name-err" hidden>Indiquez votre nom.</p>
    </div>
    <div class="field">
      <label for="pf-company">Entreprise <span class="field-opt">(facultatif)</span></label>
      <input id="pf-company" name="company" type="text" autocomplete="organization">
    </div>
    <div class="field">
      <label for="pf-phone">Téléphone / WhatsApp <span aria-hidden="true">*</span></label>
      <input id="pf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="05 XX XX XX XX" required aria-describedby="pf-phone-err">
      <p class="field-error" id="pf-phone-err" hidden>Indiquez un numéro de téléphone valide.</p>
    </div>
    <div class="field">
      <label for="pf-type">Type de projet <span aria-hidden="true">*</span></label>
      <div class="select"><select id="pf-type" name="type" required aria-describedby="pf-type-err">
        <option value="">Choisir…</option>
        ${projectTypes.map((t) => `<option>${esc(t)}</option>`).join('')}
      </select>${icon('chevron-down', { size: 18 })}</div>
      <p class="field-error" id="pf-type-err" hidden>Choisissez le type de projet.</p>
    </div>
    <div class="field field-full">
      <label for="pf-desc">Votre besoin <span aria-hidden="true">*</span></label>
      <textarea id="pf-desc" name="description" rows="5" required minlength="20" aria-describedby="pf-desc-hint pf-desc-err" placeholder="Votre activité, comment vous travaillez aujourd’hui, ce que le logiciel doit vous apporter…"></textarea>
      <p class="field-hint" id="pf-desc-hint">Quelques phrases suffisent. Pas besoin de termes techniques.</p>
      <p class="field-error" id="pf-desc-err" hidden>Décrivez votre besoin en quelques phrases (20 caractères minimum).</p>
    </div>
  </div>
  <div class="pform-foot">
    <button type="submit" class="btn btn-whatsapp">${icon('message-circle', { size: 18 })}<span>Envoyer sur WhatsApp</span></button>
    ${emailSet ? `<button type="button" class="btn btn-secondary" data-send-email>${icon('mail', { size: 18 })}<span>Envoyer par e-mail</span></button>` : ''}
  </div>
  <div class="pform-done" role="status" aria-live="polite" hidden>
    <p><strong>Votre message est prêt dans WhatsApp.</strong> Il ne reste qu’à l’envoyer.</p>
    <p>WhatsApp ne s’est pas ouvert ? <a href="#" data-wa-fallback target="_blank" rel="noopener">Ouvrir la conversation</a>.</p>
  </div>
  <noscript><p class="pform-noscript">Le formulaire nécessite JavaScript. Écrivez-nous directement sur <a href="${esc(whatsappUrl(site.whatsappMessages.custom))}">WhatsApp</a>.</p></noscript>
</form>`;
}

export default function customPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Développement sur mesure', href: '/sur-mesure/' },
  ]);
  const qa = faq(questions, { id: 'faq-sur-mesure' });

  const body = `
<section class="chero bg-grid glow" aria-labelledby="chero-title">
  <div class="container">
    ${bc.html}
    <div class="chero-grid">
      <div class="reveal">
        <p class="eyebrow">Développement sur mesure</p>
        <h1 id="chero-title">Un besoin spécifique ? <span class="grad-text">Nous développons la solution adaptée.</span></h1>
        <p class="lede">Chaque entreprise a ses propres processus, ses équipes et ses contraintes. Plutôt que de vous adapter à un logiciel, nous concevons le logiciel autour de votre façon de travailler.</p>
        <div class="cta-row">
          ${button({ href: '#projet', label: 'Présenter mon projet', variant: 'primary', iconEnd: 'arrow-down' })}
          ${waButton(site.whatsappMessages.custom, 'Discuter sur WhatsApp', 'secondary')}
        </div>
      </div>
      <aside class="when card card-line reveal" aria-labelledby="when-title">
        <h2 id="when-title">Le sur mesure est fait pour vous si…</h2>
        <ul>${whenCustom.map((w) => `<li>${icon('check', { size: 18 })}<span>${esc(w)}</span></li>`).join('')}</ul>
        <p class="when-note">Un de nos <a href="/logiciels/">logiciels prêts à l’emploi</a> peut aussi servir de base, puis être adapté.</p>
      </aside>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="cap-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Ce que nous développons</p><h2 id="cap-title">Des logiciels de gestion, pas des sites vitrines.</h2><p class="section-lede">Nous développons les systèmes qui font tourner une entreprise au quotidien.</p></div>
    <ul class="cap-grid reveal">${capabilities
      .map((c) => `<li class="card card-hover"><span class="icon-box">${icon(c.icon, { size: 22 })}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`)
      .join('')}</ul>
  </div>
</section>

<section class="section section-alt" aria-labelledby="steps-title">
  <div class="container">
    <div class="section-head section-head-center reveal"><p class="eyebrow">Notre méthode</p><h2 id="steps-title">Un projet mené étape par étape, avec vous.</h2></div>
    <ol class="steps6 reveal">${process
      .map((s, i) => `<li class="card card-line"><span class="steps6-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
      .join('')}</ol>
  </div>
</section>

<section class="section case" id="etude-de-cas" aria-labelledby="case-title">
  <div class="container">
    <div class="case-head reveal">
      <div><p class="eyebrow">Étude de cas · Réalisation sur mesure</p><h2 id="case-title">ERP pour un fabricant de meubles</h2></div>
      <p class="case-badge">Projet sur mesure · non commercialisé</p>
    </div>
    <div class="case-grid">
      <div class="case-story reveal">
        <div><h3>Le besoin</h3><p>Relier dans un seul système toutes les étapes de l’entreprise : l’achat des matières premières, le stock, la fabrication, la vente, la livraison, la caisse, et le suivi des employés.</p></div>
        <div><h3>La réalisation</h3><p>Un ERP conçu autour des processus de l’atelier, où chaque service travaille sur les mêmes données, avec des accès limités selon le rôle de chacun.</p></div>
        <div><h3>Ce que cela démontre</h3><p>Notre capacité à analyser une organisation complète et à livrer un système de gestion complexe, module par module.</p></div>
      </div>
      ${erpFlowFigure()}
    </div>
    <h3 class="case-sub reveal">Les modules en détail</h3>
    <div class="modules modules-4 reveal">${erpModules
      .map((m) => `<article class="module card card-line"><div class="module-head"><span class="icon-box">${icon(m.icon, { size: 22 })}</span><h3>${esc(m.title)}</h3></div><ul>${m.items.map((it) => `<li>${icon('check', { size: 16 })}<span>${esc(it)}</span></li>`).join('')}</ul></article>`)
      .join('')}</div>
    <div class="docs reveal">
      <p class="docs-title">${icon('file-text', { size: 18 })}<span>Documents imprimables</span></p>
      <ul class="chip-list">${erpDocuments.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </div>
    <p class="case-disclaimer reveal">Ce logiciel a été développé pour un client et n’est pas commercialisé. Le nom de l’entreprise et ses données ne sont pas publiés.</p>
  </div>
</section>

<section class="section section-alt project" id="projet" aria-labelledby="project-title">
  <div class="container project-grid">
    <div class="reveal">
      <p class="eyebrow">Votre projet</p>
      <h2 id="project-title">Parlons de votre projet.</h2>
      <p class="section-lede">Décrivez votre besoin en quelques lignes. Nous revenons vers vous sur WhatsApp pour en discuter, sans engagement.</p>
      <ul class="project-points">
        <li>${icon('message-circle', { size: 20 })}<span>Réponse sur WhatsApp</span></li>
        <li>${icon('file-text', { size: 20 })}<span>Proposition et devis selon votre besoin</span></li>
        <li>${icon('shield-check', { size: 20 })}<span>Développement par étapes validées</span></li>
      </ul>
      <p class="project-direct">Vous préférez écrire directement ? <a href="${esc(whatsappUrl(site.whatsappMessages.custom))}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a></p>
    </div>
    <div class="reveal">${form()}</div>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="section-head reveal"><p class="eyebrow">Questions fréquentes</p><h2 id="faq-title">Le sur mesure, concrètement.</h2></div>
    <div class="reveal">${qa.html}</div>
  </div>
</section>`;

  return {
    id: 'custom',
    path: '/sur-mesure/',
    title: 'Développement de logiciels sur mesure en Algérie · ERP, stock, production | FikraWeb',
    ogTitle: 'Développement sur mesure · Votre activité est unique, votre logiciel aussi',
    description:
      'FikraWeb développe des logiciels sur mesure pour les entreprises algériennes : ERP, gestion de stock et de production, ventes, RH et pointage, tableaux de bord et applications web. Projets chiffrés selon le besoin.',
    whatsapp: site.whatsappMessages.custom,
    jsonld: [
      bc.jsonld,
      qa.jsonld,
      { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Développement de logiciels sur mesure', provider: { '@type': 'Organization', name: site.name }, areaServed: 'DZ' },
    ],
    body,
  };
}
