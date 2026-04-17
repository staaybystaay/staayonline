import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories } from '../data/products'
import useCartStore from '../store/useCartStore'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8.5" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M9 4h5M9 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M1 3h13M3 7h9M5.5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? '#c8a44a' : 'none'}>
    <path d="M7 12S1.5 8.4 1.5 4.8A3 3 0 0 1 7 3a3 3 0 0 1 5.5 1.8C12.5 8.4 7 12 7 12z"
      stroke="#c8a44a" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const sortOptions = [
  { label: 'Newest First',   value: 'newest'     },
  { label: 'Price: Low–High',value: 'price_asc'  },
  { label: 'Price: High–Low',value: 'price_desc' },
  { label: 'Name A–Z',       value: 'name_asc'   },
]

const priceRanges = [
  { label: 'Under $150',     min: 0,   max: 150  },
  { label: '$150 – $300',    min: 150, max: 300  },
  { label: '$300 – $500',    min: 300, max: 500  },
  { label: '$500 and above', min: 500, max: Infinity },
]

const badgeStyles = {
  New:  { background: '#c8a44a',  color: '#050505' },
  Hot:  { background: 'transparent', color: '#c8a44a', border: '1px solid #c8a44a' },
  Sale: { background: '#c0392b',  color: '#fff' },
}

// ─────────────────────────────────────────────
// FILTER ACCORDION
// ─────────────────────────────────────────────
function FilterAccordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(244,240,232,0.07)', paddingBottom: '20px', marginBottom: '20px' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', padding: '0 0 16px',
        }}
      >
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '10px',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(244,240,232,0.5)', fontWeight: 400,
        }}>
          {title}
        </span>
        <span style={{ color: 'rgba(244,240,232,0.4)' }}>
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
function Sidebar({ activeCategory, setActiveCategory, activePrices, setActivePrices, activeBadges, setActiveBadges, onClearAll }) {
  const togglePrice = (label) =>
    setActivePrices(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )

  const toggleBadge = (badge) =>
    setActiveBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    )

  const hasFilters = activeCategory !== 'All' || activePrices.length > 0 || activeBadges.length > 0

  return (
    <aside style={{
      width: '220px', flexShrink: 0,
      position: 'sticky', top: '80px',
      alignSelf: 'flex-start',
    }}>
      {/* Sidebar header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'rgba(244,240,232,0.4)' }}><FilterIcon /></span>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '13px', color: '#f4f0e8', letterSpacing: '0.04em',
          }}>
            FILTERS
          </span>
        </div>
        {hasFilters && (
          <button
            onClick={onClearAll}
            style={{
              background: 'transparent', border: 'none',
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#c8a44a', cursor: 'pointer',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category filter */}
      <FilterAccordion title="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {['All', ...categories.filter(c => c !== 'All')].map(cat => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: 'transparent', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background: active ? 'rgba(200,164,74,0.08)' : 'transparent',
                  borderLeft: active ? '2px solid #c8a44a' : '2px solid transparent',
                }}
              >
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                  color: active ? '#c8a44a' : 'rgba(244,240,232,0.5)',
                  fontWeight: active ? 500 : 300,
                  transition: 'color 0.2s',
                }}>
                  {cat}
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                  color: 'rgba(244,240,232,0.2)',
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

      {/* Price filter */}
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
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '6px 0', cursor: 'pointer',
                }}
              >
                <span style={{
                  width: '14px', height: '14px', flexShrink: 0,
                  border: `1px solid ${active ? '#c8a44a' : 'rgba(244,240,232,0.2)'}`,
                  background: active ? '#c8a44a' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {active && <span style={{ color: '#050505', fontSize: '9px', fontWeight: 700 }}>✓</span>}
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                  color: active ? '#f4f0e8' : 'rgba(244,240,232,0.45)',
                  fontWeight: active ? 400 : 300,
                  transition: 'color 0.2s',
                }}>
                  {range.label}
                </span>
              </button>
            )
          })}
        </div>
      </FilterAccordion>

      {/* Badge filter */}
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
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '6px 0', cursor: 'pointer',
                }}
              >
                <span style={{
                  width: '14px', height: '14px', flexShrink: 0,
                  border: `1px solid ${active ? '#c8a44a' : 'rgba(244,240,232,0.2)'}`,
                  background: active ? '#c8a44a' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {active && <span style={{ color: '#050505', fontSize: '9px', fontWeight: 700 }}>✓</span>}
                </span>
                <span style={{
                  padding: '3px 10px', fontSize: '10px',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  ...badgeStyles[badge],
                  opacity: active ? 1 : 0.5,
                  transition: 'opacity 0.2s',
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
// PRODUCT CARD (grid)
// ─────────────────────────────────────────────
function ProductCardGrid({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', background: '#0e0e0e',
        border: `1px solid ${hovered ? 'rgba(200,164,74,0.22)' : 'rgba(244,240,232,0.06)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#1a1a1a' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg,
            #${['1a1200','0e1a0e','1a0e1a','0e0e1a','1a1a0e','0e1a1a','1a0e0e','120e1a'][product.id % 8]}
            0%, #111 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: '9px',
            letterSpacing: '0.3em', color: 'rgba(244,240,232,0.08)',
            textTransform: 'uppercase',
          }}>
            {product.category}
          </span>
        </div>

        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.7s',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        /> </Link>

        {/* Hover overlay + CTA */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.94) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
          display: 'flex', alignItems: 'flex-end', padding: '16px',
        }}>
          <button
            onClick={e => { e.stopPropagation(); addItem(product) }}
            style={{
              width: '100%', background: '#c8a44a', color: '#050505',
              border: 'none', padding: '11px',
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = '#f4f0e8' }}
            onMouseLeave={e => { e.target.style.background = '#c8a44a' }}
          >
            Add to Cart
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '4px 10px',
            fontFamily: "'Outfit', sans-serif", fontSize: '9px',
            letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
            ...badgeStyles[product.badge],
          }}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); onWishlist(product.id) }}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '32px', height: '32px',
            background: 'rgba(5,5,5,0.65)',
            border: '1px solid rgba(244,240,232,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', opacity: hovered || wishlisted ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '9px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(244,240,232,0.28)', marginBottom: '5px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '13px', color: '#f4f0e8', marginBottom: '8px',
          letterSpacing: '-0.01em', lineHeight: 1.3,
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '17px', color: '#c8a44a',
          }}>
            ${product.price}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '9px',
            color: 'rgba(244,240,232,0.18)', letterSpacing: '0.1em',
          }}>
            In stock
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT CARD (list view)
// ─────────────────────────────────────────────
function ProductCardList({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '24px', alignItems: 'stretch',
        background: '#0e0e0e',
        border: `1px solid ${hovered ? 'rgba(200,164,74,0.22)' : 'rgba(244,240,232,0.06)'}`,
        overflow: 'hidden', transition: 'border-color 0.3s',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '140px', flexShrink: 0, overflow: 'hidden', background: '#1a1a1a' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg,
            #${['1a1200','0e1a0e','1a0e1a','0e0e1a','1a1a0e','0e1a1a','1a0e0e','120e1a'][product.id % 8]}
            0%, #111 100%)`,
        }} />
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.6s',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            padding: '3px 8px',
            fontFamily: "'Outfit', sans-serif", fontSize: '8px',
            letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
            ...badgeStyles[product.badge],
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 20px 0' }}>
        <div>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '9px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(244,240,232,0.28)', marginBottom: '6px',
          }}>
            {product.category}
          </p>
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '16px', color: '#f4f0e8', marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}>
            {product.name}
          </h3>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '11px',
            color: 'rgba(244,240,232,0.3)', fontWeight: 300,
          }}>
            In stock · Free shipping over $200
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '22px', color: '#c8a44a',
          }}>
            ${product.price}
          </span>

          <button
            onClick={e => { e.stopPropagation(); onWishlist(product.id) }}
            style={{
              width: '36px', height: '36px',
              background: 'transparent',
              border: `1px solid ${wishlisted ? 'rgba(200,164,74,0.5)' : 'rgba(244,240,232,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}
          >
            <HeartIcon filled={wishlisted} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); addItem(product) }}
            style={{
              background: hovered ? '#c8a44a' : 'transparent',
              border: '1px solid rgba(200,164,74,0.4)',
              color: hovered ? '#050505' : '#c8a44a',
              padding: '10px 22px',
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ACTIVE FILTER TAGS
// ─────────────────────────────────────────────
function ActiveFilters({ activeCategory, activePrices, activeBadges, setActiveCategory, setActivePrices, setActiveBadges }) {
  const tags = [
    ...(activeCategory !== 'All' ? [{ label: activeCategory, remove: () => setActiveCategory('All') }] : []),
    ...activePrices.map(p => ({ label: p, remove: () => setActivePrices(prev => prev.filter(x => x !== p)) })),
    ...activeBadges.map(b => ({ label: b,  remove: () => setActiveBadges(prev => prev.filter(x => x !== b)) })),
  ]
  if (!tags.length) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
      {tags.map((tag, i) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px',
            background: 'rgba(200,164,74,0.08)',
            border: '1px solid rgba(200,164,74,0.25)',
            fontFamily: "'Outfit', sans-serif", fontSize: '10px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#c8a44a', fontWeight: 400,
          }}
        >
          {tag.label}
          <button
            onClick={tag.remove}
            style={{
              background: 'transparent', border: 'none',
              color: '#c8a44a', cursor: 'pointer',
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
// SHOP PAGE HERO BANNER (inspo: fash2 + fash3)
// ─────────────────────────────────────────────
function ShopBanner() {
  return (
    <div style={{
      background: '#0a0a0a',
      borderBottom: '1px solid rgba(244,240,232,0.05)',
      padding: '56px 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ghost text like fash2 */}
      <div style={{
        position: 'absolute', right: '-20px', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: '160px', lineHeight: 1,
        color: 'rgba(200,164,74,0.04)', letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        SHOP
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '20px',
        }}>
          {['Home', '/', 'Shop'].map((crumb, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: i === 2 ? '#c8a44a' : 'rgba(244,240,232,0.25)',
              fontWeight: i === 2 ? 400 : 300,
            }}>
              {crumb}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(42px, 6vw, 76px)',
                color: '#f4f0e8', lineHeight: 0.95,
                letterSpacing: '-0.03em', margin: 0,
              }}
            >
              ALL<br />
              <span style={{ color: '#c8a44a' }}>DROPS</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic', fontSize: '16px',
              color: 'rgba(244,240,232,0.35)',
              maxWidth: '300px', textAlign: 'right',
              lineHeight: 1.6,
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
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const clearAll = () => {
    setActiveCategory('All')
    setActivePrices([])
    setActiveBadges([])
  }

  // Filter
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

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
    return b.id - a.id
  })

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <ShopBanner />

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '48px 80px' }}>
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
              justifyContent: 'space-between', marginBottom: '24px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                color: 'rgba(244,240,232,0.35)', fontWeight: 300,
              }}>
                <span style={{ color: '#c8a44a', fontWeight: 500 }}>{sorted.length}</span> products
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* View toggle */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[{ mode: 'grid', Icon: GridIcon }, { mode: 'list', Icon: ListIcon }].map(({ mode, Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      style={{
                        width: '34px', height: '34px',
                        background: viewMode === mode ? 'rgba(200,164,74,0.1)' : 'transparent',
                        border: `1px solid ${viewMode === mode ? 'rgba(200,164,74,0.3)' : 'rgba(244,240,232,0.1)'}`,
                        color: viewMode === mode ? '#c8a44a' : 'rgba(244,240,232,0.35)',
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
                      border: '1px solid rgba(244,240,232,0.1)',
                      padding: '8px 14px', cursor: 'pointer',
                      color: 'rgba(244,240,232,0.6)',
                      fontFamily: "'Outfit', sans-serif", fontSize: '11px',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      transition: 'border-color 0.2s',
                    }}
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
                          background: '#111', border: '1px solid rgba(244,240,232,0.1)',
                          minWidth: '180px', zIndex: 50, overflow: 'hidden',
                        }}
                      >
                        {sortOptions.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                            style={{
                              width: '100%', background: 'transparent', border: 'none',
                              padding: '11px 16px', textAlign: 'left',
                              fontFamily: "'Outfit', sans-serif", fontSize: '11px',
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: sortBy === opt.value ? '#c8a44a' : 'rgba(244,240,232,0.5)',
                              cursor: 'pointer',
                              background: sortBy === opt.value ? 'rgba(200,164,74,0.07)' : 'transparent',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => { e.target.style.background = 'rgba(244,240,232,0.04)' }}
                            onMouseLeave={e => { e.target.style.background = sortBy === opt.value ? 'rgba(200,164,74,0.07)' : 'transparent' }}
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

            {/* Grid or List */}
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
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '48px', color: 'rgba(244,240,232,0.06)' }}>∅</span>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,240,232,0.25)' }}>
                    No products match your filters
                  </p>
                  <button
                    onClick={clearAll}
                    style={{
                      background: 'transparent', border: '1px solid rgba(200,164,74,0.3)',
                      color: '#c8a44a', padding: '10px 24px',
                      fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'pointer', marginTop: '8px',
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
                    gap: '16px',
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
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
