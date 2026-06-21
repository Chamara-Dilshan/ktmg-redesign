import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Prenatal Consultation',
  description: "Meet your pediatrician before baby arrives. Kids & Teens Medical Group prenatal consultations help families prepare for their newborn's care.",
}

export default function PrenatalConsultationPage() {
  return (
    <ServiceDetailLayout
      label="Prenatal Consultation"
      title="Meet Your Baby's Pediatrician"
      subtitle="Getting ready for baby's arrival? Schedule a prenatal consultation to meet your pediatrician, ask questions, and plan your newborn's first days of care."
      features={[
        {
          icon: '👩‍⚕️',
          title: 'Meet Your Pediatrician',
          desc: "Get to know the doctor who'll care for your newborn, discuss your parenting approach, and build trust before baby arrives.",
        },
        {
          icon: '💬',
          title: 'Answer Your Questions',
          desc: "Breastfeeding, sleep, feeding schedules, vaccines — ask everything. We're here to prepare you for success.",
        },
        {
          icon: '🏥',
          title: 'Hospital Coordination',
          desc: 'We coordinate with partner hospitals in LA for first visits and hospital birth follow-ups.',
        },
        {
          icon: '👶',
          title: 'Newborn Preparation',
          desc: "Learn what to expect during your newborn's first checkups, screening tests, and ongoing preventive care.",
        },
      ]}
      infoBadges={[
        { label: 'Best Time', value: 'Third trimester (28+ weeks)', accent: true },
        { label: 'Availability', value: 'At all 25 LA locations' },
      ]}
      note="We recommend scheduling your prenatal consultation during the third trimester to ensure your pediatrician is in place before baby arrives."
    />
  )
}
