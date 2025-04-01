import type { RoadmapTagProps } from '@/types/roadmap'

const RoadmapTag = ({ tableBaseColor, tagName }: RoadmapTagProps) => {
  return (
    <div class='relative flex items-center px-1'>
      <div
        class='absolute inset-0 rounded-sm opacity-35'
        style={{ backgroundColor: tableBaseColor }}
      ></div>
      <span class='py-0.5 text-xs'>{tagName}</span>
    </div>
  )
}

export default RoadmapTag
