import { Link } from 'react-router-dom'

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

const sizeChart = [
  { size: 'XS', bustIn: '32–33', bustCm: '81–84',   waistIn: '24–25', waistCm: '61–64',   hipsIn: '34–35', hipsCm: '86–89'   },
  { size: 'S',  bustIn: '34–35', bustCm: '86–89',   waistIn: '26–27', waistCm: '66–69',   hipsIn: '36–37', hipsCm: '91–94'   },
  { size: 'M',  bustIn: '36–37', bustCm: '91–94',   waistIn: '28–29', waistCm: '71–74',   hipsIn: '38–39', hipsCm: '96–99'   },
  { size: 'L',  bustIn: '38–40', bustCm: '96–102',  waistIn: '30–32', waistCm: '76–81',   hipsIn: '40–42', hipsCm: '101–107' },
  { size: 'XL', bustIn: '41–43', bustCm: '104–109', waistIn: '33–35', waistCm: '84–89',   hipsIn: '43–45', hipsCm: '109–114' },
  { size: 'XXL',bustIn: '44–46', bustCm: '112–117', waistIn: '36–38', waistCm: '91–97',   hipsIn: '46–48', hipsCm: '117–122' },
]

const measureSteps = [
  { label: 'Bust',  body: 'Wrap the tape around the fullest part of your bust, keeping it level and snug but not tight.' },
  { label: 'Waist', body: 'Measure around the narrowest part of your natural waistline, usually just above your belly button.' },
  { label: 'Hips',  body: 'Stand with feet together and measure around the fullest part of your hips and seat.' },
]

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, flexShrink: 0 }} />
      <span style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{children}</span>
    </div>
  )
}

export default function SizeGuide() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Size Guide</span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Find Your Fit
          </p>
          <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em', marginBottom: '10px' }}>
            Size Guide
          </h1>
          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, maxWidth: '520px', lineHeight: 1.7 }}>
            A general guide to help you find your best fit across our pieces. Still unsure? Send us your measurements on WhatsApp and we'll help you choose.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="page-padding" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 40px 30px' }}>

        {/* How to measure */}
        <SectionLabel>How To Measure</SectionLabel>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '20px' }}>Three numbers, taken right</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }} className="size-guide-steps">
          {measureSteps.map((step, i) => (
            <div key={step.label} style={{ border: `1px solid ${BR}`, borderRadius: '10px', padding: '22px' }}>
              <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Step {i + 1}
              </p>
              <h3 style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '8px' }}>{step.label}</h3>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7 }}>{step.body}</p>
            </div>
          ))}
        </div>

        <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, marginBottom: '48px', lineHeight: 1.7, maxWidth: '600px' }}>
          Use a soft measuring tape and keep it parallel to the floor. For the most accurate fit, measure over light clothing or undergarments rather than over bulky layers.
        </p>

        {/* Size chart */}
        <SectionLabel>Size Chart</SectionLabel>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '20px' }}>General sizing reference</h2>

        <div className="size-guide-table-wrap" style={{ overflowX: 'auto', marginBottom: '20px', border: `1px solid ${BR}`, borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
            <thead>
              <tr style={{ background: LG }}>
                {['Size', 'Bust (in)', 'Bust (cm)', 'Waist (in)', 'Waist (cm)', 'Hips (in)', 'Hips (cm)'].map(h => (
                  <th key={h} style={{ ...F, fontSize: '11px', fontWeight: 700, color: DK, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '14px 16px', textAlign: 'left', borderBottom: `1px solid ${BR}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row, i) => (
                <tr key={row.size} style={{ borderBottom: i < sizeChart.length - 1 ? `1px solid ${BR}` : 'none' }}>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 700, color: G, padding: '13px 16px' }}>{row.size}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK, padding: '13px 16px' }}>{row.bustIn}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, padding: '13px 16px' }}>{row.bustCm}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK, padding: '13px 16px' }}>{row.waistIn}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, padding: '13px 16px' }}>{row.waistCm}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: DK, padding: '13px 16px' }}>{row.hipsIn}</td>
                  <td style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, padding: '13px 16px' }}>{row.hipsCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT, marginBottom: '48px', lineHeight: 1.7, maxWidth: '600px' }}>
          This is a general reference and may vary slightly by style — flowing or structured pieces can fit differently even at the same labeled size. Check the individual product description for any fit notes specific to that piece.
        </p>

        {/* Fit tips */}
        <SectionLabel>Fit Tips</SectionLabel>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '20px' }}>Between sizes?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px', maxWidth: '600px' }}>
          {[
            'For a relaxed, comfortable fit — size up.',
            'For a fitted, structured silhouette — size down.',
            'For occasion wear with structure (corsetry, boning, fitted bodices) — measure carefully, as these styles run truer to exact measurements.',
          ].map(tip => (
            <div key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, flexShrink: 0, marginTop: '7px' }} />
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CLOSING CTA ── */}
      <section style={{ background: DK, padding: 'clamp(40px, 6vw, 64px) 24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Still Not Sure?
          </p>
          <h2 style={{ ...F, fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 700, color: W, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            Send us your measurements
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
