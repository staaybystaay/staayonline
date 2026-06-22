import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../hooks/useWishlist'
import useCartStore from '../store/useCartStore'

const G   = '#B8903A'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

function FavoriteCard({ item, onRemove }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  function handleAdd() {
    addItem({
      id:       item.id,
      name:     item.name,
      price:    item.price,
      image:    item.image_url || item.image,
      category: item.category || item.collection?.name || 'STAAY',
      badge:    item.badge,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      style={{ background: W }}>

      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden', marginBottom: '10px' }}>
        <img
          src={item.image_url || item.image}
          alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {item.badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: G, color: W, padding: '4px 10px', borderRadius: '4px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {item.badge}
          </div>
        )}

        {/* Remove */}
        <button
          onClick={() => onRemove(item.id)}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.12)', fontSize: '16px', color: RD, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          title="Remove from wishlist">
          ♥
        </button>
      </div>

      {/* Info */}
      <div>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '2px', lineHeight: 1.3 }}>{item.name}</p>
        <p style={{ ...F, fontSize: '11px', color: MD, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          {item.category || item.collection?.name || 'STAAY'}
        </p>
        <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, marginBottom: '10px' }}>
          GH₵{Number(item.price).toLocaleString()}
        </p>

        <button
          onClick={handleAdd}
          style={{ width: '100%', padding: '10px', background: added ? GR : BK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!added) e.currentTarget.style.background = G }}
          onMouseLeave={e => { if (!added) e.currentTarget.style.background = BK }}>
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}

export default function Favorites() {
  const { items, removeItem, clearAll } = useWishlist()
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '28px 40px' }} className="page-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Wishlist</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ ...F, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em' }}>
              My Wishlist
            </h1>
            <p style={{ ...F, fontSize: '13px', color: MD }}>{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px 96px' }} className="page-padding">

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#E0DBD5' }}>♡</div>
            <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Your wishlist is empty</h2>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '28px', maxWidth: '360px', marginLeft: 'auto', marginRight: 'auto' }}>
              Save pieces you love by tapping the heart icon — they'll show up here so you can come back to them anytime.
            </p>
            <Link to="/shop"
              style={{ display: 'inline-block', background: G, color: W, padding: '14px 40px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = BK }}
              onMouseLeave={e => { e.currentTarget.style.background = G }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              {confirmClear ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...F, fontSize: '13px' }}>
                  <span style={{ color: MD }}>Remove all items?</span>
                  <button onClick={() => { clearAll(); setConfirmClear(false) }}
                    style={{ background: RD, color: W, border: 'none', padding: '7px 16px', ...F, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    Yes, clear all
                  </button>
                  <button onClick={() => setConfirmClear(false)}
                    style={{ background: 'transparent', color: MD, border: `1px solid ${BR}`, padding: '7px 16px', ...F, fontSize: '12px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmClear(true)}
                  style={{ background: 'transparent', border: `1px solid ${BR}`, padding: '8px 18px', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = RD; e.currentTarget.style.color = RD }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
                  Clear All
                </button>
              )}
            </div>

            {/* Grid */}
            <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
              <AnimatePresence>
                {items.map(item => (
                  <FavoriteCard key={item.id} item={item} onRemove={removeItem} />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
