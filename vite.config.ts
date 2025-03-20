import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import mdx, { Options as MDXOptions } from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { ViteToml } from 'vite-plugin-toml'

const mdxOptions: MDXOptions = {
  rehypePlugins: [
    rehypeSlug,
    rehypeKatex,
  ],
  remarkPlugins: [
    [remarkFrontmatter, 'yaml'],
    remarkGfm,
    remarkMdx,
  ],
}

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    mdx(mdxOptions),
    ViteToml(),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
})
