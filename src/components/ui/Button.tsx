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
  const base = 'inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90'
  const variants = {
    primary: 'bg-teal-dark text-white',
    ghost:   'border border-white/30 bg-white/10 text-white',
    outline: 'border-2 border-teal-dark text-teal-dark',
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
