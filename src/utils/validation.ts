export function validateSignal(signal: any): { error?: string } {
  if (!signal.symbol) return { error: 'Symbol is required' }
  if (!signal.direction) return { error: 'Direction is required' }
  if (!signal.entry_price) return { error: 'Entry price is required' }
  if (!signal.setup_type) return { error: 'Setup type is required' }

  if (signal.symbol !== 'XAUUSD') {
    return { error: 'Only XAUUSD is allowed' }
  }

  if (!['BUY', 'SELL'].includes(signal.direction)) {
    return { error: 'Direction must be BUY or SELL' }
  }

  return {}
}
