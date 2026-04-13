import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ═══════════════════════════════════════════════════════
// HERO SLIDES — real fashion campaign images
// ═══════════════════════════════════════════════════════
const heroSlides = [
  {
    id: 1,
    image: '/samba.jpg',
    tag: 'SS 2025 — Footwear',
    heading: ['STAY', 'ON', 'LINE.'],
    sub: 'Every step is a statement.',
    cta: 'Shop Sneakers',
    align: 'left',
  },
  {
    id: 2,
    image: '/baggyjeans.jpg',
    tag: 'SS 2025 — Tops',
    heading: ['WEAR', 'THE', 'VOID.'],
    sub: 'Oversized. Minimal. Yours.',
    cta: 'Shop Hoodies',
    align: 'right',
  },
  {
    id: 3,
    image: '/crocs.png',
    tag: 'SS 2025 — Bottoms',
    heading: ['NEW', 'DROP', '01.'],
    sub: 'Cargo culture refined.',
    cta: 'Shop Bottoms',
    align: 'left',
  },
  {
    id: 4,
    image: '/fashionguy.jpg',
    tag: 'SS 2025 — Collection',
    heading: ['THE', 'EDIT.', ''],
    sub: 'Curated for those who refuse definition.',
    cta: 'Shop All',
    align: 'right',
  },
]

// ═══════════════════════════════════════════════════════
// FEATURED DROPS strip
// ═══════════════════════════════════════════════════════
const featuredDrops = [
  {
    id: 'f1',
    label: 'Under Armour Scorpion Chrome',
    price: '$320',
    image: '/airsneaker.jpg',
    tag: 'New',
  },
  {
    id: 'f2',
    label: 'VOID HOODIE',
    price: '$195',
    image: '/hoodie.jpg',
    tag: 'Hot',
  },
  {
    id: 'f3',
    label: 'SHEIN CARGO PANT',
    price: '$240',
    image: '/cargopant.jpg',
    tag: 'New',
  },
  {
    id: 'f4',
    label: 'POLO JERSEY',
    price: '$420',
    image: '/polojersey.jpg',
    tag: null,
  },
  {
    id: 'f5',
    label: 'STAAY RUNNER',
    price: '$280',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80&fit=crop',
    tag: 'Sale',
  },
]

// ═══════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════
function HeroSection() {
  const [current,  setCurrent]  = useState(0)
  const [prev,     setPrev]     = useState(null)
  const [paused,   setPaused]   = useState(false)
  const { theme }               = useTheme()

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setPrev(current)
      setCurrent(c => (c + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(id)
  }, [current, paused])

  const goTo = (i) => {
    if (i === current) return
    setPrev(current)
    setCurrent(i)
  }

  const slide = heroSlides[current]

  return (
    <section
      style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        background: '#000',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background images ── */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
          }}
        >
          <img
            src={slide.image}
            alt={slide.tag}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: slide.align === 'left'
          ? 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(to left, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 100%)',
        transition: 'background 0.8s',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '200px', zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
      }} />

      {/* ── Text content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 80px', width: '100%',
        left: '50%', transform: 'translateX(-50%)',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginLeft: slide.align === 'right' ? 'auto' : '0',
              maxWidth: '520px',
            }}
          >
            {/* Tag */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginBottom: '24px',
            }}>
              <span style={{
                display: 'block', width: '28px',
                height: '1px', background: 'var(--accent)',
              }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                fontWeight: 400,
              }}>
                {slide.tag}
              </span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 800,
              fontSize: 'clamp(52px, 7vw, 92px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 24px',
            }}>
              {slide.heading.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {i === 1
                    ? <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>{line}</em>
                    : line
                  }
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '16px', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '36px',
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link to="/shop" style={{
                background: '#ffffff',
                color: '#080808',
                padding: '14px 36px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 500,
                display: 'inline-block',
                transition: 'background 0.25s, transform 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#080808' }}
              >
                {slide.cta}
              </Link>
              <Link to="/shop" style={{
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.7)',
                padding: '13px 36px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 300,
                display: 'inline-block',
                transition: 'border-color 0.25s, color 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
              >
                Lookbook
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide indicators ── */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px',
            }}
          >
            <motion.div
              animate={{
                width: i === current ? '28px' : '6px',
                background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.35 }}
              style={{ height: '2px', borderRadius: '2px' }}
            />
          </button>
        ))}
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <motion.div
          key={`${slide.id}-progress`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5.5, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0,
            height: '2px', background: 'var(--accent)',
            zIndex: 3, opacity: 0.6,
          }}
        />
      )}

      {/* ── Slide counter ── */}
      <div style={{
        position: 'absolute', top: '50%', right: '40px',
        transform: 'translateY(-50%)',
        zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '6px',
      }}>
        <span style={{
          fontFamily: "'Fraunces', serif", fontWeight: 800,
          fontSize: '22px', color: '#fff', lineHeight: 1,
        }}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', color: 'rgba(255,255,255,0.3)',
        }}>
          {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Editorial label — vertical ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '24px',
        transform: 'translateY(-50%) rotate(-90deg)',
        zIndex: 3,
        transformOrigin: 'center center',
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          whiteSpace: 'nowrap',
        }}>
          stayyonline.com — SS2025
        </span>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// FEATURED DROPS STRIP (Nike-style horizontal scroll)
// ═══════════════════════════════════════════════════════
function FeaturedDropsStrip() {
  const [hovered, setHovered] = useState(null)

  const badgeStyle = {
    New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
    Hot:  { background: 'transparent',          color: 'var(--accent)', border: '1px solid var(--accent)' },
    Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
  }

  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      padding: '40px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'block', width: '20px', height: '1px',
              background: 'var(--accent)',
            }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              fontWeight: 400,
            }}>
              Just dropped
            </span>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '2px',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            See all →
          </Link>
        </div>

        {/* Horizontal strip */}
        <div style={{
          display: 'flex', gap: '16px',
          overflowX: 'auto', paddingBottom: '4px',
        }}
          className="fe-scrollbar"
        >
          {featuredDrops.map((drop, i) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(drop.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0, width: '200px',
                cursor: 'pointer',
                transition: 'transform 0.35s',
                transform: hovered === drop.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative', width: '200px', height: '220px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                border: `1px solid ${hovered === drop.id ? 'var(--border-mid)' : 'var(--border)'}`,
                transition: 'border-color 0.3s',
              }}>
                <img
                  src={drop.image} alt={drop.label}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.65s',
                    transform: hovered === drop.id ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
                {drop.tag && (
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    padding: '3px 8px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 500,
                    ...badgeStyle[drop.tag],
                  }}>
                    {drop.tag}
                  </span>
                )}
              </div>
              {/* Info */}
              <div style={{ padding: '10px 0' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text)', fontWeight: 500,
                  marginBottom: '3px',
                }}>
                  {drop.label}
                </p>
                <p style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontSize: '15px',
                  color: 'var(--accent)',
                }}>
                  {drop.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════
function EditorialMarquee() {
  const words = [
    'STAYYONLINE', '✦', 'SS 2025', '✦',
    'NEW COLLECTION', '✦', 'WEAR THE VOID', '✦',
    'STAYYONLINE', '✦', 'SS 2025', '✦',
  ]
  return (
    <div style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0', overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex', gap: '40px',
          whiteSpace: 'nowrap', width: 'max-content',
        }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500, fontSize: '11px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: word === '✦' ? 'var(--accent)' : 'var(--text-faint)',
          }}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════
const categoryData = [
  { label: 'All',     icon: '◎' },
  { label: 'Tops',    icon: '◈' },
  { label: 'Bottoms', icon: '▣' },
  { label: 'Jackets', icon: '◉' },
  { label: 'Coats',   icon: '◍' },
  { label: 'Dresses', icon: '◆' },
  { label: 'Shoes',   icon: '◎' },
]

function CategoriesSection({ active, setActive }) {
  const { theme } = useTheme()
  const isLight   = theme === 'light'

  return (
    <section style={{
      background: 'var(--bg)',
      padding: '72px 0 52px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Browse by
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 800,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              Categories
            </h2>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
            transition: 'color 0.22s, border-color 0.22s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderBottomColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderBottomColor = 'var(--border-mid)' }}
          >
            View All →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          {categoryData.map(cat => {
            const isActive = active === cat.label
            return (
              <motion.button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '9px 18px',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
                  color: isActive
                    ? (isLight ? '#fff' : '#080808')
                    : 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 500 : 300,
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
              >
                <span style={{ fontSize: '11px' }}>{cat.icon}</span>
                {cat.label}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════
const badgeMap = {
  New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
  Hot:  { background: 'var(--badge-hot-bg)',  color: 'var(--badge-hot-fg)', border: '1px solid var(--accent)' },
  Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', background: 'var(--bg-surface)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: '11px', color: 'var(--text-faint)',
          }}>
            {product.category}
          </span>
        </div>
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.65s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'flex-end', padding: '14px',
        }}>
          <button
            onClick={e => { e.stopPropagation(); addItem(product) }}
            style={{
              width: '100%', background: 'var(--accent)',
              color: '#fff', border: 'none', padding: '11px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.target.style.opacity = '0.85' }}
            onMouseLeave={e => { e.target.style.opacity = '1' }}
          >
            Add to Bag
          </button>
        </div>
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '3px 9px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            ...badgeMap[product.badge],
          }}>
            {product.badge}
          </span>
        )}
        <button style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '30px', height: '30px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '13px',
          color: 'var(--text-muted)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          ♡
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
          marginBottom: '5px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 700,
          fontSize: '14px', color: 'var(--text)',
          marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3,
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '17px', color: 'var(--accent)',
          }}>
            ${product.price}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.1em',
          }}>
            In stock
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT GRID
// ═══════════════════════════════════════════════════════
function ProductGridSection({ activeCategory }) {
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Featured drops
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 800,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              New Arrivals
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'var(--text-faint)',
            }}>
              {filtered.length} items
            </span>
            <Link to="/shop" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
              transition: 'color 0.22s',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
            >
              Shop All →
            </Link>
          </div>
        </motion.div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
        }}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// EDITORIAL SPLIT
// ═══════════════════════════════════════════════════════
function EditorialSplit() {
  const { theme } = useTheme()
  const isLight   = theme === 'light'

  return (
    <section style={{ background: 'var(--bg)', padding: '0 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative', height: '440px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop"
              alt="New Release"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '30px', left: '30px', right: '30px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                New Release
              </span>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 800,
                fontSize: '26px', color: '#F2EEE6',
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px',
              }}>
                Void Series<br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>Drop 01</em>
              </h3>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '3px',
              }}>
                Discover the collection →
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              position: 'relative', height: '440px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop"
              alt="Coming Soon"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                filter: 'grayscale(30%)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%)',
              borderLeft: '3px solid var(--accent)',
            }} />
            <div style={{
              position: 'absolute', bottom: '30px', left: '30px', right: '30px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                Coming soon —
              </span>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 800,
                fontSize: '26px', color: '#F2EEE6',
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '18px',
              }}>
                Next drop<br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>is coming.</em>
              </h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map((t, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "'Fraunces', serif", fontWeight: 800,
                      fontSize: '24px', color: 'var(--accent)', lineHeight: 1,
                    }}>
                      {t.v}
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,238,230,0.4)', marginTop: '4px',
                    }}>
                      {t.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <HeroSection />
      <FeaturedDropsStrip />
      <EditorialMarquee />
      <CategoriesSection active={activeCategory} setActive={setActiveCategory} />
      <ProductGridSection activeCategory={activeCategory} />
      <EditorialSplit />
    </main>
  )
}