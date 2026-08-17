import { Link, Navigate, useParams } from 'react-router-dom'
import { getProduct, getProductsByCategory } from '../data/products'
import { getCategory } from '../data/categories'
import { ImageGallery } from '../components/ImageGallery'
import { WhatsAppButton, CallButton } from '../components/Buttons'
import { ProductCard } from '../components/ProductCard'
import { ChevronLeftIcon } from '../components/icons'

export function ProductDetail() {
  const { id = '' } = useParams()
  const product = getProduct(id)

  if (!product) return <Navigate to="/categories" replace />

  const category = getCategory(product.category)
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        to={category ? `/categories/${category.slug}` : '/categories'}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-walnut-700"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        {category ? category.name : 'All categories'}
      </Link>

      <div className="mt-4">
        <ImageGallery images={product.images} alt={product.name} />
      </div>

      <div className="mt-6">
        {category && (
          <Link
            to={`/categories/${category.slug}`}
            className="text-xs font-semibold uppercase tracking-wide text-brass-600 hover:underline"
          >
            {category.name}
          </Link>
        )}
        <h1 className="mt-1 font-display text-2xl font-semibold text-walnut-800 sm:text-3xl">{product.name}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">{product.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton productName={product.name} size="lg" label="Enquire on WhatsApp" />
          <CallButton size="lg" variant="outline" />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-walnut-800">More from {category?.name}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
