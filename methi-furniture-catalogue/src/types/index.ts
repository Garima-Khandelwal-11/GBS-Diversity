export type CategorySlug =
  | 'furniture'
  | 'mattresses'
  | 'glass'
  | 'mirrors'
  | 'aluminium-windows'
  | 'aluminium-doors'
  | 'solar-inverters'
  | 'batteries'

export interface Category {
  slug: CategorySlug
  name: string
  /** Short line shown on category cards */
  tagline: string
  /** Name of the icon in components/icons.tsx */
  icon: string
}

export interface Product {
  id: string
  name: string
  category: CategorySlug
  /** Short description shown on the product detail page */
  description: string
  /**
   * Image paths, in display order. Files are looked up in /public/images/products/.
   * They don't need to exist yet — a matching placeholder renders automatically
   * until a real photo is added at that path. See README "Replacing images".
   */
  images: string[]
  /** Featured products are highlighted on the homepage */
  featured?: boolean
}
