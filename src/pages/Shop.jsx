import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { useWishlist } from '../hooks/useWishlist'
import { imgCard, imgThumb } from '../lib/images'
import { supabase } from '../lib/supabase'
import MiniCurrencyPicker from '../components/MiniCurrencyPicker'

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

const SORT_OPTIONS = [
  { label: 'Newest',      value: 'newest'     },
  { label: 'Price: Low',  value: 'price_asc'  },
  { label: 'Price: High', value: 'price_desc' },
  { label: 'Name A–Z',    value: 'name_asc'   },
]

const PRICE_RANGES = [
  { label: 'Under GH₵1,500',       min: 0,    max: 1500    },
  { label: 'GH₵1,500 – GH₵2,000', min: 1500, max: 2000    },
  { label: 'GH₵2,000 – GH₵2,500', min: 2000, max: 2500    },
  { label: 'GH₵2,500+',           min: 2500, max: Infinity },
]

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

// ─── SKELETON ────────────────────────────────
function Skeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 20px' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div style={{
            aspectRatio: '3/4', background: BR,
            borderRadius: '2px', marginBottom: '10px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{ height: '10px', background: BR, borderRadius: '2px', marginBottom: '6px', width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: '14px', background: BR, borderRadius: '2px', width: '80%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

// ─── COMING SOON ─────────────────────────────
function ComingSoon({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', gap: '16px', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', background: GL, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '8px' }}>✦</div>
      <h3 style={{ ...F, fontSize: '28px', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>Coming Soon</h3>
      <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, maxWidth: '320px', lineHeight: 1.65 }}>
        The <strong>{label}</strong> collection is on its way. Check back soon.
      </p>
      <Link to="/" style={{ marginTop: '8px', padding: '12px 28px', background: BK, color: W, ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', display: 'inline-block', transition: 'background 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = G }}
        onMouseLeave={e => { e.currentTarget.style.background = BK }}>
        Back to Home
      </Link>
    </motion.div>
  )
}

// ─── PRODUCT CARD — GRID ─────────────────────
function ProductCardGrid({ product }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isFavorited } = useWishlist()
  const wishlisted = isFavorited(product.id)
  const onWishlist = () => toggle(product)
  const discount      = product.discount_percent || null
  const originalPrice = discount ? Math.round(product.price / (1 - discount / 100)) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div>
        <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '10px' }}>
          <img
            src={imgCard(product.image_url)} alt={product.name}
            loading="lazy" decoding="async"
            onError={e => { e.target.style.display = 'none' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {discount ? (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: RD, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 700 }}>
              -{discount}%
            </span>
          ) : product.badge && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: G, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {product.badge}
            </span>
          )}
          <button
            onClick={() => onWishlist(product.id)}
            style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', fontSize: '16px', color: wishlisted ? RD : DK, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered || wishlisted ? 1 : 0, transition: 'opacity 0.25s', boxShadow: '0 1px 6px rgba(17,17,17,0.14)' }}>
            {wishlisted ? '♥' : '♡'}
          </button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: BK, transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s' }}>
            <button
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
              style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Add to Bag
            </button>
          </div>
        </div>
        <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, marginBottom: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {product.collection?.name}
        </p>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '6px' }}>{product.name}</p>
        <MiniCurrencyPicker ghs={product.price} priceStyle={{ fontSize: '14px' }} strikethrough={originalPrice} />
      </div>
    </motion.div>
  )
}

// ─── PRODUCT CARD — LIST ─────────────────────
function ProductCardList({ product }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isFavorited } = useWishlist()
  const wishlisted = isFavorited(product.id)
  const onWishlist = () => toggle(product)
  const discount      = product.discount_percent || null
  const originalPrice = discount ? Math.round(product.price / (1 - discount / 100)) : null

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', background: W, border: `1px solid ${hovered ? DK : BR}`, transition: 'border-color 0.2s', overflow: 'hidden' }}>
      <div style={{ width: '140px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: B2 }}>
        <img src={imgThumb(product.image_url)} alt={product.name} loading="lazy" decoding="async" onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)', position: 'absolute', inset: 0 }} />
        {discount ? (
          <span style={{ position: 'absolute', top: '8px', left: '8px', background: RD, color: W, padding: '3px 8px', ...F, fontSize: '9px', fontWeight: 700 }}>-{discount}%</span>
        ) : product.badge && (
          <span style={{ position: 'absolute', top: '8px', left: '8px', background: G, color: W, padding: '3px 8px', ...F, fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{product.badge}</span>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{product.collection?.name}</p>
          <h3 style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, marginBottom: '6px', letterSpacing: '-0.01em' }}>{product.name}</h3>
          <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>{product.in_stock ? 'In stock' : 'Out of stock'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <MiniCurrencyPicker ghs={product.price} priceStyle={{ fontSize: '18px' }} strikethrough={originalPrice} />
          <button onClick={() => onWishlist(product.id)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: wishlisted ? '#FEE2E2' : OW, border: `1px solid ${wishlisted ? RD : BR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '15px', color: wishlisted ? RD : MD, transition: 'all 0.2s' }}>
            {wishlisted ? '♥' : '♡'}
          </button>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
            style={{ background: hovered ? G : BK, border: 'none', color: W, padding: '10px 20px', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s', whiteSpace: 'nowrap' }}>
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN SHOP PAGE ──────────────────────────
export default function Shop() {
  const location = useLocation()
  const navigate  = useNavigate()
  const [collections,      setCollections]      = useState([])
  const [products,         setProducts]         = useState([])
  const [loading,          setLoading]          = useState(true)
  const [activeCollection, setActiveCollection] = useState('all')
  const [activePrices,     setActivePrices]     = useState([])
  const [sortBy,           setSortBy]           = useState('newest')
  const [viewMode,         setViewMode]         = useState('grid')
  const [sortOpen,         setSortOpen]         = useState(false)
  const [visibleCount,     setVisibleCount]     = useState(12)

  // Sync active collection from URL ?col= param (used by navbar links & mobile drawer)
  useEffect(() => {
    const col = new URLSearchParams(location.search).get('col')
    setActiveCollection(col || 'all')
    setVisibleCount(12)
  }, [location.search])
  // Fetch collections + products together
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [colRes, prodRes] = await Promise.all([
          supabase.from('collections').select('*').eq('active', true).order('created_at', { ascending: true }),
          supabase.from('products').select('*, collection:collections(id, slug, name)').eq('active', true).order('sort_order', { ascending: true }),
        ])
        if (colRes.data) setCollections(colRes.data)
        if (prodRes.data) setProducts(prodRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const activeCol = collections.find(c => c.slug === activeCollection)

  const togglePrice    = label => { setActivePrices(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]); setVisibleCount(12) }
  const clearAll       = () => { navigate('/shop'); setActivePrices([]); setVisibleCount(12) }
  const setCollection  = (slug) => { navigate(slug === 'all' ? '/shop' : `/shop?col=${slug}`) }

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (activeCollection !== 'all' && p.collection?.slug !== activeCollection) return false
      if (activePrices.length) {
        const ok = activePrices.some(label => {
          const r = PRICE_RANGES.find(x => x.label === label)
          return r && p.price >= r.min && p.price < r.max
        })
        if (!ok) return false
      }
      return true
    })
  }, [products, activeCollection, activePrices])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'name_asc')   return a.name.localeCompare(b.name)
      return (a.sort_order ?? 0) - (b.sort_order ?? 0)
    })
  }, [filtered, sortBy])

  const hasFilters = activeCollection !== 'all' || activePrices.length > 0

  // Collections for the pills — "All" + db collections
  const collectionPills = [
    { slug: 'all', name: 'All Collections' },
    ...collections,
  ]

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding shop-header" style={{ background: OW, borderBottom: `1px solid ${BR}`, padding: '40px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Shop</span>
            {activeCollection !== 'all' && activeCol && (
              <>
                <span style={{ color: FT, fontSize: '12px' }}>/</span>
                <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: G }}>{activeCol.name}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {activeCollection === 'all' ? 'All Collections' : 'Collection'}
              </p>
              <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: activeCol?.subtitle && activeCollection !== 'all' ? '6px' : '0' }}>
                {activeCollection === 'all' ? 'Shop All Collections' : activeCol?.name}
              </h1>
              {activeCol?.subtitle && activeCollection !== 'all' && (
                <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>{activeCol.subtitle}</p>
              )}
            </div>
            {!loading && (
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>
                {sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="shop-toolbar" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '0 64px', position: 'sticky', top: '0', zIndex: 40 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'stretch', height: '52px' }}>

          {/* Collection pills */}
          <div className="hide-scroll" style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, overflowX: 'auto', borderRight: `1px solid ${BR}`, paddingRight: '16px', marginRight: '16px' }}>
            {collectionPills.map(col => (
              <button
                key={col.slug}
                onClick={() => setActiveCollection(col.slug)}
                style={{ flexShrink: 0, padding: '6px 16px', background: activeCollection === col.slug ? BK : 'transparent', border: `1px solid ${activeCollection === col.slug ? BK : BR}`, color: activeCollection === col.slug ? W : DK, ...F, fontSize: '12px', fontWeight: activeCollection === col.slug ? 600 : 400, cursor: 'pointer', borderRadius: '100px', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (activeCollection !== col.slug) e.currentTarget.style.borderColor = DK }}
                onMouseLeave={e => { if (activeCollection !== col.slug) e.currentTarget.style.borderColor = BR }}>
                {col.name}
              </button>
            ))}
          </div>

          {/* Sort + view */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
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
                          {sortBy === opt.value ? '✓ ' : ''}{opt.label}
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

      {/* ── ACTIVE FILTERS ── */}
      {hasFilters && (
        <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '10px 64px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: MD }}>Filters:</span>
            {activeCollection !== 'all' && activeCol && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: GL, border: `1px solid ${G}`, ...F, fontSize: '11px', fontWeight: 500, color: G, borderRadius: '100px' }}>
                {activeCol.name}
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

      {/* ── BODY ── */}
      <div className="layout-sidebar page-padding shop-body" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 64px 96px', display: 'flex', gap: '40px' }}>

        {/* Sidebar */}
        <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '64px', alignSelf: 'flex-start' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: DK, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px', paddingBottom: '10px', borderBottom: `1px solid ${BR}` }}>Collections</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {collectionPills.map(col => (
                <button key={col.slug} onClick={() => setCollection(col.slug)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 12px', background: activeCollection === col.slug ? GL : 'transparent', border: 'none', borderLeft: `2px solid ${activeCollection === col.slug ? G : 'transparent'}`, ...F, cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s' }} onMouseEnter={e => { if (activeCollection !== col.slug) e.currentTarget.style.background = OW }} onMouseLeave={e => { if (activeCollection !== col.slug) e.currentTarget.style.background = 'transparent' }}>
                  <span style={{ fontSize: '13px', fontWeight: activeCollection === col.slug ? 600 : 400, color: activeCollection === col.slug ? G : DK }}>{col.name}</span>
                  {col.subtitle && <span style={{ fontSize: '11px', fontWeight: 300, color: activeCollection === col.slug ? G : FT, marginTop: '1px' }}>{col.subtitle}</span>}
                </button>
              ))}
            </div>
          </div>

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

          {hasFilters && (
            <button onClick={clearAll} style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${BR}`, ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }} onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
              Clear Filters
            </button>
          )}
        </aside>

        {/* Products */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <Skeleton />
          ) : sorted.length === 0 ? (
            <ComingSoon label={activeCol?.name || 'this collection'} />
          ) : viewMode === 'grid' ? (
            <>
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 20px' }}>
                {sorted.slice(0, visibleCount).map(p => (
                  <ProductCardGrid key={p.id} product={p} />
                ))}
              </motion.div>
              {visibleCount < sorted.length && (
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                  <button onClick={() => setVisibleCount(n => n + 12)}
                    style={{ padding: '14px 48px', background: 'transparent', border: `1px solid ${DK}`, ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', color: DK, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = DK; e.currentTarget.style.color = W }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DK }}>
                    Load More ({sorted.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sorted.slice(0, visibleCount).map(p => (
                  <ProductCardList key={p.id} product={p} />
                ))}
              </motion.div>
              {visibleCount < sorted.length && (
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                  <button onClick={() => setVisibleCount(n => n + 12)}
                    style={{ padding: '14px 48px', background: 'transparent', border: `1px solid ${DK}`, ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', color: DK, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = DK; e.currentTarget.style.color = W }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DK }}>
                    Load More ({sorted.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}