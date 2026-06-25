export interface Rule {
  id?: string
  rule_id: string
  rule_name: string
  description: string
  severity: 'error' | 'warning' | 'info'
}

export interface RuleViolation {
  id?: string
  user_id?: string
  rule_id: string
  rule_name: string
  violation: boolean
  details: string
  trade_id?: string
  timestamp?: string
}
