import { useState, useEffect } from 'react'
import { getAllProducts, getProductsByCollection } from '../lib/api'

export function useProducts(collectionSlug = null) {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetch() {
      try {
        setLoading(true)
        setError(null)
        const data = collectionSlug
          ? await getProductsByCollection(collectionSlug)
          : await getAllProducts()
        if (!cancelled) setProducts(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [collectionSlug])

  return { products, loading, error }
}