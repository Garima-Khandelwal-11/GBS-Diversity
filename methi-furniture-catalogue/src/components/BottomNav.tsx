import { NavLink } from 'react-router-dom'
import { HomeIcon, GridIcon, GalleryIcon, ContactIcon } from './icons'

const items = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/categories', label: 'Categories', icon: GridIcon, end: false },
  { to: '/gallery', label: 'Gallery', icon: GalleryIcon, end: false },
  { to: '/contact', label: 'Contact', icon: ContactIcon, end: false },
]

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-cream-50/95 pb-[max(env(safe-area-inset-bottom),0px)] shadow-nav backdrop-blur-sm md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-walnut-800' : 'text-stone-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      isActive ? 'bg-brass-300/40 text-walnut-800' : 'text-stone-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
