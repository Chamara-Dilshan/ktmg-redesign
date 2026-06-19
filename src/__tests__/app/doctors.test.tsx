import { render, screen } from '@testing-library/react'
import DoctorCard from '@/components/doctors/DoctorCard'
import type { Doctor } from '@/types'

const mockDoctor: Doctor = {
  slug: 'janesri-de-silva',
  name: 'Dr. Janesri De Silva',
  credentials: 'MD, FAAP',
  locations: ['la-canada-flintridge'],
}

describe('DoctorCard', () => {
  it('renders doctor name', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByText('Dr. Janesri De Silva')).toBeInTheDocument()
  })

  it('renders credentials', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByText('MD, FAAP')).toBeInTheDocument()
  })

  it('links to the doctor profile page', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/doctors/janesri-de-silva')
  })
})
