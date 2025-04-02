import { cn } from '@/utils/cn'
import { useI18n } from '@/hooks/useI18n'
import RouteLinks from '@/components/ui/RouteLinks'

const LanguageDropdown = () => {
  const { datas, currentLanguage, setLanguage } = useI18n()

  return (
    <div class={cn`
      flex flex-col items-start gap-1 p-2 pr-0 w-fit min-w-[8rem]
      bg-neutral-950/35 border border-neutral-800 rounded-md overflow-hidden
    `}>
      {datas.map(({ 'lang-code': locale, langset }) => (
        <button
          disabled={currentLanguage === locale}
          class={cn`
            group/lang
            flex flex-row items-center gap-1.5 -ml-2.75 w-[calc(100%+0.2rem)]
            cursor-pointer disabled:pointer-events-none
          `}
          onClick={() => locale && setLanguage(locale)}
        >
          <div class={cn`
            w-1.5 h-3 bg-neutral-500 rounded-xs transition-opacity
            ${currentLanguage === locale ? 'opacity-100' : 'opacity-0'}`
          }></div>
          <span class='flex w-full p-1 group-hover/lang:bg-neutral-800/30 rounded transition-all'>
            {langset}
          </span>
        </button>
      ))}
    </div>
  )
}

const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const { t } = useI18n()
  return (
    <div class={cn`text-neutral-400 text-sm ${className}`}>
      <div class='flex flex-row md:grid grid-cols-2 justify-between mt-4 md:mt-16'>
        <div class='flex flex-col gap-5 mr-12'>
          <h1 class='text-on-background text-xl font-semibold'>
            {t('title', 'Befoxi Studios')}
          </h1>
          <span
            class='max-w-3xs text-sm font-light'
            dangerouslySetInnerHTML={{
              __html: t(
                'footer.description',
                'Isn\'t just a place to <b>make games</b>, it\'s a place to grow with <b>users</b>.'
              )!
            }}
          ></span>
        </div>
        <div class='hidden md:flex flex-col mr-8 last:mr-auto'>
          <h1 class='mb-5 text-on-background text-xl font-semibold'>General</h1>
          <div class='flex flex-col gap-1.5'>
            {/* Currently not in use.

              * If you write a blog post called "about-us" or whatever,
                link directly to it.
            <a href='/about-us'>About us</a>

              * Enter email or contact information when you have it.
            <a href='mailto:contact@befoxistudios.com' target='_blank'>Contact</a> */}
            <RouteLinks />
          </div>
        </div>
        {/* <div class='flex flex-col'>
          <h1 class='mb-5 text-on-background text-xl font-semibold'>Resources</h1>
          <div class='flex flex-col gap-1.5'>
            <a href='/docs'>Docs</a>
            <a href='/blog'>Blog</a>
          </div>
        </div> */}
      </div>
      <hr class='my-8 text-neutral-50/10' />
      <div class='flex flex-row'>
        <div class='flex flex-col gap-5 w-full text-xs font-light'>
          <span>© 2025 {t('title', 'Befoxi Studios')}.</span>
          <span>
            {t('footer.personal-info', 'We do not collect any personal information on our website.')}
          </span>
          <div class='hidden md:flex flex-col'>
            {/* <span>:Social Network Services</span> */}
          </div>
        </div>
        <LanguageDropdown />
      </div>
    </div>
  )
}

export default Footer
