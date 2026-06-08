import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { signIn, signUp, signOut, getCustomerProfile } from '../lib/api'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) {
          try {
            const p = await getCustomerProfile(u.id)
            setProfile(p)
          } catch {
            setProfile(null)
          }
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function login(email, password) {
    const data = await signIn({ email, password })
    return data
  }

  async function register(details) {
    const data = await signUp(details)
    return data
  }

  async function logout() {
    await signOut()
  }

  return { user, profile, loading, login, register, logout }
}