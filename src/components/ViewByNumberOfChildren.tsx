import { ComponentChild } from 'preact'
import { DefineClass, DefineClassProps } from '@/types/define-class'

const ViewByNumberOfChildren = ({ index, children }: DefineClassProps & { index: number }) => {
  const child = children as ComponentChild[]
  child.map((elem, _childIndex) => {
    const newElem = (elem as DefineClass)
    // ? 'Inline-Test'
    // const oldClassName = newElem.props.className
    // if (childIndex === index) {
    //   newElem.props.className = `${oldClassName} ${className!}`
    //   newElem.props.style = { ...newElem.props.style, ...style! }
    // }
    return newElem
  })
  return child.length > 0 ? child[index] : child
}

export default ViewByNumberOfChildren
