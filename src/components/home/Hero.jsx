import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

const slides = [
  {
    id: 1,
    image: '/Ari.jpeg',
    collection: 'Eden Collection',
    season: 'SS 2026',
    headline: 'Where\nBeauty\nBegins.',
    sub: 'Soft, feminine, and graceful — pieces that carry a quiet kind of strength.',
    cta: 'Shop Eden',
    href: '/shop',
    accent: '#F5ECD8',
  },
  {
    id: 2,
    image: '/Ayla.jpeg',
    collection: 'Eden Collection',
    season: 'SS 2026',
    headline: 'Effortless\nStyle For\nEvery Woman',
    sub: 'Pieces designed to move with you — from morning to night.',
    cta: 'Shop Now',
    href: '/shop',
    accent: '#EDE8DF',
  },
  {
    id: 3,
    image: '/Eve.png',
    collection: 'The STAAY Edit',
    season: 'SS 2026',
    headline: 'Made in\nAccra.\nWorn Everywhere.',
    sub: 'Local craftsmanship meeting international standards.',
    cta: 'View the Edit',
    href: '/featured',
    accent: '#EBE3D8',
  },
]

export default function Hero() {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const s = slides[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [idx, paused])

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', overflow: 'hidden', background: OW }}>

      {/* Animated background tint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={'bg-' + s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'absolute', inset: 0, background: s.accent }}
        />
      </AnimatePresence>

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '88vh',
      }}>

        {/* ── LEFT — Text ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 64px 80px 64px',
          gap: '0',
        }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={'content-' + s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}>

              {/* Season + Collection label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '32px',
              }}>
                <div style={{ width: '24px', height: '1px', background: G }} />
                <span style={{
                  ...F, fontSize: '11px', fontWeight: 600,
                  color: G, letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  {s.collection} — {s.season}
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                ...F, fontWeight: 800,
                fontSize: 'clamp(44px, 5vw, 76px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: DK,
                margin: '0 0 28px',
                whiteSpace: 'pre-line',
              }}>
                {s.headline}
              </h1>

              {/* Divider */}
              <div style={{ width: '40px', height: '2px', background: G, marginBottom: '24px' }} />

              {/* Sub */}
              <p style={{
                ...F, fontWeight: 400,
                fontSize: '15px', lineHeight: 1.7,
                color: MD, marginBottom: '40px',
                maxWidth: '340px',
              }}>
                {s.sub}
              </p>

              {/* CTA */}
              <Link
                to={s.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: BK, color: W,
                  padding: '16px 40px',
                  ...F, fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  transition: 'background 0.25s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = BK }}>
                {s.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

            </motion.div>
          </AnimatePresence>

          {/* Slide controls — bottom of left panel */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '20px', marginTop: '64px',
          }}>
            {/* Counter */}
            <span style={{
              ...F, fontSize: '12px', fontWeight: 600,
              color: G, letterSpacing: '0.06em',
            }}>
              {String(idx + 1).padStart(2, '0')}
              <span style={{ color: BR, margin: '0 4px' }}>/</span>
              {String(slides.length).padStart(2, '0')}
            </span>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {slides.map((sl, i) => (
                <button
                  key={sl.id}
                  onClick={() => setIdx(i)}
                  style={{
                    height: '3px', padding: 0, border: 'none',
                    cursor: 'pointer', borderRadius: '2px',
                    transition: 'all 0.35s',
                    width: i === idx ? '28px' : '8px',
                    background: i === idx ? G : BR,
                  }} />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
              {[-1, 1].map(d => (
                <button
                  key={d}
                  onClick={() => setIdx(i => (i + d + slides.length) % slides.length)}
                  style={{
                    width: '40px', height: '40px',
                    background: 'transparent',
                    border: `1px solid ${BR}`,
                    color: DK, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.color = W; e.currentTarget.style.borderColor = BK }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DK; e.currentTarget.style.borderColor = BR }}>
                  {d === -1 ? '←' : '→'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — Image ── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}>

          {/* Collection name watermark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            ...F, fontSize: '80px', fontWeight: 900,
            color: 'rgba(17,17,17,0.04)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}>
            STAAY
          </div>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={'img-' + s.id}
              src={s.image}
              alt={s.collection}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'relative', zIndex: 1,
                width: '100%',
                height: '100%',
                minHeight: '88vh',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </AnimatePresence>

          {/* Bottom label on image */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '28px',
            zIndex: 2,
            background: 'rgba(17,17,17,0.55)',
            backdropFilter: 'blur(8px)',
            padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: G }} />
            <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: W, letterSpacing: '0.06em' }}>
              {s.collection}
            </span>
          </div>

          {/* Progress bar */}
          {!paused && (
            <motion.div
              key={'progress-' + s.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: 'linear' }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '3px', background: G,
                transformOrigin: 'left', zIndex: 3,
              }}
            />
          )}

        </div>
      </div>
    </section>
  )
}
