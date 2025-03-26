import { Component } from 'preact'
import Error from '../routes/_404'

export default class Contact extends Component {
  componentDidMount(): void {
    document.title = 'About us - Befoxi Studios'
  }
  render() {
    return (<Error />)
  }
}
