import { motion } from 'framer-motion'

// ─── TOKENS ───────────────────────────────────
const INK   = 'var(--text-strong)'
const PAPER = 'var(--bg)'
const PANEL = 'var(--bg-panel)'
const GOLD  = 'var(--accent)'
const TERRA = 'var(--accent-2)'
const MUTE  = 'var(--text-muted)'
const W     = 'var(--white)'
const DARK  = 'var(--ink)'

const F = { fontFamily: "'Inter', sans-serif" }

function Eyebrow({ children, color = GOLD, center = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ position: 'relative', height: 'clamp(360px, 50vh, 520px)', overflow: 'hidden', background: DARK }}>
      <img
        src="/herobanner1.jpg"
        alt="STAAY"
        onError={e => { e.target.style.display = 'none' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div>
          <Eyebrow color={GOLD} center>Who We Are</Eyebrow>
          <h1 style={{ ...F, fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 1 }}>
            About Us
          </h1>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// FOUNDER
// ═══════════════════════════════════════════════
function Founder() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div className="about-split-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <Eyebrow>Founded by Stacey Sefah</Eyebrow>
          <h2 style={{ ...F, fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '24px' }}>
            A brand built on becoming
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE, marginBottom: '18px' }}>
            Founded by Stacey Sefah, STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short. While studying law and navigating the expectations of life, she found comfort in creating pieces that made women feel seen, beautiful, confident, and unforgettable.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE, marginBottom: '28px' }}>
            For years she hid behind black clothing, believing simplicity meant shrinking herself. She later realized confidence was never about blending in. It was about embracing who she was made to be.
          </p>

          <p style={{ ...F, fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 700, color: INK, lineHeight: 1.4, borderLeft: `3px solid ${GOLD}`, paddingLeft: '18px', marginBottom: '32px' }}>
            "That realization changed everything."
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: GOLD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px', fontWeight: 700, color: W }}>
              SS
            </div>
            <div>
              <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: INK }}>Stacey Sefah</p>
              <p style={{ ...F, fontSize: '11px', color: MUTE, letterSpacing: '0.04em', marginTop: '2px' }}>Founder &amp; Creative Director</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '18px', left: '18px', right: '-18px', bottom: '-18px', background: TERRA, zIndex: 0 }} />
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: PANEL, zIndex: 1 }}>
            <img src="/sefah.png" alt="Stacey Sefah, Founder of STAAY"
              onError={e => { e.target.style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// EVOLUTION
// ═══════════════════════════════════════════════
function Evolution() {
  return (
    <section style={{ background: PANEL, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow color={GOLD} center>Our Evolution</Eyebrow>
        <h2 style={{ ...F, fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '24px' }}>
          Effortless. Feminine. Timeless.
        </h2>
        <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE, marginBottom: '18px' }}>
          What started as custom pieces for friends and family grew into something bigger. Women connected with the feeling behind each design.
        </p>
        <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
          Today, STAAY is a Ghanaian womenswear brand built on intention, craftsmanship, and grace. Every piece is made for women who want to feel effortlessly put together.
        </p>
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
        <Eyebrow color={GOLD} center>The Manifesto</Eyebrow>
        <p style={{ ...F, fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, lineHeight: 1.5, color: '#EDE5D2' }}>
          "STAAY exists to remind women that they were never meant to shrink. They were meant to bloom, to evolve, and{' '}
          <span style={{ color: GOLD }}>to STAAY true to themselves.</span>"
        </p>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════
export default function About() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh' }}>
      <Hero />
      <Founder />
      <Evolution />
      <Manifesto />
    </div>
  )
}
