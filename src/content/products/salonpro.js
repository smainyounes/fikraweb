// SalonPro's optional yearly support price comes from src/config/products.js.
import { products } from '../../config/products.js';
import { money } from '../../components/ui.js';
const SUPPORT = money(products.find((p) => p.id === 'salonpro').pricing.supportYearly);
// SalonPro · detailed page content. Facts checked against salon-pro/SalonPro/docs/product-specification.md.
export default {
  description:
    'SalonPro vous aide à gérer vos rendez-vous, vos clients, vos prestations et votre caisse depuis une seule application.',
  seoDescription:
    'SalonPro : logiciel de gestion pour salons de coiffure, barbershops et instituts de beauté en Algérie. Rendez-vous, caisse tactile, clients, dépenses. PC Windows ou tablette Android, hors ligne, français et arabe.',
  chips: ['PC Windows', 'Tablette Android', '100 % hors ligne', 'Français · arabe'],
  heroShot: { id: 'salonpro-tableau-de-bord', label: 'SalonPro · Tableau de bord', frame: 'window' },

  audience: {
    title: 'Pensé pour les salons qui veulent tenir leurs comptes sans y passer la soirée.',
    items: [
      { title: 'Salons de coiffure', text: 'Femmes, hommes ou mixtes, avec une ou plusieurs places de travail.' },
      { title: 'Barbershops', text: 'Des passages rapides, des clients sans rendez-vous et une caisse qui tourne toute la journée.' },
      { title: 'Instituts de beauté', text: 'Soins, épilation, onglerie, maquillage : des prestations de durées et de prix différents.' },
    ],
  },

  problems: [
    { before: 'Les rendez-vous sont notés dans un cahier, et deux clientes se retrouvent à la même heure.', after: 'Le planning signale un conflit dès qu’une employée est déjà occupée sur ce créneau.' },
    { before: 'Le soir, personne ne sait exactement ce qu’il devrait y avoir dans la caisse.', after: 'À la clôture, l’argent compté est comparé au montant attendu, et l’écart s’affiche.' },
    { before: 'Les clientes qui paient « le reste la prochaine fois » sont oubliées.', after: 'Les paiements partiels sont enregistrés et le solde de chaque cliente reste visible.' },
    { before: 'Les dépenses sont mélangées avec la recette, sans vision du mois.', after: 'Dépenses par catégorie, recette encaissée et résultat estimé, sur la période choisie.' },
  ],

  modules: [
    { icon: 'calendar', title: 'Rendez-vous et planning', items: ['Planning journalier et hebdomadaire', 'Plusieurs prestations par rendez-vous', 'Employé attribué à chaque rendez-vous', 'Détection des conflits par employé', 'Horaires d’ouverture respectés', 'Statuts : en attente, confirmé, terminé, annulé, absent'] },
    { icon: 'users', title: 'Clients', items: ['Fiche cliente : téléphone, notes', 'Historique des visites et des rendez-vous', 'Total payé, panier moyen, dernière visite', 'Nombre d’absences', 'Solde restant à payer'] },
    { icon: 'monitor-smartphone', title: 'Caisse tactile', items: ['Prestations classées par catégorie', 'Rendez-vous du jour à encaisser', 'Remise, clavier à l’écran, monnaie à rendre', 'Espèces, BaridiMob, CCP, carte', 'Paiements partiels', 'Ticket imprimable'] },
    { icon: 'wallet', title: 'Ouverture et clôture de caisse', items: ['Ouverture avec un fond de caisse', 'Entrées et sorties d’argent avec leur motif', 'Clôture à l’aveugle : le montant attendu s’affiche après le comptage', 'Écart calculé automatiquement', 'Rapport de session par mode de paiement'] },
    { icon: 'chart-column', title: 'Dépenses et rapports', items: ['Dépenses par catégorie', 'Recette encaissée par période', 'Résultat d’exploitation estimé', 'Prestations les plus demandées', 'Répartition par mode de paiement', 'Taux de rendez-vous terminés, annulés, absents'] },
    { icon: 'shield-check', title: 'Utilisateurs et réglages', items: ['Rôles et permissions personnalisables', 'Chiffres financiers masqués pour certains rôles', 'Équipe (employés) sans compte obligatoire', 'Thèmes de couleurs, mode clair ou sombre', 'Sauvegardes'] },
  ],

  gallery: [
    { id: 'salonpro-planning', label: 'SalonPro · Planning', caption: 'Le planning de la semaine, par employé.' },
    { id: 'salonpro-caisse', label: 'SalonPro · Caisse', caption: 'La caisse tactile et le ticket en cours.' },
    { id: 'salonpro-cloture', label: 'SalonPro · Clôture de caisse', caption: 'La clôture, avec l’écart entre compté et attendu.' },
    { id: 'salonpro-fiche-cliente', label: 'SalonPro · Fiche cliente', caption: 'L’historique et le solde d’une cliente.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous vous montrons SalonPro avec des exemples de prestations de salon, sur place ou à distance.' },
    { title: 'Installation sur votre appareil', text: 'L’application est installée sur votre PC Windows ou votre tablette Android, puis activée pour cet appareil.' },
    { title: 'Configuration', text: 'Vos prestations, vos prix, votre équipe, vos horaires et vos couleurs sont saisis avec vous.' },
    { title: 'Formation et support', text: 'Votre équipe est formée à la caisse et au planning. Ensuite, nous restons joignables sur WhatsApp.' },
  ],

  pricingNotes: [
    'Licence à vie, activée pour un appareil : PC Windows ou tablette Android.',
    'Installation, configuration et formation incluses.',
    'Aucun abonnement mensuel : l’application fonctionne sans internet, directement sur votre appareil.',
    `Support optionnel : environ ${SUPPORT} par an.`,
  ],

  faq: [
    { q: 'SalonPro fonctionne-t-il sans internet ?', a: 'Oui. SalonPro est installé directement sur votre PC Windows ou votre tablette Android. Il fonctionne entièrement hors ligne, et vos données restent sur l’appareil.' },
    { q: 'Puis-je l’essayer avant de l’acheter ?', a: 'Oui. Nous faisons d’abord une démonstration. Une fois installée, l’application fonctionne 15 jours avant d’être activée, et vos données sont conservées après l’activation.' },
    { q: 'Existe-t-il une version pour tablette ?', a: 'Oui. SalonPro existe en application Windows pour ordinateur et en application Android pour tablette, pratique pour une caisse tactile au comptoir. Les deux fonctionnent hors ligne.' },
    { q: 'Que veut dire « licence par appareil » ?', a: 'La licence est activée pour un appareil précis : un PC ou une tablette. Si vous changez d’appareil, une nouvelle activation est nécessaire : contactez-nous.' },
    { q: 'Mes employés peuvent-ils voir la recette ?', a: 'Seulement si vous le décidez. Chaque utilisateur a un rôle, et vous choisissez les permissions de chaque rôle, dont l’accès aux chiffres financiers.' },
    { q: 'Puis-je gérer mon stock de produits ou les salaires ?', a: 'Non. SalonPro est centré sur les rendez-vous, la caisse, les clients et les dépenses. Il ne gère ni le stock, ni la paie, ni plusieurs salons. Pour un besoin spécifique, parlez-nous de développement sur mesure.' },
    { q: 'Les clientes peuvent-elles réserver en ligne ?', a: 'Non. Les rendez-vous sont saisis par le salon. SalonPro n’envoie pas non plus de rappels par SMS.' },
  ],

  related: ['garagepro', 'catalogpro', 'carrentpro'],
};
