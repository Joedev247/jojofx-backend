import axios from 'axios'

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price'
const COIN_ID = 'tether-gold'
const VS_CURRENCY = 'usd'

export interface MarketPrice {
  symbol: 'XAUUSD'
  source: 'CoinGecko'
  price: number
  change_24h?: number
  fetched_at: string
}

export async function fetchXAUUSDPrice(): Promise<MarketPrice> {
  const response = await axios.get(COINGECKO_URL, {
    params: {
      ids: COIN_ID,
      vs_currencies: VS_CURRENCY,
      include_24hr_change: true,
      include_last_updated_at: true,
    },
  })

  const payload = response.data?.[COIN_ID]
  if (!payload || typeof payload[VS_CURRENCY] !== 'number') {
    throw new Error('Unable to fetch XAUUSD price')
  }

  return {
    symbol: 'XAUUSD',
    source: 'CoinGecko',
    price: payload[VS_CURRENCY],
    change_24h: payload[`${VS_CURRENCY}_24h_change`],
    fetched_at: new Date().toISOString(),
  }
}
