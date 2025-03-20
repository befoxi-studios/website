import { Component } from 'preact'
import { useState } from 'preact/hooks'
import { ScrollView } from '../components/ScrollView'
import { SectionWrapper } from '../components/SectionWrapper'
import { Indicator } from '../components/Indicator'

export default class Home extends Component {
  render() {
    const [scrollProgress, setScrollProgress] = useState(0)

    return (
      <div class='grid grid-rows-[60px_1fr_60px] w-full h-dvh overflow-hidden touch-none'>
        <div class='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <span
            class='text-5xl font-bold blur transition-all duration-500'
            style={{
              opacity: `${10 - (Math.sqrt(scrollProgress) / 2)}%`,
              '--tw-blur': `blur(${scrollProgress / 2}px)`
            }}
          >Befoxi Studios</span>
        </div>

        <header>

        </header>

        <ScrollView
          indicator={(elevator) => <Indicator elevator={elevator} />}
          onScrollChange={setScrollProgress}
        >
          <SectionWrapper className=''>
            
          </SectionWrapper>
          <SectionWrapper className=''>

          </SectionWrapper>
          <SectionWrapper className=''>

          </SectionWrapper>
          <SectionWrapper className=''>

          </SectionWrapper>
          <SectionWrapper className='bg-white/3 border-t border-t-white/3 backdrop-brightness-50'>

          </SectionWrapper>
        </ScrollView>
      </div>
    )
  }
}
