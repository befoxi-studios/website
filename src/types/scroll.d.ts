export type ScrollIndicatorType = {
  direction?: 'col' | 'row'
  elevator: boolean[]
  scrollTo?: (index: number) => void
}

export interface ScrollViewProps extends React.HTMLAttributes<HTMLElement> {
  /** @deprecated static-value: 100 */
  max?: number
  page?: number
  indicator?: ({ elevator, scrollTo }: ScrollIndicatorType) => React.HTMLAttributes<HTMLElement>
  onScrollChange?: (progress: number) => void
}

export interface ScrollIndicatorProps extends ScrollIndicatorType {
  // Classname
  className?: string
  colClassName?: string
  rowClassName?: string
  indicatorClassName?: string
  indicatorColClassName?: string
  indicatorRowClassName?: string
  indicatorActiveClassName?: string
  // Keyboard
  startKey?: string[]
  endKey?: string[]
  colPreviousKey?: string[]
  colNextKey?: string[]
  rowPreviousKey?: string[]
  rowNextKey?: string[]
}

type ScrollIndicatorTestKeys = { start: string[], end: string[], previous: string[], next: string[] }
