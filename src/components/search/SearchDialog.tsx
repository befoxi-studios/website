import { useEffect, useRef, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { SearchIcon } from 'lucide-preact'
import { useGlobal } from '@/hooks/useGlobal'
import { useSearch } from '@/hooks/useSearch'
import getNameByPath from '@/utils/get-name-by-path'
import Dialog, { DialogHeader } from '@/components/ui/Dialog'
import SearchIndex from '@/components/search/SearchIndex'
import searchCustom from '@/submodules/search/set/custom'
import searchProps from '@/submodules/search/set/props'
import type { SearchResult } from '@/submodules/search/set/type'

const SearchDialog = () => {
  const location = useLocation()
  const { isSearchOpen, changeSearchState } = useGlobal()
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
    return SearchIndex(res, {
      value: inputRef.current?.value,
      search: (value: string) => {
        if (inputRef.current) {
          setVariableInputValue(value)
        }
      },
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
    <Dialog open={isSearchOpen} stateChanged={changeSearchState}>
      {!!searchResults.length && (<>
        <div
          class='flex flex-col p-1 h-full max-h-none sm:max-h-[16em] text-sm overflow-auto'
          tabIndex={-1}
        >
          {searchResults.sort(sortSearchResult).map(indexingSearchResults)}
        </div>
      </>)}
      <DialogHeader>
        <SearchIcon width={20} height={20} strokeWidth={0.75} />
        <input
          ref={inputRef}
          class='w-full bg-transparent text-neutral-50 outline-0 text-sm font-normal'
          placeholder='Search'
          onInput={handleInput}
        />
      </DialogHeader>
    </Dialog>
  )
}

export default SearchDialog