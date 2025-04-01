import RoadmapTag from '@/components/roadmap/RoadmapTag'
import type { RoadmapListProps } from '@/types/roadmap'

const RoadmapList = ({ tableBaseColor, listItem }: RoadmapListProps) => {
  return (
    <button
      class='group/rm-item relative rounded-sm overflow-hidden cursor-pointer'
      onClick={() => {
        /** The Roadmap template is not completed yet,
          so can't display the content. */
      }}
    >
      <div
        class='absolute inset-0 opacity-15 group-hover/rm-item:opacity-25 transition-opacity'
        style={{ backgroundColor: tableBaseColor }}
      ></div>
      <div class='flex flex-col items-start gap-1 px-4 py-2'>
        <span>{listItem.name}</span>
        {listItem.tags && (
          <div class='flex flex-row gap-2'>
            {listItem.tags.map(tag => (
              <RoadmapTag
                tableBaseColor={tableBaseColor}
                tagName={tag}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

export default RoadmapList
