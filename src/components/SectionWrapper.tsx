export const SectionWrapper = ({ className, children }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div class={`w-full h-full ${className}`}>
      <div class='absolute inset-0 m-auto max-w-3xl'>
        {children}
      </div>
    </div>
  )
}
