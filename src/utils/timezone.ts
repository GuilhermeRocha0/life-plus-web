export function toInputDateTime(isoString: string): string {
  if (!isoString) return ''

  const date = new Date(isoString)
  const tzOffset = date.getTimezoneOffset() * 60000
  const localISOTime = new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, 16)

  return localISOTime
}

export function fromInputDateTime(localString: string): string {
  if (!localString) return ''

  const date = new Date(localString)
  return date.toISOString()
}
