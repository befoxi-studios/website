import RoadmapList from '@/components/roadmap/RoadmapList'
import type { RoadmapTableProps } from '@/types/roadmap'

const RoadmapTable = ({ tableIndex, tableItem }: RoadmapTableProps) => {
  return (
    <div
      key={tableIndex}
      class='relative p-2 min-w-64 h-fit border border-neutral-950 rounded-sm overflow-hidden'
    >
      <div
        class='absolute inset-0 opacity-7'
        style={{ backgroundColor: tableItem.baseColor }}
      ></div>
      <div class='relative px-2 w-fit bg-neutral-950 rounded-sm overflow-hidden'>
        <span
          class='text-sm brightness-125'
          style={{ color: tableItem.baseColor }}
        >
          {tableItem.name}
        </span>
      </div>
      {tableItem.list && (
        <div class='flex flex-col gap-2 mt-2'>
          {tableItem.list.map(list => (
            <RoadmapList
              listItem={list}
              tableBaseColor={tableItem.baseColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RoadmapTable
