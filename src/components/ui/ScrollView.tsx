// @ts-ignore | JSXInternal: For external use
import type { ComponentChildren, ComponentChild, VNode, JSXInternal } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { cn } from '@/utils/cn'
import { useGlobal } from '@/hooks/useGlobal'
import { useScroll } from '@/hooks/useScroll'
import type { ScrollViewProps } from '@/types/scroll'
import ViewByNumberOfChildren from '@/components/ViewByNumberOfChildren'

const ScrollView = ({ max = 100, page = 5, indicator, onScrollChange, children }: ScrollViewProps) => {
  const { isSearchOpen } = useGlobal()
  const { progress, current, touch, to } = useScroll(max, page)

  const reactDistance = 75
  const [reactStart, setReactStart] = useState(0)
  const [reactDirection, setReactDirection] = useState(0)

  if (onScrollChange) {
    onScrollChange(progress)
  }

  const dragReaction = (index: number, react: number = 10) => {
    let value

    if (current < index) {
      value = 100
    } else if (current > index) {
      value = -100
    } else if (current === 0 && reactDirection > 0) {
      value = reactDirection * -react
    } else if (current === (page - 1)) {
      value = reactDirection < 0 ? (reactDirection * -react) : 0
    } else if ((current !== 0 || current === (page - 1))) {
      value = reactDirection * -react
    } else {
      value = 0
    }
    
    return value
  }
  
  useEffect(() => {
    if (isSearchOpen) return
    
    if (touch.distance > reactDistance || touch.distance < -reactDistance) {
      setReactStart(touch.distance)
      setReactDirection(touch.distance > 0 ? 1 : -1)
    } else {
      setReactStart(0)
      setReactDirection(0)
    }
    if (touch.distance === 0 && (reactStart > 50 || reactStart < -50)) {
      setReactStart(0)
      setReactDirection(0)
      to(current + (reactStart > 0 ? 1 : -1))
    }
  }, [touch, setReactStart])

  return (<>
    {indicator && (
      indicator({
        elevator: Array(page).fill(false).map((_, i) => i === current),
        scrollTo: (index) => to(index),
      })
    )}
    {Array(page).fill(0).map((_, i) => (
      <section
        className={cn`
          col-start-1 row-start-2 last:row-end-4 flex items-center justify-center
          h-[calc(100dvh-(60px*2))] last:h-[calc(100dvh-60px)] transition-[transform] duration-500
        `}
        style={{ transform: `translateY(${dragReaction(i, 7)}dvh)` }}
      >
        <ViewByNumberOfChildren index={i}>
          {children}
        </ViewByNumberOfChildren>
      </section>
    ))}
  </>)
}

export default ScrollView
