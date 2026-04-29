import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ═══════════════════════════════════════════════════════
// HERO SLIDES — kept exactly as client had them
// ═══════════════════════════════════════════════════════
const heroSlides = [
  {
    id: 1,
    image: '/yellowblue.jpg',
    tag: 'SS 2025 — Footwear',
    heading: ['STEP', 'INTO', 'NOW.'],
    accentLine: 1,
    sub: 'Every step is a statement.',
    cta: 'Shop Sneakers',
    accent: '#C9A44A',
    bgLeft: '#080600',
    imagePos: 'center center',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Tops',
    heading: ['WEAR', 'THE', 'VOID.'],
    accentLine: 2,
    sub: 'Oversized. Minimal. Yours.',
    cta: 'Shop Hoodies',
    accent: '#C9A44A',
    bgLeft: '#050400',
    imagePos: 'center 20%',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Bottoms',
    heading: ['NEW', 'DROP', '01.'],
    accentLine: 0,
    sub: 'Cargo culture refined.',
    cta: 'Shop Bottoms',
    accent: '#C9A44A',
    bgLeft: '#040400',
    imagePos: 'center center',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Collection',
    heading: ['THE', 'EDIT.', ''],
    accentLine: 1,
    sub: 'Curated for those who refuse definition.',
    cta: 'Shop All',
    accent: '#C9A44A',
    bgLeft: '#050400',
    imagePos: 'center top',
  },
]

// ═══════════════════════════════════════════════════════
// FEATURED DROPS — kept exactly as client had them
// ═══════════════════════════════════════════════════════
const featuredDrops = [
  { id: 'f1', label: 'AIR STAAY 01',   price: '$320', image: '/airsneaker.jpg', tag: 'New'  },
  { id: 'f2', label: 'VOID HOODIE',    price: '$195', image: '/hoodie.jpg',     tag: 'Hot'  },
  { id: 'f3', label: 'CARGO PANT 02',  price: '$240', image: '/cargopant.jpg',  tag: 'New'  },
  { id: 'f4', label: 'PHANTOM JACKET', price: '$420', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80&fit=crop', tag: null },
  { id: 'f5', label: 'CROCS',          price: '$280', image: '/crocs.png',      tag: 'Sale' },
]

const badgeMap = {
  New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
  Hot:  { background: 'var(--badge-hot-bg)',  color: 'var(--badge-hot-fg)', border: '1px solid var(--accent)' },
  Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
}

// ═══════════════════════════════════════════════════════
// PROMO POPUP — kept exactly as client changed it
// close button only, no timer, centred image
// ═══════════════════════════════════════════════════════
function PromoPopup() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(6px)',
        padding: '20px',
      }}
      onClick={function() { setVisible(false) }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={function(e) { e.stopPropagation() }}
        style={{
          position: 'relative',
          maxWidth: '420px',
          width: '100%',
          background: '#0C0B09',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          margin: 'auto',
        }}>
        <button
          onClick={function() { setVisible(false) }}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            zIndex: 10,
            width: '32px', height: '32px',
            background: 'rgba(12,11,9,0.75)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px', lineHeight: 1,
            transition: 'background 0.2s, border-color 0.2s',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={function(e) {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = '#0C0B09'
          }}
          onMouseLeave={function(e) {
            e.currentTarget.style.background = 'rgba(12,11,9,0.75)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.color = '#fff'
          }}
          aria-label="Close promo">
          ✕
        </button>

        <div style={{
          width: '100%',
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src="/heroflyer.jpg"
            alt="Promo"
            style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderTop: '1px solid var(--border)',
          gap: '12px',
        }}>
          <Link
            to="/shop"
            onClick={function() { setVisible(false) }}
            style={{
              background: 'var(--accent)', color: '#0C0B09',
              padding: '10px 28px',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '15px', letterSpacing: '0.1em',
              display: 'inline-block', transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={function(e) { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={function(e) { e.currentTarget.style.opacity = '1' }}>
            Shop Now
          </Link>
          <button
            onClick={function() { setVisible(false) }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              padding: '9px 20px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={function(e) {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}>
            Skip
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1)
  const [paused,  setPaused]  = useState(false)
  const slide                 = heroSlides[current]

  useEffect(function() {
    if (paused) return
    var id = setInterval(function() { go(1) }, 6500)
    return function() { clearInterval(id) }
  }, [current, paused])

  function go(d) {
    setDir(d)
    setCurrent(function(c) { return (c + d + heroSlides.length) % heroSlides.length })
  }

  function goTo(i) {
    if (i === current) return
    setDir(i > current ? 1 : -1)
    setCurrent(i)
  }

  var lines = slide.heading.filter(Boolean)

  return (
    <section
      onMouseEnter={function() { setPaused(true) }}
      onMouseLeave={function() { setPaused(false) }}
      style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        minHeight: '620px',
        overflow: 'hidden',
        background: '#050505',
      }}>

      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={'img-' + slide.id}
          custom={dir}
          initial={{ clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(' + slide.image + ')',
            backgroundSize: 'cover',
            backgroundPosition: slide.imagePos || 'center center',
            backgroundRepeat: 'no-repeat',
          }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(8,6,0,0.88) 0%, rgba(8,6,0,0.55) 40%, rgba(8,6,0,0.15) 75%, rgba(8,6,0,0.05) 100%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '200px',
            background: 'linear-gradient(to top, rgba(8,6,0,0.85), transparent)',
          }} />
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '200px', zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      }} />
      <motion.div
        key={'tint-' + slide.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse at 15% 60%, ' + slide.accent + '25 0%, transparent 55%)',
        }} />

      <motion.div
        key={'stripe-' + slide.id}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px', background: slide.accent,
          transformOrigin: 'left', zIndex: 3,
        }} />

      <motion.div
        key={'badge-' + slide.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          position: 'absolute', top: '24px', right: '24px',
          zIndex: 3,
          background: 'var(--accent)',
          padding: '6px 14px',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.3em',
          textTransform: 'uppercase', fontWeight: 600,
          color: '#0C0B09',
        }}>
        New Season
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '-10px', right: '2%',
        zIndex: 1, pointerEvents: 'none',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(200px, 28vw, 420px)',
        lineHeight: 1,
        color: 'rgba(255,255,255,0.04)',
        userSelect: 'none',
        letterSpacing: '-0.05em',
      }}>
        {String(current + 1).padStart(2, '0')}
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', padding: '0 80px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={'text-' + slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '560px' }}>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '32px' }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{ display: 'block', height: '2px', background: slide.accent, overflow: 'hidden' }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: slide.accent, fontWeight: 500,
              }}>
                {slide.tag}
              </span>
            </motion.div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(80px, 10vw, 140px)',
              lineHeight: 0.9, letterSpacing: '0.01em',
              margin: '0 0 24px', textTransform: 'uppercase',
            }}>
              {lines.map(function(line, i) {
                return (
                  <motion.div
                    key={slide.id + '-' + i}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: 'block', overflow: 'hidden',
                      color: i === slide.accentLine ? slide.accent : '#ffffff',
                    }}>
                    <span style={{ display: 'block' }}>{line}</span>
                  </motion.div>
                )
              })}
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '2px', background: slide.accent,
                transformOrigin: 'left', width: '60px', marginBottom: '18px',
              }} />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '16px', lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '36px', maxWidth: '320px',
              }}>
              {slide.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link
                to="/shop"
                style={{
                  background: slide.accent, color: '#0C0B09',
                  padding: '14px 36px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 500,
                  display: 'inline-block', transition: 'all 0.3s',
                  border: '2px solid ' + slide.accent,
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = slide.accent
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.background = slide.accent
                  e.currentTarget.style.color = '#0C0B09'
                }}>
                {slide.cta}
              </Link>
              <Link
                to="/shop"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.6)',
                  padding: '13px 32px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 300,
                  display: 'inline-block', transition: 'all 0.3s',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.borderColor = slide.accent
                  e.currentTarget.style.color = slide.accent
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}>
                Lookbook
              </Link>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', maxWidth: '1200px',
        padding: '0 80px', zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: slide.accent, lineHeight: 1 }}>
                {String(current + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
              / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {heroSlides.map(function(s, i) {
              return (
                <button
                  key={s.id}
                  onClick={function() { goTo(i) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px' }}>
                  <motion.div
                    animate={{
                      width: i === current ? '20px' : '6px',
                      background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '3px', borderRadius: '2px' }} />
                </button>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[-1, 1].map(function(d) {
            return (
              <button
                key={d}
                onClick={function() { go(d) }}
                style={{
                  width: '48px', height: '48px',
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '16px',
                  transition: 'all 0.25s', backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.background = slide.accent
                  e.currentTarget.style.borderColor = slide.accent
                  e.currentTarget.style.color = '#0C0B09'
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.45)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}>
                {d === -1 ? '←' : '→'}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '120px', left: '18px',
        transform: 'rotate(-90deg)', transformOrigin: 'left center', zIndex: 3,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '8px', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap',
        }}>
          staayonline.com — SS2025
        </span>
      </div>

      {!paused && (
        <motion.div
          key={'bar-' + slide.id}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6.5, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '3px', background: slide.accent,
            transformOrigin: 'left', zIndex: 3,
          }} />
      )}
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// STAT CARDS — 2 cards, compact, feminine
// ═══════════════════════════════════════════════════════
function StatCards() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '36px 40px', borderRight: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '52px', color: 'var(--accent)',
              letterSpacing: '0.02em', lineHeight: 1, flexShrink: 0,
            }}>
              2,400+
            </div>
            <div>
              <div style={{ width: '24px', height: '2px', background: 'var(--accent)', marginBottom: '8px' }} />
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '13px', color: 'var(--text)', fontWeight: 500,
                letterSpacing: '0.04em', marginBottom: '3px',
              }}>
                Pieces Available
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontSize: '12px',
                color: 'var(--text-faint)', fontWeight: 300,
              }}>
                Across all categories
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              padding: '36px 40px',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '52px', color: 'var(--accent)',
              letterSpacing: '0.02em', lineHeight: 1, flexShrink: 0,
            }}>
              98%
            </div>
            <div>
              <div style={{ width: '24px', height: '2px', background: 'var(--accent)', marginBottom: '8px' }} />
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '13px', color: 'var(--text)', fontWeight: 500,
                letterSpacing: '0.04em', marginBottom: '3px',
              }}>
                Satisfaction Rate
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontSize: '12px',
                color: 'var(--text-faint)', fontWeight: 300,
              }}>
                From verified buyers
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// FEMININE MANIFESTO — NEW SECTION
// ═══════════════════════════════════════════════════════
function Manifesto() {
  return (
    <section style={{
      background: 'var(--bg)',
      padding: '80px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: '64px', alignItems: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '16px' }} />
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              fontWeight: 400, marginBottom: '12px',
            }}>
              Our Promise
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              color: 'var(--text)', lineHeight: 1,
              letterSpacing: '0.02em',
            }}>
              FOR EVERY WOMAN. EVERY DAY.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.65, color: 'var(--text)',
              margin: 0,
            }}>
              "Staay is not about fashion seasons or runway rules.
              It's about the ordinary woman who is{' '}
              <span style={{ color: 'var(--accent)' }}>
                extraordinary
              </span>{' '}
              in her own way — young, timeless, local and global all at once."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                fontWeight: 300,
              }}>
                Mr. Jonas Gogmi, Founder
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// FEATURED DROPS STRIP
// ═══════════════════════════════════════════════════════
function FeaturedDropsStrip() {
  const [hovered, setHovered] = useState(null)

  const stripBadge = {
    New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
    Hot:  { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' },
    Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
  }

  return (
    <section style={{ background: 'var(--bg-surface)', padding: '56px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: '32px',
        }}>
          <div>
            <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '12px' }} />
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
            }}>
              Just Dropped
            </h2>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '13px', color: 'var(--text-muted)',
              marginTop: '6px',
            }}>
              Fresh pieces, straight from Accra.
            </p>
          </div>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
            See all
          </Link>
        </div>

        <div
          className="fe-scrollbar"
          style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {featuredDrops.map(function(drop, i) {
            return (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onMouseEnter={function() { setHovered(drop.id) }}
                onMouseLeave={function() { setHovered(null) }}
                style={{
                  flexShrink: 0, width: '200px', cursor: 'pointer',
                  transition: 'transform 0.35s',
                  transform: hovered === drop.id ? 'translateY(-6px)' : 'translateY(0)',
                }}>
                <div style={{
                  position: 'relative', width: '200px', height: '240px',
                  overflow: 'hidden', background: 'var(--bg-card)',
                  border: hovered === drop.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                  transition: 'border-color 0.3s',
                }}>
                  <img
                    src={drop.image}
                    alt={drop.label}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.65s',
                      transform: hovered === drop.id ? 'scale(1.06)' : 'scale(1)',
                    }} />
                  {drop.tag && (
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      padding: '4px 10px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', letterSpacing: '0.16em',
                      textTransform: 'uppercase', fontWeight: 600,
                      ...stripBadge[drop.tag],
                    }}>
                      {drop.tag}
                    </span>
                  )}
                  {/* Gold bottom accent on hover */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '3px', background: 'var(--accent)',
                    transform: hovered === drop.id ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.35s',
                  }} />
                </div>
                <div style={{ padding: '12px 0' }}>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px', letterSpacing: '0.1em',
                    color: 'var(--text)', fontWeight: 500, marginBottom: '4px',
                  }}>
                    {drop.label}
                  </p>
                  <p style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: 'italic', fontSize: '16px', color: 'var(--accent)',
                  }}>
                    {drop.price}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// MARQUEE — kept but made warmer
// ═══════════════════════════════════════════════════════
function EditorialMarquee() {
  const words = [
    'STAAY', '✦', 'SS 2025', '✦',
    'MADE IN ACCRA', '✦', 'FOR HER WORLD', '✦',
    'YOUNG. CLASSIC. LOCAL.', '✦', 'SS 2025', '✦',
    'STAAY', '✦', 'DESIGNED FOR YOU', '✦',
  ]
  return (
    <div style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0', overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...words, ...words].map(function(word, i) {
          return (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: word === '✦' ? 400 : 300,
              fontSize: '11px',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: word === '✦' ? 'var(--accent)' : 'var(--text-faint)',
            }}>
              {word}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// CATEGORIES — softened, feminine
// ═══════════════════════════════════════════════════════
const categoryData = [
  { label: 'All',     icon: '◎' },
  { label: 'Tops',    icon: '◈' },
  { label: 'Bottoms', icon: '▣' },
  { label: 'Jackets', icon: '◉' },
  { label: 'Coats',   icon: '◍' },
  { label: 'Dresses', icon: '◆' },
  { label: 'Shoes',   icon: '◎' },
]

function CategoriesSection(props) {
  var active    = props.active
  var setActive = props.setActive
  const { theme } = useTheme()
  var isLight = theme === 'light'

  return (
    <section style={{
      background: 'var(--bg)', padding: '72px 0 52px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}>
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '8px', fontWeight: 400,
            }}>
              Browse by
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
            }}>
              Shop by Category
            </h2>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '13px', color: 'var(--text-muted)',
              marginTop: '6px',
            }}>
              Every style. Every woman.
            </p>
          </div>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
              transition: 'color 0.22s, border-color 0.22s',
            }}
            onMouseEnter={function(e) {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderBottomColor = 'var(--accent)'
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderBottomColor = 'var(--border-mid)'
            }}>
            View All
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categoryData.map(function(cat) {
            var isActive = active === cat.label
            return (
              <motion.button
                key={cat.label}
                onClick={function() { setActive(cat.label) }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '10px 20px',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-mid)',
                  color: isActive ? '#0C0B09' : 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 600 : 300,
                  cursor: 'pointer', transition: 'all 0.22s',
                  borderRadius: '0',
                }}>
                {cat.label}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════
function ProductCard(props) {
  var product = props.product
  var index   = props.index
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(function(s) { return s.addItem })

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={function() { setHovered(true) }}
      onMouseLeave={function() { setHovered(false) }}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(201,164,74,0.12)' : 'none',
      }}>
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', background: 'var(--bg-surface)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: '11px', color: 'var(--text-faint)',
          }}>
            {product.category}
          </span>
        </div>
        <img
          src={product.image}
          alt={product.name}
          onError={function(e) { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.65s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'flex-end', padding: '14px',
        }}>
          <button
            onClick={function(e) { e.stopPropagation(); addItem(product) }}
            style={{
              width: '100%', background: 'var(--accent)',
              color: '#0C0B09', border: 'none', padding: '12px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 600,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={function(e) { e.target.style.opacity = '0.85' }}
            onMouseLeave={function(e) { e.target.style.opacity = '1' }}>
            Add to Bag
          </button>
        </div>
        {product.badge && (
          <span style={{
            position: 'absolute', top: '0', left: '0',
            padding: '5px 12px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 700,
            ...badgeMap[product.badge],
          }}>
            {product.badge}
          </span>
        )}
        <button style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '32px', height: '32px',
          background: 'rgba(250,247,242,0.9)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '14px', color: 'var(--accent)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          ♡
        </button>
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
          marginBottom: '4px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', color: 'var(--text)',
          marginBottom: '8px', letterSpacing: '0.04em', lineHeight: 1.2,
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '18px', color: 'var(--accent)',
          }}>
            ${product.price}
          </span>
          <Link
            to={`/product/${product.id}`}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-faint)' }}>
            View
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT GRID
// ═══════════════════════════════════════════════════════
function ProductGridSection(props) {
  var activeCategory = props.activeCategory
  var filtered = activeCategory === 'All'
    ? products
    : products.filter(function(p) { return p.category === activeCategory })

  return (
    <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}>
          <div>
            <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '12px' }} />
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
            }}>
              New Arrivals
            </h2>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px',
            }}>
              Pieces made for her, wherever she is.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'var(--text-faint)',
            }}>
              {filtered.length} pieces
            </span>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
                transition: 'color 0.22s',
              }}
              onMouseEnter={function(e) { e.target.style.color = 'var(--accent)' }}
              onMouseLeave={function(e) { e.target.style.color = 'var(--text-muted)' }}>
              Shop All
            </Link>
          </div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {filtered.map(function(product, i) {
            return <ProductCard key={product.id} product={product} index={i} />
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// EDITORIAL SPLIT — kept with client's images
// ═══════════════════════════════════════════════════════
function EditorialSplit() {
  return (
    <section style={{ background: 'var(--bg)', padding: '0 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Section header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '12px' }} />
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
          }}>
            The Collection
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
            <img
              src="/mendress.jpg"
              alt="New Release"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)',
            }} />
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block', fontWeight: 400,
              }}>
                New Release
              </span>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '38px', color: '#F2EEE6',
                lineHeight: 1, letterSpacing: '0.02em', marginBottom: '8px',
              }}>
                VOID SERIES<br />DROP 01
              </h3>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '13px', color: 'rgba(242,238,230,0.65)',
                marginBottom: '16px', lineHeight: 1.6,
              }}>
                Built for the woman who moves with purpose.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#fff',
                  borderBottom: '1px solid rgba(255,255,255,0.35)', paddingBottom: '3px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.borderBottomColor = 'var(--accent)'
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)'
                }}>
                Discover the collection
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
            <img
              src="/womendress.jpg"
              alt="Coming Soon"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%)',
              borderLeft: '3px solid var(--accent)',
            }} />
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block', fontWeight: 400,
              }}>
                Coming Soon
              </span>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '38px', color: '#F2EEE6',
                lineHeight: 1, letterSpacing: '0.02em', marginBottom: '24px',
              }}>
                NEXT DROP<br />IS COMING.
              </h3>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map(function(t, i) {
                  return (
                    <div key={i}>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '36px', color: 'var(--accent)', lineHeight: 1,
                      }}>
                        {t.v}
                      </div>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '9px', letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,238,230,0.45)', marginTop: '4px',
                      }}>
                        {t.l}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PromoPopup />
      <HeroSection />
      <StatCards />
      <Manifesto />
      <FeaturedDropsStrip />
      <EditorialMarquee />
      <CategoriesSection active={activeCategory} setActive={setActiveCategory} />
      <ProductGridSection activeCategory={activeCategory} />
      <EditorialSplit />
    </main>
  )
}
