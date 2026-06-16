import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─── TOKENS ───────────────────────────────────
const INK   = '#15130F'
const PAPER = '#F8F3E8'
const PANEL = '#EFE6D2'
const GOLD  = '#B8903A'
const GPALE = '#FBF6EA'
const CLAY  = '#9B4A33'
const MUTE  = '#6E6657'
const FAINT = '#A79F8C'
const LINE  = '#E2D7BE'
const W     = '#FFFFFF'

const SANS = "'Inter', sans-serif"
const SERIF = "'Fraunces', Georgia, serif"
const F = { fontFamily: SANS }
const D = { fontFamily: SERIF }

function FontLoader() {
  useEffect(() => {
    if (document.getElementById('staay-fraunces')) return
    const l = document.createElement('link')
    l.id = 'staay-fraunces'
    l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap'
    document.head.appendChild(l)
  }, [])
  return null
}

function Eyebrow({ children, color = GOLD }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ borderBottom: `1px solid ${LINE}` }}>
      <div className="brand-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', minHeight: '560px' }}>

        {/* Image + overlay headline */}
        <div style={{ position: 'relative', overflow: 'hidden', background: PANEL }}>
          <img
            src="/sefah.png"
            alt="Stacey Sefah, Founder of STAAY"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)' }} />

          <span style={{ position: 'absolute', top: '24px', left: '24px', background: GOLD, color: W, ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 14px' }}>
            Founded 2009
          </span>

          <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '24px' }}>
            <h1 style={{ ...D, fontSize: 'clamp(34px, 5.2vw, 64px)', fontWeight: 600, color: W, lineHeight: 1.04, letterSpacing: '-0.01em' }}>
              Designed for women<br />who bloom
            </h1>
          </div>
        </div>

        {/* Support panel */}
        <div style={{ background: PANEL, padding: 'clamp(32px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Eyebrow>Who We Are</Eyebrow>
            <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, maxWidth: '360px' }}>
              A Ghanaian womenswear brand rooted in intention, craftsmanship, and grace — built by a woman who understands what it means to come into your own.
            </p>
            <a href="#story" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', ...F, fontSize: '12px', fontWeight: 600, color: INK, textDecoration: 'none', borderBottom: `1px solid ${INK}`, paddingBottom: '3px' }}>
              Read Her Story ↓
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '24px', borderTop: `1px solid ${LINE}`, marginTop: '32px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: GOLD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...D, fontSize: '18px', fontWeight: 600, color: W }}>
              SS
            </div>
            <div>
              <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: INK }}>Stacey Sefah</p>
              <p style={{ ...F, fontSize: '11px', color: FAINT, letterSpacing: '0.04em', marginTop: '2px' }}>Founder &amp; Creative Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// MARQUEE TICKER
// ═══════════════════════════════════════════════
const tickerWords = ['INTENTIONAL', 'CRAFTED WITH CARE', 'DESIGNED IN ACCRA', 'FOR WOMEN WHO BLOOM']

function Marquee() {
  const row = [...tickerWords, ...tickerWords, ...tickerWords]
  return (
    <div style={{ background: INK, overflow: 'hidden', borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
      <div className="brand-marquee-track" style={{ display: 'flex', alignItems: 'center', gap: '28px', width: 'max-content', padding: '16px 0', animation: 'brandMarquee 32s linear infinite' }}>
        {row.map((word, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '28px', whiteSpace: 'nowrap' }}>
            <span style={{ ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', color: GPALE }}>{word}</span>
            <span style={{ color: GOLD, fontSize: '10px' }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes brandMarquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .brand-marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}

// ═══════════════════════════════════════════════
// MANIFESTO
// ═══════════════════════════════════════════════
function Manifesto() {
  return (
    <section style={{ background: INK, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Eyebrow color={GOLD}>The Manifesto</Eyebrow>
        <p style={{ ...D, fontSize: 'clamp(24px, 3.4vw, 38px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, color: '#EDE5D2' }}>
          "Women were never meant to shrink. They were meant to bloom, to evolve, and most importantly —{' '}
          <span style={{ color: GOLD, fontStyle: 'normal' }}>to STAAY true to themselves.</span>"
        </p>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// STORY — with stitch spine
// ═══════════════════════════════════════════════


function StitchSpine() {
  return (
    <div style={{ position: 'absolute', top: '6px', bottom: '6px', left: 0, width: '2px', backgroundImage: `repeating-linear-gradient(to bottom, ${GOLD} 0 6px, transparent 6px 14px)` }} />
  )
}

function ValueRow({ value, index }) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5, delay: index * 0.05 }}
      className="brand-values-row"
      style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', padding: 'clamp(22px, 3vw, 32px) 0', borderTop: index > 0 ? `1px solid ${LINE}` : 'none' }}>
      <span className="drop-cap" style={{ ...D, fontSize: '64px', fontWeight: 600, color: value.accent, lineHeight: 1, width: '80px', flexShrink: 0, opacity: 0.85 }}>
        {value.letter}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ ...F, fontSize: '17px', fontWeight: 700, color: INK, marginBottom: '8px' }}>{value.title}</h3>
        <p style={{ ...F, fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: MUTE, maxWidth: '520px' }}>{value.body}</p>
      </div>
    </motion.div>
  )
}


// ═══════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════
const stats = [
  { v: '2009', l: 'Founded in Accra' },
  { v: '3',    l: 'Signature Collections' },
  { v: '23',   l: 'Pieces in the Current Line' },
  { v: '100%', l: 'Finished by Hand' },
]





// ═══════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════
export default function Brand() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh' }}>
      <FontLoader />

      {/* Breadcrumb header — consistent with rest of site */}
      <div className="page-padding" style={{ background: PANEL, borderBottom: `1px solid ${LINE}`, padding: '20px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MUTE, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: FAINT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: INK }}>Our Brand</span>
          </div>
          <span className="desktop-only" style={{ ...F, fontSize: '11px', color: FAINT, letterSpacing: '0.06em' }}>
            Est. 2009 — Accra, Ghana
          </span>
        </div>
      </div>

      <Hero />
      <Marquee />
      <Manifesto />
      <Story />
      <Values />
      <Stats />
      <ShopContact />
    </div>
  )
}
