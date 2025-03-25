export const isInclude = (path: string, query: string) => {
  const lower = path.toLowerCase()
  const blank = lower.replace(/[-_ ]/g, ' ')

  return lower.includes(query) || blank.includes(query)
}

export const isStartsWith = (path: string, query: string) => {
  const lower = path.toLowerCase()
  const blank = lower.replace(/[-_ ]/g, ' ')

  return lower.startsWith(query) || blank.startsWith(query)
}

export const isAll = (query: string) => {
  const rules = [
    '*',
    '/all',
    '/suggestions',
  ]
  return rules.filter(t => t.startsWith(query))[0]
}
