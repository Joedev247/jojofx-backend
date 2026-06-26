import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JOJOFX Backend is running' })
})

// Import and use route modules
import signalRoutes from './routes/signals'
import tradeRoutes from './routes/trades'
import ruleRoutes from './routes/rules'
import marketRoutes from './routes/market'
import marketAnalysisRoutes from './routes/marketAnalysis'

app.use('/api', signalRoutes)
app.use('/api', tradeRoutes)
app.use('/api', ruleRoutes)
app.use('/api', marketRoutes)
app.use('/api', marketAnalysisRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: 'Internal server error' })
})

export default app
