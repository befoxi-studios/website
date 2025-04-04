import { Component } from 'preact'
import { useState } from 'preact/hooks'
import { cn } from '@/utils/cn'
import Loading from '@/components/ui/Loading'
import Indicator from '@/components/ui/ScrollIndicator'
import ScrollView from '@/components/ui/ScrollView'
import Header from '@/components/header'
import Background from '@/components/Background'
import SectionWrapper from '@/components/SectionWrapper'
import Footer from '@/templates/footer'
import { useI18n } from '@/hooks/useI18n'

export default class HomeRoute extends Component {
  componentDidMount(): void {
    document.title = 'Befoxi Studios'
  }
  render() {
    const { t } = useI18n()
    const [scrollProgress, setScrollProgress] = useState(0)

    return (
      <div class={cn`
        grid grid-rows-[60px_1fr_60px] w-full h-svh
        font-noto-sans text-balance overflow-hidden touch-none
      `}>
        <Loading from='top' />
        <Background scrollProgress={scrollProgress} />
        <Header menu={['logo', 'search', 'items']} />
        {import.meta.env.VITE_RUNTIME_MODE === 'development' && (
          <div
            class={cn`
              absolute inset-x-0 top-[3.75rem] flex justify-center bg-rose-400
              text-black text-sm font-mono tracking-tight overflow-hidden select-none z-15
            `}
          >
            <span class='sticky top-0 py-1 text-center text-balance'>
              {t('alert.construction', 'This site is still under construction!')}
            </span>
          </div>
        )}
        <ScrollView
          indicator={({ elevator, scrollTo }) => (
            <Indicator
              direction='col'
              elevator={elevator}
              scrollTo={scrollTo}
              rowClassName='h-15'
              colPreviousKey={['pageup', 'arrowup', 'w']}
              colNextKey={['pagedown', 'arrowdown', 's']}
              // rowPreviousKey={['pageup', 'arrowleft', 'a']}
              // rowNextKey={['pagedown', 'arrowright', 'd']}
            />
          )}
          onScrollChange={setScrollProgress}
        >
          <SectionWrapper className='w-dvw items-center'>
            <div class='mx-12 w-full sm:w-lg max-w-none sm:max-w-lg lg:max-w-3xl text-center'>
              <div class='flex flex-col items-center justify-center gap-[1.75rem] font-light'>
                <span
                  class='text-[27pt] font-bold opacity-95'
                  dangerouslySetInnerHTML={{
                    __html: t('home.welcome', 'Welcome to Befoxi Studios!')!
                      .split('<>').join('<br/>')
                  }}
                ></span>
              </div>
            </div>
          </SectionWrapper>
          <SectionWrapper className='items-center'>
            <div class='mx-12 w-full sm:w-lg max-w-none sm:max-w-lg lg:max-w-3xl text-center'>
              <div
                class={cn`
                  flex flex-col items-center justify-center font-light
                  [&>span]:text-on-background/95 [&>span]:text-center
                  [&_a]:text-rose-400 [&_a]:hover:underline [&_a]:underline-offset-2
                  [&_b]:text-on-background
                `}
                dangerouslySetInnerHTML={{
                  __html: t(
                    'home.about',
                    `We are a game development studio that brings new experiences to players based on creative games and original worldviews.
                    <> <br/> In <a href='/blog'>Blog</a>, we will share various <b>news</b>, <b>updates</b>, <b>events</b>, and <b>developer strategy guide</b>.
                    It will be updated from the progress of new development to new patch notes.`
                  )!.split('<>').map(msg => `<span>${msg}</span>`).join('')
                }}
              ></div>
            </div>
          </SectionWrapper>
          <SectionWrapper className={cn`
            bg-neutral-50/1 border-t border-t-neutral-50/3 backdrop-blur-3xl transition-all z-20
            ${scrollProgress === 100 ? 'rounded-t-none' : 'rounded-t-xl'}
          `}>
            <Footer className='mx-16 sm:mx-none w-full max-w-none sm:max-w-lg lg:max-w-3xl' />
          </SectionWrapper>
        </ScrollView>
      </div>
    )
  }
}
