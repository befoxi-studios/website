import { Component } from 'preact'

export default class AboutUsRoute extends Component {
  name = 'About us'
  path = '/blog/about-us'

  componentDidMount(): void {
    document.title = 'Befoxi Studios'
  }
  render() {
    return (<></>)
  }
}
