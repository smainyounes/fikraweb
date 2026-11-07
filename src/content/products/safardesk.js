// SafarDesk · detailed page content. Facts checked against travelPro/travelPro/DEVELOPMENT.md and the routes/models.
export default {
  description:
    'SafarDesk est notre logiciel le plus complet : clients, réservations, Omra et Hajj, excursions, visas, billetterie, documents et finances, pour une ou plusieurs agences.',
  seoDescription:
    'SafarDesk : logiciel de gestion pour agences de voyages en Algérie. Omra et Hajj, groupes, affectation des chambres, voyages organisés, visas, billetterie, devis PDF, paiements, trésorerie et multi-agences.',
  chips: ['Application en ligne', 'Plusieurs agences', 'Documents PDF', 'Français · arabe'],
  heroShot: { id: 'safardesk-tableau-de-bord', label: 'SafarDesk · Tableau de bord', frame: 'browser' },

  audience: {
    title: 'Pour les agences qui gèrent des groupes, des départs et beaucoup de documents.',
    items: [
      { title: 'Agences Omra et Hajj', text: 'Pèlerins, groupes, encadrants, hôtels et chambres, saison après saison.' },
      { title: 'Agences de voyages organisés', text: 'Circuits et excursions en Algérie : départs, bus, points de prise en charge.' },
      { title: 'Agences de voyages internationaux', text: 'Forfaits, billets d’avion, hôtels, assurances et dossiers de visa.' },
    ],
  },

  problems: [
    { before: 'Les listes de pèlerins et de chambres sont refaites à la main dans Excel à chaque départ.', after: 'Les groupes, les chambres et les listes sont tenus dans SafarDesk, et les documents s’impriment directement.' },
    { before: 'On ne sait plus quelle famille a payé quoi, ni ce qu’il reste à encaisser.', after: 'Chaque paiement est affecté à une réservation, et le relevé de chaque client montre son solde.' },
    { before: 'Les dossiers de visa circulent entre les bureaux sans suivi.', after: 'Chaque dossier a sa liste de pièces à fournir et son statut.' },
    { before: 'Impossible de savoir si un départ a été rentable.', after: 'Dépenses et recettes sont rattachées au départ, avec un rapport de rentabilité.' },
  ],

  modules: [
    { icon: 'users', title: 'Clients et voyageurs', items: ['Clients, familles et entreprises', 'Catégories de clients', 'Passeports et documents des voyageurs', 'Historique des échanges', 'Relevé de compte client'] },
    { icon: 'map', title: 'Produits et devis', items: ['Forfaits et circuits', 'Programme jour par jour', 'Grilles de prix', 'Devis en PDF', 'Contrats de voyage'] },
    { icon: 'calendar', title: 'Réservations', items: ['Voyageurs de la réservation', 'Vols, hôtels, assurances et billets', 'Prestations et remises', 'Statuts et historique'] },
    { icon: 'building-2', title: 'Omra et Hajj', items: ['Départs et forfaits Omra et Hajj', 'Inscription des pèlerins', 'Listes de documents à fournir', 'Groupes et encadrants', 'Hôtels et types de chambres', 'Affectation des chambres, avec contrôle de la capacité'] },
    { icon: 'bus', title: 'Voyages organisés', items: ['Destinations et départs programmés', 'Capacité des départs', 'Bus et passagers par bus', 'Points de prise en charge', 'Équipe et tâches du départ', 'Manifeste imprimable et export CSV'] },
    { icon: 'plane', title: 'International', items: ['Forfaits internationaux', 'Billetterie : références PNR et billets', 'Réservations d’hôtel seules', 'Dossiers de visa et suivi du statut', 'Assurances voyage'] },
    { icon: 'wallet', title: 'Finances', items: ['Caisses et comptes bancaires', 'Transferts entre comptes', 'Paiements clients et reçus', 'Factures et remboursements', 'Factures et paiements fournisseurs', 'Dépenses et clôture de caisse'] },
    { icon: 'chart-column', title: 'Rapports et administration', items: ['Ventes, encaissements, soldes clients et fournisseurs', 'Rentabilité par départ et par activité', 'Exports CSV et PDF', 'Plusieurs agences, rôles et permissions', 'Journal d’activité', 'Guide d’utilisation intégré en français et en arabe'] },
  ],

  gallery: [
    { id: 'safardesk-tableau-de-bord', label: 'SafarDesk · Tableau de bord', caption: 'Les chiffres, les départs et les tâches de l’agence.' },
    { id: 'safardesk-chambres', label: 'SafarDesk · Affectation des chambres', caption: 'La répartition des pèlerins dans les chambres.' },
    { id: 'safardesk-reservation', label: 'SafarDesk · Réservation', caption: 'Une réservation avec ses voyageurs et ses prestations.' },
    { id: 'safardesk-finances', label: 'SafarDesk · Finances', caption: 'Paiements, caisses et soldes.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous parcourons avec vous les activités de votre agence : Omra, circuits, international.' },
    { title: 'Mise en ligne', text: 'SafarDesk est installé en ligne pour votre agence, accessible depuis vos différents bureaux.' },
    { title: 'Configuration', text: 'Agences, utilisateurs, rôles, produits, hôtels et documents sont mis en place avec vous.' },
    { title: 'Formation et support', text: 'Chaque équipe est formée sur ses écrans. Un guide intégré et notre support WhatsApp prennent ensuite le relais.' },
  ],

  pricingNotes: [
    'Installation et configuration initiale incluses.',
    'Formation des équipes incluse.',
    'Abonnement mensuel nécessaire au fonctionnement du logiciel en ligne.',
    'Plusieurs agences gérées dans le même logiciel.',
  ],

  faq: [
    { q: 'SafarDesk convient-il à une petite agence ?', a: 'Oui. Vous n’utilisez que les modules dont vous avez besoin. Une agence qui ne fait que de l’Omra n’a pas à se servir des circuits ou de la billetterie.' },
    { q: 'Puis-je gérer plusieurs agences ?', a: 'Oui. Les agences sont gérées dans le même logiciel, avec des utilisateurs, des rôles et des permissions pour chacun.' },
    { q: 'Quels documents puis-je imprimer ?', a: 'Notamment les devis, contrats de voyage, factures, reçus de paiement, listes de passagers, listes de chambres, manifestes de départ, bons de commande fournisseurs et relevés clients.' },
    { q: 'Mon équipe parle surtout arabe. Est-ce un problème ?', a: 'Non. SafarDesk est disponible en français et en arabe, et son guide d’utilisation intégré aussi.' },
    { q: 'Puis-je savoir si un départ a été rentable ?', a: 'Oui. Les recettes et les dépenses d’un départ sont rattachées à ce départ, et les rapports calculent sa rentabilité.' },
  ],

  related: ['carrentpro', 'catalogpro', 'matjarpro'],
};
