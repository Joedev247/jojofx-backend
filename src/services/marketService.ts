import axios from 'axios'

const BINANCE_TICKER_URL = 'https://api.binance.com/api/v3/ticker/24hr'
const SYMBOL = 'XAUTUSDT'

export interface MarketPrice {
  symbol: 'XAUUSD'
  source: 'Binance'
  price: number
  change_24h?: number
  fetched_at: string
}

export async function fetchXAUUSDPrice(): Promise<MarketPrice> {
  const response = await axios.get(BINANCE_TICKER_URL, {
    params: {
      symbol: SYMBOL,
    },
  })

  const payload = response.data
  const price = Number(payload?.lastPrice)
  const change24h = Number(payload?.priceChangePercent)

  if (!payload || Number.isNaN(price)) {
    throw new Error('Unable to fetch XAUUSD price from Binance')
  }

  return {
    symbol: 'XAUUSD',
    source: 'Binance',
    price,
    change_24h: Number.isNaN(change24h) ? undefined : change24h,
    fetched_at: new Date().toISOString(),
  }
}
