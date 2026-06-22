import { create } from 'zustand'

// Unique key per product + size + customization variant
function makeCartId(product) {
  const sizeKey    = product.size || ''
  const customKey  = product.customization ? 'c' : ''
  return `${product.id}__${sizeKey}__${customKey}`
}

const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const cartId = makeCartId(product)
      const exists = state.items.find((i) => i.cartId === cartId)
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, qty: Math.min(i.qty + (product.qty || 1), 10) } : i
          ),
        }
      }
      return { items: [...state.items, { ...product, cartId, qty: product.qty || 1 }] }
    }),

  removeItem: (cartId) =>
    set((state) => ({ items: state.items.filter((i) => i.cartId === cartId) })),

  updateQty: (cartId, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.cartId === cartId ? { ...i, qty } : i)),
    })),

  clearCart: () => set({ items: [] }),
}))

export default useCartStore
