import { Component } from 'preact'
import { cn } from '@/utils/cn'
import Header from '@/components/header'
import Blog from '@/components/blog'

export default class BlogRoute extends Component {
  name = 'Blog'
  path = '/blog'

  componentDidMount(): void {
    document.title = `Befoxi Studios Blog`
  }
  render() {
    return (
      <div class={cn`
        grid grid-rows-[60px_1fr] w-full h-svh
        bg-linear-to-b from-transparent to-blue-950/5
        font-noto-sans text-balance overflow-hidden
      `}>
        <Header menu={['logo', 'search']}  />
        <Blog />
      </div>
    )
  }
}
