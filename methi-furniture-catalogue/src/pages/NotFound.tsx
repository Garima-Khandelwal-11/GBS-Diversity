import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-walnut-700">404</p>
      <h1 className="mt-3 font-display text-xl font-semibold text-walnut-800">Page not found</h1>
      <p className="mt-2 text-stone-500">The page you're looking for doesn't exist or may have moved.</p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center rounded-full bg-walnut-700 px-6 text-sm font-medium text-cream-50 transition-colors hover:bg-walnut-800"
      >
        Back to home
      </Link>
    </div>
  )
}
