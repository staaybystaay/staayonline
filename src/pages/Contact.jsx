import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { submitContactMessage } from '../lib/api'

const G    = '#B8903A'
const GL   = '#F5ECD8'
const W    = '#FFFFFF'
const BK   = '#111111'
const DK   = '#1A1612'
const MD   = '#666'
const FT   = '#999'
const LG   = '#F7F6F4'
const BR   = '#E8E4DF'
const GR   = '#25D366'
const GRL  = '#E9F9EF'
const F    = { fontFamily: "'Inter', sans-serif" }

const WHATSAPP_NUMBER = '233503977985'

function openWhatsApp(message) {
  const text = encodeURIComponent(message && message.trim() ? message.trim() : "Hi! I'd like to ask about STAAY Online.")
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
}

// ─── Icons ───────────────────────────────────
const WhatsAppIcon = ({ size = 18, color = GR }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 1a8 8 0 0 0-6.9 12L1 17l4.1-1.1A8 8 0 1 0 9 1z" stroke={color} strokeWidth="1.3"/>
    <path d="M6 6.2c.1-.5.6-.5.9-.5s.5.1.6.4c.2.4.5 1.1.5 1.3 0 .2-.1.3-.2.5l-.3.3c-.1.1-.2.2-.1.4.3.6 1.4 1.7 2 2 .2.1.3 0 .4-.1l.3-.3c.2-.2.3-.2.5-.1.3.1.9.4 1.3.6.3.1.4.3.4.6 0 .3 0 .8-.5.9-1.7.6-3.7-.5-4.7-1.5S5.4 7.9 6 6.2z" fill={color}/>
  </svg>
)
const MailIcon = ({ size = 18, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke={color} strokeWidth="1.3"/>
    <path d="M1.5 5.5l7.5 5 7.5-5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const InstagramIcon = ({ size = 18, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="16" height="16" rx="4" stroke={color} strokeWidth="1.3"/>
    <circle cx="9" cy="9" r="3.5" stroke={color} strokeWidth="1.3"/>
    <circle cx="13.2" cy="4.8" r="0.8" fill={color}/>
  </svg>
)
const TikTokIcon = ({ size = 18, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M10 1.5v9.8a2.4 2.4 0 1 1-2.4-2.4c.3 0 .5 0 .8.1V6.6a4.8 4.8 0 1 0 4.1 4.7V5.2a4.6 4.6 0 0 0 3 1.1V3.9a3.1 3.1 0 0 1-2.1-1.1A3.1 3.1 0 0 1 12.6 1H10z" fill={color}/>
  </svg>
)
const PinIcon = ({ size = 18, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 16.5S15 11 15 7a6 6 0 1 0-12 0c0 4 6 9.5 6 9.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="2.2" stroke={color} strokeWidth="1.3"/>
  </svg>
)
const ChevronIcon = ({ color = FT }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M4.5 2.5l5 3.5-5 3.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const BoxIcon = ({ size = 20, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M2.5 6l7.5-3.5L17.5 6v8L10 17.5 2.5 14z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M2.5 6l7.5 3.5 7.5-3.5M10 9.5v8" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
)
const QuestionIcon = ({ size = 20, color = G }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.3"/>
    <path d="M7.8 7.8a2.2 2.2 0 1 1 3 2c-.7.6-1 1-1 1.8" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="9.8" cy="14" r="0.9" fill={color}/>
  </svg>
)

// ─── Get In Touch row ─────────────────────────
function ContactRow({ icon, iconBg, label, value, sub, href }) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 0', borderBottom: `1px solid ${BR}` }}>
      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</p>
        <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK, wordBreak: 'break-word' }}>{value}</p>
        {sub && <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: GR, marginTop: '3px' }}>{sub}</p>}
      </div>
    </div>
  )
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') || href.startsWith('mailto') ? '_blank' : undefined} rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </a>
    )
  }
  return content
}

const quickHelp = [
  { label: 'Frequently Asked Questions', path: '/faq'        },
  { label: 'Size Guide & Fitting Help',  path: '/size-guide' },
  { label: 'Shipping Information',       path: '/faq'        },
  { label: 'Returns & Exchanges',        path: '/faq'        },
]

export default function Contact() {
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [message,    setMessage]    = useState('')
  const [error,      setError]      = useState('')
  const [sending,    setSending]    = useState(false)
  const [sent,       setSent]       = useState(false)

  async function handleSend() {
    if (!name.trim())    { setError('Please enter your name.'); return }
    if (!message.trim()) { setError('Please enter a message.'); return }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email, or leave it blank.')
      return
    }

    setSending(true)
    setError('')
    try {
      await submitContactMessage({ name: name.trim(), email: email.trim() || null, message: message.trim() })
      setSent(true)
    } catch (err) {
      // Saving to our records failed, but don't block the customer from
      // reaching us directly on WhatsApp — that's the primary channel.
      console.error('Failed to save contact message:', err)
    } finally {
      setSending(false)
      openWhatsApp(message)
    }
  }

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Contact</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            We're Here to Help
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', marginBottom: '8px' }}>
            Contact Us
          </h1>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, maxWidth: '460px' }}>
            We'd love to hear from you. Reach our team directly on WhatsApp for the fastest response.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="contact-grid page-padding" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 40px 96px', display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '28px', alignItems: 'start' }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Get in Touch */}
          <div style={{ border: `1px solid ${BR}`, borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ ...F, fontSize: '17px', fontWeight: 700, color: DK, marginBottom: '6px' }}>Get in Touch</h2>
            <div>
              <ContactRow icon={<WhatsAppIcon />} iconBg={GRL} label="WhatsApp" value="+233 50 397 7985" sub="Quickest response time" href={`https://wa.me/${WHATSAPP_NUMBER}`} />
              <ContactRow icon={<MailIcon />} iconBg={GL} label="Email" value="info@staayonline.com" sub="We reply within a few hours" href="mailto:info@staayonline.com" />
              <ContactRow icon={<InstagramIcon />} iconBg={GL} label="Instagram" value="@staaybystaay" href="https://instagram.com/staaybystaay" />
              <ContactRow icon={<TikTokIcon />} iconBg={GL} label="TikTok" value="@staaybystaay" href="https://tiktok.com/@staaybystaay" />
              <div style={{ borderBottom: 'none' }}>
                <ContactRow icon={<PinIcon />} iconBg={GL} label="Studio" value="Nii Osabu Nsuta Lk. Street, Dzen Ayor Area, Adentan District, GD-137-2393, Ghana" />
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div style={{ border: `1px solid ${BR}`, borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '12px' }}>Quick Help</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {quickHelp.map(item => (
                <Link key={item.label} to={item.path}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: `1px solid ${BR}`, textDecoration: 'none' }}>
                  <span style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK }}>{item.label}</span>
                  <ChevronIcon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* WhatsApp chat card */}
          <div style={{ border: `1px solid ${BR}`, borderRadius: '12px', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <WhatsAppIcon size={22} />
              <h2 style={{ ...F, fontSize: '17px', fontWeight: 700, color: DK }}>Chat with us on WhatsApp</h2>
            </div>

            <div style={{ background: GRL, border: `1px solid #BCEFD0`, borderRadius: '8px', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <WhatsAppIcon size={15} />
              <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: '#0E7A3E' }}>Get instant responses from our team via WhatsApp</span>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: '#0E7A3E', marginBottom: '8px' }}>✓ Message sent</p>
                <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginBottom: '20px' }}>
                  We've got your message and opened WhatsApp so you can continue the conversation there.
                </p>
                <button
                  onClick={() => { setSent(false); setName(''); setEmail(''); setMessage('') }}
                  style={{ background: 'none', border: `1px solid ${BR}`, borderRadius: '8px', padding: '10px 24px', ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, display: 'block', marginBottom: '8px' }}>
                      Your Name <span style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <input
                      value={name}
                      onChange={e => { setName(e.target.value); if (error) setError('') }}
                      placeholder="e.g. Ama K."
                      style={{ width: '100%', border: `1px solid ${BR}`, borderRadius: '8px', padding: '11px 14px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => { e.target.style.borderColor = G }}
                      onBlur={e => { e.target.style.borderColor = BR }}
                    />
                  </div>
                  <div>
                    <label style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, display: 'block', marginBottom: '8px' }}>
                      Email <span style={{ fontWeight: 300, color: FT }}>(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (error) setError('') }}
                      placeholder="your@email.com"
                      style={{ width: '100%', border: `1px solid ${BR}`, borderRadius: '8px', padding: '11px 14px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => { e.target.style.borderColor = G }}
                      onBlur={e => { e.target.style.borderColor = BR }}
                    />
                  </div>
                </div>

                <label style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, display: 'block', marginBottom: '8px' }}>
                  Your Message <span style={{ color: '#C0392B' }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => { setMessage(e.target.value); if (error) setError('') }}
                  placeholder="Type your message here... our team will respond via WhatsApp shortly."
                  rows={5}
                  style={{ width: '100%', border: `1px solid ${BR}`, borderRadius: '8px', padding: '12px 14px', ...F, fontSize: '13px', color: DK, outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: error ? '8px' : '18px' }}
                  onFocus={e => { e.target.style.borderColor = G }}
                  onBlur={e => { e.target.style.borderColor = BR }}
                />

                {error && (
                  <p style={{ ...F, fontSize: '12px', color: '#C0392B', marginBottom: '14px' }}>{error}</p>
                )}

                <div style={{ background: LG, borderRadius: '8px', padding: '16px 18px', marginBottom: '20px' }}>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: DK, marginBottom: '10px' }}>WhatsApp Benefits:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {[
                      'Instant responses within minutes',
                      'Share photos for sizing or product questions',
                      'Chat right from your phone',
                      'Get real-time order updates',
                    ].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, flexShrink: 0 }} />
                        <span style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSend}
                  disabled={sending}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: sending ? '#8FD9AC' : GR, color: W, border: 'none', borderRadius: '8px', cursor: sending ? 'not-allowed' : 'pointer', ...F, fontSize: '14px', fontWeight: 700, transition: 'background 0.2s' }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#1FAE56' }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = GR }}>
                  <WhatsAppIcon size={17} color={W} />
                  {sending ? 'Sending...' : 'Send Message & Open WhatsApp'}
                </button>

                <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT, textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
                  We'll save your message and open WhatsApp so you can continue the conversation there. We typically respond within a few hours during business days.
                </p>
              </>
            )}
          </div>

          {/* Two support cards */}
          <div className="contact-support-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Link to="/account" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ y: -2 }} style={{ border: `1px solid ${BR}`, borderRadius: '12px', padding: '20px', height: '100%' }}>
                <BoxIcon />
                <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK, marginTop: '12px', marginBottom: '4px' }}>Order Support</p>
                <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, lineHeight: 1.6 }}>Get help with an existing order</p>
              </motion.div>
            </Link>
            <button onClick={() => openWhatsApp('Hi! I have a question about a product.')} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}>
              <motion.div whileHover={{ y: -2 }} style={{ border: `1px solid ${BR}`, borderRadius: '12px', padding: '20px', height: '100%' }}>
                <QuestionIcon />
                <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK, marginTop: '12px', marginBottom: '4px' }}>Product Questions</p>
                <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, lineHeight: 1.6 }}>Ask about sizing, fabric, or availability</p>
              </motion.div>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
