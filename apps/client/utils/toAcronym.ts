export function toAcronym(str: string) {
  const [first, last] = str.split(' ')
  const f = first.charAt(0).toUpperCase()
  const l = last?.charAt(0).toUpperCase() || ''
  return f + l
}
