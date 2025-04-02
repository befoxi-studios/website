import { Component } from 'preact'
import { cn } from '@/utils/cn'
import Loading from '@/components/ui/Loading'
import Header from '@/components/header'
import Roadmap from '@/components/roadmap'

export default class RoadmapRoute extends Component {
  name = 'Roadmap'
  path = '/roadmap'

  componentDidMount(): void {
    document.title = 'Roadmap - Befoxi Studios'
  }
  render() {
    return (
      <div class={cn`
        grid grid-rows-[60px_1fr] w-full h-svh
        bg-linear-to-b from-transparent to-violet-950/5
        font-noto-sans text-balance overflow-hidden touch-none
      `}>
        <Loading from='top' />
        <Header menu={['logo', 'search']} />
        <Roadmap />
      </div>
    )
  }
}
