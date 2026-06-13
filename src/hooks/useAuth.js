import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { signIn, signUp, signOut, signInWithGoogle, signInWithApple, resetPassword, updatePassword, getCustomerProfile, uploadAvatar } from '../lib/api'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) loadProfile(u.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) {
          await loadProfile(u.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    try {
      const p = await getCustomerProfile(userId)
      setProfile(p)
    } catch {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    profile,
    loading,
    isLoggedIn: !!user,

    async login(email, password) {
      return await signIn({ email, password })
    },

    async register(details) {
      return await signUp(details)
    },

    async logout() {
      await signOut()
      setUser(null)
      setProfile(null)
    },

    async loginWithGoogle() {
      return await signInWithGoogle()
    },

    async loginWithApple() {
      return await signInWithApple()
    },

    async sendPasswordReset(email) {
      return await resetPassword(email)
    },

    async changePassword(newPassword) {
      return await updatePassword(newPassword)
    },

    async updateAvatar(file) {
      if (!user) throw new Error('Not logged in')
      const url = await uploadAvatar(user.id, file)
      await supabase.from('customers').update({ avatar_url: url }).eq('id', user.id)
      setProfile(p => ({ ...p, avatar_url: url }))
      return url
    },

    async refreshProfile() {
      if (user) await loadProfile(user.id)
    },
  }
}
