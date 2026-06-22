import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders the Book Now CTA linking to Healow', () => {
    render(<Navbar />)
    const cta = screen.getByRole('link', { name: /book now/i })
    expect(cta).toHaveAttribute('href', expect.stringContaining('healow.com'))
  })

  it('renders the main nav links', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /find a clinic/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^doctors$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument()
  })
})
