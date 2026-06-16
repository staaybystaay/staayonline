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
const beats = [
  {
    label: 'The Spark',
    body: "Founded by Stacey Sefah, STAAY began long before the first collection was released. From a young age, fashion became her way of saying what words often could not.",
  },
  {
    label: 'The Realisation',
    quote: 'That realisation changed everything.',
  },
  {
    label: 'The Brand',
    body: "Today, STAAY is a Ghanaian womenswear brand rooted in intention, craftsmanship, and grace — designed for women who want to feel effortlessly put together, in every season of life.",
  },
  {
    label: 'The Promise',
    panel: [
      'STAAY is a love letter to women becoming.',
      'Women learning to take up space.',
      'Women embracing elegance without apology.',
      'Women choosing confidence, grace, and authenticity — every single day.',
    ],
  },
]

function StitchSpine() {
  return (
    <div style={{ position: 'absolute', top: '6px', bottom: '6px', left: 0, width: '2px', backgroundImage: `repeating-linear-gradient(to bottom, ${GOLD} 0 6px, transparent 6px 14px)` }} />
  )
}

function Story() {
  return (
    <section id="story" style={{ padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)', borderBottom: `1px solid ${LINE}` }}>
      <div className="brand-story-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '64px', alignItems: 'start' }}>

        <motion.div {...fadeUp} transition={{ duration: 0.55 }} style={{ position: 'sticky', top: '88px' }}>
          <Eyebrow>Our Story</Eyebrow>
          <h2 style={{ ...D, fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 600, color: INK, lineHeight: 1.12, letterSpacing: '-0.01em' }}>
            Born from a belief.<br />Built with grace.
          </h2>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          <StitchSpine />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {beats.map((beat, i) => (
              <motion.div key={beat.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-32px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: GOLD, transform: 'translateX(-3px)' }} />
                <p style={{ ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, marginBottom: '10px' }}>
                  {beat.label}
                </p>

                {beat.body && (
                  <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: MUTE, maxWidth: '560px' }}>
                    {beat.body}
                  </p>
                )}

                {beat.quote && (
                  <p style={{ ...D, fontSize: 'clamp(19px, 2.2vw, 24px)', fontStyle: 'italic', fontWeight: 400, color: INK, lineHeight: 1.5 }}>
                    "{beat.quote}"
                  </p>
                )}

                {beat.panel && (
                  <div style={{ background: GPALE, borderLeft: `2px solid ${GOLD}`, padding: 'clamp(18px, 2.4vw, 28px)', maxWidth: '560px' }}>
                    {beat.panel.map((line, j) => (
                      <p key={j} style={{ ...D, fontSize: '16px', fontStyle: 'italic', fontWeight: 400, color: '#2A251C', lineHeight: 1.7, marginBottom: j < beat.panel.length - 1 ? '6px' : 0 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// VALUES — editorial list, drop-cap markers
// ═══════════════════════════════════════════════
const values = [
  { letter: 'I', title: 'Intentional Design',     body: "Every seam, silhouette, and fabric choice is deliberate. We don't make filler pieces — everything earns its place in your wardrobe.", accent: GOLD },
  { letter: 'M', title: 'Made for African Women', body: 'Not adapted, not translated — designed from scratch for the bodies, lifestyles, and boldness of African women.', accent: CLAY },
  { letter: 'S', title: 'Softness Is Strength',   body: 'We build pieces that honour femininity in every form. Elegance and confidence were never meant to be a choice.', accent: GOLD },
  { letter: 'C', title: 'Community First',        body: "Our customers aren't just buyers. They're the first people we think of when we sketch, cut, and finish.", accent: CLAY },
]

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

function Values() {
  return (
    <section style={{ background: PAPER, padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)', borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} style={{ marginBottom: '8px' }}>
          <Eyebrow>What We Stand For</Eyebrow>
          <h2 style={{ ...D, fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 600, color: INK, letterSpacing: '-0.01em' }}>Our Values</h2>
        </motion.div>

        <div>
          {values.map((v, i) => <ValueRow key={v.letter} value={v} index={i} />)}
        </div>
      </div>
    </section>
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

function Stats() {
  return (
    <section style={{ background: INK, padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', ...D, fontSize: 'clamp(120px, 22vw, 280px)', fontWeight: 600, color: 'rgba(255,255,255,0.025)', letterSpacing: '0.02em', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
        STAAY
      </p>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="brand-stats-row" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', position: 'relative' }}>
        {stats.map((s, i) => (
          <div key={s.l} style={{ flex: 1, padding: '0 clamp(12px, 2vw, 28px)', borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.1)` : 'none', textAlign: 'center' }}>
            <p style={{ ...D, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, color: GOLD, lineHeight: 1, marginBottom: '8px' }}>{s.v}</p>
            <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// SHOP CTA + CONTACT
// ═══════════════════════════════════════════════
const contacts = [
  { k: 'Email',     v: 'info@staayonline.com', h: 'mailto:info@staayonline.com' },
  { k: 'WhatsApp',  v: '+233 50 397 7985',      h: 'https://wa.me/233503977985' },
  { k: 'Instagram', v: '@staaybystaay',         h: 'https://instagram.com/staaybystaay' },
  { k: 'TikTok',    v: '@staaybystaay',         h: 'https://tiktok.com/@staaybystaay' },
]

function ShopContact() {
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)' }}>
      <div className="brand-contact-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${LINE}`, minHeight: '420px' }}>

        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
          <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1000&q=80&fit=crop" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55))' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
            <Eyebrow color={GPALE}>Ready to Wear STAAY?</Eyebrow>
            <h2 style={{ ...D, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: W, lineHeight: 1.1, marginBottom: '16px' }}>
              Shop the Collection
            </h2>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: GOLD, color: W, padding: '13px 30px', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Shop Now →
            </Link>
          </div>
        </div>

        <div style={{ padding: 'clamp(32px, 4vw, 56px)', background: PAPER }}>
          <Eyebrow>Get in Touch</Eyebrow>
          <div style={{ marginTop: '8px' }}>
            {contacts.map(c => (
              <div key={c.k} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', padding: '15px 0', borderBottom: `1px solid ${LINE}` }}>
                <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: FAINT, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {c.k}
                </span>
                <a href={c.h} target={c.h.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ ...F, fontSize: '14px', fontWeight: 400, color: INK, textDecoration: 'none', textAlign: 'right' }}>
                  {c.v}
                </a>
              </div>
            ))}
          </div>
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
