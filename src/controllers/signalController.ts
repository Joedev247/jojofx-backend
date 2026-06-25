import { Request, Response } from 'express'
import { createSignalService, getSignalsService, getSignalService } from '../services/supabaseService'
import { validateSignal } from '../utils/validation'

export async function createSignal(req: Request, res: Response) {
  try {
    const { error: validationError } = validateSignal(req.body)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const signal = await createSignalService(req.body)
    res.json(signal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getSignals(req: Request, res: Response) {
  try {
    const signals = await getSignalsService()
    res.json(signals)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getSignal(req: Request, res: Response) {
  try {
    const signal = await getSignalService(req.params.id)
    res.json(signal)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
