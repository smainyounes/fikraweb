// Custom development: texts shared by the homepage and /sur-mesure/.
// ERP facts checked against "furniture erp/furnitureErp" (modules only: no client name, no data).

export const capabilities = [
  { icon: 'layout-dashboard', title: 'ERP et systèmes de gestion', text: 'Un seul outil pour relier achats, stock, production, ventes et finances.' },
  { icon: 'app-window', title: 'Applications internes', text: 'Les outils dont vos équipes ont besoin au quotidien, à la place des cahiers et des fichiers Excel.' },
  { icon: 'boxes', title: 'Stock et entrepôts', text: 'Entrées, sorties, plusieurs dépôts, inventaires et préparation des commandes.' },
  { icon: 'factory', title: 'Gestion de production', text: 'Nomenclatures, ordres de fabrication, consommation des matières.' },
  { icon: 'receipt', title: 'Ventes et finances', text: 'Devis, proformas, bons de livraison, encaissements, caisse et trésorerie.' },
  { icon: 'users', title: 'RH et pointage', text: 'Employés, équipes, présences, congés, paie et avances sur salaire.' },
  { icon: 'chart-column', title: 'Tableaux de bord et rapports', text: 'Les chiffres utiles de votre activité, au bon moment et pour les bonnes personnes.' },
  { icon: 'globe', title: 'Plateformes et applications web', text: 'Portails clients, espaces partenaires, plateformes en ligne sur mesure.' },
  { icon: 'workflow', title: 'Intégration et automatisation', text: 'Moins de saisies répétées : vos outils échangent leurs données automatiquement.' },
];

// The 8 capabilities shown on the homepage (short version).
export const homeCapabilities = [
  { icon: 'layout-dashboard', title: 'ERP et systèmes de gestion', text: 'Un seul outil pour relier les services de l’entreprise.' },
  { icon: 'boxes', title: 'Stock et inventaire', text: 'Entrées, sorties, dépôts et inventaires.' },
  { icon: 'factory', title: 'Gestion de production', text: 'Nomenclatures, ordres de fabrication, suivi.' },
  { icon: 'receipt', title: 'Ventes, achats et facturation', text: 'Devis, commandes, bons de livraison, factures.' },
  { icon: 'users', title: 'Employés et pointage', text: 'Présences, congés, paie et avances.' },
  { icon: 'chart-column', title: 'Tableaux de bord et rapports', text: 'Les chiffres utiles, au bon moment.' },
  { icon: 'workflow', title: 'Automatisation', text: 'Moins de saisies répétées, moins d’oublis.' },
  { icon: 'app-window', title: 'Applications web sur mesure', text: 'Plateformes internes ou ouvertes à vos clients.' },
];

export const process = [
  { title: 'Premier échange', text: 'Vous nous expliquez votre activité et ce qui vous bloque aujourd’hui. Pas besoin de cahier des charges.' },
  { title: 'Analyse et périmètre', text: 'Nous étudions vos processus avec vous et définissons précisément ce que le logiciel doit faire.' },
  { title: 'Proposition et devis', text: 'Vous recevez une proposition claire : fonctionnalités, étapes, délais et prix.' },
  { title: 'Développement par étapes', text: 'Le logiciel est construit par étapes. Vous validez chacune avant de passer à la suivante.' },
  { title: 'Tests et mise en service', text: 'Le logiciel est testé avec vos cas réels, puis installé et mis en service.' },
  { title: 'Formation et maintenance', text: 'Vos équipes sont formées, et nous assurons le suivi et la maintenance.' },
];

export const projectTypes = [
  'ERP / gestion complète de l’entreprise',
  'Gestion de stock ou d’entrepôt',
  'Gestion de production',
  'Ventes, achats et facturation',
  'RH, pointage et paie',
  'Tableaux de bord et rapports',
  'Application web ou plateforme',
  'Intégration ou automatisation',
  'Autre',
];

// ERP case study ---------------------------------------------------------------
export const erpFlow = [
  { title: 'Achats & fournisseurs', text: 'Commandes, réceptions' },
  { title: 'Stock multi-dépôts', text: 'Mouvements, inventaire' },
  { title: 'Production', text: 'Nomenclatures, ordres de fabrication' },
  { title: 'Ventes & livraisons', text: 'Proformas, bons de livraison' },
  { title: 'Caisse', text: 'Encaissements, trésorerie' },
];
export const erpPeople = [
  { title: 'Employés', text: 'Fiches, équipes' },
  { title: 'Pointage', text: 'Import de la pointeuse' },
  { title: 'Paie', text: 'Salaires, avances, congés' },
];

export const erpModules = [
  { icon: 'factory', title: 'Production', items: ['Articles et catégories', 'Nomenclatures : matières et quantités par produit', 'Ordres de fabrication imprimables', 'Consommation des matières et produits finis'] },
  { icon: 'boxes', title: 'Stock', items: ['Plusieurs dépôts', 'Mouvements de stock', 'Inventaire, avec import d’un fichier', 'Stock par article'] },
  { icon: 'truck', title: 'Achats et fournisseurs', items: ['Bons de commande', 'Réceptions de marchandises', 'Commandes à réceptionner', 'Paiements fournisseurs'] },
  { icon: 'file-text', title: 'Ventes et livraisons', items: ['Proformas', 'Bons de livraison', 'Commandes à préparer', 'Sorties de stock et livraisons'] },
  { icon: 'wallet', title: 'Caisse et trésorerie', items: ['Encaissements et reçus', 'File d’attente de la caisse', 'Comptes de trésorerie', 'Documents de caisse'] },
  { icon: 'calendar', title: 'Pointage', items: ['Import des données de la pointeuse', 'Présences journalières et mensuelles', 'Congés et jours fériés', 'Feuille de présence du mois imprimable'] },
  { icon: 'users', title: 'Employés et paie', items: ['Fiches employés et équipes', 'Calcul de la paie', 'Avances sur salaire', 'Détail de la paie par employé'] },
  { icon: 'shield-check', title: 'Pilotage et sécurité', items: ['Tableau de bord et rapports', 'Rôles et permissions', 'Journal d’audit', 'Sauvegardes et aide intégrée'] },
];
