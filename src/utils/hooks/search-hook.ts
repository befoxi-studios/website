import { useState } from 'preact/hooks'
import { isAll, isInclude, isStartsWith } from '../is'
import { SearchResult } from '../../types/search'

const routeFiles = import.meta.glob(`../../routes/**/!(_*)*.{js,jsx,ts,tsx}`, { eager: true })
const blogFiles = import.meta.glob(`../../submodules/blog/*/index.{md,mdx}`, { eager: true })

const queryRoutes = (query: string): (SearchResult | undefined)[] => {
  return Object.keys(routeFiles).map(path => {
    const regex = /^\.\.\/\.\.\/(routes)\/(([a-zA-Z0-9_-]+)\.(jsx?|tsx?))$/
    const rule = path.replace(regex, 'page:$3')
    const pureRule = path.replace(regex, '$3')
    const newPath = path + `?sr=${rule},${pureRule}`
    
    if (
      isAll(query)
      || isStartsWith(rule, query.toLowerCase())
      || isInclude(pureRule, query.toLowerCase())
    ) {
      return {
        type: 'page',
        path: newPath,
        rules: [rule, pureRule],
      }
    }
  })
}

const queryBlog = (query: string): (SearchResult | undefined)[] => {
  return Object.keys(blogFiles).map(path => {
    const regex = /^\.\.\/\.\.\/submodules\/(blog)\/([a-zA-Z0-9_-]+)\/((.+)\.mdx)?$/
    const rule = path.replace(regex, '$1:$2')
    const pureRule = path.replace(regex, '$2')
    const newPath = path + `?sr=${rule}`
    
    if (
      isAll(query)
      || isStartsWith(rule, query.toLowerCase())
      || isInclude(pureRule, query.toLowerCase())
    ) {
      return {
        type: 'blog',
        path: newPath,
        rules: [rule, pureRule],
      }
    }
  })
}

const queryCustom = (custom: SearchResult[] | undefined, query: string): (SearchResult | undefined)[] => {
  if (!custom) return []
  return (
    custom.map(({ type, name, rules }) => {
      const included = !!rules.filter(rule => isInclude(rule.toLowerCase(), query.toLowerCase()))[0]
      if (isAll(query) || included) {
        return { type, name, rules }
      }
    })
  )
}

export function useSearch(custom?: SearchResult[]) {
  const [results, setResults] = useState<(SearchResult | undefined)[]>([])

  const search = (query: string) => {
    const matchedResults: (SearchResult | undefined)[] = [
      ...queryRoutes(query),
      ...queryBlog(query),
      ...queryCustom(custom, query),
    ]

    setResults(matchedResults.filter(t => t))
  }

  return { results, search }
}
