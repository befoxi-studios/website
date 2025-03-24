import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteToml } from 'vite-plugin-toml'
import mdx, { Options as MDXOptions } from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import vpc from 'vite-plugin-cloudflare'

const mdxOptions: MDXOptions = {
  rehypePlugins: [
    rehypeSlug,
    rehypeKatex,
  ],
  remarkPlugins: [
    remarkMdx,
    remarkGfm,
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'self', parsers: 'toml' }],
  ],
}

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    mdx(mdxOptions),
    ViteToml(),
    vpc({ scriptPath: './worker/index.ts' }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
})
