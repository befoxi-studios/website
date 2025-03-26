import { SearchResult } from '../../../types/search'

const configFiles = import.meta.glob(`../!(\.*)*.{yml,yaml}`, { eager: true })
const customResults = Object.entries(configFiles).map(t => {
  // @ts-ignore
  return t[1].default
})

const custom: SearchResult[] = customResults
export default custom
