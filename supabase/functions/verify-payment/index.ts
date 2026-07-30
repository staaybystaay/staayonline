import { serviceClient, corsHeaders, markOrderPaidByReference } from '../_shared/markOrderPaid.ts'

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')!

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const { reference } = await req.json()
    if (!reference) {
      return json({ error: 'reference is required' }, 400)
    }

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    })
    const paystackData = await paystackRes.json()

    if (!paystackRes.ok || !paystackData.status) {
      return json({ error: paystackData.message || 'Could not verify transaction with Paystack' }, 502)
    }

    const supabase = serviceClient()
    const result = await markOrderPaidByReference(
      supabase,
      reference,
      paystackData.data.amount,
      paystackData.data.status,
    )

    if (!result.ok) {
      return json({ status: 'failed', reason: result.reason }, 200)
    }

    return json({ status: 'success', alreadyPaid: result.alreadyPaid, order: result.order })
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
