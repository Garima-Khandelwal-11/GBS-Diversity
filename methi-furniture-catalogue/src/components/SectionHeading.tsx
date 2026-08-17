interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, className = '', align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-brass-600">{eyebrow}</p>}
      <h2 className="font-display text-2xl font-semibold text-walnut-800 sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-xl text-stone-600">{description}</p>}
    </div>
  )
}
