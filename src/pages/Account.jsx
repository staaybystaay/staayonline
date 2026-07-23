import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { getOrdersByEmail, updateCustomerProfile } from '../lib/api'
import { useWishlist } from '../hooks/useWishlist'

// ─── TOKENS ──────────────────────────────────────────────────────
const G    = 'var(--accent)'
const GL   = 'var(--accent-soft)'
const W    = 'var(--white)'         // fixed white text/foreground
const CARD = 'var(--bg-card)'
const LG   = 'var(--bg-panel)'
const BK   = 'var(--ink)'
const DK   = 'var(--text-strong)'
const MD   = 'var(--text-muted)'
const FT   = 'var(--text-faint)'
const BR   = 'var(--border)'
const RD   = 'var(--danger)'
const GR   = 'var(--success)'   // dark green (text / icons)
const GRN  = 'var(--success)'   // vivid green (toggles on-state)
const GRND = '#DCFCE7'   // green light bg
const BL   = '#1D4ED8'   // blue for info
const F    = { fontFamily: "'Inter', sans-serif" }

const NOTIF_DEFAULTS = {
  order_updates: true,
  new_arrivals:  false,
  promotions:    false,
}

const TABS = [
  { key: 'orders',   icon: OrderIcon,   label: 'My Orders'  },
  { key: 'profile',  icon: ProfileIcon, label: 'Profile'    },
  { key: 'wishlist', icon: HeartIcon,   label: 'Wishlist'   },
  { key: 'settings', icon: GearIcon,    label: 'Settings'   },
]

const STATUS_COLORS = {
  pending:    { bg: '#FEF9C3', color: '#854D0E', label: 'Pending'    },
  confirmed:  { bg: '#F0FDF4', color: '#166534', label: 'Confirmed'  },
  processing: { bg: '#EFF6FF', color: '#1E40AF', label: 'Processing' },
  shipped:    { bg: '#F5F3FF', color: '#5B21B6', label: 'Shipped'    },
  delivered:  { bg: '#F0FDF4', color: '#166534', label: 'Delivered'  },
  cancelled:  { bg: '#FEF2F2', color: '#991B1B', label: 'Cancelled'  },
}

// ─── ICONS ───────────────────────────────────────────────────────
function OrderIcon({ size = 16, color = MD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke={color} strokeWidth="1.4"/>
      <path d="M7 7h6M7 10.5h6M7 14h4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
function ProfileIcon({ size = 16, color = MD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.4"/>
      <path d="M3.5 17c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
function HeartIcon({ size = 16, color = MD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 16.5S2.5 11.5 2.5 6.5a4 4 0 0 1 7.5-2A4 4 0 0 1 17.5 6.5c0 5-7.5 10-7.5 10z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}
function GearIcon({ size = 16, color = MD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.4"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
function CameraIcon({ size = 14, color = W }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h1.1l1-2h4.8l1 2h1.1A1.5 1.5 0 0 1 14 6.5v7A1.5 1.5 0 0 1 12.5 15h-9A1.5 1.5 0 0 1 2 13.5v-7z" stroke={color} strokeWidth="1.3"/>
      <circle cx="8" cy="10" r="2" stroke={color} strokeWidth="1.3"/>
    </svg>
  )
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', disabled = false, hint }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', ...F, fontSize: '11px', fontWeight: 600, color: focused ? G : FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px', transition: 'color 0.2s' }}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '12px 14px', border: `1px solid ${focused ? G : BR}`,
          background: disabled ? LG : CARD, ...F, fontSize: '14px', color: DK,
          outline: 'none', transition: 'border-color 0.2s', borderRadius: '8px',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
      {hint && <p style={{ ...F, fontSize: '11px', color: FT, marginTop: '5px' }}>{hint}</p>}
    </div>
  )
}

function Toast({ message, type = 'success', onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      style={{
        position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        background: type === 'success' ? GR : RD, color: W, padding: '12px 24px',
        borderRadius: '100px', ...F, fontSize: '13px', fontWeight: 500, zIndex: 9999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)', whiteSpace: 'nowrap',
      }}>
      {message}
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{ padding: '4px 10px', background: s.bg, ...F, fontSize: '11px', fontWeight: 600, color: s.color, letterSpacing: '0.04em', borderRadius: '6px' }}>
      {s.label}
    </span>
  )
}

// ─── ORDER CARD ───────────────────────────────────────────────────
function OrderCard({ order }) {
  const [open, setOpen] = useState(false)
  const date = new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const itemCount = order.order_items?.reduce((n, i) => n + i.qty, 0) || 0

  return (
    <div style={{ border: `1px solid ${BR}`, background: CARD, borderRadius: '12px', overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: open ? LG : CARD, transition: 'background 0.2s', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '3px' }}>Order</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK, letterSpacing: '0.02em' }}>#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '3px' }}>Date</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{date}</p>
          </div>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '3px' }}>Items</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{itemCount} piece{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '3px' }}>Total</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>GH₵{Number(order.total).toLocaleString()}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          style={{ ...F, fontSize: '18px', color: MD, display: 'inline-block', lineHeight: 1 }}>›</motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div key="detail"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ borderTop: `1px solid ${BR}`, padding: '20px 22px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                {order.order_items?.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '60px', background: LG, flexShrink: 0, overflow: 'hidden', borderRadius: '6px', position: 'relative' }}>
                      {item.image_url && <img src={item.image_url} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{item.name}</p>
                      <p style={{ ...F, fontSize: '12px', color: MD, marginTop: '2px' }}>
                        Qty: {item.qty}{item.size ? ` · Size: ${item.size}` : ''}
                      </p>
                      {item.customization && (
                        <p style={{ ...F, fontSize: '11px', color: '#92400E', background: '#FFFBEB', padding: '3px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>
                          ✦ Custom{item.customization.color ? ` · ${item.customization.color}` : ''}{item.customization.note ? ` · ${item.customization.note}` : ''}
                        </p>
                      )}
                    </div>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, flexShrink: 0 }}>GH₵{Number(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {order.shipping_address && (
                <div style={{ padding: '14px 0', borderTop: `1px solid ${BR}` }}>
                  <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>Delivery to</p>
                  <p style={{ ...F, fontSize: '13px', color: MD }}>
                    {order.shipping_address.full_name} · {order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.country}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${BR}`, flexWrap: 'wrap', gap: '8px' }}>
                <a href="https://wa.me/233503977985" target="_blank" rel="noreferrer"
                  style={{ ...F, fontSize: '12px', color: G, fontWeight: 500 }}>
                  Need help with this order? →
                </a>
                <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>Total: GH₵{Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── ORDERS TAB ───────────────────────────────────────────────────
function OrdersTab({ user }) {
  const [orders,        setOrders]        = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [filter,        setFilter]        = useState('all')

  useEffect(() => {
    if (!user?.email) return
    getOrdersByEmail(user.email)
      .then(d => setOrders(d || []))
      .catch(console.error)
      .finally(() => setOrdersLoading(false))
  }, [user])

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>My Orders</h2>
        <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 600, color: G, borderBottom: `1px solid ${G}`, paddingBottom: '1px' }}>
          Shop Again →
        </Link>
      </div>

      {orders.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: '6px 14px', borderRadius: '100px', border: `1px solid ${filter === s ? G : BR}`, background: filter === s ? GL : CARD, ...F, fontSize: '11px', fontWeight: filter === s ? 600 : 400, color: filter === s ? G : MD, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>
              {s === 'all' ? `All (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
      )}

      {ordersLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: '76px', background: BR, borderRadius: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: CARD, border: `1px solid ${BR}`, padding: '64px 40px', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: GL, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <OrderIcon size={22} color={G} />
          </div>
          <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No orders yet</p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '28px', maxWidth: '280px', margin: '0 auto 28px' }}>
            Your order history will show up here once you place your first order.
          </p>
          <Link to="/shop"
            style={{ background: BK, color: W, padding: '13px 32px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', display: 'inline-block', borderRadius: '8px', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(o => <OrderCard key={o.id} order={o} />)}
        </div>
      )}
    </div>
  )
}

// ─── PROFILE TAB ─────────────────────────────────────────────────
function ProfileTab({ user, profile, auth }) {
  const [form,      setForm]      = useState({ first_name: '', last_name: '', phone: '', gender: '' })
  const [saving,    setSaving]    = useState(false)
  const [toast,     setToast]     = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || '',
        last_name:  profile.last_name  || '',
        phone:      profile.phone      || '',
        gender:     profile.gender     || '',
      })
    }
  }, [profile])

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleSave() {
    setSaving(true)
    try {
      await updateCustomerProfile(user.id, form)
      await auth.refreshProfile()
      setToast({ message: 'Profile updated', type: 'success' })
    } catch {
      setToast({ message: 'Failed to save — try again', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await auth.updateAvatar(file)
      setToast({ message: 'Photo updated', type: 'success' })
    } catch {
      setToast({ message: 'Upload failed — try again', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const initials = ((form.first_name?.[0] || '') + (form.last_name?.[0] || '')).toUpperCase() || user.email[0].toUpperCase()

  return (
    <div>
      <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.02em', marginBottom: '28px' }}>Profile</h2>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', padding: '24px', background: CARD, border: `1px solid ${BR}`, borderRadius: '12px' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '24px', fontWeight: 700, color: G }}>
              {initials}
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()} disabled={uploading}
            style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%', background: G, border: `2px solid ${W}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <CameraIcon size={12} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        </div>
        <div>
          <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>
            {(form.first_name || form.last_name) ? `${form.first_name} ${form.last_name}`.trim() : 'Your Name'}
          </p>
          <p style={{ ...F, fontSize: '13px', color: MD, marginTop: '2px' }}>{user.email}</p>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            style={{ marginTop: '8px', background: 'none', border: 'none', ...F, fontSize: '12px', color: G, cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            {uploading ? 'Uploading…' : 'Change photo'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '12px', padding: '28px' }}>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '24px' }}>Personal Information</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <Field label="First Name" value={form.first_name} onChange={v => set('first_name', v)} />
          <Field label="Last Name"  value={form.last_name}  onChange={v => set('last_name', v)} />
          <Field label="Phone"      value={form.phone}      onChange={v => set('phone', v)} type="tel" />
          <div>
            <label style={{ display: 'block', ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Gender</label>
            <select value={form.gender} onChange={e => set('gender', e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: `1px solid ${BR}`, background: CARD, ...F, fontSize: '14px', color: form.gender ? DK : FT, outline: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              <option value="">Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
          </div>
          <Field label="Email" value={user.email} onChange={() => {}} disabled hint="Email cannot be changed here" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button onClick={handleSave} disabled={saving}
            style={{ padding: '12px 32px', background: saving ? MD : G, color: W, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', cursor: saving ? 'wait' : 'pointer', transition: 'background 0.2s' }}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}</AnimatePresence>
    </div>
  )
}

// ─── WISHLIST TAB ─────────────────────────────────────────────────
function WishlistTab() {
  const { items, removeItem, isLoaded } = useWishlist()

  if (!isLoaded) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[1,2,3].map(i => <div key={i} style={{ height: '90px', background: BR, borderRadius: '12px', animation: 'pulse 1.5s infinite' }} />)}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
          Wishlist <span style={{ fontWeight: 300, color: MD, fontSize: '16px' }}>({items.length})</span>
        </h2>
        <Link to="/wishlist" style={{ ...F, fontSize: '12px', fontWeight: 600, color: G, borderBottom: `1px solid ${G}`, paddingBottom: '1px' }}>
          View full wishlist →
        </Link>
      </div>

      {items.length === 0 ? (
        <div style={{ background: CARD, border: `1px solid ${BR}`, padding: '64px 40px', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: GL, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <HeartIcon size={22} color={G} />
          </div>
          <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Nothing saved yet</p>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '28px' }}>Heart items while browsing to save them here.</p>
          <Link to="/shop" style={{ background: BK, color: W, padding: '13px 32px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', display: 'inline-block', borderRadius: '8px' }}>
            Browse Shop
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {items.map(item => (
            <div key={item.id} style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '3/4', background: LG, overflow: 'hidden', position: 'relative' }}>
                {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                <button onClick={() => removeItem(item.id)}
                  style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: MD }}>
                  ✕
                </button>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                <p style={{ ...F, fontSize: '12px', color: G, fontWeight: 700 }}>GH₵{Number(item.price).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TOGGLE SWITCH ────────────────────────────────────────────────
function Toggle({ on, onChange, saving }) {
  return (
    <button
      onClick={() => !saving && onChange(!on)}
      disabled={saving}
      style={{ width: '44px', height: '26px', borderRadius: '13px', background: on ? GRN : 'var(--bg-surface)', border: 'none', cursor: saving ? 'wait' : 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0, opacity: saving ? 0.7 : 1 }}>
      <span style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: W, transition: 'left 0.18s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
    </button>
  )
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────
function SettingsTab({ user, profile, auth, onLogout }) {
  // ── password ──
  const [pwForm,   setPwForm]   = useState({ next: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError,  setPwError]  = useState('')
  const [pwDone,   setPwDone]   = useState(false)

  // ── notifications ──
  const [notifs,       setNotifs]       = useState({ ...NOTIF_DEFAULTS })
  const [notifSaving,  setNotifSaving]  = useState(false)
  const [notifSavedAt, setNotifSavedAt] = useState(null)

  // ── toast ──
  const [toast, setToast] = useState(null)

  // Load notification prefs from profile
  useEffect(() => {
    if (profile?.notification_prefs) {
      setNotifs({ ...NOTIF_DEFAULTS, ...profile.notification_prefs })
    }
  }, [profile])

  function setPw(k, v) { setPwForm(f => ({ ...f, [k]: v })); setPwError(''); setPwDone(false) }

  async function handlePasswordChange() {
    if (!pwForm.next || pwForm.next.length < 8) { setPwError('Password must be at least 8 characters'); return }
    if (pwForm.next !== pwForm.confirm)          { setPwError('Passwords do not match'); return }
    setPwSaving(true)
    try {
      await auth.changePassword(pwForm.next)
      setPwForm({ next: '', confirm: '' })
      setPwDone(true)
      setToast({ message: 'Password updated successfully', type: 'success' })
    } catch (e) {
      setPwError(e.message || 'Failed to update password')
    } finally {
      setPwSaving(false)
    }
  }

  async function handleNotifToggle(key, val) {
    const updated = { ...notifs, [key]: val }
    setNotifs(updated)
    setNotifSaving(true)
    try {
      await updateCustomerProfile(user.id, { notification_prefs: updated })
      await auth.refreshProfile()
      setNotifSavedAt(Date.now())
    } catch {
      // revert on failure
      setNotifs(notifs)
      setToast({ message: 'Could not save preference — try again', type: 'error' })
    } finally {
      setNotifSaving(false)
    }
  }

  const isGoogle = user.app_metadata?.provider === 'google'

  const NOTIF_ROWS = [
    { key: 'order_updates', label: 'Order updates',       sub: 'Shipping and delivery status updates',   color: BL   },
    { key: 'new_arrivals',  label: 'New arrivals',        sub: 'Be the first to see new collections',    color: G    },
    { key: 'promotions',    label: 'Promotions & sales',  sub: 'Exclusive deals, discounts, and events', color: RD   },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>Settings</h2>

      {/* ── Account info ── */}
      <div style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '12px', padding: '24px' }}>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '16px' }}>Account Details</p>
        {[
          { label: 'Email',        value: user.email },
          { label: 'Sign-in',      value: isGoogle ? 'Google OAuth' : 'Email & password' },
          { label: 'Member since', value: new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
          { label: 'User ID',      value: user.id.slice(0, 16) + '…' },
        ].map((row, i, arr) => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BR}` : 'none', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ ...F, fontSize: '13px', color: MD }}>{row.label}</span>
            <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* ── Change password ── */}
      {!isGoogle && (
        <div style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>Change Password</p>
            {pwDone && (
              <span style={{ ...F, fontSize: '12px', color: GRN, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✓ Updated
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Field label="New Password"     value={pwForm.next}    onChange={v => setPw('next', v)}    type="password" />
            <Field label="Confirm Password" value={pwForm.confirm} onChange={v => setPw('confirm', v)} type="password" />
            {pwError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: 'rgba(220,38,38,0.12)', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.3)' }}>
                <span style={{ ...F, fontSize: '12px', color: RD }}>{pwError}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handlePasswordChange} disabled={pwSaving}
                style={{ padding: '11px 28px', background: pwSaving ? MD : BK, color: W, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, cursor: pwSaving ? 'wait' : 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!pwSaving) e.currentTarget.style.background = '#333' }}
                onMouseLeave={e => { if (!pwSaving) e.currentTarget.style.background = BK }}>
                {pwSaving ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Notification preferences ── */}
      <div style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>Email Notifications</p>
          {notifSavedAt && !notifSaving && (
            <span style={{ ...F, fontSize: '11px', color: GRN, fontWeight: 500 }}>✓ Saved</span>
          )}
          {notifSaving && (
            <span style={{ ...F, fontSize: '11px', color: MD }}>Saving…</span>
          )}
        </div>
        <p style={{ ...F, fontSize: '12px', color: FT, marginBottom: '16px' }}>Choose which emails you'd like to receive from Staay.</p>
        <div>
          {NOTIF_ROWS.map((row, i) => (
            <div key={row.key}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < NOTIF_ROWS.length - 1 ? `1px solid ${BR}` : 'none', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color, marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK }}>{row.label}</p>
                  <p style={{ ...F, fontSize: '12px', color: FT, marginTop: '2px' }}>{row.sub}</p>
                </div>
              </div>
              <Toggle on={notifs[row.key]} onChange={val => handleNotifToggle(row.key, val)} saving={notifSaving} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Danger zone ── */}
      <div style={{ background: CARD, border: '1px solid rgba(220,38,38,0.3)', borderRadius: '12px', padding: '24px' }}>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: RD, marginBottom: '8px' }}>Danger Zone</p>
        <p style={{ ...F, fontSize: '13px', color: MD, marginBottom: '16px', lineHeight: 1.7 }}>
          Signing out clears your local session. To permanently delete your account and all associated data, contact us at{' '}
          <a href="mailto:info@gogmi.org.gh" style={{ color: BL, fontWeight: 500 }}>info@gogmi.org.gh</a>.
        </p>
        <button onClick={onLogout}
          style={{ padding: '11px 24px', background: 'transparent', border: '1px solid rgba(220,38,38,0.3)', color: RD, borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
          Sign Out
        </button>
      </div>

      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}</AnimatePresence>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function Account() {
  const navigate    = useNavigate()
  const auth        = useAuth()
  const { user, profile, loading, logout } = auth
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ background: LG, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...F, fontSize: '14px', color: MD }}>Loading…</p>
      </div>
    )
  }

  if (!user) return null

  const firstName = profile?.first_name || user.email.split('@')[0]
  const lastName  = profile?.last_name  || ''
  const initials  = ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || user.email[0].toUpperCase()

  return (
    <div style={{ background: LG, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{ background: CARD, borderBottom: `1px solid ${BR}` }}>
        <div className="page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '22px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>My Account</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${GL}` }} />
              ) : (
                <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '22px', fontWeight: 700, color: G, border: `3px solid ${GL}` }}>
                  {initials}
                </div>
              )}
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', borderRadius: '50%', background: GR, border: `2px solid ${W}` }} />
            </div>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Welcome back</p>
              <h1 style={{ ...F, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {firstName} {lastName}
              </h1>
              <p style={{ ...F, fontSize: '13px', color: MD, marginTop: '4px' }}>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="layout-sidebar page-padding"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 40px 96px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '32px' }}>
          <div style={{ background: CARD, border: `1px solid ${BR}`, borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${G}, #D4A853)` }} />
            <nav className="account-sidebar-nav" style={{ padding: '8px' }}>
              {TABS.map(tab => {
                const Icon = tab.icon
                const active = activeTab === tab.key
                return (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    style={{
                      width: '100%', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: '10px',
                      background: active ? GL : 'transparent', borderRadius: '8px',
                      border: 'none', ...F, fontSize: '13px',
                      fontWeight: active ? 600 : 400, color: active ? G : MD,
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', marginBottom: '2px',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = LG }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
                    <Icon size={16} color={active ? G : MD} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
            <div style={{ borderTop: `1px solid ${BR}`, padding: '14px 22px 16px' }}>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px' }}>Account</p>
              <p style={{ ...F, fontSize: '11px', color: MD, wordBreak: 'break-all', lineHeight: 1.5 }}>{user.email}</p>
            </div>
          </div>
        </aside>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {activeTab === 'orders'   && <OrdersTab   user={user} />}
            {activeTab === 'profile'  && <ProfileTab  user={user} profile={profile} auth={auth} />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'settings' && <SettingsTab user={user} profile={profile} auth={auth} onLogout={handleLogout} />}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
