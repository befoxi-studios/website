import { RoadmapItem } from '../../../types/roadmap'

const configFiles = import.meta.glob(`../!(\.*)*.{yml,yaml}`, { eager: true })
const customItems = Object.entries(configFiles).map(t => {
  // @ts-ignore
  return t[1].default
})

const items: RoadmapItem[] = customItems

export default items
