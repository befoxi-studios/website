import { ComponentChild, ComponentChildren } from 'preact'
import { DefineClass } from '@/types/define-class'

export const elementGetter = (match: string, children: ComponentChildren) => {
  const child = children as ComponentChild[]

  if (child.find) {
    const matchedElement = child.find(elem => {
      const element = (elem as DefineClass)

      if (!element) return undefined
      if (element.type.name === match) {
        return elem
      }
    })
    return [matchedElement, ...child.filter(e => e !== matchedElement)]
  }
  return [, child]
}
