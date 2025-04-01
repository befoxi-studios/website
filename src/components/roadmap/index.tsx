import { useEffect, useState } from 'preact/hooks'
import { ReceiptTextIcon } from 'lucide-preact'
import { cn } from '@/utils/cn'
import RoadmapTab from '@/components/roadmap/RoadmapTab'
import RoadmapTable from '@/components/roadmap/RoadmapTable'
import RoadmapContent from '@/components/roadmap/RoadmapContent'
import roadmapItems from '@/submodules/roadmap/set/items'
import type { RoadmapItem } from '@/submodules/roadmap/set/type'

const Roadmap = () => {
  const [items] = useState(roadmapItems.filter(t => t))
  const [currentTab, setCurrentTab] = useState<string>(roadmapItems.find(t => t)?.name!)
  const [currentItem, setCurrentItem] = useState<RoadmapItem>()
  
  const changeTab = (newTab: string) => {
    setCurrentTab('')
    setTimeout(() => setCurrentTab(newTab), 75)
  }

  useEffect(() => {
    if (items) {
      setCurrentItem(items.find(t => t.name === currentTab))
    }
  }, [currentTab, items])

  return (
    <div class={cn`
      m-4 mt-0 h-[calc(100svh-60px-(var(--spacing)*4))]
      bg-neutral-700/5 border border-neutral-500/15 rounded-md
    `}>
      <div class='flex flex-col h-full select-none'>
        {items.length > 0 ? (<>
          <div class='flex flex-col min-[32rem]:flex-row items-start border-b border-b-neutral-500/15'>
            {items.filter(t => t).map(({ name, icon }, index) => (
              <RoadmapTab
                tabIndex={index}
                tabName={name}
                currentTabName={currentTab}
                tabIconSrc={icon}
                tabChanged={changeTab}
              />
            ))}
          </div>
          <div class={cn`
            flex flex-row justify-between
            max-w-[calc(100dvw-(var(--spacing)*4*2))] h-full overflow-auto
          `}>
            {currentItem && currentItem.table && (<>
              <div class='flex flex-row m-2.5 gap-2'>
                {currentItem.table.map((table, index) => (
                  <RoadmapTable
                    tableIndex={index}
                    tableItem={table}
                  />
                ))}
              </div>
              <RoadmapContent />
            </>)}
          </div>
        </>) : (
          <div class='flex items-center justify-center h-full'>
            <span class='text-mono font-light animate-pulse'>
              <ReceiptTextIcon class='opacity-50' />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Roadmap
