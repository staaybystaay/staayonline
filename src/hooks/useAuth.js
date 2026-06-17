import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { signIn, signUp, signOut, signInWithGoogle, resetPassword, updatePassword, getCustomerProfile, uploadAvatar } from '../lib/api'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) loadProfile(u)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) {
          await loadProfile(u)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Loads the customer profile, creating one if it doesn't exist yet
  // (handles OAuth sign-ins like Google which skip the signUp() flow)
  async function loadProfile(user) {
    try {
      let p = await getCustomerProfile(user.id)

      if (!p) {
        const meta = user.user_metadata || {}
        const fullName = meta.full_name || meta.name || ''
        const [firstName, ...rest] = fullName.split(' ')

        const { data, error } = await supabase
          .from('customers')
          .upsert({
            id:         user.id,
            first_name: meta.first_name || firstName || null,
            last_name:  meta.last_name  || rest.join(' ') || null,
            phone:      meta.phone     || null,
            gender:     meta.gender    || null,
            interests:  meta.interests || null,
            avatar_url: meta.avatar_url || meta.picture || null,
          }, { onConflict: 'id' })
          .select()
          .single()

        if (!error) p = data
      }

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
      if (user) await loadProfile(user)
    },
  }
}
