import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'teal-dark':   '#073f49',
        'teal-deep':   '#04272F',  // deepest teal — testimonials band, distinct from teal-dark
        'teal-mid':    '#047391',
        'teal-light':  '#7dd3e8',
        'coral':       '#E8612C',
        'coral-ink':   '#BD471C',  // AA-compliant coral for small text links on light bg (>=4.5:1)
        'brand-bg':    '#FBF8F4',
        'brand-text':  '#1A1A2E',
        'brand-muted': '#5B6270',
        'brand-border':'#E8E2D9',
        'brand-amber': '#F5A623',
        'teal-tint':   '#E8F4F7',
      },
      fontFamily: {
        heading: ['var(--font-bricolage)', 'sans-serif'],
        body:    ['var(--font-jakarta)',   'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
