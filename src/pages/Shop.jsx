import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8.5" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8.5" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)

const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M9 4h5M9 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? 'var(--accent)' : 'none'}>
    <path d="M7 12S1.5 8.4 1.5 4.8A3 3 0 0 1 7 3a3 3 0 0 1 5.5 1.8C12.5 8.4 7 12 7 12z"
      stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const sortOptions = [
  { label: 'Newest First',    value: 'newest'     },
  { label: 'Price: Low–High', value: 'price_asc'  },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Name A–Z',        value: 'name_asc'   },
]

const priceRanges = [
  { label: 'Under $150',     min: 0,   max: 150      },
  { label: '$150 – $300',    min: 150, max: 300       },
  { label: '$300 – $500',    min: 300, max: 500       },
  { label: '$500 and above', min: 500, max: Infinity  },
]

const badgeStyles = {
  New:  { background: 'var(--accent)',     color: '#0C0B09'                              },
  Hot:  { background: 'transparent',       color: 'var(--accent)', border: '1px solid var(--accent)' },
  Sale: { background: '#E63946',           color: '#fff'                                  },
}

// ─────────────────────────────────────────────
// FILTER ACCORDION
// ─────────────────────────────────────────────
function FilterAccordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      paddingBottom: '20px', marginBottom: '20px',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', padding: '0 0 14px',
        }}
      >
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '10px', letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)', fontWeight: 400,
        }}>
          {title}
        </span>
        <span style={{ color: 'var(--text-faint)' }}>
          <ChevronIcon open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
function Sidebar({
  activeCategory, setActiveCategory,
  activePrices, setActivePrices,
  activeBadges, setActiveBadges,
  onClearAll,
}) {
  const hasFilters = activeCategory !== 'All' || activePrices.length > 0 || activeBadges.length > 0

  const togglePrice = (label) =>
    setActivePrices(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )

  const toggleBadge = (badge) =>
    setActiveBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    )

  return (
    <aside style={{
      width: '210px', flexShrink: 0,
      position: 'sticky', top: '80px', alignSelf: 'flex-start',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '28px',
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', color: 'var(--text)', letterSpacing: '0.06em',
        }}>
          FILTERS
        </span>
        {hasFilters && (
          <button
            onClick={onClearAll}
            style={{
              background: 'transparent', border: 'none',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)',
              cursor: 'pointer',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterAccordion title="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {['All', ...categories.filter(c => c !== 'All')].map(cat => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: active ? 'var(--accent-soft)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  fontWeight: active ? 500 : 300, transition: 'color 0.2s',
                }}>
                  {cat}
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', color: 'var(--text-faint)',
                }}>
                  {cat === 'All'
                    ? products.length
                    : products.filter(p => p.category === cat).length}
                </span>
              </button>
            )
          })}
        </div>
      </FilterAccordion>

      {/* Price */}
      <FilterAccordion title="Price Range">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {priceRanges.map(range => {
            const active = activePrices.includes(range.label)
            return (
              <button
                key={range.label}
                onClick={() => togglePrice(range.label)}
                style={{
                  background: 'transparent', border: 'none',
                  display: 'flex', alignItems: 'center',
                  gap: '10px', padding: '6px 0', cursor: 'pointer',
                }}
              >
                <span style={{
                  width: '14px', height: '14px', flexShrink: 0,
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
                  background: active ? 'var(--accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {active && (
                    <span style={{ color: '#0C0B09', fontSize: '9px', fontWeight: 700 }}>✓</span>
                  )}
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                  color: active ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: active ? 400 : 300, transition: 'color 0.2s',
                }}>
                  {range.label}
                </span>
              </button>
            )
          })}
        </div>
      </FilterAccordion>

      {/* Tags */}
      <FilterAccordion title="Tags" defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['New', 'Hot', 'Sale'].map(badge => {
            const active = activeBadges.includes(badge)
            return (
              <button
                key={badge}
                onClick={() => toggleBadge(badge)}
                style={{
                  background: 'transparent', border: 'none',
                  display: 'flex', alignItems: 'center',
                  gap: '10px', padding: '6px 0', cursor: 'pointer',
                }}
              >
                <span style={{
                  width: '14px', height: '14px', flexShrink: 0,
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
                  background: active ? 'var(--accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {active && (
                    <span style={{ color: '#0C0B09', fontSize: '9px', fontWeight: 700 }}>✓</span>
                  )}
                </span>
                <span style={{
                  padding: '3px 10px', fontSize: '10px',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 500,
                  opacity: active ? 1 : 0.5, transition: 'opacity 0.2s',
                  ...badgeStyles[badge],
                }}>
                  {badge}
                </span>
              </button>
            )
          })}
        </div>
      </FilterAccordion>
    </aside>
  )
}

// ─────────────────────────────────────────────
// ACTIVE FILTER TAGS
// ─────────────────────────────────────────────
function ActiveFilters({
  activeCategory, activePrices, activeBadges,
  setActiveCategory, setActivePrices, setActiveBadges,
}) {
  const tags = [
    ...(activeCategory !== 'All'
      ? [{ label: activeCategory, remove: () => setActiveCategory('All') }]
      : []),
    ...activePrices.map(p => ({
      label: p,
      remove: () => setActivePrices(prev => prev.filter(x => x !== p)),
    })),
    ...activeBadges.map(b => ({
      label: b,
      remove: () => setActiveBadges(prev => prev.filter(x => x !== b)),
    })),
  ]

  if (!tags.length) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
      {tags.map((tag) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px',
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent)',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 400,
          }}
        >
          {tag.label}
          <button
            onClick={tag.remove}
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--accent)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', padding: 0,
            }}
          >
            <CloseIcon />
          </button>
        </motion.span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT CARD — GRID
// ─────────────────────────────────────────────
function ProductCardGrid({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(201,164,74,0.1)' : 'none',
      }}
    >
      {/* Image — click goes to product page */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div style={{
          position: 'relative', aspectRatio: '3/4',
          overflow: 'hidden', background: 'var(--bg-surface)',
        }}>
          {/* Placeholder */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px', color: 'rgba(201,164,74,0.06)',
              letterSpacing: '0.2em',
            }}>
              {product.category}
            </span>
          </div>

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            onError={e => { e.target.style.display = 'none' }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', transition: 'transform 0.7s',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(12,11,9,0.9) 0%, transparent 55%)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
            display: 'flex', alignItems: 'flex-end', padding: '16px',
          }}>
            <button
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                addItem(product)
              }}
              style={{
                width: '100%', background: 'var(--accent)',
                color: '#0C0B09', border: 'none', padding: '12px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 500,
                cursor: 'pointer', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Add to Bag
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              padding: '4px 10px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
              ...badgeStyles[product.badge],
            }}>
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              onWishlist(product.id)
            }}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '32px', height: '32px',
              background: 'rgba(12,11,9,0.7)',
              border: '1px solid rgba(237,232,223,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              opacity: hovered || wishlisted ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <HeartIcon filled={wishlisted} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', display: 'block', padding: '14px 16px' }}
      >
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
          marginBottom: '5px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', color: 'var(--text)',
          marginBottom: '8px', letterSpacing: '0.04em', lineHeight: 1.2,
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
            fontSize: '9px', color: 'var(--text-faint)',
          }}>
            In stock
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT CARD — LIST
// ─────────────────────────────────────────────
function ProductCardList({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '20px', alignItems: 'stretch',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        overflow: 'hidden', transition: 'border-color 0.3s',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <Link
        to={`/product/${product.id}`}
        style={{
          position: 'relative', width: '130px', flexShrink: 0,
          overflow: 'hidden', background: 'var(--bg-surface)',
          textDecoration: 'none',
        }}
      >
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.6s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            padding: '3px 8px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '8px', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            ...badgeStyles[product.badge],
          }}>
            {product.badge}
          </span>
        )}
      </Link>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 20px 20px 0',
      }}>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none' }}
        >
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--text-faint)',
            marginBottom: '6px',
          }}>
            {product.category}
          </p>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '20px', color: 'var(--text)',
            letterSpacing: '0.04em', marginBottom: '6px',
          }}>
            {product.name}
          </h3>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', color: 'var(--text-faint)', fontWeight: 300,
          }}>
            In stock · Free shipping over $200
          </p>
        </Link>

        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '16px', flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '22px', color: 'var(--accent)',
          }}>
            ${product.price}
          </span>
          <button
            onClick={() => onWishlist(product.id)}
            style={{
              width: '36px', height: '36px', background: 'transparent',
              border: `1px solid ${wishlisted ? 'var(--accent)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}
          >
            <HeartIcon filled={wishlisted} />
          </button>
          <button
            onClick={() => addItem(product)}
            style={{
              background: hovered ? 'var(--accent)' : 'transparent',
              border: '1px solid var(--accent)',
              color: hovered ? '#0C0B09' : 'var(--accent)',
              padding: '10px 22px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SHOP BANNER
// ─────────────────────────────────────────────
function ShopBanner() {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      padding: '56px 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Gold glow */}
      <div style={{
        position: 'absolute', top: '-50%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,164,74,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ghost text */}
      <div style={{
        position: 'absolute', right: '-10px', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '180px', lineHeight: 1,
        color: 'rgba(201,164,74,0.04)',
        letterSpacing: '-0.03em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        SHOP
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '8px', marginBottom: '20px',
        }}>
          {['Home', '/', 'Shop'].map((c, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: i === 2 ? 'var(--accent)' : 'var(--text-faint)',
              fontWeight: i === 2 ? 400 : 300,
            }}>
              {c}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              width: '40px', height: '3px',
              background: 'var(--accent)', marginBottom: '16px',
            }} />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(52px, 7vw, 90px)',
                color: 'var(--text)', lineHeight: 0.92,
                letterSpacing: '0.01em', margin: 0,
              }}
            >
              ALL<br />
              <span style={{ color: 'var(--accent)' }}>DROPS</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontSize: '15px',
              color: 'var(--text-muted)',
              maxWidth: '280px', textAlign: 'right', lineHeight: 1.6,
            }}
          >
            Every piece is built for those who refuse to follow the crowd.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN SHOP PAGE
// ─────────────────────────────────────────────
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePrices,   setActivePrices]   = useState([])
  const [activeBadges,   setActiveBadges]   = useState([])
  const [sortBy,         setSortBy]         = useState('newest')
  const [viewMode,       setViewMode]       = useState('grid')
  const [wishlist,       setWishlist]       = useState([])
  const [sortOpen,       setSortOpen]       = useState(false)

  const toggleWishlist = id =>
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const clearAll = () => {
    setActiveCategory('All')
    setActivePrices([])
    setActiveBadges([])
  }

  const filtered = products.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false
    if (activeBadges.length && !activeBadges.includes(p.badge)) return false
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
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ShopBanner />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 80px' }}>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <Sidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activePrices={activePrices}
            setActivePrices={setActivePrices}
            activeBadges={activeBadges}
            setActiveBadges={setActiveBadges}
            onClearAll={clearAll}
          />

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '20px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px', color: 'var(--text-faint)', fontWeight: 300,
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                  {sorted.length}
                </span> products
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* View toggle */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[
                    { mode: 'grid', Icon: GridIcon },
                    { mode: 'list', Icon: ListIcon },
                  ].map(({ mode, Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      style={{
                        width: '34px', height: '34px',
                        background: viewMode === mode ? 'var(--accent-soft)' : 'transparent',
                        border: `1px solid ${viewMode === mode ? 'var(--accent)' : 'var(--border)'}`,
                        color: viewMode === mode ? 'var(--accent)' : 'var(--text-faint)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      <Icon />
                    </button>
                  ))}
                </div>

                {/* Sort dropdown */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setSortOpen(v => !v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      padding: '8px 14px', cursor: 'pointer',
                      color: 'var(--text-muted)',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px', letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    {sortOptions.find(s => s.value === sortBy)?.label}
                    <ChevronIcon open={sortOpen} />
                  </button>

                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          minWidth: '180px', zIndex: 50,
                        }}
                      >
                        {sortOptions.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                            style={{
                              width: '100%', border: 'none',
                              padding: '11px 16px', textAlign: 'left',
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: '11px', letterSpacing: '0.1em',
                              textTransform: 'uppercase', cursor: 'pointer',
                              color: sortBy === opt.value ? 'var(--accent)' : 'var(--text-muted)',
                              background: sortBy === opt.value
                                ? 'var(--accent-soft)' : 'transparent',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'var(--accent-soft)'
                              e.currentTarget.style.color = 'var(--accent)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = sortBy === opt.value
                                ? 'var(--accent-soft)' : 'transparent'
                              e.currentTarget.style.color = sortBy === opt.value
                                ? 'var(--accent)' : 'var(--text-muted)'
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            <ActiveFilters
              activeCategory={activeCategory}
              activePrices={activePrices}
              activeBadges={activeBadges}
              setActiveCategory={setActiveCategory}
              setActivePrices={setActivePrices}
              setActiveBadges={setActiveBadges}
            />

            {/* Grid / List / Empty */}
            <AnimatePresence mode="wait">
              {sorted.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '100px 0', gap: '16px',
                  }}
                >
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '60px', color: 'rgba(201,164,74,0.06)',
                    letterSpacing: '0.06em',
                  }}>
                    NO RESULTS
                  </span>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                  }}>
                    No products match your filters
                  </p>
                  <button
                    onClick={clearAll}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)', padding: '10px 24px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '10px', letterSpacing: '0.2em',
                      textTransform: 'uppercase', cursor: 'pointer',
                      marginTop: '8px', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent)'
                      e.currentTarget.style.color = '#0C0B09'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '14px',
                  }}
                >
                  {sorted.map((product, i) => (
                    <ProductCardGrid
                      key={product.id}
                      product={product}
                      index={i}
                      wishlisted={wishlist.includes(product.id)}
                      onWishlist={toggleWishlist}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  {sorted.map((product, i) => (
                    <ProductCardList
                      key={product.id}
                      product={product}
                      index={i}
                      wishlisted={wishlist.includes(product.id)}
                      onWishlist={toggleWishlist}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  )
}
