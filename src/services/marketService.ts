import axios from 'axios'

const BINANCE_TICKER_URLS = [
  'https://www.binance.com/api/v3/ticker/24hr',
  'https://api.binance.com/api/v3/ticker/price',
  'https://api1.binance.com/api/v3/ticker/price',
  'https://api2.binance.com/api/v3/ticker/price',
  'https://api3.binance.com/api/v3/ticker/price',
]
const SYMBOL = 'XAUTUSDT'

export interface MarketPrice {
  symbol: 'XAUUSD'
  source: 'Binance'
  price: number
  change_24h?: number
  fetched_at: string
}

async function fetchBinanceTicker() {
  let lastError: any = null

  for (const url of BINANCE_TICKER_URLS) {
    try {
      const response = await axios.get(url, {
        params: { symbol: SYMBOL },
        timeout: 10000,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; JOJOFX-Bot/1.0)',
        },
      })

      const payload = response.data
      const price = Number(payload?.lastPrice ?? payload?.price)
      const change24h = Number(payload?.priceChangePercent)

      if (!payload || Number.isNaN(price)) {
        throw new Error(`Binance returned invalid payload from ${url}`)
      }

      return { price, change24h, url }
    } catch (error: any) {
      lastError = error
      const status = axios.isAxiosError(error) ? error.response?.status : undefined
      const message = status ? `status ${status}` : error?.message ?? 'unknown error'
      console.warn(`Binance fetch failed for ${url}: ${message}`)

      if (status === 429) {
        throw new Error('Binance rate limit exceeded (429 Too Many Requests)')
      }
    }
  }

  throw new Error(lastError?.message ?? 'Unable to fetch XAUUSD price from Binance')
}

export async function fetchXAUUSDPrice(): Promise<MarketPrice> {
  const { price, change24h } = await fetchBinanceTicker()

  return {
    symbol: 'XAUUSD',
    source: 'Binance',
    price,
    change_24h: Number.isNaN(change24h) ? undefined : change24h,
    fetched_at: new Date().toISOString(),
  }
}
