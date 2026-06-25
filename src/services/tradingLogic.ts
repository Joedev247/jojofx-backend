import { Trade } from '../types/trade'
import { TRADING_CONSTANTS } from '../utils/constants'

export function validateRules(trade: Trade): string[] {
  const violations: string[] = []

  // Check symbol
  if (trade.symbol !== TRADING_CONSTANTS.SYMBOL) {
    violations.push(`Only ${TRADING_CONSTANTS.SYMBOL} is allowed`)
  }

  // Check RR ratio
  const rrRatio = parseFloat(trade.planned_rr_ratio.split(':')[1])
  if (rrRatio < TRADING_CONSTANTS.MIN_RR_RATIO) {
    violations.push(`Minimum RR ratio is 1:${TRADING_CONSTANTS.MIN_RR_RATIO}`)
  }

  // Check session
  if (!isValidSession(trade.session)) {
    violations.push('Trade outside London or New York session')
  }

  // Check stop loss exists
  if (!trade.stop_loss) {
    violations.push('Stop loss is required')
  }

  return violations
}

function isValidSession(session: string): boolean {
  const validSessions = ['London_Open', 'London_NY_Overlap', 'New_York']
  return validSessions.includes(session)
}

export function checkWeekendRule(date: Date): boolean {
  const day = date.getDay()
  const hours = date.getHours() + 1

  if (day === 5 && hours >= 17) return false
  if (day === 6 || day === 0) return false

  return true
}
