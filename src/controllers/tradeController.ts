import { Request, Response } from 'express'
import { createTradeService, getTradesService, getTradeService, updateTradeService } from '../services/supabaseService'

export async function createTrade(req: Request, res: Response) {
  try {
    const trade = await createTradeService(req.body)
    res.json(trade)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getTrades(req: Request, res: Response) {
  try {
    const trades = await getTradesService()
    res.json(trades)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getTrade(req: Request, res: Response) {
  try {
    const trade = await getTradeService(req.params.id)
    res.json(trade)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateTrade(req: Request, res: Response) {
  try {
    const trade = await updateTradeService(req.params.id, req.body)
    res.json(trade)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
