import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const SUPPORTED_CURRENCIES = {
  GHS: { symbol: 'GH₵', label: 'Ghanaian Cedi' },
  USD: { symbol: '$',   label: 'US Dollar'     },
  GBP: { symbol: '£',   label: 'British Pound' },
  EUR: { symbol: '€',   label: 'Euro'          },
}

const RATES_TTL_MS  = 24 * 60 * 60 * 1000 // refetch at most once a day
const RATES_URL     = 'https://open.er-api.com/v6/latest/GHS'
const GEO_URL        = 'https://ipwho.is/'

const useCurrencyStore = create(
  persist(
    (set, get) => ({
      currency:        'GHS',   // currently selected/displayed currency
      rates:           null,    // { USD: 0.063, GBP: 0.050, EUR: 0.058, ... } — GHS multipliers
      ratesFetchedAt:  null,
      manuallySet:     false,   // true once the visitor picks a currency themselves
      autoDetectDone:  false,   // true once we've attempted IP-based detection
      initialized:     false,

      // Converts a GHS amount into the currently selected currency.
      // Returns the original amount unchanged if GHS is selected or rates aren't loaded yet.
      convert(amountGHS) {
        const { currency, rates } = get()
        if (currency === 'GHS' || !rates || !rates[currency]) return amountGHS
        return amountGHS * rates[currency]
      },

      // Formats a GHS amount as a string in the selected currency, e.g. "$142" or "GH₵1,650"
      format(amountGHS) {
        const { currency } = get()
        const converted = get().convert(amountGHS)
        const symbol = SUPPORTED_CURRENCIES[currency]?.symbol || ''
        const rounded = currency === 'GHS' ? Math.round(converted) : Math.round(converted * 100) / 100
        return `${symbol}${rounded.toLocaleString()}`
      },

      setCurrency(code) {
        if (!SUPPORTED_CURRENCIES[code]) return
        set({ currency: code, manuallySet: true })
      },

      async fetchRates(force = false) {
        const { ratesFetchedAt, rates } = get()
        const isStale = !ratesFetchedAt || (Date.now() - ratesFetchedAt > RATES_TTL_MS)
        if (rates && !isStale && !force) return

        try {
          const res = await fetch(RATES_URL)
          const data = await res.json()
          if (data.result === 'success' && data.rates) {
            set({ rates: data.rates, ratesFetchedAt: Date.now() })
          }
        } catch {
          // Network failure — silently keep using cached/stale rates if we have them
        }
      },

      async autoDetectCurrency() {
        const { manuallySet, autoDetectDone } = get()
        if (manuallySet || autoDetectDone) return
        set({ autoDetectDone: true })

        try {
          const res = await fetch(GEO_URL)
          const data = await res.json()
          const detected = data?.currency?.code
          if (detected && SUPPORTED_CURRENCIES[detected] && detected !== 'GHS') {
            set({ currency: detected })
          }
        } catch {
          // Geolocation failed — default stays GHS, no harm done
        }
      },

      // Call once when the app first mounts (e.g. from Navbar or App.jsx)
      async init() {
        if (get().initialized) return
        set({ initialized: true })
        await get().fetchRates()
        await get().autoDetectCurrency()
      },
    }),
    {
      name: 'staay-currency',
      partialize: (state) => ({
        currency:       state.currency,
        rates:          state.rates,
        ratesFetchedAt: state.ratesFetchedAt,
        manuallySet:    state.manuallySet,
        autoDetectDone: state.autoDetectDone,
      }),
    }
  )
)

export default useCurrencyStore
