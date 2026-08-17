import { useRef, useState } from 'react'
import { PlaceholderImage } from './PlaceholderImage'
import { Lightbox } from './Lightbox'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

/** Swipeable image gallery for the product detail page, with a tap-to-zoom lightbox. */
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    setActiveIndex(Math.min(index, images.length - 1))
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl bg-stone-100"
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => {
              setActiveIndex(i)
              setLightboxOpen(true)
            }}
            aria-label={`View ${alt} photo ${i + 1} full screen`}
            className="h-full w-full shrink-0 snap-center"
          >
            <PlaceholderImage src={src} alt={`${alt} photo ${i + 1}`} label={alt} className="h-full w-full" eager={i === 0} />
          </button>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-walnut-700' : 'w-1.5 bg-stone-300'
              }`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                i === activeIndex ? 'ring-walnut-700' : 'ring-transparent'
              }`}
            >
              <PlaceholderImage src={src} alt="" label="" className="h-full w-full" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox images={images} startIndex={activeIndex} alt={alt} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  )
}
