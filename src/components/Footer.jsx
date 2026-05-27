import { useEffect, useState } from 'react'
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

const shopLinks = [
  { label: 'New Arrivals', path: '/shop' },
  { label: 'Tops', path: '/shop' },
  { label: 'Bottoms', path: '/shop' },
  { label: 'Coats', path: '/shop' },
]

const companyLinks = [
  { label: 'Our Brand', path: '/brand' },
  { label: 'FAQ', path: '/' },
  { label: 'Size Guide', path: '/' },
]

const supportLinks = [
  { label: 'Track My Order', path: '/' },
  { label: 'Returns & Exchanges', path: '/terms' },
  { label: 'Contact Support', path: '/contact' },
]

const legalLinks = [
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Shipping Information', path: '/terms' },
  { label: 'Cookie Policy', path: '/' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/staaybystaay',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@staaybystaay',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/233503977985',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },
]

const scrollTop = () => window.scrollTo(0, 0)

function LinkColumn({ heading, links }) {
  return (
    <div style={{ minWidth: '140px' }}>
      <h4
        style={{
          ...F,
          fontSize: '13px',
          fontWeight: 700,
          color: DK,
          letterSpacing: '0.02em',
          marginBottom: '18px',
        }}
      >
        {heading}
      </h4>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: 0,
          margin: 0,
        }}
      >
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.path}
              onClick={scrollTop}
              style={{
                ...F,
                fontSize: '13px',
                fontWeight: 300,
                color: MD,
                textDecoration: 'none',
                transition: '0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = G)}
              onMouseLeave={e => (e.currentTarget.style.color = MD)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BrandColumn() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link
        to="/"
        onClick={scrollTop}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          textDecoration: 'none',
        }}
      >
        <img
          src="/stayonlinelogo.jpeg"
          alt="Staay"
          style={{
            width: '44px',
            height: '44px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              ...F,
              fontSize: '18px',
              fontWeight: 800,
              color: DK,
              letterSpacing: '-0.01em',
            }}
          >
            STAAY
          </span>

          <span
            style={{
              ...F,
              fontSize: '8px',
              fontWeight: 500,
              color: G,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            ONLINE
          </span>
        </div>
      </Link>

      <p
        style={{
          ...F,
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: MD,
          marginBottom: '20px',
          maxWidth: '500px',
        }}
      >
        Designed for women who live beyond limits. Effortless. Intentional.
        Always in season.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: G,
            flexShrink: 0,
          }}
        />

        <span
          style={{
            ...F,
            fontSize: '11px',
            fontWeight: 400,
            color: FT,
          }}
        >
          SSL secured checkout
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {socialLinks.map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            style={{
              width: '36px',
              height: '36px',
              border: `1px solid ${BR}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: MD,
              transition: 'all 0.2s',
              background: W,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = G
              e.currentTarget.style.color = G
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = BR
              e.currentTarget.style.color = MD
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

function NewsletterPopup({ open, setOpen }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!email || !email.includes('@')) return

    setSubmitted(true)
    setEmail('')

    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
    }, 3000)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 999,
          background: BK,
          color: W,
          border: 'none',
          padding: '14px 20px',
          borderRadius: '999px',
          cursor: 'pointer',
          ...F,
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        Subscribe
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: '0.3s',
          zIndex: 998,
        }}
      />

      {/* Slide Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-420px',
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: W,
          zIndex: 999,
          transition: '0.35s ease',
          padding: '40px 28px',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.08)',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: DK,
            marginBottom: '30px',
          }}
        >
          ×
        </button>

        {submitted ? (
          <div
            style={{
              padding: '16px',
              background: GL,
              border: `1px solid ${G}`,
            }}
          >
            <span
              style={{
                ...F,
                color: G,
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              You're in. Welcome to Staay.
            </span>
          </div>
        ) : (
          <>
            <p
              style={{
                ...F,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: G,
                marginBottom: '10px',
              }}
            >
              Stay in the loop
            </p>

            <h2
              style={{
                ...F,
                fontSize: '32px',
                fontWeight: 800,
                color: DK,
                lineHeight: 1.1,
                marginBottom: '14px',
              }}
            >
              The STAAY Woman Starts Here
            </h2>

            <p
              style={{
                ...F,
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: MD,
                marginBottom: '24px',
              }}
            >
              Early access to new pieces, thoughtful releases, and everything
              we're creating for you.
            </p>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '14px',
                border: `1px solid ${BR}`,
                outline: 'none',
                marginBottom: '14px',
                ...F,
                fontSize: '13px',
              }}
            />

            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: BK,
                color: W,
                border: 'none',
                padding: '14px',
                cursor: 'pointer',
                ...F,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Subscribe
            </button>

            <p
              style={{
                ...F,
                fontSize: '11px',
                fontWeight: 300,
                color: FT,
                marginTop: '10px',
              }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY
      const bottom = document.body.offsetHeight - 200

      if (scrollPosition >= bottom) {
        setPopupOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <NewsletterPopup open={popupOpen} setOpen={setPopupOpen} />

      <footer
        style={{
          background: OW,
          borderTop: `1px solid ${BR}`,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={{ height: '3px', background: G }} />

        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 64px)',
            boxSizing: 'border-box',
          }}
        >
          {/* MAIN SECTION */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '40px',
              width: '100%',
              marginBottom: '50px',
            }}
          >
            <LinkColumn heading="Shop" links={shopLinks} />
            <LinkColumn heading="Company" links={companyLinks} />
            <LinkColumn heading="Support" links={supportLinks} />
            <LinkColumn heading="Legal" links={legalLinks} />
          </div>

          {/* BRAND SECTION BELOW */}
          <div
            style={{
              borderTop: `1px solid ${BR}`,
              paddingTop: '40px',
              marginBottom: '40px',
              width: '100%',
            }}
          >
            <BrandColumn />
          </div>

          {/* BOTTOM BAR */}
          <div
            style={{
              borderTop: `1px solid ${BR}`,
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <span
              style={{
                ...F,
                fontSize: '12px',
                fontWeight: 300,
                color: FT,
              }}
            >
              © {year} STAAY. All rights reserved.
            </span>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                ...F,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: MD,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = G)}
              onMouseLeave={e => (e.currentTarget.style.color = MD)}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}
