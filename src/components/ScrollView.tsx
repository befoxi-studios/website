// @ts-ignore | JSXInternal: For external use
import type { ComponentChildren, ComponentChild, VNode, JSXInternal } from 'preact'
import { useScroll } from '../utils/scroll-hook'

type DefineClassProps = {
  children: ComponentChildren
  className: string
  /** @deprecated */
  style: JSXInternal.Signalish<string | JSXInternal.CSSProperties | undefined>
}

interface DefineClass extends VNode {
  props: DefineClassProps
}

interface ViewByNumberOfChildrenProps extends DefineClassProps {
  index: number
}

interface ScrollViewProps extends React.HTMLAttributes<HTMLElement> {
  max?: number
  level?: number
  indicator?: (elevator: boolean[]) => React.HTMLAttributes<HTMLElement>
  onScrollChange?: (progress: number) => void
}

const ViewByNumberOfChildren = ({ index, children }: ViewByNumberOfChildrenProps) => {
  const child = children as ComponentChild[]
  child.map((elem, _childIndex) => {
    const newElem = (elem as DefineClass)
    // const oldClassName = newElem.props.className
    // if (childIndex === index) {
    //   newElem.props.className = `${oldClassName} ${className!}`
    //   newElem.props.style = { ...newElem.props.style, ...style! }
    // }
    return newElem
  })
  return child.length > 0 ? child[index] : child
}

export const ScrollView = ({ max = 100, level = 5, indicator, onScrollChange, children }: ScrollViewProps) => {
  const { progress, current } = useScroll(max, level)

  if (onScrollChange) {
    onScrollChange(progress)
  }

  return (<>
    {indicator && (
      indicator(Array(level)
        .fill(false)
        .map((_, i) => i === current))
    )}
    {Array(level).fill(0).map((_, i) => (
      <section
        className='col-start-1 row-start-2 last:row-end-4 flex items-center justify-center transition-all duration-500'
        style={{ transform: `translateY(${current < i ? 100 : current > i ? -100 : 0}dvh)` }}
      >
        <ViewByNumberOfChildren index={i} className='' style=''>
          {children}
        </ViewByNumberOfChildren>
      </section>
    ))}
  </>)
}
