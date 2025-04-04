import '@/styles/pixelated.css'
import { useEffect, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import dayjs from 'dayjs'
import { cn } from '@/utils/cn'
import type { PostHeadProps } from '@/types/blog'

const PostHead = ({ meta, delay, className }: PostHeadProps) => {
  const location = useLocation()

  const [loaded, setLoaded] = useState(false)
  const [iconLoaded, setIconLoaded] = useState(false)
  const [iconError, setIconError] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const [timeDisplay, setTimeDisplay] = useState<string | undefined>()

  useEffect(() => {
    const pulled = (!iconError || iconLoaded) && (!previewError || previewLoaded)
    const id = setTimeout(() => setLoaded(pulled), delay)
    return () => clearTimeout(id)
  }, [iconLoaded, iconError, previewLoaded, previewError])

  useEffect(() => {
    const createdAt = meta?.variables?.created!
    if (createdAt) {
      const createdAtTime = dayjs(createdAt)
      if (createdAtTime.isAfter(dayjs().subtract(24, 'hours'))) {
        setTimeDisplay(createdAtTime.fromNow())
      } else {
        setTimeDisplay(createdAtTime.format('ll'))
      }
    }
  }, [meta?.variables?.create!])

  if (meta && meta.variables) {
    return (
      <div
        class={cn`
          flex items-stretch bg-neutral-800/35 border border-neutral-200/3 hover:border-neutral-200/8 rounded-md
          brightness-75 hover:brightness-100 hover:scale-103 cursor-pointer transition-all duration-300 delay-25
          ${className}
        `}
        style={{ opacity: loaded ? 1 : 0 }}
        onClick={() => location.route(`/blog/${meta.name}`, true)}
      >
        <div class='flex flex-col justify-start p-3 w-full overflow-hidden'>
          {meta.variables.name && (
            <div class={cn`
              flex flex-row items-center gap-1 px-1 mb-2.5 w-fit
              bg-neutral-100/7 rounded-sm text-md font-light transition-color duration-75 
            `}>
              {meta.variables.icon && !iconError && (
                <img
                  src={meta.variables.icon}
                  width={16}
                  height={16}
                  class='w-4 min-w-4 h-4 rounded-sm bg-cover pixelate'
                  onLoad={() => setIconLoaded(true)}
                  onError={() => setIconError(true)}
                />
              )}
              <span class='px-0.5'>{meta.variables.name}</span>
            </div>
          )}
          {meta.variables.title && (
            <span class='mb-1 text-xl font-semibold truncate'>{meta.variables.title}</span>
          )}
          {meta.variables.description && (
            <span class='mb-1 max-h-[48px] text-md overflow-hidden'>{meta.variables.description}</span>
          )}
          {timeDisplay && (
            <span class='text-sm font-extralight whitespace-nowrap'>{timeDisplay}</span>
          )}
        </div>
        {meta.variables.preview && !previewError && (
          <div
            class='hidden min-[426px]:flex items-start justify-center p-3 w-min h-full'
            style={{ minWidth: meta.variables.description ? '208px' : '139px' }}
          >
            <img
              src={meta.variables.preview}
              className='rounded-md object-cover aspect-[4/3]'
              onLoad={() => setPreviewLoaded(true)}
              onError={() => setPreviewError(true)}
            />
          </div>
        )}
      </div>
    )
  }
}

export default PostHead
