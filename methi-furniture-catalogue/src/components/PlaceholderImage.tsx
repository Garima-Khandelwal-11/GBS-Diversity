import { useState } from 'react'
import { ImageIcon } from './icons'

interface PlaceholderImageProps {
  src?: string
  alt: string
  className?: string
  /** Small caption shown inside the placeholder until a real photo is added */
  label?: string
  eager?: boolean
}

/**
 * Drop-in <img> replacement. Renders the real photo once it loads; until
 * then (or if the file is missing / fails to load) it shows a tasteful
 * placeholder instead of a broken-image icon. This is what makes swapping
 * in real product photos a no-code, drop-a-file operation.
 */
export function PlaceholderImage({ src, alt, className = '', label, eager = false }: PlaceholderImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(!src)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-stone-200 via-stone-100 to-cream-100 ${className}`}>
      {!errored && src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {(errored || !loaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-walnut-400/70">
          <ImageIcon className="h-8 w-8 opacity-60" />
          {label && (
            <span className="line-clamp-2 text-center text-xs font-medium tracking-wide text-walnut-500/70">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
