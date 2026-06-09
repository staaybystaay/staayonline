import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const exists = get().items.find(i => i.id === product.id)
        if (exists) {
          set(state => ({ items: state.items.filter(i => i.id !== product.id) }))
        } else {
          set(state => ({ items: [...state.items, product] }))
        }
      },

      isFavorited: (id) => !!get().items.find(i => i.id === id),

      removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),

      clearAll: () => set({ items: [] }),
    }),
    { name: 'staay-favorites' }
  )
)

export default useFavoritesStore
