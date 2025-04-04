export const FILES_OF_ROUTES = import.meta.glob(`../routes/**/!(_*)*.{js,jsx,ts,tsx}`, { eager: true })

export const FILES_OF_BLOG = import.meta.glob(`../submodules/blog/*/*.{md,mdx}`)
export const FILES_OF_BLOG_INDEX = import.meta.glob(`../submodules/blog/*/index.{md,mdx}`, { eager: true })
export const FILES_OF_BLOG_README = import.meta.glob(`../submodules/blog/README(_*)?.{md,mdx}`)

export const FILES_OF_I18N_DEFAULT = import.meta.glob(`../submodules/i18n/**/default.{yaml,yml}`, { eager: true })
export const FILES_OF_I18N = import.meta.glob(`../submodules/i18n/**/*.{yaml,yml}`, { eager: true })
