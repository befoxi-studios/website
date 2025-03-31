import { Component } from 'preact'
import Blog from '@/templates/blog'

export default class Home extends Component {
  componentDidMount(): void {
    document.title = 'Befoxi Studios Blog'
  }
  render() {
    return (<Blog />)
  }
}
