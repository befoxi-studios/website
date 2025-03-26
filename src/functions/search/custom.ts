import { SearchResult } from '../../types/search'

export const custom: SearchResult[] = [
  {
    type: 'hidden',
    name: '#open-post',
    rules: ['open-post', 'openpost'],
  },
  {
    type: '@search',
    name: '@search-page',
    rules: ['@page', '@search:page', '@route', '@search:route'],
  },
  {
    type: '@search',
    name: '@search-blog',
    rules: ['@blog', '@search:blog'],
  },
]
