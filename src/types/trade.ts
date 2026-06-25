export interface Trade {
  id?: string
  user_id?: string
  signal_id?: string
  symbol: string
  direction: 'BUY' | 'SELL'
  entry_price: number
  stop_loss: number
  take_profit: number
  lot_size: number
  risk_amount: number
  planned_rr_ratio: string
  exit_price?: number
  result?: 'WIN' | 'LOSS' | 'BREAKEVEN'
  pnl?: number
  opened_at?: string
  closed_at?: string
  session: string
  status?: 'Open' | 'Closed' | 'Cancelled'
}
