import { useState } from 'react'
import { Link } from 'react-router-dom'

const G  = '#B8903A'
const W  = '#FFFFFF'
const F  = { fontFamily: "'Inter', sans-serif" }
const T1 = 'rgba(255,255,255,0.85)'
const T2 = 'rgba(255,255,255,0.45)'
const T3 = 'rgba(255,255,255,0.15)'
const BG = '#0F0E0C'

const shopLinks = [
  { label: 'New Arrivals',     path: '/shop'    },
  { label: 'Eden Collection',  path: '/shop'    },
  { label: 'The Love Edit',    path: '/shop'    },
  { label: 'Bold & Beautiful', path: '/shop'    },
  { label: 'Sale',             path: '/shop'    },
]
const companyLinks = [
  { label: 'Our Brand',  path: '/brand'    },
  { label: 'Featured',   path: '/featured' },
  { label: 'FAQ',        path: '/'         },
  { label: 'Size Guide', path: '/'         },
]
const supportLinks = [
  { label: 'Track My Order',      path: '/' },
  { label: 'Returns & Exchanges', path: '/' },
  { label: 'Contact Support',     path: '/' },
]
const legalLinks = [
  { label: 'Terms of Service', path: '/terms'   },
  { label: 'Privacy Policy',   path: '/privacy' },
  { label: 'Shipping Info',    path: '/terms'   },
  { label: 'Cookie Policy',    path: '/'        },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/staaybystaay',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

function FooterLink({ to, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <Link
        to={to}
        style={{ ...F, fontSize: '13px', fontWeight: 300, color: hovered ? T1 : T2, transition: 'color 0.2s' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {children}
      </Link>
    </li>
  )
}

function Newsletter() {
  const [email, setEmail]     = useState('')
  const [done, setDone]       = useState(false)
  const [focused, setFocused] = useState(false)

  function submit() {
    if (!email.includes('@')) return
    setDone(true)
    setEmail('')
  }

  if (done) return (
    <div style={{ padding: '12px 16px', border: `1px solid ${G}`, background: 'rgba(184,144,58,0.08)', ...F, fontSize: '13px', fontWeight: 500, color: G }}>
      You're in. Welcome to STAAY. ✓
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={e => { if (e.key === 'Enter') submit() }}
        placeholder="your@email.com"
        style={{
          flex: 1, background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${focused ? G : T3}`, borderRight: 'none',
          padding: '12px 14px', ...F, fontSize: '13px', color: T1,
          outline: 'none', transition: 'border-color 0.2s',
        }}
      />
      <button
        onClick={submit}
        style={{
          padding: '12px 20px', background: G, color: W, border: 'none',
          cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          transition: 'opacity 0.2s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
        Subscribe
      </button>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: BG, borderTop: `1px solid ${T3}` }}>

      <div style={{ height: '3px', background: G }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 64px 48px' }}>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ ...F, fontSize: '17px', fontWeight: 800, color: W, letterSpacing: '-0.01em', lineHeight: 1 }}>STAAY</div>
                <div style={{ ...F, fontSize: '8px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '2px' }}>ONLINE</div>
              </div>
            </Link>

            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: T2, lineHeight: 1.75, marginBottom: '24px', maxWidth: '220px' }}>
              Designed for women who live beyond limits. Effortless. Intentional. Always in season.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{ width: '36px', height: '36px', border: `1px solid ${T3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T2, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T3; e.currentTarget.style.color = T2 }}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '20px', borderTop: `1px solid ${T3}` }}>
              <a href="mailto:info@staayonline.com" style={{ ...F, fontSize: '12px', fontWeight: 300, color: T2, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = T2 }}>
                info@staayonline.com
              </a>
              <a href="https://wa.me/233503977985" target="_blank" rel="noreferrer" style={{ ...F, fontSize: '12px', fontWeight: 300, color: T2, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = T2 }}>
                +233 50 397 7985
              </a>
              <span style={{ ...F, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)' }}>@staaybystaay</span>
            </div>
          </div>

          {/* Link columns */}
          {[
            { heading: 'Shop',    links: shopLinks    },
            { heading: 'Company', links: companyLinks },
            { heading: 'Support', links: supportLinks },
            { heading: 'Legal',   links: legalLinks   },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ ...F, fontSize: '12px', fontWeight: 700, color: T1, letterSpacing: '0.04em', marginBottom: '20px' }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(link => (
                  <FooterLink key={link.label} to={link.path}>{link.label}</FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── NEWSLETTER ── */}
        <div style={{ borderTop: `1px solid ${T3}`, paddingTop: '48px', marginBottom: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Stay in the loop</p>
            <h3 style={{ ...F, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', marginBottom: '6px' }}>
              The Staay Woman Starts Here
            </h3>
            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: T2 }}>
              Early access to new pieces and everything we're creating for you.
            </p>
          </div>
          <div>
            <Newsletter />
            <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ borderTop: `1px solid ${T3}`, paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...F, fontSize: '12px', fontWeight: 300, color: T2 }}>© {year} STAAY Online. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: G }} />
            <span style={{ ...F, fontSize: '11px', fontWeight: 400, color: T2 }}>Made in Accra</span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'transparent', border: `1px solid ${T3}`, color: T2, padding: '8px 16px', cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T3; e.currentTarget.style.color = T2 }}>
            Back to top ↑
          </button>
        </div>

      </div>
    </footer>
  )
}
