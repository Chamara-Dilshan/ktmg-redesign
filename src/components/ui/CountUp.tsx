'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  className?: string
}

function parse(v: string) {
  const m = v.match(/^(\d+)(.*)$/)
  return m ? { num: parseInt(m[1]), suffix: m[2] } : { num: 0, suffix: v }
}

export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const { num, suffix } = parse(value)
  const [count, setCount] = useState(0)

  // Non-numeric value (e.g. '0–21')
  const isNumeric = num > 0 || value === '0'

  useEffect(() => {
    if (!inView || !isNumeric) return
    const duration = 1400
    const fps = 60
    const steps = Math.floor((duration / 1000) * fps)
    let i = 0
    const timer = setInterval(() => {
      i++
      const progress = i / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * num))
      if (i >= steps) { setCount(num); clearInterval(timer) }
    }, 1000 / fps)
    return () => clearInterval(timer)
  }, [inView, num, isNumeric])

  if (!isNumeric) return <span ref={ref} className={className}>{value}</span>
  return <span ref={ref} className={className}>{count}{suffix}</span>
}
