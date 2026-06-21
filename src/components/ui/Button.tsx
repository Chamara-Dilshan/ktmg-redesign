import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  external?: boolean
}

export default function Button({ variant = 'primary', href, onClick, children, className, external }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95'
  const variants = {
    primary: 'bg-teal-dark text-white hover:bg-teal-mid shadow-sm',
    ghost:   'border border-white/25 text-white hover:bg-white/10',
    outline: 'border-2 border-teal-dark text-teal-dark hover:bg-teal-dark hover:text-white',
  }
  const cls = cn(base, variants[variant], className)

  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  }
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>
  }
  return <button onClick={onClick} className={cls}>{children}</button>
}
