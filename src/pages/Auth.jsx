import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
function EyeIcon({ visible }) {
  return visible ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ─────────────────────────────────────────────
// INPUT FIELD
// ─────────────────────────────────────────────
function Field({ label, type, value, onChange, placeholder, error, rightSlot }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '10px', letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: error ? '#e63946' : focused ? 'var(--text)' : 'var(--text-muted)',
        fontWeight: 400, transition: 'color 0.2s',
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
            background: 'var(--bg)',
            border: `1px solid ${error ? '#e63946' : focused ? 'var(--text)' : 'var(--border)'}`,
            borderBottom: `2px solid ${error ? '#e63946' : focused ? 'var(--accent)' : 'var(--border)'}`,
            padding: rightSlot ? '14px 44px 14px 16px' : '14px 16px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '13px', color: 'var(--text)',
            outline: 'none', letterSpacing: '0.04em',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
        />
        {rightSlot && (
          <div style={{
            position: 'absolute', right: '14px', top: '50%',
            transform: 'translateY(-50%)',
          }}>
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// LOGIN FORM
// ─────────────────────────────────────────────
function LoginForm({ onSwitch }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  function validate() {
    const e = {}
    if (!email || !email.includes('@')) e.email = 'Enter a valid email'
    if (!password || password.length < 6) e.password = 'Password must be 6+ characters'
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '16px',
          padding: '40px 0',
        }}>
        <div style={{
          width: '56px', height: '56px',
          background: 'var(--text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '24px', color: 'var(--bg)',
        }}>
          ✓
        </div>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '28px', color: 'var(--text)',
          letterSpacing: '0.06em',
        }}>
          WELCOME BACK
        </h3>
        <p style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic', fontSize: '14px',
          color: 'var(--text-muted)',
        }}>
          You're signed in to Staay .
        </p>
        <Link
          to="/shop"
          style={{
            background: 'var(--text)', color: 'var(--bg)',
            padding: '14px 40px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px', letterSpacing: '0.1em',
            marginTop: '8px', display: 'inline-block',
          }}>
          Continue Shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Field
        label="Email address"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setErrors(ev => ({ ...ev, email: '' })) }}
        placeholder="your@email.com"
        error={errors.email}
      />
      <Field
        label="Password"
        type={showPw ? 'text' : 'password'}
        value={password}
        onChange={e => { setPassword(e.target.value); setErrors(ev => ({ ...ev, password: '' })) }}
        placeholder="Enter your password"
        error={errors.password}
        rightSlot={
          <button
            onClick={() => setShowPw(v => !v)}
            style={{
              background: 'none', border: 'none',
              color: 'var(--text-faint)', cursor: 'pointer',
              padding: 0, display: 'flex', alignItems: 'center',
            }}>
            <EyeIcon visible={showPw} />
          </button>
        }
      />

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <button style={{
          background: 'none', border: 'none',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.1em',
          color: 'var(--accent)', cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: '3px',
        }}>
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%', padding: '16px',
          background: loading ? 'var(--bg-surface)' : 'var(--text)',
          color: loading ? 'var(--text-muted)' : 'var(--bg)',
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', letterSpacing: '0.12em',
          transition: 'all 0.2s',
        }}>
        {loading ? 'SIGNING IN...' : 'SIGN IN'}
      </button>

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '10px', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
        }}>
          or
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Social login */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { label: 'Continue with Google',   icon: 'G' },
          { label: 'Continue with Facebook', icon: 'f' },
        ].map(item => (
          <button
            key={item.label}
            style={{
              width: '100%', padding: '13px',
              background: 'transparent',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '10px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', letterSpacing: '0.1em',
              color: 'var(--text-muted)', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}>
            <span style={{
              width: '20px', height: '20px',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'serif', fontSize: '12px', fontWeight: 700,
              color: 'var(--text)',
            }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '12px', color: 'var(--text-faint)',
        textAlign: 'center', letterSpacing: '0.04em',
      }}>
        No account?{' '}
        <button
          onClick={onSwitch}
          style={{
            background: 'none', border: 'none',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', color: 'var(--accent)',
            cursor: 'pointer', letterSpacing: '0.04em',
            textDecoration: 'underline', textUnderlineOffset: '3px',
          }}>
          Create one
        </button>
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// SIGNUP FORM
// ─────────────────────────────────────────────
function SignupForm({ onSwitch }) {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [agreed,    setAgreed]    = useState(false)
  const [errors,    setErrors]    = useState({})
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)

  function validate() {
    const e = {}
    if (!firstName.trim()) e.firstName = 'First name required'
    if (!lastName.trim())  e.lastName  = 'Last name required'
    if (!email || !email.includes('@')) e.email = 'Enter a valid email'
    if (!password || password.length < 6) e.password = 'Password must be 6+ characters'
    if (!agreed) e.agreed = 'Please accept the terms'
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '16px',
          padding: '40px 0',
        }}>
        <div style={{
          width: '56px', height: '56px',
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '24px', color: '#0C0B09',
        }}>
          ✓
        </div>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '28px', color: 'var(--text)',
          letterSpacing: '0.06em', textAlign: 'center',
        }}>
          WELCOME TO STAAY
        </h3>
        <p style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic', fontSize: '14px',
          color: 'var(--text-muted)', textAlign: 'center',
        }}>
          Your account has been created. Time to shop.
        </p>
        <Link
          to="/shop"
          style={{
            background: 'var(--text)', color: 'var(--bg)',
            padding: '14px 40px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px', letterSpacing: '0.1em',
            marginTop: '8px', display: 'inline-block',
          }}>
          Shop Now
        </Link>
      </motion.div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        <div style={{ borderRight: '1px solid var(--border)' }}>
          <Field
            label="First name"
            type="text"
            value={firstName}
            onChange={e => { setFirstName(e.target.value); setErrors(ev => ({ ...ev, firstName: '' })) }}
            placeholder="First"
            error={errors.firstName}
          />
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <Field
            label="Last name"
            type="text"
            value={lastName}
            onChange={e => { setLastName(e.target.value); setErrors(ev => ({ ...ev, lastName: '' })) }}
            placeholder="Last"
            error={errors.lastName}
          />
        </div>
      </div>

      <Field
        label="Email address"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setErrors(ev => ({ ...ev, email: '' })) }}
        placeholder="your@email.com"
        error={errors.email}
      />

      <Field
        label="Password"
        type={showPw ? 'text' : 'password'}
        value={password}
        onChange={e => { setPassword(e.target.value); setErrors(ev => ({ ...ev, password: '' })) }}
        placeholder="Create a password (6+ characters)"
        error={errors.password}
        rightSlot={
          <button
            onClick={() => setShowPw(v => !v)}
            style={{
              background: 'none', border: 'none',
              color: 'var(--text-faint)', cursor: 'pointer',
              padding: 0, display: 'flex', alignItems: 'center',
            }}>
            <EyeIcon visible={showPw} />
          </button>
        }
      />

      {/* Password strength */}
      {password.length > 0 && (
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                flex: 1, height: '3px',
                background: password.length >= i * 3
                  ? i <= 1 ? '#e63946'
                  : i <= 2 ? '#f0a500'
                  : i <= 3 ? '#C9A44A'
                  : '#2a7a2a'
                  : 'var(--border)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      )}

      {/* Terms */}
      <div>
        <button
          onClick={() => { setAgreed(v => !v); setErrors(ev => ({ ...ev, agreed: '' })) }}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            textAlign: 'left',
          }}>
          <span style={{
            width: '18px', height: '18px', flexShrink: 0,
            border: `1px solid ${errors.agreed ? '#e63946' : agreed ? 'var(--accent)' : 'var(--border)'}`,
            background: agreed ? 'var(--accent)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: '1px', transition: 'all 0.2s',
          }}>
            {agreed && (
              <span style={{
                color: '#0C0B09', fontSize: '10px', fontWeight: 700,
                lineHeight: 1,
              }}>
                ✓
              </span>
            )}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', color: errors.agreed ? '#e63946' : 'var(--text-muted)',
            fontWeight: 300, lineHeight: 1.6,
            transition: 'color 0.2s',
          }}>
            I agree to the{' '}
            <span style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Terms of Service
            </span>
            {' '}and{' '}
            <span style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Privacy Policy
            </span>
          </span>
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%', padding: '16px',
          background: loading ? 'var(--bg-surface)' : 'var(--text)',
          color: loading ? 'var(--text-muted)' : 'var(--bg)',
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', letterSpacing: '0.12em',
          transition: 'all 0.2s',
        }}>
        {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </button>

      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '12px', color: 'var(--text-faint)',
        textAlign: 'center', letterSpacing: '0.04em',
      }}>
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          style={{
            background: 'none', border: 'none',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', color: 'var(--accent)',
            cursor: 'pointer', letterSpacing: '0.04em',
            textDecoration: 'underline', textUnderlineOffset: '3px',
          }}>
          Sign in
        </button>
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// AUTH PAGE
// ─────────────────────────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login')

  const editorialImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=90&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&fit=crop',
  ]

  const [imgIndex] = useState(() => Math.floor(Math.random() * editorialImages.length))

  return (
    <div style={{
      background: 'var(--bg)',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>

      {/* ── LEFT — editorial image panel ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRight: '2px solid var(--text)',
        minHeight: '100vh',
      }}>
        <img
          src={editorialImages[imgIndex]}
          alt="Staay"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
        }} />

        {/* Gold top stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px', background: 'var(--accent)',
        }} />

        {/* Logo */}
        <Link
          to="/"
          style={{
            position: 'absolute', top: '32px', left: '40px',
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none',
          }}>
          <img
            src="/stayonlinelogo.jpeg"
            alt="Staay"
            style={{
              width: '36px', height: '36px',
              objectFit: 'cover', borderRadius: '50%',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px', color: '#fff', letterSpacing: '0.06em',
            }}>
              STAAY
            </span>
          
          </div>
        </Link>

        {/* Bottom content */}
        <div style={{
          position: 'absolute', bottom: '48px', left: '40px', right: '40px',
        }}>
          {/* Season tag */}
          <div style={{
            display: 'inline-block',
            background: 'var(--accent)', color: '#0C0B09',
            padding: '5px 12px', marginBottom: '20px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            SS 2025
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 4vw, 60px)',
            color: '#fff', lineHeight: 0.9,
            letterSpacing: '0.01em', margin: '0 0 16px',
          }}>
            THE STAAY<br />
            <span style={{ color: 'var(--accent)' }}>WOMAN</span><br />
            STARTS HERE
          </h2>

          <p style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: '15px', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)', maxWidth: '320px',
          }}>
            Create an account to unlock early access, order tracking and wishlist features.
          </p>

          {/* Trust row */}
          <div style={{
            display: 'flex', gap: '0', marginTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: '20px',
          }}>
            {[
              { v: 'Early access',   s: 'New drops'   },
              { v: 'Order tracking', s: 'Real-time'   },
              { v: 'Wishlist',       s: 'Save looks'  },
            ].map((item, i) => (
              <div
                key={item.v}
                style={{
                  flex: 1, paddingRight: i < 2 ? '16px' : 0,
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  paddingLeft: i > 0 ? '16px' : 0,
                }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '14px', color: 'var(--accent)',
                  letterSpacing: '0.06em', marginBottom: '2px',
                }}>
                  {item.v}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)', fontWeight: 300,
                }}>
                  {item.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — form panel ── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '64px 72px',
        overflowY: 'auto',
      }}>
        {/* Tab toggle */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderBottom: '2px solid var(--text)',
          marginBottom: '40px',
        }}>
          {[
            { label: 'Sign In',     value: 'login'  },
            { label: 'Create Account', value: 'signup' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setMode(tab.value)}
              style={{
                padding: '16px 0',
                background: 'transparent', border: 'none',
                borderBottom: `3px solid ${mode === tab.value ? 'var(--accent)' : 'transparent'}`,
                marginBottom: '-2px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px', fontWeight: mode === tab.value ? 600 : 300,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: mode === tab.value ? 'var(--text)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.22s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4vw, 52px)',
              color: 'var(--text)', lineHeight: 0.9,
              letterSpacing: '0.01em', margin: '0 0 8px',
            }}>
              {mode === 'login' ? (
                <>WELCOME<br /><span style={{ color: 'var(--accent)' }}>BACK</span></>
              ) : (
                <>JOIN<br /><span style={{ color: 'var(--accent)' }}>STAAY</span></>
              )}
            </h1>

            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '14px', lineHeight: 1.6,
              color: 'var(--text-muted)', marginBottom: '36px',
            }}>
              {mode === 'login'
                ? 'Sign in to your account to continue.'
                : 'Create your Staay account in seconds.'}
            </p>

            {mode === 'login'
              ? <LoginForm  onSwitch={() => setMode('signup')} />
              : <SignupForm onSwitch={() => setMode('login')} />}

          </motion.div>
        </AnimatePresence>

        {/* Bottom nav */}
        <div style={{
          marginTop: '40px', paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              fontWeight: 300, transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
            Back to Home
          </Link>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              fontWeight: 300, transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
            Browse Shop
          </Link>
        </div>
      </div>

    </div>
  )
}
