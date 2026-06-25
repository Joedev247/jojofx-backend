import axios from 'axios'

const MT5_BRIDGE_URL = process.env.MT5_BRIDGE_URL

export async function executeTrade(tradeData: any): Promise<any> {
  try {
    if (!MT5_BRIDGE_URL) {
      return { status: 'mock', message: 'MT5 Bridge not configured' }
    }

    const response = await axios.post(`${MT5_BRIDGE_URL}/trade/execute`, tradeData)
    return response.data
  } catch (error: any) {
    console.error('MT5 Bridge error:', error.message)
    throw error
  }
}

export async function closeTrade(tradeId: string): Promise<any> {
  try {
    if (!MT5_BRIDGE_URL) {
      return { status: 'mock', message: 'MT5 Bridge not configured' }
    }

    const response = await axios.post(`${MT5_BRIDGE_URL}/trade/close`, { tradeId })
    return response.data
  } catch (error: any) {
    console.error('MT5 Bridge error:', error.message)
    throw error
  }
}
