import { useEffect, useState } from 'preact/hooks'
import { v5 as uuidv5 } from 'uuid'
import { cn } from '@/utils/cn'
import RoadmapTab from '@/components/roadmap/RoadmapTab'
import RoadmapTable from '@/components/roadmap/RoadmapTable'
import RoadmapContent from '@/components/roadmap/RoadmapContent'
import roadmapItems from '@/submodules/roadmap/src/items'
import type { RoadmapItem } from '@/submodules/roadmap/src/type'

const Roadmap = () => {
  const [rawItems] = useState(roadmapItems.filter(t => t))
  const [currentTab, setCurrentTab] = useState<string>()
  const [currentItem, setCurrentItem] = useState<RoadmapItem>()
  
  const changeTab = (newTab: string) => {
    setCurrentTab('')
    setTimeout(() => setCurrentTab(newTab), 125)
  }

  useEffect(() => {
    if (rawItems.length) {
      const id = uuidv5(roadmapItems[0].filename, uuidv5.URL)
      setCurrentTab(id)
    }
  }, [rawItems])

  useEffect(() => {
    if (rawItems) {
      const item = rawItems.find(t => uuidv5(t.filename, uuidv5.URL) === currentTab)?.data
      setCurrentItem(item)
    }
  }, [currentTab, rawItems])

  if (rawItems.length) {
    return (
      <div class={cn`
        m-4 mt-0 h-[calc(100svh-60px-(var(--spacing)*4))]
        bg-neutral-700/5 border border-neutral-500/15 rounded-md
      `}>
        <div class='flex flex-col h-full select-none'>
          <div class='flex flex-col min-[32rem]:flex-row items-start border-b border-b-neutral-500/15'>
            {rawItems.filter(t => t).map(({ filename, data: { name, icon }}, index) => (
              <RoadmapTab
                tabIndex={index}
                tabId={uuidv5(filename, uuidv5.URL)}
                currentTabId={currentTab!}
                tabName={name}
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
        </div>
      </div>
    )
  }
}

export default Roadmap
