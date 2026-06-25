import express from 'express'
import { getMarketPrice } from '../controllers/marketController'

const router = express.Router()

router.get('/market/price', getMarketPrice)

export default router
