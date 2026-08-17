import { serviceClient, corsHeaders } from '../_shared/markOrderPaid.ts'

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')!
const SITE_URL            = Deno.env.get('SITE_URL') ?? 'https://staayonline.vercel.app'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const { orderId } = await req.json()
    if (!orderId) {
      return json({ error: 'orderId is required' }, 400)
    }

    const supabase = serviceClient()

    // Always read the real amount + email from the DB — never trust a
    // client-supplied amount here, that's the whole point of doing this
    // server-side instead of in the browser.
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error || !order) {
      return json({ error: 'Order not found' }, 404)
    }

    // If the caller is signed in, the order must actually be theirs.
    // Guest checkouts (no signed-in caller — just the anon key) are left
    // alone: requiring an account would break guest checkout, and the
    // order id is an unguessable UUID, not something to brute-force.
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace(/^Bearer\s+/i, '')
    if (token) {
      const { data } = await supabase.auth.getUser(token).catch(() => ({ data: null }))
      const caller = data?.user
      if (caller) {
        const ownsByCustomerId = !!order.customer_id && order.customer_id === caller.id
        const ownsByEmail      = !!order.email && order.email.toLowerCase() === caller.email?.toLowerCase()
        if (!ownsByCustomerId && !ownsByEmail) {
          return json({ error: 'You do not have permission to pay for this order' }, 403)
        }
      }
    }

    if (order.payment_status === 'paid') {
      return json({ error: 'This order has already been paid for' }, 400)
    }

    const reference = `staay_${order.id}_${Date.now()}`

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: order.email,
        amount: Math.round(Number(order.total) * 100), // GHS -> pesewas
        currency: 'GHS',
        reference,
        callback_url: `${SITE_URL}/checkout/callback`,
        metadata: { order_id: order.id },
      }),
    })

    const paystackData = await paystackRes.json()

    if (!paystackRes.ok || !paystackData.status) {
      return json({ error: paystackData.message || 'Failed to initialize payment with Paystack' }, 502)
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({ payment_reference: reference })
      .eq('id', order.id)

    if (updateError) {
      return json({ error: updateError.message }, 500)
    }

    return json({
      authorization_url: paystackData.data.authorization_url,
      reference,
    })
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
