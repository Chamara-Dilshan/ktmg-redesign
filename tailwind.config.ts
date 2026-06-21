import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'teal-dark':   '#073f49',
        'teal-mid':    '#047391',
        'teal-light':  '#7dd3e8',
        'coral':       '#E8612C',
        'brand-bg':    '#F8FAFB',
        'brand-text':  '#1A1A2E',
        'brand-muted': '#6B7280',
        'brand-border':'#E0EAED',
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
