import { SearchIndexProps } from '../../types/search'

export const props: SearchIndexProps = {
  route: {
    pattern: '^\.\.\/\.\.\/routes\/([a-zA-Z0-9_-]+)\.(jsx?|tsx?)',
    callback(value, { location }) {
      if (location) {
        location.route(`/blog/${value}`)
      }
    },
    aliases: ['page'],
  },
  blog: {
    pattern: '^\.\.\/\.\.\/submodules\/blog\/([a-zA-Z0-9_-]+)\/(.+\.mdx?)',
    callback(value, { location }) {
      if (location) {
        location.route(`/blog/${value}`)
      }
    },
  },
  test: {
    pattern: '^test\-(.+)$',
    // @ts-ignore
    callback(value, params) {
      if (value === 'maze' && window) {
        const newTab = window.open('https://pranx.com/maze/', '_blank')
        if (newTab) {
          newTab.focus()
        }
      }
    },
  },
}
