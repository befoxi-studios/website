import { Component } from 'preact'
import Loading from '@/components/ui/Loading'
import Header from '@/components/header'
import Roadmap from '@/components/roadmap'
import { cn } from '@/utils/cn'

export default class Contact extends Component {
  componentDidMount(): void {
    document.title = 'Roadmap - Befoxi Studios'
  }
  render() {
    return (
      <div class={cn`
        grid grid-rows-[60px_1fr] w-full h-svh
        bg-linear-to-b from-transparent to-violet-950/5 font-noto-sans overflow-hidden touch-none
      `}>
        <Loading from='top' />
        <Header menu={['logo', 'search']} />
        <Roadmap />
      </div>
    )
  }
}
