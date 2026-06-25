export function getCurrentSession(): string {
  const now = new Date()
  const hours = now.getHours() + 1

  if (hours >= 8 && hours < 11) return 'London_Open'
  if (hours >= 11 && hours < 13) return 'Midday_Quiet'
  if (hours >= 13 && hours < 17) return 'London_NY_Overlap'
  if (hours >= 17 && hours < 19) return 'NY_Late'
  return 'Session_Closed'
}

export function isValidTradingSession(session: string): boolean {
  const validSessions = ['London_Open', 'London_NY_Overlap', 'NY_Late']
  return validSessions.includes(session)
}

export function getSessionStartTime(session: string): number {
  const sessions: Record<string, number> = {
    'London_Open': 8,
    'London_NY_Overlap': 13,
    'NY_Late': 17,
  }
  return sessions[session] || 0
}
