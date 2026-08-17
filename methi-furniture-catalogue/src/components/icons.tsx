import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M3.5 11.5a1.5 1.5 0 0 1 1.5 1.5v3H4a1 1 0 0 0-1 1V19" />
      <path d="M20.5 11.5A1.5 1.5 0 0 0 19 13v3h1a1 1 0 0 1 1 1V19" />
      <rect x="4" y="11.5" width="16" height="5.5" rx="1.5" />
      <path d="M5 17v2M19 17v2" />
    </svg>
  )
}

export function MattressIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="8" width="18" height="9" rx="1.5" />
      <path d="M3 12h18" />
      <path d="M3 8v9M21 8v9" />
      <path d="M6 12v-4M10 12v-4M14 12v-4M18 12v-4" />
    </svg>
  )
}

export function GlassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M9 3.5v17M15 3.5v17" opacity="0.55" />
    </svg>
  )
}

export function MirrorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2.5" width="12" height="16" rx="6" />
      <path d="M12 18.5V21.5M9 21.5h6" />
    </svg>
  )
}

export function WindowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M12 3.5v17M3.5 12h17" />
    </svg>
  )
}

export function DoorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="2.5" width="13" height="19" rx="1.2" />
      <path d="M15.2 12h.01" />
      <path d="M5.5 21.5h13" />
    </svg>
  )
}

export function SolarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="12" height="9" rx="1" />
      <path d="M2.5 8.3h12M6.3 4v9M10.2 4v9" opacity="0.6" />
      <path d="M18 9v3M18 15.5v3M15 18l1.6-1.6M21 12l-1.6 1.6M21 18l-1.6-1.6M15 12l1.6 1.6" />
    </svg>
  )
}

export function BatteryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="16" height="10" rx="1.5" />
      <path d="M21 10v4" />
      <path d="M8 10l-2 3.2h3L7 17" />
    </svg>
  )
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.1-1.34A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.1c-1.66 0-3.2-.46-4.52-1.26l-.32-.19-3.03.79.81-2.95-.21-.31A8.08 8.08 0 0 1 3.9 12c0-4.48 3.65-8.13 8.13-8.13S20.15 7.52 20.15 12s-3.64 8.1-8.13 8.1z"
      />
    </svg>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 4h3l1.4 4.3-1.9 1.4a12 12 0 0 0 5.3 5.3l1.4-1.9L18 14.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 3 5.6 1.5 1.5 0 0 1 4.5 4z" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.5 7-12A7 7 0 0 0 5 9.5c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1V10" />
    </svg>
  )
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.2" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.2" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.2" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.2" />
    </svg>
  )
}

export function GalleryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="15" height="14" rx="1.5" />
      <circle cx="8" cy="9" r="1.6" />
      <path d="M3.5 17 8.5 12.5 12 15.5 15.5 12 18 14.2" />
      <path d="M21 7.5v10a1.5 1.5 0 0 1-1.5 1.5H8" opacity="0.55" />
    </svg>
  )
}

export function ContactIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.2" r="3.3" />
      <path d="M5 20c0-3.5 3.13-6 7-6s7 2.5 7 6" />
    </svg>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}

export function ImageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m4 17 5.5-5.5L13 15l3-3 4 5" />
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6-5.6-1.9 5.6-1.9L12 2.5z" />
    </svg>
  )
}
