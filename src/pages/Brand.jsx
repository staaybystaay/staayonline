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

function Eyebrow({ children, color = GOLD }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
// HERO — sticky portrait, full story scrolls beside it
// ═══════════════════════════════════════════════
const storyBlocks = [
  { type: 'p', text: "Founded by Stacey Sefah, STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short. While studying law and navigating the expectations of life, she found comfort in creating pieces that made women feel seen, beautiful, confident, and unforgettable." },
  { type: 'p', text: "For years, Stacey often hid behind black clothing, believing simplicity meant shrinking herself. Like many women, she struggled with insecurities, self-doubt, and the pressure to fit into spaces that often demanded less softness, less color, and less individuality. But somewhere along the journey, she realized confidence was never about blending in — it was about embracing who God created her to be." },
  { type: 'quote', text: 'That realization changed everything.' },
  { type: 'p', text: "What started as designing a few custom pieces for friends and family quickly became something bigger. Women connected deeply with the feeling behind the designs — elegant pieces that felt intentional, feminine, expressive, and timeless. STAAY became more than clothing; it became a reminder that women do not have to choose between softness and strength, simplicity and statement, elegance and confidence." },
  { type: 'p', text: "Today, STAAY is a Ghanaian womenswear brand rooted in intention, craftsmanship, and grace. Every piece is thoughtfully designed for women who want to feel effortlessly put together — women who are evolving, growing, leading, celebrating, healing, building, and showing up fully as themselves." },
  { type: 'p', text: "Our designs embrace movement, color, structure, and individuality. From dramatic occasion wear to refined everyday elegance, STAAY creates pieces that are meant to move with you through every season of life. We believe true style is not about trends; it is about how a garment makes you feel." },
  { type: 'p', text: "At the heart of STAAY is a commitment to creating with meaning. We work closely with local artisans and makers, valuing quality craftsmanship, attention to detail, and the beauty of intentional production. Every stitch, silhouette, and finish reflects our belief that fashion should feel personal, empowering, and enduring." },
  { type: 'stanza', lines: [
      'But beyond the fabric, STAAY is a love letter to women becoming.',
      'Women learning to take up space.',
      'Women rediscovering themselves.',
      'Women embracing elegance without apology.',
      'Women choosing confidence, grace, and authenticity every single day.',
    ] },
]

function Hero() {
  return (
    <section style={{ borderBottom: `1px solid ${LINE}` }}>
      <div className="brand-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', alignItems: 'start' }}>

        {/* Sticky portrait */}
        <div className="brand-hero-image" style={{ position: 'sticky', top: '112px', height: '620px', overflow: 'hidden', background: PANEL }}>
          <img
            src="/sefah.png"
            alt="Stacey Sefah, Founder of STAAY"
            onError={e => { e.target.style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)' }} />


        
        </div>

        {/* Full story */}
        <div style={{ background: PANEL, padding: 'clamp(32px, 4vw, 56px)' }}>
          <Eyebrow>Who We Are</Eyebrow>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {storyBlocks.map((block, i) => {
              if (block.type === 'p') {
                return (
                  <p key={i} style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, maxWidth: '480px' }}>
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'quote') {
                return (
                  <p key={i} style={{ ...D, fontSize: 'clamp(20px, 2.4vw, 26px)', fontStyle: 'italic', fontWeight: 500, color: INK, lineHeight: 1.4, borderLeft: `2px solid ${GOLD}`, paddingLeft: '18px', maxWidth: '440px' }}>
                    "{block.text}"
                  </p>
                )
              }
              if (block.type === 'stanza') {
                return (
                  <div key={i} style={{ background: GPALE, borderLeft: `2px solid ${GOLD}`, padding: 'clamp(18px, 2.4vw, 28px)', maxWidth: '480px' }}>
                    {block.lines.map((line, j) => (
                      <p key={j} style={{ ...D, fontSize: '15px', fontStyle: 'italic', fontWeight: 400, color: '#2A251C', lineHeight: 1.7, marginBottom: j < block.lines.length - 1 ? '6px' : 0 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                )
              }
              return null
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '28px', borderTop: `1px solid ${LINE}`, marginTop: '32px' }}>
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
          "STAAY exists to remind women that they were never meant to shrink. They were meant to bloom, to evolve, and most importantly —{' '}
          <span style={{ color: GOLD, fontStyle: 'normal' }}>to STAAY true to themselves.</span>"
        </p>
      </motion.div>
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
    </div>
  )
}
