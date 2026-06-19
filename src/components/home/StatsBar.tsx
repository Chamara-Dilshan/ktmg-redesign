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
        <div key={i} className="border-r border-brand-border px-6 py-6 text-center last:border-r-0">
          <span className="font-heading block text-3xl font-extrabold text-teal-dark">{stat.number}</span>
          <span className="mt-1 block text-xs font-medium text-brand-muted">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
