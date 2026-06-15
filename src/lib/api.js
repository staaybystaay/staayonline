import { supabase } from './supabase'

// ─── SIGN IN ─────────────────────────────────
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })
  if (error) throw error
  return data
}

// ─── SIGN UP ─────────────────────────────────
export async function signUp({
  email,
  password,
  firstName,
  lastName,
  phone,
  gender,
  interests,
  avatarUrl,
}) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        first_name: firstName,
        last_name:  lastName,
        phone,
        gender,
        interests,
        avatar_url: avatarUrl,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error

  if (data.user) {
    await supabase.from('customers').upsert({
      id:         data.user.id,
      first_name: firstName,
      last_name:  lastName,
      phone:      phone      || null,
      gender:     gender     || null,
      interests:  interests  || null,
      avatar_url: avatarUrl  || null,
    }, { onConflict: 'id' })
  }

  return data
}

// ─── SIGN OUT ────────────────────────────────
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ─── GOOGLE OAUTH ────────────────────────────
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) throw error
  return data
}

// ─── APPLE OAUTH ─────────────────────────────
export async function signInWithApple() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  if (error) throw error
  return data
}

// ─── FORGOT PASSWORD ─────────────────────────
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${window.location.origin}/auth/reset-password` }
  )
  if (error) throw error
}

// ─── UPDATE PASSWORD ─────────────────────────
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

// ─── SESSION / USER ──────────────────────────
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// ─── CUSTOMER PROFILE ────────────────────────
export async function getCustomerProfile(userId) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateCustomerProfile(userId, updates) {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── UPLOAD AVATAR ───────────────────────────
export async function uploadAvatar(userId, file) {
  const ext  = file.name.split('.').pop().toLowerCase()
  const path = `avatars/${userId}.${ext}`
  const { error } = await supabase.storage
    .from('products')
    .upload(path, file, { upsert: true, contentType: file.type })
  if (error) throw error
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}

// ─── ORDERS ──────────────────────────────────
export async function createOrder(orderData) {
  const { items, ...order } = orderData
  const { data: newOrder, error: orderError } = await supabase
    .from('orders').insert(order).select().single()
  if (orderError) throw orderError

  const { error: itemsError } = await supabase.from('order_items').insert(
    items.map(item => ({
      order_id:   newOrder.id,
      product_id: item.id        || null,
      name:       item.name,
      price:      item.price,
      qty:        item.qty,
      image_url:  item.image     || item.image_url || null,
    }))
  )
  if (itemsError) throw itemsError
  return newOrder
}

export async function getOrdersByEmail(email) {
  const { data, error } = await supabase
    .from('orders').select('*, order_items(*)').eq('email', email)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from('orders').select('*, order_items(*)').eq('id', id).single()
  if (error) throw error
  return data
}

// ─── ADMIN — ORDERS ──────────────────────────
export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── PRODUCTS ────────────────────────────────
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, collection:collections(id, slug, name)')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function getSaleProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, collection:collections(id, slug, name)')
    .eq('active', true)
    .gt('discount_percent', 0)
    .order('discount_percent', { ascending: false })
  if (error) throw error
  return data
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select('*, collection:collections(id, slug, name)')
    .eq('slug', slug).single()
  if (error) throw error
  return data
}

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections').select('*').eq('active', true)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}
