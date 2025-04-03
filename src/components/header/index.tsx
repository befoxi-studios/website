import { useEffect } from 'preact/hooks'
import { cn } from '@/utils/cn'
import { bus } from '@/utils/event-bus'
import Logo from '@/components/header/Logo'
import SearchBar from '@/components/search/SearchBar'
import SearchDialog from '@/components/search/SearchDialog'
import GithubIcon from '@/components/icons/GithubIcon'
import RouteLinks from '@/components/ui/RouteLinks'
import type { HeaderProps } from '@/types/header'
import { useLocation } from 'preact-iso'

const Items = () => {
  return (
    <div class='hidden md:flex items-center justify-end gap-1 text-neutral-50/50'>
      <div class='flex flex-row-reverse gap-1'>
        <RouteLinks
          exclude={['about us']}
          className='p-2 hover:text-neutral-50/75 transition-colors duration-150'
        />
      </div>
      <a target='_blank'
        href='https://github.com/befoxi-studios'
        class={cn`
          p-2 mx-1 fill-neutral-50/50 hover:fill-neutral-50/75
          cursor-pointer select-none transition-colors duration-150
        `}
      >
        <GithubIcon title='' />
      </a>
    </div>
  )
}

const Header = ({ menu = ['logo'] }: HeaderProps) => {
  const { route } = useLocation()
  
  useEffect(() => {
    const navigateEvent = bus.onChannel('navigate', route)
    return () => {
      navigateEvent()
    }
  }, [])

  return (<>
    <header class='flex md:grid grid-cols-3 items-center justify-between px-4 backdrop-blur-lg z-10'>
      {menu.includes('logo') ? (<Logo />) : <div class='pointer-events-none'></div>}
      {menu.includes('search') ? (<SearchBar />) : <div class='pointer-events-none'></div>}
      {menu.includes('items') && (<Items />)}
    </header>
    <SearchDialog />
  </>)
}

export default Header
