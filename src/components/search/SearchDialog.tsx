import { useEffect, useRef, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { SearchIcon } from 'lucide-preact'
import { useI18n } from '@/hooks/useI18n'
import { useGlobal } from '@/hooks/useGlobal'
import { bus } from '@/utils/event-bus'
import Dialog, { DialogHeader } from '@/components/ui/Dialog'
import SearchIndex from '@/components/search/SearchIndex'
import { useSearch } from '@mod/search/src/useSearch'
import type { SearchModule } from '@mod/search/src/type'

const sortSearchResult = (a: SearchModule | undefined, b: SearchModule | undefined) => {
  if (a && b) {
    const aIsAt = a.call.startsWith('@')
    const bIsAt = b.call.startsWith('@')

    if (aIsAt && !bIsAt) return -1
    if (!aIsAt && bIsAt) return 1

    const typeCompare = a.call.localeCompare(b.call)
    if (typeCompare !== 0) return typeCompare
    return a.name.localeCompare(b.name)
  }

  return 0
}

const SearchDialog = () => {
  const location = useLocation()
  const { t } = useI18n()
  const { isSearchOpen, changeSearchState } = useGlobal()
  const { results: searchResults, search } = useSearch()
  const [variableInputValue, setVariableInputValue] = useState<string | undefined>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInput = (event: InputEvent) => {
    const input = event.currentTarget as HTMLInputElement
    if (input) {
      search(input.value)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const key = (event.key || event.code).toLowerCase()

    if (key === '/') {
      const input = inputRef.current

      if (input && input !== document.activeElement) {
        event.preventDefault()
        input.focus()
      }
    }
    if (key === 'enter') {
      const currentElem = document.activeElement as HTMLElement
      if (currentElem.click) {
        currentElem.click()
      }
    }
    if (key === 'escape') {
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

  useEffect(() => {
    const input = inputRef.current
    if (input && variableInputValue) {
      input.value = variableInputValue // only the contents of the search input change
      search(variableInputValue)
      setTimeout(() => setVariableInputValue(undefined), 1)
    }
  }, [variableInputValue])

  useEffect(() => {
    const searchEvent = bus.onChannel('search', setVariableInputValue)
    return () => {
      searchEvent()
    }
  }, [])

  return (
    <Dialog open={isSearchOpen} stateChanged={changeSearchState}>
      {!!searchResults.length && (<>
        <div
          class='flex flex-col gap-0.5 p-1 h-full max-h-none sm:max-h-[16em] text-sm overflow-auto'
        >
          {searchResults.sort(sortSearchResult).map(SearchIndex)}
        </div>
      </>)}
      <DialogHeader>
        <SearchIcon width={20} height={20} strokeWidth={0.75} />
        <input
          ref={inputRef}
          class='w-full bg-transparent text-neutral-50 outline-0 text-sm font-normal'
          placeholder={t('header.search', 'Search')}
          onInput={handleInput}
        />
      </DialogHeader>
    </Dialog>
  )
}

export default SearchDialog