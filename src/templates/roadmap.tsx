import { useState } from 'preact/hooks'
import { cn } from '../utils/cn'
import roadmapItems from '../functions/roadmap/set/items'

const Roadmap = () => {
  const [tabId, setTabId] = useState<number>(0)

  return (
    <div class={cn`
      m-4 mt-0 h-[calc(100svh-60px-(var(--spacing)*4))]
      bg-neutral-700/5 border border-neutral-500/15 rounded-md
    `}>
      <div class='flex flex-col h-full'>
        {/* tab */}
        <div class='flex flex-col min-[32rem]:flex-row items-start border-b border-b-neutral-500/15'>
          {roadmapItems.map(({ id, name, icon }, index) => (
            <button
              key={index}
              class={cn`
                flex items-center p-1 m-1 not-last:mr-0 bg-neutral-200/20
                rounded-sm outline-0 cursor-pointer transition-colors duration-75
              `}
              style={tabId === id ? {
                backgroundColor: 'color-mix(in oklab, var(--color-neutral-200) 10%, transparent)',
                opacity: 1,
                pointerEvents: 'none',
              } : {
                backgroundColor: 'transparent',
                opacity: 0.75,
                pointerEvents: 'auto',
              }}
              onClick={() => setTabId(id)}
            >
              {icon && (
                <img
                  src={icon}
                  width={21}
                  height={21}
                  class='m-0.5 w-[21px] h-[21px] rounded-xs aspect-square'
                />
              )}
              <span class='px-1'>{name}</span>
            </button>
          ))}
        </div>
        <div class='flex flex-col overflow-x-auto overflow-y-hidden'>

        </div>
      </div>
    </div>
  )
}

export default Roadmap
