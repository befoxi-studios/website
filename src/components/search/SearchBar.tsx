import { useEffect } from 'preact/hooks'
import { SearchIcon } from 'lucide-preact'
import { useGlobal } from '@/hooks/useGlobal'
import { cn } from '@/utils/cn'

const SearchBar = () => {
  const { isSearchOpen, changeSearchState } = useGlobal()

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

export default SearchBar
