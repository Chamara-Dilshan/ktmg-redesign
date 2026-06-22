import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Pediatric Urgent Care LA',
  description: 'Immediate care for non-emergency illnesses and injuries. Kids & Teens Medical Group urgent care — less waiting, same trusted pediatric care for ages 0–21.',
}

export default function UrgentCarePage() {
  return (
    <ServiceDetailLayout
      label="Urgent Care"
      title="When Your Child Needs Care Today"
      subtitle="Non-emergency illnesses and injuries deserve immediate attention. Our urgent care clinics are staffed by experienced pediatricians, with minimal waiting and maximum peace of mind."
      features={[
        {
          icon: 'plus-circle',
          title: 'Immediate Care',
          desc: 'Fast assessment and treatment for fevers, coughs, ear infections, sprains, cuts, and other urgent needs.',
        },
        {
          icon: 'clock',
          title: 'Less Waiting',
          desc: 'Shorter wait times than emergency rooms, with streamlined check-in and efficient care.',
        },
        {
          icon: 'check-circle',
          title: 'No ER Visit Needed',
          desc: "Handle most minor injuries and illnesses right here — avoid the hospital when your child doesn't need it.",
        },
        {
          icon: 'face-smile',
          title: 'Ages 0–21',
          desc: 'Our urgent care clinics serve the full pediatric age range, from infants to young adults.',
        },
      ]}
      infoBadges={[
        { label: 'Walk-in', value: 'No appointment needed', accent: true },
        { label: 'Book Ahead', value: 'Call or text for faster service' },
      ]}
    />
  )
}
