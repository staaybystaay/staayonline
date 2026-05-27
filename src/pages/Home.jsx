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

const heroSlides = [
  {
    id: 1,
    image: '/Ari.jpeg',
    tag: 'Know Our Brand',
    headline: 'Where Beauty\nBegins.',
    sub: 'Soft, feminine, and graceful — but never without strength.',
    cta: 'Explore Our Journey',
    href: '/brand',
    pos: 'center 20%',
  },
  {
    id: 2,
    image: 'Ayla.jpeg',
    tag: 'New Season — SS 2026',
    headline: 'Effortless Style\nFor Every Woman',
    sub: 'Pieces that move with you — from morning to night.',
    cta: 'Explore Our Collections',
    href: '/shop',
    pos: 'center 25%',
  },
  {
    id: 3,
    image: 'Eve.png',
    tag: 'The STAAY Edit',
    headline: 'Made in Accra.\nWorn Everywhere.',
    sub: 'Local craftsmanship meeting international standards.',
    cta: 'View the Edit',
    href: '/featured',
    pos: 'center 25%',
  },
]

const drops = [
  { id: 'f1', name: 'Air STAAY 01',   price: 320, image: '/Kaia.png',      tag: 'New'  },
  { id: 'f2', name: 'Void Hoodie',    price: 195, image: '/Dahlia.jpeg',   tag: null   },
  { id: 'f3', name: 'Cargo Pant 02',  price: 240, image: '/Elara.jpeg',    tag: 'New'  },
  { id: 'f4', name: 'Phantom Jacket', price: 420, image: '/phantom.jpg',   tag: null   },
  { id: 'f5', name: 'STAAY Crocs',    price: 280, image: '/Vera.jpeg',     tag: 'Sale' },
]

const brandCollections = [
  {
    id: 'eden',
    image: '/Solenne.jpeg',
    label: 'SS 2026',
    name: 'Eden Collection',
    sub: '10 pieces',
    href: '/shop',
  },
  {
    id: 'love',
    image: '/Ayla.jpeg',
    label: 'SS 2026',
    name: 'The Love Edit',
    sub: 'New season',
    href: '/shop',
  },
  {
    id: 'bold',
    image: '/Mira.jpeg',
    label: 'SS 2026',
    name: 'Bold & Beautiful',
    sub: 'New season',
    href: '/shop',
  },
]

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
          position: 'relative', maxWidth: '300px', width: '70%',
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

function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const s = heroSlides[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % heroSlides.length), 5500)
    return () => clearInterval(t)
  }, [idx, paused])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      setIdx(i => (i + 1) % heroSlides.length)
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right - previous slide
      setIdx(i => (i - 1 + heroSlides.length) % heroSlides.length)
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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

// ─── OUR BRAND COLLECTIONS ───────────────────
function BrandCollections() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: OW, padding: '72px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '1px', background: G }} />
            <span style={{
              ...F, fontSize: '11px', fontWeight: 600, color: G,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Our Collections
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{
              ...F, fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 700, color: DK, letterSpacing: '-0.02em',
            }}>
               Our Brand Collections
            </h2>
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
              Shop All →
            </Link>
          </div>
        </div>

        {/* Responsive grid: 3 columns on desktop, 2 columns on mobile */}
        <div className="brand-collections-grid">
          {brandCollections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(col.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: 'relative' }}>

              <Link
                to={col.href}
                className="brand-collection-link"
                style={{
                  display: 'block', textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                  height: '540px',
                  background: B2,
                  boxShadow: hovered === col.id ? `0 0 0 2px ${G}` : '0 0 0 0px transparent',
                  transition: 'box-shadow 0.3s',
                }}>

                <img
                  src={col.image}
                  alt={col.name}
                  onError={e => { e.target.style.display = 'none' }}
                  className="brand-collection-image"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === col.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.08) 50%, transparent 100%)',
                }} />

                {/* Label pill top-left */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: col.label === 'SS 2025' ? G : 'rgba(17,17,17,0.55)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 12px',
                  ...F, fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: W,
                }}>
                  {col.label}
                </div>

                {/* Bottom text */}
                <div className="brand-collection-bottom" style={{
                  position: 'absolute', bottom: '0', left: '0', right: '0',
                  padding: '24px',
                  borderTop: `2px solid ${hovered === col.id ? G : 'transparent'}`,
                  transition: 'border-top-color 0.3s',
                }}>
                  <p style={{
                    ...F, fontSize: '11px', fontWeight: 400,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.04em', marginBottom: '4px',
                  }}>
                    {col.sub}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="brand-collection-name" style={{
                      ...F, fontSize: '18px', fontWeight: 700,
                      color: W, letterSpacing: '-0.01em',
                    }}>
                      {col.name}
                    </p>
                    <span className="brand-collection-arrow" style={{
                      width: '32px', height: '32px',
                      border: `1px solid rgba(255,255,255,0.4)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: W, fontSize: '16px',
                      opacity: hovered === col.id ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}>
                      →
                    </span>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .brand-collections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .brand-collections-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          
          .brand-collection-link {
            height: auto !important;
            aspect-ratio: 3/4;
          }
          
          .brand-collection-bottom {
            padding: 16px !important;
          }
          
          .brand-collection-name {
            font-size: 14px !important;
          }
          
          .brand-collection-arrow {
            width: 28px !important;
            height: 28px !important;
            font-size: 14px !important;
            opacity: 1 !important;
          }
          
          section {
            padding: 48px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}

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
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {product.badge && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: product.badge === 'Sale' ? RD : BK, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {product.badge}
            </span>
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: BK, transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s' }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
        <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: FT, marginBottom: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{product.category}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ ...F, fontSize: '14px', fontWeight: 500, color: DK }}>{product.name}</p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: G }}>${product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function JustDropped() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)
  return (
    <section style={{ background: W, padding: '64px', borderTop: `1px solid ${BR}` }}>
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
        <div className="just-dropped-scroll">
          {drops.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="just-dropped-item">
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

      <style>{`
        .just-dropped-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }
        
        .just-dropped-item {
          flex-shrink: 0;
          width: 210px;
        }
        
        @media (max-width: 768px) {
          .just-dropped-scroll {
            width: 100vw;
            margin-left: -20px;
            padding-left: 20px;
            padding-right: 20px;
            gap: 12px;
            scroll-snap-type: x mandatory;
          }
          
          .just-dropped-item {
            width: 280px;
            scroll-snap-align: start;
          }
          
          .just-dropped-item > div:first-child {
            height: 340px !important;
          }
          
          section {
            padding: 48px 0 48px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

export default function Home() {
  return (
    <main style={{ background: W }}>
      <PromoPopup />
      <Hero />
      <BrandCollections />
      <JustDropped />
    </main>
  )
}
