import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="11.8" cy="4.2" r="0.8" fill="currentColor"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 2.5l5 6L2 14h1.5l4.3-5 3.7 5H14L8.8 7.8 13.5 2H12l-3.8 4.3L5 2H2z"
      stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.5 1.5c.2 1.5 1 2.5 2.5 2.8v2c-.9 0-1.8-.3-2.5-.8v4.5a4 4 0 1 1-4-4v2.1a2 2 0 1 0 2 2V1.5h2z"
      stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1 6.5h11M7.5 2.5l4 4-4 4"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const footerLinks = [
  {
    heading: 'Shop',
    links: [
      { label: 'New Arrivals',  path: '/shop' },
      { label: 'Footwear',      path: '/shop' },
      { label: 'Tops',          path: '/shop' },
      { label: 'Bottoms',       path: '/shop' },
      { label: 'Coats',         path: '/shop' },
      { label: 'Sale',          path: '/shop' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',      path: '/' },
      { label: 'Careers',       path: '/' },
      { label: 'Editorial',     path: '/' },
      { label: 'Press',         path: '/' },
      { label: 'Sustainability', path: '/' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact Us',     path: '/' },
      { label: 'Shipping Info',  path: '/' },
      { label: 'Returns',        path: '/' },
      { label: 'Size Guide',     path: '/' },
      { label: 'FAQ',            path: '/' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/' },
      { label: 'Terms of Use',   path: '/' },
      { label: 'Cookie Policy',  path: '/' },
      { label: 'Accessibility',  path: '/' },
    ],
  },
]

const socials = [
  { Icon: InstagramIcon, label: 'Instagram', url: 'https://instagram.com' },
  { Icon: TwitterIcon,   label: 'X',         url: 'https://x.com'        },
  { Icon: TikTokIcon,    label: 'TikTok',    url: 'https://tiktok.com'   },
]

// ─────────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────────
function Newsletter() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused,   setFocused]   = useState(false)

  const handleSubmit = () => {
    if (!email || !email.includes('@')) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div style={{ maxWidth: '440px' }}>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '10px', letterSpacing: '0.3em',
        textTransform: 'uppercase', color: 'var(--accent)',
        marginBottom: '12px', fontWeight: 400,
      }}>
        Stay in the loop
      </p>
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(28px, 3vw, 38px)',
        color: 'var(--text)', letterSpacing: '0.04em',
        lineHeight: 1, marginBottom: '10px',
      }}>
        JOIN THE STAAY MOVEMENT
      </h3>
      <p style={{
        fontFamily: "'Fraunces', serif",
        fontStyle: 'italic', fontWeight: 300,
        fontSize: '14px', lineHeight: 1.65,
        color: 'var(--text-muted)', marginBottom: '24px',
      }}>
        New drops, exclusive offers, and editorial content — delivered to your inbox first.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 20px',
            border: '1px solid var(--accent)',
            background: 'var(--accent-soft)',
          }}
        >
          <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✓</span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>
            You're in. Welcome to Staay.
          </span>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', gap: '0' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            placeholder="your@email.com"
            style={{
              flex: 1,
              background: 'var(--bg-surface)',
              border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
              borderRight: 'none',
              padding: '13px 16px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', color: 'var(--text)',
              outline: 'none', letterSpacing: '0.08em',
              transition: 'border-color 0.2s',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              background: 'var(--accent)',
              border: '1px solid var(--accent)',
              color: '#0C0B09',
              padding: '13px 20px',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: 'pointer', transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Subscribe
            <ArrowIcon />
          </button>
        </div>
      )}

      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '10px', color: 'var(--text-faint)',
        marginTop: '10px', letterSpacing: '0.04em',
        fontWeight: 300,
      }}>
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
    }}>

      {/* Gold top accent line */}
      <div style={{ height: '3px', background: 'var(--accent)' }} />

      {/* Main footer body */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 80px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link to="/" style={{
              display: 'flex', alignItems: 'center',
              gap: '10px', marginBottom: '20px',
            }}>
              <img
                src="/stayonlinelogo.jpeg"
                alt="Staay"
                style={{
                  width: '44px', height: '44px',
                  objectFit: 'cover', borderRadius: '50%',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '20px', color: 'var(--text)',
                  letterSpacing: '0.06em',
                }}>
                  STAAY
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '8px', letterSpacing: '0.4em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  fontWeight: 400, marginTop: '1px',
                }}>
                  ONLINE
                </span>
              </div>
            </Link>

            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '13px', lineHeight: 1.7,
              color: 'var(--text-muted)',
              marginBottom: '24px',
              maxWidth: '220px',
            }}>
              Garments built for those who exist between edges. No rules. No season.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map(({ Icon, label, url }) => (
                
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.22s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.background = 'var(--accent-soft)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '14px', color: 'var(--text)',
                letterSpacing: '0.1em', marginBottom: '18px',
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '12px', color: 'var(--text-muted)',
                        fontWeight: 300, letterSpacing: '0.04em',
                        transition: 'color 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '52px',
          marginBottom: '52px',
        }}>
          <Newsletter />
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'var(--text-faint)',
              letterSpacing: '0.06em', fontWeight: 300,
            }}>
              © {new Date().getFullYear()} Staay Online. All rights reserved.
            </span>
          </div>

          {/* Payment icons — text based */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Paystack'].map(p => (
              <span
                key={p}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  border: '1px solid var(--border)',
                  padding: '4px 8px',
                  fontWeight: 400,
                }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: 'none',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M2 6l4-4 4 4"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>
      </div>

    </footer>
  )
}
