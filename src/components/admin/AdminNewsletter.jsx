import { useState, useEffect, useMemo } from 'react'
import AdminLayout from './AdminLayout'
import { getNewsletterSubscribers, deleteNewsletterSubscriber } from '../../lib/api'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#5B564F'
const BR  = '#E8E4DF'
const LG  = '#F7F6F4'
const RD  = '#C0392B'
const F   = { fontFamily: "'Inter', sans-serif" }

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function exportCSV(subscribers) {
  const header = 'Email,Subscribed Date\n'
  const rows = subscribers
    .map(s => `${s.email},${new Date(s.created_at).toISOString()}`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `staay-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Subscriber row ─────────────────────────────
function SubscriberRow({ sub, onRemoved }) {
  const [confirming, setConfirming] = useState(false)
  const [removing,   setRemoving]   = useState(false)

  async function handleRemove() {
    setRemoving(true)
    try {
      await deleteNewsletterSubscriber(sub.id)
      onRemoved(sub.id)
    } catch {
      setRemoving(false)
      setConfirming(false)
    }
  }

  return (
    <div className="admin-newsletter-row" style={{ display: 'grid', gridTemplateColumns: '1fr 160px 140px', alignItems: 'center', gap: '14px', padding: '13px 16px', borderBottom: `1px solid ${BR}` }}>
      <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.email}</p>
      <p className="admin-newsletter-date" style={{ ...F, fontSize: '12px', color: MD }}>{formatDate(sub.created_at)}</p>

      {confirming ? (
        <div style={{ display: 'flex', gap: '6px', justifySelf: 'end' }}>
          <button onClick={handleRemove} disabled={removing}
            style={{ padding: '6px 12px', background: RD, border: 'none', borderRadius: '6px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: removing ? 'not-allowed' : 'pointer' }}>
            {removing ? '...' : 'Confirm'}
          </button>
          <button onClick={() => setConfirming(false)} disabled={removing}
            style={{ padding: '6px 12px', background: LG, border: 'none', borderRadius: '6px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={() => setConfirming(true)}
          style={{ background: 'none', border: 'none', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', justifySelf: 'end' }}
          onMouseEnter={e => { e.currentTarget.style.color = RD }}
          onMouseLeave={e => { e.currentTarget.style.color = MD }}>
          Remove
        </button>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════
export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [search,      setSearch]      = useState('')

  useEffect(() => {
    getNewsletterSubscribers()
      .then(data => setSubscribers(data || []))
      .catch(err => setError(err.message || 'Failed to load subscribers'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return subscribers
    const q = search.trim().toLowerCase()
    return subscribers.filter(s => s.email.toLowerCase().includes(q))
  }, [subscribers, search])

  // Subscribers in the last 7 days, for a quick "momentum" stat
  const recentCount = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return subscribers.filter(s => new Date(s.created_at).getTime() > weekAgo).length
  }, [subscribers])

  function handleRemoved(id) {
    setSubscribers(prev => prev.filter(s => s.id !== id))
  }

  return (
    <AdminLayout title="Newsletter">

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px', maxWidth: '480px' }}>
        <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', padding: '18px 20px' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>Total Subscribers</p>
          <p style={{ ...F, fontSize: '26px', fontWeight: 800, color: DK }}>{subscribers.length}</p>
        </div>
        <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', padding: '18px 20px' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>New This Week</p>
          <p style={{ ...F, fontSize: '26px', fontWeight: 800, color: G }}>{recentCount}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email..."
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '8px', ...F, fontSize: '13px', color: DK, outline: 'none' }} />
        <button onClick={() => exportCSV(filtered)} disabled={filtered.length === 0}
          style={{ padding: '10px 20px', background: filtered.length === 0 ? LG : DK, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, color: filtered.length === 0 ? MD : W, cursor: filtered.length === 0 ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
          ↓ Export CSV
        </button>
      </div>

      {error && (
        <div style={{ padding: '14px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', ...F, fontSize: '13px', color: RD, marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', overflow: 'hidden' }}>

        <div className="admin-newsletter-row admin-newsletter-header" style={{ display: 'grid', gridTemplateColumns: '1fr 160px 140px', gap: '14px', padding: '12px 16px', background: LG, borderBottom: `1px solid ${BR}` }}>
          <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email</span>
          <span className="admin-newsletter-date" style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Subscribed</span>
          <span></span>
        </div>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '13px', color: MD }}>Loading subscribers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '6px' }}>
              {subscribers.length === 0 ? 'No subscribers yet' : 'No matches'}
            </p>
            <p style={{ ...F, fontSize: '13px', color: MD }}>
              {subscribers.length === 0 ? 'Subscribers from the footer signup form will show up here.' : 'Try a different search.'}
            </p>
          </div>
        ) : (
          filtered.map(sub => <SubscriberRow key={sub.id} sub={sub} onRemoved={handleRemoved} />)
        )}
      </div>

      <p style={{ ...F, fontSize: '12px', color: MD, marginTop: '14px' }}>
        {filtered.length} of {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
      </p>

    </AdminLayout>
  )
}
