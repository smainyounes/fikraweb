// ============================================================================
//  FikraWeb · site configuration
//  Change contact details here only: every page, button and link is rebuilt
//  from this file by `node build.mjs`.
//  A value still in [BRACKETS] is treated as "not set": its links are hidden.
// ============================================================================

export const site = {
  name: 'FikraWeb',
  descriptor: 'Logiciels & solutions sur mesure',
  lang: 'fr',
  locale: 'fr_DZ',

  // Public address of the site, without a trailing slash (e.g. https://www.fikraweb.com).
  // Needed for canonical URLs, Open Graph and sitemap.xml.
  url: '[WEBSITE_URL]',

  contact: {
    // International format, digits only: 213 + the number without its leading 0.
    whatsapp: '213552791423',
    // How the number is displayed on the page.
    whatsappDisplay: '+213 552 79 14 23',
    email: '[EMAIL_ADDRESS]',
    city: 'Algérie',
  },

  social: {
    facebook: 'https://www.facebook.com/people/Fikra-Web/61594375614186/',
    instagram: '[INSTAGRAM_URL]',
  },

  // Default prefilled WhatsApp messages (product messages are in products.js).
  whatsappMessages: {
    general: 'Bonjour, je souhaite découvrir les logiciels FikraWeb.',
    custom: "Bonjour, j'ai un projet de logiciel sur mesure.",
    demo: 'Bonjour, je souhaite voir une démonstration.',
  },
};

export const isSet = (value) => typeof value === 'string' && value.trim() !== '' && !value.trim().startsWith('[');

export const whatsappUrl = (message = site.whatsappMessages.general) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
