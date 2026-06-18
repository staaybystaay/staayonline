import useCurrencyStore from '../store/useCurrencyStore'

const MD = '#888'
const F  = { fontFamily: "'Inter', sans-serif" }

/**
 * Shows a small "≈ $142 USD" line beneath a GH₵ price when the visitor
 * has a non-GHS currency selected. Renders nothing for GHS or until
 * exchange rates have loaded.
 *
 * Usage: <ApproxPrice ghs={product.price} />
 */
export default function ApproxPrice({ ghs, style = {} }) {
  const currency = useCurrencyStore(s => s.currency)
  const rates    = useCurrencyStore(s => s.rates)
  const format   = useCurrencyStore(s => s.format)

  if (currency === 'GHS' || !rates) return null

  return (
    <span style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, display: 'block', marginTop: '2px', ...style }}>
      ≈ {format(ghs)} {currency}
    </span>
  )
}
