import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const B2  = '#F2EFE9'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const RD  = '#B91C1C'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── EDEN COLLECTION DATA ─────────────────────
const edenPieces = [
  { id: 'e1',  name: 'ARI',     price: 1650,  image: '/ARI.jpg'     },
  { id: 'e2',  name: 'MIRA',    price: 1950,  image: '/MIRA.jpg'    },
  { id: 'e3',  name: 'VERA',    price: 1700,  image: '/VERA.jpg'    },
  { id: 'e4',  name: 'SOLENNE', price: 2600,  image: '/SOLENNE.jpg' },
  { id: 'e5',  name: 'AYLA',    price: 1900,  image: '/Ayla.jpg'    },
  { id: 'e6',  name: 'AURA',    price: 2900,  image: '/Aura.jpg'    },
  { id: 'e7',  name: 'KAIA',    price: 2900,  image: '/Kaia.jpg'    },
  { id: 'e8',  name: 'EVE',     price: 2400,  image: '/Eve.jpg'     },
  { id: 'e9',  name: 'ELARA',   price: 2400,  image: '/Elara.jpg'   },
  { id: 'e10', name: 'DAHLIA',  price: 2200,  image: '/Dahlia.jpg'  },
]

// ─── HERO SLIDES ──────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: '/ARI.jpg',
    tag: 'Eden Collection — SS 2025',
    headline: 'Where Beauty\nBegins.',
    sub: 'Soft, feminine, and graceful — but never without strength.',
    cta: 'Explore Eden',
    href: '/shop',
    pos: 'center 20%',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=90&fit=crop',
    tag: 'New Season — SS 2025',
    headline: 'Effortless Style\nFor Every Woman',
    sub: 'Pieces that move with you — from morning to night.',
    cta: 'Shop Now',
    href: '/shop',
    pos: 'center 25%',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&q=90&fit=crop',
    tag: 'The Staay Edit',
    headline: 'Made in Accra.\nWorn Everywhere.',
    sub: 'Local craftsmanship meeting international standards.',
    cta: 'View the Edit',
    href: '/featured',
    pos: 'center 25%',
  },
]

const drops = [
  { id: 'f1', name: 'Air Staay 01',   price: 320, image: '/airsneaker.jpg', tag: 'New'  },
  { id: 'f2', name: 'Void Hoodie',    price: 195, image: '/hoodie.jpg',     tag: null   },
  { id: 'f3', name: 'Cargo Pant 02',  price: 240, image: '/cargopant.jpg',  tag: 'New'  },
  { id: 'f4', name: 'Phantom Jacket', price: 420, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80', tag: null },
  { id: 'f5', name: 'Staay Crocs',    price: 280, image: '/crocs.png',      tag: 'Sale' },
]

const CATS = ['All', 'Tops', 'Bottoms', 'Jackets', 'Coats']

// ─── PROMO POPUP ──────────────────────────────
function PromoPopup() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(17,17,17,0.6)', backdropFilter: 'blur(6px)', padding: '20px',
      }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: '400px', width: '100%',
          background: W, overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(17,17,17,0.25)',
        }}>
        <div style={{ height: '3px', background: G }} />
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(17,17,17,0.08)', border: 'none',
            cursor: 'pointer', fontSize: '13px', color: DK,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.color = W }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17,17,17,0.08)'; e.currentTarget.style.color = DK }}>
          ✕
        </button>
        <img src="/heroflyer.jpg" alt="Promo" style={{ width: '100%', display: 'block' }} />
        <div style={{ display: 'flex', gap: '10px', padding: '14px 16px', borderTop: `1px solid ${BR}` }}>
          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            style={{
              flex: 1, textAlign: 'center', background: G, color: W,
              padding: '11px', ...F, fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            Shop Now
          </Link>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'transparent', border: `1px solid ${BR}`, color: FT,
              padding: '11px 16px', cursor: 'pointer', ...F, fontSize: '12px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = FT }}>
            Skip
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const s = heroSlides[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % heroSlides.length), 5500)
    return () => clearInterval(t)
  }, [idx, paused])

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', height: '92vh', minHeight: '580px', overflow: 'hidden', background: BK }}>
      <AnimatePresence mode="crossfade">
        <motion.div
          key={s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover', backgroundPosition: s.pos,
          }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.80) 0%, rgba(17,17,17,0.45) 55%, rgba(17,17,17,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 45%)' }} />
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        maxWidth: '1280px', width: '100%', margin: '0 auto',
        padding: '0 64px', display: 'flex', alignItems: 'center',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id + 't'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: '560px' }}>
            <div style={{
              display: 'inline-block',
              background: GL, color: G,
              padding: '5px 14px', ...F,
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              {s.tag}
            </div>
            <h1 style={{
              ...F, fontWeight: 700,
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              lineHeight: 1.1, letterSpacing: '-0.025em',
              color: W, margin: '0 0 18px', whiteSpace: 'pre-line',
            }}>
              {s.headline}
            </h1>
            <p style={{
              ...F, fontWeight: 300, fontSize: '15px',
              lineHeight: 1.65, color: 'rgba(255,255,255,0.68)',
              marginBottom: '32px', maxWidth: '420px',
            }}>
              {s.sub}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to={s.href}
                style={{
                  background: G, color: W, padding: '14px 32px',
                  ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.03em',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#9A7830' }}
                onMouseLeave={e => { e.currentTarget.style.background = G }}>
                {s.cta} →
              </Link>
              <Link
                to="/shop"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.45)',
                  color: 'rgba(255,255,255,0.88)', padding: '14px 28px',
                  ...F, fontSize: '13px', fontWeight: 400, transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = W; e.currentTarget.style.color = W }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)' }}>
                Browse All
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        position: 'absolute', bottom: '36px', left: '64px',
        zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        {heroSlides.map((sl, i) => (
          <button
            key={sl.id}
            onClick={() => setIdx(i)}
            style={{
              height: '3px', padding: 0, border: 'none', cursor: 'pointer',
              borderRadius: '2px', transition: 'all 0.35s',
              width: i === idx ? '32px' : '12px',
              background: i === idx ? G : 'rgba(255,255,255,0.35)',
            }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: '24px', right: '64px',
        zIndex: 3, display: 'flex', gap: '8px',
      }}>
        {[-1, 1].map(d => (
          <button
            key={d}
            onClick={() => setIdx(i => (i + d + heroSlides.length) % heroSlides.length)}
            style={{
              width: '40px', height: '40px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: W, cursor: 'pointer', fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.borderColor = G }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}>
            {d === -1 ? '←' : '→'}
          </button>
        ))}
      </div>
    </section>
  )
}

// ─── TRUST BAR ────────────────────────────────
function TrustBar() {
  const items = [
    { icon: '🚚', title: 'Free Shipping',    sub: 'On orders over GH₵500' },
    { icon: '🔒', title: 'Secure Payment',   sub: 'Multiple options'       },
    { icon: '⭐', title: '98% Satisfaction', sub: 'Verified buyers'        },
    { icon: '↩️', title: 'Free Returns',     sub: 'Within 30 days'         },
  ]
  return (
    <section style={{ background: W, borderTop: `1px solid ${BR}`, borderBottom: `1px solid ${BR}` }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 64px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '20px 24px',
              borderRight: i < 3 ? `1px solid ${BR}` : 'none',
            }}>
            <div style={{
              width: '36px', height: '36px', flexShrink: 0,
              background: GL, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>
              {item.icon}
            </div>
            <div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '1px' }}>{item.title}</p>
              <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── EDEN COLLECTION ──────────────────────────
function EdenCollection() {
  const [hovered, setHovered] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const addItem = useCartStore(s => s.addItem)

  // Show 5 at a time, paginate
  const perPage = 5
  const totalPages = Math.ceil(edenPieces.length / perPage)
  const visible = edenPieces.slice(activeIdx * perPage, activeIdx * perPage + perPage)

  return (
    <section style={{ background: W, borderBottom: `1px solid ${BR}` }}>

      {/* ── EDEN HERO BANNER ── */}
      <div style={{
        position: 'relative',
        height: '480px',
        overflow: 'hidden',
        background: '#1A1209',
      }}>
        <img
          src="/SOLENNE.jpg"
          alt="Eden Collection"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'center 30%',
            opacity: 0.55,
          }}
        />
        {/* Warm gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,18,9,0.92) 0%, rgba(26,18,9,0.5) 50%, rgba(26,18,9,0.3) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0,
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 64px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '560px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '20px',
            }}>
              <div style={{ width: '28px', height: '1px', background: G }} />
              <span style={{
                ...F, fontSize: '11px', fontWeight: 600,
                color: G, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Latest Collection
              </span>
            </div>
            <h2 style={{
              ...F, fontWeight: 800,
              fontSize: 'clamp(44px, 6vw, 80px)',
              color: W, lineHeight: 1.0,
              letterSpacing: '-0.03em', margin: '0 0 20px',
            }}>
              Eden
            </h2>
            <p style={{
              ...F, fontWeight: 300, fontSize: '15px',
              lineHeight: 1.75, color: 'rgba(255,255,255,0.65)',
              marginBottom: '32px', maxWidth: '420px',
            }}>
              Eden is where it all begins. Soft, feminine, and graceful —
              but never without strength. Each piece carries a quiet kind of beauty,
              one that feels natural, full of life, and deeply intentional.
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: G, color: W, padding: '14px 32px',
                ...F, fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.04em', transition: 'background 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#9A7830' }}
              onMouseLeave={e => { e.currentTarget.style.background = G }}>
              Shop Eden →
            </Link>
          </motion.div>

          {/* Right — piece count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ textAlign: 'right' }}>
            <p style={{
              ...F, fontWeight: 800,
              fontSize: '80px', color: 'rgba(255,255,255,0.06)',
              lineHeight: 1, letterSpacing: '-0.04em',
            }}>
              {edenPieces.length}
            </p>
            <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Pieces
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── EDEN PRODUCT GRID ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 64px' }}>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '36px',
        }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Eden Collection
            </p>
            <h3 style={{ ...F, fontSize: '24px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              {edenPieces.length} Pieces — All priced in GH₵
            </h3>
          </div>
          <Link
            to="/shop"
            style={{
              ...F, fontSize: '13px', fontWeight: 500, color: DK,
              display: 'flex', alignItems: 'center', gap: '6px',
              borderBottom: `1px solid ${DK}`, paddingBottom: '1px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>

        {/* 5-column grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px 16px',
            }}>
            {visible.map((piece, i) => (
              <div
                key={piece.id}
                onMouseEnter={() => setHovered(piece.id)}
                onMouseLeave={() => setHovered(null)}>

                {/* Image */}
                <div style={{
                  position: 'relative', aspectRatio: '3/4',
                  background: B2, overflow: 'hidden', marginBottom: '12px',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ ...F, fontSize: '11px', color: FT }}>Eden</span>
                  </div>
                  <img
                    src={piece.image}
                    alt={piece.name}
                    onError={e => { e.target.style.display = 'none' }}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                      transform: hovered === piece.id ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  {/* Add to bag */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: BK,
                    transform: hovered === piece.id ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.3s',
                  }}>
                    <button
                      onClick={() => addItem({ ...piece, category: 'Eden', badge: 'New' })}
                      style={{
                        width: '100%', padding: '12px', background: 'transparent',
                        border: 'none', color: W, cursor: 'pointer',
                        ...F, fontSize: '11px', fontWeight: 600,
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>
                      Add to Bag
                    </button>
                  </div>
                  {/* New badge */}
                  <span style={{
                    position: 'absolute', top: 0, left: 0,
                    background: G, color: W, padding: '4px 10px',
                    ...F, fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    New
                  </span>
                </div>

                {/* Info */}
                <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  Eden
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>
                    {piece.name}
                  </p>
                  <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>
                    GH₵{piece.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', gap: '8px', marginTop: '40px',
          }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: i === activeIdx ? '28px' : '8px',
                  height: '3px', padding: 0, border: 'none',
                  borderRadius: '2px', cursor: 'pointer',
                  background: i === activeIdx ? G : BR,
                  transition: 'all 0.3s',
                }} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

// ─── PROMO CARDS ──────────────────────────────
function PromoCards() {
  return (
    <section style={{ background: W, padding: '48px 64px' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: GL, padding: '40px', minHeight: '200px',
            overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
          <div>
            <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
              For Women
            </p>
            <h3 style={{ ...F, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: DK, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Where dreams<br />meet couture
            </h3>
            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>
              SS 2025 — New drops every week
            </p>
          </div>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: DK, color: W, padding: '11px 22px', marginTop: '24px',
              ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
              width: 'fit-content', transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = DK }}>
            Shop Now →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            position: 'relative', minHeight: '200px',
            overflow: 'hidden', background: '#E8E0D8',
          }}>
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop"
            alt="Collection"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.1) 70%)' }} />
          <div style={{ position: 'relative', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
                The Edit
              </p>
              <h3 style={{ ...F, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: W, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                Enchanting styles<br />for every woman
              </h3>
            </div>
            <Link
              to="/featured"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: W, color: DK, padding: '11px 22px', marginTop: '24px',
                ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
                width: 'fit-content', transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = W }}
              onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.color = DK }}>
              Shop Now →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CATEGORIES ───────────────────────────────
function Categories({ active, setActive }) {
  const catImages = {
    All:     'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80&fit=crop',
    Tops:    '/hoodie.jpg',
    Bottoms: '/cargopant.jpg',
    Jackets: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&q=80&fit=crop',
    Coats:   'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=80&fit=crop',
  }
  return (
    <section style={{ background: OW, padding: '64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Browse by</p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>Categories</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '8px 18px',
                  background: active === cat ? BK : W,
                  border: `1px solid ${active === cat ? BK : BR}`,
                  color: active === cat ? W : DK,
                  ...F, fontSize: '12px', fontWeight: active === cat ? 600 : 400,
                  cursor: 'pointer', borderRadius: '100px', transition: 'all 0.2s',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {CATS.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                position: 'relative', aspectRatio: '3/4',
                overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0,
                outline: active === cat ? `2px solid ${G}` : 'none',
                outlineOffset: '2px',
              }}>
              <img src={catImages[cat]} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.65) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: W }}>{cat}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRODUCT CARD ─────────────────────────────
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...F, fontSize: '11px', color: FT }}>{product.category}</span>
          </div>
          <img
            src={product.image} alt={product.name}
            onError={e => { e.target.style.display = 'none' }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.65s', transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {product.badge && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              background: product.badge === 'Sale' ? RD : BK,
              color: W, padding: '4px 10px',
              ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {product.badge}
            </span>
          )}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, background: BK,
            transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s',
          }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{
                width: '100%', padding: '13px', background: 'transparent',
                border: 'none', color: W, cursor: 'pointer',
                ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
              Add to Bag
            </button>
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation() }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: W, border: 'none', cursor: 'pointer', fontSize: '15px', color: DK,
              opacity: hovered ? 1 : 0, transition: 'opacity 0.25s',
              boxShadow: '0 1px 4px rgba(17,17,17,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            ♡
          </button>
        </div>
        <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: FT, marginBottom: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {product.category}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ ...F, fontSize: '14px', fontWeight: 500, color: DK }}>{product.name}</p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: G }}>${product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── PRODUCTS SECTION ─────────────────────────
function ProductsSection({ activeCategory }) {
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)
  return (
    <section style={{ background: W, padding: '64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Our Products
            </p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              Popular Products
            </h2>
          </div>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 16px' }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── JUST DROPPED ─────────────────────────────
function JustDropped() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)
  return (
    <section style={{ background: OW, padding: '64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Just In</p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>New Arrivals</h2>
          </div>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>
        <div className="hide-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
          {drops.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ flexShrink: 0, width: '210px' }}>
              <div style={{ position: 'relative', height: '260px', background: B2, overflow: 'hidden', marginBottom: '12px' }}>
                <img
                  src={item.image} alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s', transform: hovered === item.id ? 'scale(1.05)' : 'scale(1)' }}
                />
                {item.tag && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.tag === 'Sale' ? RD : BK, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.tag}
                  </span>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: BK, transform: hovered === item.id ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s' }}>
                  <button
                    onClick={() => addItem({ ...item, badge: item.tag })}
                    style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Add to Bag
                  </button>
                </div>
              </div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, marginBottom: '3px' }}>{item.name}</p>
              <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: G }}>${item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EDITORIAL BANNER ─────────────────────────
function EditorialBanner() {
  return (
    <section style={{ borderTop: `1px solid ${BR}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
          <img src="/mendress.jpg" alt="Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.1) 55%)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
            <span style={{ display: 'inline-block', background: G, color: W, padding: '4px 12px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>New Release</span>
            <h3 style={{ ...F, fontWeight: 700, fontSize: '28px', color: W, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '14px' }}>Void Series<br />Drop 01</h3>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: W, color: DK, padding: '10px 22px', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', transition: 'background 0.2s, color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = W }} onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.color = DK }}>Shop Now →</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
          <img src="/womendress.jpg" alt="Coming Soon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.1) 55%)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: W, padding: '4px 12px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Coming Soon</span>
            <h3 style={{ ...F, fontWeight: 700, fontSize: '28px', color: W, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '20px' }}>Next Drop<br />Is Coming</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map((t, i) => (
                <div key={i}>
                  <p style={{ ...F, fontWeight: 700, fontSize: '32px', color: G, lineHeight: 1 }}>{t.v}</p>
                  <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────
function Stats() {
  const items = [
    { value: '2,400+', label: 'Pieces Available',  sub: 'Across all categories' },
    { value: '98%',    label: 'Satisfaction Rate',  sub: 'From verified buyers'  },
    { value: '50+',    label: 'Countries Reached',  sub: 'Worldwide delivery'    },
    { value: '16 yrs', label: 'Of Craft',           sub: 'Est. 2009, Accra'      },
  ]
  return (
    <section style={{ background: BK, padding: '56px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ textAlign: 'center', padding: '20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <p style={{ ...F, fontWeight: 800, fontSize: 'clamp(32px, 3.5vw, 48px)', color: G, lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.02em' }}>{item.value}</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: W, marginBottom: '3px' }}>{item.label}</p>
            <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  return (
    <main style={{ background: W }}>
      <PromoPopup />
      <Hero />
      <TrustBar />
      <EdenCollection />
      <PromoCards />
      <Categories active={activeCategory} setActive={setActiveCategory} />
      <ProductsSection activeCategory={activeCategory} />
      <JustDropped />
      <EditorialBanner />
      <Stats />
    </main>
  )
}
