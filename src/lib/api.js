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
    order_id:   newOrder.id,
    product_id: item.id || null,
    name:       item.name,
    price:      item.price,
    qty:        item.qty,
    image_url:  item.image || item.image_url || null,
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