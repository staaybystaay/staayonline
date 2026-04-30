import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// DATA — swap images for real runway/campaign photos
// ─────────────────────────────────────────────
const heroFeature = {
  label: 'Runway — SS 2025',
  title: 'THE VOID SERIES',
  sub: 'Our first full runway presentation. 24 looks. One statement.',
  image: '/void.jpg',
  date: 'March 2025',
}

const runways = [
  {
    id: 1,
    season: 'SS 2025',
    title: 'Void Series — Full Show',
    looks: 24,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80&fit=crop',
    date: 'March 2025',
  },
  {
    id: 2,
    season: 'AW 2024',
    title: 'Shadow Collection',
    looks: 18,
    image: '/fashionlady6.jpg',
    date: 'October 2024',
  },
  {
    id: 3,
    season: 'SS 2024',
    title: 'Drift — Opening Show',
    looks: 16,
    image: '/prada.jpg',
    date: 'April 2024',
  },
]

const lookbook = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&fit=crop',
    look: '01',
    title: 'Void Jacket + Cargo',
  },
  {
    id: 2,
    image: '/denim.jpg',
    look: '02',
    title: 'Denim Jeans Set',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop',
    look: '03',
    title: 'Phase Silk + Denim',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80&fit=crop',
    look: '04',
    title: 'Relic Coat Story',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&fit=crop',
    look: '05',
    title: 'Noir Edit',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop',
    look: '06',
    title: 'Monolith Coat',
  },
]

const pressFeatures = [
  {
    id: 1,
    outlet: 'GH Fashion Weekly',
    quote: 'Staay is redefining what Ghanaian fashion means on the global stage.',
    date: 'April 2025',
  },
  {
    id: 2,
    outlet: 'Accra Style',
    quote: 'The Void Series show was the most talked-about event of the season.',
    date: 'March 2025',
  },
  {
    id: 3,
    outlet: 'African Fashion Digest',
    quote: 'Bold, intentional, and built for a new generation of African women.',
    date: 'February 2025',
  },
]

const behindScenes = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=80&fit=crop',
    caption: 'Fitting session — Void Series',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=700&q=80&fit=crop',
    caption: 'Campaign shoot day 1',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&q=80&fit=crop',
    caption: 'Backstage — SS 2025',
  },
]

// ─────────────────────────────────────────────
// FADE UP HELPER
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={style}>
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────
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
function FeaturedHero() {
  return (
    <div style={{ borderBottom: '2px solid var(--text)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Top bar */}
        <div style={{
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              fontWeight: 300,
            }}>
              Home
            </Link>
            <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>/</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              Featured
            </span>
          </div>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-faint)',
            fontWeight: 300,
          }}>
            SS 2025
          </span>
        </div>

        {/* Hero grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          minHeight: '520px',
        }}>

          {/* Left — headline */}
          <div style={{
            borderRight: '1px solid var(--border)',
            padding: '52px 52px 52px 0',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.32em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  marginBottom: '20px', fontWeight: 400,
                }}>
                {heroFeature.label}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  color: 'var(--text)', lineHeight: 0.9,
                  letterSpacing: '0.01em', margin: '0 0 28px',
                }}>
                {heroFeature.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: '16px', lineHeight: 1.7,
                  color: 'var(--text-muted)', maxWidth: '360px',
                }}>
                {heroFeature.sub}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{
                padding: '10px 18px',
                border: '1px solid var(--border)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
                fontWeight: 300,
              }}>
                {heroFeature.date}
              </div>
              <div style={{
                padding: '10px 18px',
                border: '1px solid var(--border)',
                borderLeft: 'none',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '16px', color: 'var(--text)',
                letterSpacing: '0.08em',
              }}>
                24 Looks
              </div>
              <Link
                to="/shop"
                style={{
                  padding: '10px 24px',
                  background: 'var(--accent)', color: '#0C0B09',
                  border: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 600,
                  display: 'inline-block', transition: 'opacity 0.2s',
                  marginLeft: '0',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                Shop the Look
              </Link>
            </motion.div>
          </div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={heroFeature.image}
              alt={heroFeature.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
            }} />
          </motion.div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// RUNWAY SHOWS
// ─────────────────────────────────────────────
function RunwayShows() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="01" label="Runway Shows" />
        </FadeUp>

        <FadeUp delay={0.1} style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text)', lineHeight: 0.9,
            letterSpacing: '0.01em',
          }}>
            FROM THE RUNWAY
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '0',
          border: '1px solid var(--border)',
        }}>
          {runways.map((show, i) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(show.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer',
                minHeight: i === 0 ? '480px' : '360px',
              }}>
              <img
                src={show.image}
                alt={show.title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                  transform: hovered === show.id ? 'scale(1.04)' : 'scale(1)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
              }} />

              {/* Season tag */}
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'var(--accent)', color: '#0C0B09',
                padding: '4px 10px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>
                {show.season}
              </div>

              {/* Info */}
              <div style={{
                position: 'absolute', bottom: '0', left: '0', right: '0',
                padding: '20px',
                borderTop: `2px solid ${hovered === show.id ? 'var(--accent)' : 'transparent'}`,
                transition: 'border-color 0.3s',
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                  marginBottom: '6px', fontWeight: 300,
                }}>
                  {show.date}
                </p>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: i === 0 ? '32px' : '22px',
                  color: '#fff', letterSpacing: '0.04em',
                  lineHeight: 1, marginBottom: '8px',
                }}>
                  {show.title}
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.06em',
                }}>
                  {show.looks} looks
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// LOOKBOOK
// ─────────────────────────────────────────────
function Lookbook() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="02" label="Lookbook" />
        </FadeUp>

        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: '40px',
        }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--text)', lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}>
              SS 2025<br />
              <span style={{ color: 'var(--accent)' }}>THE LOOKS</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              to="/shop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)', paddingBottom: '3px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderBottomColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderBottomColor = 'var(--border)' }}>
              Shop All Pieces
            </Link>
          </FadeUp>
        </div>

        {/* 3-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          border: '1px solid var(--border)',
          borderBottom: 'none',
        }}>
          {lookbook.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(look.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRight: i % 3 !== 2 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
              }}>
              {/* Image */}
              <div style={{
                position: 'relative', aspectRatio: '3/4',
                overflow: 'hidden',
                borderBottom: `2px solid ${hovered === look.id ? 'var(--accent)' : 'transparent'}`,
                transition: 'border-color 0.3s',
              }}>
                <img
                  src={look.image}
                  alt={look.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === look.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
              </div>
              {/* Caption */}
              <div style={{
                padding: '14px 16px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '11px', color: 'var(--accent)',
                    letterSpacing: '0.12em', marginRight: '10px',
                  }}>
                    {look.look}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px', color: 'var(--text-muted)',
                    letterSpacing: '0.06em', fontWeight: 300,
                  }}>
                    {look.title}
                  </span>
                </div>
                <Link
                  to="/shop"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
                  Shop
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PRESS
// ─────────────────────────────────────────────
function Press() {
  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
      background: 'var(--bg-surface)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="03" label="Press" />
        </FadeUp>
        <FadeUp delay={0.1} style={{ marginBottom: '52px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text)', lineHeight: 0.9, letterSpacing: '0.01em',
          }}>
            AS SEEN IN
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          borderTop: '2px solid var(--text)',
        }}>
          {pressFeatures.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '36px 36px 36px 0',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                paddingLeft: i > 0 ? '36px' : '0',
              }}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '13px', color: 'var(--accent)',
                letterSpacing: '0.16em', marginBottom: '16px',
              }}>
                {item.outlet}
              </p>
              <blockquote style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '18px', lineHeight: 1.65,
                color: 'var(--text)',
                margin: '0 0 20px',
              }}>
                "{item.quote}"
              </blockquote>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
                fontWeight: 300,
              }}>
                {item.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BEHIND THE SCENES
// ─────────────────────────────────────────────
function BehindScenes() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{
      borderBottom: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <FadeUp>
          <SectionLabel number="04" label="Behind the Scenes" />
        </FadeUp>

        <FadeUp delay={0.1} style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text)', lineHeight: 0.9, letterSpacing: '0.01em',
          }}>
            BEHIND<br />
            <span style={{ color: 'var(--accent)' }}>THE BRAND</span>
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0',
          border: '1px solid var(--border)',
        }}>
          {behindScenes.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                overflow: 'hidden', cursor: 'pointer',
                aspectRatio: '4/5',
              }}>
              <img
                src={item.image}
                alt={item.caption}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
                  transform: hovered === item.id ? 'scale(1.04)' : 'scale(1)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                opacity: hovered === item.id ? 1 : 0.5,
                transition: 'opacity 0.3s',
              }} />
              <p style={{
                position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.7)', fontWeight: 300,
              }}>
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CTA BAND
// ─────────────────────────────────────────────
function CtaBand() {
  return (
    <section style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          border: '2px solid var(--text)',
          padding: '64px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '40px',
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '12px', fontWeight: 400,
            }}>
              Now available
            </p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: 'var(--text)', lineHeight: 0.9,
              letterSpacing: '0.01em', margin: 0,
            }}>
              SHOP THE<br />
              <span style={{ color: 'var(--accent)' }}>SS 2025</span><br />
              COLLECTION
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/shop"
              style={{
                display: 'block', textAlign: 'center',
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
            <Link
              to="/shop"
              style={{
                display: 'block', textAlign: 'center',
                background: 'transparent', color: 'var(--accent)',
                border: '1px solid var(--accent)',
                padding: '15px 48px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.22em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent)'
                e.currentTarget.style.color = '#0C0B09'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--accent)'
              }}>
              View Lookbook
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Featured() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <FeaturedHero />
      <RunwayShows />
      <Lookbook />
      <Press />
      <BehindScenes />
      <CtaBand />
    </div>
  )
}
