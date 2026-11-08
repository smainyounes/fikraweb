// ============================================================================
//  FikraWeb · products and prices
//  Prices are in dinars, as plain numbers. They are formatted automatically
//  ("29 000 DA") everywhere on the site. Change them here only.
//
//  Every product can be paid in two ways, with no setup fee:
//    monthly  · subscription per month: installation, training, hosting,
//               updates and assistance included.
//    once     · one-time purchase (lifetime licence).
//    yearly   · after a one-time purchase, from the 2nd year:
//               online software → hosting, updates and assistance (required);
//               SalonPro (yearlyOptional) → optional support and updates.
// ============================================================================

export const groups = [
  { id: 'etablissements', label: 'Gestion des établissements' },
  { id: 'automobile', label: 'Automobile' },
  { id: 'tourisme', label: 'Tourisme' },
  { id: 'commerce', label: 'Commerce' },
];

export const products = [
  {
    id: 'salonpro',
    name: 'SalonPro',
    slug: 'salonpro',
    group: 'etablissements',
    color: '#A63D6A', // light mode
    colorDark: '#EC7FAE', // dark mode
    industry: 'Salons de coiffure, barbershops et instituts de beauté',
    industryShort: 'Salons & barbershops',
    category: 'Logiciel de gestion pour salons de beauté',
    headline: 'Votre salon organisé. Votre caisse maîtrisée.',
    summary:
      'Rendez-vous, clients, prestations et caisse dans une seule application, sur PC Windows ou tablette Android, qui fonctionne entièrement hors ligne.',
    benefit: 'Une caisse contrôlée chaque soir, écarts compris.',
    pricing: { monthly: 1500, once: 29000, yearly: 6000, yearlyOptional: true },
    shot: { id: 'salonpro-caisse', label: 'SalonPro · Caisse', frame: 'window' },
    whatsapp: 'Bonjour, je souhaite découvrir SalonPro.',
  },
  {
    id: 'garagepro',
    name: 'GaragePro',
    slug: 'garagepro',
    group: 'automobile',
    color: '#B4501F', // light mode
    colorDark: '#F29563', // dark mode
    industry: 'Garages automobiles et ateliers de réparation',
    industryShort: 'Garages & ateliers',
    category: 'Logiciel de gestion de garage automobile',
    headline: 'Chaque véhicule a son historique. Chaque réparation est suivie.',
    summary:
      'Clients, véhicules, ordres de réparation, pièces, devis et factures, avec le site vitrine du garage.',
    benefit: "L'historique complet de chaque véhicule, en un clic.",
    pricing: { monthly: 3900, once: 69000, yearly: 12000 },
    shot: { id: 'garagepro-reparations', label: 'GaragePro · Ordres de réparation', frame: 'browser' },
    whatsapp: 'Bonjour, je souhaite découvrir GaragePro.',
  },
  {
    id: 'carrentpro',
    name: 'CarRent Pro',
    slug: 'carrent-pro',
    group: 'automobile',
    color: '#0F6E8C', // light mode
    colorDark: '#4CC3E6', // dark mode
    industry: 'Agences de location de voitures',
    industryShort: 'Location de voitures',
    category: 'Logiciel de gestion de location automobile',
    headline: 'Gérez votre flotte, vos réservations et vos contrats sans perdre le contrôle.',
    summary:
      'Parc automobile, réservations, contrats, cautions et entretien, avec un site public en français et en arabe.',
    benefit: 'Savoir à tout moment quel véhicule est disponible.',
    pricing: { monthly: 4500, once: 79000, yearly: 12000 },
    shot: { id: 'carrentpro-reservations', label: 'CarRent Pro · Réservations', frame: 'browser' },
    whatsapp: 'Bonjour, je suis intéressé par CarRent Pro.',
  },
  {
    id: 'safardesk',
    name: 'SafarDesk',
    slug: 'safardesk',
    group: 'tourisme',
    color: '#16775A', // light mode
    colorDark: '#3DD6A0', // dark mode
    industry: 'Agences de voyages, Omra et Hajj',
    industryShort: 'Voyages, Omra & Hajj',
    category: 'Logiciel de gestion pour agences de voyages',
    headline: 'Toutes vos opérations de voyage, réunies dans un seul système.',
    summary:
      'Clients, réservations, Omra et Hajj, visas, billetterie, chambres et trésorerie, pour une ou plusieurs agences.',
    benefit: "Toute l'activité de l'agence suivie au même endroit.",
    pricing: { monthly: 7900, once: 139000, yearly: 18000 },
    shot: { id: 'safardesk-reservations', label: 'SafarDesk · Réservations', frame: 'browser' },
    whatsapp: 'Bonjour, je suis intéressé par SafarDesk.',
  },
  {
    id: 'matjarpro',
    name: 'MatjarPro',
    slug: 'matjarpro',
    group: 'commerce',
    color: '#6941C6', // light mode
    colorDark: '#AE93FB', // dark mode
    industry: 'E-commerce et vente en livraison à domicile',
    industryShort: 'E-commerce',
    category: 'Solution e-commerce pour vendeurs en Algérie',
    headline: 'Votre boutique en ligne. Sans commission sur vos ventes.',
    summary:
      'Boutique en ligne pensée pour le paiement à la livraison : commande rapide, livraison par wilaya et commune, suivi des colis.',
    benefit: 'Aucun pourcentage prélevé sur vos ventes.',
    pricing: { monthly: 3500, once: 59000, yearly: 12000 },
    shot: { id: 'matjarpro-boutique', label: 'MatjarPro · Boutique', frame: 'phone' },
    whatsapp: 'Bonjour, je souhaite découvrir MatjarPro.',
  },
  {
    id: 'catalogpro',
    name: 'CatalogPro',
    slug: 'catalogpro',
    group: 'commerce',
    color: '#946200', // light mode
    colorDark: '#F5C04A', // dark mode
    industry: 'Grossistes, fabricants, distributeurs et showrooms',
    industryShort: 'Grossistes & fabricants',
    category: 'Catalogue digital pour grossistes et distributeurs',
    headline: 'Présentez vos produits. Partagez vos prix en toute confidentialité.',
    summary:
      'Site catalogue professionnel avec des listes de prix personnalisées par client, partagées par lien privé.',
    benefit: 'Chaque client voit ses prix, et seulement les siens.',
    pricing: { monthly: 2500, once: 39000, yearly: 9000 },
    shot: { id: 'catalogpro-listes-de-prix', label: 'CatalogPro · Listes de prix', frame: 'browser' },
    whatsapp: 'Bonjour, je souhaite découvrir CatalogPro.',
  },
];

// Product colour as CSS variables: --c switches between the two values with the theme.
export const productStyle = (p) => `style="--c-l:${p.color};--c-d:${p.colorDark}" data-pc`;

export const productUrl = (p) => `/logiciels/${p.slug}/`;
export const lowestMonthly = () => Math.min(...products.map((p) => p.pricing.monthly));
