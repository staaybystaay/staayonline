import { useState, useEffect, useRef } from 'react'

const G = '#B8903A'
const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Outfit', sans-serif"

const values = [
  { number: '01', title: 'Intentional Design', body: 'Every seam, silhouette, and fabric choice is deliberate. We do not make filler pieces. Everything earns its place in your wardrobe and in your life.' },
  { number: '02', title: 'Made for African Women', body: 'Not adapted, not translated — designed from scratch for the bodies, lifestyles, and boldness of African women. You are not an afterthought.' },
  { number: '03', title: 'Softness is Strength', body: 'We build pieces that honour femininity in all its forms. You never have to choose between elegance and confidence — STAAY holds both.' },
  { number: '04', title: 'Community First', body: 'Our customers are not buyers. They are the first people we think about when we sketch, cut, and finish. STAAY is built by community, for community.' },
]

const stats = [
  { value: '16',     label: 'Years of Craft'        },
  { value: '2,400+', label: 'Pieces in Circulation' },
  { value: '50+',    label: 'Countries Reached'      },
  { value: '98%',    label: 'Customer Satisfaction'  },
]

const contactItems = [
  { label: 'Email',     value: 'info@staayonline.com', href: 'mailto:info@staayonline.com'          },
  { label: 'WhatsApp',  value: '+233 50 397 7985',      href: 'https://wa.me/233503977985'          },
  { label: 'Instagram', value: '@staaybystaay',          href: 'https://instagram.com/staaybystaay' },
  { label: 'TikTok',    value: '@staaybystaay',          href: 'https://tiktok.com/@staaybystaay'   },
]

/* ── Google Fonts loader ── */
function FontLoader() {
  useEffect(() => {
    if (document.getElementById('staay-fonts')) return
    const link = document.createElement('link')
    link.id = 'staay-fonts'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap'
    document.head.appendChild(link)
  }, [])
  return null
}

/* ── Fade-up on scroll ── */
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── tokens ── */
const T = {
  gold:      '#B8903A',
  goldPale:  '#FBF7EF',
  bone:      '#EDE8DE',
  ink:       '#111111',
  charcoal:  '#1E1E1E',
  warmWhite: '#FAF8F5',
  offWhite:  '#F4F1EB',
  mid:       '#6B6460',
  faint:     '#9E9890',
  line:      '#E5DFD4',
}

/* ── NAV ── */
function Nav() {
  return (
    <nav style={{
      background: T.warmWhite,
      borderBottom: `1px solid ${T.line}`,
      padding: '0 clamp(20px, 5vw, 72px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <span style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700, letterSpacing: '0.12em', color: T.ink }}></span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: T.mid }}>
        <a href="/" style={{ color: T.mid, textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = T.gold}
          onMouseLeave={e => e.currentTarget.style.color = T.mid}>Home</a>
        <span style={{ color: T.faint }}>/</span>
        <strong style={{ fontWeight: 500, color: T.ink }}>Our Brand</strong>
      </div>
      <span style={{ fontSize: '11px', color: T.faint, letterSpacing: '0.06em', fontFamily: SANS }}>Est. 2009 — Accra, Ghana</span>
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
      borderBottom: `1px solid ${T.line}`,
    }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
        <img
          src="/sefah.png"
          alt="Stacey Sefah, Founder of STAAY"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = 'linear-gradient(160deg,#2a2016 0%,#1a1409 100%)' }}
        />
        <span style={{
          position: 'absolute', top: '24px', left: '24px',
          background: T.gold, color: '#fff',
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '6px 16px', fontFamily: SANS,
        }}>Founded 2009</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: T.gold }} />
      </div>

      {/* Text */}
      <div style={{
        padding: 'clamp(32px, 5vw, 60px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: T.offWhite, minHeight: '400px',
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, marginBottom: '14px', fontFamily: SANS }}>
            Who We Are
          </p>
          <h1 style={{
            fontFamily: SERIF, fontSize: 'clamp(38px, 5vw, 66px)', fontWeight: 600,
            lineHeight: 1.05, letterSpacing: '-0.01em', color: T.ink, margin: '0 0 20px',
          }}>
            Designed for Women Who Bloom
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: T.mid, maxWidth: '360px', fontFamily: SANS }}>
            A Ghanaian womenswear brand rooted in intention, craftsmanship, and grace — built by a woman who understands what it means to come into your own.
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          paddingTop: '20px', borderTop: `1px solid ${T.line}`, marginTop: '32px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', background: T.gold,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SERIF, fontSize: '18px', fontWeight: 600, color: '#fff', flexShrink: 0,
          }}>SS</div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500, color: T.ink, fontFamily: SANS }}>Stacey Sefah</p>
            <p style={{ fontSize: '11px', color: T.faint, letterSpacing: '0.04em', marginTop: '2px', fontFamily: SANS }}>Founder & Creative Director</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── MANIFESTO ── */
function Manifesto() {
  return (
    <section style={{ background: T.charcoal, padding: 'clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
      <FadeUp style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '32px', height: '2px', background: T.gold, flexShrink: 0 }} />
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, fontFamily: SANS }}>Our Manifesto</span>
        </div>
        <p style={{
          fontFamily: SERIF,
          fontSize: 'clamp(22px, 3.5vw, 38px)',
          fontWeight: 400, lineHeight: 1.5,
          color: '#E8E1D4', fontStyle: 'italic',
        }}>
          "Women were never meant to shrink. They were meant to bloom, to evolve, and most importantly —{' '}
          <span style={{ color: T.gold, fontStyle: 'normal' }}>to STAAY true to themselves.</span>"
        </p>
      </FadeUp>
    </section>
  )
}

/* ── STORY ── */
function Story() {
  return (
    <section style={{
      padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)',
      borderBottom: `1px solid ${T.line}`,
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'start',
      }}>
        {/* Aside */}
        <FadeUp style={{ position: 'sticky', top: '88px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.gold, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, fontFamily: SANS }}>Our Story</span>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em', color: T.ink }}>
            Born from a Belief. Built with Grace.
          </h2>
        </FadeUp>

        {/* Body */}
        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              <p>Founded by <strong style={{ fontWeight: 500, color: T.ink }}>Stacey Sefah</strong>, STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short. While studying law and navigating the expectations of life, she found comfort in creating pieces that made women feel seen, beautiful, confident, and unforgettable.</p>,
              <p>For years, Stacey often hid behind black clothing, believing simplicity meant shrinking herself. Like many women, she struggled with insecurities, self-doubt, and the pressure to fit into spaces that often demanded less softness, less colour, and less individuality. But somewhere along the journey, she realised confidence was never about blending in — it was about embracing who God created her to be.</p>,
            ].map((el, i) => (
              <div key={i} style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: T.mid, fontFamily: SANS }}>{el}</div>
            ))}

            {/* Pull quote */}
            <div style={{ borderLeft: `2px solid ${T.gold}`, paddingLeft: '20px', margin: '4px 0' }}>
              <p style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: T.ink, lineHeight: 1.55 }}>
                "That realisation changed everything."
              </p>
            </div>

            {[
              <p>What started as designing a few custom pieces for friends and family quickly became something bigger. Women connected deeply with the feeling behind the designs — elegant pieces that felt intentional, feminine, expressive, and timeless. STAAY became more than clothing; it became a reminder that women do not have to choose between softness and strength, simplicity and statement, elegance and confidence.</p>,
              <p>Today, STAAY is a Ghanaian womenswear brand rooted in intention, craftsmanship, and grace. Every piece is thoughtfully designed for women who want to feel effortlessly put together — women who are evolving, growing, leading, celebrating, healing, building, and showing up fully as themselves.</p>,
              <p>Our designs embrace movement, colour, structure, and individuality. From dramatic occasion wear to refined everyday elegance, STAAY creates pieces that are meant to move with you through every season of life. We believe true style is not about trends; it is about how a garment makes you feel.</p>,
              <p>At the heart of STAAY is a commitment to creating with meaning. We work closely with local artisans and makers, valuing quality craftsmanship, attention to detail, and the beauty of intentional production. Every stitch, silhouette, and finish reflects our belief that fashion should feel personal, empowering, and enduring.</p>,
            ].map((el, i) => (
              <div key={i} style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: T.mid, fontFamily: SANS }}>{el}</div>
            ))}

            {/* Love letter block */}
            <div style={{ background: T.goldPale, border: `1px solid ${T.bone}`, padding: 'clamp(20px, 4vw, 32px)', marginTop: '8px' }}>
              {[
                'But beyond the fabric, STAAY is a love letter to women becoming.',
                'Women learning to take up space.',
                'Women rediscovering themselves.',
                'Women embracing elegance without apology.',
                'Women choosing confidence, grace, and authenticity every single day.',
              ].map((line, i) => (
                <p key={i} style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 400, fontStyle: 'italic', color: T.charcoal, lineHeight: 1.7, marginBottom: i < 4 ? '8px' : 0 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── VALUES ── */
function Values() {
  const [hovered, setHovered] = useState(null)
  return (
    <section style={{ background: T.offWhite, padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.gold }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, fontFamily: SANS }}>What We Stand For</span>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: T.ink, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Our Values
          </h2>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          border: `1px solid ${T.line}`,
        }}>
          {values.map((v, i) => (
            <FadeUp key={v.number} delay={i * 0.07}>
              <div
                onMouseEnter={() => setHovered(v.number)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: 'clamp(24px, 4vw, 40px)',
                  borderTop: `3px solid ${hovered === v.number ? T.gold : 'transparent'}`,
                  background: hovered === v.number ? T.warmWhite : 'transparent',
                  transition: 'all 0.22s',
                  borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${T.line}` : 'none',
                  height: '100%',
                }}>
                <p style={{ fontFamily: SERIF, fontSize: '36px', fontWeight: 700, color: T.gold, opacity: 0.25, lineHeight: 1, marginBottom: '14px', letterSpacing: '-0.02em' }}>{v.number}</p>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: T.ink, marginBottom: '10px', letterSpacing: '-0.01em', fontFamily: SANS }}>{v.title}</h3>
                <p style={{ fontSize: '14px', fontWeight: 300, color: T.mid, lineHeight: 1.7, fontFamily: SANS }}>{v.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── STATS ── */
function Stats() {
  return (
    <section style={{ background: T.ink, padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 80px)' }}>
      <FadeUp>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: 'clamp(24px, 4vw, 40px)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 600, color: T.gold, lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: SANS }}>{s.label}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section style={{ background: T.warmWhite, padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        border: `1px solid ${T.line}`,
      }}>
        {/* Shop CTA */}
        <FadeUp style={{ padding: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${T.line}` }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, fontFamily: SANS }}>Ready to wear STAAY?</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 600, color: T.ink, lineHeight: 1.1, margin: '12px 0 16px', letterSpacing: '-0.01em' }}>
            Shop the Collection
          </h2>
          <p style={{ fontSize: '14px', fontWeight: 300, color: T.mid, lineHeight: 1.7, marginBottom: '32px', maxWidth: '300px', fontFamily: SANS }}>
            Every piece in the SS 2025 collection is available now. Designed for the woman who is ready to show up fully as herself.
          </p>
          <a
            href="/shop"
            onClick={() => window.scrollTo(0, 0)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: T.ink, color: '#fff', padding: '14px 32px',
              fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s', fontFamily: SANS,
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.gold}
            onMouseLeave={e => e.currentTarget.style.background = T.ink}>
            Shop Now →
          </a>
        </FadeUp>

        {/* Contact */}
        <FadeUp delay={0.1} style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, marginBottom: '24px', fontFamily: SANS }}>Get in Touch</p>
          {contactItems.map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', borderBottom: `1px solid ${T.line}`,
            }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: T.faint, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: SANS }}>{item.label}</span>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{ fontSize: '14px', fontWeight: 400, color: T.ink, textDecoration: 'none', transition: 'color 0.2s', fontFamily: SANS }}
                onMouseEnter={e => e.currentTarget.style.color = T.gold}
                onMouseLeave={e => e.currentTarget.style.color = T.ink}>
                {item.value}
              </a>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <div style={{
      background: T.charcoal, padding: '20px clamp(24px, 6vw, 80px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '8px',
    }}>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: SANS }}>© 2025 STAAY by Stacey Sefah. All rights reserved.</p>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: SANS }}>Accra, Ghana — Designed with intention.</p>
    </div>
  )
}

/* ── PAGE ── */
export default function Brand() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <FontLoader />
      <Nav />
      <Hero />
      <Manifesto />
      <Story />
      <Values />
      <Stats />
      <Contact />
      <Footer />
    </div>
  )
}
