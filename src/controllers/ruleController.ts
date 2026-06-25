import { Request, Response } from 'express'
import { validateRules } from '../services/tradingLogic'

export async function getRuleStatus(req: Request, res: Response) {
  try {
    res.json({ status: 'All rules operational' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function checkSetup(req: Request, res: Response) {
  try {
    const violations = validateRules(req.body)
    res.json({ violations, isValid: violations.length === 0 })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
