'use client'
import CountUp from '@/components/ui/CountUp'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StatsBar() {
  const { t } = useLanguage()

  const stats = [
    { value: '25',   suffix: '',  labelKey: 'stats.clinicLocations',   noteKey: 'stats.acrossGreaterLA'   },
    { value: '50',   suffix: '+', labelKey: 'stats.boardCertifiedDocs', noteKey: 'stats.allFAAPCertified'  },
    { value: '18',   suffix: '',  labelKey: 'stats.yearsOfExcellence',  noteKey: 'stats.est2006'           },
    { value: '0–21', suffix: '',  labelKey: 'stats.agesWeServe',        noteKey: 'stats.newbornToAdult'    },
  ]

  return (
    <div className="border-y border-brand-border bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-brand-border md:grid-cols-4 md:divide-y-0">
          {stats.map((s, i) => (
            <div key={s.labelKey} className="px-6 py-12 sm:px-8 md:px-10 md:py-14">
              <div className="flex items-end gap-0.5 leading-none">
                <p className="font-heading whitespace-nowrap text-[3.25rem] font-extrabold leading-none tracking-tight text-teal-dark sm:text-[4rem] md:text-[5.5rem]">
                  <CountUp value={s.value} />
                </p>
                {s.suffix && (
                  <span className="mb-2 font-heading text-[2rem] font-extrabold leading-none text-coral md:text-[3rem]">
                    {s.suffix}
                  </span>
                )}
              </div>
              <div className={`mt-4 h-0.5 w-10 ${i % 2 === 0 ? 'bg-coral' : 'bg-brand-amber'}`} />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-text">{t(s.labelKey)}</p>
              <p className="mt-1 text-[11px] text-brand-muted">{t(s.noteKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
