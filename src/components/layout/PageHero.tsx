import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
  backHref?: string
  backLabel?: string
  ctaLabel?: string
  children?: React.ReactNode
}

export default function PageHero({ label, title, subtitle, backHref, backLabel, ctaLabel, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full bg-coral/[0.04]" />
      <div className="relative mx-auto max-w-7xl">
        {backHref && (
          <Link href={backHref} className="mb-5 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white/80">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel ?? 'Back'}
          </Link>
        )}
        <SectionLabel className="mb-4 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">
          {label}
        </SectionLabel>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white heading-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{subtitle}</p>
        )}
        {ctaLabel && (
          <div className="mt-7">
            <BookingCTA label={ctaLabel} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
