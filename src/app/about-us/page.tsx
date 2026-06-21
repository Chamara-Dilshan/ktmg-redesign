import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Kids & Teens Medical Group — 18 years caring for LA families. 25 clinics, 50+ board-certified pediatricians. Operating in Los Angeles, Sri Lanka, and Mexico.",
}

export default function AboutUsPage() {
  return <AboutContent />
}
