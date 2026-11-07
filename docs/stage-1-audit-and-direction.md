# FikraWeb redesign: Stage 1 (audit and design direction)

Status: **approved, with changes** (see "Decisions" below).
The visual direction can be seen in [design-direction.html](design-direction.html). Its logo section is out of date: the existing logo is kept.

## Decisions (after review)

- **Logo:** the existing FikraWeb logo is kept (horizontal version + square profile version). The redesign proposed in §4.1 is dropped. The site uses the logo on the navy header and footer, where it was designed to sit. The header uses a copy with the old baseline ("Votre idée, notre code") removed, because it is unreadable at header size. The favicon is the F mark from the square logo.
- **Colours:** left to the designer. The palette in §4.2 is used. Logo colours may be adjusted by the owner later.
- **Product showcase:** approved.
- **Screenshot slots:** kept. The owner will add real screenshots later.
- **Hour packs:** removed. **English version:** dropped. **Build script:** approved.
- **Contact:** the existing WhatsApp number and Facebook page are used in `src/config/site.js`. E-mail, Instagram and the site URL are still placeholders.

---

## 1. Audit of the current site

### What exists

| Item | Finding |
|---|---|
| Files | `index.html` (one page, ~66 KB) and `fikra logo.webp` (1629×495 raster). Git repo with 3 commits. |
| Stack | Tailwind loaded from the **Play CDN** (`cdn.tailwindcss.com`, which Tailwind says is not for production), Lucide icons from `unpkg.com/lucide@latest` (unpinned version), Google Fonts (Inter, JetBrains Mono, Cairo). No build step. |
| Languages | FR / EN / AR switcher done in JavaScript (`setLang`, `data-i18n` keys). Search engines only see the French HTML. |
| Offer | "Development as time": hour packs (Starter 20 h · 18 000 DA, Standard 40 h · 32 000 DA, Pro 80 h · 58 000 DA). There is no mention of the six software products. |
| Look | Dark "developer terminal" theme: code editor mockup, `> idea.status = READY_TO_BUILD`, error codes, grid background, cyan→purple gradient, tech badges (PHP, Laravel, Livewire, MySQL). |
| Contact | A real WhatsApp number (8 links) and a real Facebook page. The contact form fields have **no submit handling**, so messages go nowhere. |
| SEO | One title and description, no Open Graph tags, no structured data, no sitemap. |

### What conflicts with the new brief

- **The positioning is the opposite of the brief.** It speaks to people with "an idea" (freelancer/MVP), in developer language, and shows the technologies. The new audience is business owners who use notebooks and Excel.
- **The hour packs are fixed custom-development prices.** The brief says custom projects are quoted case by case, so the packs will be removed.
- **The terminal/code aesthetic** (and the `>` chevron in the logo) is exactly the "code bracket" imagery the brief rules out.
- **English** is not in the brief: French now, Arabic later. EN will be dropped.
- **The form doesn't work.**

### What I will keep

- The **name FikraWeb** and the **existing WhatsApp number and Facebook page** (moved into the central config; see question 3 in §8).
- The good parts of the existing approach: a static site, WhatsApp as the main channel, and translation keys in mind for Arabic.
- Git history: the new site replaces the old one in the same repo, so the old version stays recoverable.

### The existing logo

It's a raster file (no vector), the "Fikra" text is white and only works on dark backgrounds, the gradient conflicts with a restrained palette, and the icon is an F with a code chevron `>`. **Recommendation: redesign it** as a clean wordmark plus an independent icon (proposal in §4.1).

---

## 2. Sitemap

```
/                               Accueil
/logiciels/                     Nos logiciels (grouped by industry)
/logiciels/salonpro/            SalonPro
/logiciels/garagepro/           GaragePro
/logiciels/carrent-pro/         CarRent Pro
/logiciels/safardesk/           SafarDesk
/logiciels/matjarpro/           MatjarPro
/logiciels/catalogpro/          CatalogPro
/sur-mesure/                    Développement sur mesure + ERP case study + enquiry form
/tarifs/                        Tarifs
/methode/                       À propos / Notre méthode
/faq/                           Questions fréquentes
/contact/                       Contact
/404.html                       Page not found
/sitemap.xml, /robots.txt
```

Main navigation: **Logiciels** (with a dropdown of the 6 products grouped by industry) · **Sur mesure** · **Tarifs** · **Méthode** · **FAQ**, and a **WhatsApp** button. The footer repeats every page plus the contact details.

The ERP case study lives on `/sur-mesure/#etude-de-cas`, and the homepage links to it. If you want, it can become its own page later (`/realisations/erp-fabricant-meubles/`).

Arabic later: the same tree under `/ar/` (`/ar/logiciels/salonpro/` …), with `dir="rtl"` and `hreflang` links between the two languages.

---

## 3. Technical architecture

**Recommendation: plain HTML/CSS/JS, generated by a small build script with no dependencies.**

The brief asks for two things that pull in opposite directions:
- one place to change prices and contact details,
- real, SEO-friendly HTML on every page.

Filling in prices with JavaScript in the browser would show placeholders to search engines and flash on load. Copying the header, footer and prices by hand into 14 pages is how dead links and wrong prices happen. A ~200-line Node script (no framework, no npm packages) solves both: it reads the config and content files, assembles the pages from shared components, and writes finished static HTML at the root of the project, replacing the old site in place.

```
fikraweb/
├── src/
│   ├── config/
│   │   ├── site.js          contact (WhatsApp, e-mail, URLs, socials), base URL, default WhatsApp messages
│   │   └── products.js      the 6 products: names, industries, texts, features by module, FAQ, PRICES
│   ├── content/             page texts (home, sur-mesure, tarifs, méthode, faq) as keyed French strings → Arabic later
│   ├── components/          header, footer, buttons, product index, screenshot placeholder, FAQ item, CTA band…
│   ├── pages/               one file per page template (home, product, listing, custom, pricing…)
│   └── assets/
│       ├── css/             tokens.css · base.css · components.css · pages.css (no Tailwind)
│       ├── js/main.js       menu, dropdown, product index, FAQ, enquiry form → WhatsApp (~5 KB)
│       ├── icons/           the Lucide icons used, copied in as SVG (no CDN)
│       ├── fonts/           self-hosted woff2 (Instrument Sans, Geist Mono; IBM Plex Sans Arabic later)
│       └── img/             logo SVGs, OG images, screenshot slots
├── build.mjs                → writes index.html, assets/, page folders, sitemap.xml, robots.txt at the root
└── index.html, assets/, …   the generated site, deployed like the old one
```

- Change a price or the WhatsApp number in **one file**, run `node build.mjs`, and every page updates. Netlify and Cloudflare can run the build automatically on each push.
- **CSS uses logical properties** (`margin-inline-start`, `padding-inline`, `inset-inline-end`), so the Arabic RTL version mostly works without rewriting styles.
- **Enquiry form:** no backend. On submit it checks the fields, composes a structured message and opens WhatsApp with it prefilled. There is also an "envoyer par e-mail" (`mailto:`) fallback. A form service can be plugged in later if needed.
- **Every WhatsApp button** gets a context message (`"Bonjour, je souhaite découvrir SalonPro."`, `"…j'ai un projet de logiciel sur mesure."`), defined in the config.
- **SEO:** a title, description, canonical URL and Open Graph/Twitter tags per page. JSON-LD: `Organization` on every page, `SoftwareApplication` + `Offer` (price in DZD) on each product page, `FAQPage` on the FAQ, `BreadcrumbList` on inner pages.
- **Performance:** no Tailwind, no CDN scripts, self-hosted fonts with `font-display: swap`, SVG logos, about 30 KB of CSS + JS in total, screenshots in AVIF/WebP with set width and height.
- **Accessibility:** a skip link, visible focus styles, a keyboard-operable menu, dropdown, product index and FAQ (`<details>` / ARIA), WCAG AA contrast, `prefers-reduced-motion` respected.

---

## 4. Design system

### 4.1 Logo: proposed redesign

- **Icon:** an **F built from software modules**: five squares on a 3×3 grid form the F, and a sixth square in **primary blue** sits apart at the bottom right, like a full stop: *the idea (فكرة) that falls into place*. It can't be confused with a laptop, globe, bracket or light bulb. It stays readable at 16 px (favicon) and works in one colour.
- **Wordmark:** "FikraWeb" set in Instrument Sans Semibold, tightly spaced, in navy, with no gradient. "Web" is in a lighter weight, so the word reads as one name with two parts.
- **Versions:** horizontal (icon + wordmark), icon alone, white on navy, single colour. An Arabic wordmark (فكرة ويب) comes with the Arabic phase.
- The existing descriptor line *"Votre idée, notre code"* is replaced by the brief's *"Software Products & Custom Solutions"*, written in French on the site: **"Logiciels & solutions sur mesure"**.

### 4.2 Colours

The brief's palette, kept and refined:

| Token | HEX | Use |
|---|---|---|
| `--navy-900` | `#0F1C2E` | Darkest surfaces (footer, the custom-development band) |
| `--navy-800` | `#14243A` | Brand navy (from the brief): logo, dark sections |
| `--blue-600` | `#2864DC` | Primary actions, links, the logo dot (from the brief) |
| `--blue-700` | `#1F50B5` | Hover/pressed |
| `--blue-50` | `#EEF3FD` | Light blue tints |
| `--ink` | `#172033` | Main text (from the brief) |
| `--muted` | `#5E6A7D` | Secondary text. The brief's `#687386` is nudged darker to pass WCAG AA on the grey background |
| `--line` | `#E2E7EE` | Borders, separators |
| `--surface` | `#F5F7FA` | Section backgrounds (from the brief) |
| `--white` | `#FFFFFF` | Cards, main background |
| `--whatsapp` | `#1FAF54` | WhatsApp buttons only. Slightly darker than the official green so white text passes contrast |

**Product colours:** each product gets one muted hue. It is used in small doses (an index number, the top rule of its section, icon tiles, the tint behind its screenshots, the hero of its page), never as large gradients. All of them pass AA as text on white.

| Product | Hue | HEX |
|---|---|---|
| SalonPro | Prune | `#A63D6A` |
| GaragePro | Rouille | `#B4501F` |
| CarRent Pro | Pétrole | `#0F6E8C` |
| SafarDesk | Émeraude | `#16775A` |
| MatjarPro | Violet | `#6941C6` |
| CatalogPro | Ocre | `#946200` |

### 4.3 Typography

- **Instrument Sans** (400/500/600/700) for headings and body. It's a modern grotesk, slightly condensed, more distinctive than Inter but still very readable.
- **Geist Mono** (400/500) used sparingly for small labels: section numbers (`01`), prices, the product category line, and screenshot-slot captions. It hints at "software" without the terminal look.
- **IBM Plex Sans Arabic**, reserved for the Arabic version (it matches the Latin font in weight and tone).
- Type scale (fluid with `clamp`): Display 56→80 px · H1 40→56 · H2 30→40 · H3 20→24 · Body 17 · Small 14 · Label 12 mono uppercase with +0.08em tracking. Headings: weight 600, letter-spacing −0.02 to −0.03em, line-height 1.05–1.15.
- Money is always written `29 000 DA`, with a non-breaking narrow space so the number never splits across lines.

### 4.4 Layout, shape, depth

- 12-column grid, max width 1200 px, 24 px gutters (16 px on mobile). Section spacing 96–128 px on desktop, 64–80 px on mobile.
- **Few cards.** Structure comes from rules (1 px lines), columns and whitespace. Products are presented as an **index** (numbered rows) rather than six identical boxes.
- Radius: 6 px for buttons and inputs, 10 px for screenshot frames. Nothing is pill-shaped except small tags.
- Shadows: one subtle elevation token for screenshot frames and the dropdown, nothing else.
- Icons: **Lucide**, 1.5 px stroke, 20/24 px, in `currentColor`, copied in as SVG.
- Motion: elements fade and rise 8 px on scroll, 200 ms colour/position transitions on hover, and the product index preview cross-fades. No floating, bouncing or looping animations. Everything is disabled under `prefers-reduced-motion`.

### 4.5 Screenshot placeholders

These are honest, polished slots, not fake interfaces. Each one has:
- the right frame (Windows window for SalonPro, browser window for web products, phone for storefronts),
- a fine diagonal hatching in the product's tint,
- a centred caption in mono: **"Capture à remplacer · SalonPro · Caisse"** and the expected size (`1600 × 1000`),
- an `<img>` slot behind it: when a file named, for example, `assets/img/screens/salonpro-caisse.webp` exists, the build uses it automatically. Replacing a placeholder means dropping one file in a folder.

---

## 5. Homepage plan (to be built in Stage 2)

| # | Section | Layout |
|---|---|---|
| 1 | **Header** | Logo · Logiciels (dropdown grouped by industry) · Sur mesure · Tarifs · Méthode · FAQ · WhatsApp button. On mobile: logo + WhatsApp icon + menu button opening a full-screen panel. |
| 2 | **Hero** | Left: label "Logiciels & solutions sur mesure", H1 *"Des logiciels qui simplifient votre activité."*, the supporting text, the CTAs **Découvrir nos logiciels** (primary) and **Un projet sur mesure ?** (secondary). Right: **a composition of three screenshot frames** (a SafarDesk browser window, a SalonPro Windows window, a MatjarPro phone), each a labelled slot. Under it, a thin strip of the six product names with their colour marks. On mobile the text comes first, then one frame plus the strip, which scrolls sideways. |
| 3 | **Two ways to work with us** | A split block that gives **equal weight** to "Logiciels prêts à l'emploi" (6 products, from 25 000 DA) and "Développement sur mesure" (ERP, stock, production…), each with a short paragraph and a link. It answers "what do they do?" in five seconds. |
| 4 | **Trust strip** | The six strengths from the brief in a 3×2 grid of icon + short line, separated by rules (no cards). |
| 5 | **Software products: the "index"** | A numbered list on the left (`01 SalonPro, Salons & barbiers, dès 29 000 DA`). Hovering or focusing a row (or tapping it on mobile) shows on the right that product's colour, category, short description, main benefit, a screenshot slot and its CTA (*Découvrir SalonPro*). On mobile it becomes a vertical stack of expandable rows. Each product shows its own content, so the section doesn't look like six identical cards. |
| 6 | **Custom development** | A full-width **dark navy band** (same weight as section 5). Headline *"Votre activité est unique. Votre logiciel aussi."*, the description, the 8 capabilities in two columns with icons, CTA **Discuter de mon projet**. |
| 7 | **Case study** | *"ERP pour un fabricant de meubles"*: a short story (context → what was built → result), then the 8 modules shown as a **flow diagram** drawn in SVG (Achats → Stock → Production → Ventes & livraisons → Caisse, with Employés → Pointage → Paie underneath), clearly labelled "Projet sur mesure, non commercialisé". No company name and no data. |
| 8 | **How we work** | The four steps (Découverte · Démonstration · Installation / Développement · Formation & support) as a horizontal timeline with numbers on desktop and a vertical one on mobile. |
| 9 | **Final CTA** | *"Prêt à mieux gérer votre activité ?"* with two buttons (Découvrir nos logiciels · Présenter mon projet) and a WhatsApp line. |
| 10 | **Footer** | Navy-900. Logo + descriptor, links to every page and product, WhatsApp / e-mail / Facebook / Instagram from the config, © year. |

---

## 6. Content rules applied everywhere

- Only SalonPro is described as working offline. The other products are "accessible depuis un ordinateur, une tablette ou un téléphone".
- Payment-related claims stay product-specific (e.g. the courier integrations belong to MatjarPro only).
- No testimonials, client logos, ratings, numbers of customers, discounts or guarantees.
- No technology names.
- The ERP is always labelled "réalisation sur mesure", never with a price or a buy button, and never with the client's name.

---

## 7. Next stages (after your approval)

2. Homepage, desktop and mobile, presented for review → 3. product listing + 6 product pages → 4. custom development page + case study + form → 5. tarifs, méthode, FAQ, contact → 6. final QA (links, WhatsApp messages, responsive, spelling, prices, accessibility, SEO, static deployment).

---

## 8. Questions for you

1. **Logo:** do you approve the redesigned logo direction (see the design page), or do you prefer to keep the current FikraWeb logo?
2. **Hour packs:** the current site sells development-hour packs (18 000 / 32 000 / 58 000 DA). The brief says no fixed custom prices, so I plan to **remove them**. Confirm?
3. **Contact details:** the current site uses the WhatsApp number `+213 552 79 14 23` and a Facebook page. Should I put them in the central config now, or leave the `[WHATSAPP_NUMBER]`-style placeholders from the brief?
4. **English version:** OK to drop it (French now, Arabic later)?
5. **Build script:** OK with a small `node build.mjs` step before deploying, as recommended in §3? The alternative is hand-written HTML pages with prices updated in several places.
