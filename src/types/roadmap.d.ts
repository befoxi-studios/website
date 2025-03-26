type RoadmapListItem = {
  name: string
  tags?: string[]
}

type RoadmapTableItem = {
  name: string
  baseColor: string
  list?: RoadmapListItem[]
}

export type RoadmapItem = {
  name: string
  icon?: string
  table?: RoadmapTableItem[]
}
