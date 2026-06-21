import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Specialized Pediatric Care',
  description: 'ADHD evaluation and management, allergy care, sports physicals, and adolescent health services at Kids & Teens Medical Group.',
}

export default function SpecializedCarePage() {
  return (
    <ServiceDetailLayout
      label="Specialized Care"
      title="Expert Care Beyond Routine Check-ups"
      subtitle="From managing ADHD to treating allergies and preparing for sports — our pediatricians offer specialized services that go beyond routine wellness visits."
      features={[
        {
          icon: '🧠',
          title: 'ADHD Evaluation & Management',
          desc: 'Comprehensive assessment, behavior strategies, medication management, and school coordination for children with ADHD.',
        },
        {
          icon: '🌿',
          title: 'Allergy Care',
          desc: 'Diagnosis and treatment of allergies and asthma, including allergen testing and management plans.',
        },
        {
          icon: '🏃',
          title: 'Sports Physicals',
          desc: 'Pre-sports evaluations to ensure your young athlete is healthy and safe to play at their best.',
        },
        {
          icon: '💙',
          title: 'Adolescent Health',
          desc: 'Specialized services for teens: mental health screening, substance use prevention, reproductive health.',
        },
      ]}
      infoBadges={[
        { label: 'Referrals', value: 'Talk to your regular pediatrician' },
        { label: 'Direct Booking', value: 'Available for most services', accent: true },
      ]}
      note="Many specialized services can be arranged through your regular KTMG pediatrician. For direct access, call or book online — same-day availability varies by service."
    />
  )
}
