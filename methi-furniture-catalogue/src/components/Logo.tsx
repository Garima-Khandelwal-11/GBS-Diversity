interface LogoMarkProps {
  size?: number
  className?: string
}

/**
 * Emblem: a roofline (home) over a mirror/glass oval resting on furniture
 * feet — the shop's three trades in one mark. Used standalone as the app
 * icon/favicon and inline in LogoLockup below.
 */
export function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Methi Furniture & Glass House logo"
    >
      <rect width="64" height="64" rx="16" fill="#3C2A1F" />
      <path
        d="M15 27 L32 14 L49 27"
        stroke="#CBA05A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <ellipse
        cx="32"
        cy="38.5"
        rx="11.5"
        ry="14"
        fill="none"
        stroke="#F8F3EA"
        strokeWidth="2.5"
      />
      <ellipse cx="32" cy="38.5" rx="7.5" ry="10" fill="#CBA05A" fillOpacity="0.16" />
      <path d="M24 53.5 L21.5 57.5 M40 53.5 L42.5 57.5" stroke="#CBA05A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

interface LogoLockupProps {
  className?: string
  markSize?: number
  /** Use light text (for dark backgrounds like the header/hero) */
  light?: boolean
}

/** Full logo: mark + business name, for the header and hero. */
export function LogoLockup({ className = '', markSize = 44, light = false }: LogoLockupProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-tight text-left">
        <span
          className={`font-display font-semibold tracking-tight ${light ? 'text-cream-50' : 'text-walnut-800'}`}
          style={{ fontSize: markSize * 0.42 }}
        >
          Methi Furniture
        </span>
        <span
          className={`font-display -mt-0.5 ${light ? 'text-brass-300' : 'text-walnut-500'}`}
          style={{ fontSize: markSize * 0.32 }}
        >
          &amp; Glass House
        </span>
      </span>
    </span>
  )
}
