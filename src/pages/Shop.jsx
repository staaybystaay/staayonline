import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const sortOptions = [
  { label: 'Newest',        value: 'newest'     },
  { label: 'Price: Low',    value: 'price_asc'  },
  { label: 'Price: High',   value: 'price_desc' },
  { label: 'A – Z',         value: 'name_asc'   },
]

const priceRanges = [
  { label: 'Under $150',     min: 0,   max: 150     },
  { label: '$150 – $300',    min: 150, max: 300      },
  { label: '$300 – $500',    min: 300, max: 500      },
  { label: '$500+',          min: 500, max: Infinity },
]

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const badgeBg = product.badge === 'Sale' ? '#e63946' : 'var(--accent)'
  const badgeFg = product.badge === 'Sale' ? '#fff'    : '#0C0B09'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '2px solid var(--text)',
        paddingTop: '0',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}>

      {/* Image block */}
      <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{
          position: 'relative',
          aspectRatio: '3/4',
          background: 'var(--bg-surface)',
          overflow: 'hidden',
        }}>
          {/* Placeholder category */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px', letterSpacing: '0.3em',
              color: 'var(--text-faint)',
            }}>
              {product.category}
            </span>
          </div>

          <img
            src={product.image}
            alt={product.name}
            onError={e => { e.target.style.display = 'none' }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span style={{
              position: 'absolute', top: 0, left: 0,
              background: badgeBg, color: badgeFg,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 10px',
            }}>
              {product.badge}
            </span>
          )}

          {/* Quick add — slides up on hover */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'var(--text)',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{
                width: '100%',
                padding: '13px',
                background: 'transparent', border: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--bg)',
                cursor: 'pointer',
              }}>
              Add to Bag
            </button>
          </div>
        </div>

        {/* Info row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '10px 0 20px',
          gap: '8px',
        }}>
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              marginBottom: '3px', fontWeight: 300,
            }}>
              {product.category}
            </p>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px', color: 'var(--text)',
              letterSpacing: '0.04em', lineHeight: 1.1,
              transition: 'color 0.2s',
            }}>
              {product.name}
            </h3>
          </div>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '17px',
            color: 'var(--accent)', flexShrink: 0,
            marginTop: '16px',
          }}>
            ${product.price}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// FILTER ROW — horizontal, editorial
// ─────────────────────────────────────────────
function FilterRow({
  activeCategory, setActiveCategory,
  activePrices, setActivePrices,
  sortBy, setSortBy,
  totalCount,
}) {
  const [priceOpen, setPriceOpen] = useState(false)
  const [sortOpen,  setSortOpen]  = useState(false)

  const togglePrice = label =>
    setActivePrices(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label])

  const allCats = ['All', ...categories.filter(c => c !== 'All')]

  return (
    <div style={{
      borderTop: '2px solid var(--text)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Row 1 — categories */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        overflowX: 'auto',
      }}>
        {allCats.map((cat, i) => {
          const active = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '14px 22px',
                background: active ? 'var(--text)' : 'transparent',
                border: 'none',
                borderRight: '1px solid var(--border)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', fontWeight: active ? 600 : 300,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: active ? 'var(--bg)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.18s',
                whiteSpace: 'nowrap',
              }}>
              {cat}
            </button>
          )
        })}
        <div style={{ flex: 1 }} />
        {/* Count */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '0 20px',
          borderLeft: '1px solid var(--border)',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', color: 'var(--text-faint)',
          whiteSpace: 'nowrap',
        }}>
          {totalCount} items
        </div>
      </div>

      {/* Row 2 — price + sort */}
      <div style={{
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'stretch',
      }}>

        {/* Price filter */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setPriceOpen(v => !v); setSortOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px',
              background: activePrices.length ? 'var(--accent-soft)' : 'transparent',
              border: 'none',
              borderRight: '1px solid var(--border)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', fontWeight: 300,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: activePrices.length ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.18s',
              whiteSpace: 'nowrap',
            }}>
            Price
            {activePrices.length > 0 && (
              <span style={{
                width: '16px', height: '16px',
                background: 'var(--accent)', color: '#0C0B09',
                borderRadius: '50%',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {activePrices.length}
              </span>
            )}
            <span style={{
              fontSize: '10px',
              transition: 'transform 0.2s',
              transform: priceOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}>
              ▾
            </span>
          </button>

          <AnimatePresence>
            {priceOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', top: '100%', left: 0,
                  zIndex: 50, minWidth: '200px',
                  background: 'var(--bg)',
                  border: '1px solid var(--text)',
                  borderTop: '2px solid var(--text)',
                }}>
                {priceRanges.map(range => {
                  const active = activePrices.includes(range.label)
                  return (
                    <button
                      key={range.label}
                      onClick={() => togglePrice(range.label)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '11px 16px',
                        background: active ? 'var(--text)' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '11px', letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: active ? 'var(--bg)' : 'var(--text-muted)',
                        cursor: 'pointer', transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {range.label}
                      {active && <span style={{ fontSize: '12px' }}>✓</span>}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active price tags */}
        {activePrices.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '6px', padding: '0 16px',
            borderRight: '1px solid var(--border)',
          }}>
            {activePrices.map(p => (
              <span
                key={p}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '3px 10px',
                  border: '1px solid var(--accent)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                }}>
                {p}
                <button
                  onClick={() => togglePrice(p)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--accent)', cursor: 'pointer',
                    fontSize: '11px', lineHeight: 1, padding: 0,
                  }}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Sort */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setSortOpen(v => !v); setPriceOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px',
              background: 'transparent', border: 'none',
              borderLeft: '1px solid var(--border)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', fontWeight: 300,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              cursor: 'pointer', transition: 'color 0.18s',
              whiteSpace: 'nowrap',
            }}>
            Sort: {sortOptions.find(s => s.value === sortBy)?.label}
            <span style={{
              fontSize: '10px',
              transition: 'transform 0.2s',
              transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}>
              ▾
            </span>
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', top: '100%', right: 0,
                  zIndex: 50, minWidth: '180px',
                  background: 'var(--bg)',
                  border: '1px solid var(--text)',
                  borderTop: '2px solid var(--text)',
                }}>
                {sortOptions.map(opt => {
                  const active = sortBy === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '11px 16px',
                        background: active ? 'var(--text)' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '11px', letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: active ? 'var(--bg)' : 'var(--text-muted)',
                        cursor: 'pointer', transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {opt.label}
                      {active && <span style={{ fontSize: '12px' }}>✓</span>}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// SHOP PAGE
// ─────────────────────────────────────────────
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePrices,   setActivePrices]   = useState([])
  const [sortBy,         setSortBy]         = useState('newest')

  const filtered = products.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false
    if (activePrices.length) {
      const inRange = activePrices.some(label => {
        const range = priceRanges.find(r => r.label === label)
        return range && p.price >= range.min && p.price < range.max
      })
      if (!inRange) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
    return b.id - a.id
  })

  return (
    <div style={{
      background: 'var(--bg)',
      minHeight: '100vh',
    }}>

      {/* ── PAGE HEADER ── */}
      <div style={{
        borderBottom: '2px solid var(--text)',
        padding: '0 80px',
        maxWidth: '100%',
        display: 'flex', alignItems: 'stretch',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'stretch' }}>

          {/* Left — big heading */}
          <div style={{
            flex: 1,
            borderRight: '1px solid var(--border)',
            padding: '48px 0',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            {/* Breadcrumb */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '16px',
            }}>
              <Link
                to="/"
                style={{
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
                fontWeight: 400,
              }}>
                Shop
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(64px, 9vw, 120px)',
                color: 'var(--text)', lineHeight: 0.9,
                letterSpacing: '0.01em', margin: 0,
              }}>
              ALL<br />
              <span style={{ color: 'var(--accent)' }}>DROPS</span>
            </motion.h1>
          </div>

          {/* Right — editorial text + meta */}
          <div style={{
            width: '320px', flexShrink: 0,
            padding: '48px 0 48px 48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            gap: '24px',
          }}>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '15px', lineHeight: 1.7,
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              Every piece is built for those who refuse to follow the crowd.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '0',
            }}>
              <div style={{
                padding: '10px 16px',
                border: '1px solid var(--border)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '22px', color: 'var(--text)',
                letterSpacing: '0.04em',
              }}>
                {sorted.length}
              </div>
              <div style={{
                padding: '10px 14px',
                border: '1px solid var(--border)',
                borderLeft: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
                fontWeight: 300,
              }}>
                Pieces
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── FILTER ROW ── */}
      <div style={{ padding: '0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FilterRow
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activePrices={activePrices}
            setActivePrices={setActivePrices}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCount={sorted.length}
          />
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div style={{ padding: '0 80px 96px', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {sorted.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '120px 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '20px',
                  borderBottom: '1px solid var(--border)',
                }}>
                <p style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '48px', color: 'var(--text-faint)',
                  letterSpacing: '0.06em',
                }}>
                  NO RESULTS
                </p>
                <button
                  onClick={() => { setActiveCategory('All'); setActivePrices([]) }}
                  style={{
                    padding: '12px 32px',
                    background: 'var(--text)',
                    border: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', fontWeight: 600,
                    color: 'var(--bg)',
                    cursor: 'pointer',
                  }}>
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0',
                }}>
                {sorted.map((product, i) => (
                  <div
                    key={product.id}
                    style={{
                      borderRight: (i % 4 !== 3) ? '1px solid var(--border)' : 'none',
                      borderBottom: '1px solid var(--border)',
                      padding: '0 20px 0',
                    }}>
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
