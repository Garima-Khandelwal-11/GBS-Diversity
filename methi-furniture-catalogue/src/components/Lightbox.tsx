import { useEffect, useState } from 'react'
import { PlaceholderImage } from './PlaceholderImage'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons'
import { useSwipe } from '../utils/useSwipe'

interface LightboxProps {
  images: string[]
  startIndex: number
  alt: string
  onClose: () => void
}

export function Lightbox({ images, startIndex, alt, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)

  const goNext = () => setIndex((i) => (i + 1) % images.length)
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const swipe = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev })

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-walnut-900/97 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} image viewer`}
    >
      <div className="flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),1rem)]">
        <span className="text-sm font-medium text-cream-100/80">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream-50 transition-colors hover:bg-cream-50/10"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2" {...swipe}>
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:flex"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        )}

        <div className="h-full max-h-[75vh] w-full max-w-2xl px-4">
          <PlaceholderImage src={images[index]} alt={`${alt} photo ${index + 1}`} label={alt} className="h-full w-full rounded-lg" eager />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20 sm:flex"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {images.length > 1 && images.length <= 12 && (
        <div className="flex items-center justify-center gap-1.5 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brass-300' : 'w-1.5 bg-cream-50/30'}`}
            />
          ))}
        </div>
      )}
      {images.length > 12 && <div className="pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3" />}
    </div>
  )
}
