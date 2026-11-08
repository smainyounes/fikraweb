// SalonPro's optional yearly support price comes from src/config/products.js.
import { products } from '../config/products.js';
import { money } from '../components/ui.js';
const SUPPORT = money(products.find((p) => p.id === 'salonpro').pricing.yearly);
// Main FAQ (/faq/). Answers are product-specific where the products differ:
// only SalonPro works offline; languages differ per product (see src/content/products/).
export const faqGroups = [
  {
    id: 'general',
    title: 'Nos logiciels',
    items: [
      { q: 'Les logiciels sont-ils adaptés aux entreprises algériennes ?', a: 'Oui. Ils sont développés en Algérie, comptent en dinars et suivent les habitudes du terrain : paiements partiels et soldes clients dans les logiciels de gestion, BaridiMob et CCP dans SalonPro, livraison par wilaya et commune dans MatjarPro. Chaque logiciel est pensé pour un métier précis.' },
      { q: 'L’interface est-elle disponible en arabe ?', a: 'Cela dépend du logiciel. SalonPro, GaragePro et SafarDesk sont disponibles en français et en arabe. Pour CarRent Pro et CatalogPro, l’espace de gestion est en français et le site public est en français et en arabe. MatjarPro est en arabe, et sa langue peut être adaptée selon vos besoins.' },
      { q: 'Le logiciel fonctionne-t-il sans Internet ?', a: 'Seul SalonPro fonctionne entièrement hors ligne : il est installé sur votre PC Windows ou votre tablette Android. Les autres logiciels (GaragePro, CarRent Pro, SafarDesk, MatjarPro, CatalogPro) sont des applications en ligne : ils s’utilisent depuis un navigateur, sur ordinateur, tablette ou téléphone, avec une connexion Internet.' },
      { q: 'Peut-on utiliser son propre logo et ses couleurs ?', a: 'Oui. À l’installation, le logiciel est configuré avec le nom et le logo de votre entreprise. Plusieurs logiciels proposent aussi le choix des couleurs ou d’un thème, comme SalonPro et CatalogPro.' },
      { q: 'Les données de mon entreprise sont-elles séparées de celles des autres clients ?', a: 'Oui. Chaque client a sa propre installation du logiciel : vos données ne sont jamais mélangées avec celles d’une autre entreprise. Avec SalonPro, elles restent sur votre appareil.' },
    ],
  },
  {
    id: 'installation',
    title: 'Démonstration, installation et formation',
    items: [
      { q: 'Peut-on voir une démonstration avant l’achat ?', a: 'Oui. Écrivez-nous sur WhatsApp : nous vous présentons le logiciel adapté à votre activité, sur place ou à distance. SalonPro fonctionne en plus 15 jours après son installation, avant l’activation de la licence.' },
      { q: 'Comment se déroule l’installation ?', a: 'Après la démonstration, nous installons le logiciel : sur votre appareil pour SalonPro, en ligne pour les autres. Nous le configurons ensuite avec vos informations (nom, logo, prix, employés, paramètres), puis nous formons votre équipe.' },
      { q: 'Une formation est-elle incluse ?', a: 'Oui. La formation de votre équipe est offerte, quelle que soit la formule choisie. Ensuite, nous restons disponibles sur WhatsApp pour vos questions.' },
    ],
  },
  {
    id: 'tarifs',
    title: 'Tarifs et paiement',
    items: [
      { q: 'Comment peut-on payer ?', a: 'Chaque logiciel se paie au choix, sans frais d’installation : par abonnement mensuel, avec l’hébergement, les mises à jour et l’assistance compris, ou en une seule fois, avec une licence à vie.' },
      { q: 'Que se passe-t-il après un achat en une fois ?', a: `Pour les logiciels en ligne, la première année d’hébergement, de mises à jour et d’assistance est comprise. Ensuite, un forfait annuel, indiqué sur la page Tarifs, couvre ces services. SalonPro fonctionne sur votre appareil : après l’achat, le support et les mises à jour sont optionnels, pour ${SUPPORT} par an.` },
      { q: 'Combien coûte un logiciel ?', a: 'Les tarifs de chaque logiciel sont indiqués sur la page Tarifs, en dinars. Les logiciels sur mesure et les fonctionnalités supplémentaires sont chiffrés sur devis, selon le besoin.' },
    ],
  },
  {
    id: 'sur-mesure',
    title: 'Évolutions et sur mesure',
    items: [
      { q: 'Puis-je demander des fonctionnalités supplémentaires ?', a: 'Oui. Nos logiciels peuvent évoluer selon vos besoins. Chaque demande est étudiée, puis chiffrée sur devis.' },
      { q: 'Mon activité n’a pas de logiciel dans votre liste. Que faire ?', a: 'Nous développons aussi des logiciels sur mesure : ERP, gestion de stock, production, facturation, RH et pointage, applications web. Présentez-nous votre projet sur la page Développement sur mesure.' },
    ],
  },
];
