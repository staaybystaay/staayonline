import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const RD  = '#B91C1C'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── INPUT ───────────────────────────────────
function Input({ label, type, value, onChange, placeholder, error, right }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        ...F, fontSize: '12px', fontWeight: 500,
        color: error ? RD : DK,
        letterSpacing: '0.02em',
      }}>
        {error || label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: right ? '13px 44px 13px 14px' : '13px 14px',
            border: `1px solid ${error ? RD : focused ? BK : BR}`,
            background: W,
            ...F, fontSize: '14px', fontWeight: 400,
            color: DK, outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
            borderRadius: '0',
          }}
        />
        {right && (
          <div style={{
            position: 'absolute', right: '14px', top: '50%',
            transform: 'translateY(-50%)',
          }}>
            {right}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── EYE ICON ────────────────────────────────
function Eye({ show }) {
  return show ? (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M1 8.5s3-5.5 7.5-5.5S16 8.5 16 8.5s-3 5.5-7.5 5.5S1 8.5 1 8.5z" stroke={FT} strokeWidth="1.3"/>
      <circle cx="8.5" cy="8.5" r="2.2" stroke={FT} strokeWidth="1.3"/>
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M1 8.5s3-5.5 7.5-5.5S16 8.5 16 8.5s-3 5.5-7.5 5.5S1 8.5 1 8.5z" stroke={FT} strokeWidth="1.3"/>
      <circle cx="8.5" cy="8.5" r="2.2" stroke={FT} strokeWidth="1.3"/>
      <path d="M2 2l13 13" stroke={FT} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

// ─── LOGIN FORM ──────────────────────────────
function LoginForm({ onSwitch }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  function validate() {
    const e = {}
    if (!email || !email.includes('@')) e.email = 'Enter a valid email address'
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1400)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '16px',
          padding: '40px 0', textAlign: 'center',
        }}>
        <div style={{
          width: '56px', height: '56px',
          background: G,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
        }}>
          ✓
        </div>
        <h3 style={{ ...F, fontSize: '22px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>
          Welcome back
        </h3>
        <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>
          You are signed in to Staay Online.
        </p>
        <Link
          to="/shop"
          style={{
            background: BK, color: W, padding: '13px 36px',
            ...F, fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.04em', marginTop: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = G }}
          onMouseLeave={e => { e.currentTarget.style.background = BK }}>
          Continue Shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
        placeholder="you@example.com"
        error={errors.email}
      />

      <Input
        label="Password"
        type={showPw ? 'text' : 'password'}
        value={password}
        onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }}
        placeholder="Enter your password"
        error={errors.password}
        right={
          <button
            onClick={() => setShowPw(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Eye show={showPw} />
          </button>
        }
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{
          background: 'none', border: 'none',
          ...F, fontSize: '13px', fontWeight: 400, color: G,
          cursor: 'pointer', padding: 0,
          textDecoration: 'underline', textUnderlineOffset: '3px',
        }}>
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          background: loading ? BR : BK,
          color: loading ? MD : W,
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          ...F, fontSize: '14px', fontWeight: 600,
          letterSpacing: '0.04em', transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = G }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = BK }}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: BR }} />
        <span style={{ ...F, fontSize: '12px', fontWeight: 400, color: FT }}>or</span>
        <div style={{ flex: 1, height: '1px', background: BR }} />
      </div>

      {/* Social */}
      {['Continue with Google', 'Continue with Facebook'].map(label => (
        <button
          key={label}
          style={{
            width: '100%', padding: '13px',
            background: W, border: `1px solid ${BR}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            ...F, fontSize: '13px', fontWeight: 400, color: DK,
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = DK }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
          <span style={{
            width: '20px', height: '20px', borderRadius: '50%',
            border: `1px solid ${BR}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            ...F, fontSize: '11px', fontWeight: 700, color: DK,
          }}>
            {label.includes('Google') ? 'G' : 'f'}
          </span>
          {label}
        </button>
      ))}

      <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, textAlign: 'center' }}>
        Don't have an account?{' '}
        <button
          onClick={onSwitch}
          style={{
            background: 'none', border: 'none',
            ...F, fontSize: '13px', fontWeight: 600, color: DK,
            cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px',
          }}>
          Create one
        </button>
      </p>

    </div>
  )
}

// ─── SIGNUP FORM ─────────────────────────────
function SignupForm({ onSwitch }) {
  const [first,   setFirst]   = useState('')
  const [last,    setLast]    = useState('')
  const [email,   setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [agreed,  setAgreed]  = useState(false)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : password.match(/[A-Z]/) && password.match(/[0-9]/) ? 4 : 3

  const strengthColor = ['', RD, '#D97706', G, '#16A34A'][strength]
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]

  function validate() {
    const e = {}
    if (!first.trim()) e.first = 'First name required'
    if (!last.trim())  e.last  = 'Last name required'
    if (!email || !email.includes('@')) e.email = 'Enter a valid email address'
    if (!password || password.length < 6) e.password = 'Minimum 6 characters'
    if (!agreed) e.agreed = 'Please accept the terms to continue'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1400)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '16px',
          padding: '40px 0', textAlign: 'center',
        }}>
        <div style={{
          width: '56px', height: '56px', background: G,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', color: W,
        }}>
          ✓
        </div>
        <h3 style={{ ...F, fontSize: '22px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>
          Account created
        </h3>
        <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>
          Welcome to Staay Online.
        </p>
        <Link
          to="/shop"
          style={{
            background: BK, color: W, padding: '13px 36px',
            ...F, fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.04em', marginTop: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = G }}
          onMouseLeave={e => { e.currentTarget.style.background = BK }}>
          Start Shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="First Name"
          type="text"
          value={first}
          onChange={e => { setFirst(e.target.value); setErrors(v => ({ ...v, first: '' })) }}
          placeholder="First"
          error={errors.first}
        />
        <Input
          label="Last Name"
          type="text"
          value={last}
          onChange={e => { setLast(e.target.value); setErrors(v => ({ ...v, last: '' })) }}
          placeholder="Last"
          error={errors.last}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
        placeholder="you@example.com"
        error={errors.email}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Input
          label="Password"
          type={showPw ? 'text' : 'password'}
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }}
          placeholder="Create a password (6+ characters)"
          error={errors.password}
          right={
            <button
              onClick={() => setShowPw(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <Eye show={showPw} />
            </button>
          }
        />
        {/* Strength bar */}
        {password.length > 0 && (
          <div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  style={{
                    flex: 1, height: '3px',
                    background: i <= strength ? strengthColor : BR,
                    transition: 'background 0.3s',
                  }} />
              ))}
            </div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: strengthColor }}>
              {strengthLabel}
            </p>
          </div>
        )}
      </div>

      {/* Terms */}
      <div>
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => { setAgreed(v => !v); setErrors(v => ({ ...v, agreed: '' })) }}
            style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: G, cursor: 'pointer', flexShrink: 0 }}
          />
          <span style={{ ...F, fontSize: '13px', fontWeight: 300, color: errors.agreed ? RD : MD, lineHeight: 1.6 }}>
            I agree to the{' '}
            <span style={{ color: DK, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}>
              Terms of Service
            </span>
            {' '}and{' '}
            <span style={{ color: DK, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}>
              Privacy Policy
            </span>
          </span>
        </label>
        {errors.agreed && (
          <p style={{ ...F, fontSize: '11px', color: RD, marginTop: '4px' }}>
            {errors.agreed}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          background: loading ? BR : BK,
          color: loading ? MD : W,
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          ...F, fontSize: '14px', fontWeight: 600,
          letterSpacing: '0.04em', transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = G }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = BK }}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, textAlign: 'center' }}>
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          style={{
            background: 'none', border: 'none',
            ...F, fontSize: '13px', fontWeight: 600, color: DK,
            cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px',
          }}>
          Sign in
        </button>
      </p>

    </div>
  )
}

// ─── AUTH PAGE ───────────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login')

  const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=90&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&fit=crop',
  ]
  const [imgIdx] = useState(() => Math.floor(Math.random() * images.length))

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      background: W,
    }}>

      {/* ── LEFT — IMAGE PANEL ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={images[imgIdx]}
          alt="Staay"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.2) 60%, rgba(17,17,17,0.05) 100%)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: G }} />

        {/* Logo */}
        <Link
          to="/"
          style={{
            position: 'absolute', top: '32px', left: '40px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
          <img
            src="/stayonlinelogo.jpeg"
            alt="Staay"
            style={{ width: '34px', height: '34px', objectFit: 'cover', borderRadius: '50%' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ ...F, fontSize: '16px', fontWeight: 800, color: W, letterSpacing: '-0.01em' }}>
              STAAY
            </span>
            <span style={{ ...F, fontSize: '8px', fontWeight: 500, color: G, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '1px' }}>
              ONLINE
            </span>
          </div>
        </Link>

        {/* Bottom content */}
        <div style={{
          position: 'absolute', bottom: '48px', left: '40px', right: '40px',
        }}>
          <span style={{
            display: 'inline-block',
            background: GL, color: G,
            padding: '5px 12px',
            ...F, fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            SS 2025
          </span>
          <h2 style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: W, lineHeight: 1.1,
            letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            The Staay Woman<br />Starts Here.
          </h2>
          <p style={{
            ...F, fontWeight: 300, fontSize: '14px',
            color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
            marginBottom: '28px', maxWidth: '320px',
          }}>
            Create an account to unlock early access, order tracking and wishlist features.
          </p>
          {/* Benefits */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0', borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '20px',
          }}>
            {[
              { title: 'Early Access',    sub: 'New drops first'  },
              { title: 'Order Tracking',  sub: 'Real-time updates' },
              { title: 'Wishlist',        sub: 'Save your looks'   },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  paddingRight: i < 2 ? '16px' : 0,
                  paddingLeft: i > 0 ? '16px' : 0,
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                }}>
                <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: G, marginBottom: '3px' }}>
                  {item.title}
                </p>
                <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.45)' }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — FORM PANEL ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '64px 72px', overflowY: 'auto',
      }}>

        {/* Tab toggle */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderBottom: `1px solid ${BR}`,
          marginBottom: '36px',
        }}>
          {[
            { label: 'Sign In',        value: 'login'  },
            { label: 'Create Account', value: 'signup' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setMode(tab.value)}
              style={{
                padding: '14px 0',
                background: 'transparent', border: 'none',
                borderBottom: `2px solid ${mode === tab.value ? G : 'transparent'}`,
                marginBottom: '-1px',
                ...F, fontSize: '13px',
                fontWeight: mode === tab.value ? 600 : 400,
                color: mode === tab.value ? DK : FT,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}>

            <h1 style={{
              ...F, fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: DK, letterSpacing: '-0.025em',
              lineHeight: 1.1, margin: '0 0 6px',
            }}>
              {mode === 'login' ? 'Welcome back' : 'Join Staay'}
            </h1>
            <p style={{
              ...F, fontSize: '14px', fontWeight: 300,
              color: MD, marginBottom: '32px',
            }}>
              {mode === 'login'
                ? 'Sign in to your account to continue.'
                : 'Create your account in seconds.'}
            </p>

            {mode === 'login'
              ? <LoginForm  onSwitch={() => setMode('signup')} />
              : <SignupForm onSwitch={() => setMode('login')}  />}

          </motion.div>
        </AnimatePresence>

        {/* Footer links */}
        <div style={{
          marginTop: '40px', paddingTop: '24px',
          borderTop: `1px solid ${BR}`,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <Link
            to="/"
            style={{ ...F, fontSize: '12px', fontWeight: 400, color: FT, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.color = FT }}>
            ← Back to Home
          </Link>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '12px', fontWeight: 400, color: FT, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.color = FT }}>
            Browse Shop →
          </Link>
        </div>

      </div>

    </div>
  )
}
