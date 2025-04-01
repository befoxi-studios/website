import { FILES_OF_ROUTES } from '@/utils/files'
import { DefineReference } from '@/types/define-class'
import { cn } from '@/utils/cn'

const RouteLinks = ({ className, exclude }: React.HTMLAttributes<HTMLElement> & { exclude?: string[] }) => {
  const includeReference = (classComponent: any) => {
    const component = new classComponent() as DefineReference
    if (component.name && component.path) {
      return component
    }
    return
  }
  const excludeReference = (defineReference: DefineReference | undefined) => {
    if (defineReference) {
      if (exclude && defineReference.name) {
        const name = defineReference.name?.toLowerCase()
        return !exclude.filter(e => e.toLowerCase() === name)[0]
      }
    }
    return defineReference
  }

  const modules = Object.values(FILES_OF_ROUTES).map((mod: any) => mod.default)
  const functionalModules = modules.filter(classComponent => typeof classComponent === 'function')
  const refDefinedModules = functionalModules.map(includeReference).filter(excludeReference)

  return (
    refDefinedModules.map((def) => (
      <a
        href={def?.path}
        class={cn`${className}`}
      >
        {def?.name}
      </a>
    ))
  )
}

export default RouteLinks