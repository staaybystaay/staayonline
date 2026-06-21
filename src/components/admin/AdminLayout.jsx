import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#5B564F'
const SB  = '#16140F'
const BR  = '#E8E4DF'
const LG  = '#F7F6F4'
const BL  = '#3B5BDB'
const F   = { fontFamily: "'Inter', sans-serif" }

const NAV_ITEMS = [
  { label: 'Dashboard',  path: '/admin',            icon: 'M2 2h6v6H2zM10 2h6v6h-6zM2 10h6v6H2zM10 10h6v6h-6z' },
  { label: 'Orders',     path: '/admin/orders',     icon: 'M2 4h14M2 9h14M2 14h10' },
  { label: 'Products',   path: '/admin/products',   icon: 'M2 5l7-3 7 3v8l-7 3-7-3z M2 5l7 3 7-3 M9 8v8' },
  { label: 'Messages',   path: '/admin/messages',   icon: 'M2 4h14v10H2z M2 4l7 6 7-6' },
  { label: 'Newsletter', path: '/admin/newsletter', icon: 'M2 4h14v10H2z M2 4l7 6 7-6 M9 14v-4' },
]

function NavIcon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function AdminLayout({ children, title }) {
  const location = useLocation()
  const navigate  = useNavigate()
  const { user, profile, loading, logout } = useAuth()

  const isAdmin = !!profile?.is_admin

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LG }}>
        <p style={{ ...F, fontSize: '14px', color: MD }}>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LG, padding: '20px', textAlign: 'center' }}>
        <div>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '10px' }}>Sign in required</h2>
          <p style={{ ...F, fontSize: '14px', color: MD, marginBottom: '20px' }}>You need to sign in to access the admin dashboard.</p>
          <Link to="/login" style={{ background: G, color: W, padding: '12px 28px', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LG, padding: '20px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔒</div>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '10px' }}>Access Denied</h2>
          <p style={{ ...F, fontSize: '14px', color: MD, marginBottom: '20px' }}>This account doesn't have admin access.</p>
          <Link to="/" style={{ background: DK, color: W, padding: '12px 28px', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
            Back to Store
          </Link>
        </div>
      </div>
    )
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: LG, display: 'flex' }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="desktop-only" style={{ width: '240px', flexShrink: 0, background: SB, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '24px 24px 20px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <p style={{ ...F, fontSize: '16px', fontWeight: 800, color: W, letterSpacing: '-0.01em', lineHeight: 1 }}>STAAY</p>
              <p style={{ ...F, fontSize: '8px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ADMIN</p>
            </div>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '8px', textDecoration: 'none', background: active ? 'rgba(184,144,58,0.15)' : 'transparent', color: active ? G : '#C9C4BD', ...F, fontSize: '13px', fontWeight: active ? 600 : 400, transition: 'all 0.18s' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
                <NavIcon d={item.icon} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: `1px solid rgba(255,255,255,0.06)`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none', color: '#C9C4BD', ...F, fontSize: '13px', transition: 'background 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M10 5l-3 3 3 3M7 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Store
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', background: 'none', border: 'none', color: '#C9C4BD', ...F, fontSize: '13px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Mobile top bar */}
        <div className="mobile-only" style={{ display: 'none', background: SB, padding: '14px 16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ ...F, fontSize: '13px', fontWeight: 800, color: W }}>STAAY <span style={{ color: G }}>ADMIN</span></span>
          </Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#C9C4BD', ...F, fontSize: '12px', cursor: 'pointer' }}>Sign Out</button>
        </div>

        {/* Mobile tab nav */}
        <div className="mobile-only hide-scroll" style={{ display: 'none', background: W, borderBottom: `1px solid ${BR}`, overflowX: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 18px', ...F, fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? G : MD, borderBottom: `2px solid ${active ? G : 'transparent'}`, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                <NavIcon d={item.icon} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Page header */}
        {title && (
          <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '24px 32px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h1 style={{ ...F, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>{title}</h1>
            </div>
          </div>
        )}

        <div className="page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 32px 80px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
