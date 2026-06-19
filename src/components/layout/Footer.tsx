import Link from 'next/link'
import Image from 'next/image'
import { EMAIL, PHONE_CALL, PHONE_TEXT_EN, SOCIAL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt="Kids & Teens Medical Group" width={44} height={44} />
              <span className="text-sm font-semibold text-white">Kids & Teens Medical Group</span>
            </div>
            <p className="text-sm leading-relaxed">
              The leading provider of pediatric care in Southern California. 25 clinics, extended hours, and a team that treats your child like family.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { href: SOCIAL.facebook,  label: 'Facebook'  },
                { href: SOCIAL.instagram, label: 'Instagram' },
                { href: SOCIAL.youtube,   label: 'YouTube'   },
                { href: SOCIAL.twitter,   label: 'X'         },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                   aria-label={s.label}
                   className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs hover:bg-white/20">
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              {['Primary Care', 'Telehealth', 'Urgent Care', 'After-Hours Care', 'Prenatal Consultation'].map(s => (
                <li key={s}><Link href={`/services/${s.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">For Patients</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/locations"         className="hover:text-white">Find a Clinic</Link></li>
              <li><Link href="/doctors"            className="hover:text-white">Our Doctors</Link></li>
              <li><Link href="/insurance"          className="hover:text-white">Insurance</Link></li>
              <li><Link href="/patient-resources"  className="hover:text-white">Patient Resources</Link></li>
              <li><Link href="/share-your-experience" className="hover:text-white">Testimonials</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="hover:text-white">📞 {PHONE_CALL}</a></li>
              <li><a href={`tel:${PHONE_TEXT_EN.replace(/\D/g, '')}`} className="hover:text-white">💬 {PHONE_TEXT_EN} (Text EN)</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white">✉️ {EMAIL}</a></li>
              <li><Link href="/about-us"  className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers"   className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs">
          <span>© 2026 Kids & Teens Medical Group. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy"    className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-conditions"  className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
