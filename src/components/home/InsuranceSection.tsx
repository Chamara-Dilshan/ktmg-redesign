import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'

const partners = ['Regal Medical Group', 'LA Care', 'Molina Healthcare', 'Medi-Cal', 'Blue Cross', 'Optum', 'Cedar Sinai', 'CHLA']

export default function InsuranceSection() {
  return (
    <section className="border-y border-brand-border bg-white px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-3">
        <div className="md:col-span-1">
          <SectionLabel className="mb-2">Insurance</SectionLabel>
          <h2 className="font-heading mb-3 text-2xl font-extrabold text-teal-dark">We Accept All Insurance</h2>
          <p className="mb-6 text-sm leading-relaxed text-brand-muted">
            Including HMO, PPO, Medi-Cal, and most commercial plans. No insurance? Ask about affordable options.
          </p>
          <BookingCTA label="Check Your Insurance" />
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-2">
          {partners.map(p => (
            <span key={p} className="rounded-lg border border-brand-border bg-brand-bg px-4 py-2 text-xs font-semibold text-brand-muted">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
