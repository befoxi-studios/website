import type { RoadmapListItem, RoadmapTableItem } from '@/submodules/roadmap/set/type'

export interface RoadmapListProps {
  tableBaseColor: string
  listItem: RoadmapListItem
}

export interface RoadmapTabProps {
  tabIndex: number
  tabName: string
  currentTabName: string
  tabIconSrc?: string
  tabChanged: (newTab: string) => any
}

export interface RoadmapTableProps {
  tableIndex: number
  tableItem: RoadmapTableItem
}

export interface RoadmapTagProps {
  tableBaseColor: string
  tagName: string
}
