import { Component } from 'preact'
import Blog from '../templates/blog'

export default class Home extends Component {
  componentDidMount(): void {
    document.title = 'Blog - Befoxi Studios'
  }
  render() {
    return (<Blog />)
  }
}
