import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const GR  = '#25D366'
const F   = { fontFamily: "'Inter', sans-serif" }

const categories = [
  { key: 'all',      label: 'All' },
  { key: 'shipping',  label: 'Orders & Shipping' },
  { key: 'returns',   label: 'Returns & Exchanges' },
  { key: 'sizing',    label: 'Sizing & Fit' },
  { key: 'payments',  label: 'Payments' },
  { key: 'account',   label: 'Account & Gift Cards' },
]

const faqs = [
  {
    cat: 'shipping',
    q: 'How long does delivery take?',
    a: "Orders within Accra are delivered within 2–3 business days after your order is confirmed. We'll keep you updated via the contact details you provide at checkout.",
  },
  {
    cat: 'shipping',
    q: 'Is shipping really free?',
    a: 'Yes — delivery within Accra is free on every order. For deliveries outside Accra, message us on WhatsApp before checkout and we\u2019ll confirm delivery details and cost.',
  },
  {
    cat: 'shipping',
    q: 'How do I track my order?',
    a: 'Sign in and visit My Account → My Orders to see the status of every order, from Pending to Delivered. You can also reach out to us directly on WhatsApp with your order number.',
  },
  {
    cat: 'returns',
    q: 'What is your return policy?',
    a: 'We accept returns within 7 days of delivery, as long as the item is unworn, unwashed, and in its original condition with tags attached.',
  },
  {
    cat: 'returns',
    q: 'How do I start a return?',
    a: 'Message us on WhatsApp or email info@staayonline.com with your order number and we\u2019ll guide you through the next steps.',
  },
  {
    cat: 'returns',
    q: 'Do you offer exchanges?',
    a: 'Yes — if you\u2019d like a different size or colour, let us know within 7 days of delivery and we\u2019ll arrange an exchange where stock allows.',
  },
  {
    cat: 'sizing',
    q: 'How do I know what size to order?',
    a: 'Each product page lists the available sizes. If you\u2019re unsure which size will fit best, send us your measurements on WhatsApp and we\u2019ll help you choose.',
  },
  {
    cat: 'sizing',
    q: "What if my item doesn't fit?",
    a: 'No problem — see our return and exchange policy above. We\u2019re happy to help you find the right fit.',
  },
  {
    cat: 'payments',
    q: 'What payment methods do you accept?',
    a: 'We accept mobile money and major debit/credit cards through our secure checkout.',
  },
  {
    cat: 'payments',
    q: 'Is my payment information safe?',
    a: 'Yes. Payments are processed securely and we never store your card details on our servers.',
  },
  {
    cat: 'account',
    q: 'Do I need an account to shop?',
    a: 'No — you can check out as a guest. Creating an account just makes it easier to track orders and save your details for next time.',
  },
  {
    cat: 'account',
    q: 'Can I sign in with Google?',
    a: 'Yes, you can sign up or sign in instantly using your Google account, or use your email and password.',
  },
  {
    cat: 'account',
    q: 'How do STAAY gift cards work?',
    a: 'Choose an amount on our Promotions page and add it to your bag. Once purchased, the gift card value can be used toward any order — a great way to let someone choose their own pieces.',
  },
  {
    cat: 'account',
    q: 'I forgot my password — what do I do?',
    a: "On the sign-in page, select 'Forgot your password?' and we'll send you a reset link by email.",
  },
]

function ChevronIcon({ open }) {
  return (
    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex', flexShrink: 0 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 5l4.5 4.5L11.5 5" stroke={DK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.span>
  )
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${BR}` }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '18px 4px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{item.q}</span>
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}>
            <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.8, padding: '0 4px 18px', maxWidth: '620px' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [activeCat, setActiveCat] = useState('all')
  const [search,    setSearch]    = useState('')

  const filtered = useMemo(() => {
    return faqs.filter(item => {
      if (activeCat !== 'all' && item.cat !== activeCat) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        if (!item.q.toLowerCase().includes(q) && !item.a.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [activeCat, search])

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>FAQ</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            How Can We Help?
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: W, border: `1px solid ${BR}`, borderRadius: '8px', padding: '11px 16px', maxWidth: '420px', margin: '0 auto' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={FT} strokeWidth="1.3"/><path d="M9.5 9.5L13 13" stroke={FT} strokeWidth="1.3" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a question..."
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', ...F, fontSize: '13px', color: DK }} />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="page-padding" style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 40px 24px' }}>

        {/* Category pills */}
        <div className="hide-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
          {categories.map(c => (
            <button key={c.key} onClick={() => setActiveCat(c.key)}
              style={{ flexShrink: 0, padding: '7px 16px', borderRadius: '100px', border: `1px solid ${activeCat === c.key ? BK : BR}`, background: activeCat === c.key ? BK : 'transparent', color: activeCat === c.key ? W : DK, ...F, fontSize: '12px', fontWeight: activeCat === c.key ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s' }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ ...F, fontSize: '15px', fontWeight: 600, color: DK, marginBottom: '6px' }}>No matching questions</p>
            <p style={{ ...F, fontSize: '13px', color: MD }}>Try a different search term, or get in touch directly.</p>
          </div>
        ) : (
          <div>
            {filtered.map((item, i) => <FAQItem key={i} item={item} />)}
          </div>
        )}
      </div>

      {/* ── CLOSING CTA ── */}
      <section style={{ background: DK, padding: 'clamp(40px, 6vw, 64px) 24px', marginTop: '24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Still Have Questions?
          </p>
          <h2 style={{ ...F, fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 700, color: W, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            Our team is happy to help
          </h2>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: GR, color: W, padding: '13px 32px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1FAE56' }}
            onMouseLeave={e => { e.currentTarget.style.background = GR }}>
            Chat with Us
          </Link>
        </div>
      </section>

    </div>
  )
}
