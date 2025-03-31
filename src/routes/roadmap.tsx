import { Component } from 'preact'
import Loading from '@/components/Loading'
import Header from '@/templates/header'
import Roadmap from '@/templates/roadmap'

export default class Contact extends Component {
  componentDidMount(): void {
    document.title = 'Roadmap - Befoxi Studios'
  }
  render() {
    return (
      <div class='grid grid-rows-[60px_1fr] w-full h-svh font-noto-sans overflow-hidden touch-none'>
        <Loading from='top' />
        <Header menu={['logo', 'search']} />
        <Roadmap />
      </div>
    )
  }
}
