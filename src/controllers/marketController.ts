import { Request, Response } from 'express'
import { fetchXAUUSDPrice } from '../services/marketService'

export async function getMarketPrice(req: Request, res: Response) {
  try {
    const price = await fetchXAUUSDPrice()
    res.json(price)
  } catch (error: any) {
    console.error('Market price error:', error?.message ?? error)
    res.status(502).json({ error: error?.message ?? 'Failed to fetch XAUUSD price' })
  }
}
