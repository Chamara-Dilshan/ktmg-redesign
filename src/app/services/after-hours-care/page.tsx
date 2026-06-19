import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'After-Hours Pediatric Care',
  description: 'Evening and weekend pediatric care when your child needs help outside regular office hours. Available through our partner after-hours network.',
}

export default function AfterHoursCarePage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">After-Hours Care</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Help When You Need It Most</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Illnesses and injuries don&apos;t always happen during office hours. We partner with trusted after-hours pediatric care to ensure your child gets help, day or night.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://pediatricafterhour.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Evening Hours',    desc: 'Care available when your regular pediatrician\'s office is closed, during weekday evenings and nights.'      },
            { title: 'Weekend Support',  desc: 'Saturday and Sunday appointments for illnesses and injuries that can\'t wait until Monday.'         },
            { title: 'Trusted Network',  desc: 'We partner with board-certified pediatricians in the after-hours network for seamless, coordinated care.'             },
            { title: 'Easy Access',      desc: 'Simple online booking and quick check-in — because your time matters when your child is sick.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Click &quot;Learn More&quot; above to book or contact our after-hours partner network.</p>
        </div>
      </div>
    </>
  )
}
