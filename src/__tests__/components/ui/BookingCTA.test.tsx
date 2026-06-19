import { render, screen } from '@testing-library/react'
import BookingCTA from '@/components/ui/BookingCTA'
import { HEALOW_URL } from '@/lib/constants'

describe('BookingCTA', () => {
  it('renders a link to HEALOW_URL', () => {
    render(<BookingCTA />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', HEALOW_URL)
  })

  it('renders default label "Book Appointment"', () => {
    render(<BookingCTA />)
    expect(screen.getByText(/book appointment/i)).toBeInTheDocument()
  })

  it('renders custom label when provided', () => {
    render(<BookingCTA label="Book Now" />)
    expect(screen.getByText('Book Now')).toBeInTheDocument()
  })
})
