import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─── TOKENS ───────────────────────────────────
// Theme-aware tokens used throughout the rest of the page
const INK    = 'var(--text-strong)'
const PAPER  = 'var(--bg)'
const PANEL  = 'var(--bg-panel)'
const MUTE   = 'var(--text-muted)'
const W      = 'var(--white)'
const DARK   = 'var(--ink)'
const SURFACE = 'var(--bg-surface)'

const F = { fontFamily: "'Inter', sans-serif" }

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
}

// ═══════════════════════════════════════════════
// HERO — full-bleed image, centered title
// ═══════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ position: 'relative', height: 'clamp(420px, 60vh, 640px)', overflow: 'hidden', background: DARK }}>
      <video
        src="/stayvid2.mp4"
        poster="/brand-banner.jpg"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div>
          <h1 style={{ ...F, fontSize: 'clamp(40px, 8vw, 92px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '18px' }}>
            STAAY
          </h1>
          <p style={{ ...F, fontSize: 'clamp(14px, 1.6vw, 17px)', fontWeight: 500, color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto' }}>
            Ghanaian womenswear made with intention.
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// TRUE COLORS — image left, text right (reversed)
// ═══════════════════════════════════════════════
function TrueColors() {
  return (
    <section style={{ background: PANEL, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div className="brand-split-grid brand-split-reverse" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: SURFACE }}>
            <img src="/brand-tag.jpeg" alt="STAAY editorial"
              onError={e => { e.target.style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', display: 'block' }} />
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>

          <h2 style={{ ...F, fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '24px' }}>
            Effortless. Feminine. Timeless.
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE, marginBottom: '18px' }}>
            What started as custom pieces for friends and family grew into something bigger. Women connected with the feeling behind each design.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
            Today, STAAY is a Ghanaian womenswear brand built on intention, craftsmanship, and grace. Every piece is made for women who want to feel effortlessly put together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// MANIFESTO
// ═══════════════════════════════════════════════
function Manifesto() {
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ ...F, fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, lineHeight: 1.5, color: '#EDE5D2' }}>
          "STAAY exists to remind women that they were never meant to shrink. They were meant to bloom, to evolve, and{' '}
          <span style={{ fontWeight: 800 }}>to STAAY true to themselves.</span>"
        </p>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// CAMPAIGN SPOTLIGHT — press / partnership highlight
// ═══════════════════════════════════════════════
function CampaignSpotlight() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div className="brand-split-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ aspectRatio: '4/3', overflow: 'hidden', background: SURFACE }}>
          <img src="/featured/rith-crowd.jpg" alt="STAAY at the British Museum"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
          <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '18px' }}>
            Running in the Halls
          </h2>
          <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.8, color: MUTE, marginBottom: '24px', maxWidth: '440px' }}>
            STAAY joined My Runway Group at the British Museum for their Young People's Lates programme. See the full story on our Featured page.
          </p>
          <Link to="/featured"
            style={{ display: 'inline-block', background: 'transparent', border: `1.5px solid ${INK}`, color: INK, padding: '13px 32px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = DARK; e.currentTarget.style.color = W }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK }}>
            View the Full Story
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// DISCOVER COLLECTION — CTA
// ═══════════════════════════════════════════════
function DiscoverCollection() {
  return (
    <section style={{ background: PANEL, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div className="brand-split-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 4vw, 40px)', alignItems: 'stretch' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ flex: 1, overflow: 'hidden', background: SURFACE, minHeight: '220px' }}>
            <img src="/brand-discover.jpeg" alt="The Eden Collection"
              onError={e => { e.target.style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          <div>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '18px' }}>
              Discover Our Collection
            </h2>
            <p style={{ ...F, fontSize: '14px', fontWeight: 400, lineHeight: 1.75, color: MUTE, marginBottom: '24px', maxWidth: '420px' }}>
              Inspired by the Garden of Eden, a symbol of life and abundance. Effortless femininity, natural confidence, and quiet strength for the modern African woman.
            </p>
            <Link to="/shop"
              style={{ display: 'inline-block', background: DARK, color: W, padding: '15px 38px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = DARK }}>
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} style={{ overflow: 'hidden', background: SURFACE }}>
          <video
            src="/staayvid7.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// INSTAGRAM GRID
// ═══════════════════════════════════════════════
const igImages = [
  '/brand-evolution-section.jpeg',
  '/brand-tag1.jpeg',
  '/featured/feature4.jpeg',
  '/featured/feature5.jpeg',
  '/featured/feature8.jpeg',
]

function InstagramSection() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ ...F, fontSize: 'clamp(22px, 2.6vw, 30px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          Tag Us @staaybystaay on Instagram
        </h2>

        <div className="brand-ig-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {igImages.map((src, i) => (
            <a key={i} href="https://instagram.com/staaybystaay" target="_blank" rel="noreferrer"
              style={{ aspectRatio: '1/1', overflow: 'hidden', display: 'block', background: PANEL }}>
              <img src={src} alt="STAAY on Instagram" loading="lazy"
                onError={e => { e.target.style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════
export default function Brand() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh' }}>
      <Hero />
      <TrueColors />
      <Manifesto />
      <CampaignSpotlight />
      <DiscoverCollection />
      <InstagramSection />
    </div>
  )
}
