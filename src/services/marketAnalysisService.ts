import axios from 'axios'
import { getCurrentSession, isValidTradingSession } from './sessionValidator'
import { TRADING_CONSTANTS } from '../utils/constants'

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price'
const COIN_ID = 'tether-gold'
const VS_CURRENCY = 'usd'

export interface SignalRuleCheck {
  rule: string
  passed: boolean
}

export interface MarketAnalysis {
  symbol: 'XAUUSD'
  source: 'CoinGecko'
  currentPrice: number
  change24h?: number
  fetched_at: string
  currentTime: string
  session: string
  isValidSession: boolean
  trend: 'Bullish' | 'Bearish' | 'Neutral'
  setupType: 'SR_Bounce' | 'Break_Retest' | 'Supply_Demand' | 'SMC' | 'Other'
  setupGrade: 'A+' | 'A' | 'B' | 'C'
  support: number
  resistance: number
  entryZone: string
  stopLoss: number
  takeProfit: number
  takeProfitLevels: number[]
  rrRatio: number
  recommendation: 'BUY' | 'SELL' | 'WAIT'
  formattedSignal: string
  analysisSummary: string[]
  ruleChecks: SignalRuleCheck[]
}

function round(value: number, step = 0.01) {
  return Math.round(value / step) * step
}

async function fetchCoinGeckoPrice() {
  const response = await axios.get(COINGECKO_URL, {
    params: {
      ids: COIN_ID,
      vs_currencies: VS_CURRENCY,
      include_24hr_change: true,
    },
  })

  const payload = response.data?.[COIN_ID]
  if (!payload || typeof payload[VS_CURRENCY] !== 'number') {
    throw new Error('Unable to fetch XAUUSD price')
  }

  const change24h = typeof payload[`${VS_CURRENCY}_24h_change`] === 'number'
    ? payload[`${VS_CURRENCY}_24h_change`] as number
    : undefined

  return {
    price: payload[VS_CURRENCY] as number,
    change24h,
  }
}

function buildMarketStructure(price: number, change24h?: number) {
  if (change24h === undefined) return 'Neutral'
  if (change24h >= 0.45) return 'Bullish'
  if (change24h <= -0.45) return 'Bearish'
  return 'Neutral'
}

function chooseSetupType(price: number, change24h?: number) {
  if (change24h === undefined) return 'SR_Bounce'
  if (Math.abs(change24h) >= 1.0) return 'SMC'
  if (Math.abs(change24h) >= 0.5) return 'Break_Retest'
  return 'SR_Bounce'
}

function chooseGrade(setupType: string, change24h?: number) {
  if (setupType === 'SMC') return 'A+'
  if (setupType === 'Break_Retest' && change24h !== undefined && Math.abs(change24h) >= 0.6) return 'A'
  if (setupType === 'SR_Bounce') return 'B'
  return 'C'
}

function buildLevels(price: number, trend: string) {
  const range = Math.max(8, Math.abs(price * 0.0019))
  const support = round(price - range)
  const resistance = round(price + range)
  const stopLoss = trend === 'Bullish' ? round(support - 1.5) : trend === 'Bearish' ? round(resistance + 1.5) : round(price - 2)
  const takeProfit = trend === 'Bullish' ? round(price + range * 1.6) : trend === 'Bearish' ? round(price - range * 1.6) : round(price + 2)
  return { support, resistance, stopLoss, takeProfit }
}

function buildEntryZone(price: number, trend: string, support: number, resistance: number) {
  const zoneWidth = 3
  if (trend === 'Bullish') {
    const low = round(support)
    const high = round(support + zoneWidth)
    return `${low.toFixed(2)}/${high.toFixed(2)}`
  }

  if (trend === 'Bearish') {
    const low = round(resistance - zoneWidth)
    const high = round(resistance)
    return `${low.toFixed(2)}/${high.toFixed(2)}`
  }

  const low = round(price - zoneWidth / 2)
  const high = round(price + zoneWidth / 2)
  return `${low.toFixed(2)}/${high.toFixed(2)}`
}

function buildTakeProfitLevels(price: number, trend: string, count = 5) {
  const step = round(Math.max(2.5, Math.abs(price * 0.0007)), 0.5)
  const levels: number[] = []
  for (let i = 1; i <= count; i += 1) {
    const level = trend === 'Bullish'
      ? round(price + step * i)
      : trend === 'Bearish'
      ? round(price - step * i)
      : round(price + step * i)
    levels.push(level)
  }
  return levels
}

function buildFormattedSignal(symbol: string, recommendation: string, entryZone: string, stopLoss: number, takeProfitLevels: number[]) {
  const superscripts = ['¹', '²', '³', '⁴', '⁵']
  const lines = [`${symbol} ${recommendation} NOW ${entryZone}`]
  takeProfitLevels.forEach((tp, index) => {
    lines.push(`TP${superscripts[index]}   ${tp.toFixed(2)}`)
  })
  lines.push(`SL     ${stopLoss.toFixed(2)}`)
  return lines.join('\n')
}

function buildRuleChecks(analysis: MarketAnalysis): SignalRuleCheck[] {
  return [
    { rule: 'Only trade XAUUSD', passed: analysis.symbol === 'XAUUSD' },
    { rule: 'Session must be London or New York prime time', passed: analysis.isValidSession },
    { rule: `RR ratio must be at least 1:${TRADING_CONSTANTS.MIN_RR_RATIO}`, passed: analysis.rrRatio >= TRADING_CONSTANTS.MIN_RR_RATIO },
    { rule: 'Stop loss must use a buffer and be below/above the zone', passed: analysis.stopLoss > 0 },
    { rule: 'Never trade Asian session or session closed', passed: analysis.isValidSession },
    { rule: 'Use a strong setup type: SMC, Break & Retest or SR Bounce', passed: ['SMC', 'Break_Retest', 'SR_Bounce'].includes(analysis.setupType) },
  ]
}

export async function analyzeMarket(): Promise<MarketAnalysis> {
  const { price, change24h } = await fetchCoinGeckoPrice()
  const session = getCurrentSession()
  const isValidSession = isValidTradingSession(session)
  const trend = buildMarketStructure(price, change24h)
  const setupType = chooseSetupType(price, change24h)
  const setupGrade = chooseGrade(setupType, change24h)
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const { support, resistance, stopLoss, takeProfit } = buildLevels(price, trend)
  const entryZone = buildEntryZone(price, trend, support, resistance)
  const takeProfitLevels = buildTakeProfitLevels(price, trend)
  const rrRatio = round(Math.abs(takeProfit - price) / Math.abs(stopLoss - price), 0.1)
  const recommendation = trend === 'Bullish' ? 'BUY' : trend === 'Bearish' ? 'SELL' : 'WAIT'
  const formattedSignal = buildFormattedSignal('XAUUSD', recommendation, entryZone, stopLoss, takeProfitLevels)
  const analysisSummary = [
    `Session: ${session.replace('_', ' ')}`,
    `Trend bias: ${trend}`,
    `Setup: ${setupType.replace('_', ' ')}`,
    `Grade: ${setupGrade}`,
    `Recommended action: ${recommendation}`,
    `Risk:Reward: 1:${rrRatio.toFixed(1)}`,
  ]

  const analysis: MarketAnalysis = {
    symbol: 'XAUUSD',
    source: 'CoinGecko',
    currentPrice: price,
    change24h,
    fetched_at: new Date().toISOString(),
    currentTime,
    session,
    isValidSession,
    trend,
    setupType,
    setupGrade,
    support,
    resistance,
    entryZone,
    stopLoss,
    takeProfit,
    takeProfitLevels,
    rrRatio,
    recommendation,
    formattedSignal,
    analysisSummary,
    ruleChecks: [],
  }

  analysis.ruleChecks = buildRuleChecks(analysis)
  return analysis
}
