import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
const F   = { fontFamily: "'Inter', sans-serif" }

const timeline = [
  {
    year: '2009',
    title: 'The Beginning',
    body: 'Staay was born in Accra from a single belief — that African women deserved clothing built around them, not borrowed from elsewhere.',
  },
  {
    year: '2015',
    title: 'First Collection',
    body: 'Our debut collection sold out in 72 hours. Six pieces. No marketing budget. Just word of mouth and a community that believed.',
  },
  {
    year: '2019',
    title: 'Going Digital',
    body: 'Staay Online launched, making the brand accessible across Ghana and beyond. The store never sleeps.',
  },
  {
    year: '2023',
    title: 'First Runway',
    body: 'The Void Series — our first full runway show in Accra. 24 looks. A sold-out crowd. A defining moment.',
  },
  {
    year: '2025',
    title: 'Now',
    body: 'SS 2025 is live. New silhouettes, new drops, same commitment. The Staay woman is everywhere.',
  },
]

const values = [
  {
    number: '01',
    title: 'Intentional Design',
    body: 'Every seam, silhouette and fabric choice is deliberate. We do not make filler pieces. Everything earns its place.',
  },
  {
    number: '02',
    title: 'Made for African Women',
    body: 'Not adapted, not translated — designed from scratch for the bodies, lifestyles and boldness of African women.',
  },
  {
    number: '03',
    title: 'No Seasons. No Trends.',
    body: 'We build pieces that outlast the moment they were made in. Buy once. Wear forever.',
  },
  {
    number: '04',
    title: 'Community First',
    body: 'Our customers are not buyers. They are the first people we think about when we sketch, cut and finish.',
  },
]

const stats = [
  { value: '16',     label: 'Years of Craft'         },
  { value: '2,400+', label: 'Pieces in Circulation'  },
  { value: '50+',    label: 'Countries Reached'       },
  { value: '98%',    label: 'Customer Satisfaction'   },
]

const editorialImages = [
  { src: '/brand1.jpg', label: 'SS 2025 Campaign' },
  { src: '/brand2.jpg', label: 'Void Series Runway' },
  { src: '/brand3.jpg',    label: 'Accra 2024' },
]

const contactItems = [
  { label: 'Email',     value: 'info@staayonline.com', href: 'mailto:info@staayonline.com'              },
  { label: 'WhatsApp',  value: '+233 50 397 7985',      href: 'https://wa.me/233503977985'              },
  { label: 'Instagram', value: '@staaybystaay',          href: 'https://instagram.com/staaybystaay'      },
  { label: 'TikTok',    value: '@staaybystaay',          href: 'https://tiktok.com/@staaybystaay'        },
]

function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      style={style}>
      {children}
    </motion.div>
  )
}

// ─── HERO ────────────────────────────────────
function BrandHero() {
  return (
    <section style={{ background: OW, borderBottom: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>

        {/* Breadcrumb */}
        <div style={{
          padding: '16px 0', borderBottom: `1px solid ${BR}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link
              to="/"
              style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              Home
            </Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Our Brand</span>
          </div>
          <span style={{ ...F, fontSize: '12px', fontWeight: 400, color: FT }}>
            Est. 2009 — Accra, Ghana
          </span>
        </div>

        {/* Split layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>

          {/* Left image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRight: `1px solid ${BR}`,
            }}>
            <img
              src="/brandhero.jpg"
              alt="Staay Brand"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: G }} />
            <span style={{
              position: 'absolute', top: '20px', left: '20px',
              background: G, color: W, padding: '5px 14px',
              ...F, fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Founded 2009
            </span>
          </motion.div>

          {/* Right text */}
          <div style={{
            padding: '52px 0 52px 52px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <motion.p
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                style={{
                  ...F, fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: G, marginBottom: '16px',
                }}>
                Who We Are
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  ...F, fontWeight: 800,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: DK, lineHeight: 1.05,
                  letterSpacing: '-0.025em', margin: '0 0 24px',
                }}>
                Designed for<br />the Staay Woman
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                style={{
                  ...F, fontWeight: 300,
                  fontSize: '15px', lineHeight: 1.7,
                  color: MD, maxWidth: '380px',
                }}>
                Designed for women who live beyond limits.
                Effortless. Intentional. Always in season.
              </motion.p>
            </div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                borderTop: `1px solid ${BR}`, marginTop: '40px',
              }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: '20px',
                    borderRight: i % 2 === 0 ? `1px solid ${BR}` : 'none',
                    borderBottom: i < 2 ? `1px solid ${BR}` : 'none',
                  }}>
                  <p style={{ ...F, fontSize: '28px', fontWeight: 800, color: G, lineHeight: 1, marginBottom: '4px', letterSpacing: '-0.02em' }}>
                    {s.value}
                  </p>
                  <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, letterSpacing: '0.02em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── MANIFESTO ───────────────────────────────
function Manifesto() {
  return (
    <section style={{ background: BK, padding: '80px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '64px', alignItems: 'start' }}>
          <FadeUp>
            <div style={{ width: '28px', height: '2px', background: G, marginBottom: '14px' }} />
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Our Manifesto
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{
              ...F, fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 36px)',
              color: W, lineHeight: 1.45,
              letterSpacing: '-0.01em',
            }}>
              We make clothes for the woman who walks into a room and does not need to announce herself.{' '}
              <span style={{ color: G }}>She is already known.</span>{' '}
              Staay is not a trend. It is not a moment. It is a standard.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── TIMELINE ────────────────────────────────
function Timeline() {
  return (
    <section style={{ background: W, padding: '80px 64px', borderBottom: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '28px', height: '2px', background: G }} />
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Our History
            </p>
          </div>
          <h2 style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: DK, letterSpacing: '-0.025em', lineHeight: 1.1,
          }}>
            16 Years. One Vision.
          </h2>
        </FadeUp>

        <div style={{ borderTop: `2px solid ${DK}` }}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 1fr',
                gap: '0',
                borderBottom: `1px solid ${BR}`,
                padding: '24px 0',
                alignItems: 'start',
              }}>
              <p style={{ ...F, fontSize: '28px', fontWeight: 800, color: G, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {item.year}
              </p>
              <p style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, paddingRight: '40px' }}>
                {item.title}
              </p>
              <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.65 }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── VALUES ──────────────────────────────────
function Values() {
  const [hovered, setHovered] = useState(null)
  return (
    <section style={{ background: OW, padding: '80px 64px', borderBottom: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '28px', height: '2px', background: G }} />
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              What We Stand For
            </p>
          </div>
          <h2 style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: DK, letterSpacing: '-0.025em', lineHeight: 1.1,
          }}>
            Our Values
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          border: `1px solid ${BR}`,
        }}>
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(v.number)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '36px',
                borderRight: i % 2 === 0 ? `1px solid ${BR}` : 'none',
                borderBottom: i < 2 ? `1px solid ${BR}` : 'none',
                borderTop: `3px solid ${hovered === v.number ? G : 'transparent'}`,
                background: hovered === v.number ? W : 'transparent',
                transition: 'all 0.2s',
                cursor: 'default',
              }}>
              <p style={{
                ...F, fontSize: '32px', fontWeight: 800,
                color: G, opacity: 0.3, lineHeight: 1, marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
                {v.number}
              </p>
              <h3 style={{
                ...F, fontSize: '17px', fontWeight: 700,
                color: DK, marginBottom: '10px', letterSpacing: '-0.01em',
              }}>
                {v.title}
              </h3>
              <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.65 }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── EDITORIAL STRIP ─────────────────────────
function EditorialStrip() {
  return (
    <section style={{ borderBottom: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 64px 32px' }}>
        <FadeUp style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '2px', background: G }} />
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              In the World
            </p>
          </div>
          <h2 style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 40px)',
            color: DK, letterSpacing: '-0.025em',
          }}>
            Behind the Brand
          </h2>
        </FadeUp>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {editorialImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              position: 'relative', aspectRatio: '4/5',
              borderRight: i < 2 ? `1px solid ${BR}` : 'none',
              overflow: 'hidden',
            }}>
            <img
              src={img.src} alt={img.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(17,17,17,0.75) 0%, transparent 60%)',
              padding: '20px 24px',
            }}>
              <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: W, letterSpacing: '0.04em' }}>
                {img.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────
function BrandCta() {
  return (
    <section style={{ background: W, padding: '80px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          border: `1px solid ${BR}`,
        }}>

          {/* Shop CTA */}
          <div style={{ padding: '56px', borderRight: `1px solid ${BR}` }}>
            <FadeUp>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Ready to wear Staay?
              </p>
              <h2 style={{
                ...F, fontWeight: 800,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: DK, letterSpacing: '-0.025em', lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                Shop the Collection
              </h2>
              <p style={{
                ...F, fontSize: '14px', fontWeight: 300,
                color: MD, lineHeight: 1.65,
                marginBottom: '32px', maxWidth: '320px',
              }}>
                Every piece in the SS 2025 collection is available now. Free shipping over $200.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: BK, color: W, padding: '14px 32px',
                  ...F, fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.04em', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = BK }}>
                Shop Now →
              </Link>
            </FadeUp>
          </div>

          {/* Contact */}
          <div style={{ padding: '56px' }}>
            <FadeUp delay={0.1}>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '28px' }}>
                Get in Touch
              </p>
              {contactItems.map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: `1px solid ${BR}`,
                  }}>
                  <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: FT, letterSpacing: '0.04em' }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      ...F, fontSize: '13px', fontWeight: 500, color: DK,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = G }}
                    onMouseLeave={e => { e.currentTarget.style.color = DK }}>
                    {item.value}
                  </a>
                </div>
              ))}
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── PAGE ────────────────────────────────────
export default function Brand() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>
      <BrandHero />
      <Manifesto />
      <Timeline />
      <Values />
      <EditorialStrip />
      <BrandCta />
    </div>
  )
}
