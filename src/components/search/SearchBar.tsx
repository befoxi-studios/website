import { HTMLAttributes } from 'preact/compat'
import { useEffect } from 'preact/hooks'
import { SearchIcon } from 'lucide-preact'
import { useGlobal } from '@/hooks/useGlobal'
import { cn } from '@/utils/cn'
import { useI18n } from '@/hooks/useI18n'

const SearchBar = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { isSearchOpen, changeSearchState } = useGlobal()
  const { t } = useI18n()

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
        relative w-64 bg-neutral-900/95 text-neutral-50/45 hover:text-neutral-50/70
        border border-neutral-50/3 rounded-md transition-all duration-425
        ${className}
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
        <span class='text-xs truncate'>
          {t('header.search.placeholder', 'Type [/] to search')}
        </span>
      </button>
    </div>
  )
}

export default SearchBar
