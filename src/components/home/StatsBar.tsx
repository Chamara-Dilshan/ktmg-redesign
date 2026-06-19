const stats = [
  { number: '25',   label: 'Clinic Locations in LA'      },
  { number: '50+',  label: 'Board-Certified Doctors'     },
  { number: '18',   label: 'Years of Excellence'         },
  { number: '0–21', label: 'Ages We Serve'               },
]

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 border-b border-brand-border bg-white md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="border-r border-brand-border px-3 py-5 text-center last:border-r-0 md:px-6 md:py-6">
          <span className="font-heading block text-xl font-extrabold text-teal-dark md:text-3xl">{stat.number}</span>
          <span className="mt-1 block text-xs font-medium text-brand-muted">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
