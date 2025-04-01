import { Component } from 'preact'
import { useState } from 'preact/hooks'
import Loading from '@/components/ui/Loading'
import Indicator from '@/components/ui/ScrollIndicator'
import ScrollView from '@/components/ui/ScrollView'
import Header from '@/components/header'
import Background from '@/components/Background'
import SectionWrapper from '@/components/SectionWrapper'
import Footer from '@/templates/footer'

export default class Home extends Component {
  componentDidMount(): void {
    document.title = 'Befoxi Studios'
  }
  render() {
    const [scrollProgress, setScrollProgress] = useState(0)

    return (
      <div class='grid grid-rows-[60px_1fr_60px] w-full h-svh font-noto-sans overflow-hidden touch-none'>
        <Loading from='top' />
        <Background scrollProgress={scrollProgress} />
        <Header menu={['logo', 'search', 'items']} />
        <ScrollView
          page={3}
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
          <SectionWrapper className='items-center'>
            <div class='mx-12 w-full sm:w-lg max-w-none sm:max-w-lg lg:max-w-3xl text-center'>
              <div class='flex flex-col items-center justify-center gap-[1.75rem] font-light'>
                <span class='text-[27pt] font-bold opacity-95'>Welcome to Befoxi Studios!</span>
              </div>
            </div>
          </SectionWrapper>
          <SectionWrapper className='items-center'>
            <div class='mx-12 w-full sm:w-lg max-w-none sm:max-w-lg lg:max-w-3xl text-center'>
              <div class='flex flex-col items-center justify-center font-light'>
                <span class='text-on-background/95 text-center'>
                  We are a game development studio that brings new experiences to players based on creative games and original worldviews.
                </span>
                <br/>
                <span class='text-on-background/95 text-center'>
                  In <a href='/blog' class='text-rose-400'>Blog</a>,
                  we will share various <b class='text-on-background'>news</b>, <b class='text-on-background'>updates</b>, <b class='text-on-background'>events</b>, and <b class='text-on-background'>developer strategy guide</b>.
                </span>
                <span class='text-on-background/95 text-center'>
                  It will be updated from the progress of new development to new patch notes.
                </span>
              </div>
            </div>
          </SectionWrapper>
          <SectionWrapper className='bg-neutral-50/1 border-t border-t-neutral-50/3 rounded-t-xl backdrop-blur-3xl'>
            <Footer className='mx-16 sm:mx-none w-full max-w-none sm:max-w-lg lg:max-w-3xl' />
          </SectionWrapper>
        </ScrollView>
      </div>
    )
  }
}
