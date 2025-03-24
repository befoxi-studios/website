import { useEffect, useRef, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { AnimatePresence, motion } from 'motion/react'
import { SearchIcon } from 'lucide-preact'
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

const searchIndex = (result: SearchResult | undefined): React.ReactElement => {
  if (!result) return <></>

  const location = useLocation()
  const patterns = Object.values(searchProps).map(t => t.pattern) as string[]
  const key: string | undefined = getNameByPath(result.path, patterns)

  if (key) {
    return (
      <div
        class={cn`
          flex flex-row justify-between px-1.5 py-1 hover:bg-neutral-200/15 rounded-sm
          transition-colors cursor-pointer select-none
        `}
        onClick={() => handleSearchItem(result, key, { location })}
      >
        <div class='flex flex-row items-center gap-2'>
          <div class='flex items-center justify-center px-1 bg-neutral-700/45 text-neutral-400 rounded-sm'>
            <span class='text-xs text-light lowercase'>
              {result.type === 'route' ? 'page' : result.type}
            </span>
          </div>
          <span class='capitalize'>{String(key).replace(/[_-]/, ' ')}</span>
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
        <span class='text-xs'>Type [/] to search</span>
      </button>
    </div>
  )
}

export const SearchWindow = () => {
  const location = useLocation()

  const { isSearchOpen, changeSearchState } = useStore()
  const { results: searchResults, search } = useSearch(searchCustom)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isInput, setIsInput] = useState(false)

  const handleInput = (event: InputEvent) => {
    const input = event.currentTarget as HTMLInputElement
    if (input) {
      search(input.value)
      setIsInput(!!input.value)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key || event.code

    if (key.toLowerCase() === 'escape') {
      changeSearchState(false)
    }
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
          <div class='m-8 min-w-md h-auto bg-black border border-neutral-200/15 rounded-md z-1'>
            <div class='flex flex-row items-center gap-2 px-2 py-1 m-1 text-neutral-50/45'>
              <SearchIcon width={20} height={20} strokeWidth={0.75} />
              <input
                ref={inputRef}
                class='w-full bg-transparent outline-0 text-sm font-light'
                placeholder='Search'
                onInput={handleInput}
              />
            </div>
            {!!searchResults.length && (<>
              <hr class='border-neutral-200/15' />
              {!isInput && (
                <div class='flex flex-col px-1.5 pt-2.5 mx-1 text-neutral-400 text-xs transition-colors select-none'>
                  <span>Suggestions</span>
                </div>
              )}
              <div class='flex flex-col m-1 text-sm'>
                {searchResults.map(searchIndex)}
              </div>
            </>)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
