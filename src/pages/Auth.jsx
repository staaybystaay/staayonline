import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/api'

const G   = '#B8903A'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#999'
const FT  = '#CCC'
const LG  = '#F8F7F5'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const GR  = '#22C55E'
const F   = { fontFamily: "'Inter', sans-serif" }

// Background lifestyle photo — fashion editorial
const BG_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&fit=crop'

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="2.5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 5l6.5 4.5L14 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="2.5" y="6.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4.5 6.5V4.5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="7.5" cy="10" r="1" fill="currentColor"/>
  </svg>
)
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2 13c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="3" y="1" width="9" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="7.5" cy="11.5" r="0.6" fill="currentColor"/>
    <path d="M5.5 3h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M1 7.5s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2 2l11 11M6 6.2A1.8 1.8 0 0 0 8.8 9M4 4C2.2 5.2 1 7.5 1 7.5s2.5 5 6.5 5c1.3 0 2.5-.4 3.5-1M7 2.5c.2 0 .3 0 .5 0 4 0 6.5 5 6.5 5s-.7 1.5-2 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

function Input({ icon: Icon, type = 'text', placeholder, value, onChange, error, valid, showToggle, onToggle, showPass }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: W,
      border: `1.5px solid ${error ? RD : focused ? G : '#DDD'}`,
      borderRadius: '8px',
      padding: '0 14px',
      height: '48px',
      transition: 'border-color 0.2s',
      boxShadow: focused ? `0 0 0 3px ${G}22` : 'none',
    }}>
      {Icon && <span style={{ color: error ? RD : focused ? G : FT, marginRight: '10px', display: 'flex', flexShrink: 0, transition: 'color 0.2s' }}><Icon /></span>}
      <input
        type={type === 'password' ? (showPass ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', ...F, fontSize: '14px', color: DK }}
      />
      {valid && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill={GR}/>
          <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {showToggle && (
        <button type="button" onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: FT, display: 'flex', padding: 0, marginLeft: '8px' }}>
          {showPass ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      )}
    </div>
  )
}

function LoginForm({ onSwitch }) {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try {
      await signIn({ email, password })
      navigate('/')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

      <h1 style={{ ...F, fontSize: '30px', fontWeight: 800, color: DK, marginBottom: '8px', letterSpacing: '-0.025em' }}>Login</h1>
      <p style={{ ...F, fontSize: '13px', color: MD, lineHeight: 1.65, marginBottom: '28px' }}>
        Don't have an account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: G, cursor: 'pointer', padding: 0 }}>
          Create your account
        </button>
        , it takes less than a minute.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Input icon={MailIcon} type="email" placeholder="yourmail@company.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
          valid={email.includes('@') && email.includes('.')} />

        <Input icon={LockIcon} type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError('') }}
          showToggle showPass={showPass} onToggle={() => setShowPass(v => !v)} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: '14px', height: '14px', accentColor: G }} />
            <span style={{ ...F, fontSize: '12px', color: MD }}>Remember me</span>
          </label>
          <button type="button" style={{ background: 'none', border: 'none', ...F, fontSize: '12px', color: G, cursor: 'pointer', padding: 0 }}>
            Forgot password?
          </button>
        </div>

        {error && <p style={{ ...F, fontSize: '12px', color: RD, background: '#FEF2F2', padding: '8px 12px', borderRadius: '6px' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{
          height: '48px', background: loading ? '#CCC' : G, color: W, border: 'none',
          borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
          ...F, fontSize: '15px', fontWeight: 700, letterSpacing: '0.03em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'background 0.2s', marginTop: '4px',
          boxShadow: loading ? 'none' : `0 4px 14px ${G}55`,
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M7 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14H7M11 11.5l3.5-3.5L11 4.5M14.5 8H6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {/* Social */}
      <p style={{ ...F, fontSize: '12px', color: MD, textAlign: 'center', margin: '20px 0 14px' }}>Login with</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        {[
          { bg: '#1877F2', label: 'f' },
          { bg: '#DB4437', label: 'G' },
          { bg: '#1DA1F2', label: '✦' },
        ].map((s, i) => (
          <button key={i} type="button" style={{ width: '44px', height: '44px', borderRadius: '50%', background: s.bg, border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            {s.label}
          </button>
        ))}
      </div>

    </motion.div>
  )
}

function RegisterForm({ onSwitch }) {
  const [form,    setForm]    = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [showP,   setShowP]   = useState(false)
  const [showC,   setShowC]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [done,    setDone]    = useState(false)

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true); setError('')
    try {
      await signUp({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, phone: form.phone })
      setDone(true)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ width: '60px', height: '60px', background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 16px' }}>✓</div>
      <h3 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Check your email</h3>
      <p style={{ ...F, fontSize: '13px', color: MD, lineHeight: 1.65, marginBottom: '20px' }}>We sent a confirmation to <strong>{form.email}</strong>. Click the link to activate your account.</p>
      <button onClick={onSwitch} style={{ background: G, border: 'none', color: W, padding: '12px 32px', borderRadius: '8px', ...F, fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Back to Login</button>
    </motion.div>
  )

  return (
    <motion.div key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <h1 style={{ ...F, fontSize: '30px', fontWeight: 800, color: DK, marginBottom: '8px', letterSpacing: '-0.025em' }}>Create account</h1>
      <p style={{ ...F, fontSize: '13px', color: MD, marginBottom: '24px' }}>
        Already have an account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: G, cursor: 'pointer', padding: 0 }}>Sign in</button>
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input icon={UserIcon} placeholder="First name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
          <Input placeholder="Last name" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
        </div>
        <Input icon={MailIcon} type="email" placeholder="yourmail@example.com" value={form.email} onChange={e => set('email', e.target.value)} valid={form.email.includes('@')} />
        <Input icon={PhoneIcon} type="tel" placeholder="+233 XX XXX XXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
        <Input icon={LockIcon} type="password" placeholder="Password (min. 6 chars)" value={form.password} onChange={e => set('password', e.target.value)} showToggle showPass={showP} onToggle={() => setShowP(v => !v)} />
        <Input icon={LockIcon} type="password" placeholder="Confirm password" value={form.confirm} onChange={e => set('confirm', e.target.value)} showToggle showPass={showC} onToggle={() => setShowC(v => !v)} valid={form.confirm && form.confirm === form.password} />

        {error && <p style={{ ...F, fontSize: '12px', color: RD, background: '#FEF2F2', padding: '8px 12px', borderRadius: '6px' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{
          height: '48px', background: loading ? '#CCC' : G, color: W, border: 'none', borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer', ...F, fontSize: '15px', fontWeight: 700, letterSpacing: '0.03em',
          transition: 'background 0.2s', marginTop: '4px', boxShadow: loading ? 'none' : `0 4px 14px ${G}55`,
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <p style={{ ...F, fontSize: '11px', color: MD, textAlign: 'center' }}>
          By registering you agree to our <Link to="/terms" style={{ color: G }}>Terms</Link> & <Link to="/privacy" style={{ color: G }}>Privacy Policy</Link>
        </p>
      </form>
    </motion.div>
  )
}

// ─── MAIN ─────────────────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* ── LEFT — white form panel ── */}
      <div style={{ width: '480px', flexShrink: 0, background: W, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 52px', position: 'relative', zIndex: 2, boxShadow: '4px 0 40px rgba(0,0,0,0.08)' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '40px' }}>
          <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <p style={{ ...F, fontSize: '20px', fontWeight: 900, color: DK, letterSpacing: '-0.02em', lineHeight: 1 }}>STAAY</p>
            <p style={{ ...F, fontSize: '8px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ONLINE</p>
          </div>
        </Link>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: LG, borderRadius: '8px', padding: '3px', marginBottom: '28px', border: `1px solid ${BR}` }}>
          {[{ key: 'login', label: 'Sign In' }, { key: 'register', label: 'Register' }].map(tab => (
            <button key={tab.key} onClick={() => setMode(tab.key)}
              style={{ flex: 1, padding: '8px 0', borderRadius: '6px', background: mode === tab.key ? W : 'transparent', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: mode === tab.key ? DK : MD, cursor: 'pointer', transition: 'all 0.2s', boxShadow: mode === tab.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {mode === 'login'
            ? <LoginForm    key="login"    onSwitch={() => setMode('register')} />
            : <RegisterForm key="register" onSwitch={() => setMode('login')}    />
          }
        </AnimatePresence>

        {/* Footer */}
        <p style={{ ...F, fontSize: '11px', color: FT, marginTop: '32px', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} STAAY Online · Made in Accra, Ghana
        </p>
      </div>

      {/* ── RIGHT — full photo background ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img src={BG_IMAGE} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        {/* Subtle overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,22,18,0.3) 0%, rgba(26,22,18,0.1) 100%)' }} />
        {/* Brand quote */}
        <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px' }}>
          <p style={{ ...F, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.4)', marginBottom: '10px' }}>
            Effortless.<br />Intentional.<br />Always in season.
          </p>
          <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>
            Eden Collection — SS 2026
          </p>
        </div>
      </div>

    </div>
  )
}
