const configFiles = import.meta.glob(`../*.{yml,yaml}`, { eager: true })
const customItems = Object.entries(configFiles).map(t => {
  // @ts-ignore
  return t[1].default
})

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
  id: number
  name: string
  icon?: string
  table?: RoadmapTableItem[]
}

const items: RoadmapItem[] = [
  {
    id: 0,
    name: 'Befoxi Studios',
    icon: 'https://dummyimage.com/64x64/404040/404040.png',
    table: [
      {
        name: 'Planning',
        baseColor: '#ff2160',
        list: [
          {
            name: '#0',
            tags: [],
          }
        ]
      },
    ],
  },
  {
    id: 1,
    name: 'Projext VI',
    table: [
      {
        name: 'Planning',
        baseColor: '#ff2160',
      },
    ],
  },
  {
    id: 2,
    name: 'etc.',
  },
]

export default items
