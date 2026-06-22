import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'
import { PHONE_TEXT_ES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Telehealth for Children',
  description: 'Video visits from the comfort of home. Kids & Teens Medical Group telehealth services available Mon–Sun 9AM–8PM. Also available in Spanish.',
}

export default function TelehealthPage() {
  return (
    <ServiceDetailLayout
      label="Telehealth"
      title="Convenient Care from Home"
      subtitle="Video visits with our pediatricians from the comfort of your home. Available seven days a week, plus evening hours for working families."
      features={[
        {
          icon: 'home',
          title: 'Convenience',
          desc: 'No travel time — video visits from home, school, or anywhere with a safe, private space.',
        },
        {
          icon: 'bolt',
          title: 'Quick Access',
          desc: 'Often same-day or next-day appointments available, with shorter wait times than in-person visits.',
        },
        {
          icon: 'calendar',
          title: 'Flexible Scheduling',
          desc: "Open seven days a week, including early mornings and evenings to fit your family's schedule.",
        },
        {
          icon: 'user-group',
          title: 'Continuity of Care',
          desc: "Work with your child's regular pediatrician or another trusted KTMG provider via secure video.",
        },
      ]}
      infoBadges={[
        { label: 'Hours', value: 'Mon–Sun 9AM–8PM' },
        { label: 'En Español', value: `Text ${PHONE_TEXT_ES}`, accent: true },
      ]}
      note="Telehealth visits are ideal for follow-ups, mild illness, behavioral questions, and prescription renewals. Some conditions require an in-person visit — your provider will let you know."
    />
  )
}
