import useCurrencyStore from '../store/useCurrencyStore'

const F = { fontFamily: "'Inter', sans-serif" }

const SHOW = [
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
]

export default function ApproxPrice({ ghs, style = {} }) {
  const rates = useCurrencyStore(s => s.rates)

  if (!rates || !ghs) return null

  const parts = SHOW.map(({ code, symbol }) => {
    const rate = rates[code]
    if (!rate) return null
    const converted = Math.round(ghs * rate)
    return `${symbol}${converted.toLocaleString()}`
  }).filter(Boolean)

  if (!parts.length) return null

  return (
    <span style={{ ...F, fontSize: '11px', fontWeight: 400, color: '#999', display: 'block', marginTop: '2px', ...style }}>
      ≈ {parts.join(' · ')}
    </span>
  )
}
