import isMobile from 'is-mobile'
import { SearchIndexProps } from '../../../types/search'

const props: SearchIndexProps = {
  'hidden': {
    pattern: '^#(.+)',
    callback(value) {
      // console.log(value)

      // From below, it only works if not in a mobile.
      if (isMobile()) return
      
      if (value === 'open-post') {
        if (window) {
          const githubClient = 'x-github-client'
          const path = '/openRepo'
          const blogRepo = 'https://github.com/befoxi-studios/blog.git'
          window.open(`${githubClient}:/${path}/${blogRepo}`)
        }
      }
    },
  },
  '@search': {
    pattern: '^@search-(.+)',
    callback(value, { search }) {
      search(`${value}:`)
    },
  },
  page: {
    pattern: '^\.\.\/\.\.\/routes\/([a-zA-Z0-9_-]+)\.(jsx?|tsx?)',
    callback(value, { location }) {
      if (location) {
        location.route(`/${value}`)
      }
    },
  },
  blog: {
    pattern: '^\.\.\/\.\.\/submodules\/blog\/([a-zA-Z0-9_-]+)\/(.+\.mdx?)',
    callback(value, { location }) {
      if (location) {
        location.route(`/blog/${value}`)
      }
    },
  },
}

export default props
