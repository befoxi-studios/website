import type { ComponentChild } from 'preact'

export interface DialogProps {
  open?: boolean
  stateChanged?: (state: boolean) => any
  children?: ComponentChild | ComponentChild[]
}
