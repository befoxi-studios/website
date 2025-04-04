import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { useGlobal } from '@/hooks/useGlobal'
import { fetchBlogMetadata } from '@/hooks/useBlog'
import Header from '@/components/header'
import Loading from '@/components/ui/Loading'
import PostFrame from '@/components/blog/PostFrame'
import PostHead from '@/components/blog/PostHead'
import Error from '@/templates/error'
import type { Metadata } from '@/types/blog'

const Blog = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation()
  const { langCode } = useGlobal()
  const [metadata, setMetadata] = useState<(Metadata | null)[]>([])
  const [isError, setIsError] = useState(false)
  const [isPost, setIsPost] = useState(false)

  useEffect(() => {
    const filteredMetadata = metadata.filter(meta => {
      const pathRegex = new RegExp(/\/blog\/([a-zA-Z0-9_-]+)/)
      const exec = pathRegex.exec(location.path)
      if (exec) {
        return meta?.name! === exec[1]
      }
      return null
    })

    if (location.path !== '/blog' && !filteredMetadata.length) {
      document.title = 'Page not found - Befoxi Studios'
      setIsError(true)
    } else {
      document.title = 'Befoxi Studios Blog'
      setIsError(false)
    }

    setIsPost(!!filteredMetadata[0])
  }, [location, metadata])

  useEffect(() => {
    fetchBlogMetadata(langCode)
      .then(data => setMetadata(data))
  }, [langCode, fetchBlogMetadata])

  return (<>
    {isError && (<>
      <Loading />
      <Error className='bg-background z-100' />
    </>)}
    {!isError && (
      <Loading from='top' />
    )}
    {children || (
      <div class='flex justify-center flex-wrap overflow-auto'>
        <div class='flex flex-col gap-4 min-w-screen min-[672px]:min-w-2xl max-w-3xl p-4'>
          {metadata.sort((a, b) => {
            const bTime = dayjs(b?.variables?.created)
            const isBeforeB = bTime.isBefore(dayjs(a?.variables?.created))
            return isBeforeB ? -1 : 1
          }).map((meta, index) => (
            <PostHead meta={meta} delay={50 * index} />
          ))}
        </div>
      </div>
    )}
    {isPost && (
      <div class='absolute inset-0 grid grid-rows-[60px_1fr] bg-black/60 z-50'>
        <Header menu={['logo']} />
        <PostFrame
          uri={location.path}
          onError={() => location.path !== '/blog' && setIsError(true)}
        />
      </div>
    )}
  </>)
}

export default Blog
