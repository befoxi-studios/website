import { SearchIndexProps } from '../../types/search'

export const props: SearchIndexProps = {
  '@search': {
    pattern: '^@search\-(.+)',
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
