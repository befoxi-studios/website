import { useState } from 'preact/hooks'
import { isAll, isInclude } from '../is'
import { SearchResult } from '../../types/search'

const routeFiles = import.meta.glob(`../../routes/**/!(_*)*.{js,jsx,ts,tsx}`, { eager: true })
const blogFiles = import.meta.glob(`../../submodules/blog/*/index.{md,mdx}`, { eager: true })

const queryRoutes = (query: string): (SearchResult | undefined)[] => {
  return Object.keys(routeFiles).map(path => {
    const regex = /^\.\.\/\.\.\/(routes)\/(([a-zA-Z0-9_-]+)\.(jsx?|tsx?))$/
    const routeRule = path.replace(regex, 'route:$3')
    const pageRule = path.replace(regex, 'page:$3')
    const newPath = path + `?sr=${pageRule},${routeRule}`
    
    if (
      isAll(query)
      || isInclude(routeRule, query.toLowerCase())
      || isInclude(pageRule, query.toLowerCase())
    ) {
      return {
        type: 'route',
        path: newPath,
        rules: [routeRule, pageRule],
      }
    }
  })
}

const queryBlog = (query: string): (SearchResult | undefined)[] => {
  return Object.keys(blogFiles).map(path => {
    const regex = /^\.\.\/\.\.\/submodules\/(blog)\/([a-zA-Z0-9_-]+)\/((.+)\.mdx)?$/
    const rule = path.replace(regex, '$1:$2')
    const newPath = path + `?sr=${rule}`
    
    if (
      isAll(query)
      || isInclude(rule, query.toLowerCase())
    ) {
      return {
        type: 'blog',
        path: newPath,
        rules: [rule],
      }
    }
  })
}

export function useSearch(custom?: SearchResult[]) {
  const [results, setResults] = useState<(SearchResult | undefined)[]>([])

  const search = (query: string) => {
    const matchedResults: (SearchResult | undefined)[] = [
      ...queryRoutes(query),
      ...queryBlog(query),
    ]

    if (custom) {
      matchedResults.push(
        ...custom.map(({ type, path, rules }) => {
          const included = !!rules.filter(rule => isInclude(rule.toLowerCase(), query.toLowerCase()))[0]
          if (isAll(query) || included) {
            return { type, path, rules }
          }
        })
      )
    }

    setResults(matchedResults.filter(t => t))
  }

  return { results, search }
}
