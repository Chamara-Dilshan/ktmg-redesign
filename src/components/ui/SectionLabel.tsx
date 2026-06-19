import { cn } from '@/lib/utils'

export default function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-bold uppercase tracking-widest text-teal-mid', className)}>
      {children}
    </p>
  )
}
