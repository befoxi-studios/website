import '@/styles/markdown.css'
import 'highlight.js/styles/github-dark.min.css'
import { Component } from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { ClipboardCopyIcon, XIcon } from 'lucide-preact'
import { MDXProvider } from '@mdx-js/preact'
import { marked } from 'marked'
import DOMPurity from 'dompurify'
import hljs from 'highlight.js'
import { cn } from '@/utils/cn'
import Loading from '@/components/ui/Loading'
import Header from '@/components/header'

export default class AboutUsRoute extends Component {
  name = 'Playground'
  path = '/playground'

  componentDidMount(): void {
    document.title = 'Befoxi Studios Playground'
  }
  render() {
    const editorRef = useRef(null)
    const textareaRef = useRef(null)

    const [name, setName] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [category, setCategory] = useState<string>()
    const [created, setCreated] = useState<string>()
    const [icon, setIcon] = useState<string>()
    const [preview, setPreview] = useState<string>()
    const [content, setContent] = useState<string>()

    const previewContent = `
      ${(name || title || category || created) && '<span>---</span>'     || ''}
      ${name        && `<span>${`name: "${name}"`}</span>`               || ''}
      ${title       && `<span>${`title: "${title}"`}</span>`             || ''}
      ${description && `<span>${`description: "${description}"`}</span>` || ''}
      ${category    && `<span>${`category: "${category}"`}</span>`       || ''}
      ${created     && `<span>${`created: "${created}"`}</span>`         || ''}
      ${icon        && `<span>${`icon: "${icon}"`}</span>`               || ''}
      ${preview     && `<span>${`preview: "${preview}"`}</span>`         || ''}
      ${(name || title || category || created) && '<span>---</span>'     || ''}
      ${content     && `<span></span>\n<span>${content}</span>`          || ''}
    `.split(/\n/).map(t => t.trim()).filter(t => t !== '').join('\n')

    const html = useMemo(() => {
      if (content) {
        const rawHtml = marked(content)
        return DOMPurity.sanitize(rawHtml as string)
      }
      return content      
    }, [content])

    useEffect(() => {
      const scrollToBottom = (ref: HTMLElement) => ref.scrollTo({ top: ref.scrollHeight })
      const editor = editorRef.current! as HTMLDivElement
      const textarea = textareaRef.current! as HTMLTextAreaElement
      const observer = new ResizeObserver(() => scrollToBottom(editor))

      observer.observe(textarea)
      return () => observer.unobserve(textarea)
    }, [textareaRef])
    
    useEffect(() => {
      hljs.highlightAll()
    }, [html])
    
    return (
      <div class={cn`
        grid grid-rows-[60px_1fr] w-full h-svh
        bg-linear-to-b from-transparent to-emerald-950/5
        font-noto-sans text-balance overflow-hidden touch-none
      `}>
        <Loading from='top' />
        <Header menu={['logo', 'search']} />
        <div class='grid grid-cols-3 gap-1 m-2 mt-0'>
          <div class='relative flex items-center justify-center p-0'>
            <div class={cn`
              relative w-full h-full bg-neutral-950 border border-neutral-200/3
              rounded-none md:rounded-md overflow-auto duration-500 z-1
            `}>
              <div class='fixed bg-linear-to-b from-transparent to-blue-950/4'></div>
              <div class={cn`
                absolute top-0 right-0 flex items-center justify-center
                m-1 w-8 h-8 hover:bg-white/5 rounded-sm transition-colors cursor-pointer z-30
              `}>
                <XIcon width={20} height={20} class='stroke-[0.5]' />
              </div>
                <div className='relative md'>
                  <div class='flex flex-col gap-0.5 px-4 backdrop-blur-xl'>
                    <div class='flex flex-row items-center gap-2 pt-3 pb-2 text-xs font-thin'>
                      <div class={cn`
                        flex flex-row items-center gap-1 px-1 w-fit bg-neutral-100/8
                        rounded-sm text-md transition-color duration-75 opacity-85
                      `}>
                        {name && (
                          <span class='text-neutral-50'>{name}</span>
                        )}
                        {(name || category) && (
                          <span>·</span>
                        )}
                        {category && (
                          <span class='text-rose-400'>{category}</span>
                        )}
                      </div>
                      {created && (
                        <span class='opacity-70'>
                          {dayjs(created).format('ll')}
                        </span>
                      )}
                    </div>
                    {title && (
                      <span class='text-2xl mb-8'>{title}</span>
                    )}
                  </div>
                  {html && (
                    <MDXProvider>
                      <div
                        class='px-4 font-sans font-light'
                        dangerouslySetInnerHTML={{ __html: html }}
                      ></div>
                    </MDXProvider>
                  )}
                </div>
            </div>
          </div>
          <div class='relative flex w-full md'>
            <pre
              class='!m-0 w-full !bg-transparent border border-purple-400/35'
              dangerouslySetInnerHTML={{ __html: previewContent }}
            >
            </pre>
            <div class='absolute inset-x-0 bottom-0'>
              <div class='ml-auto w-fit'>
                <button
                  class={cn`
                    flex items-center justify-center m-1 w-8 h-8
                    hover:bg-purple-400/20 text-purple-400 border border-purple-400/25
                    rounded-sm transition-colors cursor-pointer
                  `}
                  onClick={() => navigator.clipboard.writeText(previewContent)}
                >
                  <ClipboardCopyIcon width={20} height={20} class='stroke-[0.5]' />
                </button>
              </div>
            </div>
          </div>
          <div ref={editorRef} class={cn`
            relative h-[calc(100dvh-60px-(var(--spacing)*2))]
            border border-neutral-700/30 rounded overflow-auto
          `}>
            <div class='flex flex-col gap-2 p-4'>
              <input
                type='text'
                required
                placeholder='name'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setName(e.currentTarget.value)}
              />
              <input
                type='text'
                required
                placeholder='title'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setTitle(e.currentTarget.value)}
              />
              <input
                type='text'
                placeholder='description'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setDescription(e.currentTarget.value)}
              />
              <input
                type='text'
                required
                placeholder='category'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setCategory(e.currentTarget.value)}
              />
              <input
                type='datetime-local'
                required
                placeholder='created'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setCreated(e.currentTarget.value)}
              />
              <input
                type='url'
                placeholder='icon'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setIcon(e.currentTarget.value)}
              />
              <input
                type='url'
                placeholder='preview'
                class={cn`
                  p-1 bg-neutral-700/15 required:bg-rose-700/15 required:valid:bg-lime-700/15 rounded-sm
                  outline outline-neutral-700/50 required:outline-rose-500/35 required:valid:outline-lime-500/35
                  placeholder:opacity-50 required:placeholder:text-rose-300 transition-all duration-300
                `}
                onChange={e => setPreview(e.currentTarget.value)}
              />
              <textarea
                ref={textareaRef}
                class='p-1 mt-3 h-[28rem] bg-neutral-700/15 outline outline-neutral-700/50 rounded-sm'
                onChange={e => setContent(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
