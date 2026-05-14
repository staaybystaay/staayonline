import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

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

const COLLECTIONS = [
  { id: 'all',  label: 'All Collections', sub: null                    },
  { id: 'eden', label: 'Eden Collection', sub: 'Where beauty begins'   },
  { id: 'love', label: 'The Love Edit',   sub: 'Pieces made with love' },
  { id: 'bold', label: 'Bold & Beautiful',sub: 'Make your statement'   },
]

const edenProducts = [
  { id: 'e1',  name: 'ARI',     price: 1650, image: '/Ari.jpeg',     collection: 'eden', badge: 'New' },
  { id: 'e2',  name: 'MIRA',    price: 1950, image: '/Mira.jpeg',    collection: 'eden', badge: 'New' },
  { id: 'e3',  name: 'VERA',    price: 1700, image: '/Vera.jpeg',    collection: 'eden', badge: 'New' },
  { id: 'e4',  name: 'SOLENNE', price: 2600, image: '/Solenne.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e5',  name: 'AYLA',    price: 1900, image: '/Ayla.jpeg',    collection: 'eden', badge: 'New' },
  { id: 'e6',  name: 'AURA',    price: 2900, image: '/Aura.jpeg',    collection: 'eden', badge: 'New' },
  { id: 'e7',  name: 'KAIA',    price: 2900, image: '/Kaia.png',     collection: 'eden', badge: 'New' },
  { id: 'e8',  name: 'EVE',     price: 2400, image: '/Eve.png',      collection: 'eden', badge: 'New' },
  { id: 'e9',  name: 'ELARA',   price: 2400, image: '/Elara.jpeg',   collection: 'eden', badge: 'New' },
  { id: 'e10', name: 'DAHLIA',  price: 2200, image: '/Dahlia.jpeg',  collection: 'eden', badge: 'New' },
]

const loveProducts = [
  { id: 'l1', name: 'AMOR',  price: 2900, image: '/Amor.jpeg',  collection: 'love', badge: 'New' },
  { id: 'l2', name: 'LIEBE', price: 1900, image: '/Liebe.jpeg', collection: 'love', badge: 'New' },
  { id: 'l3', name: 'ODO',   price: 2200, image: '/Odo.jpeg',   collection: 'love', badge: 'New' },
]

const boldProducts = [
  { id: 'b1',  name: 'ZURI',  price: 3500, image: '/Zuri.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b2',  name: 'NYAH',  price: 2600, image: '/Nyah.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b3',  name: 'ZAYA',  price: 1900, image: '/Zaya.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b4',  name: 'LOIS',  price: 1450, image: '/Lois.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b5',  name: 'ZARA',  price: 2200, image: '/Zara.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b6',  name: 'ARIA',  price: 2400, image: '/Aria.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b7',  name: 'NOVA',  price: 2900, image: '/Nova.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b8',  name: 'AMARA', price: 2200, image: '/Amara.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b9',  name: 'ESME',  price: 2700, image: '/Esme.jpeg',  collection: 'bold', badge: 'New' },
  { id: 'b10', name: 'SADE',  price: 1900, image: '/Sade.jpeg',  collection: 'bold', badge: 'New' },
]

const allProducts = [...edenProducts, ...loveProducts, ...boldProducts]

const SORT_OPTIONS = [
  { label: 'Newest',      value: 'newest'     },
  { label: 'Price: Low',  value: 'price_asc'  },
  { label: 'Price: High', value: 'price_desc' },
  { label: 'Name A–Z',    value: 'name_asc'   },
]

const PRICE_RANGES = [
  { label: 'Under GH₵1,500',        min: 0,    max: 1500    },
  { label: 'GH₵1,500 – GH₵2,000',  min: 1500, max: 2000    },
  { label: 'GH₵2,000 – GH₵2,500',  min: 2000, max: 2500    },
  { label: 'GH₵2,500+',            min: 2500, max: Infinity },
]

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

function ComingSoon({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 0', gap: '16px', textAlign: 'center',
      }}>
      <div style={{
        width: '64px', height: '64px', background: GL, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', marginBottom: '8px',
      }}>
        ✦
      </div>
      <h3 style={{ ...F, fontSize: '28px', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>
        Coming Soon
      </h3>
      <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, maxWidth: '320px', lineHeight: 1.65 }}>
        The <strong>{label}</strong> collection is on its way. Check back soon.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '8px', padding: '12px 28px',
          background: BK, color: W,
          ...F, fontSize: '13px', fontWeight: 600,
          letterSpacing: '0.04em', display: 'inline-block',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = G }}
        onMouseLeave={e => { e.currentTarget.style.background = BK }}>
        Back to Home
      </Link>
    </motion.div>
  )
}

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
      <div>
        <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '10px' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...F, fontSize: '11px', color: FT }}>Eden</span>
          </div>
          <img
            src={product.image} alt={product.name}
            onError={e => { e.target.style.display = 'none' }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: G, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            New
          </span>
          <button
            onClick={() => onWishlist(product.id)}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: W, border: 'none', cursor: 'pointer', fontSize: '16px',
              color: wishlisted ? RD : DK,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered || wishlisted ? 1 : 0, transition: 'opacity 0.25s',
              boxShadow: '0 1px 6px rgba(17,17,17,0.14)',
            }}>
            {wishlisted ? '♥' : '♡'}
          </button>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, background: BK,
            transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s',
          }}>
            <button
              onClick={() => addItem({ ...product, category: 'Eden Collection' })}
              style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Add to Bag
            </button>
          </div>
        </div>
        <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, marginBottom: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Eden Collection
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{product.name}</p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK, flexShrink: 0 }}>GH₵{product.price.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  )
}

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
      style={{ display: 'flex', background: W, border: `1px solid ${hovered ? DK : BR}`, transition: 'border-color 0.2s', overflow: 'hidden' }}>
      <div style={{ width: '140px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: B2 }}>
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)', position: 'absolute', inset: 0 }}
        />
        <span style={{ position: 'absolute', top: '8px', left: '8px', background: G, color: W, padding: '3px 8px', ...F, fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>New</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Eden Collection</p>
          <h3 style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, marginBottom: '6px', letterSpacing: '-0.01em' }}>{product.name}</h3>
          <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>In stock · Free shipping on eligible orders</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK }}>GH₵{product.price.toLocaleString()}</p>
          <button
            onClick={() => onWishlist(product.id)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: wishlisted ? '#FEE2E2' : OW, border: `1px solid ${wishlisted ? RD : BR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '15px', color: wishlisted ? RD : MD, transition: 'all 0.2s' }}>
            {wishlisted ? '♥' : '♡'}
          </button>
          <button
            onClick={() => addItem({ ...product, category: 'Eden Collection' })}
            style={{ background: hovered ? G : BK, border: 'none', color: W, padding: '10px 20px', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s', whiteSpace: 'nowrap' }}>
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Shop() {
  const [activeCollection, setActiveCollection] = useState('all')
  const [activePrices,     setActivePrices]     = useState([])
  const [sortBy,           setSortBy]           = useState('newest')
  const [viewMode,         setViewMode]         = useState('grid')
  const [sortOpen,         setSortOpen]         = useState(false)
  const [wishlist,         setWishlist]         = useState([])

  const activeCol  = COLLECTIONS.find(c => c.id === activeCollection)
  const hasProducts = activeCollection === 'all' || activeCollection === 'eden' || activeCollection === 'love' || activeCollection === 'bold'

  const toggleWishlist = id => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const togglePrice    = label => setActivePrices(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  const clearAll       = () => { setActiveCollection('all'); setActivePrices([]) }

  const filtered = hasProducts ? allProducts.filter(p => {
    if (activeCollection !== 'all' && p.collection !== activeCollection) return false
    if (activePrices.length) {
      const ok = activePrices.some(label => {
        const r = PRICE_RANGES.find(x => x.label === label)
        return r && p.price >= r.min && p.price < r.max
      })
      if (!ok) return false
    }
    return true
  }) : []

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
    return 0
  })

  const hasFilters = activeCollection !== 'all' || activePrices.length > 0

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      <div style={{ background: OW, borderBottom: `1px solid ${BR}`, padding: '40px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Shop</span>
            {activeCollection !== 'all' && (
              <>
                <span style={{ color: FT, fontSize: '12px' }}>/</span>
                <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: G }}>{activeCol?.label}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {activeCollection === 'all' ? 'All Collections' : 'Collection'}
              </p>
              <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: activeCol?.sub && activeCollection !== 'all' ? '6px' : '0' }}>
                {activeCollection === 'all' ? 'Shop All Collections' : activeCol?.label}
              </h1>
              {activeCol?.sub && activeCollection !== 'all' && (
                <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>{activeCol.sub}</p>
              )}
            </div>
            {hasProducts && <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>{sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}</p>}
          </div>
        </div>
      </div>

      <div style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '0 64px', position: 'sticky', top: '0', zIndex: 40 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'stretch', height: '52px' }}>
          <div className="hide-scroll" style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, overflowX: 'auto', borderRight: `1px solid ${BR}`, paddingRight: '16px', marginRight: '16px' }}>
            {COLLECTIONS.map(col => (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                style={{
                  flexShrink: 0, padding: '6px 16px',
                  background: activeCollection === col.id ? BK : 'transparent',
                  border: `1px solid ${activeCollection === col.id ? BK : BR}`,
                  color: activeCollection === col.id ? W : DK,
                  ...F, fontSize: '12px', fontWeight: activeCollection === col.id ? 600 : 400,
                  cursor: 'pointer', borderRadius: '100px', transition: 'all 0.18s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (activeCollection !== col.id) e.currentTarget.style.borderColor = DK }}
                onMouseLeave={e => { if (activeCollection !== col.id) e.currentTarget.style.borderColor = BR }}>
                {col.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', height: '52px', background: activePrices.length ? GL : 'transparent', border: 'none', borderLeft: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 400, color: activePrices.length ? G : DK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <FilterIcon />Price{activePrices.length > 0 && <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: G, color: W, ...F, fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activePrices.length}</span>}<ChevronDown />
            </button>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', height: '52px', background: 'transparent', border: 'none', borderLeft: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 400, color: DK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}<ChevronDown />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 48 }} onClick={() => setSortOpen(false)} />
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} style={{ position: 'absolute', top: '100%', right: 0, zIndex: 49, minWidth: '180px', background: W, border: `1px solid ${BR}`, boxShadow: '0 8px 24px rgba(17,17,17,0.1)' }}>
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false) }} style={{ width: '100%', textAlign: 'left', padding: '11px 16px', border: 'none', borderBottom: `1px solid ${BR}`, background: sortBy === opt.value ? OW : W, ...F, fontSize: '13px', fontWeight: sortBy === opt.value ? 600 : 400, color: sortBy === opt.value ? G : DK, cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = OW }} onMouseLeave={e => { e.currentTarget.style.background = sortBy === opt.value ? OW : W }}>
                          {opt.value === sortBy ? '✓ ' : ''}{opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div style={{ display: 'flex', borderLeft: `1px solid ${BR}` }}>
              {[{ mode: 'grid', Icon: GridIcon }, { mode: 'list', Icon: ListIcon }].map(({ mode, Icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{ width: '48px', height: '52px', background: viewMode === mode ? BK : 'transparent', border: 'none', borderLeft: mode === 'list' ? `1px solid ${BR}` : 'none', color: viewMode === mode ? W : MD, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s' }}>
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hasFilters && (
        <div style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '10px 64px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: MD }}>Filters:</span>
            {activeCollection !== 'all' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: GL, border: `1px solid ${G}`, ...F, fontSize: '11px', fontWeight: 500, color: G, borderRadius: '100px' }}>
                {activeCol?.label}
                <button onClick={() => setActiveCollection('all')} style={{ background: 'none', border: 'none', color: G, cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1 }}>×</button>
              </span>
            )}
            {activePrices.map(p => (
              <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: GL, border: `1px solid ${G}`, ...F, fontSize: '11px', fontWeight: 500, color: G, borderRadius: '100px' }}>
                {p}<button onClick={() => togglePrice(p)} style={{ background: 'none', border: 'none', color: G, cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1 }}>×</button>
              </span>
            ))}
            <button onClick={clearAll} style={{ background: 'none', border: 'none', ...F, fontSize: '11px', fontWeight: 500, color: MD, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: '4px 0' }}>Clear all</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 64px 96px', display: 'flex', gap: '40px' }}>

        <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '64px', alignSelf: 'flex-start' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: DK, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px', paddingBottom: '10px', borderBottom: `1px solid ${BR}` }}>Collections</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {COLLECTIONS.map(col => (
                <button key={col.id} onClick={() => setActiveCollection(col.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', background: activeCollection === col.id ? GL : 'transparent', border: 'none', borderLeft: `2px solid ${activeCollection === col.id ? G : 'transparent'}`, ...F, cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s' }} onMouseEnter={e => { if (activeCollection !== col.id) e.currentTarget.style.background = OW }} onMouseLeave={e => { if (activeCollection !== col.id) e.currentTarget.style.background = 'transparent' }}>
                  <span style={{ fontSize: '13px', fontWeight: activeCollection === col.id ? 600 : 400, color: activeCollection === col.id ? G : DK }}>{col.label}</span>
                  {col.sub && <span style={{ fontSize: '11px', fontWeight: 300, color: activeCollection === col.id ? G : FT, marginTop: '1px' }}>{col.sub}</span>}
                </button>
              ))}
            </div>
          </div>

          {hasProducts && (
            <div style={{ marginBottom: '32px' }}>
              <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: DK, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px', paddingBottom: '10px', borderBottom: `1px solid ${BR}` }}>Price</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {PRICE_RANGES.map(range => {
                  const active = activePrices.includes(range.label)
                  return (
                    <label key={range.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 0' }}>
                      <input type="checkbox" checked={active} onChange={() => togglePrice(range.label)} style={{ width: '15px', height: '15px', accentColor: G, cursor: 'pointer' }} />
                      <span style={{ ...F, fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? DK : MD }}>{range.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {hasFilters && (
            <button onClick={clearAll} style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }} onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>Clear Filters</button>
          )}
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {activeCollection !== 'all' && hasProducts && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ background: GL, border: `1px solid ${BR}`, borderLeft: `3px solid ${G}`, padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>Collection</p>
                <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>{activeCol?.label}</p>
                {activeCol?.sub && <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginTop: '2px' }}>{activeCol.sub}</p>}
              </div>
              <button onClick={() => setActiveCollection('all')} style={{ background: 'transparent', border: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 500, color: MD, padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }} onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>View All</button>
            </motion.div>
          )}

          {!hasProducts ? (
            <ComingSoon label={activeCol?.label} />
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 20px' }}>
                  {sorted.map((product, i) => (
                    <ProductCardGrid key={product.id} product={product} index={i} wishlisted={wishlist.includes(product.id)} onWishlist={toggleWishlist} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sorted.map((product, i) => (
                    <ProductCardList key={product.id} product={product} index={i} wishlisted={wishlist.includes(product.id)} onWishlist={toggleWishlist} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}
