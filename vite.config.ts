import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteToml } from 'vite-plugin-toml'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import mdx, { Options as MDXOptions } from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { cloudflare } from '@cloudflare/vite-plugin'

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
  base: '/',
  plugins: [
    preact(),
    tailwindcss(),
    mdx(mdxOptions),
    ViteToml(),
    ViteYaml(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
})
