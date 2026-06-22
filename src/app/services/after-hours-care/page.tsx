import type { Metadata } from 'next'
import ServiceDetailLayout from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'After-Hours Pediatric Care',
  description: 'Evening and weekend pediatric care when your child needs help outside regular office hours. Available through our partner after-hours network.',
}

export default function AfterHoursCarePage() {
  return (
    <ServiceDetailLayout
      label="After-Hours Care"
      title="Help When You Need It Most"
      subtitle="Illnesses and injuries don't always happen during office hours. We partner with trusted after-hours pediatric care to ensure your child gets help, day or night."
      heroCta={
        <a
          href="https://pediatricafterhour.com/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-coral-ink px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Learn More
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">→</span>
        </a>
      }
      features={[
        {
          icon: '🌙',
          title: 'Evening Hours',
          desc: "Care available when your regular pediatrician's office is closed, during weekday evenings and nights.",
        },
        {
          icon: '📅',
          title: 'Weekend Support',
          desc: "Saturday and Sunday appointments for illnesses and injuries that can't wait until Monday.",
        },
        {
          icon: '🤝',
          title: 'Trusted Network',
          desc: 'We partner with board-certified pediatricians in the after-hours network for seamless, coordinated care.',
        },
        {
          icon: '📱',
          title: 'Easy Access',
          desc: 'Simple online booking and quick check-in — because your time matters when your child is sick.',
        },
      ]}
      note='Click "Learn More" above to book or contact our after-hours partner network directly.'
    />
  )
}
