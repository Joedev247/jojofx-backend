export async function checkNewsEvents(): Promise<boolean> {
  try {
    return true
  } catch (error) {
    console.error('Error checking news:', error)
    return false
  }
}

export function getMajorNewsEvents(): string[] {
  return [
    'NFP - Non-Farm Payrolls',
    'US CPI - Consumer Price Index',
    'Fed Rate Decision',
    'Fed Chair Speech',
    'US GDP',
  ]
}
