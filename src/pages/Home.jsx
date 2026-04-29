import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// DESIGN TOKENS — warm, feminine, classic
// These override the CSS variables inline so the
// home page always feels warm regardless of theme
// ─────────────────────────────────────────────
const cream   = '#FAF7F2'
const cream2  = '#F2EDE4'
const gold    = '#C9A44A'
const dark    = '#1A1209'
const muted   = '#8A7560'
const faint   = '#C4B5A0'
const border  = '#E8DDD0'

// ─────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: '/yellowblue.jpg',
    tag: 'SS 2025',
    headline: 'Dressed\nfor her\nworld.',
    sub: 'Every step is a statement.',
    cta: 'Shop Now',
    imagePos: 'center center',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1600&q=90&fit=crop',
    tag: 'New In',
    headline: 'Effortless.\nEvery\nday.',
    sub: 'Oversized. Minimal. Yours.',
    cta: 'Shop Hoodies',
    imagePos: 'center 20%',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=90&fit=crop',
    tag: 'The Edit',
    headline: 'Local.\nGlobal.\nHers.',
    sub: 'Proudly crafted in Accra.',
    cta: 'View Collection',
    imagePos: 'center top',
  },
]

const featuredDrops = [
  { id: 'f1', label: 'Air Staay 01',    price: 320, image: '/airsneaker.jpg',  tag: 'New'  },
  { id: 'f2', label: 'Void Hoodie',     price: 195, image: '/hoodie.jpg',      tag: null   },
  { id: 'f3', label: 'Cargo Pant 02',   price: 240, image: '/cargopant.jpg',   tag: 'New'  },
  { id: 'f4', label: 'Phantom Jacket',  price: 420, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80&fit=crop', tag: null },
  { id: 'f5', label: 'Staay Crocs',     price: 280, image: '/crocs.png',       tag: 'Sale' },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}>
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PROMO POPUP — kept exactly as client had it
// ─────────────────────────────────────────────
function PromoPopup() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(26,18,9,0.75)',
        backdropFilter: 'blur(6px)', padding: '20px',
      }}
      onClick={() => setVisible(false)}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: '420px', width: '100%',
          background: cream, overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(26,18,9,0.3)',
        }}>
        {/* Top accent */}
        <div style={{ height: '3px', background: gold }} />
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            position: 'absolute', top: '14px', right: '14px', zIndex: 10,
            width: '30px', height: '30px',
            background: 'rgba(26,18,9,0.08)',
            border: 'none', borderRadius: '50%',
            color: dark, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '14px', transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = cream }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,18,9,0.08)'; e.currentTarget.style.color = dark }}>
          ✕
        </button>
        <div style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/heroflyer.jpg" alt="Promo" style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderTop: `1px solid ${border}`, gap: '12px',
        }}>
          <Link
            to="/shop"
            onClick={() => setVisible(false)}
            style={{
              background: gold, color: cream,
              padding: '11px 28px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em',
              textTransform: 'uppercase', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            Shop Now
          </Link>
          <button
            onClick={() => setVisible(false)}
            style={{
              background: 'transparent', border: `1px solid ${border}`,
              color: muted, padding: '10px 20px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.14em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted }}>
            Skip
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
// HERO — full bleed, elegant serif headline
// ─────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const slide = heroSlides[current]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 7000)
    return () => clearInterval(id)
  }, [current, paused])

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: '100vh', minHeight: '600px',
        overflow: 'hidden',
      }}>

      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(' + slide.image + ')',
            backgroundSize: 'cover',
            backgroundPosition: slide.imagePos,
          }}>
          {/* Warm feminine overlay — not harsh black */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(26,18,9,0.72) 0%, rgba(26,18,9,0.35) 50%, rgba(26,18,9,0.1) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(26,18,9,0.6) 0%, transparent 50%)',
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center',
        padding: '0 8vw', zIndex: 2,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={'hero-text-' + slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: '600px' }}>

            {/* Season tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '24px',
            }}>
              <div style={{ width: '28px', height: '1px', background: gold }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: gold, fontWeight: 400,
              }}>
                {slide.tag}
              </span>
            </div>

            {/* Headline — FRAUNCES serif, not Bebas */}
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(60px, 9vw, 130px)',
              lineHeight: 0.95, letterSpacing: '-0.01em',
              color: '#FAF7F2',
              margin: '0 0 28px',
              whiteSpace: 'pre-line',
            }}>
              {slide.headline}
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '15px', letterSpacing: '0.08em',
              color: 'rgba(250,247,242,0.6)',
              marginBottom: '36px', fontWeight: 300,
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link
                to="/shop"
                style={{
                  background: gold, color: dark,
                  padding: '14px 36px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 600,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FAF7F2'; e.currentTarget.style.color = dark }}
                onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = dark }}>
                {slide.cta}
              </Link>
              <Link
                to="/featured"
                style={{
                  color: 'rgba(250,247,242,0.75)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 300,
                  borderBottom: '1px solid rgba(250,247,242,0.3)',
                  paddingBottom: '2px', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,247,242,0.75)'; e.currentTarget.style.borderBottomColor = 'rgba(250,247,242,0.3)' }}>
                View Lookbook
              </Link>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators — bottom left */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '8vw',
        zIndex: 3, display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>
              <div style={{
                height: '2px', borderRadius: '1px',
                background: i === current ? gold : 'rgba(250,247,242,0.3)',
                width: i === current ? '32px' : '16px',
                transition: 'all 0.4s',
              }} />
            </button>
          ))}
        </div>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '10px', letterSpacing: '0.2em',
          color: 'rgba(250,247,242,0.35)', fontWeight: 300,
        }}>
          {String(current + 1).padStart(2,'0')} / {String(heroSlides.length).padStart(2,'0')}
        </span>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '40px', right: '8vw',
        zIndex: 3, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '8px',
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)',
          transform: 'rotate(90deg)', transformOrigin: 'center',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '32px', background: 'rgba(201,164,74,0.5)' }} />
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────
// BRAND STRIP — warm cream, soft statement
// ─────────────────────────────────────────────
function BrandStrip() {
  return (
    <section style={{ background: cream, borderBottom: `1px solid ${border}`, padding: '0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ overflow: 'hidden', padding: '18px 0' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[
              'Young', '·', 'Classic', '·', 'Local', '·', 'International', '·', 'Feminine',
              '·', 'Made in Accra', '·', 'SS 2025', '·', 'For Every Woman',
              '·', 'Young', '·', 'Classic', '·', 'Local', '·', 'International', '·', 'Feminine',
              '·', 'Made in Accra', '·', 'SS 2025', '·', 'For Every Woman', '·',
            ].map((w, i) => (
              <span key={i} style={{
                fontFamily: w === '·' ? "'Outfit', sans-serif" : "'Fraunces', serif",
                fontStyle: w === '·' ? 'normal' : 'italic',
                fontSize: w === '·' ? '16px' : '14px',
                letterSpacing: w === '·' ? '0' : '0.04em',
                color: w === '·' ? gold : muted,
                fontWeight: 300,
              }}>
                {w}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MANIFESTO — personal, warm, feminine
// ─────────────────────────────────────────────
function Manifesto() {
  return (
    <section style={{ background: cream, padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: '80px', alignItems: 'center',
        }}>
          {/* Left */}
          <FadeUp>
            <div>
              <div style={{
                width: '40px', height: '1px',
                background: gold, marginBottom: '20px',
              }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: gold,
                marginBottom: '20px', fontWeight: 400,
              }}>
                Est. 2009 · Accra, Ghana
              </p>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                color: dark, lineHeight: 1.15, letterSpacing: '-0.01em',
              }}>
                She is ordinary.<br />
                <span style={{ color: gold }}>She is everything.</span>
              </h2>
              <Link
                to="/brand"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  marginTop: '28px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: muted,
                  borderBottom: `1px solid ${faint}`, paddingBottom: '3px',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
                onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderBottomColor = faint }}>
                Our Story
              </Link>
            </div>
          </FadeUp>

          {/* Right */}
          <FadeUp delay={0.15}>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.8vw, 34px)',
              lineHeight: 1.6, color: dark,
              letterSpacing: '-0.01em',
            }}>
              "We design for the woman who does not need a stage
              to be seen. She is young at heart, classic in spirit,
              at home in Accra and confident in any room in the world."
            </p>
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginTop: '24px',
            }}>
              <div style={{ width: '24px', height: '1px', background: gold }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.16em',
                color: muted, fontWeight: 300,
              }}>
                Mr. Jonas Gogmi, Founder
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FEATURED DROPS — light, clean, elegant
// ─────────────────────────────────────────────
function FeaturedDropsStrip() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ background: cream2, padding: '80px 0', borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        <FadeUp style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: gold,
                marginBottom: '10px', fontWeight: 400,
              }}>
                Just Dropped
              </p>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: dark, lineHeight: 1,
              }}>
                Fresh from the Studio
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: muted,
                borderBottom: `1px solid ${faint}`, paddingBottom: '2px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderBottomColor = faint }}>
              View All
            </Link>
          </div>
        </FadeUp>

        <div
          className="fe-scrollbar"
          style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {featuredDrops.map((drop, i) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(drop.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0, width: '220px', cursor: 'pointer',
              }}>
              <div style={{
                position: 'relative', width: '220px', height: '280px',
                overflow: 'hidden', background: '#EDE8DF',
              }}>
                <img
                  src={drop.image} alt={drop.label}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === drop.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                {/* Soft overlay on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(26,18,9,0.35)',
                  opacity: hovered === drop.id ? 1 : 0,
                  transition: 'opacity 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <button
                    onClick={() => addItem({ ...drop, badge: drop.tag })}
                    style={{
                      background: gold, color: dark,
                      border: 'none', padding: '11px 24px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '10px', fontWeight: 600,
                      letterSpacing: '0.16em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}>
                    Add to Bag
                  </button>
                </div>
                {drop.tag && (
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: drop.tag === 'Sale' ? '#B5362A' : dark,
                    color: cream, padding: '4px 10px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                  }}>
                    {drop.tag}
                  </span>
                )}
              </div>
              <div style={{ padding: '14px 0' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', color: dark,
                  fontWeight: 400, letterSpacing: '0.04em',
                  marginBottom: '4px',
                }}>
                  {drop.label}
                </p>
                <p style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontSize: '17px', color: gold,
                }}>
                  ${drop.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CATEGORIES — clean pill links
// ─────────────────────────────────────────────
const cats = ['All', 'Tops', 'Bottoms', 'Jackets', 'Coats', 'Dresses']

function CategoriesSection({ active, setActive }) {
  return (
    <section style={{
      background: cream, padding: '72px 0 52px',
      borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: gold,
                marginBottom: '8px', fontWeight: 400,
              }}>
                Shop by Category
              </p>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                color: dark, lineHeight: 1,
              }}>
                Every style, for every woman.
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: muted,
                borderBottom: `1px solid ${faint}`, paddingBottom: '3px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderBottomColor = faint }}>
              View All
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {cats.map(cat => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: '10px 22px',
                    background: isActive ? dark : 'transparent',
                    border: `1px solid ${isActive ? dark : faint}`,
                    color: isActive ? cream : muted,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px', letterSpacing: '0.1em',
                    fontWeight: isActive ? 500 : 300,
                    cursor: 'pointer', transition: 'all 0.22s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = dark
                      e.currentTarget.style.color = dark
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = faint
                      e.currentTarget.style.color = muted
                    }
                  }}>
                  {cat}
                </button>
              )
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PRODUCT CARD — light, clean, feminine
// ─────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          position: 'relative', aspectRatio: '3/4',
          overflow: 'hidden', background: '#EDE8DF',
          marginBottom: '14px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontSize: '11px', color: faint,
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
              transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(26,18,9,0.4)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{
                background: gold, color: dark,
                border: 'none', padding: '12px 28px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
              Add to Bag
            </button>
          </div>
          {product.badge && (
            <span style={{
              position: 'absolute', top: '0', left: '0',
              background: product.badge === 'Sale' ? '#B5362A' : dark,
              color: cream, padding: '5px 12px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              {product.badge}
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation() }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '30px', height: '30px',
              background: 'rgba(250,247,242,0.9)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '14px', color: gold,
              opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
            }}>
            ♡
          </button>
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '10px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: muted,
          marginBottom: '4px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '14px', color: dark,
            letterSpacing: '0.04em', fontWeight: 400,
          }}>
            {product.name}
          </h3>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '17px', color: gold,
          }}>
            ${product.price}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT GRID
// ─────────────────────────────────────────────
function ProductGridSection({ activeCategory }) {
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section style={{ background: cream, padding: '72px 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: gold,
                marginBottom: '8px', fontWeight: 400,
              }}>
                New Arrivals
              </p>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                color: dark, lineHeight: 1,
              }}>
                {filtered.length} pieces, made for you.
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: muted,
                borderBottom: `1px solid ${faint}`, paddingBottom: '3px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderBottomColor = faint }}>
              Shop All
            </Link>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EDITORIAL SPLIT — warm, intimate
// ─────────────────────────────────────────────
function EditorialSplit() {
  return (
    <section style={{ background: cream2, borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          <FadeUp>
            <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
              <img
                src="/mendress.jpg" alt="New Release"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,9,0.82) 0%, rgba(26,18,9,0.1) 55%)',
              }} />
              {/* Gold left accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: '3px', background: gold,
              }} />
              <div style={{ position: 'absolute', bottom: '36px', left: '36px', right: '36px' }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: gold,
                  marginBottom: '10px', display: 'block', fontWeight: 400,
                }}>
                  New Release
                </span>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300, fontStyle: 'italic',
                  fontSize: '32px', color: '#FAF7F2',
                  lineHeight: 1.15, marginBottom: '16px',
                }}>
                  Void Series<br />Drop 01
                </h3>
                <Link
                  to="/shop"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(250,247,242,0.7)',
                    borderBottom: '1px solid rgba(250,247,242,0.3)', paddingBottom: '3px',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = gold }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,247,242,0.7)'; e.currentTarget.style.borderBottomColor = 'rgba(250,247,242,0.3)' }}>
                  Discover the collection
                </Link>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
              <img
                src="/womendress.jpg" alt="Coming Soon"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,9,0.88) 0%, rgba(26,18,9,0.15) 55%)',
              }} />
              <div style={{ position: 'absolute', bottom: '36px', left: '36px', right: '36px' }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: gold,
                  marginBottom: '10px', display: 'block', fontWeight: 400,
                }}>
                  Coming Soon
                </span>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300, fontStyle: 'italic',
                  fontSize: '32px', color: '#FAF7F2',
                  lineHeight: 1.15, marginBottom: '24px',
                }}>
                  Next drop<br />is coming.
                </h3>
                <div style={{ display: 'flex', gap: '28px' }}>
                  {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map((t, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: "'Fraunces', serif",
                        fontStyle: 'italic',
                        fontSize: '36px', color: gold, lineHeight: 1,
                      }}>
                        {t.v}
                      </div>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '9px', letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(250,247,242,0.45)', marginTop: '4px',
                      }}>
                        {t.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// STAT STRIP — kept but redesigned warm
// ─────────────────────────────────────────────
function StatStrip() {
  return (
    <section style={{
      background: dark,
      padding: '56px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', alignItems: 'center', gap: '48px' }}>
          <FadeUp style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '64px', color: gold,
              lineHeight: 1, marginBottom: '8px',
            }}>
              2,400+
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(250,247,242,0.5)',
              fontWeight: 300,
            }}>
              Pieces Available
            </div>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontSize: '12px',
              color: 'rgba(250,247,242,0.3)', marginTop: '4px',
            }}>
              Across all categories
            </p>
          </FadeUp>

          <div style={{ width: '1px', height: '80px', background: 'rgba(201,164,74,0.2)' }} />

          <FadeUp delay={0.1} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '64px', color: gold,
              lineHeight: 1, marginBottom: '8px',
            }}>
              98%
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(250,247,242,0.5)',
              fontWeight: 300,
            }}>
              Satisfaction Rate
            </div>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontSize: '12px',
              color: 'rgba(250,247,242,0.3)', marginTop: '4px',
            }}>
              From verified buyers
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  return (
    <main style={{ background: cream, minHeight: '100vh' }}>
      <PromoPopup />
      <HeroSection />
      <BrandStrip />
      <Manifesto />
      <FeaturedDropsStrip />
      <CategoriesSection active={activeCategory} setActive={setActiveCategory} />
      <ProductGridSection activeCategory={activeCategory} />
      <EditorialSplit />
      <StatStrip />
    </main>
  )
}
