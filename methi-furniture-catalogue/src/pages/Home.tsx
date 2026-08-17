import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { getFeaturedProducts, products } from '../data/products'
import { business } from '../data/business'
import { CategoryCard } from '../components/CategoryCard'
import { ProductCard } from '../components/ProductCard'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { SectionHeading } from '../components/SectionHeading'
import { WhatsAppButton, CallButton, DirectionsButton } from '../components/Buttons'
import { ArrowRightIcon, MapPinIcon, PhoneIcon, SparkleIcon } from '../components/icons'

export function Home() {
  const featured = getFeaturedProducts()
  const galleryPreview = products.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderImage
            src="/images/hero.jpg"
            alt="Methi Furniture & Glass House showroom interior"
            label="Showroom photo"
            className="h-full w-full"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/90 via-walnut-900/60 to-walnut-900/30" />
        </div>

        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1.5 text-xs font-medium text-brass-300 ring-1 ring-cream-50/20 backdrop-blur-sm animate-fade-in">
            <SparkleIcon className="h-3.5 w-3.5" />
            Goverdhan Mod, Deeg, Rajasthan
          </span>
          <h1 className="animate-fade-in max-w-xl font-display text-4xl font-semibold leading-[1.1] text-cream-50 sm:text-5xl">
            Furnish, glaze &amp; power your home — all from one trusted shop
          </h1>
          <p className="animate-fade-in mt-4 max-w-md text-base text-cream-100/85 sm:text-lg">
            {business.tagline}
          </p>
          <div className="animate-fade-in mt-7 flex flex-wrap gap-3">
            <Link
              to="/categories"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brass-400 px-6 text-sm font-semibold text-walnut-900 shadow-card transition-colors hover:bg-brass-500"
            >
              Explore Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <WhatsAppButton size="lg" className="h-12" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="What we stock" title="Browse by category" />
          <Link to="/categories" className="hidden shrink-0 text-sm font-medium text-walnut-700 hover:underline sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-stone-100/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Handpicked" title="Featured products" description="A few favourites from across our range." />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="See it for yourself" title="From our gallery" />
          <Link to="/gallery" className="hidden shrink-0 text-sm font-medium text-walnut-700 hover:underline sm:inline">
            View gallery
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {galleryPreview.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="block aspect-square overflow-hidden rounded-xl">
              <PlaceholderImage src={p.images[0]} alt={p.name} label={p.name} className="h-full w-full transition-transform duration-500 hover:scale-105" />
            </Link>
          ))}
        </div>
        <Link to="/gallery" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-walnut-700 hover:underline sm:hidden">
          View gallery
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </section>

      {/* About */}
      <section className="bg-walnut-800 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Our story"
            title="A local shop for the whole home"
            className="[&_h2]:text-cream-50 [&_p]:text-cream-100/80 [&_p]:mx-auto"
          />
          <p className="mt-4 text-cream-100/80">
            {business.name} has been serving Deeg with quality furniture, glass, mirrors, aluminium
            fittings, and solar power solutions — all under one roof at Goverdhan Mod. Every piece in
            our catalogue is available to view in person at the shop, where our team can help you pick
            what fits your home best.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-stone-100 p-6 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
            <div>
              <SectionHeading eyebrow="Visit or reach out" title="Come see the collection" />
              <div className="mt-4 space-y-2 text-stone-600">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-4.5 w-4.5 shrink-0 text-walnut-500" />
                  {business.addressLine}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="h-4.5 w-4.5 shrink-0 text-walnut-500" />
                  {business.phoneDisplay}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <WhatsAppButton size="lg" />
              <CallButton size="lg" variant="secondary" />
              <DirectionsButton size="lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
