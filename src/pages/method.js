// About / how we work: /methode/
import { site } from '../config/site.js';
import { esc, icon, button, waButton, arrowLink } from '../components/ui.js';
import { breadcrumb, ctaBand } from '../components/sections.js';

const steps = [
  { icon: 'lightbulb', title: 'Découverte', text: 'Nous commençons par comprendre votre activité : votre organisation, vos équipes, la façon dont vous travaillez aujourd’hui et ce qui vous fait perdre du temps ou de l’argent.', points: ['Échange sur place, par téléphone ou sur WhatsApp', 'Aucun document technique à préparer'] },
  { icon: 'presentation', title: 'Démonstration', text: 'Nous vous présentons le logiciel adapté à votre métier, avec des exemples proches de votre activité. Pour un projet sur mesure, nous vous présentons la solution proposée et son périmètre.', points: ['Sur place ou à distance', 'Vos questions, vos cas concrets'] },
  { icon: 'rocket', title: 'Installation ou développement', text: 'Pour un logiciel prêt à l’emploi, nous l’installons et le configurons avec vos informations. Pour un projet sur mesure, nous le développons par étapes que vous validez.', points: ['Votre nom, votre logo, vos paramètres', 'Sur mesure : étapes validées une à une'] },
  { icon: 'life-buoy', title: 'Formation & support', text: 'Nous formons votre équipe à l’utilisation du logiciel, puis nous restons disponibles pour répondre à vos questions et vous accompagner dans la durée.', points: ['Formation de l’équipe incluse', 'Support local sur WhatsApp'] },
];

const strengths = [
  { icon: 'map-pin', title: 'Développé en Algérie', text: 'Conçu ici, pour les entreprises algériennes.' },
  { icon: 'languages', title: 'Français et arabe', text: 'Selon le logiciel, l’interface ou le site public.' },
  { icon: 'sliders-horizontal', title: 'Pratiques locales', text: 'Pensé pour les habitudes commerciales du terrain.' },
  { icon: 'wallet', title: 'Paiements en dinars', text: 'Tous les montants sont gérés en DA.' },
  { icon: 'receipt', title: 'Paiements partiels et soldes', text: 'Le reste à payer de chaque client reste visible.' },
  { icon: 'shield-check', title: 'Utilisateurs et permissions', text: 'Chaque employé n’accède qu’à ce qui le concerne.' },
  { icon: 'settings', title: 'Installation personnalisée', text: 'Configuré avec vos informations et vos réglages.' },
  { icon: 'graduation-cap', title: 'Formation incluse', text: 'Votre équipe est formée dès l’installation.' },
  { icon: 'headset', title: 'Support local', text: 'Une équipe joignable directement sur WhatsApp.' },
  { icon: 'workflow', title: 'Évolution et personnalisation', text: 'Le logiciel peut évoluer avec vos besoins.' },
];

export default function methodPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Notre méthode', href: '/methode/' },
  ]);

  const body = `
<section class="lhero bg-grid glow" aria-labelledby="method-title">
  <div class="container">
    ${bc.html}
    <div class="lhero-in reveal">
      <p class="eyebrow">À propos · Notre méthode</p>
      <h1 id="method-title">Des logiciels qui aident les entreprises <span class="grad-text">à mieux fonctionner.</span></h1>
      <p class="lede">FikraWeb conçoit des logiciels de gestion pour les entreprises algériennes. Nous ne faisons pas que des sites internet : nous construisons les outils qui organisent l’activité au quotidien.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="two-title">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Ce que nous faisons</p><h2 id="two-title">Deux activités, un même objectif.</h2><p class="section-lede">Vous faire gagner du temps, éviter les erreurs et vous donner une vision claire de votre activité.</p></div>
    <div class="ways reveal">
      <article class="way card card-hover">
        <p class="way-n">01</p>
        <h3>Des logiciels prêts à l’emploi</h3>
        <p>Six logiciels conçus pour des métiers précis : salons de beauté, garages, location de voitures, agences de voyages, e-commerce, grossistes et fabricants. Ils sont installés, configurés et accompagnés d’une formation.</p>
        <div class="way-foot"><span class="way-price">Tarifs publics, en dinars</span>${arrowLink('/logiciels/', 'Voir les logiciels')}</div>
      </article>
      <article class="way card card-glow">
        <p class="way-n">02</p>
        <h3>Des logiciels sur mesure</h3>
        <p>ERP, gestion de stock et de production, facturation, RH et pointage, applications web : quand aucun logiciel standard ne convient, nous développons celui qui correspond à vos processus.</p>
        <div class="way-foot"><span class="way-price">Sur devis, selon le projet</span>${arrowLink('/sur-mesure/', 'Le sur mesure')}</div>
      </article>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="steps-title">
  <div class="container">
    <div class="section-head section-head-center reveal"><p class="eyebrow">Comment nous travaillons</p><h2 id="steps-title">Quatre étapes, de la découverte à l’accompagnement.</h2></div>
    <ol class="msteps reveal">${steps
      .map(
        (s, i) => `<li class="mstep card card-line">
        <div class="mstep-head"><span class="icon-box">${icon(s.icon, { size: 24 })}</span><span class="process-label">Étape ${String(i + 1).padStart(2, '0')}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <ul>${s.points.map((pt) => `<li>${icon('check', { size: 16 })}<span>${esc(pt)}</span></li>`).join('')}</ul>
      </li>`,
      )
      .join('')}</ol>
    <p class="method-link reveal">Pour un projet sur mesure, le développement suit <a href="/sur-mesure/">six étapes détaillées</a>, de l’analyse à la maintenance.</p>
  </div>
</section>

<section class="section" aria-labelledby="why-title">
  <div class="container">
    <div class="section-head section-head-center reveal"><p class="eyebrow">Pourquoi FikraWeb</p><h2 id="why-title">Ce qui distingue nos logiciels.</h2></div>
    <ul class="why10 reveal">${strengths.map((s) => `<li><span class="icon-box">${icon(s.icon, { size: 20 })}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join('')}</ul>
    <p class="why10-note reveal">Les fonctionnalités exactes varient d’un logiciel à l’autre : chaque page produit les détaille.</p>
  </div>
</section>

<section class="section section-alt" aria-labelledby="rel-title">
  <div class="container">
    <div class="values card card-glow reveal">
      <div>
        <p class="eyebrow">Notre engagement</p>
        <h2 id="rel-title">Une relation dans la durée.</h2>
      </div>
      <p>Un logiciel de gestion s’utilise tous les jours, pendant des années. C’est pourquoi nous restons proches de nos clients après l’installation : nous répondons à leurs questions, nous les aidons à tirer le meilleur du logiciel et nous le faisons évoluer avec leur activité.</p>
    </div>
  </div>
</section>
${ctaBand({ title: 'Parlons de votre activité.', text: 'Un logiciel prêt à l’emploi ou un projet sur mesure : écrivez-nous sur WhatsApp.', message: site.whatsappMessages.general, label: 'Écrire sur WhatsApp', secondary: { href: '/contact/', label: 'Nous contacter' } })}`;

  return {
    id: 'method',
    path: '/methode/',
    title: 'À propos de FikraWeb · Notre méthode de travail',
    ogTitle: 'FikraWeb · Notre méthode : découverte, démonstration, installation, formation',
    description: 'FikraWeb conçoit des logiciels de gestion prêts à l’emploi et développe des logiciels sur mesure pour les entreprises algériennes. Découvrez notre méthode, de la découverte au support.',
    jsonld: [bc.jsonld],
    body,
  };
}
