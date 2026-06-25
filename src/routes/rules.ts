import express from 'express'
import { getRuleStatus, checkSetup } from '../controllers/ruleController'

const router = express.Router()

router.get('/rules', getRuleStatus)
router.post('/rules/check', checkSetup)

export default router
