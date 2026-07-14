import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '../components/admin/AdminLayout'
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from '../lib/api'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const PAYMENT_COLORS = {
  unpaid:   { bg: '#FEF2F2', color: '#991B1B', label: 'Unpaid'   },
  paid:     { bg: '#F0FDF4', color: '#166534', label: 'Paid'     },
  refunded: { bg: '#F5F3FF', color: '#5B21B6', label: 'Refunded' },
}
const PAYMENT_STATUSES = ['unpaid', 'paid', 'refunded']

const STATUS_COLORS = {
  pending:    { bg: '#FEF9C3', color: '#854D0E', label: 'Pending'    },
  confirmed:  { bg: '#F0FDF4', color: '#166534', label: 'Confirmed'  },
  processing: { bg: '#EFF6FF', color: '#1E40AF', label: 'Processing' },
  shipped:    { bg: '#F5F3FF', color: '#5B21B6', label: 'Shipped'    },
  delivered:  { bg: '#F0FDF4', color: '#166534', label: 'Delivered'  },
  cancelled:  { bg: '#FEF2F2', color: '#991B1B', label: 'Cancelled'  },
}

function StatusSelect({ value, onChange, updating }) {
  const s = STATUS_COLORS[value] || STATUS_COLORS.pending
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={updating}
        style={{
          appearance: 'none', padding: '6px 28px 6px 12px', borderRadius: '6px',
          border: 'none', background: s.bg, color: s.color,
          ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.03em',
          cursor: updating ? 'wait' : 'pointer', opacity: updating ? 0.6 : 1,
        }}>
        {STATUSES.map(st => (
          <option key={st} value={st}>{STATUS_COLORS[st].label}</option>
        ))}
      </select>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M1 1l4 4 4-4" stroke={s.color} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function PaymentSelect({ value, onChange, updating }) {
  const s = PAYMENT_COLORS[value] || PAYMENT_COLORS.unpaid
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select value={value || 'unpaid'} onChange={e => onChange(e.target.value)} disabled={updating}
        style={{ appearance: 'none', padding: '6px 28px 6px 12px', borderRadius: '6px', border: 'none', background: s.bg, color: s.color, ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.03em', cursor: updating ? 'wait' : 'pointer', opacity: updating ? 0.6 : 1 }}>
        {PAYMENT_STATUSES.map(p => <option key={p} value={p}>{PAYMENT_COLORS[p].label}</option>)}
      </select>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M1 1l4 4 4-4" stroke={s.color} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function OrderRow({ order, onStatusChange, onPaymentChange }) {
  const [open,     setOpen]     = useState(false)
  const [updating, setUpdating] = useState(false)
  const date = new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const time = new Date(order.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  const hasCustomizations = order.order_items?.some(i => i.customization)

  async function handleStatusChange(newStatus) {
    setUpdating(true)
    try { await onStatusChange(order.id, newStatus) } finally { setUpdating(false) }
  }

  async function handlePaymentChange(newStatus) {
    setUpdating(true)
    try { await onPaymentChange(order.id, newStatus) } finally { setUpdating(false) }
  }

  return (
    <div style={{ border: `1px solid ${BR}`, borderRadius: '10px', background: W, overflow: 'hidden' }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', cursor: 'pointer', gap: '16px', flexWrap: 'wrap', background: open ? LG : W, transition: 'background 0.15s' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          <div style={{ minWidth: '100px' }}>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Order</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <div style={{ minWidth: '160px', flex: 1 }}>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Customer</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {order.shipping_address?.full_name || order.email}
            </p>
          </div>
          <div style={{ minWidth: '110px' }}>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Date</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{date}</p>
          </div>
          <div style={{ minWidth: '90px' }}>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Total</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>GH₵{Number(order.total).toLocaleString()}</p>
          </div>
          <div style={{ minWidth: '90px' }}>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Items</p>
            <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{order.order_items?.length || 0}</p>
          </div>
        </div>

        <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {hasCustomizations && (
            <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#FEF3C7', color: '#92400E', ...F, fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap' }}>
              ✦ Custom
            </span>
          )}
          <PaymentSelect value={order.payment_status} onChange={handlePaymentChange} updating={updating} />
          <StatusSelect value={order.status} onChange={handleStatusChange} updating={updating} />
        </div>

        <span style={{ ...F, fontSize: '18px', color: MD, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>
          ›
        </span>
      </div>

      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.22 }}
          style={{ borderTop: `1px solid ${BR}`, padding: '16px 18px' }}>

          <div className="admin-order-detail" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '16px' }}>

            {/* Items */}
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Items</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {order.order_items?.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '52px', background: LG, flexShrink: 0, overflow: 'hidden', position: 'relative', borderRadius: '4px' }}>
                      {item.image_url && <img src={item.image_url} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{item.name}</p>
                      <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>
                        Qty: {item.qty} × GH₵{Number(item.price).toLocaleString()}
                        {item.size && <span style={{ marginLeft: '8px', fontWeight: 500 }}>· Size: {item.size}</span>}
                      </p>
                      {item.customization && (
                        <div style={{ marginTop: '6px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '8px 10px', ...F, fontSize: '11px', color: '#92400E', lineHeight: 1.6 }}>
                          <p style={{ fontWeight: 700, marginBottom: '2px' }}>✦ Customization Request</p>
                          {item.customization.color && <p>Colour: <strong>{item.customization.color}</strong></p>}
                          {item.customization.note  && <p>Note: {item.customization.note}</p>}
                        </div>
                      )}
                    </div>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>GH₵{Number(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & shipping */}
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Delivery Details</p>
              <div style={{ background: LG, borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{order.shipping_address?.full_name || '—'}</p>
                <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>{order.email}</p>
                {order.shipping_address?.phone && <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>{order.shipping_address.phone}</p>}
                {order.shipping_address?.address && (
                  <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, marginTop: '6px', lineHeight: 1.6 }}>
                    {order.shipping_address.address}
                    {order.shipping_address.city && `, ${order.shipping_address.city}`}
                    {order.shipping_address.country && `, ${order.shipping_address.country}`}
                  </p>
                )}
                <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT, marginTop: '8px' }}>Placed at {time}</p>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <a href={`mailto:${order.email}`}
                  style={{ flex: 1, textAlign: 'center', padding: '9px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 500, color: DK, textDecoration: 'none' }}>
                  Email Customer
                </a>
                {order.shipping_address?.phone && (
                  <a href={`https://wa.me/${order.shipping_address.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, textAlign: 'center', padding: '9px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 500, color: '#16A34A', textDecoration: 'none' }}>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function AdminOrders() {
  const [orders,    setOrders]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [search,    setSearch]    = useState('')
  const [statusFilter,    setStatusFilter]    = useState('all')
  const [customOnly,      setCustomOnly]      = useState(false)

  function load() {
    setLoading(true)
    getAllOrders()
      .then(data => setOrders(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch orders once on mount
    load()
  }, [])

  async function handleStatusChange(orderId, newStatus) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (err) {
      alert('Failed to update order status: ' + err.message)
      load()
    }
  }

  async function handlePaymentChange(orderId, newStatus) {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, payment_status: newStatus } : o))
    try {
      await updatePaymentStatus(orderId, newStatus)
    } catch (err) {
      alert('Failed to update payment status: ' + err.message)
      load()
    }
  }

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false
      if (customOnly && !o.order_items?.some(i => i.customization)) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        const matchesId    = o.id.toLowerCase().includes(q)
        const matchesEmail = o.email?.toLowerCase().includes(q)
        const matchesName  = o.shipping_address?.full_name?.toLowerCase().includes(q)
        if (!matchesId && !matchesEmail && !matchesName) return false
      }
      return true
    })
  }, [orders, search, statusFilter, customOnly])

  const counts = useMemo(() => {
    const c = { all: orders.length }
    STATUSES.forEach(s => { c[s] = orders.filter(o => o.status === s).length })
    return c
  }, [orders])

  return (
    <AdminLayout title="Orders">

      {error && (
        <div style={{ padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', ...F, fontSize: '13px', color: '#991B1B', marginBottom: '20px' }}>
          Failed to load orders: {error}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>

        {/* Status tabs + custom filter */}
        <div className="hide-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', alignItems: 'center' }}>
          {['all', ...STATUSES].map(st => {
            const active = statusFilter === st
            const label = st === 'all' ? 'All' : STATUS_COLORS[st].label
            return (
              <button key={st} onClick={() => setStatusFilter(st)}
                style={{ flexShrink: 0, padding: '7px 16px', borderRadius: '100px', border: `1px solid ${active ? DK : BR}`, background: active ? DK : W, color: active ? W : DK, ...F, fontSize: '12px', fontWeight: active ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s' }}>
                {label} {counts[st] !== undefined && `(${counts[st]})`}
              </button>
            )
          })}
          <div style={{ width: '1px', height: '22px', background: BR, flexShrink: 0, margin: '0 4px' }} />
          <button onClick={() => setCustomOnly(v => !v)}
            style={{ flexShrink: 0, padding: '7px 16px', borderRadius: '100px', border: `1px solid ${customOnly ? '#92400E' : BR}`, background: customOnly ? '#FEF3C7' : W, color: customOnly ? '#92400E' : DK, ...F, fontSize: '12px', fontWeight: customOnly ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s' }}>
            ✦ Custom requests {customOnly ? '(on)' : ''}
          </button>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: W, border: `1px solid ${BR}`, borderRadius: '8px', padding: '10px 14px', maxWidth: '360px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={FT} strokeWidth="1.3"/><path d="M9.5 9.5L13 13" stroke={FT} strokeWidth="1.3" strokeLinecap="round"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID, name, or email..."
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', ...F, fontSize: '13px', color: DK }} />
        </div>
      </div>

      {/* Orders list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ height: '64px', background: BR, borderRadius: '10px', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: W, border: `1px solid ${BR}`, borderRadius: '12px' }}>
          <p style={{ ...F, fontSize: '15px', fontWeight: 600, color: DK, marginBottom: '4px' }}>No orders found</p>
          <p style={{ ...F, fontSize: '13px', color: MD }}>
            {search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Orders will appear here once customers start checking out.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(order => (
            <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} onPaymentChange={handlePaymentChange} />
          ))}
        </div>
      )}

    </AdminLayout>
  )
}
