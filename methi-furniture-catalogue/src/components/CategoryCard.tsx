import { Link } from 'react-router-dom'
import type { Category } from '../types'
import { getProductsByCategory } from '../data/products'
import { PlaceholderImage } from './PlaceholderImage'
import { categoryIcons } from './categoryIcons'

export function CategoryCard({ category }: { category: Category }) {
  const products = getProductsByCategory(category.slug)
  const Icon = categoryIcons[category.icon]
  const cover = products[0]?.images[0]

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-walnut-700 shadow-card ring-1 ring-stone-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <PlaceholderImage
        src={cover}
        alt={category.name}
        label={category.name}
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/85 via-walnut-900/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium text-cream-50">{category.name}</h3>
          <p className="mt-0.5 truncate text-xs text-cream-100/80">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/15 text-brass-300 ring-1 ring-cream-50/25 backdrop-blur-sm">
            <Icon className="h-4.5 w-4.5" />
          </span>
        )}
      </div>
    </Link>
  )
}
