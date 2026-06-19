import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import type { Doctor } from '@/types'

export default function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const preview = doctors.slice(0, 4)
  return (
    <section className="bg-white px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel className="mb-2">Our Team</SectionLabel>
            <h2 className="font-heading text-3xl font-extrabold text-teal-dark">Meet Our Pediatricians</h2>
            <p className="mt-2 text-sm text-brand-muted">50+ board-certified doctors and nurse practitioners across LA.</p>
          </div>
          <Link href="/doctors" className="rounded-lg border-2 border-teal-dark px-5 py-2.5 text-sm font-bold text-teal-dark hover:bg-teal-tint">
            View All Doctors
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
        </div>
      </div>
    </section>
  )
}
