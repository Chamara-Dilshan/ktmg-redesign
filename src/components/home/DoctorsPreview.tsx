import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import FadeIn from '@/components/ui/FadeIn'
import type { Doctor } from '@/types'

export default function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const preview = doctors.slice(0, 4)
  return (
    <section className="bg-brand-bg px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="relative mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Background watermark number */}
            <span className="pointer-events-none absolute -left-2 -top-4 select-none font-heading text-[96px] font-black leading-none text-teal-dark/[0.04] md:text-[120px]">
              50+
            </span>
            <div className="relative">
              <SectionLabel className="mb-2">Our Team</SectionLabel>
              <h2 className="font-heading text-3xl font-extrabold text-teal-dark">Meet Our Pediatricians</h2>
              <p className="mt-2 text-sm text-brand-muted">Board-certified doctors. All FAAP. Across 25 LA locations.</p>
            </div>
            <Link
              href="/doctors"
              className="relative rounded-xl border-2 border-teal-dark px-5 py-2.5 text-center text-sm font-bold text-teal-dark transition-all duration-200 hover:bg-teal-dark hover:text-white"
            >
              View All Doctors →
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((doc, i) => (
            <FadeIn key={doc.slug} delay={i * 0.08}>
              <DoctorCard doctor={doc} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
