// 404: /404.html (served by static hosts for unknown addresses)
import { site, whatsappUrl } from '../config/site.js';
import { esc, button } from '../components/ui.js';

export default function notFoundPage() {
  const body = `
<section class="nf bg-grid glow" aria-labelledby="nf-title">
  <div class="container nf-in reveal">
    <p class="nf-code grad-text" aria-hidden="true">404</p>
    <h1 id="nf-title">Cette page n’existe pas.</h1>
    <p class="lede">L’adresse est peut-être incorrecte, ou la page a été déplacée.</p>
    <div class="cta-row cta-row-center">
      ${button({ href: '/', label: 'Retour à l’accueil', variant: 'primary', iconEnd: 'arrow-right' })}
      ${button({ href: '/logiciels/', label: 'Voir nos logiciels', variant: 'secondary' })}
    </div>
    <p class="nf-help">Besoin d’aide ? <a href="${esc(whatsappUrl())}" target="_blank" rel="noopener">Écrivez-nous sur WhatsApp</a>.</p>
  </div>
</section>`;
  return {
    id: 'notfound',
    path: '/404.html',
    title: 'Page introuvable · FikraWeb',
    description: 'Cette page n’existe pas. Retrouvez les logiciels FikraWeb depuis l’accueil.',
    noindex: true,
    body,
  };
}
