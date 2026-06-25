import express from 'express'
import { createTrade, getTrades, getTrade, updateTrade } from '../controllers/tradeController'

const router = express.Router()

router.post('/trades', createTrade)
router.get('/trades', getTrades)
router.get('/trades/:id', getTrade)
router.patch('/trades/:id', updateTrade)

export default router
