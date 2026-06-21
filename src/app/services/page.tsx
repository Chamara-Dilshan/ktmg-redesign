import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Pediatric Services',
  description: 'Kids & Teens Medical Group offers primary care, telehealth, urgent care, after-hours care, prenatal consultations, and specialized care for children 0–21.',
}

export default function ServicesPage() {
  return <ServicesContent />
}
