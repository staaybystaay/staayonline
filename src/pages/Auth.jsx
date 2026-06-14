import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, signUp, signInWithGoogle, resetPassword, uploadAvatar } from '../lib/api'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#1A1612'
const DK  = '#1A1612'
const MD  = '#6B7280'
const FT  = '#9CA3AF'
const LG  = '#F9FAFB'
const BR  = '#E5E7EB'
const BL  = '#3B5BDB'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── Icons ───────────────────────────────────
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2"/>
    <path d="M1.5 5.5l6.5 4 6.5-4" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2.5" y="7" width="11" height="7.5" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2"/>
    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="8" cy="10.5" r="1" fill="#9CA3AF"/>
  </svg>
)
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="2.5" stroke="#9CA3AF" strokeWidth="1.2"/>
    <path d="M2.5 13.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1" width="10" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.2"/>
    <circle cx="8" cy="12.5" r="0.6" fill="#9CA3AF"/>
    <path d="M6 3h4" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13S2 9.5 2 5.8A3.2 3.2 0 0 1 8 4a3.2 3.2 0 0 1 6 1.8C14 9.5 8 13 8 13z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)
const EyeIcon = ({ show }) => show ? (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#9CA3AF" strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="2" stroke="#9CA3AF" strokeWidth="1.2"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 2l12 12M6.3 6.5A2 2 0 0 0 9.5 9.7M4.2 4.4C2.4 5.6 1 8 1 8s2.5 5 7 5c1.4 0 2.6-.4 3.7-1.1M7 3.1l.5-.1c4.5 0 7 5 7 5s-.7 1.5-2.1 2.9" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

// Google icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// ─── Shared Input ─────────────────────────────
function Input({ icon: Icon, type = 'text', placeholder, value, onChange, showToggle, showPass, onToggle, prefix }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${focused ? BL : BR}`, borderRadius: '8px', background: W, height: '44px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
      {prefix && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 10px', borderRight: `1px solid ${BR}`, height: '100%', ...F, fontSize: '13px', color: DK, flexShrink: 0, cursor: 'pointer', background: LG }}>
          {prefix}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke={MD} strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
      )}
      {Icon && !prefix && (
        <span style={{ padding: '0 10px', display: 'flex', flexShrink: 0, color: FT }}><Icon /></span>
      )}
      <input
        type={showToggle ? (showPass ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', ...F, fontSize: '14px', color: DK, padding: prefix ? '0 10px' : '0 10px 0 0' }}
      />
      {showToggle && (
        <button type="button" onClick={onToggle} style={{ background: 'none', border: 'none', padding: '0 12px', cursor: 'pointer', display: 'flex', color: FT }}>
          <EyeIcon show={showPass} />
        </button>
      )}
    </div>
  )
}

// ─── FORGOT PASSWORD INLINE ───────────────────
function ForgotPassword() {
  const [open,    setOpen]    = useState(false)
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleReset(e) {
    e.preventDefault()
    if (!email) { setError('Enter your email address.'); return }
    setLoading(true); setError('')
    try { await resetPassword(email); setSent(true) }
    catch { setError('Could not send reset email. Check your email address.') }
    finally { setLoading(false) }
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', color: G, cursor: 'pointer', fontWeight: 500 }}>
      Forgot your password?
    </button>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '10px', padding: '16px' }}>
      {sent ? (
        <p style={{ ...F, fontSize: '13px', color: '#0369A1', textAlign: 'center', fontWeight: 500 }}>
          ✓ Reset link sent to <strong>{email}</strong>
        </p>
      ) : (
        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: '#0369A1' }}>Reset your password</p>
          <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
            style={{ height: '40px', border: '1.5px solid #BAE6FD', borderRadius: '6px', padding: '0 12px', ...F, fontSize: '13px', color: DK, outline: 'none', background: W }} />
          {error && <p style={{ ...F, fontSize: '11px', color: RD }}>{error}</p>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" disabled={loading}
              style={{ flex: 1, padding: '9px', background: '#0369A1', color: W, border: 'none', borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button type="button" onClick={() => setOpen(false)}
              style={{ padding: '9px 14px', background: 'transparent', border: '1px solid #BAE6FD', borderRadius: '6px', ...F, fontSize: '12px', color: MD, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </motion.div>
  )
}

// ─── SIGN IN CARD ─────────────────────────────
function SignIn({ onSwitch }) {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try { await signIn({ email, password }); navigate('/') }
    catch { setError('Invalid email or password.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ background: W, borderRadius: '16px', padding: '36px 32px', width: '100%', maxWidth: '360px', boxShadow: '0 4px 32px rgba(0,0,0,0.1)' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '24px', justifyContent: 'center' }}>
          <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ ...F, fontSize: '16px', fontWeight: 800, color: DK, letterSpacing: '-0.01em' }}>STAAY <span style={{ color: G }}>ONLINE</span></span>
        </Link>

        <h2 style={{ ...F, fontSize: '24px', fontWeight: 800, color: DK, textAlign: 'center', marginBottom: '24px', letterSpacing: '-0.02em' }}>Sign In</h2>

        {/* Social buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <button onClick={async () => { try { await signInWithGoogle() } catch(e) { setError('Google sign in failed.') } }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '11px', border: `1.5px solid ${BR}`, borderRadius: '8px', background: W, cursor: 'pointer', ...F, fontSize: '14px', fontWeight: 500, color: DK, transition: 'border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4285F4' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: BR }} />
          <span style={{ ...F, fontSize: '12px', color: FT, whiteSpace: 'nowrap' }}>Or continue with email</span>
          <div style={{ flex: 1, height: '1px', background: BR }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input icon={MailIcon} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          <Input icon={LockIcon} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} showToggle showPass={showPass} onToggle={() => setShowPass(v => !v)} />

          {error && <p style={{ ...F, fontSize: '12px', color: RD, textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ padding: '13px', background: loading ? FT : G, color: W, border: 'none', borderRadius: '8px', ...F, fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: '4px' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = BK }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = G }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ ...F, fontSize: '13px', color: MD }}>
            Don't have an account?{' '}
            <button onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: G, cursor: 'pointer', padding: 0 }}>Sign up</button>
          </p>
          <ForgotPassword />
        </div>

      </motion.div>
    </div>
  )
}

// ─── 3-COLUMN REGISTER ────────────────────────
function Register({ onSwitch }) {
  const [form,    setForm]    = useState({ firstName: '', lastName: '', gender: '', interests: '', email: '', phone: '', password: '', confirm: '' })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [showP,   setShowP]   = useState(false)
  const [showC,   setShowC]   = useState(false)
  const [emailUp, setEmailUp] = useState(true)
  const [smsUp,   setSmsUp]   = useState(false)
  const [terms,   setTerms]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [done,    setDone]    = useState(false)

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (!terms) { setError('Please agree to the Terms of Service.'); return }
    setLoading(true); setError('')
    try {
      let avatarUrl = null
      if (avatarFile) {
        try { avatarUrl = await uploadAvatar('temp-' + Date.now(), avatarFile) } catch {}
      }
      await signUp({
        email:     form.email,
        password:  form.password,
        firstName: form.firstName,
        lastName:  form.lastName,
        phone:     form.phone,
        gender:    form.gender    || null,
        interests: form.interests || null,
        avatarUrl,
      })
      setDone(true)
    } catch (err) { setError(err.message || 'Something went wrong.') }
    finally { setLoading(false) }
  }

  const Toggle = ({ on, onToggle }) => (
    <button type="button" onClick={onToggle}
      style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? BL : '#D1D5DB', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: W, position: 'absolute', top: '3px', left: on ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  )

  const Label = ({ children, required }) => (
    <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, marginBottom: '6px' }}>
      {children}{required && <span style={{ color: RD }}> *</span>}
    </p>
  )

  const Select = ({ placeholder, value, onChange, options }) => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: FT, pointerEvents: 'none' }}>
        {placeholder === 'Select Gender' ? <UserIcon /> : <HeartIcon />}
      </div>
      <select value={value} onChange={onChange}
        style={{ width: '100%', height: '44px', border: `1.5px solid ${BR}`, borderRadius: '8px', background: W, ...F, fontSize: '14px', color: value ? DK : FT, outline: 'none', cursor: 'pointer', paddingLeft: '38px', paddingRight: '12px', appearance: 'none' }}>
        <option value="">{placeholder} (Optional)</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M1 1l4 4 4-4" stroke={FT} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  )

  if (done) return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ background: W, borderRadius: '16px', padding: '48px 40px', textAlign: 'center', maxWidth: '400px', boxShadow: '0 4px 32px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '64px', height: '64px', background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 20px' }}>✓</div>
        <h3 style={{ ...F, fontSize: '22px', fontWeight: 800, color: DK, marginBottom: '10px' }}>Account Created!</h3>
        <p style={{ ...F, fontSize: '14px', color: MD, lineHeight: 1.7, marginBottom: '24px' }}>Check your email <strong>{form.email}</strong> for a confirmation link.</p>
        <button onClick={onSwitch} style={{ background: G, border: 'none', color: W, padding: '13px 40px', borderRadius: '8px', ...F, fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
      </motion.div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', padding: '32px 20px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
            <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ ...F, fontSize: '18px', fontWeight: 800, color: DK }}>STAAY <span style={{ color: G }}>ONLINE</span></span>
          </Link>
          <h1 style={{ ...F, fontSize: '28px', fontWeight: 800, color: DK, letterSpacing: '-0.025em' }}>Create Your Account</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-3-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'start' }}>

            {/* ── COLUMN 1: Personal Information ── */}
            <div style={{ background: W, borderRadius: '16px', padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <h3 style={{ ...F, fontSize: '17px', fontWeight: 700, color: DK, textAlign: 'center', marginBottom: '4px' }}>Personal Information</h3>
              <p style={{ ...F, fontSize: '12px', color: FT, textAlign: 'center', marginBottom: '24px' }}>Tell us about yourself</p>

              {/* Avatar */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <label style={{ cursor: 'pointer' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: avatarPreview ? 'transparent' : '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', position: 'relative', overflow: 'hidden' }}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="11" r="5" stroke={BL} strokeWidth="1.8"/>
                        <path d="M5 27c0-6 4.9-10.5 11-10.5S27 21 27 27" stroke={BL} strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', borderRadius: '50%', background: BL, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.5 2v7M2 5.5h7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                    const f = e.target.files[0]
                    if (f) { setAvatarFile(f); const r = new FileReader(); r.onload = ev => setAvatarPreview(ev.target.result); r.readAsDataURL(f) }
                  }} />
                  <p style={{ ...F, fontSize: '12px', color: MD }}>Add profile picture</p>
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <Label required>First Name</Label>
                  <Input icon={UserIcon} placeholder="Enter your first name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                </div>
                <div>
                  <Label required>Last Name</Label>
                  <Input icon={UserIcon} placeholder="Enter your last name" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select placeholder="Select Gender" value={form.gender} onChange={e => set('gender', e.target.value)} options={['Female', 'Male', 'Non-binary', 'Prefer not to say']} />
                </div>
                <div>
                  <Label>Shopping Interests <span style={{ ...F, fontSize: '11px', color: FT, fontWeight: 400 }}>(Optional)</span></Label>
                  <Select placeholder="Choose your interests" value={form.interests} onChange={e => set('interests', e.target.value)} options={['Eden Collection', 'The Love Edit', 'Bold & Beautiful', 'All Collections']} />
                </div>
              </div>
            </div>

            {/* ── COLUMN 2: Account Details ── */}
            <div style={{ background: W, borderRadius: '16px', padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <h3 style={{ ...F, fontSize: '17px', fontWeight: 700, color: DK, textAlign: 'center', marginBottom: '4px' }}>Account Details</h3>
              <p style={{ ...F, fontSize: '12px', color: FT, textAlign: 'center', marginBottom: '24px' }}>Secure your account</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <Label required>Email Address</Label>
                  <Input icon={MailIcon} type="email" placeholder="Enter your email address" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>

                <div>
                  <Label required>Phone Number</Label>
                  <Input icon={PhoneIcon} type="tel" placeholder="Enter phone number" value={form.phone} onChange={e => set('phone', e.target.value)} prefix="+233 ▾" />
                  <p style={{ ...F, fontSize: '11px', color: FT, marginTop: '4px' }}>Format: +233 XXX XXX XXX (9-10 digits)</p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <Label required>Password</Label>
                    <button type="button" style={{ background: 'none', border: 'none', ...F, fontSize: '12px', color: G, cursor: 'pointer', padding: 0, fontWeight: 500 }}>✦ Generate</button>
                  </div>
                  <Input icon={LockIcon} type="password" placeholder="Create a strong password" value={form.password} onChange={e => set('password', e.target.value)} showToggle showPass={showP} onToggle={() => setShowP(v => !v)} />
                </div>

                <div>
                  <Label required>Confirm Password</Label>
                  <Input icon={LockIcon} type="password" placeholder="Confirm your password" value={form.confirm} onChange={e => set('confirm', e.target.value)} showToggle showPass={showC} onToggle={() => setShowC(v => !v)} />
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: BR }} />
                  <span style={{ ...F, fontSize: '11px', color: FT }}>Or continue with</span>
                  <div style={{ flex: 1, height: '1px', background: BR }} />
                </div>

                <button type="button" onClick={async () => { try { await signInWithGoogle() } catch(e) { setError('Google sign in failed.') } }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '11px', border: `1.5px solid ${BR}`, borderRadius: '8px', background: W, cursor: 'pointer', ...F, fontSize: '14px', fontWeight: 500, color: DK, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4285F4' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
                  <GoogleIcon /> Continue with Google
                </button>
              </div>
            </div>

            {/* ── COLUMN 3: Preferences ── */}
            <div style={{ background: W, borderRadius: '16px', padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <h3 style={{ ...F, fontSize: '17px', fontWeight: 700, color: DK, textAlign: 'center', marginBottom: '4px' }}>Preferences</h3>
              <p style={{ ...F, fontSize: '12px', color: FT, textAlign: 'center', marginBottom: '24px' }}>Customise your experience</p>

              {/* Email updates toggle */}
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px' }}>✉️</span>
                      <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>EMAIL UPDATES</p>
                    </div>
                    <p style={{ ...F, fontSize: '11px', color: MD, lineHeight: 1.5 }}>Get exclusive deals, trends, and personalised recommendations</p>
                  </div>
                  <Toggle on={emailUp} onToggle={() => setEmailUp(v => !v)} />
                </div>
              </div>

              {/* SMS alerts toggle */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px' }}>📱</span>
                      <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>SMS ALERTS</p>
                    </div>
                    <p style={{ ...F, fontSize: '11px', color: MD, lineHeight: 1.5 }}>Get instant notifications about flash sales and limited offers</p>
                  </div>
                  <Toggle on={smsUp} onToggle={() => setSmsUp(v => !v)} />
                </div>
              </div>

              {/* Terms */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '20px' }}>
                <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: BL, marginTop: '2px', flexShrink: 0 }} />
                <span style={{ ...F, fontSize: '12px', color: MD, lineHeight: 1.55 }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: BL, fontWeight: 600 }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" style={{ color: BL, fontWeight: 600 }}>Privacy Policy</Link>
                  <span style={{ color: RD }}> *</span>
                </span>
              </label>

              {error && <p style={{ ...F, fontSize: '12px', color: RD, background: '#FEF2F2', padding: '8px 12px', borderRadius: '6px', marginBottom: '12px' }}>{error}</p>}

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '14px', background: loading ? FT : BL, color: W, border: 'none', borderRadius: '10px', ...F, fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginBottom: '14px' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#2F4ABF' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = BL }}>
                {loading ? 'Creating...' : 'Create Your Account'}
              </button>

              <p style={{ ...F, fontSize: '13px', color: MD, textAlign: 'center' }}>
                Already part of our community?{' '}
                <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', ...F, fontSize: '13px', fontWeight: 600, color: BL, cursor: 'pointer', padding: 0 }}>
                  Sign in here →
                </button>
              </p>

            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login')
  return (
    <AnimatePresence mode="wait">
      {mode === 'login'
        ? <motion.div key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SignIn    onSwitch={() => setMode('register')} /></motion.div>
        : <motion.div key="reg"    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Register onSwitch={() => setMode('login')}    /></motion.div>
      }
    </AnimatePresence>
  )
}
