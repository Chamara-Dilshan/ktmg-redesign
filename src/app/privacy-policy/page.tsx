import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { EMAIL, PHONE_CALL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and HIPAA Notice of Privacy Practices for Kids & Teens Medical Group.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <SectionLabel className="mb-2">Legal</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Privacy Policy</h1>
        <p className="mb-10 text-sm text-brand-muted">Effective Date: January 1, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-brand-text">

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">1. Introduction</h2>
            <p>
              Kids &amp; Teens Medical Group (&ldquo;KTMG,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy
              of our patients and website visitors. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit <strong>ktdoctor.com</strong> or interact with our
              services.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">2. HIPAA Notice of Privacy Practices</h2>
            <p className="mb-3">
              As a covered healthcare entity, KTMG complies with the Health Insurance Portability and
              Accountability Act (HIPAA). Your Protected Health Information (PHI) is collected and used only for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-brand-muted">
              <li><strong className="text-brand-text">Treatment:</strong> providing and coordinating medical care</li>
              <li><strong className="text-brand-text">Payment:</strong> billing your insurance plan or processing payment</li>
              <li><strong className="text-brand-text">Healthcare Operations:</strong> quality improvement, staff training, and administration</li>
            </ul>
            <p className="mt-3">
              We will not sell your PHI. We share it only as permitted by HIPAA or with your written
              authorization. You have the right to request access to, amendment of, or restrictions on your PHI.
              For a full HIPAA Notice of Privacy Practices, please ask at any KTMG clinic.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">3. Information We Collect on This Website</h2>
            <p className="mb-3">When you use this website, we may collect:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-brand-muted">
              <li><strong className="text-brand-text">Contact information</strong> you voluntarily provide (name, email, phone) via contact or careers forms</li>
              <li><strong className="text-brand-text">Usage data</strong> such as pages visited, browser type, and referring URL via analytics</li>
              <li><strong className="text-brand-text">Device information</strong> including IP address, operating system, and screen resolution</li>
            </ul>
            <p className="mt-3">
              This website does <strong>not</strong> collect payment card information. Online bill payment is
              handled by our secure third-party partner, HealowPay.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">4. How We Use Your Information</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-brand-muted">
              <li>Responding to your inquiries and appointment requests</li>
              <li>Processing employment applications</li>
              <li>Improving website content and user experience</li>
              <li>Sending appointment reminders or health information (only if you have consented)</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">5. Cookies and Tracking</h2>
            <p>
              This website uses cookies to enable core functionality (navigation, session management) and
              analytics (understanding how visitors use the site). You may disable cookies in your browser
              settings; however, some features may not function correctly. We do not use cookies for
              targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">6. Third-Party Services</h2>
            <p className="mb-3">We use trusted third-party services that have their own privacy practices:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-brand-muted">
              <li><strong className="text-brand-text">Healow / eClinicalWorks:</strong> online appointment booking and patient portal</li>
              <li><strong className="text-brand-text">HealowPay:</strong> online bill payment</li>
              <li><strong className="text-brand-text">Google Analytics:</strong> website analytics (anonymized IP)</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third parties for their marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">7. Children&apos;s Privacy</h2>
            <p>
              KTMG provides medical care to patients aged 0–21. Clinical records for minors are protected under
              HIPAA and applicable state law. This website is not directed at children under 13 for the purpose
              of data collection. We do not knowingly collect personal information from children through this
              website without parental consent.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">8. Data Security</h2>
            <p>
              We implement technical and organizational measures to protect your information from unauthorized
              access, alteration, or disclosure. All data transmitted between your browser and our servers is
              encrypted using TLS. While we strive for robust security, no method of transmission over the
              internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">9. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc space-y-1.5 pl-5 text-brand-muted">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your information</li>
              <li>Opt out of non-essential communications</li>
              <li>Request a copy of your HIPAA Notice of Privacy Practices</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the details below.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-bold text-teal-dark">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an
              updated effective date. Continued use of the website after any changes constitutes your acceptance
              of the revised policy.
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-teal-tint p-6">
            <h2 className="font-heading mb-3 text-lg font-bold text-teal-dark">Contact Us</h2>
            <p className="mb-2">
              For privacy-related questions or to exercise your rights, please contact:
            </p>
            <ul className="space-y-1 text-brand-muted">
              <li><strong className="text-brand-text">Kids &amp; Teens Medical Group</strong></li>
              <li>📞 <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="text-coral-ink hover:underline">{PHONE_CALL}</a></li>
              <li>✉️ <a href={`mailto:${EMAIL}`} className="text-coral-ink hover:underline">{EMAIL}</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}
