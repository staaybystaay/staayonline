import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/api'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#BBB'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── Icons ───────────────────────────────────
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
  </svg>
)
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="8" cy="12.5" r="0.7" fill="currentColor"/>
    <path d="M6 3h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const EyeIcon = ({ visible }) => visible ? (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 2l12 12M6.5 6.7A2 2 0 0 0 9.3 9.5M4.5 4.7C2.7 5.9 1 8 1 8s2.5 5 7 5c1.4 0 2.7-.4 3.8-1M7 3.1c.3 0 .7-.1 1-.1 4.5 0 7 5 7 5s-.8 1.6-2.2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" fill={GR}/>
    <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─── Input Field ─────────────────────────────
function Field({ label, type = 'text', value, onChange, placeholder, error, icon: Icon, valid }) {
  const [focused,  setFocused]  = useState(false)
  const [showPass, setShowPass] = useState(false)
  const isPass = type === 'password'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label style={{ ...F, fontSize: '12px', fontWeight: 500, color: error ? RD : DK, letterSpacing: '0.01em' }}>
          {error || label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        border: `1.5px solid ${error ? RD : focused ? G : BR}`,
        background: focused ? W : LG,
        padding: '11px 14px',
        transition: 'all 0.2s',
      }}>
        {Icon && <span style={{ color: focused ? G : FT, flexShrink: 0, display: 'flex', transition: 'color 0.2s' }}><Icon /></span>}
        <input
          type={isPass && showPass ? 'text' : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...F, fontSize: '14px', color: DK }}
        />
        {isPass && (
          <button type="button" onClick={() => setShowPass(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: FT, display: 'flex', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.color = FT }}>
            <EyeIcon visible={showPass} />
          </button>
        )}
        {valid && !isPass && <span style={{ flexShrink: 0 }}><CheckIcon /></span>}
      </div>
    </div>
  )
}

// ─── Login Form ───────────────────────────────
function LoginForm({ onSwitch }) {
  const navigate = useNavigate()
  const [form,     setForm]     = useState({ email: '', password: '' })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState('')

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: '' })); setApiError('') }

  function validate() {
    const e = {}
    if (!form.email || !form.email.includes('@')) e.email = 'Enter a valid email'
    if (!form.password || form.password.length < 6) e.password = 'Password is required'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      await signIn({ email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setApiError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

      <h2 style={{ ...F, fontSize: '28px', fontWeight: 800, color: DK, letterSpacing: '-0.025em', textAlign: 'center', marginBottom: '6px' }}>
        Welcome back
      </h2>
      <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, textAlign: 'center', lineHeight: 1.6, marginBottom: '28px' }}>
        Don't have an account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: G, cursor: 'pointer', padding: 0 }}>
          Create your account
        </button>
        , it takes less than a minute.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Field label="Email Address" type="email" value={form.email} onChange={e => set('email', e.target.value)}
          placeholder="yourmail@example.com" error={errors.email} icon={MailIcon}
          valid={form.email.includes('@') && form.email.includes('.')} />

        <Field label="Password" type="password" value={form.password} onChange={e => set('password', e.target.value)}
          placeholder="Enter your password" error={errors.password} icon={LockIcon} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '14px', height: '14px', accentColor: G, cursor: 'pointer' }} />
            <span style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>Remember me</span>
          </label>
          <button type="button" style={{ background: 'none', border: 'none', ...F, fontSize: '12px', fontWeight: 500, color: G, cursor: 'pointer', padding: 0 }}>
            Forgot password?
          </button>
        </div>

        {apiError && (
          <div style={{ padding: '10px 14px', background: '#FEF2F2', border: `1px solid #FECACA`, borderLeft: `3px solid ${RD}`, ...F, fontSize: '13px', color: RD }}>
            {apiError}
          </div>
        )}

        <button type="submit" disabled={loading}
          style={{ padding: '14px', background: loading ? MD : G, color: W, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', ...F, fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
          {loading ? 'Signing in...' : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
        <div style={{ flex: 1, height: '1px', background: BR }} />
        <span style={{ ...F, fontSize: '11px', color: FT, whiteSpace: 'nowrap' }}>or continue with</span>
        <div style={{ flex: 1, height: '1px', background: BR }} />
      </div>

      {/* Social buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {[
          { label: 'Google',   bg: '#DB4437', icon: 'G' },
          { label: 'Facebook', bg: '#1877F2', icon: 'f' },
        ].map(s => (
          <button key={s.label} type="button"
            style={{ flex: 1, padding: '10px', background: s.bg, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            <span style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1 }}>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

    </motion.div>
  )
}

// ─── Register Form ────────────────────────────
function RegisterForm({ onSwitch }) {
  const [form,     setForm]     = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState('')
  const [done,     setDone]     = useState(false)

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: '' })); setApiError('') }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name required'
    if (!form.lastName.trim())  e.lastName  = 'Last name required'
    if (!form.email || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.phone.trim())     e.phone     = 'Phone number required'
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      await signUp({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, phone: form.phone })
      setDone(true)
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{ width: '64px', height: '64px', background: '#F0FDF4', border: `2px solid #BBF7D0`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 20px' }}>✓</div>
      <h3 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Check your email</h3>
      <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7, marginBottom: '24px' }}>
        We sent a confirmation link to <strong style={{ color: DK }}>{form.email}</strong>.<br/>Click it to activate your account.
      </p>
      <button onClick={onSwitch} style={{ background: G, border: 'none', color: W, padding: '12px 36px', ...F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
        Back to Sign In
      </button>
    </motion.div>
  )

  return (
    <motion.div key="register" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

      <h2 style={{ ...F, fontSize: '28px', fontWeight: 800, color: DK, letterSpacing: '-0.025em', textAlign: 'center', marginBottom: '6px' }}>
        Create account
      </h2>
      <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, textAlign: 'center', lineHeight: 1.6, marginBottom: '28px' }}>
        Already have an account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: G, cursor: 'pointer', padding: 0 }}>
          Sign in instead
        </button>
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First" error={errors.firstName} icon={UserIcon} />
          <Field label="Last Name"  value={form.lastName}  onChange={e => set('lastName',  e.target.value)} placeholder="Last"  error={errors.lastName}  />
        </div>
        <Field label="Email Address" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="yourmail@example.com" error={errors.email} icon={MailIcon} valid={form.email.includes('@')} />
        <Field label="Phone Number"  type="tel"   value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+233 XX XXX XXXX" error={errors.phone} icon={PhoneIcon} />
        <Field label="Password"      type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min. 6 characters" error={errors.password} icon={LockIcon} />
        <Field label="Confirm Password" type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Repeat your password" error={errors.confirm} icon={LockIcon} />

        {apiError && (
          <div style={{ padding: '10px 14px', background: '#FEF2F2', border: `1px solid #FECACA`, borderLeft: `3px solid ${RD}`, ...F, fontSize: '13px', color: RD }}>
            {apiError}
          </div>
        )}

        <button type="submit" disabled={loading}
          style={{ padding: '14px', background: loading ? MD : G, color: W, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', ...F, fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', marginTop: '4px', transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ ...F, fontSize: '11px', color: FT, textAlign: 'center', lineHeight: 1.6 }}>
          By registering you agree to our{' '}
          <Link to="/terms" style={{ color: G }}>Terms</Link> and{' '}
          <Link to="/privacy" style={{ color: G }}>Privacy Policy</Link>
        </p>
      </form>
    </motion.div>
  )
}

// ─── MAIN AUTH PAGE ───────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login')

  return (
    <div style={{ minHeight: '100vh', background: LG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 12px rgba(184,144,58,0.3)' }} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ ...F, fontSize: '22px', fontWeight: 900, color: DK, letterSpacing: '-0.02em', lineHeight: 1 }}>STAAY</p>
              <p style={{ ...F, fontSize: '9px', fontWeight: 600, color: G, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ONLINE</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: W, padding: '36px 40px', boxShadow: '0 4px 40px rgba(26,22,18,0.1)', border: `1px solid ${BR}` }}>

          {/* Tab switcher */}
          <div style={{ display: 'flex', border: `1px solid ${BR}`, marginBottom: '28px', borderRadius: '6px', overflow: 'hidden' }}>
            {[{ key: 'login', label: 'Sign In' }, { key: 'register', label: 'Register' }].map(tab => (
              <button key={tab.key} onClick={() => setMode(tab.key)}
                style={{ flex: 1, padding: '10px 0', background: mode === tab.key ? G : 'transparent', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: mode === tab.key ? W : MD, cursor: 'pointer', transition: 'all 0.2s' }}>
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
        </motion.div>

        {/* Footer */}
        <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT, textAlign: 'center', marginTop: '20px' }}>
          © {new Date().getFullYear()} STAAY Online · Made in Accra
        </p>

      </div>
    </div>
  )
}
