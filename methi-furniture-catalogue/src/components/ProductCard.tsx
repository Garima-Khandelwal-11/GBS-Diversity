import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { getCategory } from '../data/categories'
import { PlaceholderImage } from './PlaceholderImage'

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category)

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-stone-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="aspect-4/3 w-full">
        <PlaceholderImage
          src={product.images[0]}
          alt={product.name}
          label={product.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        {category && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brass-600">{category.name}</p>
        )}
        <h3 className="font-display text-lg font-medium leading-snug text-walnut-800">{product.name}</h3>
      </div>
    </Link>
  )
}
