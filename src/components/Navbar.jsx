import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { useTheme } from '../context/ThemeContext'

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 1.5h2.2l1.6 7.5h6.8l1.4-5H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="12.5" r="1" fill="currentColor"/>
    <circle cx="11" cy="12.5" r="1" fill="currentColor"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13.5S2 9.8 2 5.8A3.3 3.3 0 0 1 8 4a3.3 3.3 0 0 1 6 2c0 4-6 7.5-6 7.5z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M7.5 1v1.4M7.5 12.6V14M1 7.5h1.4M12.6 7.5H14M2.9 2.9l1 1M11.1 11.1l1 1M11.1 2.9l-1 1M2.9 11.1l1-1"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M11.5 9.5A5.5 5.5 0 0 1 5.5 3.5a5.5 5.5 0 1 0 6 6z"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
    <path d="M1 1h16M1 6.5h10M1 12h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',        path: '/'      },
   { label: 'Our Brand',   path: '/'      },
  { label: 'Shop',        path: '/shop'  },
  { label: 'Collections', path: '/shop'  },
  { label: 'Featured',   path: '/'      },
]

// ─── Search Overlay ───────────────────────────────────────────────────────────
function SearchOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 997,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0,
              zIndex: 998, background: 'var(--bg)',
              borderBottom: '1px solid var(--border)',
              padding: '24px 80px',
            }}
          >
            <div style={{
              maxWidth: '1200px', margin: '0 auto',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <span style={{ color: 'var(--text-faint)', flexShrink: 0 }}><SearchIcon /></span>
              <input
                autoFocus
                placeholder="Search for pieces, collections..."
                style={{
                  flex: 1, background: 'transparent',
                  border: 'none', outline: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '22px', color: 'var(--text)',
                  letterSpacing: '0.04em',
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'var(--text-faint)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}
              >
                ESC
              </button>
            </div>

            {/* Trending tags */}
            <div style={{
              maxWidth: '1200px', margin: '14px auto 0',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
              }}>
                Trending:
              </span>
              {['Sneakers', 'Cargo Pants', 'Oversized Hoodies', 'New Arrivals'].map(tag => (
                <Link
                  key={tag} to="/shop" onClick={onClose}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--text-muted)',
                    padding: '5px 12px',
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose, cartCount, theme, toggleTheme }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '300px', zIndex: 1000,
              background: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
            }}>
              <img
                src="/stayonlinelogo.jpeg"
                alt="Staay"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Links */}
            <div style={{
              flex: 1, padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: '2px',
            }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    to={link.path} onClick={onClose}
                    style={{
                      display: 'block',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '32px', letterSpacing: '0.04em',
                      color: 'var(--text-muted)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.3 }}
                style={{ marginTop: '16px' }}
              >
                <Link
                  to="/login" onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '32px', letterSpacing: '0.04em',
                    color: 'var(--text-muted)',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  LOGIN
                </Link>
              </motion.div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  padding: '8px 14px',
                  color: 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
              <Link
                to="/cart" onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                }}
              >
                Bag
                {cartCount > 0 && (
                  <span style={{
                    width: '18px', height: '18px',
                    background: 'var(--accent)',
                    color: theme === 'light' ? '#fff' : '#0C0B09',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', fontWeight: 700,
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location                    = useLocation()
  const { theme, toggleTheme }      = useTheme()
  const items                       = useCartStore(s => s.items)
  const cartCount                   = items.reduce((n, i) => n + i.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSearchOpen(false)
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.nav
        animate={{ height: scrolled ? '56px' : '66px' }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'sticky', top: 0, zIndex: 996,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          height: '100%',
          display: 'flex', alignItems: 'center',
          padding: '0 80px', gap: '48px',
        }}>

          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              flexShrink: 0, textDecoration: 'none',
            }}
          >
            {/* Gold coin mark */}
          <motion.img
              src="/stayonlinelogo.jpeg"
              alt="Staay"
              animate={{ width: scrolled ? '34px' : '40px', height: scrolled ? '34px' : '40px' }}
              transition={{ duration: 0.3 }}
              style={{
                objectFit: 'cover',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
           
          </Link>

          {/* ── Desktop links ── */}
          <div
            className="desktop-only"
            style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}
          >
            {navLinks.map(link => {
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    position: 'relative',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 400,
                    color: active ? 'var(--text)' : 'var(--text-muted)',
                    paddingBottom: '3px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '2px', background: 'var(--accent)',
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ── Right icons ── */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '4px', marginLeft: 'auto',
          }}>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              style={{
                width: '38px', height: '38px',
                background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: searchOpen ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = searchOpen ? 'var(--accent)' : 'var(--text-muted)' }}
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <button
              className="desktop-only"
              style={{
                width: '38px', height: '38px',
                background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <HeartIcon />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '38px', height: '38px',
                background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            {/* Divider */}
            <div style={{
              width: '1px', height: '18px',
              background: 'var(--border)', margin: '0 6px',
            }} />

            {/* Cart */}
            <Link
              to="/cart"
              style={{
                position: 'relative', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <CartIcon />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute', top: '5px', right: '4px',
                      width: '14px', height: '14px',
                      background: 'var(--accent)', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '8px', fontWeight: 700,
                      color: theme === 'light' ? '#fff' : '#0C0B09',
                    }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="desktop-only"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.16em',
                textTransform: 'uppercase', fontWeight: 400,
                color: 'var(--text-muted)',
                padding: '8px 16px',
                border: '1px solid var(--border)',
                transition: 'all 0.22s',
                marginLeft: '4px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              Login
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="mobile-only"
              style={{
                display: 'none', width: '38px', height: '38px',
                background: 'transparent', border: 'none',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '4px',
              }}
            >
              <MenuIcon />
            </button>

          </div>
        </div>
      </motion.nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        cartCount={cartCount}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  )
}
