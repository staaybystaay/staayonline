import { useState, useEffect, useRef } from 'react'
import useCurrencyStore, { SUPPORTED_CURRENCIES } from '../store/useCurrencyStore'

const DK = '#1A1612'
const MD = '#666'
const BR = '#E8E4DF'
const LG = '#F7F6F4'
const G  = '#B8903A'
const W  = '#FFFFFF'
const F  = { fontFamily: "'Inter', sans-serif" }

export default function CurrencySelector() {
  const currency    = useCurrencyStore(s => s.currency)
  const setCurrency = useCurrencyStore(s => s.setCurrency)
  const init        = useCurrencyStore(s => s.init)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Kick off rate fetching + IP-based auto-detection once, site-wide.
  // Safe to call from multiple mounts — init() guards against repeats.
  useEffect(() => { init() }, [init])

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', background: 'transparent', border: `1px solid ${BR}`, borderRadius: '6px', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, color: DK, transition: 'border-color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = G }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
        {currency}
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M1.5 3l3 3 3-3" stroke={MD} strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 60, minWidth: '160px', background: W, border: `1px solid ${BR}`, borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
            <button key={code} onClick={() => { setCurrency(code); setOpen(false) }}
              style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', borderBottom: `1px solid ${BR}`, background: currency === code ? LG : W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...F, fontSize: '13px' }}>
              <span style={{ fontWeight: currency === code ? 700 : 400, color: currency === code ? G : DK }}>
                {info.symbol} {code}
              </span>
              <span style={{ fontSize: '10px', color: MD }}>{info.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
