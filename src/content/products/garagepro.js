// GaragePro · detailed page content. Facts checked against garagePro/garagePro (models, enums, Livewire modules).
export default {
  description:
    'GaragePro réunit l’atelier, les pièces, les devis, les factures et le site internet de votre garage dans une seule application en ligne.',
  seoDescription:
    'GaragePro : logiciel de gestion de garage automobile en Algérie. Ordres de réparation, historique des véhicules, diagnostics, pièces et stock, devis, factures et site vitrine avec demandes de rendez-vous.',
  chips: ['Accessible sur ordinateur, tablette et téléphone', 'Site vitrine inclus', 'Français · arabe'],
  heroShot: { id: 'garagepro-reparations', label: 'GaragePro · Ordres de réparation', frame: 'browser' },

  audience: {
    title: 'Pour les ateliers qui veulent savoir où en est chaque voiture, sans chercher.',
    items: [
      { title: 'Garages de mécanique générale', text: 'Entretien, réparations, plusieurs véhicules en même temps dans l’atelier.' },
      { title: 'Ateliers spécialisés', text: 'Électricité auto, diagnostic, embrayage, freinage : chaque intervention est tracée.' },
      { title: 'Garages avec vente de pièces', text: 'Un stock de pièces à suivre, et des ventes au comptoir à côté de l’atelier.' },
    ],
  },

  problems: [
    { before: 'Un client appelle pour sa voiture, et il faut aller demander à l’atelier.', after: 'Chaque ordre de réparation a un statut à jour : reçu, en diagnostic, en cours, en attente de pièces, prêt.' },
    { before: 'L’historique d’un véhicule est dispersé dans des carnets.', after: 'La fiche véhicule rassemble toutes les réparations, diagnostics et factures.' },
    { before: 'On découvre qu’une pièce manque au moment de l’utiliser.', after: 'Chaque mouvement de stock est enregistré, et un seuil minimum signale les pièces à recommander.' },
    { before: 'Les devis et factures sont écrits à la main.', after: 'Devis et factures sont préparés dans le logiciel et imprimés proprement.' },
  ],

  modules: [
    { icon: 'wrench', title: 'Atelier', items: ['Ordres de réparation', 'Suivi des statuts, de la réception à la livraison', 'Attente de l’accord du client, attente de pièces', 'Tâches attribuées aux mécaniciens', 'Priorité normale ou haute', 'Historique des réparations'] },
    { icon: 'car', title: 'Clients et véhicules', items: ['Fiche client', 'Véhicules de chaque client', 'Historique complet par véhicule', 'Diagnostics et codes défauts', 'Fiche de diagnostic imprimable'] },
    { icon: 'receipt', title: 'Devis et factures', items: ['Devis imprimables', 'Devis accepté ou refusé', 'Facturation des réparations', 'Factures imprimables', 'Paiements des clients', 'Liste des clients qui doivent encore de l’argent'] },
    { icon: 'boxes', title: 'Pièces et stock', items: ['Catalogue de pièces détachées', 'Mouvements de stock', 'Stock minimum par pièce', 'Achats auprès des fournisseurs', 'Paiements fournisseurs', 'Vente de pièces au comptoir'] },
    { icon: 'calendar', title: 'Rendez-vous', items: ['Planning des rendez-vous', 'Demandes de rendez-vous reçues depuis le site', 'Créneaux disponibles proposés en ligne', 'Conversion d’une demande en rendez-vous'] },
    { icon: 'globe', title: 'Site vitrine du garage', items: ['Pages de présentation', 'Services proposés', 'Photos de l’atelier', 'Questions fréquentes', 'Formulaire de contact et messages', 'Contenu modifiable depuis l’application'] },
    { icon: 'chart-column', title: 'Dépenses et rapports', items: ['Dépenses par catégorie : loyer, électricité, outillage…', 'Rapports d’activité', 'Comptes administrateur et employé'] },
  ],

  gallery: [
    { id: 'garagepro-reparations', label: 'GaragePro · Ordres de réparation', caption: 'Les véhicules de l’atelier et leur statut.' },
    { id: 'garagepro-vehicule', label: 'GaragePro · Fiche véhicule', caption: 'L’historique complet d’un véhicule.' },
    { id: 'garagepro-stock', label: 'GaragePro · Pièces et stock', caption: 'Le stock de pièces et les seuils minimum.' },
    { id: 'garagepro-site', label: 'GaragePro · Site du garage', caption: 'Le site vitrine et sa prise de rendez-vous.' },
  ],

  howItWorks: [
    { title: 'Démonstration', text: 'Nous vous montrons le suivi d’un véhicule, de la réception à la facture.' },
    { title: 'Mise en ligne', text: 'GaragePro est installé en ligne pour votre garage, avec votre propre espace et votre site vitrine.' },
    { title: 'Configuration', text: 'Vos informations, vos services, vos mécaniciens et votre catalogue de pièces sont mis en place avec vous.' },
    { title: 'Formation et support', text: 'Votre équipe est formée, puis nous restons disponibles sur WhatsApp.' },
  ],

  pricingNotes: [
    'Installation et configuration initiale incluses.',
    'Formation de votre équipe incluse.',
    'Abonnement mensuel nécessaire au fonctionnement du logiciel en ligne.',
    'Site vitrine du garage inclus dans le logiciel.',
  ],

  faq: [
    { q: 'Faut-il installer quelque chose sur mes ordinateurs ?', a: 'Non. GaragePro est une application en ligne : elle s’utilise depuis un navigateur, sur ordinateur, tablette ou téléphone. Une connexion internet est nécessaire.' },
    { q: 'Mes clients peuvent-ils prendre rendez-vous en ligne ?', a: 'Ils peuvent envoyer une demande de rendez-vous depuis le site vitrine du garage, en choisissant un créneau disponible. Vous la confirmez ensuite dans GaragePro.' },
    { q: 'Puis-je suivre ce que mes clients me doivent ?', a: 'Oui. Les paiements sont enregistrés sur les factures, et une liste regroupe les clients qui ont encore un montant à payer.' },
    { q: 'Le logiciel gère-t-il les pièces vendues au comptoir ?', a: 'Oui. Les ventes au comptoir sortent les pièces du stock, comme celles utilisées dans les réparations.' },
    { q: 'Le site vitrine est-il en arabe ?', a: 'Le logiciel est disponible en français et en arabe. Les textes de votre site sont modifiables depuis l’application.' },
  ],

  related: ['carrentpro', 'catalogpro', 'salonpro'],
};
