import { supabase } from './supabase'

// ─── COLLECTIONS ─────────────────────────────

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// ─── PRODUCTS ────────────────────────────────

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collection:collections(id, slug, name)
    `)
    .eq('active', true)
    .eq('in_stock', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getProductsByCollection(collectionSlug) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collection:collections(id, slug, name)
    `)
    .eq('active', true)
    .eq('in_stock', true)
    .eq('collections.slug', collectionSlug)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collection:collections(id, slug, name)
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// ─── ORDERS ──────────────────────────────────

export async function createOrder(orderData) {
  const { items, ...order } = orderData

  // 1 — insert the order
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (orderError) throw orderError

  // 2 — insert the order items
  const orderItems = items.map(item => ({
    order_id:      newOrder.id,
    product_id:    item.id || null,
    name:          item.name,
    price:         item.price,
    qty:           item.qty,
    image_url:     item.image || item.image_url || null,
    size:          item.size || null,
    customization: item.customization || null,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw itemsError

  return newOrder
}

export async function getOrdersByEmail(email) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(*)
    `)
    .eq('email', email)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// ─── PAYMENTS ────────────────────────────────

export async function initializePayment(orderId) {
  const { data, error } = await supabase.functions.invoke('initialize-payment', {
    body: { orderId },
  })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data // { authorization_url, reference }
}

export async function verifyPayment(reference) {
  const { data, error } = await supabase.functions.invoke('verify-payment', {
    body: { reference },
  })
  if (error) throw error
  return data // { status: 'success' | 'failed', reason?, order? }
}

// ─── AUTH / CUSTOMERS ────────────────────────

export async function signUp({ email, password, firstName, lastName, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, phone },
    },
  })
  if (error) throw error

  // Create customer profile row
  if (data.user) {
    await supabase.from('customers').upsert({
      id:         data.user.id,
      first_name: firstName,
      last_name:  lastName,
      phone,
    })
  }

  return data
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getCustomerProfile(userId) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
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

// ─── AUTH HELPERS ────────────────────────────

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  if (error) throw error
  return data
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // AuthCallback.jsx is what listens for the PASSWORD_RECOVERY event and
    // forwards to /auth/reset-password — redirecting straight to a
    // "/reset-password" route (which doesn't exist) skipped that listener
    // and left the user on a blank page.
    redirectTo: `${window.location.origin}/auth/callback`,
  })
  if (error) throw error
}

export async function uploadAvatar(userId, file) {
  const ext  = file.name.split('.').pop()
  const path = `avatars/${userId}.${ext}`
  const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
  if (upErr) throw upErr
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  const url = data.publicUrl
  await supabase.from('customers').update({ avatar_url: url }).eq('id', userId)
  return url
}

// ─── NEWSLETTER ──────────────────────────────

export async function subscribeToNewsletter(email) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })
  if (error) throw error
}

export async function getNewsletterSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteNewsletterSubscriber(id) {
  const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
  if (error) throw error
}

// ─── CONTACT MESSAGES ────────────────────────

export async function submitContactMessage({ name, email, subject, message }) {
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, subject, message })
  if (error) throw error
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function markMessageRead(id) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)
  if (error) throw error
}

export async function deleteContactMessage(id) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) throw error
}

// ─── REVIEWS ─────────────────────────────────

export async function getReviewsByProduct(productId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createReview({ productId, userId, rating, body }) {
  const { data, error } = await supabase
    .from('reviews')
    .insert({ product_id: productId, user_id: userId, rating, body })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── SALE PRODUCTS ───────────────────────────

export async function getSaleProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, collection:collections(id, slug, name)')
    .eq('active', true)
    .eq('on_sale', true)
    .order('sort_order', { ascending: true })
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

export async function updateOrderStatus(id, status) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export async function updatePaymentStatus(id, payment_status) {
  const { error } = await supabase
    .from('orders')
    .update({ payment_status })
    .eq('id', id)
  if (error) throw error
}

// ─── ADMIN — PRODUCTS ────────────────────────

export async function getAllProductsAdmin() {
  const { data, error } = await supabase
    .from('products')
    .select('*, collection:collections(id, slug, name)')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function uploadProductImage(file) {
  const ext  = file.name.split('.').pop()
  const path = `products/${Date.now()}.${ext}`
  const { error: upErr } = await supabase.storage.from('products').upload(path, file)
  if (upErr) throw upErr
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}

// ─── WISHLIST ─────────────────────────────────

export async function getWishlist(userId) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('product_id, products(*,collection:collections(id,slug,name))')
    .eq('user_id', userId)

  if (error) throw error
  return data.map(row => row.products).filter(Boolean)
}

export async function addToWishlist(userId, productId) {
  const { error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, product_id: productId })

  if (error && error.code !== '23505') throw error // ignore duplicate
}

export async function removeFromWishlist(userId, productId) {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) throw error
}
