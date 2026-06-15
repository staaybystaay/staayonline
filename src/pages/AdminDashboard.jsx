import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'
import { getAllOrders } from '../lib/api'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const GR  = '#16A34A'
const BL  = '#3B5BDB'
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

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '12px', padding: '20px 22px' }}>
      <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</p>
      <p style={{ ...F, fontSize: '28px', fontWeight: 800, color: accent || DK, letterSpacing: '-0.02em', marginBottom: '4px' }}>{value}</p>
      {sub && <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD }}>{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    getAllOrders()
      .then(data => setOrders(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const totalOrders   = orders.length
  const pendingCount  = orders.filter(o => o.status === 'pending').length
  const totalRevenue  = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total || 0), 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todaysOrders = orders.filter(o => new Date(o.created_at) >= today)

  const recentOrders = orders.slice(0, 6)

  return (
    <AdminLayout title="Dashboard">

      {error && (
        <div style={{ padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', ...F, fontSize: '13px', color: '#991B1B', marginBottom: '20px' }}>
          Failed to load orders: {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatCard label="Total Orders"   value={loading ? '—' : totalOrders}                                  sub="All time" />
        <StatCard label="Total Revenue"  value={loading ? '—' : `GH₵${totalRevenue.toLocaleString()}`}        sub="Excludes cancelled" accent={G} />
        <StatCard label="Pending Orders" value={loading ? '—' : pendingCount}                                  sub="Need attention" accent={pendingCount > 0 ? '#854D0E' : DK} />
        <StatCard label="Today's Orders" value={loading ? '—' : todaysOrders.length}                           sub={today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} />
      </div>

      {/* Recent orders */}
      <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${BR}` }}>
          <h3 style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>Recent Orders</h3>
          <Link to="/admin/orders" style={{ ...F, fontSize: '12px', fontWeight: 600, color: G, textDecoration: 'none' }}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '13px', color: FT }}>Loading orders...</p>
          </div>
        ) : recentOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '13px', color: FT }}>No orders yet.</p>
          </div>
        ) : (
          <div>
            {recentOrders.map(order => (
              <Link key={order.id} to="/admin/orders"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: `1px solid ${BR}`, textDecoration: 'none', transition: 'background 0.15s', gap: '12px', flexWrap: 'wrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = LG }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flex: 1 }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.email}</p>
                  </div>
                </div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, flexShrink: 0 }}>
                  {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </p>
                <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK, flexShrink: 0 }}>GH₵{Number(order.total).toLocaleString()}</p>
                <div style={{ flexShrink: 0 }}><StatusBadge status={order.status} /></div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  )
}
