import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
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
  { value: '16',    label: 'Years of craft'       },
  { value: '2,400+', label: 'Pieces in circulation' },
  { value: '50+',  label: 'Countries reached'     },
  { value: '98%',  label: 'Customer satisfaction' },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={style}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ number, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px',
      marginBottom: '40px',
    }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '11px', color: 'var(--accent)',
        letterSpacing: '0.14em',
      }}>
        {number}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '10px', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: 'var(--text-faint)',
        fontWeight: 300,
      }}>
        {label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function BrandHero() {
  return (
    <div style={{ borderBottom: '2px solid var(--text)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Breadcrumb bar */}
        <div style={{
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 300,
            }}>
              Home
            </Link>
            <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>/</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              Our Brand
            </span>
          </div>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 300,
          }}>
            Est. 2009 — Accra, Ghana
          </span>
        </div>

        {/* Hero grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '560px',
        }}>

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRight: '1px solid var(--border)',
            }}>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&fit=crop"
              alt="Staay Brand"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gold stripe bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '4px', background: 'var(--accent)',
            }} />
            {/* Founded badge */}
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              background: 'var(--accent)', color: '#0C0B09',
              padding: '6px 14px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              Founded 2009
            </div>
          </motion.div>

          {/* Right — text */}
          <div style={{
            padding: '56px 0 56px 56px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <motion.p
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.32em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  marginBottom: '20px', fontWeight: 400,
                }}>
                Who we are
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px, 6vw, 88px)',
                  color: 'var(--text)', lineHeight: 0.88,
                  letterSpacing: '0.01em', margin: '0 0 32px',
                }}>
                DESIGNED<br />FOR THE<br />
                <span style={{ color: 'var(--accent)' }}>STAAY</span><br />
                WOMAN
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: '17px', lineHeight: 1.75,
                  color: 'var(--text-muted)', maxWidth: '380px',
                }}>
                Designed for women who live beyond limits. Effortless. Intentional. Always in season.
              </motion.p>
            </div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0', borderTop: '1px solid var(--border)',
                marginTop: '40px',
              }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: '20px 0',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    paddingLeft: i % 2 === 1 ? '20px' : '0',
                    paddingRight: i % 2 === 0 ? '20px' : '0',
                  }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '36px', color: 'var(--accent)',
                    letterSpacing: '0.02em', lineHeight: 1,
                    marginBottom: '4px',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                    fontWeight: 300,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MANIFESTO
// ─────────────────────────────────────────────
function Manifesto() {
  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--text)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '200px 1fr',
          gap: '64px', alignItems: 'start',
        }}>
          {/* Left label */}
          <FadeUp>
            <div>
              <div style={{
                width: '32px', height: '3px',
                background: 'var(--accent)', marginBottom: '16px',
              }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                fontWeight: 400,
              }}>
                Our Manifesto
              </p>
            </div>
          </FadeUp>

          {/* Right — big statement */}
          <FadeUp delay={0.1}>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: 'var(--bg)',
              lineHeight: 1.05, letterSpacing: '0.02em',
              margin: 0,
            }}>
              We make clothes for the woman who walks into a room and does not need to announce herself.{' '}
              <span style={{ color: 'var(--accent)' }}>
                She is already known.
              </span>{' '}
              Staay is not a trend. It is not a moment. It is a standard.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────
function Timeline() {
  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="01" label="Our History" />
        </FadeUp>

        <FadeUp delay={0.1} style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 5vw, 72px)',
            color: 'var(--text)', lineHeight: 0.9, letterSpacing: '0.01em',
          }}>
            16 YEARS.<br />
            <span style={{ color: 'var(--accent)' }}>ONE VISION.</span>
          </h2>
        </FadeUp>

        {/* Timeline grid */}
        <div style={{ borderTop: '2px solid var(--text)' }}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 1fr',
                gap: '0',
                borderBottom: '1px solid var(--border)',
                padding: '28px 0',
                alignItems: 'start',
              }}>
              {/* Year */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '32px', color: 'var(--accent)',
                letterSpacing: '0.04em', lineHeight: 1,
              }}>
                {item.year}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '22px', color: 'var(--text)',
                letterSpacing: '0.04em', lineHeight: 1,
                paddingRight: '40px',
              }}>
                {item.title}
              </div>

              {/* Body */}
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '14px', lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                {item.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// VALUES
// ─────────────────────────────────────────────
function Values() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
      background: 'var(--bg-surface)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="02" label="What We Stand For" />
        </FadeUp>

        <FadeUp delay={0.1} style={{ marginBottom: '52px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 5vw, 72px)',
            color: 'var(--text)', lineHeight: 0.9, letterSpacing: '0.01em',
          }}>
            OUR<br />
            <span style={{ color: 'var(--accent)' }}>VALUES</span>
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0', borderTop: '2px solid var(--text)',
        }}>
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(v.number)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '40px',
                borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                borderTop: hovered === v.number ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'border-top-color 0.25s',
                cursor: 'default',
              }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '44px', color: 'var(--accent)',
                letterSpacing: '0.02em', lineHeight: 1,
                marginBottom: '16px', opacity: 0.35,
              }}>
                {v.number}
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '24px', color: 'var(--text)',
                letterSpacing: '0.04em', marginBottom: '14px',
              }}>
                {v.title}
              </h3>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '15px', lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOUNDER
// ─────────────────────────────────────────────
function Founder() {
  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="03" label="The Founder" />
        </FadeUp>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          gap: '0', border: '1px solid var(--border)',
        }}>
          {/* Image */}
          <FadeUp style={{ position: 'relative', overflow: 'hidden', minHeight: '480px' }}>
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80&fit=crop"
              alt="Founder"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '4px', background: 'var(--accent)',
            }} />
          </FadeUp>

          {/* Text */}
          <FadeUp delay={0.15} style={{
            padding: '52px',
            borderLeft: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '16px', fontWeight: 400,
            }}>
              Founder
            </p>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: 'var(--text)', lineHeight: 0.9,
              letterSpacing: '0.02em', margin: '0 0 28px',
            }}>
              MRS. GRANT<br />STAAY
            </h2>

            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '16px', lineHeight: 1.8,
              color: 'var(--text-muted)', marginBottom: '28px',
            }}>
              "I started Staay because I was tired of seeing African women dress in silhouettes made for someone else. Every woman who wears Staay is wearing something made with her in mind — her body, her life, her confidence."
            </p>

            <div style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '24px',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>
              <a
                href="https://instagram.com/staaybystaay"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', fontWeight: 300,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}>
                Instagram — @staaybystaay
              </a>
              <a
                href="https://tiktok.com/@staaybystaay"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', fontWeight: 300,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}>
                TikTok — @staaybystaay
              </a>
              <a
                href="https://wa.me/233503977985"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', fontWeight: 300,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}>
                WhatsApp — +233 50 397 7985
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EDITORIAL STRIP — 3 images
// ─────────────────────────────────────────────
function EditorialStrip() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop',
      label: 'SS 2025 Campaign',
    },
    {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop',
      label: 'Void Series Runway',
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
      label: 'Accra 2024',
    },
  ]

  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="04" label="In the World" />
        </FadeUp>
      </div>

      {/* Full-width grid, no padding */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--border)',
      }}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{
              position: 'relative', aspectRatio: '4/5',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              overflow: 'hidden',
            }}>
            <img
              src={img.src}
              alt={img.label}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              padding: '20px',
            }}>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)', fontWeight: 300,
              }}>
                {img.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────
function BrandCta() {
  return (
    <section style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0', border: '2px solid var(--text)',
        }}>

          <div style={{
            padding: '64px',
            borderRight: '1px solid var(--border)',
          }}>
            <FadeUp>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.32em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '16px', fontWeight: 400,
              }}>
                Ready to wear Staay?
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 4vw, 60px)',
                color: 'var(--text)', lineHeight: 0.9,
                letterSpacing: '0.01em', margin: '0 0 28px',
              }}>
                SHOP THE<br />
                <span style={{ color: 'var(--accent)' }}>COLLECTION</span>
              </h2>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '15px', lineHeight: 1.7,
                color: 'var(--text-muted)', marginBottom: '36px',
                maxWidth: '320px',
              }}>
                Every piece in the SS 2025 collection is available now. Free shipping over $200.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-block',
                  background: 'var(--text)', color: 'var(--bg)',
                  padding: '16px 48px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px', letterSpacing: '0.1em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                Shop Now
              </Link>
            </FadeUp>
          </div>

          <div style={{
            padding: '64px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            gap: '28px',
          }}>
            <FadeUp delay={0.1}>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.32em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '16px', fontWeight: 400,
              }}>
                Get in touch
              </p>
              {[
                { label: 'Email', value: 'info@staayonline.com', href: 'mailto:info@staayonline.com' },
                { label: 'WhatsApp', value: '+233 50 397 7985', href: 'https://wa.me/233503977985' },
                { label: 'Instagram', value: '@staaybystaay', href: 'https://instagram.com/staaybystaay' },
                { label: 'TikTok', value: '@staaybystaay', href: 'https://tiktok.com/@staaybystaay' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border)',
                  }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                    fontWeight: 300,
                  }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px', color: 'var(--text)',
                      fontWeight: 400, letterSpacing: '0.04em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)' }}>
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

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Brand() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <BrandHero />
      <Manifesto />
      <Timeline />
      <Values />
      <Founder />
      <EditorialStrip />
      <BrandCta />
    </div>
  )
}
