import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const G   = 'var(--accent)'
const W   = 'var(--bg)'
const OW  = 'var(--bg-panel)'
const DK  = 'var(--text-strong)'
const MD  = 'var(--text-muted)'
const FT  = 'var(--text-faint)'
const BR  = 'var(--border)'
const F   = { fontFamily: "'Inter', sans-serif" }

const sections = [
  {
    title: 'Consent',
    body: 'Your consent is highly valued. We will never sell, share, or disclose your name, address, email, credit card details, or any other personal information to third parties without your explicit consent.',
  },
  {
    title: 'Communication & Marketing',
    body: 'If you make a purchase from STAAY (thank you!), you may receive updates about our latest products, news, and special offers via email — only if you opt in to receive marketing communications. You can opt out at any time by following the unsubscribe link provided in our emails.',
  },
  {
    title: 'Website Statistics',
    body: 'To enhance your shopping experience, we may collect data on website traffic and purchase trends. These statistics are used to improve our services and ensure we offer the most relevant products to our customers.',
  },
  {
    title: 'Protecting Your Security',
    body: 'We may use the personal information you provide to carry out necessary anti-fraud checks. In such cases, your information may be shared with credit reference or fraud prevention agencies, which may retain a record of the data. This is solely for identity verification and security purposes.',
  },
  {
    title: 'Third-Party Websites',
    body: 'Our website may include links to third-party websites. Please note that these websites have their own privacy policies, and STAAY cannot be held responsible for their practices. We encourage you to review their policies before sharing your information.',
  },
]

export default function Privacy() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{ background: OW, borderBottom: `1px solid ${BR}`, padding: '40px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link
              to="/"
              style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              Home
            </Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Privacy Policy</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Legal
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 64px 96px' }}>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            ...F, fontSize: '15px', fontWeight: 300,
            color: MD, lineHeight: 1.8,
            paddingBottom: '40px',
            borderBottom: `1px solid ${BR}`,
            marginBottom: '40px',
          }}>
          STAAY is fully committed to protecting the privacy of our site visitors and customers. We will not share your personal information with third parties except when it is essential to provide a service to you.
        </motion.p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{
                padding: '32px 0',
                borderBottom: `1px solid ${BR}`,
              }}>
              <h2 style={{
                ...F, fontSize: '15px', fontWeight: 700,
                color: DK, marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>
                {section.title}
              </h2>
              <p style={{
                ...F, fontSize: '14px', fontWeight: 300,
                color: MD, lineHeight: 1.8,
              }}>
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ paddingTop: '40px' }}>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.8 }}>
            If you have any questions or concerns about how your information is used, feel free to contact us at{' '}
            <a
              href="mailto:info@staayonline.com"
              style={{ color: G, fontWeight: 500, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
              info@staayonline.com
            </a>
            .
          </p>
        </motion.div>

      </div>
    </div>
  )
}
