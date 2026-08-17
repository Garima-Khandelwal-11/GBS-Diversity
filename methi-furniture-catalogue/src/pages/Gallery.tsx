import { useMemo, useState } from 'react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { Lightbox } from '../components/Lightbox'
import { SectionHeading } from '../components/SectionHeading'
import type { CategorySlug } from '../types'

interface GalleryItem {
  src: string
  productName: string
  category: CategorySlug
}

const allItems: GalleryItem[] = products.flatMap((p) =>
  p.images.map((src) => ({ src, productName: p.name, category: p.category }))
)

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = useMemo(
    () => (activeCategory === 'all' ? allItems : allItems.filter((i) => i.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading eyebrow="Gallery" title="Browse the collection" description="Tap any photo for a full-screen, swipeable view." />

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-walnut-700 text-cream-50' : 'bg-stone-100 text-walnut-700 hover:bg-stone-200'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActiveCategory(c.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === c.slug ? 'bg-walnut-700 text-cream-50' : 'bg-stone-100 text-walnut-700 hover:bg-stone-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="block aspect-square overflow-hidden rounded-xl"
            aria-label={`View ${item.productName} photo full screen`}
          >
            <PlaceholderImage
              src={item.src}
              alt={item.productName}
              label={item.productName}
              className="h-full w-full transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={items.map((i) => i.src)}
          startIndex={openIndex}
          alt={items[openIndex]?.productName ?? 'Product'}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  )
}
