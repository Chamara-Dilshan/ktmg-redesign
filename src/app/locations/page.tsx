import type { Metadata } from 'next'
import LocationsContent from './LocationsContent'

export const metadata: Metadata = {
  title: 'Our 25 Clinic Locations',
  description: 'Find a Kids & Teens Medical Group clinic near you. 25 locations across Los Angeles including Beverly Hills, Santa Monica, Pasadena, and more.',
}

export default function LocationsPage() {
  return <LocationsContent />
}
