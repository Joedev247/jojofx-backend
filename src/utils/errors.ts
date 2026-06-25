export class TradingError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'TradingError'
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class SupabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SupabaseError'
  }
}
