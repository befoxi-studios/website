import { cn } from '@/utils/cn'
import type { RoadmapTabProps } from '@/types/roadmap'

const RoadmapTab = ({ tabIndex, tabId, currentTabId, tabName, tabIconSrc, tabChanged }: RoadmapTabProps) => {
  return (
    <button
      key={tabIndex}
      class={cn`
        flex items-center p-1 m-1 not-last:mr-0 bg-neutral-200/20
        rounded-sm outline-0 cursor-pointer transition-colors duration-75
      `}
      style={tabId === currentTabId ? {
        backgroundColor: 'color-mix(in oklab, var(--color-neutral-200) 10%, transparent)',
        opacity: 1,
        pointerEvents: 'none',
      } : {
        backgroundColor: 'transparent',
        opacity: 0.75,
        pointerEvents: 'auto',
      }}
      onClick={() => tabChanged(tabId)}
    >
      {tabIconSrc && (
        <img
          src={tabIconSrc}
          width={21}
          height={21}
          class='m-0.5 w-[21px] h-[21px] rounded-xs aspect-square'
        />
      )}
      <span class='px-1'>{tabName}</span>
    </button>
  )
}

export default RoadmapTab
