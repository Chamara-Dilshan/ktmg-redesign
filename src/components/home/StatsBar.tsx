'use client'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { value: '25',   label: 'Clinic Locations'       },
  { value: '50+',  label: 'Board-Certified Doctors' },
  { value: '18',   label: 'Years of Excellence'     },
  { value: '0–21', label: 'Ages We Serve'           },
]

export default function StatsBar() {
  return (
    <section className="bg-teal-dark">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center justify-center px-6 py-10 transition-colors duration-200 hover:bg-white/5 md:py-12"
            >
              <p className="font-heading text-5xl font-black leading-none text-white md:text-7xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
