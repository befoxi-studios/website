import Footer from './footer'
import Indicator from '../components/ScrollIndicator'
import ScrollView from '../components/ScrollView'
import SectionWrapper from '../components/SectionWrapper'

interface MainProps {
  scrolling: (progress: number) => void
}

const Main = ({ scrolling }: MainProps) => {
  return (
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
      onScrollChange={scrolling}
    >
      <SectionWrapper>
        <div class='absolute inset-0 flex flex-col items-center justify-center gap-[1.75rem] font-light scale-[1.125]'>
          <span class='text-[27pt] font-bold opacity-95'>Welcome to Befoxi Studios!</span>
          <span class='text-center'>Befoxi Studios is a game development studio that brings new experiences to players based on creative games and original worldviews. In <a href='/blog' class='text-rose-400'>blog</a>, we will share various news, updates, events, and developer strategy guide. It will be updated from the progress of new development to new patch notes.</span>
          <span class='text-[27pt] font-bold opacity-0 pointer-events-none'>Welcome to BeFoxi Studio!</span>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div class='absolute inset-0 flex items-center justify-center text-2xl font-bold'>
          Section 2
        </div>
      </SectionWrapper>
      <SectionWrapper className='bg-neutral-50/1 border-t border-t-neutral-50/3 rounded-t-xl backdrop-blur-3xl'>
        <Footer />
      </SectionWrapper>
    </ScrollView>
  )
}

export default Main
