import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { EMAIL, PHONE_CALL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions of use for the Kids & Teens Medical Group website.',
}

export default function TermsConditionsPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <SectionLabel className="mb-2">Legal</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Terms &amp; Conditions</h1>
        <p className="mb-10 text-sm text-brand-muted">Effective Date: January 1, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-brand-text">

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">1. Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>ktdoctor.com</strong> (the &ldquo;Site&rdquo;), you agree to be bound by
              these Terms &amp; Conditions and our <a href="/privacy-policy" className="font-semibold text-coral hover:underline">Privacy Policy</a>.
              If you do not agree, please do not use the Site. Kids &amp; Teens Medical Group (&ldquo;KTMG&rdquo;)
              reserves the right to modify these terms at any time; continued use of the Site constitutes
              acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">2. Not a Substitute for Medical Advice</h2>
            <p>
              The content on this Site is provided for <strong>general informational purposes only</strong>. It is not
              intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek
              the guidance of a qualified healthcare provider with any questions you may have regarding a medical
              condition. Never disregard professional medical advice or delay seeking it because of something you
              have read on this Site.
            </p>
            <p className="mt-3">
              In case of a medical emergency, call <strong>911</strong> immediately.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">3. Appointment Booking</h2>
            <p>
              Online appointment requests made through this Site or our patient portal are subject to
              availability and confirmation by KTMG staff. Submitting a booking request does not guarantee an
              appointment. KTMG reserves the right to decline or reschedule appointments.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">4. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, logos, graphics, and design — is the property
              of Kids &amp; Teens Medical Group or its content suppliers and is protected by applicable copyright
              and trademark laws. You may not reproduce, distribute, or create derivative works without our
              express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">5. Third-Party Links</h2>
            <p>
              This Site may contain links to third-party websites (e.g., patient portal, payment processor,
              review platforms). These links are provided for convenience only. KTMG does not control and is not
              responsible for the content, privacy practices, or terms of any third-party site. Accessing
              third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">6. User Submissions</h2>
            <p>
              Any information you submit through this Site — including contact forms, careers applications, or
              feedback — must be truthful, accurate, and lawful. You grant KTMG a non-exclusive, royalty-free
              license to use submissions for the purpose they were intended (e.g., processing your application).
              Do not submit confidential medical information through contact forms; use the secure patient portal
              instead.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">7. Disclaimer of Warranties</h2>
            <p>
              The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or
              implied, including but not limited to warranties of merchantability, fitness for a particular
              purpose, or non-infringement. KTMG does not warrant that the Site will be uninterrupted,
              error-free, or free of viruses.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, KTMG shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your use of (or inability to use) this
              Site, even if KTMG has been advised of the possibility of such damages. Our total liability to
              you for any claim shall not exceed $100.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">9. Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of the State of California, without regard to
              its conflict-of-law provisions. Any disputes shall be resolved in the courts of Los Angeles County,
              California.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">10. Contact</h2>
            <div className="rounded-xl border border-brand-border bg-teal-tint p-6">
              <p className="mb-3">Questions about these Terms? Reach us at:</p>
              <ul className="space-y-1 text-brand-muted">
                <li><strong className="text-brand-text">Kids &amp; Teens Medical Group</strong></li>
                <li>📞 <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="text-coral hover:underline">{PHONE_CALL}</a></li>
                <li>✉️ <a href={`mailto:${EMAIL}`} className="text-coral hover:underline">{EMAIL}</a></li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
