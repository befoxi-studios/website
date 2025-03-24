export type SearchResult = {
  type: 'route' | 'blog' | string
  path: string
  rules: string[]
}

export type SearchIndexProps = {
  [type: string]: {
    pattern: string | RegExp
    callback: (value: string, params: { [key: string]: any }) => any
    aliases?: string[]
  }
}
