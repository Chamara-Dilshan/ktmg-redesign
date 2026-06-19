import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kids & Teens Medical Group | Pediatric Care Los Angeles',
    template: '%s | Kids & Teens Medical Group',
  },
  description: "LA's largest pediatric network. 25 clinics, 50+ board-certified doctors, same-day appointments. Serving children ages 0–21.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="font-body bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  )
}
