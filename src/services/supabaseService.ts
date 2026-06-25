import { createClient } from '@supabase/supabase-js'
import { Signal } from '../types/signal'
import { Trade } from '../types/trade'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Signal services
export async function createSignalService(signal: Signal) {
  const { data, error } = await supabase.from('signals').insert([signal]).select()
  if (error) throw error
  return data?.[0]
}

export async function getSignalsService() {
  const { data, error } = await supabase.from('signals').select()
  if (error) throw error
  return data
}

export async function getSignalService(id: string) {
  const { data, error } = await supabase.from('signals').select().eq('id', id).single()
  if (error) throw error
  return data
}

// Trade services
export async function createTradeService(trade: Trade) {
  const { data, error } = await supabase.from('trades').insert([trade]).select()
  if (error) throw error
  return data?.[0]
}

export async function getTradesService() {
  const { data, error } = await supabase.from('trades').select()
  if (error) throw error
  return data
}

export async function getTradeService(id: string) {
  const { data, error } = await supabase.from('trades').select().eq('id', id).single()
  if (error) throw error
  return data
}

export async function updateTradeService(id: string, trade: Partial<Trade>) {
  const { data, error } = await supabase.from('trades').update(trade).eq('id', id).select()
  if (error) throw error
  return data?.[0]
}
