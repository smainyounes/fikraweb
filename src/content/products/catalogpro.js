// CatalogPro · detailed page content. Facts checked against business-landing-pages/CatalogPro/README.md.
export default {
  description:
    'CatalogPro est un site catalogue professionnel pour présenter vos produits, avec des listes de prix personnalisées que chaque client reçoit par un lien privé.',
  seoDescription:
    'CatalogPro : site catalogue pour grossistes, fabricants et distributeurs en Algérie. Catalogue en ligne, prix publics ou masqués, listes de prix personnalisées partagées par lien privé.',
  chips: ['Site public + espace de gestion', 'Liens privés', '3 thèmes', 'Français · arabe'],
  heroShot: { id: 'catalogpro-listes-de-prix', label: 'CatalogPro · Listes de prix', frame: 'browser' },

  audience: {
    title: 'Pour les entreprises qui n’ont pas le même prix pour tous leurs clients.',
    items: [
      { title: 'Grossistes et distributeurs', text: 'Des revendeurs avec des conditions différentes, et des prix à ne pas diffuser.' },
      { title: 'Fabricants', text: 'Un catalogue à présenter aux professionnels, sans forcément afficher les prix.' },
      { title: 'Showrooms', text: 'Une vitrine en ligne à jour, avec un formulaire pour être contacté.' },
    ],
  },

  problems: [
    { before: 'Les prix partent en photo sur WhatsApp et finissent chez les concurrents.', after: 'Chaque client reçoit un lien privé vers sa propre liste de prix.' },
    { before: 'Une ancienne liste de prix circule encore des mois après.', after: 'Un lien peut expirer à une date choisie, ou être désactivé à tout moment.' },
    { before: 'Pas de site, ou un site qui n’est jamais mis à jour.', after: 'Produits, catégories et informations de l’entreprise se modifient depuis l’espace de gestion.' },
  ],

  modules: [
    { icon: 'globe', title: 'Site catalogue', items: ['Page d’accueil de l’entreprise', 'Catégories et fiches produits', 'Plusieurs thèmes visuels', 'Logo et couleurs de l’entreprise', 'Horaires, téléphones, adresse, réseaux sociaux'] },
    { icon: 'eye-off', title: 'Prix', items: ['Prix publics affichés ou masqués', 'Montants dans la devise choisie'] },
    { icon: 'file-text', title: 'Listes de prix personnalisées', items: ['Prix spécifiques par client', 'Partage par lien secret', 'Date d’expiration du lien', 'Révocation à tout moment', 'Envoi du lien par e-mail ou copie pour WhatsApp'] },
    { icon: 'mail', title: 'Contact et pages légales', items: ['Formulaire de contact', 'Messages reçus dans l’espace de gestion', 'Politique de confidentialité et conditions générales'] },
  ],

  gallery: [
    { id: 'catalogpro-accueil', label: 'CatalogPro · Site public', caption: 'La vitrine de l’entreprise et son catalogue.' },
    { id: 'catalogpro-produit', label: 'CatalogPro · Fiche produit', caption: 'La fiche d’un produit publié.' },
    { id: 'catalogpro-listes-de-prix', label: 'CatalogPro · Listes de prix', caption: 'Les listes de prix et l’état de leurs liens.' },
    { id: 'catalogpro-liste-client', label: 'CatalogPro · Liste reçue par un client', caption: 'Ce que voit le client en ouvrant son lien.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous vous montrons le site public et la création d’une liste de prix pour un client.' },
    { title: 'Mise en ligne', text: 'Votre site catalogue est installé en ligne, à votre nom.' },
    { title: 'Configuration', text: 'Thème, couleurs, logo, catégories et produits sont mis en place avec vous.' },
    { title: 'Formation et support', text: 'Vous apprenez à ajouter vos produits et à envoyer vos listes de prix, puis nous restons disponibles sur WhatsApp.' },
  ],

  pricingNotes: [
    'Installation et configuration initiale incluses.',
    'Formation incluse.',
    'Abonnement mensuel nécessaire au fonctionnement du site en ligne.',
  ],

  faq: [
    { q: 'Un client peut-il voir les prix d’un autre client ?', a: 'Non. Chaque liste de prix a son propre lien secret, et vous pouvez faire expirer ou désactiver un lien à tout moment.' },
    { q: 'Puis-je cacher les prix sur le site public ?', a: 'Oui. Les prix du catalogue peuvent être affichés à tous ou masqués : vos clients ne voient alors que les prix de leur liste.' },
    { q: 'Comment j’envoie une liste de prix ?', a: 'Vous copiez le lien et l’envoyez sur WhatsApp, ou vous l’envoyez par e-mail depuis CatalogPro si l’envoi d’e-mails est configuré.' },
    { q: 'Le site est-il disponible en arabe ?', a: 'Le site public est disponible en français et en arabe. L’espace de gestion est en français.' },
  ],

  related: ['matjarpro', 'garagepro', 'safardesk'],
};
