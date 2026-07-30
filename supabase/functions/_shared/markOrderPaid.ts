import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

export function serviceClient(): SupabaseClient {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export type MarkPaidResult =
  | { ok: true; alreadyPaid: boolean; order: Record<string, unknown> }
  | { ok: false; reason: string }

// Idempotent: safe to call from both the client-triggered verify request and
// the Paystack webhook, whichever arrives first. Always re-fetches the order
// from the DB and re-checks the amount here rather than trusting the caller,
// since this is the last line of defense against a tampered/replayed request.
export async function markOrderPaidByReference(
  supabase: SupabaseClient,
  reference: string,
  paystackAmountKobo: number,
  paystackStatus: string,
): Promise<MarkPaidResult> {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('payment_reference', reference)
    .single()

  if (error || !order) {
    return { ok: false, reason: 'Order not found for this reference' }
  }

  if (order.payment_status === 'paid') {
    return { ok: true, alreadyPaid: true, order }
  }

  if (paystackStatus !== 'success') {
    return { ok: false, reason: `Paystack status was "${paystackStatus}", not success` }
  }

  const expectedKobo = Math.round(Number(order.total) * 100)
  if (paystackAmountKobo !== expectedKobo) {
    return { ok: false, reason: `Amount mismatch: expected ${expectedKobo}, got ${paystackAmountKobo}` }
  }

  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update({ payment_status: 'paid' })
    .eq('id', order.id)
    .select()
    .single()

  if (updateError) {
    return { ok: false, reason: updateError.message }
  }

  return { ok: true, alreadyPaid: false, order: updated }
}
