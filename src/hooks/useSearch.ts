import { useState } from 'preact/hooks'
import { isAll, isInclude, isStartsWith } from '@/utils/is'
import { FILES_OF_BLOG_INDEX, FILES_OF_ROUTES } from '@/utils/files'
import { SearchResult } from '@/submodules/search/set/type'

const queryRoutes = (query: string): (SearchResult | undefined)[] => {
  return Object.keys(FILES_OF_ROUTES).map(path => {
    const regex = /^\.{2}\/(routes)\/(([a-zA-Z0-9_-]+)\.(jsx?|tsx?))$/
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
  return Object.keys(FILES_OF_BLOG_INDEX).map(path => {
    const regex = /^\.{2}\/submodules\/(blog)\/([a-zA-Z0-9_-]+)\/((.+)\.mdx)?$/
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
