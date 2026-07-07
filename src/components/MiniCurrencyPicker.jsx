import { useState, useEffect } from 'react'
import useCurrencyStore from '../store/useCurrencyStore'

const PILLS = [
  { code: 'GHS', label: 'GH₵' },
  { code: 'USD', label: '$'   },
  { code: 'GBP', label: '£'   },
  { code: 'EUR', label: '€'   },
]

const G  = '#B8903A'
const W  = '#FFFFFF'
const BR = '#E8E4DF'
const MD = '#888'
const F  = { fontFamily: "'Inter', sans-serif" }

function fmtLocal(ghs, code, rates) {
  if (code === 'GHS') return `GH₵${Math.round(ghs).toLocaleString()}`
  const rate = rates?.[code]
  if (!rate) return '—'
  const symbols = { USD: '$', GBP: '£', EUR: '€' }
  return `${symbols[code]}${Math.round(ghs * rate).toLocaleString()}`
}

/**
 * Drop-in replacement for a price display on a product card.
 * Shows the price in the selected local currency + 4 tiny pill buttons.
 * Defaults to the global navbar currency; clicking a pill overrides just this card.
 *
 * Usage: <MiniCurrencyPicker ghs={product.price} priceStyle={{ fontSize: '16px' }} />
 */
export default function MiniCurrencyPicker({ ghs, priceStyle = {}, strikethrough = null }) {
  const globalCurrency = useCurrencyStore(s => s.currency)
  const rates          = useCurrencyStore(s => s.rates)
  const [local, setLocal] = useState(null)

  // When the global currency changes, reset the local override
  useEffect(() => { setLocal(null) }, [globalCurrency])

  const cur   = local || globalCurrency
  const price = fmtLocal(ghs, cur, rates)
  const orig  = strikethrough != null ? fmtLocal(strikethrough, cur, rates) : null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
        <span style={{ ...F, fontWeight: 700, color: '#1A1612', ...priceStyle }}>{price}</span>
        {orig && <span style={{ ...F, fontSize: '12px', color: '#AAA', textDecoration: 'line-through' }}>{orig}</span>}
      </div>
      <div style={{ display: 'flex', gap: '3px' }}>
        {PILLS.map(({ code, label }) => {
          const active = cur === code
          return (
            <button
              key={code}
              onClick={e => { e.stopPropagation(); setLocal(code) }}
              style={{
                padding: '2px 7px',
                border: `1px solid ${active ? G : BR}`,
                background: active ? G : W,
                color: active ? W : MD,
                ...F, fontSize: '10px', fontWeight: 600,
                cursor: 'pointer', borderRadius: '3px',
                transition: 'all 0.15s',
                lineHeight: 1.6,
              }}>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
