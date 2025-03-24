export type DefineClassProps = {
  children: ComponentChildren
  className?: string
  /** @deprecated */
  style?: JSXInternal.Signalish<string | JSXInternal.CSSProperties | undefined>
}

export interface DefineClass extends VNode {
  props: DefineClassProps
}
