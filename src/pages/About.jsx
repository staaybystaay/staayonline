import { motion } from 'framer-motion'

const INK   = 'var(--text-strong)'
const PAPER = 'var(--bg)'
const MUTE  = 'var(--text-muted)'
const PANEL = 'var(--bg-panel)'

const F = { fontFamily: "'Inter', sans-serif" }

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
}

export default function About() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 64px)' }}>

        <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: INK, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '32px' }}>
          About Us
        </p>

        <div className="about-split-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>

          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: PANEL }}>
              <img src="/sefah.png" alt="Stacey Sefah, Founder of STAAY"
                onError={e => { e.target.style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <a href="https://www.instagram.com/s.t.a.a.y?igsh=MXRueTlrZDdta3IyaQ=="
              target="_blank" rel="noreferrer"
              style={{ display: 'block', textAlign: 'center', ...F, fontSize: '13px', fontWeight: 500, color: INK, letterSpacing: '0.1em', textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '16px' }}>
              @s.t.a.a.y
            </a>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
              Founded by Stacey Sefah, STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short. While studying law and navigating the expectations of life, she found comfort in creating pieces that made women feel seen, beautiful, confident, and unforgettable.
            </p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
              For years she hid behind black clothing, believing simplicity meant shrinking herself. She later realized confidence was never about blending in. It was about embracing who she was made to be. That realization changed everything.
            </p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
              What started as custom pieces for friends and family grew into something bigger. Women connected with the feeling behind each design. Today, STAAY is a Ghanaian womenswear brand built on intention, craftsmanship, and grace. Every piece is made for women who want to feel effortlessly put together.
            </p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 400, lineHeight: 1.85, color: MUTE }}>
              STAAY exists to remind women that they were never meant to shrink. They were meant to bloom, to evolve, and to STAAY true to themselves.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
