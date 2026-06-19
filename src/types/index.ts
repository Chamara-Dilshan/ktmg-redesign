export interface Location {
  slug: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat?: number
  lng?: number
  officeHours: string        // e.g. "Mon–Fri 9AM–6PM"
  saturdayHours?: string     // Only Downey: "Sat 8AM–4PM"
  telehealthHours: string    // e.g. "Mon–Sun 9AM–8PM"
  providers: string[]        // doctor slugs at this location
  mapsEmbed?: string         // Google Maps embed src URL
}

export interface Doctor {
  slug: string
  name: string
  credentials: string        // e.g. "MD, FAAP"
  locations: string[]        // location slugs
  photo?: string             // path to /public/doctors/{slug}.jpg
  bio?: string
}

export interface Service {
  slug: string
  name: string
  icon: string               // emoji or icon name
  description: string
  hours?: string
  ctaLabel: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  rating: number
}
