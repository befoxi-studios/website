import { FILES_OF_BLOG, FILES_OF_BLOG_README, FILES_OF_CONFIG } from '@/utils/files'
import type { v1, ModuleType, Metadata, MetadataVariable } from '@/types/blog'

const throwDoesNotExistError = () => {
  return new Error('The file cannot be found or does not exist.')
}

const getModule = async (fileModule: () => Promise<unknown>) => {
  const module = await fileModule()
  // @ts-ignore
  // module contains `default` method,
  // type definition not possible
  const { default: getContent, self } = module
  return {
    content: getContent(),
    variables: self,
  }
}

const getConfig = async () => {
  const selectedConfig = FILES_OF_CONFIG[`../submodules/blog/.conf.toml`]

  if (selectedConfig) {
    const module = await selectedConfig()
    // @ts-ignore
    // module contains `default` method,
    // type definition not possible
    const { default: cfg } = module
    return cfg
  }
  throw throwDoesNotExistError()
}

export const getPost = async (uri: string, countryCode?: string) => {
  const { file: { index } }: v1 = await getConfig()
  const indexFileRegex = new RegExp(`\.\.\/submodules${uri}\/${index}.mdx?`)
  const internalFileRegex = new RegExp(`\.\.\/submodules${uri}\/${countryCode}.mdx?`)

  const filePath = Object.keys(FILES_OF_BLOG).find(t => {
    if (countryCode) {
      return new RegExp(internalFileRegex).test(t)
    } else {
      return RegExp(indexFileRegex).test(t)
    }
  }) || Object.keys(FILES_OF_BLOG).find(t => {
    return new RegExp(indexFileRegex).test(t)
  })

  if (filePath) {
    const selectedFile = FILES_OF_BLOG[filePath]

    if (selectedFile) {
      return getModule(selectedFile)
    }
  }

  throw throwDoesNotExistError()
}

export const getAllDir = async () => {
  const { file: { index } }: v1 = await getConfig()
  const fileRegex = new RegExp(`^((\.\.\/submodules\/blog\/)([a-zA-Z0-9_-]+)\/)(${index}(\.mdx?))$`)
  const indexedFiles = Object.keys(FILES_OF_BLOG).filter(path => fileRegex.test(path))
  const selectedFiles: { [key: string]: Promise<any> } = {}

  indexedFiles.forEach(path => (selectedFiles[path] = getModule(FILES_OF_BLOG[path])))

  return selectedFiles
}

export const getReadme = async (countryCode?: string) => {
  const filename = `README${countryCode ? '_' + countryCode : ''}.md`
  const mainFile = FILES_OF_BLOG_README['../submodules/blog/README.md']
  const selectedFile = FILES_OF_BLOG_README[`../submodules/blog/${filename}`]

  if (selectedFile) {
    return getModule(selectedFile)
  } else {
    return getModule(mainFile)
  }
}

export const fetchBlogMetadata = async () => {
  const fileRegex = new RegExp(`^((\.\.\/submodules\/blog\/)([a-zA-Z0-9_-]+)\/)(([a-zA-Z0-9_-]+)(\.mdx?))$`)

  const promisedDir = await getAllDir()
  const dirs = Object.keys(promisedDir)

  const blogPosts = await Promise.all(
    dirs.map(async (t) => {
      const exec = fileRegex.exec(t)
      if (exec) {
        const { variables }: ModuleType = await promisedDir[t]
        const metadata: Metadata = {
          name: exec[3],
          variables: variables as MetadataVariable,
        }
        return metadata
      }
      return null
    })
  )

  return blogPosts
}
