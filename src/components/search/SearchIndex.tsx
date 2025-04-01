import { useLocation } from 'preact-iso'
import { cn } from '@/utils/cn'
import getNameByPath from '@/utils/get-name-by-path'
import searchProps from '@/submodules/search/set/props'
import type { SearchResult } from '@/submodules/search/set/type'

type anyParams = { [key: string]: any }

const handleSearchItem = (result: SearchResult, key: string, params: anyParams) => {
  const prop = searchProps[result.type]
  if (prop) {
    prop.effect(key, params)
  }
}

const SearchIndex = (result: SearchResult | undefined, clientProvide: anyParams): React.ReactElement => {
  if (!result) return <></>

  const id = result.path || result.name
  if (!id) return <></>

  const location = useLocation()
  const userProvide: anyParams = { location, ...clientProvide }
  const props = Object.values(searchProps)
  const patterns = props.map(t => t.pattern) as string[]
  const key: string | undefined = getNameByPath(id, patterns)

  const isHidden = result.rules.filter(t => String(userProvide.value) === t)[0] || result.type !== 'hidden'

  if (key && isHidden) {
    return (
      <div
        class={cn`
          flex flex-row justify-between px-1.5 py-1
          hover:bg-neutral-200/15 focus-within:bg-neutral-200/8 outline-0 rounded-sm
          transition-colors cursor-pointer select-none
        `}
        tabIndex={0}
        onClick={() => handleSearchItem(result, key, userProvide)}
      >
        <div class='flex flex-row items-start gap-2'>
          <div class={cn`
            flex items-center justify-center px-1 py-0.5 my-auto mt-0.6
            bg-neutral-700/45 text-neutral-400 rounded-sm
          `}>
            <span class='text-base sm:text-xs text-light lowercase'>
              {result.type.startsWith('@') ? '@' : result.type}
              <i class='hidden'>:</i>
            </span>
          </div>
          <span
            class='text-base sm:text-sm'
            style={result.type.startsWith('@') ? {
              color: 'var(--color-neutral-400)',
            } : {
              textTransform: 'capitalize',
            }}
          >{String(key).replace(/[_-]/, ' ')}</span>
        </div>
      </div>
    )
  }
  
  return <></>
}

export default SearchIndex
