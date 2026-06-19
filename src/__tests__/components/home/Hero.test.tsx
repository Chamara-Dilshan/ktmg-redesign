import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/compassionate care/i)
  })

  it('renders a Book Appointment link to Healow', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link', { name: /book appointment/i })
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('healow.com'))
  })
})
