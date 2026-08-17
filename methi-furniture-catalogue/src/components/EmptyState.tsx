import type { ReactNode } from 'react'
import { ImageIcon } from './icons'

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
        <ImageIcon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-display text-lg font-medium text-walnut-800">{title}</p>
        {description && <p className="mt-1 max-w-xs text-sm text-stone-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
