'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DISTANCE, DURATION, EASE_OUT } from '@/lib/motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = DISTANCE,
}: FadeInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-48px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{
        duration: DURATION,
        delay,
        ease: EASE_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
