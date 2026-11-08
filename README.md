# FikraWeb website

Static website, generated from `src/` by a small build script. There's no framework and no npm
dependencies; you only need Node.js 18 or newer.

```sh
node build.mjs            # builds the site into this folder
node build.mjs --serve    # builds, then previews at http://localhost:4173
```

(`npm run build` and `npm run dev` do the same.)

## Where to change things

| What | File |
|---|---|
| WhatsApp number, e-mail, Facebook, Instagram, site URL, default WhatsApp messages | `src/config/site.js` |
| Products: names, industries, texts, colours, **prices**, WhatsApp message per product | `src/config/products.js` |
| Homepage texts and sections | `src/pages/home.js` |
| Product pages: audience, problems, features, gallery, FAQ… | `src/content/products/<product>.js` |
| Custom development: capabilities, process, project types, ERP case study | `src/content/custom.js` |
| Main FAQ (questions and answers) | `src/content/faq.js` |
| Pricing, method, FAQ, contact and 404 pages | `src/pages/pricing.js`, `method.js`, `faq.js`, `contact.js`, `notfound.js` |
| Screenshot slots: what to add, file names, status | `docs/screenshot-slots.md` (generated) |
| Header, footer, page `<head>` | `src/components/layout.js` |
| Buttons, prices, screenshot slots, icons | `src/components/ui.js` |
| Styles (tokens → base → components → pages) | `src/assets/css/` (joined into one file at build time) |
| Colours of the dark and light themes | `src/assets/css/01-tokens.css` (one block per theme) |
| Default theme (dark) | inline script in `src/components/layout.js`; visitors' choice is remembered |
| Behaviour (menus, product showcase, animations) | `src/assets/js/main.js` |
| Screenshots | `src/assets/img/screens/`, see the README there |
| Logos and icons for browsers and phones | `src/assets/img/brand/` |

A contact value left in `[BRACKETS]` counts as "not set" and its links are hidden. Set `site.url` before
going live: canonical URLs and `sitemap.xml` depend on it.

The build checks every internal link and anchor, and lists pages that are linked but not built yet.

## Languages: French, Arabic, English

French is the source language and stays at the root (`/`, `/logiciels/…`). The build writes an Arabic
version under `/ar/` (right-to-left) and an English version under `/en/`, with the same page addresses.

- Pages are written in French. The build translates each French page using the tables in
  `src/i18n/strings/` (one file per page group). Each row is `[French, English, Arabic]`, and the French
  must match the text on the page exactly.
- Placeholders cover repeated texts: `{money}` (a price, written `29 000 DA` / `29,000 DZD` / `29 000 دج`),
  `{product}` (a product name) and `{year}`.
- **When you change or add French text, run the build:** it lists every text that still needs a translation
  in `docs/i18n-missing.json` and prints the count. Until a translation exists, the French text is shown.
- The build also warns if the same French text is translated in two different ways.
- The language switcher (header and mobile menu) links to the same page in the other languages, and every page
  declares its alternate versions for search engines (`hreflang`).

## Generated files

The build writes the site at the root of this folder, so it replaces the old site in place:
`index.html`, `assets/`, one folder per page (`logiciels/`, `tarifs/`…), the `ar/` and `en/` versions,
`robots.txt` and `sitemap.xml`.
These files are generated: edit `src/` and run the build again instead of editing them by hand.
They are listed in `.build-manifest.json`, and the build only deletes or overwrites files from that list,
so `src/`, `docs/` and the original logo files are never touched.

## Before going live

- Set `url` in `src/config/site.js` (enables canonical URLs and `sitemap.xml`).
- Set the e-mail and Instagram, or leave them in brackets to keep them hidden.
- Add real screenshots (see `docs/screenshot-slots.md`).

## GitHub Pages and the base path

GitHub Pages serves this repository at `https://smainyounes.github.io/fikraweb/`, under a `/fikraweb/`
folder. `basePath: '/fikraweb'` in `src/config/site.js` makes the build add that prefix to every internal
link, image, font and stylesheet. If you later use a custom domain (site at the root), set `basePath: ''` and
rebuild. `site.url` must be the full public address, including the folder:
`https://smainyounes.github.io/fikraweb`.

The preview (`node build.mjs --serve`) uses the same prefix: http://localhost:4173/fikraweb/

`.nojekyll` tells GitHub Pages to publish the files as they are.

## Deploying

Deploy this folder the same way as the old site: upload it to the host, or push it if the host publishes the
repository. Commit the generated files after each build. `robots.txt` asks search engines to skip `src/` and
`docs/`.

## Status

- Stage 1 (audit and design direction): done, see `docs/`.
- Stage 2 (homepage): done and approved.
- Stage 3 (product listing + six product pages): done and approved.
- Stage 4 (custom development page, ERP case study, enquiry form): done and approved.
- Stage 5 (pricing, method, FAQ, contact, 404) and Stage 6 (final QA): done and approved.
- Translation into Arabic and English: done, waiting for review.

The previous one-page site has been replaced. To see it again: `git show f8a95d6:index.html > old-index.html`.
