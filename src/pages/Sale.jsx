import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { useWishlist } from '../hooks/useWishlist'
import { getSaleProducts } from '../lib/api'
import { imgCard } from '../lib/images'
import QuickView from '../components/QuickView'
import MiniCurrencyPicker from '../components/MiniCurrencyPicker'

const INK   = '#15130F'
const G     = '#B8903A'
const GL    = '#F5ECD8'
const ACC   = '#E2542D'
const W     = '#FFFFFF'
const DK    = '#1A1612'
const MD    = '#666'
const FT    = '#999'
const LG    = '#F7F6F4'
const BR    = '#E8E4DF'
const RD    = '#E11D48'
const GR    = '#25D366'
const F     = { fontFamily: "'Inter', sans-serif" }

const SORT_OPTIONS = [
  { label: 'Biggest Discount', value: 'discount'   },
  { label: 'Price: Low',       value: 'price_asc'  },
  { label: 'Price: High',      value: 'price_desc' },
]

const GIFT_AMOUNTS = [2000, 5000, 7500, 10000, 20000]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#E0DBD5">
          <path d="M5 1l1 3h3L6.5 6l1 3L5 7.5 2.5 9l1-3L1 4h3z"/>
        </svg>
      ))}
    </div>
  )
}

// ─── Sale product card ────────────────────────
function SaleCard({ product, onQuickView }) {
  const [hovered, setHovered] = useState(false)
  const addItem     = useCartStore(s => s.addItem)
  const { toggle, isFavorited } = useWishlist()
  const faved       = isFavorited(product.id)

  const discount  = product.discount_percent
  const origPrice = Math.round(product.price / (1 - discount / 100))

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: W }}>

      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden', marginBottom: '10px' }}>
        <img src={imgCard(product.image_url)} alt={product.name} loading="lazy" decoding="async" onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />

        <div style={{ position: 'absolute', top: '10px', left: '10px', background: RD, color: W, padding: '4px 10px', borderRadius: '4px', ...F, fontSize: '12px', fontWeight: 800, letterSpacing: '0.02em' }}>
          -{discount}%
        </div>

        <button onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.12)', fontSize: '16px', color: faved ? RD : '#CCC', transition: 'all 0.2s' }}>
          {faved ? '♥' : '♡'}
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
              className="desktop-only"
              style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', gap: '6px' }}>
              <button onClick={() => onQuickView(product)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
                Quick View
              </button>
              <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
                style={{ flex: 1, background: DK, border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer' }}>
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <Stars />
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginTop: '4px', marginBottom: '2px', lineHeight: 1.3 }}>{product.name}</p>
        <p style={{ ...F, fontSize: '11px', color: MD, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>{product.collection?.name || 'STAAY'}</p>

        <MiniCurrencyPicker ghs={product.price} priceStyle={{ fontSize: '16px', color: RD }} strikethrough={origPrice} />

        <div className="mobile-only" style={{ display: 'none', gap: '6px', marginTop: '10px' }}>
          <button onClick={() => onQuickView(product)}
            style={{ flex: 1, background: LG, border: `1px solid ${BR}`, padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Quick View
          </button>
          <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
            style={{ flex: 1, background: DK, border: 'none', padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────
function PromoHero({ maxDiscount }) {
  return (
    <section style={{ background: INK, position: 'relative', overflow: 'hidden', padding: 'clamp(64px, 10vw, 110px) 24px clamp(56px, 8vw, 90px)' }}>

      {/* Ambient texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(184,144,58,0.18) 1px, transparent 1px)`, backgroundSize: '26px 26px', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: `radial-gradient(circle, rgba(226,84,45,0.18), transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <img src="/stayonlinelogo.jpeg" alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ ...F, fontSize: '13px', fontWeight: 700, color: W, letterSpacing: '0.04em' }}>STAAY <span style={{ color: G }}>ONLINE</span></span>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: G, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Seasonal Promotions
          </p>

          {maxDiscount > 0 ? (
            <h1 style={{ ...F, fontSize: 'clamp(56px, 11vw, 110px)', fontWeight: 900, color: ACC, letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '18px' }}>
              UP TO {maxDiscount}%<br />OFF
            </h1>
          ) : (
            <h1 style={{ ...F, fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, color: W, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '18px' }}>
              STAAY<br /><span style={{ color: G }}>Promotions</span>
            </h1>
          )}

          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '420px', margin: '0 auto 32px' }}>
            Discounted pieces, gift cards, and everything new — all in one place. Treat yourself, or someone who deserves it.
          </p>

          <a href="#shop-sale" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: G, color: INK, padding: '15px 40px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#CBA34F' }}
            onMouseLeave={e => { e.currentTarget.style.background = G }}>
            Shop the Sale
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Feature block: Shop the Sale teaser ──────
function ShopTeaser({ image }) {
  return (
    <section style={{ background: W, padding: 'clamp(48px, 7vw, 80px) 24px', borderBottom: `1px solid ${BR}` }}>
      <div className="promo-feature-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ aspectRatio: '4/5', background: LG, overflow: 'hidden' }}>
          {image && <img src={image} alt="" onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Limited Time
          </p>
          <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            Discover your next favourite piece
          </h2>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '28px', maxWidth: '400px' }}>
            A rotating edit of marked-down pieces from across our collections. Once they're gone, they're gone.
          </p>
          <a href="#shop-sale" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: DK, color: W, padding: '13px 32px', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = DK }}>
            Browse the Sale
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Feature block: Gift Cards (functional) ───
function GiftCardSection() {
  const [selected, setSelected] = useState(GIFT_AMOUNTS[1])
  const [added,    setAdded]    = useState(false)
  const addItem = useCartStore(s => s.addItem)

  function handleAdd() {
    if (!selected || selected <= 0) return
    addItem({
      id:       `giftcard-${selected}-${Date.now()}`,
      name:     `STAAY Gift Card — GH₵${selected.toLocaleString()}`,
      price:    selected,
      image:    '/stayonlinelogo.jpeg',
      category: 'Gift Card',
      qty: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <section style={{ background: GL, padding: 'clamp(48px, 7vw, 80px) 24px', borderBottom: `1px solid ${BR}` }}>
      <div className="promo-feature-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'center' }}>

        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Now Available
          </p>
          <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            STAAY Gift Cards
          </h2>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '24px', maxWidth: '400px' }}>
            A refined way to gift choice. Pick an amount, add it to the bag, and let them choose their own look.
          </p>

          <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '10px' }}>Choose an amount</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
            {GIFT_AMOUNTS.map(amt => (
              <button key={amt} onClick={() => setSelected(amt)}
                style={{ padding: '10px 18px', border: `1.5px solid ${selected === amt ? G : BR}`, background: selected === amt ? W : 'transparent', ...F, fontSize: '13px', fontWeight: selected === amt ? 700 : 400, color: selected === amt ? G : DK, cursor: 'pointer', transition: 'all 0.15s' }}>
                GH₵{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <button onClick={handleAdd}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: added ? '#16A34A' : G, color: W, padding: '14px 36px', border: 'none', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'background 0.2s' }}>
            {added ? '✓ Added to Bag' : `Add Gift Card · GH₵${(selected || 0).toLocaleString()}`}
          </button>
        </motion.div>

        {/* Visual gift card mockup */}
        <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '380px', aspectRatio: '1.6/1', background: `linear-gradient(135deg, ${DK}, #2B2419)`, borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 50px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(184,144,58,0.18)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
              <img src="/stayonlinelogo.jpeg" alt="" style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ ...F, fontSize: '13px', fontWeight: 700, color: W }}>STAAY </span>
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Gift Card Value</p>
              <p style={{ ...F, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: W }}>GH₵{(selected || 0).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Closing help banner ──────────────────────
function HelpBanner() {
  return (
    <section style={{ background: DK, padding: 'clamp(40px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Need Help Choosing?
        </p>
        <h2 style={{ ...F, fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 700, color: W, letterSpacing: '-0.01em', marginBottom: '20px' }}>
          Chat with us on WhatsApp
        </h2>
        <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: GR, color: W, padding: '13px 32px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1FAE56' }}
          onMouseLeave={e => { e.currentTarget.style.background = GR }}>
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════
export default function Sale() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [sortBy,   setSortBy]   = useState('discount')
  const [sortOpen, setSortOpen] = useState(false)
  const [qvProduct, setQvProduct] = useState(null)

  useEffect(() => {
    getSaleProducts()
      .then(data => setProducts(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      return (b.discount_percent || 0) - (a.discount_percent || 0)
    })
  }, [products, sortBy])

  const maxDiscount = useMemo(() => {
    if (!products.length) return 0
    return Math.max(...products.map(p => p.discount_percent || 0))
  }, [products])

  const teaserImage = sorted[0]?.image_url

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      <PromoHero maxDiscount={maxDiscount} />
      <ShopTeaser image={teaserImage} />
      <GiftCardSection />
      <HelpBanner />

      {/* ── SHOP THE SALE ── */}
      <div id="shop-sale" style={{ scrollMarginTop: '80px' }}>
        <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '28px 40px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: RD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Shop The Sale
                </p>
                <h2 style={{ ...F, fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>
                  Marked Down, Not Compromised
                </h2>
              </div>
              {!loading && <p style={{ ...F, fontSize: '13px', color: MD }}>{sorted.length} {sorted.length === 1 ? 'item' : 'items'} on sale</p>}
            </div>
          </div>
        </div>

        {sorted.length > 0 && (
          <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '0 40px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', height: '52px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setSortOpen(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0', background: 'transparent', border: 'none', ...F, fontSize: '12px', color: DK, cursor: 'pointer' }}>
                  Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <>
                      <div style={{ position: 'fixed', inset: 0, zIndex: 48 }} onClick={() => setSortOpen(false)} />
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                        style={{ position: 'absolute', top: '100%', right: 0, zIndex: 49, minWidth: '180px', background: W, border: `1px solid ${BR}`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                        {SORT_OPTIONS.map(opt => (
                          <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                            style={{ width: '100%', textAlign: 'left', padding: '11px 16px', border: 'none', borderBottom: `1px solid ${BR}`, background: sortBy === opt.value ? LG : W, ...F, fontSize: '13px', fontWeight: sortBy === opt.value ? 600 : 400, color: sortBy === opt.value ? RD : DK, cursor: 'pointer' }}>
                            {sortBy === opt.value && '✓ '}{opt.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px 96px' }}>

          {loading ? (
            <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '12px', background: LG, margin: '10px 0 6px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '16px', background: LG, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              ))}
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
            </div>
          ) : error ? (
            <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FECACA', ...F, fontSize: '13px', color: RD }}>
              Failed to load sale items: {error}
            </div>
          ) : sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No items on sale right now</p>
              <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '28px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
                Check back soon, or explore our full collection while you wait.
              </p>
              <Link to="/shop"
                style={{ display: 'inline-block', background: DK, color: W, padding: '14px 40px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = DK }}>
                Shop All Collections
              </Link>
            </div>
          ) : (
            <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
              {sorted.map(p => <SaleCard key={p.id} product={p} onQuickView={setQvProduct} />)}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {qvProduct && <QuickView product={qvProduct} onClose={() => setQvProduct(null)} />}
      </AnimatePresence>

    </div>
  )
}
