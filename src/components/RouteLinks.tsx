import { FILES_OF_ROUTES } from '@/utils/files'
import { DefineReference } from '@/types/define-class'
import { cn } from '@/utils/cn'

const RouteLinks = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const includeReference = (classComponent: any) => {
    const component = new classComponent() as DefineReference
    if (component.name && component.path) {
      return component
    }
    return
  }

  const modules = Object.values(FILES_OF_ROUTES).map((mod: any) => mod.default)
  const functionalModules = modules.filter(classComponent => typeof classComponent === 'function')
  const refDefinedModules = functionalModules.map(includeReference).filter(t => t)

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