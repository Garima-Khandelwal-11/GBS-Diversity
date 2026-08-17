import { categories } from '../data/categories'
import { CategoryCard } from '../components/CategoryCard'
import { SectionHeading } from '../components/SectionHeading'

export function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading eyebrow="Our range" title="All categories" description="Everything we stock, in one place. Tap a category to browse products." />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  )
}
