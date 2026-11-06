// CarRent Pro · detailed page content. Facts checked against carRentPro/carRentPro/README.md.
export default {
  description:
    'CarRent Pro gère votre parc, vos réservations, vos contrats, vos cautions et vos factures, avec un site public pour présenter vos véhicules et recevoir des demandes.',
  seoDescription:
    'CarRent Pro : logiciel de gestion pour agences de location de voitures en Algérie. Parc automobile, réservations, contrats, cautions, factures, entretien et site public en français et en arabe.',
  chips: ['Application en ligne', 'Site public français · arabe', 'Contrats et factures PDF'],
  heroShot: { id: 'carrentpro-tableau-de-bord', label: 'CarRent Pro · Tableau de bord', frame: 'browser' },

  audience: {
    title: 'Pour les agences qui veulent savoir à tout moment où est chaque véhicule.',
    items: [
      { title: 'Agences de location', text: 'Quelques véhicules ou une flotte plus large, avec plusieurs employés au comptoir.' },
      { title: 'Agences avec plusieurs points de remise', text: 'Lieux de départ et de retour différents, avec leurs frais.' },
      { title: 'Agences qui veulent être visibles en ligne', text: 'Un site en français et en arabe pour présenter la flotte et recevoir des demandes.' },
    ],
  },

  problems: [
    { before: 'On vérifie la disponibilité d’une voiture en appelant l’agence ou en feuilletant un cahier.', after: 'La disponibilité est calculée à partir des réservations et de l’entretien, et un planning montre les 14 prochains jours.' },
    { before: 'Les contrats sont remplis à la main au moment de la remise des clés.', after: 'Le contrat est créé à la remise du véhicule, avec le kilométrage, et s’imprime en PDF.' },
    { before: 'Les cautions et les restes à payer se perdent entre deux rotations.', after: 'Chaque caution est suivie (encaissée, restituée ou retenue) et chaque facture affiche son solde.' },
    { before: 'Un client sans permis valide ou déjà signalé repart avec une voiture.', after: 'À la confirmation, le logiciel vérifie le permis, l’âge du conducteur et la liste des clients bloqués.' },
  ],

  modules: [
    { icon: 'car', title: 'Parc automobile', items: ['Véhicules et catégories', 'Photos des véhicules', 'Disponibilité calculée automatiquement', 'Tarifs dégressifs selon la durée', 'Kilométrage mis à jour'] },
    { icon: 'wrench', title: 'Entretien', items: ['Interventions signalées, planifiées, en cours, terminées', 'Véhicule bloqué pendant l’intervention', 'Pièces justificatives', 'Coût réel de l’entretien'] },
    { icon: 'calendar', title: 'Réservations', items: ['Planning de la flotte sur 14 jours', 'Lieux de départ et de retour', 'Remises justifiées', 'Contrôle du permis et de l’âge du conducteur', 'Clients bloqués', 'Statuts et historique'] },
    { icon: 'file-text', title: 'Contrats', items: ['Remise du véhicule avec kilométrage', 'Retour : jours de retard, carburant manquant, dommages', 'Contrat imprimable et PDF, arabe compris', 'Conditions générales personnalisables'] },
    { icon: 'receipt', title: 'Factures, paiements et cautions', items: ['Factures numérotées', 'Paiements partiels et remboursements', 'Retards de paiement signalés', 'Cautions encaissées, restituées ou retenues', 'Moyens de paiement configurables'] },
    { icon: 'globe', title: 'Site public', items: ['Présentation de l’agence en français et en arabe', 'Catalogue de véhicules (optionnel)', 'Prix affichés ou masqués', 'Demandes de réservation en ligne (optionnelles)', 'Protection contre les fausses demandes'] },
    { icon: 'shield-check', title: 'Équipe, rapports et sécurité', items: ['Comptes employés et permissions individuelles', 'Journal d’activité', 'Tableau de bord du jour', 'Rapports financiers et taux d’occupation', 'Sauvegardes quotidiennes'] },
  ],

  gallery: [
    { id: 'carrentpro-tableau-de-bord', label: 'CarRent Pro · Tableau de bord', caption: 'Départs, retours et état de la flotte aujourd’hui.' },
    { id: 'carrentpro-planning', label: 'CarRent Pro · Planning', caption: 'Le planning de la flotte sur 14 jours.' },
    { id: 'carrentpro-contrat', label: 'CarRent Pro · Contrat', caption: 'Le contrat de location, prêt à imprimer.' },
    { id: 'carrentpro-site-public', label: 'CarRent Pro · Site public', caption: 'Le catalogue de véhicules sur le site de l’agence.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous vous montrons une location complète : réservation, remise des clés, retour et facture.' },
    { title: 'Mise en ligne', text: 'CarRent Pro est installé en ligne pour votre agence, avec son site public.' },
    { title: 'Configuration', text: 'Agence, véhicules, tarifs, lieux, conditions du contrat et employés sont mis en place avec vous.' },
    { title: 'Formation et support', text: 'Votre équipe est formée au comptoir, puis nous restons disponibles sur WhatsApp.' },
  ],

  pricingNotes: [
    'Installation et configuration initiale incluses.',
    'Formation de votre équipe incluse.',
    'Abonnement mensuel nécessaire au fonctionnement du logiciel en ligne.',
    'Site public de l’agence inclus dans le logiciel.',
  ],

  faq: [
    { q: 'Mes clients peuvent-ils réserver directement en ligne ?', a: 'Ils peuvent envoyer une demande de réservation depuis votre site. La demande arrive dans CarRent Pro, et c’est votre équipe qui la transforme en réservation, ou la refuse.' },
    { q: 'L’interface de gestion est-elle en arabe ?', a: 'L’espace de gestion est en français. Le site public de votre agence est disponible en français et en arabe.' },
    { q: 'Les données de mes clients sont-elles protégées ?', a: 'Les numéros de pièce d’identité et de permis sont chiffrés et masqués à l’écran. Les afficher demande une permission, et chaque consultation est enregistrée dans le journal d’activité.' },
    { q: 'Puis-je limiter ce que voient mes employés ?', a: 'Oui. Chaque employé a ses propres permissions, et certaines actions (comme annuler une facture) restent réservées aux administrateurs.' },
    { q: 'Les retours en retard sont-ils facturés ?', a: 'Au retour du véhicule, le logiciel calcule les jours de retard, le carburant manquant et les dommages saisis. Ces frais peuvent ensuite être facturés.' },
  ],

  related: ['garagepro', 'safardesk', 'catalogpro'],
};
