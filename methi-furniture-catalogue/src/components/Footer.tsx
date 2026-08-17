import { Link } from 'react-router-dom'
import { LogoMark } from './Logo'
import { business } from '../data/business'
import { categories } from '../data/categories'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-walnut-800 pb-24 pt-12 text-cream-100/80 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={34} />
              <span className="font-display text-lg font-semibold text-cream-50">{business.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm">{business.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brass-300">Categories</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/categories/${c.slug}`} className="transition-colors hover:text-cream-50">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brass-300">Visit the shop</p>
            <p className="mt-3 text-sm">{business.addressLine}</p>
            <p className="mt-1 text-sm">{business.phoneDisplay}</p>
          </div>
        </div>

        <p className="mt-10 border-t border-cream-50/10 pt-6 text-xs text-cream-100/50">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
