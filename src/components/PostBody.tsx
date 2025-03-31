import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { XIcon } from 'lucide-preact'
import { cn } from '@/utils/cn'

const PostBody = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <div class='relative flex items-center justify-center p-0 lg:p-6 h-[calc(100dvh-(var(--spacing)*15))]'>
      <div
        class='absolute inset-0 transition-all duration-500 z-0'
        style={{ backdropFilter: isOpen ? 'blur(8px)' : 'blur(0)' }}
        onClick={() => location.route('/blog')}
      ></div>
      <div
        class={cn`
          relative max-w-none lg:max-w-lg max-h-[43rem] bg-neutral-950 border border-neutral-200/3
          rounded-none lg:rounded-md overflow-auto transition-all duration-500 z-1
        `}
        style={{ height: isOpen ? '100%' : '0%' }}
      >
        <div class='fixed bg-linear-to-b from-transparent to-blue-950/4'></div>
        <div
          class={cn`
            absolute top-0 right-0 flex items-center justify-center
            m-1 w-8 h-8 hover:bg-white/5 rounded-sm transition-colors cursor-pointer z-30
          `}
          onClick={() => location.route('/blog')}
        >
          <XIcon width={20} height={20} class='stroke-[0.5]' />
        </div>
        {children}
      </div>
    </div>
  )
}

export default PostBody
