import { Component } from 'preact'
import Post from '../components/Post'
import { useLocation, type LocationHook } from 'preact-iso'

export default class Home extends Component {
  private location: LocationHook | undefined

  render() {
    this.location = useLocation()

    return (
      <Post uri={this.location.path} />
    )
  }
}
