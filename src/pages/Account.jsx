import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { getOrdersByEmail } from '../lib/api'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const LG  = '#F7F6F4'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const BR  = '#E8E4DF'
const F   = { fontFamily: "'Inter', sans-serif" }

const STATUS_COLORS = {
  pending:    { bg: '#FEF9C3', color: '#854D0E', label: 'Pending'    },
  confirmed:  { bg: '#F0FDF4', color: '#166534', label: 'Confirmed'  },
  processing: { bg: '#EFF6FF', color: '#1E40AF', label: 'Processing' },
  shipped:    { bg: '#F5F3FF', color: '#5B21B6', label: 'Shipped'    },
  delivered:  { bg: '#F0FDF4', color: '#166534', label: 'Delivered'  },
  cancelled:  { bg: '#FEF2F2', color: '#991B1B', label: 'Cancelled'  },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{ padding: '3px 10px', background: s.bg, ...F, fontSize: '11px', fontWeight: 600, color: s.color, letterSpacing: '0.04em', borderRadius: '4px' }}>
      {s.label}
    </span>
  )
}

function OrderCard({ order }) {
  const [open, setOpen] = useState(false)
  const date = new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div style={{ border: `1px solid ${BR}`, background: W, overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: open ? LG : W, transition: 'background 0.2s', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Order</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Date</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{date}</p>
          </div>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Total</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>GH₵{Number(order.total).toLocaleString()}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <span style={{ ...F, fontSize: '18px', color: MD, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          ›
        </span>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ borderTop: `1px solid ${BR}`, padding: '16px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {order.order_items?.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '56px', background: LG, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  {item.image_url && <img src={item.image_url} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{item.name}</p>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>Qty: {item.qty}</p>
                </div>
                <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>GH₵{Number(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {order.shipping_address && (
            <div style={{ paddingTop: '14px', borderTop: `1px solid ${BR}` }}>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>Delivery Address</p>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>
                {order.shipping_address.full_name} · {order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.country}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${BR}`, flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>
              Questions?{' '}
              <a href="https://wa.me/233503977985" target="_blank" rel="noreferrer" style={{ color: G, fontWeight: 500 }}>WhatsApp us</a>
            </p>
            <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>Total: GH₵{Number(order.total).toLocaleString()}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function Account() {
  const navigate = useNavigate()
  const { user, profile, loading, logout } = useAuth()
  const [orders,        setOrders]        = useState([])
  const [ordersLoading, setOrdersLoading]  = useState(true)
  const [activeTab,     setActiveTab]     = useState('orders')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  useEffect(() => {
    if (!user?.email) return
    getOrdersByEmail(user.email)
      .then(data => setOrders(data || []))
      .catch(console.error)
      .finally(() => setOrdersLoading(false))
  }, [user])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ background: W, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...F, fontSize: '14px', color: MD }}>Loading...</p>
      </div>
    )
  }

  if (!user) return null

  const firstName = profile?.first_name || user.email.split('@')[0]
  const lastName  = profile?.last_name  || ''

  return (
    <div style={{ background: LG, minHeight: '100vh' }}>

      {/* Header */}
      <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>My Account</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '20px', fontWeight: 700, color: G }}>
                  {firstName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>My Account</p>
                <h1 style={{ ...F, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>
                  Hello, {firstName} {lastName}
                </h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{ background: 'transparent', border: `1px solid ${BR}`, padding: '10px 20px', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', transition: 'all 0.2s', borderRadius: '8px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="layout-sidebar page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 40px 96px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '32px' }}>
          <div style={{ background: W, border: `1px solid ${BR}`, overflow: 'hidden', borderRadius: '12px' }}>
            <div style={{ height: '3px', background: G }} />
            {[
              { key: 'orders',  label: 'My Orders' },
              { key: 'profile', label: 'Profile'   },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  width: '100%', padding: '14px 20px',
                  background: activeTab === tab.key ? GL : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${activeTab === tab.key ? G : 'transparent'}`,
                  borderBottom: `1px solid ${BR}`,
                  ...F, fontSize: '13px',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  color: activeTab === tab.key ? G : MD,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.18s',
                }}>
                {tab.label}
              </button>
            ))}
            <div style={{ padding: '14px 20px' }}>
              <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, lineHeight: 1.6, wordBreak: 'break-all' }}>
                {user.email}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div>

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK }}>My Orders</h2>
                <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 500, color: G, borderBottom: `1px solid ${G}`, paddingBottom: '1px' }}>
                  Shop Again →
                </Link>
              </div>

              {ordersLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ height: '72px', background: BR, animation: 'pulse 1.5s ease-in-out infinite', borderRadius: '8px' }} />
                  ))}
                  <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
                </div>
              ) : orders.length === 0 ? (
                <div style={{ background: W, border: `1px solid ${BR}`, padding: '60px 40px', textAlign: 'center', borderRadius: '12px' }}>
                  <p style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, marginBottom: '8px' }}>No orders yet</p>
                  <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '24px' }}>Your order history will appear here once you place your first order.</p>
                  <Link to="/shop" style={{ background: BK, color: W, padding: '12px 32px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', display: 'inline-block', transition: 'background 0.2s', borderRadius: '8px' }} onMouseEnter={e => { e.currentTarget.style.background = G }} onMouseLeave={e => { e.currentTarget.style.background = BK }}>
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {orders.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, marginBottom: '24px' }}>Profile</h2>
              <div style={{ background: W, border: `1px solid ${BR}`, padding: '28px', borderRadius: '12px' }}>
                {[
                  { label: 'First Name', value: profile?.first_name || '—' },
                  { label: 'Last Name',  value: profile?.last_name  || '—' },
                  { label: 'Email',      value: user.email },
                  { label: 'Phone',      value: profile?.phone || '—' },
                  { label: 'Gender',     value: profile?.gender || '—' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${BR}`, flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ ...F, fontSize: '13px', fontWeight: 500, color: MD }}>{row.label}</span>
                    <span style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: '20px' }}>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT }}>
                    To update your details, contact us at{' '}
                    <a href="mailto:info@staayonline.com" style={{ color: G, fontWeight: 500 }}>info@staayonline.com</a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
