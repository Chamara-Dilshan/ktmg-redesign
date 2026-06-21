'use client'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { value: '25',   suffix: '',  label: 'Clinic Locations',     note: 'Across Greater LA' },
  { value: '50',   suffix: '+', label: 'Board-Certified Docs', note: 'All FAAP Certified' },
  { value: '18',   suffix: '',  label: 'Years of Excellence',  note: 'Est. 2006' },
  { value: '0–21', suffix: '',  label: 'Ages We Serve',        note: 'Newborn to Adult' },
]

export default function StatsBar() {
  return (
    <div className="border-y border-brand-border bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-brand-border md:grid-cols-4 md:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-12 md:px-10 md:py-14">
              <div className="flex items-end gap-0.5 leading-none">
                <p className="font-heading text-[4rem] font-extrabold leading-none tracking-tight text-teal-dark md:text-[5.5rem]">
                  <CountUp value={s.value} />
                </p>
                {s.suffix && (
                  <span className="mb-2 font-heading text-[2rem] font-extrabold leading-none text-coral md:text-[3rem]">
                    {s.suffix}
                  </span>
                )}
              </div>
              <div className="mt-4 h-0.5 w-10 bg-coral" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-text">{s.label}</p>
              <p className="mt-1 text-[11px] text-brand-muted">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
