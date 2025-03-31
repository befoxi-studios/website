export type DefineClassProps = {
  children: ComponentChildren
  className?: string
  /** @deprecated */
  style?: JSXInternal.Signalish<string | JSXInternal.CSSProperties | undefined>
}

export type DefineClassType = {
  length: number
  name: string
}

export interface DefineClass extends VNode {
  props: DefineClassProps
  type: DefineClassType
}
