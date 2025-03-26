import { useEffect, useState } from 'preact/hooks'
import { cn } from '../utils/cn'
import type { RoadmapItem } from '../submodules/functions/roadmap/set/type'
import roadmapItems from '../submodules/functions/roadmap/set/items'

const Roadmap = () => {
  const [tab, setTab] = useState<string>(roadmapItems.find(t => t)?.name!)
  const [currentItem, setItem] = useState<RoadmapItem>()
  
  useEffect(() => {
    if (roadmapItems) {
      setItem(roadmapItems.find(t => t.name === tab))
    }
  }, [tab, roadmapItems])

  return (
    <div class={cn`
      m-4 mt-0 h-[calc(100svh-60px-(var(--spacing)*4))]
      bg-neutral-700/5 border border-neutral-500/15 rounded-md
    `}>
      <div class='flex flex-col h-full select-none'>
        {roadmapItems.length > 0 ? (<>
          <div class='flex flex-col min-[32rem]:flex-row items-start border-b border-b-neutral-500/15'>
            {roadmapItems.map(({ name, icon }, index) => (
              <button
                key={index}
                class={cn`
                  flex items-center p-1 m-1 not-last:mr-0 bg-neutral-200/20
                  rounded-sm outline-0 cursor-pointer transition-colors duration-75
                `}
                style={tab === name ? {
                  backgroundColor: 'color-mix(in oklab, var(--color-neutral-200) 10%, transparent)',
                  opacity: 1,
                  pointerEvents: 'none',
                } : {
                  backgroundColor: 'transparent',
                  opacity: 0.75,
                  pointerEvents: 'auto',
                }}
                onClick={() => setTab(name)}
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
          <div class='flex flex-row justify-between max-w-[calc(100dvw-(var(--spacing)*4*2))] h-full'>
            {currentItem && currentItem.table && (<>
              <div class='flex flex-row m-2.5 gap-2 overflow-x-auto overflow-y-hidden'>
                {currentItem.table.map((table, index) => (
                  <div
                    key={index}
                    class='relative p-2 min-w-64 h-fit border border-neutral-950 rounded-sm overflow-hidden'
                  >
                    <div
                      class='absolute inset-0 opacity-7'
                      style={{ backgroundColor: table.baseColor }}
                    ></div>
                    <div class='relative px-2 w-fit bg-neutral-950 rounded-sm overflow-hidden'>
                      <span
                        class='text-sm brightness-125'
                        style={{ color: table.baseColor }}
                      >
                        {table.name}
                      </span>
                    </div>
                    {table.list && (
                      <div class='flex flex-col gap-2 mt-2'>
                        {table.list.map(list => (
                          <button
                            class='group/rm-item relative rounded-sm overflow-hidden cursor-pointer'
                            onClick={() => console.log(`openBoard(${list.name.toLowerCase().replace(/\s/g, '-')})`)}
                          >
                            <div
                              class='absolute inset-0 opacity-15 group-hover/rm-item:opacity-25 transition-opacity'
                              style={{ backgroundColor: table.baseColor }}
                            ></div>
                            <div class='flex flex-col items-start gap-1 px-4 py-2'>
                              <span>{list.name}</span>
                              {list.tags && (
                                <div class='flex flex-row gap-2'>
                                  {list.tags.map(tag => (
                                    <div class='relative px-1'>
                                      <div
                                        class='absolute inset-0 rounded-sm opacity-35'
                                        style={{ backgroundColor: table.baseColor }}
                                      ></div>
                                      <span class='text-xs'>{tag}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div></div>
            </>)}
          </div>
        </>) : (
          <div class='flex items-center justify-center h-full'>
            <span class='text-mono font-light opacity-65'>Sorry, There is no roadmap yet.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Roadmap
