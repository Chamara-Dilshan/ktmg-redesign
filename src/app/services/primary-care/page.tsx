import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Primary Care for Children',
  description: 'Kids & Teens Medical Group primary care clinics across Los Angeles. Serving children ages 0–21 with routine check-ups, immunizations, and same-day appointments.',
}

export default function PrimaryCarePage() {
  return (
    <ServiceDetailLayout
      label="Primary Care"
      title="Primary Care Across Los Angeles"
      subtitle="Routine check-ups, immunizations, and ongoing wellness care for children ages 0–21. Walk-in and same-day appointments available at 25 locations."
      features={[
        {
          icon: '🩺',
          title: 'Well-Child Visits',
          desc: 'Regular check-ups from newborn through adolescence, tracking growth and development milestones.',
        },
        {
          icon: '💉',
          title: 'Immunizations',
          desc: 'Full pediatric vaccination schedule following AAP guidelines, with easy scheduling and records.',
        },
        {
          icon: '⚡',
          title: 'Same-Day Appointments',
          desc: 'Walk-in or call to book same-day — available at all 25 locations, Monday through Friday.',
        },
        {
          icon: '👶',
          title: 'Ages 0–21',
          desc: 'We care for patients from newborns through young adults, ensuring continuity of care across every stage.',
        },
      ]}
      infoBadges={[
        { label: 'Office Hours', value: 'Mon–Fri 9AM–6PM' },
        { label: 'Telehealth', value: 'Mon–Sun 9AM–8PM', accent: true },
      ]}
    />
  )
}
