// Contact: /contact/
import { site, isSet, whatsappUrl } from '../config/site.js';
import { products, productStyle } from '../config/products.js';
import { esc, icon } from '../components/ui.js';
import { breadcrumb } from '../components/sections.js';

const topics = [
  ...products.map((p) => ({ label: p.name, message: p.whatsapp, product: p })),
  { label: 'Projet sur mesure', message: site.whatsappMessages.custom },
  { label: 'Autre question', message: 'Bonjour, j’ai une question sur vos logiciels.' },
];

function contactForm() {
  const emailSet = isSet(site.contact.email);
  return `
<form class="pform card card-glow" id="contact-form" data-wa-form novalidate
      data-intro="Bonjour FikraWeb," data-subject="Contact"
      data-whatsapp="${esc(site.contact.whatsapp)}" ${emailSet ? `data-email="${esc(site.contact.email)}"` : ''}>
  <div class="pform-head"><h2>Envoyer un message</h2><p>Votre message s’ouvre dans WhatsApp, prêt à être envoyé.</p></div>
  <div class="pform-grid">
    <div class="field">
      <label for="cf-name">Nom <span aria-hidden="true">*</span></label>
      <input id="cf-name" name="name" data-label="Nom" type="text" autocomplete="name" required minlength="2" aria-describedby="cf-name-err">
      <p class="field-error" id="cf-name-err" hidden>Indiquez votre nom.</p>
    </div>
    <div class="field">
      <label for="cf-phone">Téléphone / WhatsApp <span aria-hidden="true">*</span></label>
      <input id="cf-phone" name="phone" data-label="Téléphone" type="tel" inputmode="tel" autocomplete="tel" placeholder="05 XX XX XX XX" required aria-describedby="cf-phone-err">
      <p class="field-error" id="cf-phone-err" hidden>Indiquez un numéro de téléphone valide.</p>
    </div>
    <div class="field field-full">
      <label for="cf-topic">Sujet <span aria-hidden="true">*</span></label>
      <div class="select"><select id="cf-topic" name="topic" data-label="Sujet" data-subject-field required aria-describedby="cf-topic-err">
        <option value="">Choisir…</option>
        ${topics.map((t) => `<option>${esc(t.label)}</option>`).join('')}
      </select>${icon('chevron-down', { size: 18 })}</div>
      <p class="field-error" id="cf-topic-err" hidden>Choisissez un sujet.</p>
    </div>
    <div class="field field-full">
      <label for="cf-msg">Message <span aria-hidden="true">*</span></label>
      <textarea id="cf-msg" name="message" data-label="Message" data-block rows="5" required minlength="10" aria-describedby="cf-msg-err"></textarea>
      <p class="field-error" id="cf-msg-err" hidden>Écrivez votre message (10 caractères minimum).</p>
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
  <noscript><p class="pform-noscript">Le formulaire nécessite JavaScript. Écrivez-nous directement sur <a href="${esc(whatsappUrl())}">WhatsApp</a>.</p></noscript>
</form>`;
}

export default function contactPage() {
  const bc = breadcrumb([
    { label: 'Accueil', href: '/' },
    { label: 'Contact', href: '/contact/' },
  ]);
  const c = site.contact;
  const channels = [
    isSet(c.email) ? { icon: 'mail', label: 'E-mail', value: c.email, href: `mailto:${c.email}` } : null,
    isSet(site.social.facebook) ? { icon: 'facebook', label: 'Facebook', value: 'Page FikraWeb', href: site.social.facebook, ext: true } : null,
    isSet(site.social.instagram) ? { icon: 'instagram', label: 'Instagram', value: 'FikraWeb', href: site.social.instagram, ext: true } : null,
    isSet(site.url) ? { icon: 'globe', label: 'Site', value: site.url.replace(/^https?:\/\//, ''), href: site.url } : null,
  ].filter(Boolean);

  const body = `
<section class="lhero bg-grid glow" aria-labelledby="contact-title">
  <div class="container">
    ${bc.html}
    <div class="lhero-in reveal">
      <p class="eyebrow">Contact</p>
      <h1 id="contact-title">Parlons de <span class="grad-text">votre activité.</span></h1>
      <p class="lede">Une question, une démonstration, un projet : le plus simple est de nous écrire sur WhatsApp.</p>
    </div>
  </div>
</section>

<section class="section" aria-label="Nous contacter">
  <div class="container contact-grid">
    <div class="contact-side reveal">
      <a class="wa-card card card-glow" href="${esc(whatsappUrl())}" target="_blank" rel="noopener">
        <span class="wa-card-icon">${icon('message-circle', { size: 28 })}</span>
        <span class="wa-card-label">WhatsApp</span>
        <strong class="wa-card-number"><bdi dir="ltr">${esc(c.whatsappDisplay)}</bdi></strong>
        <span class="wa-card-cta">Écrire maintenant ${icon('arrow-right', { size: 16 })}</span>
      </a>
      <div class="topics">
        <h2>Écrire directement à propos de…</h2>
        <ul>${topics
          .map((t) => `<li${t.product ? ` ${productStyle(t.product)}` : ''}><a href="${esc(whatsappUrl(t.message))}" target="_blank" rel="noopener">${t.product ? '<span class="pm-dot" aria-hidden="true"></span>' : icon(t.label.startsWith('Projet') ? 'layout-dashboard' : 'message-circle', { size: 16 })}<span>${esc(t.label)}</span>${icon('arrow-right', { size: 14, cls: 'topic-arrow' })}</a></li>`)
          .join('')}</ul>
      </div>
      ${channels.length
        ? `<ul class="channels">${channels.map((ch) => `<li><a href="${esc(ch.href)}"${ch.ext ? ' target="_blank" rel="noopener"' : ''}>${icon(ch.icon, { size: 18 })}<span><small>${esc(ch.label)}</small>${esc(ch.value)}</span></a></li>`).join('')}</ul>`
        : ''}
      <p class="contact-zone">${icon('map-pin', { size: 16 })}<span>${esc(c.city)} · Démonstration sur place ou à distance</span></p>
    </div>
    <div class="reveal">${contactForm()}</div>
  </div>
</section>`;

  return {
    id: 'contact',
    path: '/contact/',
    title: 'Contact · FikraWeb',
    ogTitle: 'Contacter FikraWeb',
    description: 'Contactez FikraWeb sur WhatsApp pour une démonstration de nos logiciels de gestion ou pour un projet de logiciel sur mesure.',
    jsonld: [bc.jsonld, { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact FikraWeb' }],
    body,
  };
}
