import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import WhyUs from '@/components/home/WhyUs'
import ServicesGrid from '@/components/home/ServicesGrid'
import ClinicFinder from '@/components/home/ClinicFinder'
import DoctorsPreview from '@/components/home/DoctorsPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import InsuranceSection from '@/components/home/InsuranceSection'
import services from '@/data/services.json'
import doctors from '@/data/doctors.json'
import testimonials from '@/data/testimonials.json'
import locations from '@/data/locations.json'
import type { Service, Doctor, Testimonial, Location } from '@/types'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <WhyUs />
      <ServicesGrid services={services as Service[]} />
      <ClinicFinder locations={locations as Location[]} />
      <DoctorsPreview doctors={doctors as Doctor[]} />
      <TestimonialsSection testimonials={testimonials as Testimonial[]} />
      <InsuranceSection />
    </>
  )
}
