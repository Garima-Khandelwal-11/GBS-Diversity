import { useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

const SWIPE_THRESHOLD = 40

/** Minimal touch-swipe detector; no dependency needed for simple left/right nav. */
export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const startX = useRef<number | null>(null)

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return
      const delta = e.changedTouches[0].clientX - startX.current
      if (delta > SWIPE_THRESHOLD) onSwipeRight?.()
      else if (delta < -SWIPE_THRESHOLD) onSwipeLeft?.()
      startX.current = null
    },
  }
}
