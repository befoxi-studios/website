export type SearchResult = {
  type: 'route' | 'blog' | string
  path?: string
  name?: string
  rules: string[]
}

export type SearchIndexProps = {
  [type: string]: {
    pattern: string | RegExp
    callback: (value: string, params: { [key: string]: any }) => any
    /** @deprecated */
    aliases?: string[]
    /** @deprecated */
    match?: string
  }
}
