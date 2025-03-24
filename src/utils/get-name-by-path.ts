const getNameByPath = (path: string, patterns: string[]) => {
  let name = undefined
  patterns.forEach((str) => {
    const patternRegex = new RegExp(str)
    const match = patternRegex.exec(path)
    if (match) {
      name = match[1]
    }
  })
  return name
}

export default getNameByPath
