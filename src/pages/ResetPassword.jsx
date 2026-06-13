import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../lib/api'

const G  = '#B8903A'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#666'
const BR = '#E5E7EB'
const RD = '#E53E3E'
const GR = '#16A34A'
const F  = { fontFamily: "'Inter', sans-serif" }

export default function ResetPassword() {
  const navigate  = useNavigate()
  const [password, setPassword]   = useState('')
  const [confirm,  setConfirm]    = useState('')
  const [loading,  setLoading]    = useState(false)
  const [error,    setError]      = useState('')
  const [done,     setDone]       = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setLoading(true); setError('')
    try {
      await updatePassword(password)
      setDone(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: W, borderRadius: '16px', padding: '40px 36px', width: '100%', maxWidth: '380px', boxShadow: '0 4px 32px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ ...F, fontSize: '24px', fontWeight: 800, color: DK, marginBottom: '6px' }}>Set new password</h2>
          <p style={{ ...F, fontSize: '13px', color: MD }}>Choose a strong password for your account.</p>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
            <p style={{ ...F, fontSize: '15px', fontWeight: 600, color: GR }}>Password updated!</p>
            <p style={{ ...F, fontSize: '13px', color: MD, marginTop: '6px' }}>Redirecting you to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="password" placeholder="New password" value={password} onChange={e => { setPassword(e.target.value); setError('') }}
              style={{ height: '46px', border: `1.5px solid ${BR}`, borderRadius: '8px', padding: '0 14px', ...F, fontSize: '14px', color: DK, outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = G }}
              onBlur={e => { e.target.style.borderColor = BR }} />
            <input type="password" placeholder="Confirm new password" value={confirm} onChange={e => { setConfirm(e.target.value); setError('') }}
              style={{ height: '46px', border: `1.5px solid ${BR}`, borderRadius: '8px', padding: '0 14px', ...F, fontSize: '14px', color: DK, outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = G }}
              onBlur={e => { e.target.style.borderColor = BR }} />
            {error && <p style={{ ...F, fontSize: '12px', color: RD }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ height: '46px', background: loading ? MD : G, color: W, border: 'none', borderRadius: '8px', ...F, fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
