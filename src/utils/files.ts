export const FILES_OF_ROUTES = import.meta.glob(`../routes/**/!(_*)*.{js,jsx,ts,tsx}`, { eager: true })

export const FILES_OF_BLOG = import.meta.glob(`../submodules/blog/*/*.md(x)?`)
export const FILES_OF_BLOG_INDEX = import.meta.glob(`../submodules/blog/*/index.{md,mdx}`, { eager: true })
export const FILES_OF_BLOG_README = import.meta.glob(`../submodules/blog/README(_*)?.md(x)?`)
export const FILES_OF_BLOG_CONFIG = import.meta.glob(`../submodules/blog/.conf.toml`)
