import { useState } from 'react'
import { Link } from 'react-router-dom'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

const contactItems = [
  {
    label: 'Email',
    value: 'info@staayonline.com',
    href: 'mailto:info@staayonline.com',
    desc: 'We reply within 24 hours',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+233 50 397 7985',
    href: 'https://wa.me/233503977985',
    desc: 'Chat with us directly',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@staaybystaay',
    href: 'https://instagram.com/staaybystaay',
    desc: 'DMs open for quick queries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    value: '@staaybystaay',
    href: 'https://tiktok.com/@staaybystaay',
    desc: 'Follow us for new arrivals',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard delivery takes 3–7 business days within Ghana. International orders take 7–14 business days.' },
  { q: 'Can I return or exchange an item?', a: 'Yes. We accept returns and exchanges within 14 days of delivery. Items must be unworn and in original condition.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking link via email or WhatsApp.' },
  { q: 'Do you offer free shipping?', a: 'Yes — free shipping on all orders over $200.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${BR}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '20px 0', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', cursor: 'pointer', gap: '16px',
        }}>
        <span style={{ ...F, fontSize: '14px', fontWeight: 500, color: DK, textAlign: 'left' }}>{q}</span>
        <span style={{
          ...F, fontSize: '20px', fontWeight: 300, color: G,
          flexShrink: 0, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}>+</span>
      </button>
      {open && (
        <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7, paddingBottom: '20px', margin: 0 }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function ContactSupport() {
  return (
    <div style={{ background: OW, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ background: BK, padding: '80px 64px 72px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            ...F, fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: G, marginBottom: '16px',
          }}>
            Support
          </p>
          <h1 style={{
            ...F, fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800, color: W,
            letterSpacing: '-0.03em', lineHeight: 1.0,
            marginBottom: '20px',
          }}>
            We're Here<br />For You.
          </h1>
          <p style={{
            ...F, fontSize: '15px', fontWeight: 300,
            color: FT, lineHeight: 1.7, maxWidth: '420px',
          }}>
            Got a question about your order, sizing, or anything else?
            Reach us through any of the channels below.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 64px 80px' }}>

        {/* Two-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          marginBottom: '72px',
        }}>

          {/* LEFT — Shop CTA */}
          <div style={{
            background: W, border: `1px solid ${BR}`,
            padding: '48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                ...F, fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: G, marginBottom: '16px',
              }}>
                Ready to wear Staay?
              </p>
              <h2 style={{
                ...F, fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 800, color: DK,
                letterSpacing: '-0.02em', lineHeight: 1.05,
                marginBottom: '16px',
              }}>
                Shop the Collection
              </h2>
              <p style={{
                ...F, fontSize: '14px', fontWeight: 300,
                color: MD, lineHeight: 1.7, marginBottom: '36px',
              }}>
                Every piece in the SS 2025 collection is available now.
                Free shipping over $200.
              </p>
            </div>
            <Link
              to="/shop"
              onClick={() => window.scrollTo(0, 0)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: BK, color: W,
                padding: '14px 28px',
                ...F, fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none', alignSelf: 'flex-start',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G }}
              onMouseLeave={e => { e.currentTarget.style.background = BK }}>
              Shop Now →
            </Link>
          </div>

          {/* RIGHT — Contact channels */}
          <div style={{ background: W, border: `1px solid ${BR}`, padding: '48px' }}>
            <p style={{
              ...F, fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: G, marginBottom: '28px',
            }}>
              Get in Touch
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contactItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: i < contactItems.length - 1 ? `1px solid ${BR}` : 'none',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px' }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ color: G }}>{item.icon}</div>
                    <div>
                      <div style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, marginBottom: '2px' }}>
                        {item.label}
                      </div>
                      <div style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    ...F, fontSize: '13px', fontWeight: 500,
                    color: DK, letterSpacing: '0.01em',
                  }}>
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '64px',
        }}>
          <div>
            <p style={{
              ...F, fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: G, marginBottom: '12px',
            }}>
              FAQ
            </p>
            <h3 style={{
              ...F, fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 800, color: DK,
              letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              Quick Answers
            </h3>
            <p style={{
              ...F, fontSize: '13px', fontWeight: 300,
              color: MD, lineHeight: 1.7, marginTop: '12px',
            }}>
              Can't find what you need? Reach out directly and we'll get back to you.
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${BR}` }}>
            {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>

      </div>
    </div>
  )
}
