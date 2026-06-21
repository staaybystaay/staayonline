import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from './AdminLayout'
import { getContactMessages, markMessageRead, deleteContactMessage } from '../../lib/api'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#5B564F'
const BR  = '#E8E4DF'
const LG  = '#F7F6F4'
const RD  = '#C0392B'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const TABS = [
  { key: 'all',  label: 'All'  },
  { key: 'new',  label: 'New'  },
  { key: 'read', label: 'Read' },
]

// ─── Message card ────────────────────────────
function MessageCard({ msg, onMarkRead, onDeleteRequest }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ border: `1px solid ${BR}`, borderRadius: '10px', overflow: 'hidden', background: W }}>
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', padding: '16px 18px', cursor: 'pointer' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>{msg.name}</p>
            {msg.status === 'new' && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: G, flexShrink: 0 }} />
            )}
            {msg.email && (
              <a href={`mailto:${msg.email}`} onClick={e => e.stopPropagation()} style={{ ...F, fontSize: '12px', color: MD, textDecoration: 'none' }}>
                {msg.email}
              </a>
            )}
          </div>
          <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: expanded ? DK : MD, lineHeight: 1.6, whiteSpace: expanded ? 'normal' : 'nowrap', overflow: expanded ? 'visible' : 'hidden', textOverflow: 'ellipsis' }}>
            {msg.message}
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ ...F, fontSize: '11px', color: FT, whiteSpace: 'nowrap' }}>{formatDate(msg.created_at)}</p>
        </div>
      </div>

      {expanded && (
        <div style={{ display: 'flex', gap: '8px', padding: '0 18px 16px', flexWrap: 'wrap' }}>
          {msg.status === 'new' && (
            <button onClick={e => { e.stopPropagation(); onMarkRead(msg.id) }}
              style={{ padding: '7px 14px', background: '#ECFDF3', border: '1px solid #BBF7D0', borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 600, color: GR, cursor: 'pointer' }}>
              Mark as Read
            </button>
          )}
          {msg.email && (
            <a href={`mailto:${msg.email}`} onClick={e => e.stopPropagation()}
              style={{ padding: '7px 14px', background: LG, border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: 'pointer', textDecoration: 'none' }}>
              Reply by Email
            </a>
          )}
          <button onClick={e => { e.stopPropagation(); onDeleteRequest(msg) }}
            style={{ padding: '7px 14px', background: 'none', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.color = RD; e.currentTarget.style.borderColor = RD }}
            onMouseLeave={e => { e.currentTarget.style.color = MD; e.currentTarget.style.borderColor = BR }}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Delete confirm ─────────────────────────────
function DeleteConfirmModal({ msg, onCancel, onConfirm, deleting }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div onClick={e => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        style={{ background: W, borderRadius: '12px', padding: '28px', maxWidth: '380px', width: '100%' }}>
        <h3 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Delete this message?</h3>
        <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.6, marginBottom: '24px' }}>
          The message from "{msg.name}" will be permanently removed.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} disabled={deleting}
            style={{ flex: 1, padding: '11px', background: LG, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting}
            style={{ flex: 1, padding: '11px', background: RD, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, color: W, cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.7 : 1 }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════
export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const [tab,       setTab]       = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting,  setDeleting]  = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await getContactMessages()
      setMessages(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    if (tab === 'all') return messages
    return messages.filter(m => m.status === tab)
  }, [messages, tab])

  const newCount = useMemo(() => messages.filter(m => m.status === 'new').length, [messages])

  async function handleMarkRead(id) {
    try {
      await markMessageRead(id)
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m))
    } catch (err) {
      setError(err.message || 'Failed to update message')
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteContactMessage(deleteTarget.id)
      setMessages(prev => prev.filter(m => m.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      setError(err.message || 'Failed to delete message')
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout title="Messages">

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px', maxWidth: '480px' }}>
        <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', padding: '18px 20px' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>Total Messages</p>
          <p style={{ ...F, fontSize: '26px', fontWeight: 800, color: DK }}>{messages.length}</p>
        </div>
        <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', padding: '18px 20px' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>New / Unread</p>
          <p style={{ ...F, fontSize: '26px', fontWeight: 800, color: G }}>{newCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${tab === t.key ? DK : BR}`, background: tab === t.key ? DK : 'transparent', color: tab === t.key ? W : DK, ...F, fontSize: '12px', fontWeight: tab === t.key ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
            {t.label}
            {t.key === 'new' && newCount > 0 && (
              <span style={{ marginLeft: '6px', opacity: 0.8 }}>({newCount})</span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '14px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', ...F, fontSize: '13px', color: RD, marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ ...F, fontSize: '13px', color: MD }}>Loading messages...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', border: `1px solid ${BR}`, borderRadius: '10px' }}>
          <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '6px' }}>
            {messages.length === 0 ? 'No messages yet' : 'Nothing here'}
          </p>
          <p style={{ ...F, fontSize: '13px', color: MD }}>
            {messages.length === 0 ? 'Messages from the Contact page will show up here.' : 'Try a different tab.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(msg => (
            <MessageCard key={msg.id} msg={msg} onMarkRead={handleMarkRead} onDeleteRequest={setDeleteTarget} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            msg={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={confirmDelete}
            deleting={deleting}
          />
        )}
      </AnimatePresence>

    </AdminLayout>
  )
}
