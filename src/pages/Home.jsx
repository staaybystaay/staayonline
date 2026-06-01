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
    tag: 'Eden Collection — SS 2026',
    headline: 'Where Beauty\nBegins.',
    sub: 'Soft, feminine, and graceful — but never without strength.',
    cta: 'Shop Eden Collection',
    href: '/shop',
    bg: '#F5ECD8',
  },
  {
    id: 2,
    image: '/Ayla.jpeg',
    tag: 'New Season — SS 2026',
    headline: 'Effortless Style\nFor Every Woman',
    sub: 'Pieces that move with you — from morning to night.',
    cta: 'Explore Collections',
    href: '/shop',
    bg: '#EDE8DF',
  },
  {
    id: 3,
    image: '/Eve.png',
    tag: 'The STAAY Edit',
    headline: 'Made in Accra.\nWorn Everywhere.',
    sub: 'Local craftsmanship meeting international standards.',
    cta: 'View the Edit',
    href: '/featured',
    bg: '#E8E0D4',
  },
]

const drops = [
  { id: 'f1', name: 'Air STAAY 01',   price: 320, image: '/Kaia.png',    tag: 'New'  },
  { id: 'f2', name: 'Void Hoodie',    price: 195, image: '/hoodie.jpg',  tag: null   },
  { id: 'f3', name: 'Cargo Pant 02',  price: 240, image: '/Elara.jpeg',  tag: 'New'  },
  { id: 'f4', name: 'Phantom Jacket', price: 420, image: '/phantom.jpg', tag: null   },
  { id: 'f5', name: 'STAAY Crocs',    price: 280, image: '/Vera.jpeg',   tag: 'Sale' },
]

const brandCollections = [
  { id: 'eden', image: '/Solenne.jpeg', label: 'SS 2026', name: 'Eden Collection',  sub: '10 pieces',  href: '/shop' },
  { id: 'love', image: '/Ayla.jpeg',   label: 'SS 2026', name: 'The Love Edit',    sub: 'New season', href: '/shop' },
  { id: 'bold', image: '/Mira.jpeg',   label: 'SS 2026', name: 'Bold & Beautiful', sub: 'New season', href: '/shop' },
]

// ─── PROMO POPUP ─────────────────────────────
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

// ─── HERO — split layout ──────────────────────
function Hero() {
  const [idx, setIdx]     = useState(0)
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
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '580px',
        height: '88vh',
      }}>

      {/* Animated background colour */}
      <AnimatePresence mode="wait">
        <motion.div
          key={'bg-' + s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute', inset: 0,
            background: s.bg,
          }}
        />
      </AnimatePresence>

      {/* Gold bottom stripe */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '4px', background: G, zIndex: 4,
      }} />

      {/* Content grid */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 64px',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '40px',
      }}>

        {/* ── LEFT — text ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={'text-' + s.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '40px' }}>

            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: W, border: `1px solid ${BR}`,
              padding: '5px 14px', marginBottom: '24px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: G }} />
              <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {s.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              ...F, fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 68px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: DK,
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
            }}>
              {s.headline}
            </h1>

            {/* Sub */}
            <p style={{
              ...F, fontWeight: 300,
              fontSize: '16px', lineHeight: 1.65,
              color: MD, marginBottom: '36px',
              maxWidth: '380px',
            }}>
              {s.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link
                to={s.href}
                style={{
                  background: G, color: W,
                  padding: '15px 36px',
                  ...F, fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.04em',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.25s, transform 0.2s',
                  boxShadow: '0 4px 16px rgba(184,144,58,0.35)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#9A7830'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = 'translateY(0)' }}>
                {s.cta} →
              </Link>
              <Link
                to="/shop"
                style={{
                  ...F, fontSize: '13px', fontWeight: 500,
                  color: DK,
                  borderBottom: `2px solid ${DK}`,
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
                onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
                View All
              </Link>
            </div>

            {/* Slide dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '48px' }}>
              {heroSlides.map((sl, i) => (
                <button
                  key={sl.id}
                  onClick={() => setIdx(i)}
                  style={{
                    height: '4px', padding: 0, border: 'none',
                    cursor: 'pointer', borderRadius: '2px',
                    transition: 'all 0.35s',
                    width: i === idx ? '32px' : '10px',
                    background: i === idx ? G : BR,
                  }} />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ── RIGHT — model image ── */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Large faint collection name behind image */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '-10px',
            ...F, fontSize: 'clamp(60px, 8vw, 110px)',
            fontWeight: 900,
            color: 'rgba(17,17,17,0.05)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}>
            STAAY
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={'img-' + s.id}
              src={s.image}
              alt={s.tag}
              initial={{ opacity: 0, scale: 1.04, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.65 }}
              style={{
                position: 'relative', zIndex: 1,
                height: '90%',
                maxHeight: '520px',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <div style={{
            position: 'absolute', bottom: '20px', right: '0',
            zIndex: 3, display: 'flex', gap: '8px',
          }}>
            {[-1, 1].map(d => (
              <button
                key={d}
                onClick={() => setIdx(i => (i + d + heroSlides.length) % heroSlides.length)}
                style={{
                  width: '40px', height: '40px',
                  background: W,
                  border: `1px solid ${BR}`,
                  color: DK, cursor: 'pointer', fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.22s',
                  boxShadow: '0 2px 8px rgba(17,17,17,0.08)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.borderColor = G; e.currentTarget.style.color = W }}
                onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = DK }}>
                {d === -1 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── BRAND COLLECTIONS ───────────────────────
function BrandCollections() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: OW, padding: '72px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '1px', background: G }} />
            <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Collections
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{ ...F, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              Our Brand Collections
            </h2>
            <Link
              to="/shop"
              style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
              onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
              Shop All →
            </Link>
          </div>
        </div>

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
                style={{
                  display: 'block', textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                  height: '540px', background: B2,
                  boxShadow: hovered === col.id ? `0 0 0 2px ${G}` : '0 0 0 0px transparent',
                  transition: 'box-shadow 0.3s',
                }}>
                <img
                  src={col.image} alt={col.name}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === col.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.08) 50%, transparent 100%)' }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: G, padding: '4px 12px',
                  ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: W,
                }}>
                  {col.label}
                </div>
                <div style={{
                  position: 'absolute', bottom: '0', left: '0', right: '0',
                  padding: '24px',
                  borderTop: `2px solid ${hovered === col.id ? G : 'transparent'}`,
                  transition: 'border-top-color 0.3s',
                }}>
                  <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    {col.sub}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: W, letterSpacing: '-0.01em' }}>
                      {col.name}
                    </p>
                    <span style={{ width: '32px', height: '32px', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: W, fontSize: '16px', opacity: hovered === col.id ? 1 : 0, transition: 'opacity 0.3s' }}>
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
          .brand-collections-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>
    </section>
  )
}

// ─── JUST DROPPED ────────────────────────────
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
