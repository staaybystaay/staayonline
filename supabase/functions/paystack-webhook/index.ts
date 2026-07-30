import { serviceClient, markOrderPaidByReference } from '../_shared/markOrderPaid.ts'

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')!

// Paystack does not send an OPTIONS preflight (server-to-server), so this
// function intentionally has no CORS headers — it should never be called
// from a browser.
Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  if (!signature || !(await isValidSignature(rawBody, signature))) {
    // Do not trust anything below this line if the signature check fails —
    // this is what stops someone from POSTing a fake "payment succeeded" event.
    return new Response('Invalid signature', { status: 401 })
  }

  const event = JSON.parse(rawBody)

  if (event.event === 'charge.success') {
    const supabase = serviceClient()
    await markOrderPaidByReference(
      supabase,
      event.data.reference,
      event.data.amount,
      event.data.status,
    )
  }

  // Paystack just needs a 200 to stop retrying; the outcome of markOrderPaid
  // isn't surfaced here since this endpoint has no human waiting on it.
  return new Response('ok', { status: 200 })
})

async function isValidSignature(rawBody: string, signatureHeader: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(PAYSTACK_SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody))
  const computed = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('')
  return computed === signatureHeader
}
