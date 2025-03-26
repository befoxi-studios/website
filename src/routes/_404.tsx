import { Component } from 'preact'
import Error from '../templates/error'
import Loading from '../components/Loading'

export default class NotFound extends Component {
  componentDidMount(): void {
    document.title = '404 - Befoxi Studios'
  }
  render() {
    return (<>
      <Loading from='bottom' />
      <Error />
    </>)
  }
}
