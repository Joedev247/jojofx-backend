import express from 'express'
import { createSignal, getSignals, getSignal } from '../controllers/signalController'

const router = express.Router()

router.post('/signals', createSignal)
router.get('/signals', getSignals)
router.get('/signals/:id', getSignal)

export default router
