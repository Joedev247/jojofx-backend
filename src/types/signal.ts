export interface Signal {
  id?: string
  user_id?: string
  symbol: string
  direction: 'BUY' | 'SELL'
  setup_type: 'SR_Bounce' | 'Break_Retest' | 'Supply_Demand' | 'SMC' | 'Other'
  entry_price: number
  suggested_stop_loss: number
  suggested_take_profit: number
  market_structure?: string
  candlestick_pattern?: string
  session: string
  news_check_passed: boolean
  dxy_direction?: 'Rising' | 'Falling' | 'Flat'
  signal_text?: string
  source?: string
  created_at?: string
  status?: 'Pending' | 'Analysed' | 'Entered' | 'Rejected'
}
