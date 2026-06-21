import { PHONE_CALL } from '@/lib/constants'

const items = [
  '25 clinics across Los Angeles',
  'Same-day appointments available',
  'Telehealth 7 days a week',
  'All insurance accepted',
  'Ages 0–21',
]

export default function UrgencyBar() {
  return (
    <div className="overflow-hidden bg-teal-dark border-b border-white/[0.07] py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        {/* Scrolling ticker on mobile, static on desktop */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden md:overflow-visible">
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-coral/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-coral md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Open Now
          </span>
          {/* Mobile: marquee */}
          <div className="flex md:hidden animate-marquee whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
              <span key={i} className="mr-8 text-xs text-white/70">
                <span className="mr-8 text-white/30">·</span>{item}
              </span>
            ))}
          </div>
          {/* Desktop: static list */}
          <div className="hidden md:flex items-center gap-5">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-xs text-white/65">
                {i > 0 && <span className="text-white/20">·</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
        <a
          href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
          className="shrink-0 text-xs font-semibold text-coral transition-colors hover:text-white"
        >
          {PHONE_CALL}
        </a>
      </div>
    </div>
  )
}
