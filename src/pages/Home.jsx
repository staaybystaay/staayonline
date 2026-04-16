import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ═══════════════════════════════════════════════════════
// SLIDES — swap URLs to your local paths
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
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1200&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90&fit=crop',
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
// FEATURED DROPS DATA
// ═══════════════════════════════════════════════════════
const featuredDrops = [
  {
    id: 'f1',
    label: 'AIR STAAY 01',
    price: '$320',
    image: '/airsneaker.jpg',
    tag: 'New',
  },
  {
    id: 'f2',
    label: 'VOID HOODIE',
    price: '$195',
    image: '/hoodie.jpg',
    tag: 'Hot',
  },
  {
    id: 'f3',
    label: 'CARGO PANT 02',
    price: '$240',
    image: '/cargopant.jpg',
    tag: 'New',
  },
  {
    id: 'f4',
    label: 'PHANTOM JACKET',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80&fit=crop',
    tag: null,
  },
  {
    id: 'f5',
    label: 'CROCS',
    price: '$280',
    image: '/crocs.png',
    tag: 'Sale',
  },
]

const badgeMap = {
  New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
  Hot:  { background: 'var(--badge-hot-bg)',  color: 'var(--badge-hot-fg)', border: '1px solid var(--accent)' },
  Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
}

// ═══════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1)
  const [paused,  setPaused]  = useState(false)
  const { theme }             = useTheme()
  const slide                 = heroSlides[current]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), 6500)
    return () => clearInterval(id)
  }, [current, paused])

  const go = (d) => {
    setDir(d)
    setCurrent(c => (c + d + heroSlides.length) % heroSlides.length)
  }

  const goTo = (i) => {
    if (i === current) return
    setDir(i > current ? 1 : -1)
    setCurrent(i)
  }

  const lines = slide.heading.filter(Boolean)

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        minHeight: '620px',
        overflow: 'hidden',
        background: '#050505',
      }}
    >

      {/* ── FULL BLEED BACKGROUND IMAGE ── */}
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={`img-${slide.id}`}
          custom={dir}
          initial={{ clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
        <img
          src={slide.image}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: slide.imagePos || 'center 30%',
            transform: 'scale(0.85)',
            transformOrigin: 'center center',
            display: 'block',
          }}
        />
      </motion.div>
      </AnimatePresence>

      {/* ── GRADIENT OVERLAYS ── */}
      {/* Left dark overlay so text is readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.05) 100%)',
      }} />
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '200px', zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      }} />
      {/* Accent color tint */}
      <motion.div
        key={`tint-${slide.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `radial-gradient(ellipse at 15% 60%, ${slide.accent}25 0%, transparent 55%)`,
        }}
      />

      {/* ── ACCENT TOP STRIPE ── */}
      <motion.div
        key={`stripe-${slide.id}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px', background: slide.accent,
          transformOrigin: 'left', zIndex: 3,
        }}
      />

      {/* ── NEW SEASON BADGE ── */}
      <motion.div
        key={`badge-${slide.id}`}
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
        }}
      >
        New Season
      </motion.div>
      {/* ── GHOST NUMBER ── */}
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

      {/* ── TEXT CONTENT ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', padding: '0 80px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '560px' }}
          >

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', marginBottom: '28px',
              }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '32px' }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                  display: 'block', height: '2px',
                  background: slide.accent, overflow: 'hidden',
                }}
              />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: slide.accent, fontWeight: 500,
              }}>
                {slide.tag}
              </span>
            </motion.div>

            {/* HEADLINE */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(80px, 10vw, 140px)',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              margin: '0 0 24px',
              textTransform: 'uppercase',
            }}>
              {lines.map((line, i) => (
                <motion.div
                  key={`${slide.id}-${i}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: 'block',
                    overflow: 'hidden',
                    color: i === slide.accentLine ? slide.accent : '#ffffff',
                  }}
                >
                  <span style={{ display: 'block' }}>{line}</span>
                </motion.div>
              ))}
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '2px', background: slide.accent,
                transformOrigin: 'left', width: '60px', marginBottom: '18px',
              }}
            />

            {/* Sub */}
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
              }}
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              <Link
                to="/shop"
                style={{
                  background: slide.accent,
                  color: slide.accent === '#F0C040' ? '#080808' : '#fff',
                  padding: '14px 36px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 500,
                  display: 'inline-block', transition: 'all 0.3s',
                  border: `2px solid ${slide.accent}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = slide.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = slide.accent
                  e.currentTarget.style.color = slide.accent === '#F0C040' ? '#080808' : '#fff'
                }}
              >
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
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = slide.accent
                  e.currentTarget.style.color = slide.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                Lookbook
              </Link>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM BAR — counter + dots + arrows ── */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', maxWidth: '1200px',
        padding: '0 80px',
        zIndex: 3,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Counter + dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '22px', color: slide.accent, lineHeight: 1,
                }}
              >
                {String(current + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'rgba(255,255,255,0.25)',
            }}>
              / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px' }}
              >
                <motion.div
                  animate={{
                    width:      i === current ? '20px' : '6px',
                    background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '3px', borderRadius: '2px' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[-1, 1].map(d => (
            <button
              key={d}
              onClick={() => go(d)}
              style={{
                width: '48px', height: '48px',
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '16px',
                transition: 'all 0.25s',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = slide.accent
                e.currentTarget.style.borderColor = slide.accent
                e.currentTarget.style.color = slide.accent === '#F0C040' ? '#080808' : '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(0,0,0,0.45)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
            >
              {d === -1 ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>

      {/* ── VERTICAL BRAND LABEL ── */}
      <div style={{
        position: 'absolute', bottom: '120px', left: '18px',
        transform: 'rotate(-90deg)',
        transformOrigin: 'left center',
        zIndex: 3,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '8px', letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
          whiteSpace: 'nowrap',
        }}>
          stayyonline.com — SS2025
        </span>
      </div>

      {/* ── PROGRESS BAR ── */}
      {!paused && (
        <motion.div
          key={`bar-${slide.id}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6.5, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '3px', background: slide.accent,
            transformOrigin: 'left', zIndex: 3,
          }}
        />
      )}

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
    <section style={{
      background: 'var(--bg-surface)',
      padding: '40px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--accent)' }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 400,
            }}>
              Just dropped
            </span>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '2px',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            See all →
          </Link>
        </div>
        <div
          className="fe-scrollbar"
          style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '4px' }}
        >
          {featuredDrops.map((drop, i) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(drop.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0, width: '200px', cursor: 'pointer',
                transition: 'transform 0.35s',
                transform: hovered === drop.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <div style={{
                position: 'relative', width: '200px', height: '220px',
                overflow: 'hidden', background: 'var(--bg-card)',
                border: `1px solid ${hovered === drop.id ? 'var(--border-mid)' : 'var(--border)'}`,
                transition: 'border-color 0.3s',
              }}>
                <img src={drop.image} alt={drop.label} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.65s',
                  transform: hovered === drop.id ? 'scale(1.06)' : 'scale(1)',
                }} />
                {drop.tag && (
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    padding: '3px 8px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 500,
                    ...stripBadge[drop.tag],
                  }}>
                    {drop.tag}
                  </span>
                )}
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text)', fontWeight: 500, marginBottom: '3px',
                }}>
                  {drop.label}
                </p>
                <p style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontSize: '15px', color: 'var(--accent)',
                }}>
                  {drop.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════
function EditorialMarquee() {
  const words = [
    'STAYYONLINE', '✦', 'SS 2025', '✦',
    'NEW COLLECTION', '✦', 'WEAR THE VOID', '✦',
    'STAYYONLINE', '✦', 'SS 2025', '✦',
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
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500, fontSize: '11px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: word === '✦' ? 'var(--accent)' : 'var(--text-faint)',
          }}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// CATEGORIES
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

function CategoriesSection({ active, setActive }) {
  const { theme } = useTheme()
  const isLight   = theme === 'light'

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
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Browse by
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
            }}>
              Categories
            </h2>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
            transition: 'color 0.22s, border-color 0.22s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderBottomColor = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderBottomColor = 'var(--border-mid)'
            }}
          >
            View All →
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          {categoryData.map(cat => {
            const isActive = active === cat.label
            return (
              <motion.button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '9px 18px',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
                  color: isActive ? (isLight ? '#fff' : '#080808') : 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 500 : 300,
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
              >
                <span style={{ fontSize: '11px' }}>{cat.icon}</span>
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
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow)' : 'none',
      }}
    >
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
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.65s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'flex-end', padding: '14px',
        }}>
          <button
            onClick={e => { e.stopPropagation(); addItem(product) }}
            style={{
              width: '100%', background: 'var(--accent)',
              color: '#fff', border: 'none', padding: '11px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.target.style.opacity = '0.85' }}
            onMouseLeave={e => { e.target.style.opacity = '1' }}
          >
            Add to Bag
          </button>
        </div>
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '3px 9px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            ...badgeMap[product.badge],
          }}>
            {product.badge}
          </span>
        )}
        <button style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '30px', height: '30px',
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '13px', color: 'var(--text-muted)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          ♡
        </button>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
          marginBottom: '5px', fontWeight: 300,
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
            fontStyle: 'italic', fontSize: '17px', color: 'var(--accent)',
          }}>
            ${product.price}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.1em',
          }}>
            In stock
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT GRID
// ═══════════════════════════════════════════════════════
function ProductGridSection({ activeCategory }) {
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

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
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Featured drops
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '0.02em',
            }}>
              New Arrivals
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'var(--text-faint)',
            }}>
              {filtered.length} items
            </span>
            <Link to="/shop" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
              transition: 'color 0.22s',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
            >
              Shop All →
            </Link>
          </div>
        </motion.div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
        }}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// EDITORIAL SPLIT
// ═══════════════════════════════════════════════════════
function EditorialSplit() {
  return (
    <section style={{ background: 'var(--bg)', padding: '0 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', height: '440px', overflow: 'hidden' }}
          >
            <img
              src="/mendress.jpg"
              alt="New Release"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%)',
            }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                New Release
              </span>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '36px', color: '#F2EEE6',
                lineHeight: 1, letterSpacing: '0.02em', marginBottom: '14px',
              }}>
                VOID SERIES<br />DROP 01
              </h3>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px',
              }}>
                Discover the collection →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: 'relative', height: '440px', overflow: 'hidden' }}
          >
            <img
              src="/womendress.jpg"
              alt="Coming Soon"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block', filter: 'grayscale(30%)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%)',
              borderLeft: '3px solid var(--accent)',
            }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                Coming soon —
              </span>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '36px', color: '#F2EEE6',
                lineHeight: 1, letterSpacing: '0.02em', marginBottom: '20px',
              }}>
                NEXT DROP<br />IS COMING.
              </h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map((t, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '32px', color: 'var(--accent)', lineHeight: 1,
                    }}>
                      {t.v}
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,238,230,0.4)', marginTop: '4px',
                    }}>
                      {t.l}
                    </div>
                  </div>
                ))}
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
      <HeroSection />
      <FeaturedDropsStrip />
      <EditorialMarquee />
      <CategoriesSection active={activeCategory} setActive={setActiveCategory} />
      <ProductGridSection activeCategory={activeCategory} />
      <EditorialSplit />
    </main>
  )
}
