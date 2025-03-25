import { cn } from '../utils/cn'

const SectionWrapper = ({ className = '', children }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div class={cn`w-full h-full flex justify-center ${className}`}>
      {children}
    </div>
  )
}

export default SectionWrapper
