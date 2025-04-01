import { useLocation } from 'preact-iso'
import type { LogoProps } from '@/types/header'

const Logo = ({ imageSrc }: LogoProps) => {
  const location = useLocation()

  return (
    <div class='flex items-center justify-start mx-1'>
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
