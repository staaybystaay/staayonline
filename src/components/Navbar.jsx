import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { useAuth } from '../hooks/useAuth'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#666666'
const LG = '#F5F5F5'
const BR = '#E8E4DF'
const F  = { fontFamily: "'Inter', sans-serif" }

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 17S3 12.5 3 7.5A4 4 0 0 1 10 5a4 4 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
)
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 2h2.5l2 9h9l2-6H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="15.5" r="1.2" fill="currentColor"/>
    <circle cx="14" cy="15.5" r="1.2" fill="currentColor"/>
  </svg>
)
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
    <path d="M1 1h18M1 7h12M1 13h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const navLinks = [
  { label: 'Home',      path: '/'         },
  { label: 'Shop',      path: '/shop'     },
  { label: 'Our Brand', path: '/brand'    },
  { label: 'Featured',  path: '/featured' },
]

const secondaryLinks = [
  { label: 'All Collections', path: '/shop',               slug: 'all'  },
  { label: 'Eden Collection', path: '/shop?col=eden',      slug: 'eden' },
  { label: 'The Love Edit',   path: '/shop?col=love-edit', slug: 'love' },
  { label: 'Bold & Beautiful',path: '/shop?col=bold',      slug: 'bold' },
  { label: 'Sales Promotion',            path: '/sale',               slug: 'sale' },
]

function MobileDrawer({ open, onClose, user, profile, onLogout, onSearch }) {
  const [drawerSearch, setDrawerSearch] = useState('')
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', zIndex: 1000, background: W, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${BR}` }}>
              <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DK }}><CloseIcon /></button>
            </div>

            {/* Search */}
            <form onSubmit={e => { e.preventDefault(); onSearch?.(drawerSearch); onClose() }} style={{ padding: '16px 24px 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: LG, borderRadius: '8px', padding: '10px 14px' }}>
                <span style={{ color: MD, flexShrink: 0, display: 'flex' }}><SearchIcon /></span>
                <input
                  value={drawerSearch}
                  onChange={e => setDrawerSearch(e.target.value)}
                  placeholder="Search collections..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...F, fontSize: '13px', color: DK }}
                />
              </div>
            </form>

            {/* User greeting */}
            {user && (
              <Link to="/account" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', textDecoration: 'none' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '13px', fontWeight: 700, color: G, flexShrink: 0, overflow: 'hidden' }}>
                  {profile?.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile?.first_name?.[0]?.toUpperCase() || user.email[0].toUpperCase())}
                </div>
                <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>
                  Hi, {profile?.first_name || user.email.split('@')[0]}
                </span>
              </Link>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {navLinks.map(link => (
                <Link key={link.label} to={link.path} onClick={onClose}
                  style={{ display: 'block', padding: '13px 24px', ...F, fontSize: '14px', fontWeight: 500, color: DK, borderBottom: `1px solid ${BR}`, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = G }}
                  onMouseLeave={e => { e.currentTarget.style.color = DK }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ padding: '16px 24px 8px' }}>
                <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: MD, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Collections</p>
                {secondaryLinks.map(col => (
                  <Link key={col.slug} to={col.path} onClick={onClose}
                    style={{ display: 'block', padding: '10px 0', ...F, fontSize: '13px', fontWeight: 400, color: MD, borderBottom: `1px solid ${BR}`, transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = G }}
                    onMouseLeave={e => { e.currentTarget.style.color = MD }}>
                    {col.label}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${BR}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {user ? (
                <>
                  <Link to="/account" onClick={onClose} style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>My Account</Link>
                  <button onClick={() => { onLogout(); onClose() }} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', color: MD, cursor: 'pointer', textAlign: 'left', padding: 0 }}>Sign Out</button>
                </>
              ) : (
                <Link to="/login" onClick={onClose} style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>Sign In / Register</Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchVal,     setSearchVal]     = useState('')
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const items     = useCartStore(s => s.items)
  const cartCount = items.reduce((n, i) => n + i.qty, 0)
  const { user, profile, logout } = useAuth()
  const searchRef = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  async function handleLogout() { await logout(); navigate('/') }

  function handleSearch(e) {
    e.preventDefault()
    if (searchVal.trim()) { navigate(`/shop?q=${encodeURIComponent(searchVal.trim())}`); setSearchVal(''); searchRef.current?.blur() }
  }

  const activeCol = new URLSearchParams(location.search).get('col')

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: W, boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none', borderBottom: `1px solid ${BR}`, transition: 'box-shadow 0.3s' }}>

        {/* ── MAIN NAV ── */}
        <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', height: '68px', display: 'flex', alignItems: 'center', gap: '24px' }}>

          {/* Mobile menu btn */}
          <button onClick={() => setMobileOpen(true)} className="mobile-only"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: DK, padding: '4px', flexShrink: 0 }}>
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ lineHeight: 1 }}>
              <span style={{ ...F, fontSize: '17px', fontWeight: 800, color: DK, letterSpacing: '-0.02em', display: 'block' }}>STAAY</span>
              <span style={{ ...F, fontSize: '8px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ONLINE</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {navLinks.map(link => {
              const active = location.pathname === link.path && link.path !== '/shop'
              return (
                <Link key={link.label} to={link.path}
                  style={{ ...F, fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? DK : MD, paddingBottom: '2px', borderBottom: `2px solid ${active ? G : 'transparent'}`, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = G }}
                  onMouseLeave={e => { e.currentTarget.style.color = active ? DK : MD; e.currentTarget.style.borderBottomColor = active ? G : 'transparent' }}>
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="desktop-only" style={{ flex: 1, maxWidth: '360px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: LG, border: `1.5px solid ${searchFocused ? G : 'transparent'}`, borderRadius: '8px', padding: '9px 14px', transition: 'border-color 0.2s' }}>
              <span style={{ color: MD, flexShrink: 0, display: 'flex' }}><SearchIcon /></span>
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search collections..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...F, fontSize: '13px', color: DK }}
              />
            </div>
          </form>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
            <Link to="/favorites"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              <HeartIcon />
            </Link>
            <Link to="/cart"
              style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              <CartIcon />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    style={{ position: 'absolute', top: '4px', right: '4px', width: '16px', height: '16px', background: G, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '9px', fontWeight: 700, color: W }}>
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            {user && (
              <Link to="/account" className="desktop-only"
                style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = G }}
                onMouseLeave={e => { e.currentTarget.style.color = DK }}>
                Hi, {profile?.first_name || user.email.split('@')[0]}
              </Link>
            )}
            <Link to={user ? '/account' : '/login'}
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: user ? G : MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = user ? G : MD }}>
              <UserIcon />
            </Link>
          </div>
        </div>

        {/* ── SECONDARY BAR ── */}
        <div style={{ borderTop: `1px solid ${BR}` }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
            <div className="hide-scroll" style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
              {secondaryLinks.map(col => {
                const active = col.path === location.pathname || (activeCol === col.slug && location.pathname === '/shop') || (!activeCol && col.slug === 'all' && location.pathname === '/shop')
                return (
                  <Link key={col.slug} to={col.path}
                    style={{ ...F, fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? G : MD, padding: '11px 18px', borderBottom: `2px solid ${active ? G : 'transparent'}`, whiteSpace: 'nowrap', transition: 'all 0.2s', display: 'block' }}
                    onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
                    onMouseLeave={e => { e.currentTarget.style.color = active ? G : MD; e.currentTarget.style.borderBottomColor = active ? G : 'transparent' }}>
                    {col.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} user={user} profile={profile} onLogout={handleLogout}
        onSearch={(val) => { if (val.trim()) navigate(`/shop?q=${encodeURIComponent(val.trim())}`) }} />
    </>
  )
}
