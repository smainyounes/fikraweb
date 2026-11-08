// MatjarPro · detailed page content. Facts checked against simple-ecom/simpleEcom (Livewire admin, services).
export default {
  description:
    'MatjarPro est une boutique en ligne pensée pour la vente avec paiement à la livraison en Algérie : commande rapide, livraison par wilaya et commune, sociétés de livraison connectées et protection contre les fausses commandes.',
  seoDescription:
    'MatjarPro : boutique en ligne pour vendeurs algériens, paiement à la livraison, livraison par wilaya et commune, Yalidine et autres sociétés de livraison, commandes abandonnées, blocage des numéros, sans commission.',
  chips: ['Paiement à la livraison', '58 wilayas', 'Sans commission', 'Boutique en arabe'],
  heroShot: { id: 'matjarpro-boutique-mobile', label: 'MatjarPro · Boutique', frame: 'phone' },

  audience: {
    title: 'Pour les vendeurs qui font de la publicité et veulent moins de commandes perdues.',
    items: [
      { title: 'Vendeurs sur les réseaux sociaux', text: 'Facebook, Instagram ou TikTok, avec des clients qui commandent depuis leur téléphone.' },
      { title: 'Boutiques en ligne', text: 'Des produits avec tailles et couleurs, et une équipe qui confirme les commandes par téléphone.' },
      { title: 'Commerces qui se lancent en ligne', text: 'Une boutique à votre nom, sans dépendre d’une plateforme qui prélève un pourcentage.' },
    ],
  },

  problems: [
    { before: 'Des clients commandent avec de faux numéros ou refusent le colis à la livraison.', after: 'L’historique de chaque numéro s’affiche, et les numéros problématiques peuvent être bloqués, automatiquement ou à la main.' },
    { before: 'Chaque commande est recopiée à la main sur le site de la société de livraison.', after: 'La commande est envoyée à votre société de livraison depuis MatjarPro, et son suivi remonte dans la commande.' },
    { before: 'Les clients qui n’ont pas terminé leur commande sont perdus.', after: 'Les commandes abandonnées sont conservées pour que votre équipe puisse rappeler.' },
    { before: 'La plateforme prend un pourcentage sur chaque vente.', after: 'Aucun pourcentage n’est prélevé sur vos ventes.' },
  ],

  modules: [
    { icon: 'store', title: 'Boutique', items: ['Catalogue et catégories', 'Produits avec photos et variantes', 'Avis clients', 'Questions fréquentes et pages de conditions', 'Apparence personnalisable'] },
    { icon: 'shopping-cart', title: 'Commande rapide', items: ['Formulaire de commande sur la page produit', 'Aucun compte client à créer', 'Choix de la wilaya et de la commune', 'Prix de livraison calculé automatiquement'] },
    { icon: 'truck', title: 'Livraison', items: ['Tarifs de livraison par wilaya et par commune', 'Sociétés de livraison connectées : Yalidine, ZR Express, DHD, Maystro, plateformes Ecotrack…', 'Création des colis depuis la commande', 'Suivi des colis'] },
    { icon: 'clipboard-list', title: 'Gestion des commandes', items: ['Liste des commandes et statuts', 'Commandes abandonnées', 'Commande imprimable', 'Export des commandes', 'Export vers Google Sheets'] },
    { icon: 'shield-check', title: 'Protection contre les fausses commandes', items: ['Historique par numéro : livrées, retournées, annulées', 'Limite de commandes par numéro et par jour', 'Blocage automatique après des retours', 'Liste de numéros bloqués'] },
    { icon: 'chart-column', title: 'Publicité et notifications', items: ['Pixels Facebook et TikTok', 'Google Analytics', 'Alerte de nouvelle commande par e-mail ou Telegram', 'Plusieurs administrateurs avec leurs rôles'] },
  ],

  gallery: [
    { id: 'matjarpro-boutique-mobile', label: 'MatjarPro · Boutique', caption: 'La page produit et son formulaire de commande.', frame: 'phone' },
    { id: 'matjarpro-commandes', label: 'MatjarPro · Commandes', caption: 'Les commandes à confirmer et à expédier.' },
    { id: 'matjarpro-livraison', label: 'MatjarPro · Livraison', caption: 'Les tarifs de livraison par wilaya.' },
    { id: 'matjarpro-protection', label: 'MatjarPro · Protection', caption: 'L’historique et le blocage des numéros.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous vous montrons le parcours d’une commande, du clic du client à la livraison.' },
    { title: 'Mise en ligne', text: 'Votre boutique est installée en ligne, à votre nom.' },
    { title: 'Configuration', text: 'Produits, tarifs de livraison, compte de livraison et pixels publicitaires sont mis en place avec vous.' },
    { title: 'Formation et support', text: 'Vous et votre équipe de confirmation êtes formés, puis nous restons disponibles sur WhatsApp.' },
  ],

  pricingNotes: [
    'Installation et configuration initiale offertes, quelle que soit la formule.',
    'Formation incluse.',
    'Aucun pourcentage prélevé sur vos ventes.',
  ],

  faq: [
    { q: 'MatjarPro prend-il une commission sur mes ventes ?', a: 'Non. Vous payez l’abonnement mensuel ou l’achat en une fois, et aucun pourcentage n’est prélevé sur vos ventes.' },
    { q: 'Quelles sociétés de livraison sont prises en charge ?', a: 'MatjarPro se connecte aux sociétés de livraison algériennes via une passerelle : Yalidine, ZR Express, DHD, Maystro, les plateformes Ecotrack et d’autres. Il vous faut un compte chez la société choisie.' },
    { q: 'Mes clients doivent-ils créer un compte ?', a: 'Non. Ils commandent directement depuis la page du produit, avec leur nom, leur téléphone, leur wilaya et leur commune.' },
    { q: 'Comment MatjarPro aide-t-il contre les fausses commandes ?', a: 'Vous voyez l’historique de chaque numéro, vous pouvez limiter le nombre de commandes par jour et par numéro, et bloquer un numéro après des colis retournés.' },
    { q: 'La boutique est-elle en français ?', a: 'La boutique et l’espace de gestion sont en arabe, la langue de la plupart des acheteurs en ligne en Algérie. La langue peut être adaptée selon vos besoins : parlez-nous-en.' },
  ],

  related: ['catalogpro', 'salonpro', 'garagepro'],
};
