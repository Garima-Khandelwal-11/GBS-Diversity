import { business } from '../data/business'
import { WhatsAppButton, CallButton, DirectionsButton } from '../components/Buttons'
import { LogoMark } from '../components/Logo'
import { MapPinIcon, PhoneIcon, WhatsAppIcon } from '../components/icons'
import { SectionHeading } from '../components/SectionHeading'

export function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <SectionHeading
        align="center"
        eyebrow="Get in touch"
        title="We'd love to help you find the right fit"
        className="mx-auto"
      />

      <div className="mt-8 overflow-hidden rounded-3xl bg-stone-100">
        <div className="flex flex-col items-center gap-3 bg-walnut-800 px-6 py-10 text-center">
          <LogoMark size={56} />
          <h2 className="font-display text-xl font-semibold text-cream-50">{business.name}</h2>
          <p className="text-sm text-cream-100/75">{business.tagline}</p>
        </div>

        <div className="space-y-5 px-6 py-8">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-walnut-600 shadow-card">
              <MapPinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Address</p>
              <p className="mt-0.5 text-walnut-800">{business.addressLine}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-walnut-600 shadow-card">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Phone / WhatsApp</p>
              <p className="mt-0.5 text-walnut-800">{business.phoneDisplay}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-walnut-600 shadow-card">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Enquiries</p>
              <p className="mt-0.5 text-walnut-800">Message us anytime — we typically reply the same day.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 px-6 pb-8 sm:grid-cols-3">
          <WhatsAppButton size="lg" className="w-full" />
          <CallButton size="lg" variant="secondary" className="w-full" />
          <DirectionsButton size="lg" className="w-full" />
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-stone-500">
        Directions open in Google Maps and search for &ldquo;{business.mapsQuery}&rdquo;.
      </p>
    </div>
  )
}
