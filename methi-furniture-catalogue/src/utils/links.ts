import { business } from '../data/business'

const GENERAL_ENQUIRY_MESSAGE = `Hello ${business.name}, I would like to enquire about a product from your catalogue.`

/** WhatsApp link for a general enquiry (used on the homepage / contact page). */
export function whatsappGeneralLink() {
  return `https://wa.me/${business.phoneE164}?text=${encodeURIComponent(GENERAL_ENQUIRY_MESSAGE)}`
}

/** WhatsApp link pre-filled with a specific product name (used on product pages). */
export function whatsappProductLink(productName: string) {
  const message = `Hello ${business.name}, I am interested in ${productName}. Please provide more information.`
  return `https://wa.me/${business.phoneE164}?text=${encodeURIComponent(message)}`
}

/** tel: link for the "Call Now" buttons. */
export function callLink() {
  return `tel:+${business.phoneE164}`
}

/** Google Maps search link — intentionally a text search, not a fabricated pin. */
export function directionsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`
}
