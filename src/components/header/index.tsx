import { cn } from '@/utils/cn'
import Logo from '@/components/header/Logo'
import SearchBar from '@/components/search/SearchBar'
import SearchDialog from '@/components/search/SearchDialog'
import GithubIcon from '@/components/icons/GithubIcon'
import RouteLinks from '@/components/ui/RouteLinks'
import type { HeaderProps } from '@/types/header'

const Items = () => {
  return (
    <div class='hidden md:flex items-center justify-end gap-6 text-neutral-50/50'>
      <RouteLinks
        exclude={['about us']}
        className='hover:text-neutral-50/75 transition-colors duration-150'
      />
      <a target='_blank'
        href='https://github.com/befoxi-studios'
        class={cn`
          mx-1 w-5 h-5 fill-neutral-50/50 hover:fill-neutral-50/75
          cursor-pointer select-none transition-colors duration-150
        `}
      >
        <GithubIcon title='' />
      </a>
    </div>
  )
}

const Header = ({ menu = ['logo'] }: HeaderProps) => {
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
