import type { ReactNode } from 'react'
import { WhatsAppIcon, PhoneIcon, MapPinIcon } from './icons'
import { whatsappGeneralLink, whatsappProductLink, callLink, directionsLink } from '../utils/links'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-walnut-700 text-cream-50 hover:bg-walnut-800 active:bg-walnut-900 shadow-card',
  secondary: 'bg-brass-400 text-walnut-900 hover:bg-brass-500 active:bg-brass-600 shadow-card',
  outline: 'border border-stone-300 text-walnut-700 hover:bg-stone-100 active:bg-stone-200',
  ghost: 'text-walnut-700 hover:bg-stone-100 active:bg-stone-200',
}

const sizeClasses: Record<Size, string> = {
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-13 px-6 text-base gap-2.5',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

function BtnBase({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ariaLabel,
}: BaseProps & { href: string; ariaLabel: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className={`inline-flex select-none items-center justify-center rounded-full font-medium transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </a>
  )
}

export function WhatsAppButton({
  productName,
  label,
  variant = 'primary',
  size = 'md',
  className,
}: BaseProps & { productName?: string; label?: string }) {
  const href = productName ? whatsappProductLink(productName) : whatsappGeneralLink()
  const bg = variant === 'primary' ? 'bg-whatsapp hover:bg-whatsapp-dark active:bg-whatsapp-dark shadow-card' : variantClasses[variant]
  return (
    <BtnBase href={href} variant={variant} size={size} ariaLabel="Enquire on WhatsApp" className={`${bg} ${className ?? ''}`}>
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{label ?? 'WhatsApp'}</span>
    </BtnBase>
  )
}

export function CallButton({ label, variant = 'outline', size = 'md', className }: BaseProps & { label?: string }) {
  return (
    <BtnBase href={callLink()} variant={variant} size={size} ariaLabel="Call the shop" className={className}>
      <PhoneIcon className="h-5 w-5 shrink-0" />
      <span>{label ?? 'Call Now'}</span>
    </BtnBase>
  )
}

export function DirectionsButton({ label, variant = 'outline', size = 'md', className }: BaseProps & { label?: string }) {
  return (
    <BtnBase href={directionsLink()} variant={variant} size={size} ariaLabel="Get directions to the shop" className={className}>
      <MapPinIcon className="h-5 w-5 shrink-0" />
      <span>{label ?? 'Get Directions'}</span>
    </BtnBase>
  )
}
