import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import services from '@/data/services.json'
import testimonials from '@/data/testimonials.json'

describe('data files', () => {
  test('locations has 25 entries each with required fields', () => {
    expect(locations).toHaveLength(25)
    locations.forEach((loc: Record<string, unknown>) => {
      expect(loc).toHaveProperty('slug')
      expect(loc).toHaveProperty('name')
      expect(loc).toHaveProperty('address')
      expect(loc).toHaveProperty('city')
      expect(loc).toHaveProperty('state')
      expect(loc).toHaveProperty('zip')
      expect(loc).toHaveProperty('officeHours')
      expect(loc).toHaveProperty('telehealthHours')
      expect(loc).toHaveProperty('providers')
    })
  })

  test('doctors has at least 50 entries each with required fields', () => {
    expect(doctors.length).toBeGreaterThanOrEqual(50)
    doctors.forEach((doc: Record<string, unknown>) => {
      expect(doc).toHaveProperty('slug')
      expect(doc).toHaveProperty('name')
      expect(doc).toHaveProperty('credentials')
      expect(doc).toHaveProperty('locations')
    })
  })

  test('services has exactly 6 entries', () => {
    expect(services).toHaveLength(6)
  })

  test('testimonials has at least 3 entries', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(3)
  })
})
