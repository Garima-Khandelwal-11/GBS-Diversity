import { Link, NavLink } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { PhoneIcon, WhatsAppIcon } from './icons'
import { callLink, whatsappGeneralLink } from '../utils/links'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/categories', label: 'Categories', end: false },
  { to: '/gallery', label: 'Gallery', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="shrink-0">
          <LogoLockup markSize={36} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-walnut-700 text-cream-50' : 'text-walnut-700 hover:bg-stone-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={callLink()}
            aria-label="Call the shop"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-walnut-700 transition-colors hover:bg-stone-100"
          >
            <PhoneIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={whatsappGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
