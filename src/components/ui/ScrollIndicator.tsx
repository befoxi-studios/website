import { useEffect, useRef, useState } from 'preact/hooks'
import { cn } from '@/utils/cn'
import { useGlobal } from '@/hooks/useGlobal'
import type { ScrollIndicatorProps, ScrollIndicatorTestKeys } from '@/types/scroll'


const Indicator = ({
  direction = 'col',
  elevator,
  scrollTo,
  className = '',
  colClassName = '',
  rowClassName = '',
  indicatorClassName = '',
  indicatorColClassName = '',
  indicatorRowClassName = '',
  indicatorActiveClassName = '',
  startKey = ['home'],
  endKey = ['end'],
  colPreviousKey = ['pageup'],
  colNextKey = ['pagedown'],
  rowPreviousKey = ['pageup'],
  rowNextKey = ['pagedown'],
}: ScrollIndicatorProps) => {
  const { isSearchOpen } = useGlobal()

  const [testKeys, setTestKeys] = useState<ScrollIndicatorTestKeys>({
    start: startKey,
    end: endKey,
    previous: ['pageup'],
    next: ['pagedown'],
  })
  
  const testKeysRef = useRef(testKeys)

  const handleKeydown = (event: KeyboardEvent) => {
    if (!scrollTo || isSearchOpen) return

    const currentScrollLevel = elevator.indexOf(true)
    const key = (event.key || event.code).toLowerCase()
    const test = testKeysRef.current
    
    if (test.start.includes(key)) {
      scrollTo(0)
    }
    if (test.end.includes(key)) {
      scrollTo(elevator.length - 1)
    }
    if (test.previous.includes(key)) {
      scrollTo(currentScrollLevel - 1)
    }
    if (test.next.includes(key)) {
      scrollTo(currentScrollLevel + 1)
    }
  }

  useEffect(() => {
    testKeysRef.current = testKeys
  }, [testKeys])

  useEffect(() => {
    if (direction === 'col') {
      setTestKeys({
        start: startKey,
        end: endKey,
        previous: colPreviousKey,
        next: colNextKey,
      })
    }
    if (direction === 'row') {
      setTestKeys({
        start: startKey,
        end: endKey,
        previous: rowPreviousKey,
        next: rowNextKey,
      })
    }
  }, [direction, colPreviousKey, colNextKey, rowPreviousKey, rowNextKey])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [elevator, isSearchOpen])

  return (
    <div data-indicator-direction={direction} class={cn`
      absolute flex items-center justify-center gap-2.5 z-100 ${className!}
      ${direction === 'col' && `left-0 top-0 bottom-0 flex-col w-12 ${colClassName}`}
      ${direction === 'row' && `left-0 right-0 bottom-0 flex-row h-12 ${rowClassName}`}
    `}>
      {elevator.map((isActive, index) => (
        <button
          key={index}
          data-indicator-index={index}
          class={cn`
            block bg-neutral-100/30 rounded-sm focus-visible:outline outline-neutral-100/15 outline-offset-2
            transition-all duration-300 cursor-pointer ${indicatorClassName}
            ${direction === 'col' && `w-1 hover:w-2 h-4 ${indicatorColClassName}`}
            ${direction === 'row' && `w-4 h-1 hover:h-2 ${indicatorRowClassName}`}
            ${isActive || `bg-neutral-100/10 ${indicatorActiveClassName}`}
          `}
          style={{ pointerEvents: isActive ? 'none' : 'auto' }}
          onClick={() => scrollTo && scrollTo(index)}
        ></button>
      ))}
    </div>
  )
}

export default Indicator
