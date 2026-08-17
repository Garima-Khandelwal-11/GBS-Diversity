import { Link, Navigate, useParams } from 'react-router-dom'
import { getCategory } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { EmptyState } from '../components/EmptyState'
import { ChevronLeftIcon } from '../components/icons'
import { categoryIcons } from '../components/categoryIcons'

export function CategoryProducts() {
  const { slug = '' } = useParams()
  const category = getCategory(slug)

  if (!category) return <Navigate to="/categories" replace />

  const productList = getProductsByCategory(category.slug)
  const Icon = categoryIcons[category.icon]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/categories" className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-walnut-700">
        <ChevronLeftIcon className="h-4 w-4" />
        All categories
      </Link>

      <div className="mt-3 flex items-center gap-3">
        {Icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-walnut-700 text-brass-300">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <h1 className="font-display text-2xl font-semibold text-walnut-800 sm:text-3xl">{category.name}</h1>
          <p className="text-sm text-stone-500">{category.tagline}</p>
        </div>
      </div>

      <div className="mt-7">
        {productList.length === 0 ? (
          <EmptyState title="No products yet" description="We're adding photos for this category soon. Ask us in person or on WhatsApp." />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
