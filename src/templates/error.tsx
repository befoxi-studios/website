import { cn } from '@/utils/cn'

interface ErrorProps extends React.HTMLAttributes<HTMLElement> {
  /** @deprecated */
  back?: string
}

const Error = ({ className }: ErrorProps) => {
  const back = () => {
    if (window && window.history) {
      history.back()
    }
  }
  
  return (
    <div class={cn`absolute inset-0 flex items-center justify-center ${className}`}>
      <div class='flex flex-col items-start text-xl'>
        <span class='mb-1.5 text-5xl font-bold opacity-60'>404</span>
        <span class='opacity-30'>Sorry, Page not found.</span>
        <span class='opacity-30'>Would you like to explore elsewhere?</span>
        <button
          class='ml-auto hover:text-rose-400 opacity-70 underline cursor-pointer'
          onClick={back}
        >
          <span>Interact to explore</span>
        </button>
        <span class='mt-4 text-lg opacity-0'>There's a lot hidden in this site.</span>
      </div>
    </div>
  )
}

export default Error
