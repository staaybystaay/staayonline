import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id)
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...product, qty: 1 }] }
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    })),

  clearCart: () => set({ items: [] }),

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  },
}))

export default useCartStore