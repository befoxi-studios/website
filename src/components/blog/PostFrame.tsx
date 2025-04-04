import '@/styles/markdown.css'
import 'highlight.js/styles/github-dark.min.css'
import type { ReactElement } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { MDXProvider } from '@mdx-js/preact'
import hljs from 'highlight.js'
import { cn } from '@/utils/cn'
import { useGlobal } from '@/hooks/useGlobal'
import { getPost } from '@/hooks/useBlog'
import PostBody from '@/components/blog/PostBody'
import type { ModuleType, MetadataVariable, PostFrameProps } from '@/types/blog'
import type { MDXContent } from '@/types/mdx'

const PostFrame = ({ components, uri, onError }: PostFrameProps) => {
  const { langCode } = useGlobal()
  const [mdxContent, setMDXContent] = useState<MDXContent>(null)
  const [metadataVariable, setMetadataVariable] = useState<MetadataVariable | undefined>()
  const [alternateComponent, setAlternateComponent] = useState<ReactElement<HTMLElement> | null>(null)

  useEffect(() => {
    getPost(uri, langCode ?? 'en')
      .then(({ content, variables }: ModuleType) => {
        setMDXContent(content!)
        setMetadataVariable(variables)
      })
      .catch(() => onError && setAlternateComponent(onError()))
  }, [uri])

  useEffect(() => {
    const id = setInterval(() => scrollTo(0, 0), 10)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (metadataVariable && metadataVariable.name) {
      document.title = `${metadataVariable.name} - Befoxi Studios Blog`
    }
  }, [uri, metadataVariable])

  useEffect(() => {
    hljs.highlightAll()
  }, [mdxContent])

  return (mdxContent && metadataVariable ? (
    <PostBody>
      <MDXProvider components={components}>
        <div className='relative md'>
          <div class='flex flex-col items-start gap-0.5 px-4 backdrop-blur-xl'>
            <div class='flex flex-row items-start gap-2 pt-3 pb-2 text-xs font-thin'>
              <div class={cn`
                flex flex-row items-center gap-1 px-1 w-fit bg-neutral-100/8
                rounded-sm text-md transition-color duration-75 opacity-85
              `}>
                <span class='text-neutral-50'>{metadataVariable.name}</span>
                <span>·</span>
                <span class='text-rose-400'>{metadataVariable.category}</span>
              </div>
              <span class='hidden min-[426px]:block opacity-70'>{dayjs(metadataVariable.created).format('ll')}</span>
            </div>
            <span class='text-2xl mb-8'>{metadataVariable.title}</span>
          </div>
          <div class='px-4 font-sans font-light'>
            {mdxContent}
          </div>
        </div>
      </MDXProvider>
    </PostBody>
  ) : (
    alternateComponent && (<>
      {alternateComponent}
    </>)
  ))
}

export default PostFrame
