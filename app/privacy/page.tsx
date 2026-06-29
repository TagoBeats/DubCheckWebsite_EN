import type { Metadata } from 'next'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - How DubCheck handles your data',
  description:
    'How audio-dubcheck.com handles personal data: what we collect, why, how long we keep it, your GDPR rights, cookies, hosting, analytics and third-party services.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    url: '/privacy',
    title: 'Privacy Policy - DubCheck',
    description: 'How DubCheck handles your data under GDPR.',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="relative z-[1] max-w-[900px] mx-auto px-5 md:px-10">
        <Nav />
        <main className="pt-[60px] pb-[80px]">
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3 mb-3">§ Legal</div>
          <h1 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em] mb-10">Privacy Policy</h1>

          {/* 1 */}
          <section className="mb-10">
            <h2 className="text-[20px] font-semibold text-dc-ink tracking-[-0.015em] mb-4">
              1. Privacy at a Glance
            </h2>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">General Information</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-4">
              The following information provides a simple overview of what happens to your personal
              data when you visit this website. Personal data is any data by which you can be
              personally identified.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-3">Data Collection on This Website</h3>

            <h3 className="text-[14px] font-semibold text-dc-ink mb-2">Who is responsible for data collection on this website?</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-4">
              Data processing on this website is carried out by the website operator. You can find
              the operator's contact details in the section "Information on the Controller" in this
              Privacy Policy.
            </p>

            <h3 className="text-[14px] font-semibold text-dc-ink mb-2">How do we collect your data?</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-4">
              Some data is collected when you provide it to us directly, for example data you
              enter into a form. Other data is collected automatically or with your consent when
              you visit the website. This is primarily technical data (e.g. internet browser,
              operating system, or time of page access).
            </p>

            <h3 className="text-[14px] font-semibold text-dc-ink mb-2">What do we use your data for?</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-4">
              Part of the data is collected to ensure the error-free operation of the website.
              Other data may be used to analyse your usage behaviour.
            </p>

            <h3 className="text-[14px] font-semibold text-dc-ink mb-2">What rights do you have regarding your data?</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7]">
              You have the right to obtain information about the origin, recipient, and purpose
              of your stored personal data free of charge at any time. You also have the right
              to request the correction or deletion of this data. Furthermore, you have the right
              to lodge a complaint with the competent supervisory authority.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="text-[20px] font-semibold text-dc-ink tracking-[-0.015em] mb-4">2. Hosting</h2>
            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Vercel</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7]">
              This website is hosted by Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
              CA 94104, USA. Hosting is provided for the purpose of delivering our service
              securely and efficiently (Art. 6(1)(f) GDPR). For more information, please refer
              to Vercel's privacy policy at{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors"
              >
                vercel.com/legal/privacy-policy
              </a>.
            </p>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="text-[20px] font-semibold text-dc-ink tracking-[-0.015em] mb-4">
              3. General Information and Mandatory Disclosures
            </h2>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Information on the Controller</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-2">
              The controller responsible for data processing on this website is:
            </p>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-4">
              Robin Busse<br />
              Westgasse 6<br />
              04509 Löbnitz<br />
              Germany<br />
              Phone: +49 1624961133<br />
              E-Mail:{' '}
              <a
                href="mailto:info@audio-dubcheck.com"
                className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors"
              >
                info@audio-dubcheck.com
              </a>
            </p>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-6">
              The controller is the natural or legal person who, alone or jointly with others,
              determines the purposes and means of processing personal data.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Retention Period</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-6">
              Unless a more specific retention period is stated in this Privacy Policy, your
              personal data will remain with us until the purpose for which it was collected no
              longer applies. If you assert a legitimate request for deletion or withdraw your
              consent to data processing, your data will be deleted.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">SSL/TLS Encryption</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7]">
              This site uses SSL/TLS encryption for security reasons and to protect the
              transmission of confidential content.
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="text-[20px] font-semibold text-dc-ink tracking-[-0.015em] mb-4">
              4. Data Collection on This Website
            </h2>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Server Log Files</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-6">
              The website provider automatically collects and stores information in server log
              files that your browser transmits automatically. This includes: browser type and
              version, operating system, referrer URL, hostname of the accessing device, time of
              the server request, and IP address. This data is processed on the basis of
              Art. 6(1)(f) GDPR. The operator has a legitimate interest in the technically
              error-free presentation and optimisation of its website.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Early Access &amp; Waitlist Form</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-6">
              This website offers the option to register for early access to DubCheck. The
              e-mail address you provide will be used exclusively to notify you about the product
              launch and related updates. Processing is based on your consent (Art. 6(1)(a) GDPR).
              You may withdraw your consent at any time by contacting us at{' '}
              <a
                href="mailto:info@audio-dubcheck.com"
                className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors"
              >
                info@audio-dubcheck.com
              </a>.
              {' '}To operate the form, we use the service provider Tally (Tally B.V., Ankerrui 5,
              2000 Antwerp, Belgium). For more information, please refer to Tally's privacy policy
              at{' '}
              <a
                href="https://tally.so/help/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors"
              >
                tally.so/help/privacy-policy
              </a>.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Enquiries by E-Mail or Phone</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7]">
              If you contact us by e-mail or phone, your enquiry including all resulting personal
              data will be stored and processed for the purpose of handling your request. We do
              not pass this data on without your consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-[20px] font-semibold text-dc-ink tracking-[-0.015em] mb-4">
              5. Analytics &amp; Cookies
            </h2>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Vercel Web Analytics</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7] mb-6">
              This website uses Vercel Web Analytics, provided by Vercel Inc. (340 S Lemon Ave
              #4133, Walnut, CA 91789, USA). Vercel Analytics is cookie-free and does not store
              personal identifiers or full IP addresses — only aggregated page-view and visitor
              counts derived from a short-lived, daily-rotating hash. No cross-site tracking is
              performed. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in understanding
              site usage). For details see{' '}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dc-ink underline underline-offset-2 hover:text-white transition-colors"
              >
                vercel.com/docs/analytics/privacy-policy
              </a>.
            </p>

            <h3 className="text-[16px] font-semibold text-dc-ink mb-2">Download Event Counter</h3>
            <p className="text-dc-ink2 text-[15px] leading-[1.7]">
              When you click the download button, we increment an anonymous counter (e.g.
              &quot;download_intent: +1&quot;) stored on our own infrastructure. No IP address,
              user agent, cookie, or identifier is recorded — only the aggregate count. Legal
              basis: Art. 6(1)(f) GDPR.
            </p>
          </section>

          <p className="font-mono text-[12px] text-dc-ink3 mt-8">Source: eRecht24</p>
        </main>
        <Footer />
      </div>
    </>
  )
}
