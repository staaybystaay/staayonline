import { useState } from 'react'
import { motion } from 'framer-motion'
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

const sections = [
  {
    id: 'shipping',
    title: 'Shipping & Deliveries',
    notice: null,
    items: [
      'STAAY aims to dispatch most orders within 7–15 working days or sooner, subject to customer specifications, stock, and item availability.',
      'A contact number and email address are required for all shipments. Missing information may delay your order.',
      'We will contact you via email or phone if there is an unreasonable delay or if items are out of stock.',
      'For local deliveries (within Accra), we aim to deliver on the same day the courier picks up from our warehouse. This depends on the address and communication with the customer.',
      'For deliveries outside Accra but within Ghana, we aim to deliver within 1–3 working days, depending on the address and communication with the customer.',
      'We ship to international destinations via DHL, with delivery typically taking 3–5 working days, depending on the location. Some items may be shipped on a Delivery Duties Unpaid (DDU) basis, meaning any duties and taxes in the destination country are the customer\'s responsibility.',
      'If delivery is refused, or the recipient is unavailable after reasonable courier attempts, the item will be returned to STAAY, and the customer will be charged for unpaid duties, taxes, and additional shipping costs.',
    ],
  },
  {
    id: 'returns',
    title: 'Terms of Exchange / Returns / Refund',
    notice: 'STAAY DOES NOT OFFER REFUNDS, EXCEPT FOR DAMAGED MERCHANDISE.',
    items: [
      'To avoid inconvenience or delays, we strongly recommend reviewing our Sizing Chart before purchasing.',
      'For sizing issues, email us at info@staayonline.com within 1 week of receiving your order, quoting your order number. Exchanges are valid for full-priced items only. Refunds are not offered.',
      'A customer service representative will contact you with available size options. If the item is out of stock, we will suggest alternatives or issue a credit note valid for 6 months on www.staayonline.com.',
      'If dissatisfied, unused items may be returned for exchange.',
      'Items made to custom measurements cannot be exchanged.',
      'All items on sale are final and cannot be returned or exchanged.',
      'We do not offer alterations but may assist with alterations at an additional charge, subject to availability.',
      'Items must be returned within 7 working days of receipt, in original condition: unworn, unwashed, and unaltered merchandise with original packaging and garment tags intact.',
      'Merchandise showing signs of use will not be accepted and will be returned to the customer.',
      'For returns, use reliable courier services like DHL, UPS, or FedEx and retain proof of postage. STAAY is not responsible for goods lost or damaged in transit.',
      'Return postage costs are the customer\'s responsibility, except for damaged, faulty, or incorrectly supplied goods.',
    ],
  },
  {
    id: 'damaged',
    title: 'Damaged Goods',
    notice: null,
    items: [
      'While all items are thoroughly checked before dispatch, if you receive a damaged item, notify us at info@staayonline.com within 2 business days, quoting your order number, description of the damage, and, if possible, an image.',
      'Once the return is received and inspected, we will notify you via email and provide a new estimated dispatch date for a replacement.',
      'If a replacement is unavailable, a credit note valid for 6 months or a refund will be issued. Replacement shipping fees will be waived.',
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    notice: null,
    items: [
      'During sales events, high order volumes may result in processing times of 10–21 working days.',
      'Sale items are final, with no returns, exchanges, or alterations offered.',
    ],
  },
  {
    id: 'cancellation',
    title: 'Cancellation Policy',
    notice: null,
    items: [
      'Once an order is placed online, it is final, and cancellations are not allowed.',
    ],
  },
  {
    id: 'store-credit',
    title: 'Store Credit',
    notice: null,
    items: [
      'Store credit is issued only when items are returned under our terms.',
      'Store credit is redeemable online at www.staayonline.com or in-store.',
      'Store credit cannot be transferred, purchased, or exchanged for cash.',
      'Store credit may be used to purchase gift cards (if available).',
      'Purchases exceeding the store credit balance will require an additional payment method.',
    ],
  },
]

function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={style}>
      {children}
    </motion.div>
  )
}

export default function Terms() {
  const [active, setActive] = useState('shipping')

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background: OW, borderBottom: `1px solid ${BR}`, padding: '40px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link
              to="/"
              style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              Home
            </Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Terms of Service</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Legal
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '12px' }}>
            Terms of Service
          </h1>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>
            Please read these terms carefully before placing an order with STAAY.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 64px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '64px', alignItems: 'start' }}>

          {/* ── STICKY SIDEBAR NAV ── */}
          <aside style={{ position: 'sticky', top: '80px' }}>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Contents
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  style={{
                    display: 'block', padding: '9px 12px',
                    ...F, fontSize: '13px', fontWeight: active === s.id ? 600 : 400,
                    color: active === s.id ? G : MD,
                    background: active === s.id ? GL : 'transparent',
                    borderLeft: `2px solid ${active === s.id ? G : 'transparent'}`,
                    transition: 'all 0.18s', textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (active !== s.id) {
                      e.currentTarget.style.color = DK
                      e.currentTarget.style.background = OW
                    }
                  }}
                  onMouseLeave={e => {
                    if (active !== s.id) {
                      e.currentTarget.style.color = MD
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}>
                  {s.title}
                </a>
              ))}
            </nav>

            {/* Contact box */}
            <div style={{
              marginTop: '32px', padding: '20px',
              background: OW, border: `1px solid ${BR}`,
            }}>
              <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '6px' }}>
                Questions?
              </p>
              <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, marginBottom: '12px', lineHeight: 1.6 }}>
                Contact our team and we'll be happy to help.
              </p>
              <a
                href="mailto:info@staayonline.com"
                style={{
                  display: 'block', textAlign: 'center',
                  background: BK, color: W, padding: '10px',
                  ...F, fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.04em', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = BK }}>
                Email Us
              </a>
            </div>
          </aside>

          {/* ── CONTENT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {sections.map((section, i) => (
              <FadeUp key={section.id} delay={i * 0.05}>
                <div
                  id={section.id}
                  style={{
                    padding: '40px 0',
                    borderBottom: `1px solid ${BR}`,
                  }}>

                  {/* Section title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '24px', height: '2px', background: G, flexShrink: 0 }} />
                    <h2 style={{
                      ...F, fontSize: '18px', fontWeight: 700,
                      color: DK, letterSpacing: '-0.01em',
                    }}>
                      {section.title}
                    </h2>
                  </div>

                  {/* Notice banner */}
                  {section.notice && (
                    <div style={{
                      background: '#FEF2F2',
                      border: `1px solid #FECACA`,
                      borderLeft: `3px solid ${RD}`,
                      padding: '12px 16px',
                      marginBottom: '20px',
                    }}>
                      <p style={{
                        ...F, fontSize: '13px', fontWeight: 700,
                        color: RD, letterSpacing: '0.02em',
                      }}>
                        {section.notice}
                      </p>
                    </div>
                  )}

                  {/* Bullet items */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                        }}>
                        <div style={{
                          width: '5px', height: '5px',
                          borderRadius: '50%', background: G,
                          flexShrink: 0, marginTop: '7px',
                        }} />
                        <p style={{
                          ...F, fontSize: '14px', fontWeight: 300,
                          color: MD, lineHeight: 1.75,
                        }}>
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>

                </div>
              </FadeUp>
            ))}

            {/* Footer note */}
            <div style={{ paddingTop: '40px' }}>
              <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, lineHeight: 1.7 }}>
                By placing an order with STAAY, you agree to these terms. For any questions, contact us at{' '}
                <a
                  href="mailto:info@staayonline.com"
                  style={{ color: G, fontWeight: 500, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                  info@staayonline.com
                </a>
                {' '}or via WhatsApp at{' '}
                <a
                  href="https://wa.me/233503977985"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: G, fontWeight: 500, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                  +233 50 397 7985
                </a>
                .
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
