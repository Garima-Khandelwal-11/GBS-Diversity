# Methi Furniture & Glass House — Digital Catalogue

A mobile-first digital catalogue for **Methi Furniture & Glass House**, Goverdhan Mod, Deeg, Rajasthan.
Customers browse categories and products, view photo galleries, and contact the shop via WhatsApp,
phone, or Google Maps directions. There is no pricing, cart, checkout, or login by design — this is a
catalogue, not a store.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # oxlint
```

## Replacing placeholder images with real photos

Every product has no real photos yet, so a clean placeholder (icon + product name) shows in its place.
**To add a real photo, just drop an image file into `public/images/products/` using the exact file name
already referenced in `src/data/products.ts`** — no code changes required. The moment a matching file
exists, it replaces the placeholder automatically everywhere that product appears (cards, gallery,
product page, lightbox).

Example: `Modern Sofa` expects:

```
public/images/products/modern-sofa-1.jpg
public/images/products/modern-sofa-2.jpg
public/images/products/modern-sofa-3.jpg
```

The homepage hero image works the same way — add `public/images/hero.jpg` to replace the hero placeholder.

Tips for photos:
- Landscape or square photos work best for cards; product pages crop to a square gallery.
- Keep files under ~500KB (export at ~1600px wide) so pages stay fast on mobile data.
- `.jpg`, `.png`, `.webp` are all supported — just match the extension in `products.ts` or update the path.

## Managing the catalogue

All catalogue content lives in plain TypeScript data files — no database or backend required for this
version:

- `src/data/business.ts` — shop name, address, phone number, WhatsApp/maps links.
- `src/data/categories.ts` — the 8 product categories. Add a new category by adding an entry here with a
  unique `slug` and an `icon` (see `src/components/categoryIcons.ts` for available icons).
- `src/data/products.ts` — every product. Add, edit, or remove products by editing this array. Each
  product has `id`, `name`, `category`, `description`, `images[]`, and an optional `featured: true` to
  surface it on the homepage. No `price` field exists anywhere in the app by design.

This structure is intentionally simple so it can later be swapped for a small admin panel or CMS
without touching any UI component — pages already read from `getProduct`, `getProductsByCategory`, and
`getFeaturedProducts()` in `src/data/products.ts`, so a future version can replace those functions with
API calls.

## WhatsApp & contact behaviour

- General enquiry (homepage, contact page): pre-fills *"Hello Methi Furniture & Glass House, I would
  like to enquire about a product from your catalogue."*
- Product enquiry (product page): pre-fills *"Hello Methi Furniture & Glass House, I am interested in
  [Product Name]. Please provide more information."*
- "Get Directions" opens a Google Maps **search** for the shop's known location (Goverdhan Mod, Deeg,
  Rajasthan) — no invented street address or coordinates.

All three live in `src/utils/links.ts` and `src/data/business.ts` if the phone number or address ever
changes.

## Project structure

```
src/
  components/   Reusable UI: Header, BottomNav, ProductCard, CategoryCard, ImageGallery,
                Lightbox, Buttons (WhatsApp/Call/Directions), Logo, icons
  pages/        Home, Categories, CategoryProducts, ProductDetail, Gallery, Contact, NotFound
  data/         business.ts, categories.ts, products.ts — all catalogue content
  utils/        links.ts (WhatsApp/call/maps links), useSwipe.ts (gallery swipe gesture)
  types/        Shared TypeScript types (Product, Category)
public/
  images/products/   Real product photos go here (see above)
  favicon.svg        App icon / logo mark
```
