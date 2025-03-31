import { Component } from 'preact'
import { useState } from 'preact/hooks'
import Loading from '@/components/Loading'
import Background from '@/templates/background'
import Header from '@/templates/header'
import Main from '@/templates/home'

export default class Home extends Component {
  componentDidMount(): void {
    document.title = 'Befoxi Studios'
  }
  render() {
    const [scrollProgress, setScrollProgress] = useState(0)

    return (
      <div class='grid grid-rows-[60px_1fr_60px] w-full h-svh font-noto-sans overflow-hidden touch-none'>
        <Loading from='top' />
        <Background scrollProgress={scrollProgress} />
        <Header menu={['logo', 'search', 'items']} />
        <Main scrolling={setScrollProgress} />
      </div>
    )
  }
}
