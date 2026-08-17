import type { Category } from '../types'

/**
 * The eight product categories carried by the shop.
 * To add a new category: add an entry here (pick a unique slug), then
 * add matching products in products.ts with category set to that slug.
 */
export const categories: Category[] = [
  {
    slug: 'furniture',
    name: 'Furniture',
    tagline: 'Sofas, beds, tables & wardrobes',
    icon: 'sofa',
  },
  {
    slug: 'mattresses',
    name: 'Mattresses',
    tagline: 'Comfort & support for every bed',
    icon: 'mattress',
  },
  {
    slug: 'glass',
    name: 'Glass',
    tagline: 'Clear, decorative & toughened glass',
    icon: 'glass',
  },
  {
    slug: 'mirrors',
    name: 'Mirrors',
    tagline: 'Wall & decorative mirrors',
    icon: 'mirror',
  },
  {
    slug: 'aluminium-windows',
    name: 'Aluminium Windows',
    tagline: 'Sliding & framed window systems',
    icon: 'window',
  },
  {
    slug: 'aluminium-doors',
    name: 'Aluminium Doors',
    tagline: 'Sliding & entrance doors',
    icon: 'door',
  },
  {
    slug: 'solar-inverters',
    name: 'Solar Inverters',
    tagline: 'Reliable power for your home',
    icon: 'solar',
  },
  {
    slug: 'batteries',
    name: 'Batteries',
    tagline: 'Inverter & solar batteries',
    icon: 'battery',
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
