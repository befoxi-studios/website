export type IndicatorType = {
  direction?: 'col' | 'row'
  elevator: boolean[]
  scrollTo?: (index: number) => void
}

export interface ScrollViewProps extends React.HTMLAttributes<HTMLElement> {
  /** @deprecated static-value: 100 */
  max?: number
  page?: number
  indicator?: ({ elevator, scrollTo }: IndicatorType) => React.HTMLAttributes<HTMLElement>
  onScrollChange?: (progress: number) => void
}
