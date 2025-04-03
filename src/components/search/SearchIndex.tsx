import { useI18n } from '@/hooks/useI18n'
import { cn } from '@/utils/cn'
import { bus } from '@/utils/event-bus'
import type { SearchModule } from '@mod/search/src/type'

const handleSearchItem = (result: SearchModule, key: string) => {
  result.effect(key, { emit: bus.emit })
}

const SearchIndex = (result: SearchModule | undefined): React.ReactElement => {
  const { t } = useI18n()

  if (!result || !result.name) return (<></>)
  else if (result.name && !result.hidden) {
    return (
      <div
        class={cn`
          flex flex-row justify-between px-1.5 py-1
          hover:bg-neutral-200/15 focus-within:bg-neutral-200/8 outline-0 rounded-sm
          transition-colors cursor-pointer select-none
        `}
        tabIndex={0}
        onClick={() => handleSearchItem(result, result.name)}
      >
        <div class='flex flex-row items-start gap-2'>
          <div class={cn`
            flex items-center justify-center px-1 py-0.5 my-auto mt-0.6
            bg-neutral-700/45 text-neutral-400 rounded-sm
          `}>
            <span class='text-base sm:text-xs text-light lowercase'>
              {result.call.replace(/:$/, '')}
              <i class='hidden'>:</i>
            </span>
          </div>
          <span
            class='text-base sm:text-sm'
            style={result.call.startsWith('@') ? {
              color: 'var(--color-neutral-400)',
            } : {
              textTransform: 'capitalize',
            }}
          >{t(result.name, String(result.name).replace(/[_-]/, ' '))}</span>
        </div>
      </div>
    )
  }
  return (<></>)
}

export default SearchIndex
