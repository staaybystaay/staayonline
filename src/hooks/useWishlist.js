import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getWishlist, addToWishlist, removeFromWishlist } from '../lib/api'
import useFavoritesStore from '../store/useFavoritesStore'

/**
 * Unified wishlist hook.
 * - Logged-in users: reads/writes to the `wishlists` Supabase table.
 * - Guest users: falls back to the Zustand localStorage store.
 */
export function useWishlist() {
  const [user, setUser] = useState(null)
  const [dbItems, setDbItems] = useState(null) // null = not loaded yet

  // Guest store
  const guestToggle      = useFavoritesStore(s => s.toggle)
  const guestIsFavorited = useFavoritesStore(s => s.isFavorited)
  const guestItems       = useFavoritesStore(s => s.items)
  const guestRemove      = useFavoritesStore(s => s.removeItem)
  const guestClearAll    = useFavoritesStore(s => s.clearAll)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) { setDbItems(null); return }
    getWishlist(user.id)
      .then(products => setDbItems(products))
      .catch(() => setDbItems([]))
  }, [user])

  const dbIds = dbItems ? new Set(dbItems.map(p => p.id)) : null

  const isFavorited = useCallback((productId) => {
    if (!user) return guestIsFavorited(productId)
    return dbIds ? dbIds.has(productId) : false
  }, [user, dbIds, guestIsFavorited])

  const toggle = useCallback(async (product) => {
    if (!user) {
      guestToggle(product)
      return
    }
    const favorited = dbIds?.has(product.id)
    // Optimistic update
    setDbItems(prev => {
      if (!prev) return prev
      return favorited
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    })
    try {
      if (favorited) {
        await removeFromWishlist(user.id, product.id)
      } else {
        await addToWishlist(user.id, product.id)
      }
    } catch {
      // Revert on error
      setDbItems(prev => {
        if (!prev) return prev
        return favorited
          ? [...prev, product]
          : prev.filter(p => p.id !== product.id)
      })
    }
  }, [user, dbIds, guestToggle])

  const removeItem = useCallback(async (productId) => {
    if (!user) { guestRemove(productId); return }
    setDbItems(prev => prev ? prev.filter(p => p.id !== productId) : prev)
    try {
      await removeFromWishlist(user.id, productId)
    } catch {
      // Reload on error
      getWishlist(user.id).then(setDbItems).catch(() => {})
    }
  }, [user, guestRemove])

  const clearAll = useCallback(async () => {
    if (!user) { guestClearAll(); return }
    const ids = dbItems?.map(p => p.id) ?? []
    setDbItems([])
    try {
      await Promise.all(ids.map(id => removeFromWishlist(user.id, id)))
    } catch {
      getWishlist(user.id).then(setDbItems).catch(() => {})
    }
  }, [user, dbItems, guestClearAll])

  return {
    items:      user ? (dbItems ?? []) : guestItems,
    toggle,
    isFavorited,
    removeItem,
    clearAll,
    isLoaded:   !user || dbItems !== null,
  }
}
