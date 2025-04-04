import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { cn } from '@/utils/cn'
import { bus } from '@/utils/event-bus'
import Logo from '@/components/header/Logo'
import SearchBar from '@/components/search/SearchBar'
import SearchDialog from '@/components/search/SearchDialog'
import GithubIcon from '@/components/icons/GithubIcon'
import RouteLinks from '@/components/ui/RouteLinks'
import type { HeaderProps } from '@/types/header'

const Items = () => {
  return (
    <div class={cn`hidden sm:flex items-center justify-end gap-1 text-neutral-50/50`}>
      <div class='flex flex-row-reverse gap-1'>
        <RouteLinks
          exclude={['about-us']}
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

const Empty = () => {
  return (
    <div class='pointer-events-none'></div>
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
    <header class='flex items-center justify-between px-4 w-dvw backdrop-blur-lg z-10'>
      {menu.includes('logo') ? (<Logo />) : <Empty />}
      <div class='flex items-center justify-end'>
        {menu.includes('search') ? (<SearchBar className='px-2 mr-0 sm:mr-2 w-auto' />) : <Empty />}
        {menu.includes('items') && (<Items />)}
      </div>
    </header>
    <SearchDialog />
  </>)
}

export default Header
