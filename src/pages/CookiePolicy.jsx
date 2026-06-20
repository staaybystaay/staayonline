import { Link } from 'react-router-dom'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const F   = { fontFamily: "'Inter', sans-serif" }

const LAST_UPDATED = 'June 2026'

const cookieTypes = [
  {
    name: 'Essential',
    purpose: 'Keep your shopping bag, account session, and login working as you move between pages.',
    examples: 'Cart contents, login session, security tokens',
    canDisable: false,
  },
  {
    name: 'Functional',
    purpose: 'Remember your preferences so the site feels personal each time you return.',
    examples: 'Saved currency display, favorites list',
    canDisable: true,
  },
  {
    name: 'Third-Party',
    purpose: "Let you sign in quickly using your Google account, handled by Google's own systems.",
    examples: 'Google sign-in session',
    canDisable: true,
  },
]

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, flexShrink: 0 }} />
      <span style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{children}</span>
    </div>
  )
}

function Para({ children }) {
  return <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.85, marginBottom: '18px', maxWidth: '640px' }}>{children}</p>
}

export default function CookiePolicy() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Cookie Policy</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Legal
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', marginBottom: '10px' }}>
            Cookie Policy
          </h1>
          <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: FT }}>
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="page-padding" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 40px 70px' }}>

        <SectionLabel>Overview</SectionLabel>
        <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '14px' }}>What are cookies?</h2>
        <Para>
          Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit, like what's in your shopping bag or whether you're signed in, so you don't have to re-enter it every time you load a page.
        </Para>
        <Para>
          STAAY Online (staayonline.vercel.app) uses cookies and similar local storage technologies to make the site work properly and to remember your preferences. We don't use cookies to sell your data or show you ads.
        </Para>

        <div style={{ height: '1px', background: BR, margin: '36px 0' }} />

        <SectionLabel>How We Use Them</SectionLabel>
        <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '20px' }}>Types of cookies on this site</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {cookieTypes.map(type => (
            <div key={type.name} style={{ border: `1px solid ${BR}`, borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>{type.name}</h3>
                <span style={{ ...F, fontSize: '10px', fontWeight: 700, color: type.canDisable ? G : '#16A34A', textTransform: 'uppercase', letterSpacing: '0.06em', background: type.canDisable ? '#FBF6EA' : '#ECFDF3', padding: '3px 10px', borderRadius: '100px' }}>
                  {type.canDisable ? 'Optional' : 'Always Active'}
                </span>
              </div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7, marginBottom: '8px' }}>{type.purpose}</p>
              <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: FT }}>Examples: {type.examples}</p>
            </div>
          ))}
        </div>

        <Para>
          Essential cookies can't be switched off because the site genuinely can't function without them — without them, your cart would empty itself every time you clicked to a new page. Functional and third-party cookies can be limited through your browser settings, described below.
        </Para>

        <div style={{ height: '1px', background: BR, margin: '36px 0' }} />

        <SectionLabel>Your Choices</SectionLabel>
        <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '14px' }}>Managing cookies</h2>
        <Para>
          Most browsers let you view, delete, and block cookies through their settings menu. Blocking essential cookies will likely break core features like your shopping bag and staying signed in, so we'd recommend only disabling functional cookies if you'd prefer a more minimal experience.
        </Para>
        <Para>
          If you sign in with Google, that sign-in session is managed by Google according to their own cookie and privacy practices, which we don't control.
        </Para>

        <div style={{ height: '1px', background: BR, margin: '36px 0' }} />

        <SectionLabel>Updates</SectionLabel>
        <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '14px' }}>Changes to this policy</h2>
        <Para>
          We may update this policy from time to time as the site changes. Significant changes will be reflected by updating the date at the top of this page.
        </Para>

        <div style={{ height: '1px', background: BR, margin: '36px 0' }} />

        <SectionLabel>Questions</SectionLabel>
        <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '14px' }}>Get in touch</h2>
        <Para>
          If you have questions about how STAAY Online uses cookies, reach out at{' '}
          <a href="mailto:info@staayonline.com" style={{ color: G, fontWeight: 500 }}>info@staayonline.com</a>
          {' '}or via our{' '}
          <Link to="/contact" style={{ color: G, fontWeight: 500 }}>Contact page</Link>.
        </Para>

      </div>
    </div>
  )
}
