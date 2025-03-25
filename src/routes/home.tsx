import { Component } from 'preact'
import { useState } from 'preact/hooks'
import Header from '../templates/header'
import Loading from '../components/Loading'
import Main from '../templates/home'
import Background from '../templates/background'

export default class Home extends Component {
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
