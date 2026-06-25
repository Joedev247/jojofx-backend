export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  stopLossPips: number,
  pipValue: number = 0.10
): number {
  const riskAmount = accountBalance * (riskPercent / 100)
  const lotSize = riskAmount / (stopLossPips * pipValue)
  return Math.round(lotSize * 100) / 100
}

export function validatePositionSize(
  accountBalance: number,
  lotSize: number,
  stopLossPips: number,
  riskPercent: number
): boolean {
  const calculatedLotSize = calculatePositionSize(accountBalance, riskPercent, stopLossPips)
  return lotSize === calculatedLotSize
}
