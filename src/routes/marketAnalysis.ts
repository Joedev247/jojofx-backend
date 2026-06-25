import express from 'express'
import { getMarketAnalysis } from '../controllers/marketAnalysisController'

const router = express.Router()

router.get('/market/analysis', getMarketAnalysis)

export default router
