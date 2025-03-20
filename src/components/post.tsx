import '../templates/markdown.css'
import React, { Suspense } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { MDXProvider } from '@mdx-js/preact'
import type { MDXComponents } from '../types/mdx-components'
import { getPost } from '../utils/load-blog-module'
import { useLocation } from 'preact-iso'

interface PostProps {
  uri: string
  /** @deprecated */
  components?: MDXComponents
}

type MDXContent = React.ComponentType<any> | null

const Post = ({ uri, components }: PostProps) => {
  const location = useLocation()

  const [mdxContent, setMDXContent] = useState<MDXContent>(null)

  useEffect(() => {
    // if (/^\/blog$/.test(uri)) {
    //   getReadme().then(setMDXContent)
    // }
    getPost(uri)
      .then(setMDXContent)
      .catch(() => location.route('../blog', true))
  }, [uri])

  return (
    <Suspense fallback={<></>}>
      {mdxContent ? (
        <MDXProvider components={components}>
          <div className='md'>
            {mdxContent}
          </div>
        </MDXProvider>
      ) : (
        <>Blog</>
      )}
    </Suspense>
  )
}

export default Post
