import type { Product } from '../types'

/**
 * Sample catalogue for Methi Furniture & Glass House.
 *
 * REPLACING IMAGES: drop real photos into /public/images/products/ using the
 * exact file names referenced below (e.g. modern-sofa-1.jpg) and they will
 * appear automatically — no code changes needed. Until a file exists, a
 * clean placeholder is shown in its place.
 *
 * ADDING PRODUCTS: copy an existing object, give it a unique `id`, and add
 * it to the array. To feature it on the homepage, set `featured: true`.
 */
export const products: Product[] = [
  // ---------------- Furniture ----------------
  {
    id: 'modern-sofa',
    name: 'Modern Sofa',
    category: 'furniture',
    description:
      'A contemporary sofa set finished in premium upholstery, built on a solid hardwood frame for everyday comfort and years of durable use. Available in multiple seating configurations to suit your living room.',
    images: [
      '/images/products/modern-sofa-1.jpg',
      '/images/products/modern-sofa-2.jpg',
      '/images/products/modern-sofa-3.jpg',
    ],
    featured: true,
  },
  {
    id: 'wooden-bed',
    name: 'Wooden Bed',
    category: 'furniture',
    description:
      'Solid wood bed frame with a refined finish and sturdy joinery. Designed for long-term durability with an option of storage variants to make the most of your bedroom space.',
    images: [
      '/images/products/wooden-bed-1.jpg',
      '/images/products/wooden-bed-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    category: 'furniture',
    description:
      'A sturdy dining table crafted for family gatherings, available with matching chair sets. Scratch-resistant finish that keeps its shine with everyday use.',
    images: [
      '/images/products/dining-table-1.jpg',
      '/images/products/dining-table-2.jpg',
    ],
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe',
    category: 'furniture',
    description:
      'Spacious multi-door wardrobe with thoughtfully designed internal shelving and hanging space. Built to fit modern bedrooms without compromising on storage.',
    images: [
      '/images/products/wardrobe-1.jpg',
      '/images/products/wardrobe-2.jpg',
    ],
  },

  // ---------------- Mattresses ----------------
  {
    id: 'memory-foam-mattress',
    name: 'Memory Foam Mattress',
    category: 'mattresses',
    description:
      'Pressure-relieving memory foam mattress that contours to your body for a restful night’s sleep. Breathable cover fabric keeps you cool through the night.',
    images: [
      '/images/products/memory-foam-mattress-1.jpg',
      '/images/products/memory-foam-mattress-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'orthopedic-mattress',
    name: 'Orthopedic Mattress',
    category: 'mattresses',
    description:
      'Firm support mattress designed to promote healthy spine alignment. A trusted everyday choice for lasting back support.',
    images: [
      '/images/products/orthopedic-mattress-1.jpg',
      '/images/products/orthopedic-mattress-2.jpg',
    ],
  },

  // ---------------- Glass ----------------
  {
    id: 'clear-glass',
    name: 'Clear Glass',
    category: 'glass',
    description:
      'High-transparency clear glass cut to size for windows, partitions, tabletops and cabinets. Precision edge-finishing available on request.',
    images: [
      '/images/products/clear-glass-1.jpg',
      '/images/products/clear-glass-2.jpg',
    ],
  },
  {
    id: 'decorative-glass',
    name: 'Decorative Glass',
    category: 'glass',
    description:
      'Textured and patterned glass that adds character to doors, partitions and windows while maintaining privacy and letting light through.',
    images: [
      '/images/products/decorative-glass-1.jpg',
      '/images/products/decorative-glass-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'toughened-glass',
    name: 'Toughened Glass',
    category: 'glass',
    description:
      'Heat-treated safety glass, several times stronger than standard glass, ideal for doors, tabletops and high-traffic fittings.',
    images: [
      '/images/products/toughened-glass-1.jpg',
      '/images/products/toughened-glass-2.jpg',
    ],
  },

  // ---------------- Mirrors ----------------
  {
    id: 'wall-mirror',
    name: 'Wall Mirror',
    category: 'mirrors',
    description:
      'Clean-edged wall mirror finished for a crisp, true reflection. Cut to standard or custom sizes for bedrooms, bathrooms and hallways.',
    images: [
      '/images/products/wall-mirror-1.jpg',
      '/images/products/wall-mirror-2.jpg',
    ],
  },
  {
    id: 'decorative-mirror',
    name: 'Decorative Mirror',
    category: 'mirrors',
    description:
      'Framed decorative mirror that doubles as a statement piece, well suited to living rooms and entryways.',
    images: [
      '/images/products/decorative-mirror-1.jpg',
      '/images/products/decorative-mirror-2.jpg',
    ],
    featured: true,
  },

  // ---------------- Aluminium Windows ----------------
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    category: 'aluminium-windows',
    description:
      'Smooth-gliding aluminium sliding window system with a weather-resistant finish, built for durability and easy maintenance.',
    images: [
      '/images/products/sliding-window-1.jpg',
      '/images/products/sliding-window-2.jpg',
    ],
  },
  {
    id: 'aluminium-frame-window',
    name: 'Aluminium Frame Window',
    category: 'aluminium-windows',
    description:
      'Sturdy fixed-frame aluminium window, corrosion-resistant and low-maintenance, built to standard or custom sizes.',
    images: [
      '/images/products/aluminium-frame-window-1.jpg',
      '/images/products/aluminium-frame-window-2.jpg',
    ],
  },

  // ---------------- Aluminium Doors ----------------
  {
    id: 'sliding-door',
    name: 'Sliding Door',
    category: 'aluminium-doors',
    description:
      'Space-saving aluminium sliding door with smooth track movement, suited for balconies and room partitions.',
    images: [
      '/images/products/sliding-door-1.jpg',
      '/images/products/sliding-door-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'main-entrance-door',
    name: 'Main Entrance Door',
    category: 'aluminium-doors',
    description:
      'Robust aluminium entrance door built for daily use and long-term weather resistance, with a clean modern profile.',
    images: [
      '/images/products/main-entrance-door-1.jpg',
      '/images/products/main-entrance-door-2.jpg',
    ],
  },

  // ---------------- Solar Inverters ----------------
  {
    id: 'solar-inverter',
    name: 'Solar Inverter',
    category: 'solar-inverters',
    description:
      'Dependable solar inverter that converts solar power efficiently for home use, backed by trusted brands we stock in-store.',
    images: [
      '/images/products/solar-inverter-1.jpg',
      '/images/products/solar-inverter-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'hybrid-solar-inverter',
    name: 'Hybrid Solar Inverter',
    category: 'solar-inverters',
    description:
      'Hybrid inverter that manages solar and grid power together, keeping your home running smoothly through outages.',
    images: [
      '/images/products/hybrid-solar-inverter-1.jpg',
      '/images/products/hybrid-solar-inverter-2.jpg',
    ],
  },

  // ---------------- Batteries ----------------
  {
    id: 'inverter-battery',
    name: 'Inverter Battery',
    category: 'batteries',
    description:
      'Long-life inverter battery built for reliable backup power, with strong charge retention for daily household use.',
    images: [
      '/images/products/inverter-battery-1.jpg',
      '/images/products/inverter-battery-2.jpg',
    ],
  },
  {
    id: 'solar-battery',
    name: 'Solar Battery',
    category: 'batteries',
    description:
      'Deep-cycle battery designed to store solar energy efficiently, paired well with our solar inverter range.',
    images: [
      '/images/products/solar-battery-1.jpg',
      '/images/products/solar-battery-2.jpg',
    ],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}
