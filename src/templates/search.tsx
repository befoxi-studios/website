import { useEffect, useRef, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { AnimatePresence, motion } from 'motion/react'
import { SearchIcon, XIcon } from 'lucide-preact'
import { cn } from '../utils/cn'
import { useStore } from '../utils/hooks/global-hook'
import { useSearch } from '../utils/hooks/search-hook'
import getNameByPath from '../utils/get-name-by-path'
import type { SearchResult } from '../types/search'
import { custom as searchCustom, props as searchProps } from './search/index'

const handleSearchItem = (result: SearchResult, key: string, params: { [key: string]: any }) => {
  const prop = searchProps[result.type]
  if (prop) {
    prop.callback(key, params)
  }
}

const searchIndex = (result: SearchResult | undefined, clientProvide: { [key: string]: any }): React.ReactElement => {
  if (!result) return <></>

  const id = result.path || result.name
  if (!id) return <></>

  const location = useLocation()
  const props = Object.values(searchProps)
  const patterns = props.map(t => t.pattern) as string[]
  const key: string | undefined = getNameByPath(id, patterns)
  const userProvide = { location, ...clientProvide }

  if (key) {
    return (
      <div
        class={cn`
          flex flex-row justify-between px-1.5 py-1 hover:bg-neutral-200/15 rounded-sm
          transition-colors cursor-pointer select-none
        `}
        onClick={() => handleSearchItem(result, key, userProvide)}
      >
        <div class='flex flex-row items-center gap-2'>
          <div class='flex items-center justify-center px-1 bg-neutral-700/45 text-neutral-400 rounded-sm'>
            <span class='text-base sm:text-xs text-light lowercase'>
              {result.type.startsWith('@') ? '@' : result.type}
              <i class='hidden'>:</i>
            </span>
          </div>
          <span
            class='text-xl sm:base'
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

export const SearchBar = () => {
  const { isSearchOpen, changeSearchState } = useStore()

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key || event.code

    if (key.toLowerCase() === '/') {
      changeSearchState(true)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isSearchOpen])
  
  return (
    <div
      class={cn`
        relative bg-neutral-50/5 text-neutral-50/45 hover:text-neutral-50/70
        border border-neutral-50/3 rounded-md transition-all duration-425
      `}
      style={{
        opacity: isSearchOpen ? 0.6 : 1
      }}
    >
      <button
        class={cn`
          flex flex-row items-center justify-center gap-1 px-2 py-1 w-full
          select-none cursor-pointer transition-all duration-150
        `}
        onClick={() => changeSearchState(true)}
      >
        <SearchIcon width={16} height={16} />
        <span class='text-xs truncate'>Type [/] to search</span>
      </button>
    </div>
  )
}

export const SearchWindow = () => {
  const location = useLocation()
  const { isSearchOpen, changeSearchState } = useStore()
  const { results: searchResults, search } = useSearch(searchCustom)
  const [variableInputValue, setVariableInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInput = (event: InputEvent) => {
    const input = event.currentTarget as HTMLInputElement
    if (input) {
      search(input.value)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key || event.code

    if (key.toLowerCase() === 'escape') {
      changeSearchState(false)
    }
  }

  const sortSearchResult = (a: SearchResult | undefined, b: SearchResult | undefined) => {
    if (a && b) {
      if (a.type === undefined) return 1
      if (b.type === undefined) return -1

      const aIsAt = a.type.startsWith('@')
      const bIsAt = b.type.startsWith('@')

      if (aIsAt && !bIsAt) return -1
      if (!aIsAt && bIsAt) return 1

      const typeCompare = a.type.localeCompare(b.type)
      if (typeCompare !== 0) return typeCompare

      if ((a.path || a.name) && (b.path || b.name)) {
        const props = Object.values(searchProps)
        const patterns = props.map(t => t.pattern) as string[]
        
        const aKey = getNameByPath(a.path || a.name || '', patterns)
        const bKey = getNameByPath(b.path || b.name || '', patterns)
        if (aKey && bKey) {
          return aKey.localeCompare(bKey)
        }
      }

      return a.type.localeCompare(b.type)
    }

    return 0
  }

  const indexingSearchResults = (res: SearchResult | undefined) => {
    return searchIndex(res, {
      search: (value: string) => {
        if (inputRef.current) {
          setVariableInputValue(value)
        }
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isSearchOpen])

  useEffect(() => {
    search('')
  }, [isSearchOpen])

  useEffect(() => {
    if (isSearchOpen) {
      changeSearchState(false)
    }
  }, [location])

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen, inputRef.current])

  useEffect(() => {
    const input = inputRef.current
    if (input) {
      input.value = variableInputValue // only the contents of the search input change
      search(variableInputValue)
    }
  }, [variableInputValue])

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          class='absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-xs z-150'
        >
          <div
            class='absolute inset-0'
            onClick={() => changeSearchState(false)}
          ></div>
          <div class={cn`
            flex flex-col-reverse sm:flex-col m-0 sm:m-8 w-full max-w-full sm:max-w-md h-dvh sm:h-auto bg-black
            border border-transparent sm:border-neutral-200/15 rounded-none sm:rounded-md z-1 transition-opacity
          `}>
            <div class='flex flex-row'>
              <div class='flex flex-row items-center gap-2 px-2 py-1 m-1 w-full text-neutral-50/45'>
                <SearchIcon width={20} height={20} strokeWidth={0.75} />
                <input
                  ref={inputRef}
                  class='w-full bg-transparent text-neutral-50 outline-0 text-sm font-normal'
                  placeholder='Search'
                  onInput={handleInput}
                />
              </div>
              <button
                class={cn`
                  group/search-close relative flex items-center justify-center px-2
                  border-l border-l-neutral-200/15 cursor-pointer
                `}
                onClick={() => changeSearchState(false)}
              >
                <div class='absolute inset-0 m-1 group-hover/search-close:bg-neutral-200/8 rounded-sm pointer-events-none'></div>
                <XIcon width={21} height={21} strokeWidth={0.75} />
              </button>
            </div>
            {!!searchResults.length && (<>
              <hr class='border-neutral-200/15' />
              <div class='flex flex-col p-1 h-full max-h-none sm:max-h-[16em] text-sm overflow-auto' tabIndex={-1}>
                {searchResults.sort(sortSearchResult).map(indexingSearchResults)}
              </div>
            </>)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
