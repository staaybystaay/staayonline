import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─── DESIGN TOKENS ───────────────────────────
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
const RD  = '#B91C1C'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── DATA ────────────────────────────────────
const SORT_OPTIONS = [
  { label: 'Newest',        value: 'newest'      },
  { label: 'Price: Low',    value: 'price_asc'   },
  { label: 'Price: High',   value: 'price_desc'  },
  { label: 'Name A–Z',      value: 'name_asc'    },
]

const PRICE_RANGES = [
  { label: 'Under $150',    min: 0,   max: 150       },
  { label: '$150 – $300',   min: 150, max: 300        },
  { label: '$300 – $500',   min: 300, max: 500        },
  { label: '$500+',         min: 500, max: Infinity   },
]

const CATS = ['All', ...categories.filter(c => c !== 'All')]

// ─── ICONS ───────────────────────────────────
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 4h6M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <rect x="1" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 3h14M4 8h8M7 13h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

// ─── PRODUCT CARD — GRID ─────────────────────
function ProductCardGrid({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        {/* Image */}
        <div style={{
          position: 'relative', aspectRatio: '3/4',
          background: B2, overflow: 'hidden', marginBottom: '10px',
        }}>
          {/* Placeholder */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...F, fontSize: '11px', color: FT }}>{product.category}</span>
          </div>

          <img
            src={product.image} alt={product.name}
            onError={e => { e.target.style.display = 'none' }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              background: product.badge === 'Sale' ? RD : BK,
              color: W, padding: '4px 10px',
              ...F, fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); onWishlist(product.id) }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: W, border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '16px',
              color: wishlisted ? RD : DK,
              opacity: hovered || wishlisted ? 1 : 0,
              transition: 'opacity 0.25s',
              boxShadow: '0 1px 6px rgba(17,17,17,0.14)',
            }}>
            {wishlisted ? '♥' : '♡'}
          </button>

          {/* Add to bag */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: BK,
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s',
          }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{
                width: '100%', padding: '12px', background: 'transparent',
                border: 'none', color: W, cursor: 'pointer',
                ...F, fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
              Add to Bag
            </button>
          </div>
        </div>

        {/* Info */}
        <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: FT, marginBottom: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {product.category}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ ...F, fontSize: '14px', fontWeight: 500, color: DK }}>
            {product.name}
          </p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: G, flexShrink: 0 }}>
            ${product.price}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── PRODUCT CARD — LIST ─────────────────────
function ProductCardList({ product, index, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '0',
        background: W,
        border: `1px solid ${hovered ? DK : BR}`,
        transition: 'border-color 0.2s',
        overflow: 'hidden',
      }}>

      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        style={{ display: 'block', width: '140px', flexShrink: 0, textDecoration: 'none', position: 'relative', overflow: 'hidden', background: B2 }}>
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            position: 'absolute', inset: 0,
          }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            background: product.badge === 'Sale' ? RD : BK,
            color: W, padding: '3px 8px',
            ...F, fontSize: '9px', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {product.badge}
          </span>
        )}
      </Link>

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '20px 24px',
        gap: '16px',
      }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: FT, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {product.category}
          </p>
          <h3 style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, marginBottom: '6px', letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>
          <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>
            In stock · Free shipping over $200
          </p>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: G }}>${product.price}</p>
          <button
            onClick={() => onWishlist(product.id)}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: wishlisted ? '#FEE2E2' : OW,
              border: `1px solid ${wishlisted ? RD : BR}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '15px',
              color: wishlisted ? RD : MD,
              transition: 'all 0.2s',
            }}>
            {wishlisted ? '♥' : '♡'}
          </button>
          <button
            onClick={() => addItem(product)}
            style={{
              background: hovered ? G : BK,
              border: 'none', color: W,
              padding: '10px 20px', cursor: 'pointer',
              ...F, fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'background 0.2s', whiteSpace: 'nowrap',
            }}>
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN SHOP PAGE ──────────────────────────
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePrices,   setActivePrices]   = useState([])
  const [sortBy,         setSortBy]         = useState('newest')
  const [viewMode,       setViewMode]       = useState('grid')
  const [sortOpen,       setSortOpen]       = useState(false)
  const [wishlist,       setWishlist]       = useState([])
  const [mobileFilter,   setMobileFilter]   = useState(false)

  const toggleWishlist = id =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const togglePrice = label =>
    setActivePrices(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])

  const clearAll = () => { setActiveCategory('All'); setActivePrices([]) }

  const filtered = products.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false
    if (activePrices.length) {
      const ok = activePrices.some(label => {
        const r = PRICE_RANGES.find(x => x.label === label)
        return r && p.price >= r.min && p.price < r.max
      })
      if (!ok) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
    return b.id - a.id
  })

  const hasFilters = activeCategory !== 'All' || activePrices.length > 0

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background: OW,
        borderBottom: `1px solid ${BR}`,
        padding: '40px 64px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link
              to="/"
              style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              Home
            </Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Shop</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                All Products
              </p>
              <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Shop All Drops
              </h1>
            </div>
            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>
              {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
      </div>

      {/* ── FILTER + SORT TOOLBAR ── */}
      <div style={{
        background: W,
        borderBottom: `1px solid ${BR}`,
        padding: '0 64px',
        position: 'sticky', top: '0', zIndex: 40,
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'flex', alignItems: 'stretch',
          height: '52px',
        }}>

          {/* Category pills */}
          <div
            className="hide-scroll"
            style={{
              display: 'flex', alignItems: 'center',
              gap: '6px', flex: 1, overflowX: 'auto',
              borderRight: `1px solid ${BR}`, paddingRight: '16px', marginRight: '16px',
            }}>
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: '6px 16px',
                  background: activeCategory === cat ? BK : 'transparent',
                  border: `1px solid ${activeCategory === cat ? BK : BR}`,
                  color: activeCategory === cat ? W : DK,
                  ...F, fontSize: '12px', fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: 'pointer', borderRadius: '100px',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = DK
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = BR
                  }
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Right side — price filter + sort + view */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>

            {/* Price filter dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSortOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0 16px', height: '52px',
                  background: activePrices.length ? GL : 'transparent',
                  border: 'none',
                  borderLeft: `1px solid ${BR}`,
                  ...F, fontSize: '12px', fontWeight: 400,
                  color: activePrices.length ? G : DK,
                  cursor: 'pointer', transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}>
                <FilterIcon />
                Price
                {activePrices.length > 0 && (
                  <span style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: G, color: W,
                    ...F, fontSize: '9px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {activePrices.length}
                  </span>
                )}
                <ChevronDown />
              </button>
            </div>

            {/* Sort dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSortOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0 16px', height: '52px',
                  background: 'transparent', border: 'none',
                  borderLeft: `1px solid ${BR}`,
                  ...F, fontSize: '12px', fontWeight: 400, color: DK,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                <ChevronDown />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 48 }}
                      onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: '100%', right: 0,
                        zIndex: 49, minWidth: '180px',
                        background: W, border: `1px solid ${BR}`,
                        boxShadow: '0 8px 24px rgba(17,17,17,0.1)',
                      }}>
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                          style={{
                            width: '100%', textAlign: 'left',
                            padding: '11px 16px', border: 'none',
                            borderBottom: `1px solid ${BR}`,
                            background: sortBy === opt.value ? OW : W,
                            ...F, fontSize: '13px', fontWeight: sortBy === opt.value ? 600 : 400,
                            color: sortBy === opt.value ? G : DK,
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = OW }}
                          onMouseLeave={e => { e.currentTarget.style.background = sortBy === opt.value ? OW : W }}>
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', borderLeft: `1px solid ${BR}` }}>
              {[
                { mode: 'grid', Icon: GridIcon },
                { mode: 'list', Icon: ListIcon },
              ].map(({ mode, Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    width: '48px', height: '52px',
                    background: viewMode === mode ? BK : 'transparent',
                    border: 'none', borderLeft: mode === 'list' ? `1px solid ${BR}` : 'none',
                    color: viewMode === mode ? W : MD,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.18s',
                  }}>
                  <Icon />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── ACTIVE FILTER TAGS ── */}
      {hasFilters && (
        <div style={{
          background: W, borderBottom: `1px solid ${BR}`,
          padding: '10px 64px',
        }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto',
            display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
          }}>
            <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: MD }}>
              Filters:
            </span>
            {activeCategory !== 'All' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 10px', background: GL,
                border: `1px solid ${G}`,
                ...F, fontSize: '11px', fontWeight: 500, color: G,
                borderRadius: '100px',
              }}>
                {activeCategory}
                <button
                  onClick={() => setActiveCategory('All')}
                  style={{
                    background: 'none', border: 'none',
                    color: G, cursor: 'pointer', padding: 0,
                    fontSize: '14px', lineHeight: 1, display: 'flex',
                  }}>
                  ×
                </button>
              </span>
            )}
            {activePrices.map(p => (
              <span
                key={p}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '4px 10px', background: GL,
                  border: `1px solid ${G}`,
                  ...F, fontSize: '11px', fontWeight: 500, color: G,
                  borderRadius: '100px',
                }}>
                {p}
                <button
                  onClick={() => togglePrice(p)}
                  style={{
                    background: 'none', border: 'none',
                    color: G, cursor: 'pointer', padding: 0,
                    fontSize: '14px', lineHeight: 1, display: 'flex',
                  }}>
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              style={{
                background: 'none', border: 'none',
                ...F, fontSize: '11px', fontWeight: 500, color: MD,
                cursor: 'pointer', textDecoration: 'underline',
                textUnderlineOffset: '2px', padding: '4px 0',
              }}>
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '40px 64px 96px', display: 'flex', gap: '40px',
      }}>

        {/* ── SIDEBAR FILTERS ── */}
        <aside style={{
          width: '220px', flexShrink: 0,
          position: 'sticky', top: '64px', alignSelf: 'flex-start',
        }}>

          <div style={{ marginBottom: '32px' }}>
            <p style={{
              ...F, fontSize: '12px', fontWeight: 700, color: DK,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '14px',
              paddingBottom: '10px', borderBottom: `1px solid ${BR}`,
            }}>
              Category
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {CATS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: activeCategory === cat ? GL : 'transparent',
                    border: 'none',
                    borderLeft: `2px solid ${activeCategory === cat ? G : 'transparent'}`,
                    ...F, fontSize: '13px', fontWeight: activeCategory === cat ? 600 : 400,
                    color: activeCategory === cat ? G : MD,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = OW
                      e.currentTarget.style.color = DK
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = MD
                    }
                  }}>
                  {cat}
                  <span style={{ ...F, fontSize: '11px', color: FT }}>
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <p style={{
              ...F, fontSize: '12px', fontWeight: 700, color: DK,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '14px',
              paddingBottom: '10px', borderBottom: `1px solid ${BR}`,
            }}>
              Price
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PRICE_RANGES.map(range => {
                const active = activePrices.includes(range.label)
                return (
                  <label
                    key={range.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      cursor: 'pointer', padding: '6px 0',
                    }}>
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => togglePrice(range.label)}
                      style={{
                        width: '15px', height: '15px',
                        accentColor: G, cursor: 'pointer',
                      }}
                    />
                    <span style={{
                      ...F, fontSize: '13px', fontWeight: active ? 600 : 400,
                      color: active ? DK : MD,
                    }}>
                      {range.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearAll}
              style={{
                width: '100%', padding: '10px',
                background: 'transparent', border: `1px solid ${BR}`,
                ...F, fontSize: '12px', fontWeight: 500, color: MD,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
              Clear Filters
            </button>
          )}

        </aside>

        {/* ── PRODUCT AREA ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

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
                  padding: '100px 0', gap: '16px', textAlign: 'center',
                }}>
                <p style={{ ...F, fontSize: '48px', fontWeight: 800, color: BR, letterSpacing: '-0.03em' }}>
                  No Results
                </p>
                <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>
                  No products match your current filters.
                </p>
                <button
                  onClick={clearAll}
                  style={{
                    marginTop: '8px', padding: '12px 28px',
                    background: BK, color: W, border: 'none',
                    ...F, fontSize: '13px', fontWeight: 600,
                    letterSpacing: '0.04em', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = G }}
                  onMouseLeave={e => { e.currentTarget.style.background = BK }}>
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
                  gap: '32px 20px',
                }}>
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
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
  )
}  
               
