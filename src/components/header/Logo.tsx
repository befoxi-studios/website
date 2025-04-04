import { useLocation } from 'preact-iso'
import { cn } from '@/utils/cn'
import type { LogoProps } from '@/types/header'

const Logo = ({ imageSrc }: LogoProps) => {
  const location = useLocation()

  return (
    <div class={cn`
      flex items-center justify-start mx-1 w-0 md:w-auto
      scale-x-65 min-[300px]:scale-x-75 min-[326px]:scale-x-90 min-[354px]:scale-x-100
      transition-transform duration-300
    `}>
      <button
        class='cursor-pointer select-none'
        onClick={() => location.route('/')}
      >
        <span class='text-[#ffffffd7] text-xl font-semibold truncate'>
          {imageSrc
            ? (<img src={imageSrc} class='max-h-[3.75rem]' />)
            : ('Befoxi Studios')}
        </span>
      </button>
    </div>
  )
}

export default Logo
