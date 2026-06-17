import { Link } from 'react-router-dom'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#0F0E0C'
const MD  = '#A8A29B'
const BR  = 'rgba(255,255,255,0.1)'
const F   = { fontFamily: "'Inter', sans-serif" }

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="13.2" cy="4.8" r="0.8" fill="currentColor"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M10 1.5v9.8a2.4 2.4 0 1 1-2.4-2.4c.3 0 .5 0 .8.1V6.6a4.8 4.8 0 1 0 4.1 4.7V5.2a4.6 4.6 0 0 0 3 1.1V3.9a3.1 3.1 0 0 1-2.1-1.1A3.1 3.1 0 0 1 12.6 1H10z" fill="currentColor"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1a8 8 0 0 0-6.9 12L1 17l4.1-1.1A8 8 0 1 0 9 1z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 6.2c.1-.5.6-.5.9-.5s.5.1.6.4c.2.4.5 1.1.5 1.3 0 .2-.1.3-.2.5l-.3.3c-.1.1-.2.2-.1.4.3.6 1.4 1.7 2 2 .2.1.3 0 .4-.1l.3-.3c.2-.2.3-.2.5-.1.3.1.9.4 1.3.6.3.1.4.3.4.6 0 .3 0 .8-.5.9-1.7.6-3.7-.5-4.7-1.5S5.4 7.9 6 6.2z" fill="currentColor"/>
  </svg>
)

const shopLinks = [
  { label: 'Eden Collection', path: '/shop?col=eden'     },
  { label: 'The Love Edit',   path: '/shop?col=love-edit'},
  { label: 'Bold & Beautiful',path: '/shop?col=bold'     },
  { label: 'Sales Promotion', path: '/sale'              },
]
const companyLinks = [
  { label: 'Our Brand', path: '/brand'    },
  { label: 'Featured',  path: '/featured' },
]
const supportLinks = [
  { label: 'Track My Order',          path: '/account' },
  { label: 'Returns & Exchanges',     path: '/terms'    },
  { label: 'FAQ',                     path: '/faq'    },
  { label: 'Contact Support',         path: '/contact'    },
  { label: 'Size Guide',              path: '/shop'     },
]
const legalLinks = [
  { label: 'Terms of Service', path: '/terms'   },
  { label: 'Privacy Policy',   path: '/privacy' },
  { label: 'Shipping Info',    path: '/terms'   },
  { label: 'Cookie Policy',    path: '/privacy' },
]

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 style={{ ...F, fontSize: '13px', fontWeight: 700, color: W, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(link => (
          <Link key={link.label} to={link.path}
            style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.color = MD }}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: DK }}>

      <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '56px 40px 32px' }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <p style={{ ...F, fontSize: '16px', fontWeight: 800, color: W, letterSpacing: '-0.01em', lineHeight: 1 }}>STAAY</p>
                <p style={{ ...F, fontSize: '8px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ONLINE</p>
              </div>
            </div>
            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7, marginBottom: '18px', maxWidth: '240px' }}>
              Designed for women who live beyond limits. Effortless. Intentional. Always in season.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[
                { Icon: InstagramIcon, href: 'https://instagram.com/staaybystaay' },
                { Icon: TikTokIcon,    href: 'https://tiktok.com/@staaybystaay'   },
                { Icon: WhatsAppIcon,  href: 'https://wa.me/233503977985'         },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  style={{ width: '34px', height: '34px', border: `1px solid ${BR}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MD, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderColor = G }}
                  onMouseLeave={e => { e.currentTarget.style.color = MD; e.currentTarget.style.borderColor = BR }}>
                  <Icon />
                </a>
              ))}
            </div>

          </div>

          <FooterColumn title="Shop"    links={shopLinks}    />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Legal"   links={legalLinks}   />
        </div>

        {/* Newsletter */}
        <div style={{ borderTop: `1px solid ${BR}`, paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="newsletter-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '420px' }}>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>get connected</p>
              <h3 style={{ ...F, fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', marginBottom: '4px' }}>The STAAY Woman Starts Here</h3>
              <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>Early access to new pieces and everything we're creating for you.</p>
            </div>
            <form style={{ display: 'flex', gap: '0', width: '100%', maxWidth: '380px', flexShrink: 0 }} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email.com"
                style={{ flex: 1, padding: '13px 16px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${BR}`, borderRight: 'none', color: W, outline: 'none', ...F, fontSize: '13px' }} />
              <button type="submit"
                style={{ padding: '13px 24px', background: G, color: '#1A1612', border: 'none', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4AF5A' }}
                onMouseLeave={e => { e.currentTarget.style.background = G }}>
                Subscribe
              </button>
            </form>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: '#6B6660' }}>No spam. Unsubscribe anytime.</p>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${BR}`, marginTop: '28px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: '#6B6660' }}>
            © {new Date().getFullYear()} STAAY Online. All rights reserved.
          </p>
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: '#6B6660' }}>
            Made in Accra, Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  )
}
