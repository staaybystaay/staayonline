import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ─── TOKENS ───────────────────────────────────
const INK   = '#15130F'
const PAPER = '#F8F3E8'
const PANEL = '#EFE6D2'
const GOLD  = '#B8903A'
const GPALE = '#FBF6EA'
const MUTE  = '#6E6657'
const FAINT = '#A79F8C'
const LINE  = '#E2D7BE'
const W     = '#FFFFFF'

const SANS  = "'Inter', sans-serif"
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

function Eyebrow({ children, color = GOLD, center = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color }}>
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
// HERO — full-bleed image, centered title
// ═══════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ position: 'relative', height: 'clamp(420px, 60vh, 640px)', overflow: 'hidden', background: INK }}>
      <img
        src="/herobanner2.jpg"
        alt="STAAY — About Us"
        onError={e => { e.target.style.display = 'none' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div>
          <Eyebrow color={GOLD} center>Who We Are</Eyebrow>
          <h1 style={{ ...D, fontSize: 'clamp(48px, 9vw, 110px)', fontWeight: 600, color: W, letterSpacing: '-0.02em', lineHeight: 1 }}>
            About Us
          </h1>
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
// MISSION — text left, image right
// ═══════════════════════════════════════════════
function Mission() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div className="brand-split-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <Eyebrow>Our Mission</Eyebrow>
          <h2 style={{ ...D, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, color: INK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px' }}>
            Founded by Stacey Sefah
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, marginBottom: '18px' }}>
            STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short. While studying law and navigating the expectations of life, she found comfort in creating pieces that made women feel seen, beautiful, confident, and unforgettable.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, marginBottom: '28px' }}>
            For years, Stacey often hid behind black clothing, believing simplicity meant shrinking herself. Like many women, she struggled with insecurities, self-doubt, and the pressure to fit into spaces that often demanded less softness, less color, and less individuality. But somewhere along the journey, she realized confidence was never about blending in — it was about embracing who God created her to be.
          </p>

          <p style={{ ...D, fontSize: 'clamp(19px, 2.2vw, 24px)', fontStyle: 'italic', fontWeight: 500, color: INK, lineHeight: 1.4, borderLeft: `2px solid ${GOLD}`, paddingLeft: '18px', marginBottom: '32px' }}>
            "That realization changed everything."
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: GOLD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...D, fontSize: '18px', fontWeight: 600, color: W }}>
              SS
            </div>
            <div>
              <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: INK }}>Stacey Sefah</p>
              <p style={{ ...F, fontSize: '11px', color: FAINT, letterSpacing: '0.04em', marginTop: '2px' }}>Founder &amp; Creative Director</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} style={{ aspectRatio: '4/5', overflow: 'hidden', background: PANEL }}>
          <img src="/sefah.png" alt="Stacey Sefah, Founder of STAAY"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
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

        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ aspectRatio: '4/5', overflow: 'hidden', background: '#DCD0AE' }}>
          <img src="/herobanner1.jpg" alt="STAAY editorial"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', display: 'block' }} />
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
          <Eyebrow>Our Evolution</Eyebrow>
          <h2 style={{ ...D, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, color: INK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px' }}>
            Effortless. Feminine. Timeless.
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, marginBottom: '18px' }}>
            What started as designing a few custom pieces for friends and family quickly became something bigger. Women connected deeply with the feeling behind the designs — elegant pieces that felt intentional, feminine, expressive, and timeless. STAAY became more than clothing; it became a reminder that women do not have to choose between softness and strength, simplicity and statement, elegance and confidence.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE }}>
            Today, STAAY is a Ghanaian womenswear brand rooted in intention, craftsmanship, and grace. Every piece is thoughtfully designed for women who want to feel effortlessly put together — women who are evolving, growing, leading, celebrating, healing, building, and showing up fully as themselves.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// FEATURE ROW — 4 icon values
// ═══════════════════════════════════════════════
const features = [
  { label: 'Intentional Design',    icon: 'spark'  },
  { label: 'Crafted With Care',     icon: 'heart'  },
  { label: 'Designed in Accra',     icon: 'pin'    },
  { label: 'For Women Who Bloom',   icon: 'bloom'  },
]

function FeatureIcon({ type }) {
  const common = { width: 26, height: 26, viewBox: '0 0 26 26', fill: 'none', stroke: GOLD, strokeWidth: 1.3 }
  if (type === 'spark') return (
    <svg {...common}><path d="M13 3v6M13 17v6M3 13h6M17 13h6M6 6l4 4M20 6l-4 4M6 20l4-4M20 20l-4-4" strokeLinecap="round" /></svg>
  )
  if (type === 'heart') return (
    <svg {...common}><path d="M13 22S3 15.5 3 8.8A5 5 0 0 1 13 6a5 5 0 0 1 10 2.8C23 15.5 13 22 13 22z" strokeLinejoin="round" /></svg>
  )
  if (type === 'pin') return (
    <svg {...common}><circle cx="13" cy="10" r="3.2" /><path d="M13 24s8-8.5 8-14a8 8 0 1 0-16 0c0 5.5 8 14 8 14z" strokeLinejoin="round" /></svg>
  )
  return (
    <svg {...common}><path d="M13 3c2 3 2 5 0 7-2-2-2-4 0-7z" /><path d="M13 23v-6M13 17c-4 0-7-2.5-7-7 4 0 7 2.5 7 7zM13 17c4 0 7-2.5 7-7-4 0-7 2.5-7 7z" strokeLinejoin="round" /></svg>
  )
}

function FeatureRow() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(48px, 6vw, 72px) clamp(24px, 6vw, 64px)', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div className="brand-feature-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
        {features.map(feat => (
          <div key={feat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
            <FeatureIcon type={feat.icon} />
            <span style={{ ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: INK }}>
              {feat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// MANIFESTO
// ═══════════════════════════════════════════════
function Manifesto() {
  return (
    <section style={{ background: INK, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow color={GOLD} center>The Manifesto</Eyebrow>
        <p style={{ ...D, fontSize: 'clamp(24px, 3.4vw, 38px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, color: '#EDE5D2' }}>
          "STAAY exists to remind women that they were never meant to shrink. They were meant to bloom, to evolve, and most importantly —{' '}
          <span style={{ color: GOLD, fontStyle: 'normal' }}>to STAAY true to themselves.</span>"
        </p>
      </motion.div>
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
          <div style={{ flex: 1, overflow: 'hidden', background: '#DCD0AE', minHeight: '220px' }}>
            <img src="/featured/feature2.jpeg" alt="The Eden Collection"
              onError={e => { e.target.style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          <div>
            <Eyebrow>New Season</Eyebrow>
            <h2 style={{ ...D, fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 600, color: INK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '18px' }}>
              Discover the Eden Collection
            </h2>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: MUTE, marginBottom: '24px', maxWidth: '420px' }}>
              An Eden for the modern African woman — rooted in beauty, grace, and quiet strength.
            </p>
            <Link to="/shop"
              style={{ display: 'inline-block', background: INK, color: W, padding: '15px 38px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD }}
              onMouseLeave={e => { e.currentTarget.style.background = INK }}>
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} style={{ overflow: 'hidden', background: '#DCD0AE' }}>
          <img src="/featured/feature6.jpeg" alt="STAAY runway"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }} />
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// INSTAGRAM GRID
// ═══════════════════════════════════════════════
const igImages = [
  '/featured/feature1.jpeg',
  '/featured/feature3.jpeg',
  '/featured/feature4.jpeg',
  '/featured/feature5.jpeg',
  '/featured/feature8.jpeg',
]

function InstagramSection() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow color={GOLD} center>Stay Current With Us</Eyebrow>
        <h2 style={{ ...D, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, color: INK, letterSpacing: '-0.01em', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
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
      <FontLoader />

      <Hero />
      <Marquee />
      <Mission />
      <TrueColors />
      <FeatureRow />
      <Manifesto />
      <DiscoverCollection />
      <InstagramSection />
    </div>
  )
}
