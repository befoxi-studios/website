import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import dayjs from 'dayjs'
import Header from './header'
import { fetchBlogMetadata } from '../utils/hooks/blog-hook'
import type { Metadata } from '../types/blog'
import PostHead from '../components/PostHead'
import Post from './post'
import Error from './error'
import Loading from '../components/Loading'
import { cn } from '../utils/cn'

const Blog = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation()

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
    fetchBlogMetadata().then((t) => setMetadata(t))
  }, [fetchBlogMetadata])

  return (
    <div class={cn`
      grid grid-rows-[60px_1fr] w-full h-svh
      bg-linear-to-b from-transparent to-blue-950/5 font-noto-sans overflow-hidden
    `}>
      <Header menu={['logo', 'search']}  />
      {isError && (<>
        <Loading />
        <Error className='bg-background z-100' />
      </>)}
      {!isError && (
        <Loading from='top' />
      )}
      {children ? children : (
        <div class='flex justify-center flex-wrap overflow-auto'>
          <div class='flex flex-col gap-4 max-w-3xl p-4'>
            {metadata.sort((a, b) => {
              const bTime = dayjs(b?.variables?.created)
              const isBeforeB = bTime.isBefore(dayjs(a?.variables?.created))
              return isBeforeB ? -1 : 1
            }).map((meta, index) => {
              return (<PostHead meta={meta} delay={50 * index} />)
            })}
          </div>
        </div>
      )}
      {isPost && (
        <div class='absolute inset-0 grid grid-rows-[60px_1fr] bg-black/60 z-50'>
          <Header menu={['logo']} />
          <Post
            uri={location.path}
            onError={() => location.path !== '/blog' && setIsError(true)}
          />
        </div>
      )}
    </div>
  )
}

export default Blog
