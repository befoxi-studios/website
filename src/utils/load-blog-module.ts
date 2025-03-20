const getModule = async (fileModule: () => Promise<unknown>) => {
  const mdxModule = await fileModule()
  // @ts-ignore
  // mdxModule contains `default` method,
  // type definition not possible
  const { default: getContent } = mdxModule
  return getContent()
}

export const getPost = async (uri: string, countryCode?: string) => {
  const files = import.meta.glob(`../submodules/blog/*/*.md(x)?`)
  const mainFile = files[`../submodules${uri}/main.mdx`]
  const selectedFile = files[`../submodules${uri}/${countryCode || 'main'}.mdx`]

  if (selectedFile) {
    return getModule(selectedFile)
  } else if (countryCode && !selectedFile) {
    return getModule(mainFile)
  }
  throw new Error('The file cannot be found or does not exist.')
}

export const getReadme = async (countryCode?: string) => {
  const files = import.meta.glob(`../submodules/blog/README(_*)?.md(x)?`)
  const filename = `README${countryCode ? '_' + countryCode : ''}.md`
  const mainFile = files['../submodules/blog/README.md']
  const selectedFile = files[`../submodules/blog/${filename}`]

  if (selectedFile) {
    return getModule(selectedFile)
  } else {
    return getModule(mainFile)
  }
}
