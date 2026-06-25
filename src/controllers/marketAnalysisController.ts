import { Request, Response } from 'express'
import { analyzeMarket } from '../services/marketAnalysisService'

export async function getMarketAnalysis(req: Request, res: Response) {
  try {
    const analysis = await analyzeMarket()
    res.json(analysis)
  } catch (error: any) {
    console.error('Market analysis error:', error?.message ?? error)
    res.status(502).json({ error: error?.message ?? 'Failed to fetch market analysis' })
  }
}
