import { render, screen } from '@testing-library/react'
import LocationCard from '@/components/locations/LocationCard'
import type { Location } from '@/types'

const mockLocation: Location = {
  slug: 'beverly-hills',
  name: 'Beverly Hills',
  address: '8733 Beverly Blvd., #200',
  city: 'West Hollywood',
  state: 'CA',
  zip: '90048',
  officeHours: 'Mon–Fri 9AM–6PM',
  telehealthHours: 'Mon–Sun 9AM–8PM',
  providers: [],
}

describe('LocationCard', () => {
  it('renders clinic name', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByText('Beverly Hills')).toBeInTheDocument()
  })

  it('renders address', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByText(/8733 Beverly Blvd/)).toBeInTheDocument()
  })

  it('renders a link to the location page', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/locations/beverly-hills')
  })

  it('highlights Saturday hours when present', () => {
    const downey: Location = { ...mockLocation, slug: 'downey', name: 'Downey', saturdayHours: 'Sat 8AM–4PM' }
    render(<LocationCard location={downey} />)
    expect(screen.getByText(/sat 8am/i)).toBeInTheDocument()
  })
})
