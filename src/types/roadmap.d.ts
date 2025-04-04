import type { RoadmapListItem, RoadmapTableItem } from '@mod/roadmap/src/type'

export interface RoadmapListProps {
  tableBaseColor: string
  listItem: RoadmapListItem
}

export interface RoadmapTabProps {
  tabIndex: number
  tabId: string
  currentTabId: string
  tabName: string
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
