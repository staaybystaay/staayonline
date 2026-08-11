import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'


const G  = '#E2BC6A'  // the one deliberate touch of butter yellow: the active carousel dot + progress bar
const BK = '#1A1612'
const W  = '#FFFFFF'
const F  = { fontFamily: "'Inter', sans-serif" }

const slides = [
  {
    id: 1,
    image: '/home-hero-new.jpg',
    headline: 'WHERE BEAUTY\nBEGINS TODAY',
    // sub: 'Soft, feminine, intentional.',
    cta: 'Explore Staay',
    href: '/shop?col=eden',
    align: 'left',
  },
  {
    id: 2,
    image: '/home-hero-new1.jpg',
    headline: 'DRESS THE WAY\nYOU FEEL TODAY',
    // sub: 'Styles that match every version of you.',
    cta: 'Shop All Collections',
    href: '/shop',
    align: 'left',
  },
  {
    id: 3,
    image: '/home-hero-new2.jpg',
    headline: 'MADE IN ACCRA.\nWORN EVERYWHERE.',
    // sub: 'Local craftsmanship. International standard.',
    cta: 'Explore the Brand',
    href: '/brand',
    align: 'left',
  },
]

function Arrows({ onPrev, onNext, size = 44 }) {
  return [
    { pos: 'left: 20px', fn: onPrev, label: '‹' },
    { pos: 'right: 20px', fn: onNext, label: '›' },
  ].map(({ pos, fn, label }) => (
    <button
      key={pos}
      onClick={fn}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        ...Object.fromEntries(pos.split(': ').map((v, i, a) => i % 2 === 0 ? [v, a[i + 1]] : []).filter(Boolean)),
        zIndex: 3,
        width: `${size}px`, height: `${size}px`,
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.3)',
        color: W, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size >= 44 ? '26px' : '20px', lineHeight: 1,
        transition: 'background 0.2s',
        borderRadius: '50%',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.borderColor = BK }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}>
      {label}
    </button>
  ))
}

function Dots({ slides, activeIdx, onSelect, style }) {
  return (
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '6px', ...style }}>
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width: i === activeIdx ? '28px' : '8px', height: '8px',
            borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer',
            background: i === activeIdx ? G : 'rgba(255,255,255,0.5)',
            transition: 'all 0.3s',
          }} />
      ))}
    </div>
  )
}

export default function Hero() {
  const [idx,    setIdx]    = useState(0)
  const [paused, setPaused] = useState(false)
  const s = slides[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [idx, paused])

  function prev() { setIdx(i => (i - 1 + slides.length) % slides.length) }
  function next() { setIdx(i => (i + 1) % slides.length) }

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', width: '100%', background: '#1A1612' }}>

      {/* ══ DESKTOP — full-bleed image with huge text overlaid ══ */}
      <div className="desktop-only" style={{ position: 'relative', width: '100%', height: '88vh', minHeight: '520px', overflow: 'hidden' }}>

        <AnimatePresence mode="crossfade">
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        </AnimatePresence>

        {/* Subtle overlay — keep model visible */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />

        {/* ── HUGE TEXT — Damsyn style ── */}
        <div className="hero-content" style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 60px 60px',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              style={{ maxWidth: s.align === 'right' ? '100%' : '720px', marginLeft: s.align === 'right' ? 'auto' : '0', textAlign: s.align === 'right' ? 'right' : 'left' }}>

              <h1 style={{
                ...F, fontWeight: 900,
                fontSize: 'clamp(48px, 7vw, 96px)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: W,
                margin: '0 0 16px',
                whiteSpace: 'pre-line',
                textTransform: 'uppercase',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}>
                {s.headline}
              </h1>

              <p style={{
                ...F, fontWeight: 400,
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '28px',
                letterSpacing: '0.04em',
                fontStyle: 'italic',
              }}>
                {s.sub}
              </p>

              <Link
                to={s.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: BK, color: W,
                  padding: '14px 36px',
                  ...F, fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  transition: 'background 0.25s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = BK; e.currentTarget.style.transform = 'translateY(0)' }}>
                {s.cta}
              </Link>

            </motion.div>
          </AnimatePresence>
        </div>

        <Arrows onPrev={prev} onNext={next} />
        <Dots slides={slides} activeIdx={idx} onSelect={setIdx} style={{ bottom: '28px' }} />

        {!paused && (
          <motion.div
            key={`bar-${s.id}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 6, ease: 'linear' }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: G, transformOrigin: 'left', zIndex: 4 }}
          />
        )}
      </div>

      {/* ══ MOBILE — full, uncropped image on top; text below, not overlaid ══ */}
      <div className="mobile-only" style={{ display: 'none', flexDirection: 'column' }}>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <AnimatePresence mode="crossfade">
            <motion.img
              key={s.id}
              src={s.image}
              alt={s.headline.replace('\n', ' ')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(26,22,18,0.55) 100%)' }} />
          <Arrows onPrev={prev} onNext={next} size={36} />
          <Dots slides={slides} activeIdx={idx} onSelect={setIdx} style={{ bottom: '14px' }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            style={{ padding: '28px 24px 36px' }}>

            <h1 style={{
              ...F, fontWeight: 900,
              fontSize: 'clamp(28px, 8vw, 40px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: W,
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
              textTransform: 'uppercase',
            }}>
              {s.headline}
            </h1>

            <Link
              to={s.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: W, color: BK,
                padding: '13px 30px',
                ...F, fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
              {s.cta}
            </Link>

          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
