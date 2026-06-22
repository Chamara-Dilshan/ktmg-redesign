'use client'
import CountUp from '@/components/ui/CountUp'
import { useLanguage } from '@/contexts/LanguageContext'

function StatIcon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    // Map pin
    locations: (
      <>
        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </>
    ),
    // Check badge
    doctors: (
      <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    ),
    // Star
    years: (
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    ),
    // Family / users
    ages: (
      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    ),
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  )
}

export default function StatsBar() {
  const { t } = useLanguage()

  const stats = [
    { value: '25',   suffix: '',  icon: 'locations', labelKey: 'stats.clinicLocations',   noteKey: 'stats.acrossGreaterLA'  },
    { value: '50',   suffix: '+', icon: 'doctors',   labelKey: 'stats.boardCertifiedDocs', noteKey: 'stats.allFAAPCertified' },
    { value: '18',   suffix: '',  icon: 'years',     labelKey: 'stats.yearsOfExcellence',  noteKey: 'stats.est2006'          },
    { value: '0–21', suffix: '',  icon: 'ages',      labelKey: 'stats.agesWeServe',        noteKey: 'stats.newbornToAdult'   },
  ]

  return (
    <div className="border-y border-brand-border bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-brand-border md:grid-cols-4 md:divide-y-0">
          {stats.map((s, i) => {
            const teal = i % 2 === 0
            return (
              <div
                key={s.labelKey}
                className="group px-6 py-10 transition-colors duration-200 hover:bg-brand-bg/60 sm:px-8 md:px-10 md:py-12"
              >
                <div
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:-translate-y-0.5 ${
                    teal ? 'bg-teal-tint text-teal-mid' : 'bg-coral/10 text-coral-ink'
                  }`}
                >
                  <StatIcon name={s.icon} />
                </div>

                <div className="flex items-end gap-0.5 leading-none">
                  <p className="font-heading whitespace-nowrap text-[2.75rem] font-extrabold leading-none tracking-tight text-teal-dark sm:text-[3.5rem] md:text-[4.5rem]">
                    <CountUp value={s.value} />
                  </p>
                  {s.suffix && (
                    <span className="mb-1.5 font-heading text-[1.75rem] font-extrabold leading-none text-coral md:text-[2.5rem]">
                      {s.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-teal-dark">{t(s.labelKey)}</p>
                <p className="mt-1 text-xs text-brand-muted">{t(s.noteKey)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
