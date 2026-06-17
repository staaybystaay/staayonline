import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import useFavoritesStore from '../store/useFavoritesStore'
import { supabase } from '../lib/supabase'
import QuickView from '../components/QuickView'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

const SIZES  = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const COLORS_FILTER = [
  { name: 'Black',  hex: '#1A1612' },
  { name: 'White',  hex: '#F7F5F2' },
  { name: 'Gold',   hex: '#B8903A' },
  { name: 'Navy',   hex: '#1E3A5F' },
  { name: 'Pink',   hex: '#F4A7B9' },
  { name: 'Brown',  hex: '#8B6348' },
  { name: 'Nude',   hex: '#C8A882' },
  { name: 'Green',  hex: '#4A7C59' },
]

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular'    },
  { label: 'Newest',       value: 'newest'     },
  { label: 'Price: Low',   value: 'price_asc'  },
  { label: 'Price: High',  value: 'price_desc' },
  { label: 'Name A–Z',     value: 'name_asc'   },
]

const DISCOUNTS = { 0: -20, 1: null, 2: -20, 3: -19, 4: null, 5: -33, 6: -25, 7: -20, 8: null, 9: -15 }

// ─── Icons ───────────────────────────────────
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M7 4h8M7 9h8M7 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const ChevronIcon = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

function Stars({ score = 0 }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill={i <= score ? G : '#E0DBD5'} stroke="none">
          <path d="M5 1l1 3h3L6.5 6l1 3L5 7.5 2.5 9l1-3L1 4h3z"/>
        </svg>
      ))}
    </div>
  )
}

// ─── Price Range Slider ───────────────────────
function PriceSlider({ min, max, value, onChange }) {
  const trackRef = useRef()

  function handleMin(e) {
    const v = Math.min(Number(e.target.value), value[1] - 100)
    onChange([v, value[1]])
  }
  function handleMax(e) {
    const v = Math.max(Number(e.target.value), value[0] + 100)
    onChange([value[0], v])
  }

  const pctMin = ((value[0] - min) / (max - min)) * 100
  const pctMax = ((value[1] - min) / (max - min)) * 100

  return (
    <div>
      <div style={{ position: 'relative', height: '20px', marginBottom: '10px' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: BR, transform: 'translateY(-50%)', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', top: '50%', left: `${pctMin}%`, right: `${100 - pctMax}%`, height: '4px', background: G, transform: 'translateY(-50%)', borderRadius: '2px' }} />
        <input type="range" min={min} max={max} step={100} value={value[0]} onChange={handleMin}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={100} value={value[1]} onChange={handleMax}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%', zIndex: 1 }} />
        {/* Thumbs */}
        {[pctMin, pctMax].map((pct, i) => (
          <div key={i} style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: '16px', height: '16px', borderRadius: '50%', background: G, border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', pointerEvents: 'none' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', ...F, fontSize: '11px', color: MD }}>
        <span>Min: GH₵{value[0].toLocaleString()}</span>
        <span>Max: GH₵{value[1].toLocaleString()}</span>
      </div>
    </div>
  )
}

// ─── Sidebar Section ─────────────────────────
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: `1px solid ${BR}`, paddingBottom: '16px', marginBottom: '16px' }}>
      <button onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', padding: '0 0 12px', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 700, color: DK, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {title} <ChevronIcon open={open} />
      </button>
      {open && children}
    </div>
  )
}

// ─── Product Card ─────────────────────────────
function ProductCard({ product, index, viewMode, onQuickView }) {
  const [hovered, setHovered] = useState(false)
  const addItem     = useCartStore(s => s.addItem)
  const toggle      = useFavoritesStore(s => s.toggle)
  const isFavorited = useFavoritesStore(s => s.isFavorited)
  const faved       = isFavorited(product.id)
  const discount    = DISCOUNTS[index % 10]
  const origPrice   = discount ? Math.round(product.price / (1 - Math.abs(discount) / 100)) : null

  if (viewMode === 'list') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        style={{ display: 'flex', background: W, border: `1px solid ${hovered ? '#CCC' : BR}`, transition: 'border-color 0.2s', overflow: 'hidden' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ width: '130px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: LG }}>
          <img src={product.image_url} alt={product.name} onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '160px' }} />
          {discount && <div style={{ position: 'absolute', top: '8px', left: '8px', background: RD, color: W, padding: '2px 7px', borderRadius: '3px', ...F, fontSize: '11px', fontWeight: 700 }}>{discount}%</div>}
        </div>
        <div style={{ flex: 1, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ ...F, fontSize: '10px', color: G, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{product.collection?.name}</p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 600, color: DK, marginBottom: '6px' }}>{product.name}</p>
            <Stars score={0} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK }}>GH₵{Number(product.price).toLocaleString()}</p>
              {origPrice && <p style={{ ...F, fontSize: '13px', color: FT, textDecoration: 'line-through' }}>GH₵{origPrice.toLocaleString()}</p>}
            </div>
            <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
              style={{ background: BK, color: W, border: 'none', padding: '10px 20px', ...F, fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = G }}
              onMouseLeave={e => { e.currentTarget.style.background = BK }}>
              Add to Bag
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: W }}>

      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden', marginBottom: '10px' }}>
        <img src={product.image_url} alt={product.name} onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />

        {/* Discount badge */}
        {discount && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: RD, color: W, padding: '4px 10px', borderRadius: '4px', ...F, fontSize: '12px', fontWeight: 700 }}>
            {discount}%
          </div>
        )}

        {/* Heart */}
        <button onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.12)', fontSize: '16px', color: faved ? RD : '#CCC', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = RD; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.color = faved ? RD : '#CCC'; e.currentTarget.style.transform = 'scale(1)' }}>
          {faved ? '♥' : '♡'}
        </button>

        {/* Hover buttons */}
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
              style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', gap: '6px' }}>
              <button onClick={() => onQuickView(product)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.1"/><path d="M1 5.5s1.5-3.5 4.5-3.5 4.5 3.5 4.5 3.5-1.5 3.5-4.5 3.5S1 5.5 1 5.5z" stroke="currentColor" strokeWidth="1.1"/></svg>
                Quick View
              </button>
              <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
                style={{ flex: 1, background: DK, border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = DK }}>
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <Stars score={0} />
          <span style={{ ...F, fontSize: '11px', color: FT }}>(0)</span>
        </div>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '2px', lineHeight: 1.3 }}>{product.name}</p>
        <p style={{ ...F, fontSize: '11px', color: MD, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>{product.collection?.name}</p>

       {/* Colors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <span style={{ ...F, fontSize: '11px', color: MD }}>Colors:</span>
          {[G, '#1A1612'].slice(0, index % 2 === 0 ? 2 : 1).map((c, i) => (
            <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: c, border: '1.5px solid #fff', boxShadow: '0 0 0 1px #ddd' }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>GH₵{Number(product.price).toLocaleString()}</span>
          {origPrice && <span style={{ ...F, fontSize: '12px', color: FT, textDecoration: 'line-through' }}>GH₵{origPrice.toLocaleString()}</span>}
        </div>

        <div style={{ display: 'inline-block', background: '#FFF9C4', border: '1px solid #F6E05E', padding: '2px 8px', borderRadius: '3px', ...F, fontSize: '10px', fontWeight: 600, color: '#744210' }}>
          Only {(index % 4) + 1} left in stock
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN SHOP ────────────────────────────────
// ─── Reusable Filter Panel (desktop sidebar + mobile drawer) ──
function FilterPanel({ sortedLength, collectionPills, activeCol, setActiveCol, sortBy, setSortBy, priceRange, setPriceRange, selSizes, setSelSizes, selColors, setSelColors, showClear, onClear }) {
  return (
    <>
      <p style={{ ...F, fontSize: '14px', fontWeight: 800, color: DK, marginBottom: '4px', letterSpacing: '0.02em' }}>Refine By</p>
      <p style={{ ...F, fontSize: '12px', color: MD, marginBottom: '20px' }}>{sortedLength} products</p>

      {/* Collections */}
      <Section title="Collections">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {collectionPills.map(col => (
            <button key={col.slug} onClick={() => setActiveCol(col.slug)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '9px 10px', background: activeCol === col.slug ? GL : 'transparent', border: 'none', borderLeft: `3px solid ${activeCol === col.slug ? G : 'transparent'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', width: '100%' }}
              onMouseEnter={e => { if (activeCol !== col.slug) e.currentTarget.style.background = LG }}
              onMouseLeave={e => { if (activeCol !== col.slug) e.currentTarget.style.background = 'transparent' }}>
              <span style={{ ...F, fontSize: '13px', fontWeight: activeCol === col.slug ? 600 : 400, color: activeCol === col.slug ? G : DK }}>{col.name}</span>
              {col.subtitle && <span style={{ ...F, fontSize: '11px', fontWeight: 300, color: activeCol === col.slug ? G : FT, marginTop: '1px' }}>{col.subtitle}</span>}
            </button>
          ))}
        </div>
      </Section>

      {/* Sort by (mobile) */}
      <Section title="Sort By">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ width: '100%', padding: '9px 12px', border: `1px solid ${BR}`, background: W, ...F, fontSize: '13px', color: DK, cursor: 'pointer', outline: 'none' }}>
          {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div style={{ padding: '4px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...F, fontSize: '12px', color: MD, marginBottom: '12px' }}>
            <span>GH₵0</span><span>GH₵5,000</span>
          </div>
          <PriceSlider min={0} max={5000} value={priceRange} onChange={setPriceRange} />
        </div>
      </Section>

      {/* Size */}
      <Section title="Size" defaultOpen={false}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {SIZES.map(s => {
            const sel = selSizes.includes(s)
            return (
              <button key={s} onClick={() => setSelSizes(prev => sel ? prev.filter(x => x !== s) : [...prev, s])}
                style={{ padding: '6px 12px', border: `1px solid ${sel ? G : BR}`, background: sel ? GL : W, ...F, fontSize: '12px', fontWeight: sel ? 700 : 400, color: sel ? G : DK, cursor: 'pointer', transition: 'all 0.15s' }}>
                {s}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colors" defaultOpen={false}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {COLORS_FILTER.map(c => {
            const sel = selColors.includes(c.name)
            return (
              <button key={c.name} onClick={() => setSelColors(prev => sel ? prev.filter(x => x !== c.name) : [...prev, c.name])}
                title={c.name}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.hex, border: `2px solid ${sel ? G : '#ddd'}`, outline: sel ? `2px solid ${G}` : 'none', outlineOffset: '2px', transition: 'all 0.2s' }} />
                <span style={{ ...F, fontSize: '9px', color: sel ? G : MD, fontWeight: sel ? 600 : 300 }}>{c.name}</span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* Clear */}
      {showClear && (
        <button onClick={onClear}
          style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
          Clear All Filters
        </button>
      )}
    </>
  )
}

export default function Shop() {
  const location = useLocation()
  const [products,    setProducts]    = useState([])
  const [collections, setCollections] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [activeCol,   setActiveCol]   = useState('all')
  const [sortBy,      setSortBy]      = useState('newest')
  const [viewMode,    setViewMode]    = useState('grid')
  const [priceRange,  setPriceRange]  = useState([0, 5000])
  const [selSizes,    setSelSizes]    = useState([])
  const [selColors,   setSelColors]   = useState([])
  const [sortOpen,    setSortOpen]    = useState(false)
  const [qvProduct,   setQvProduct]   = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Read collection from URL param
  useEffect(() => {
    const col = new URLSearchParams(location.search).get('col')
    if (col) setActiveCol(col)
  }, [location.search])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [{ data: cols }, { data: prods }] = await Promise.all([
        supabase.from('collections').select('*').eq('active', true).order('created_at', { ascending: true }),
        supabase.from('products').select('*, collection:collections(id, slug, name)').eq('active', true).order('sort_order', { ascending: true }),
      ])
      if (cols) setCollections(cols)
      if (prods) setProducts(prods)
      setLoading(false)
    }
    load()
  }, [])

  const activeColObj = collections.find(c => c.slug === activeCol)

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (activeCol !== 'all' && p.collection?.slug !== activeCol) return false
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false
      return true
    })
  }, [products, activeCol, priceRange])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
      return (a.sort_order || 0) - (b.sort_order || 0)
    })
  }, [filtered, sortBy])

  const collectionPills = [{ slug: 'all', name: 'All Collections' }, ...collections]

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '28px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', color: DK, fontWeight: 500 }}>Shop</span>
            {activeColObj && (<><span style={{ color: FT }}>/</span><span style={{ ...F, fontSize: '12px', color: G, fontWeight: 500 }}>{activeColObj.name}</span></>)}
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {activeCol === 'all' ? 'All Collections' : activeColObj?.name || ''}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h1 style={{ ...F, fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              {activeCol === 'all' ? 'Shop All Collections' : activeColObj?.name}
            </h1>
            {!loading && <p style={{ ...F, fontSize: '13px', color: MD }}>{sorted.length} {sorted.length === 1 ? 'product' : 'products'} found</p>}
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '0 40px', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', height: '52px', gap: '0' }}>

          {/* Collection pills */}
          <div className="hide-scroll" style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1, overflowX: 'auto', paddingRight: '16px', borderRight: `1px solid ${BR}`, marginRight: '16px' }}>
            {collectionPills.map(col => (
              <button key={col.slug} onClick={() => setActiveCol(col.slug)}
                style={{ flexShrink: 0, padding: '5px 16px', background: activeCol === col.slug ? BK : 'transparent', border: `1px solid ${activeCol === col.slug ? BK : BR}`, color: activeCol === col.slug ? W : DK, ...F, fontSize: '12px', fontWeight: activeCol === col.slug ? 600 : 400, cursor: 'pointer', borderRadius: '100px', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (activeCol !== col.slug) e.currentTarget.style.borderColor = DK }}
                onMouseLeave={e => { if (activeCol !== col.slug) e.currentTarget.style.borderColor = BR }}>
                {col.name}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button onClick={() => setSortOpen(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 14px', height: '52px', background: 'transparent', border: 'none', borderRight: `1px solid ${BR}`, ...F, fontSize: '12px', color: DK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
              <ChevronIcon open={sortOpen} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 48 }} onClick={() => setSortOpen(false)} />
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    style={{ position: 'absolute', top: '100%', right: 0, zIndex: 49, minWidth: '180px', background: W, border: `1px solid ${BR}`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                        style={{ width: '100%', textAlign: 'left', padding: '11px 16px', border: 'none', borderBottom: `1px solid ${BR}`, background: sortBy === opt.value ? LG : W, ...F, fontSize: '13px', fontWeight: sortBy === opt.value ? 600 : 400, color: sortBy === opt.value ? G : DK, cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.background = LG }}
                        onMouseLeave={e => { e.currentTarget.style.background = sortBy === opt.value ? LG : W }}>
                        {sortBy === opt.value && '✓ '}{opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Filters button — mobile only */}
          <button onClick={() => setMobileFiltersOpen(true)} className="mobile-only"
            style={{ display: 'none', alignItems: 'center', gap: '6px', padding: '0 14px', height: '52px', background: 'transparent', border: 'none', borderRight: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <FilterIcon /> Filters
          </button>

          {/* View mode */}
          <div style={{ display: 'flex' }}>
            {[{ mode: 'grid', Icon: GridIcon }, { mode: 'list', Icon: ListIcon }].map(({ mode, Icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                style={{ width: '48px', height: '52px', background: viewMode === mode ? BK : 'transparent', border: 'none', borderLeft: `1px solid ${BR}`, color: viewMode === mode ? W : MD, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s' }}>
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px 96px', display: 'flex', gap: '32px' }}>

        {/* ── SIDEBAR ── */}
        <aside className="desktop-only" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '64px', alignSelf: 'flex-start', display: 'block' }}>
          <FilterPanel
            sortedLength={sorted.length}
            collectionPills={collectionPills}
            activeCol={activeCol} setActiveCol={setActiveCol}
            sortBy={sortBy} setSortBy={setSortBy}
            priceRange={priceRange} setPriceRange={setPriceRange}
            selSizes={selSizes} setSelSizes={setSelSizes}
            selColors={selColors} setSelColors={setSelColors}
            showClear={activeCol !== 'all' || priceRange[0] > 0 || priceRange[1] < 5000 || selSizes.length > 0 || selColors.length > 0}
            onClear={() => { setActiveCol('all'); setPriceRange([0, 5000]); setSelSizes([]); setSelColors([]) }}
          />
        </aside>

        {/* ── PRODUCTS ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '12px', background: LG, margin: '10px 0 6px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '16px', background: LG, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              ))}
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
            </div>
          ) : sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No products found</p>
              <p style={{ ...F, fontSize: '14px', color: MD }}>Try adjusting your filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
              {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} viewMode="grid" onQuickView={setQvProduct} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} viewMode="list" onQuickView={setQvProduct} />)}
            </div>
          )}
        </div>
      </div>

      {/* Quick View */}
      <AnimatePresence>
        {qvProduct && <QuickView product={qvProduct} onClose={() => setQvProduct(null)} />}
      </AnimatePresence>

      {/* ── MOBILE FILTERS DRAWER ── */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.5)' }} />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '300px', maxWidth: '88vw', zIndex: 301, background: W, display: 'flex', flexDirection: 'column' }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
                <h3 style={{ ...F, fontSize: '15px', fontWeight: 800, color: DK, letterSpacing: '0.02em' }}>Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)}
                  style={{ width: '32px', height: '32px', border: `1px solid ${BR}`, background: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '14px', color: MD }}>
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                <FilterPanel
                  sortedLength={sorted.length}
                  collectionPills={collectionPills}
                  activeCol={activeCol} setActiveCol={(c) => { setActiveCol(c); }}
                  sortBy={sortBy} setSortBy={setSortBy}
                  priceRange={priceRange} setPriceRange={setPriceRange}
                  selSizes={selSizes} setSelSizes={setSelSizes}
                  selColors={selColors} setSelColors={setSelColors}
                  showClear={activeCol !== 'all' || priceRange[0] > 0 || priceRange[1] < 5000 || selSizes.length > 0 || selColors.length > 0}
                  onClear={() => { setActiveCol('all'); setPriceRange([0, 5000]); setSelSizes([]); setSelColors([]) }}
                />
              </div>

              <div style={{ padding: '16px 20px', borderTop: `1px solid ${BR}`, flexShrink: 0 }}>
                <button onClick={() => setMobileFiltersOpen(false)}
                  style={{ width: '100%', padding: '13px', background: BK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Show {sorted.length} {sorted.length === 1 ? 'Result' : 'Results'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
