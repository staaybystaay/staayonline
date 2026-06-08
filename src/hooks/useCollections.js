import { useState, useEffect } from 'react'
import { getCollections } from '../lib/api'

export function useCollections() {
  const [collections, setCollections] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetch() {
      try {
        setLoading(true)
        const data = await getCollections()
        if (!cancelled) setCollections(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [])

  return { collections, loading, error }
}