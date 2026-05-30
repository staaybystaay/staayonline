import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

const COLLECTIONS = [
  { id: 'all', label: 'All Collections', sub: 'Explore every STAAY piece' },
  { id: 'eden', label: 'Eden Collection', sub: 'Where beauty begins' },
  { id: 'love', label: 'The Love Edit', sub: 'Pieces made with love' },
  { id: 'bold', label: 'Bold & Beautiful', sub: 'Make your statement' },
  { id: 'giftcard', label: 'Gift Card', sub: 'Gift style with choice' },
]

const edenProducts = [
  { id: 'e1', name: 'ARI', price: 1650, image: '/Ari.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e2', name: 'MIRA', price: 1950, image: '/Mira.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e3', name: 'VERA', price: 1700, image: '/Vera.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e4', name: 'SOLENNE', price: 2600, image: '/Solenne.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e5', name: 'AYLA', price: 1900, image: '/Ayla.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e6', name: 'AURA', price: 2900, image: '/Aura.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e7', name: 'KAIA', price: 2900, image: '/Kaia.png', collection: 'eden', badge: 'New' },
  { id: 'e8', name: 'EVE', price: 2400, image: '/Eve.png', collection: 'eden', badge: 'New' },
  { id: 'e9', name: 'ELARA', price: 2400, image: '/Elara.jpeg', collection: 'eden', badge: 'New' },
  { id: 'e10', name: 'DAHLIA', price: 2200, image: '/Dahlia.jpeg', collection: 'eden', badge: 'New' },
]

const loveProducts = [
  { id: 'l1', name: 'AMOR', price: 2900, image: '/Amor.jpeg', collection: 'love', badge: 'New' },
  { id: 'l2', name: 'LIEBE', price: 1900, image: '/Liebe.jpeg', collection: 'love', badge: 'New' },
  { id: 'l3', name: 'ODO', price: 2200, image: '/Odo.jpeg', collection: 'love', badge: 'New' },
]

const boldProducts = [
  { id: 'b1', name: 'ZURI', price: 3500, image: '/Zuri.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b2', name: 'NYAH', price: 2600, image: '/Nyah.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b3', name: 'ZAYA', price: 1900, image: '/Zaya.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b4', name: 'LOIS', price: 1450, image: '/Lois.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b5', name: 'ZARA', price: 2200, image: '/Zara.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b6', name: 'ARIA', price: 2400, image: '/Aria.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b7', name: 'NOVA', price: 2900, image: '/Nova.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b8', name: 'AMARA', price: 2200, image: '/Amara.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b9', name: 'ESME', price: 2700, image: '/Esme.jpeg', collection: 'bold', badge: 'New' },
  { id: 'b10', name: 'SADE', price: 1900, image: '/Sade.jpeg', collection: 'bold', badge: 'New' },
]

const giftCardProducts = [
  { id: 'g1', name: 'STAAY Gift Card', price: 2000, image: '/giftcard.jpeg', collection: 'giftcard', badge: 'Gift' },
  { id: 'g2', name: 'STAAY Gift Card', price: 5000, image: '/giftcard.jpeg', collection: 'giftcard', badge: 'Gift' },
  { id: 'g3', name: 'STAAY Gift Card', price: 7500, image: '/giftcard.jpeg', collection: 'giftcard', badge: 'Gift' },
  { id: 'g4', name: 'STAAY Gift Card', price: 10000, image: '/giftcard.jpeg', collection: 'giftcard', badge: 'Gift' },
  { id: 'g5', name: 'STAAY Gift Card', price: 20000, image: '/giftcard.jpeg', collection: 'giftcard', badge: 'Gift' },
]

const allProducts = [...edenProducts, ...loveProducts, ...boldProducts, ...giftCardProducts]

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name A–Z', value: 'name_asc' },
]

const PRICE_RANGES = [
  { label: 'Under GH₵1,500', min: 0, max: 1500 },
  { label: 'GH₵1,500 – GH₵2,500', min: 1500, max: 2500 },
  { label: 'GH₵2,500 – GH₵5,000', min: 2500, max: 5000 },
  { label: 'GH₵5,000+', min: 5000, max: Infinity },
]

const money = value => `GH₵${value.toLocaleString()}`

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function ProductCard({ product, wishlisted, onWishlist }) {
  const addItem = useCartStore(s => s.addItem)
  const collection = COLLECTIONS.find(c => c.id === product.collection)

  return (
    <motion.article layout className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} onError={e => { e.currentTarget.style.display = 'none' }} />
        <span className="badge">{product.badge}</span>
        <button className={`wish ${wishlisted ? 'active' : ''}`} onClick={() => onWishlist(product.id)}>
          {wishlisted ? '♥' : '♡'}
        </button>
        <button
          className="quick-add"
          onClick={() => addItem({ ...product, category: collection?.label || 'STAAY' })}>
          Add to Bag
        </button>
      </div>

      <div className="product-info">
        <p>{collection?.label}</p>
        <div>
          <h3>{product.name}</h3>
          <strong>{money(product.price)}</strong>
        </div>
      </div>
    </motion.article>
  )
}

function GiftCardFeature({ onShopGiftCards }) {
  return (
    <section className="gift-feature">
      <div className="gift-media">
        <img src="/giftcard.jpeg" alt="STAAY Gift Card" />
      </div>

      <div className="gift-copy">
        <p className="eyebrow">STAAY Gifting</p>
        <h2>Give the Gift of Choice</h2>
        <p>
          A polished way to celebrate birthdays, milestones, wardrobe refreshes, and special moments.
          Available from GH₵2,000 to GH₵20,000.
        </p>

        <div className="gift-values">
          {giftCardProducts.map(card => (
            <span key={card.id}>{money(card.price)}</span>
          ))}
        </div>

        <button onClick={onShopGiftCards}>Shop Gift Cards</button>
      </div>
    </section>
  )
}

export default function Shop() {
  const [activeCollection, setActiveCollection] = useState('all')
  const [activePrices, setActivePrices] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [wishlist, setWishlist] = useState([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const activeCol = COLLECTIONS.find(c => c.id === activeCollection)

  const toggleWishlist = id => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const togglePrice = label => {
    setActivePrices(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label])
  }

  const clearFilters = () => {
    setActiveCollection('all')
    setActivePrices([])
    setSortBy('newest')
  }

  const products = useMemo(() => {
    let list = allProducts.filter(product => {
      if (activeCollection !== 'all' && product.collection !== activeCollection) return false

      if (activePrices.length > 0) {
        return activePrices.some(label => {
          const range = PRICE_RANGES.find(item => item.label === label)
          return range && product.price >= range.min && product.price < range.max
        })
      }

      return true
    })

    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name_asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [activeCollection, activePrices, sortBy])

  const hasFilters = activeCollection !== 'all' || activePrices.length > 0 || sortBy !== 'newest'

  return (
    <main className="shop-page">
      <StyleBlock />

      <section className="shop-hero">
        <div className="shell">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <p>Shop</p>
          </div>

          <div className="hero-row">
            <div>
              <p className="eyebrow">{activeCollection === 'all' ? 'STAAY Shop' : activeCol?.label}</p>
              <h1>{activeCollection === 'all' ? 'Shop All Collections' : activeCol?.label}</h1>
              <p>{activeCol?.sub}</p>
            </div>

            <div className="hero-meta">
              <ShopIcon />
              <span>{products.length} {products.length === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-tool">
        <button onClick={() => setMobileFiltersOpen(true)}>
          <FilterIcon />
          Filter & Sort
        </button>
        <span>{products.length} results</span>
      </section>

      <section className="shop-body shell">
        <aside className="sidebar">
          <FilterPanel
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
            activePrices={activePrices}
            togglePrice={togglePrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
          />
        </aside>

        <div className="shop-main">
          <div className="desktop-toolbar">
            <div>
              <strong>{products.length}</strong>
              <span> results</span>
            </div>

            <label>
              Sort
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          {hasFilters && (
            <div className="active-filters">
              <span>Active filters</span>
              {activeCollection !== 'all' && <button onClick={() => setActiveCollection('all')}>{activeCol?.label} ×</button>}
              {activePrices.map(price => <button key={price} onClick={() => togglePrice(price)}>{price} ×</button>)}
              {sortBy !== 'newest' && <button onClick={() => setSortBy('newest')}>{SORT_OPTIONS.find(s => s.value === sortBy)?.label} ×</button>}
              <button onClick={clearFilters}>Clear all</button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div className="product-grid" layout>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlisted={wishlist.includes(product.id)}
                  onWishlist={toggleWishlist}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {products.length === 0 && (
            <div className="empty">
              <h3>No pieces found</h3>
              <p>Try changing your collection or price filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}

          <GiftCardFeature onShopGiftCards={() => setActiveCollection('giftcard')} />
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div className="mobile-drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="drawer-bg" onClick={() => setMobileFiltersOpen(false)} />

            <motion.div
              className="drawer-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
              <div className="drawer-head">
                <h3>Filter & Sort</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>×</button>
              </div>

              <FilterPanel
                activeCollection={activeCollection}
                setActiveCollection={setActiveCollection}
                activePrices={activePrices}
                togglePrice={togglePrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />

              <button className="apply-btn" onClick={() => setMobileFiltersOpen(false)}>
                View {products.length} Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function FilterPanel({
  activeCollection,
  setActiveCollection,
  activePrices,
  togglePrice,
  sortBy,
  setSortBy,
  clearFilters,
  hasFilters,
}) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <h4>Collections</h4>
        {COLLECTIONS.map(collection => (
          <button
            key={collection.id}
            className={activeCollection === collection.id ? 'active' : ''}
            onClick={() => setActiveCollection(collection.id)}>
            <span>{collection.label}</span>
            <small>{collection.sub}</small>
          </button>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price</h4>
        {PRICE_RANGES.map(range => (
          <label key={range.label}>
            <input
              type="checkbox"
              checked={activePrices.includes(range.label)}
              onChange={() => togglePrice(range.label)}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Sort By</h4>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {hasFilters && <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>}
    </div>
  )
}

function StyleBlock() {
  return (
    <style>{`
      :root {
        --gold: #B8903A;
        --gold-soft: #F7EFDE;
        --white: #FFFFFF;
        --cream: #F8F7F4;
        --line: #E6E0D6;
        --black: #111111;
        --text: #222222;
        --muted: #6B6B6B;
        --faint: #999999;
        --danger: #B91C1C;
      }

      .shop-page {
        min-height: 100vh;
        background: var(--white);
        color: var(--text);
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
      }

      .shell {
        width: min(1280px, calc(100% - 48px));
        margin: 0 auto;
      }

      button,
      select,
      input {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      a {
        text-decoration: none;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--gold);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .shop-hero {
        background:
          linear-gradient(120deg, rgba(184,144,58,0.12), transparent 46%),
          var(--cream);
        border-bottom: 1px solid var(--line);
        padding: 38px 0 34px;
      }

      .breadcrumbs {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 22px;
        font-size: 12px;
      }

      .breadcrumbs a {
        color: var(--muted);
      }

      .breadcrumbs span {
        color: var(--faint);
      }

      .breadcrumbs p {
        color: var(--text);
        margin: 0;
        font-weight: 600;
      }

      .hero-row {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
      }

      .hero-row h1 {
        margin: 0;
        color: var(--black);
        font-size: clamp(34px, 5vw, 58px);
        line-height: 0.98;
        letter-spacing: -0.05em;
        font-weight: 850;
      }

      .hero-row p:last-child {
        margin: 12px 0 0;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.6;
      }

      .hero-meta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--white);
        border: 1px solid var(--line);
        padding: 12px 16px;
        color: var(--black);
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
      }

      .mobile-tool {
        display: none;
      }

      .shop-body {
        display: grid;
        grid-template-columns: 245px minmax(0, 1fr);
        gap: 36px;
        padding: 38px 0 96px;
      }

      .sidebar {
        position: sticky;
        top: 22px;
        align-self: start;
      }

      .filter-panel {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      .filter-group h4 {
        margin: 0 0 14px;
        padding-bottom: 11px;
        border-bottom: 1px solid var(--line);
        color: var(--black);
        font-size: 12px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .filter-group button {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
        background: transparent;
        border: 0;
        border-left: 2px solid transparent;
        padding: 11px 12px;
        text-align: left;
        color: var(--text);
      }

      .filter-group button.active {
        background: var(--gold-soft);
        border-left-color: var(--gold);
        color: var(--gold);
      }

      .filter-group button span {
        font-size: 13px;
        font-weight: 700;
      }

      .filter-group button small {
        color: var(--muted);
        font-size: 11px;
        line-height: 1.35;
      }

      .filter-group label {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 11px;
        color: var(--muted);
        font-size: 13px;
      }

      .filter-group input {
        width: 15px;
        height: 15px;
        accent-color: var(--gold);
      }

      .filter-group select,
      .desktop-toolbar select {
        width: 100%;
        background: var(--white);
        border: 1px solid var(--line);
        color: var(--text);
        padding: 11px 12px;
        outline: none;
        font-size: 13px;
      }

      .clear-btn {
        background: transparent;
        border: 1px solid var(--line);
        padding: 12px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
      }

      .shop-main {
        min-width: 0;
      }

      .desktop-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 24px;
      }

      .desktop-toolbar div {
        color: var(--muted);
        font-size: 13px;
      }

      .desktop-toolbar strong {
        color: var(--black);
      }

      .desktop-toolbar label {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
      }

      .desktop-toolbar select {
        width: 190px;
      }

      .active-filters {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 24px;
      }

      .active-filters span {
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
      }

      .active-filters button {
        background: var(--gold-soft);
        border: 1px solid rgba(184,144,58,0.36);
        color: var(--gold);
        padding: 7px 11px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 34px 20px;
      }

      .product-card {
        min-width: 0;
      }

      .product-image {
        position: relative;
        aspect-ratio: 3 / 4;
        background: #F1EEE8;
        overflow: hidden;
        margin-bottom: 13px;
      }

      .product-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform 0.55s ease;
      }

      .product-card:hover .product-image img {
        transform: scale(1.045);
      }

      .badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background: var(--gold);
        color: var(--white);
        padding: 5px 10px;
        font-size: 10px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .wish {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 0;
        background: rgba(255,255,255,0.96);
        color: var(--black);
        font-size: 17px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.12);
      }

      .wish.active {
        color: var(--danger);
      }

      .quick-add {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        background: var(--black);
        color: var(--white);
        border: 0;
        padding: 13px;
        font-size: 12px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transform: translateY(16px);
        opacity: 0;
        transition: 0.24s ease;
      }

      .product-card:hover .quick-add {
        opacity: 1;
        transform: translateY(0);
      }

      .product-info p {
        margin: 0 0 5px;
        color: var(--gold);
        font-size: 10px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .product-info div {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }

      .product-info h3 {
        margin: 0;
        color: var(--black);
        font-size: 14px;
        font-weight: 800;
        line-height: 1.25;
      }

      .product-info strong {
        color: var(--black);
        font-size: 14px;
        font-weight: 850;
        white-space: nowrap;
      }

      .gift-feature {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
        background: var(--black);
        color: var(--white);
        margin-top: 70px;
        overflow: hidden;
      }

      .gift-media {
        aspect-ratio: 16 / 9;
        min-height: 360px;
        background: #080808;
      }

      .gift-media img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }

      .gift-copy {
        padding: clamp(28px, 4vw, 52px);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .gift-copy h2 {
        margin: 0 0 16px;
        color: var(--white);
        font-size: clamp(30px, 4vw, 48px);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .gift-copy p:not(.eyebrow) {
        margin: 0 0 22px;
        color: rgba(255,255,255,0.72);
        font-size: 14px;
        line-height: 1.75;
      }

      .gift-values {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        border: 1px solid rgba(255,255,255,0.18);
        margin-bottom: 22px;
      }

      .gift-values span {
        padding: 12px 8px;
        border-right: 1px solid rgba(255,255,255,0.18);
        border-bottom: 1px solid rgba(255,255,255,0.18);
        color: var(--white);
        text-align: center;
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }

      .gift-values span:nth-child(3n) {
        border-right: 0;
      }

      .gift-values span:nth-last-child(-n + 2) {
        border-bottom: 0;
      }

      .gift-copy button {
        width: fit-content;
        background: var(--gold);
        color: var(--black);
        border: 0;
        padding: 13px 24px;
        font-size: 12px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .empty {
        border: 1px solid var(--line);
        background: var(--cream);
        padding: 60px 24px;
        text-align: center;
      }

      .empty h3 {
        margin: 0 0 8px;
        font-size: 24px;
      }

      .empty p {
        color: var(--muted);
        margin: 0 0 18px;
      }

      .empty button,
      .apply-btn {
        background: var(--black);
        color: var(--white);
        border: 0;
        padding: 13px 24px;
        font-size: 12px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .mobile-drawer {
        position: fixed;
        inset: 0;
        z-index: 100;
      }

      .drawer-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        background: rgba(0,0,0,0.45);
        border: 0;
      }

      .drawer-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 86vh;
        overflow-y: auto;
        background: var(--white);
        border-radius: 22px 22px 0 0;
        padding: 20px;
      }

      .drawer-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }

      .drawer-head h3 {
        margin: 0;
        font-size: 20px;
      }

      .drawer-head button {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid var(--line);
        background: var(--cream);
        font-size: 24px;
      }

      .apply-btn {
        width: 100%;
        margin-top: 24px;
      }

      @media (max-width: 1100px) {
        .shop-body {
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 28px;
        }

        .product-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .gift-feature {
          grid-template-columns: 1fr;
        }

        .gift-media {
          min-height: auto;
        }
      }

      @media (max-width: 760px) {
        .shell {
          width: min(100% - 28px, 1280px);
        }

        .shop-hero {
          padding: 26px 0 24px;
        }

        .breadcrumbs {
          margin-bottom: 16px;
        }

        .hero-row {
          align-items: flex-start;
          flex-direction: column;
        }

        .hero-row h1 {
          font-size: clamp(32px, 11vw, 46px);
          letter-spacing: -0.04em;
        }

        .hero-row p:last-child {
          font-size: 13px;
          margin-top: 9px;
        }

        .hero-meta {
          width: 100%;
          justify-content: center;
          box-sizing: border-box;
        }

        .mobile-tool {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--white);
          border-bottom: 1px solid var(--line);
          padding: 12px 14px;
        }

        .mobile-tool button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--black);
          color: var(--white);
          border: 0;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .mobile-tool span {
          color: var(--muted);
          font-size: 12px;
          font-weight: 700;
        }

        .shop-body {
          display: block;
          padding: 24px 0 72px;
        }

        .sidebar,
        .desktop-toolbar {
          display: none;
        }

        .active-filters {
          margin-bottom: 18px;
        }

        .product-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px 12px;
        }

        .product-image {
          margin-bottom: 9px;
        }

        .badge {
          top: 7px;
          left: 7px;
          padding: 4px 8px;
          font-size: 8px;
        }

        .wish {
          top: 7px;
          right: 7px;
          width: 32px;
          height: 32px;
        }

        .quick-add {
          position: static;
          opacity: 1;
          transform: none;
          margin-top: 0;
          padding: 11px 8px;
          font-size: 10px;
        }

        .product-info p {
          font-size: 8px;
          line-height: 1.35;
        }

        .product-info div {
          flex-direction: column;
          gap: 3px;
        }

        .product-info h3,
        .product-info strong {
          font-size: 12px;
        }

        .gift-feature {
          margin-top: 52px;
        }

        .gift-media {
          aspect-ratio: 16 / 10;
        }

        .gift-copy {
          padding: 28px 18px;
          background:
            linear-gradient(to bottom, rgba(17,17,17,0), var(--black) 20%),
            var(--black);
          margin-top: -24px;
          position: relative;
          z-index: 2;
        }

        .gift-copy h2 {
          font-size: clamp(28px, 9vw, 40px);
        }

        .gift-copy p:not(.eyebrow) {
          font-size: 13px;
        }

        .gift-values {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .gift-values span,
        .gift-values span:nth-child(3n),
        .gift-values span:nth-last-child(-n + 2) {
          border-right: 1px solid rgba(255,255,255,0.18);
          border-bottom: 1px solid rgba(255,255,255,0.18);
        }

        .gift-values span:nth-child(2n) {
          border-right: 0;
        }

        .gift-values span:last-child {
          grid-column: 1 / -1;
          border-right: 0;
          border-bottom: 0;
        }

        .gift-copy button {
          width: 100%;
        }
      }

      @media (max-width: 390px) {
        .shell {
          width: min(100% - 22px, 1280px);
        }

        .product-grid {
          gap: 22px 10px;
        }

        .quick-add {
          letter-spacing: 0.04em;
        }
      }
    `}</style>
  )
}
