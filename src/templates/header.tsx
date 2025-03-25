import { useLocation } from 'preact-iso'
import { cn } from '../utils/cn'
import GithubIcon from '../components/GithubIcon'
import { SearchBar, SearchWindow } from './search'

const Logo = () => {
  const location = useLocation()

  return (
    <div class='flex items-center justify-start mx-1'>
      <button
        class='cursor-pointer select-none'
        onClick={() => location.route('/')}
      >
        <span class='text-[#ffffffd7] text-xl font-semibold truncate'>Befoxi Studios</span>
      </button>
    </div>
  )
}

const Items = () => {
  return (
    <div class='hidden md:flex items-center justify-end gap-6 text-neutral-50/50'>
      <a href='/roadmap' class='hover:text-neutral-50/75 transition-colors duration-150'>Roadmap</a>
      <a href='/blog' class='hover:text-neutral-50/75 transition-colors duration-150'>Blog</a>
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

const Header = ({ menu = ['logo'] }: { menu?: ('logo' | 'search' | 'items')[] }) => {
  return (<>
    <header class='flex md:grid grid-cols-3 items-center justify-between px-4 backdrop-blur-lg z-10'>
      {menu.includes('logo') ? (<Logo />) : <div class='pointer-events-none'></div>}
      {menu.includes('search') ? (<SearchBar />) : <div class='pointer-events-none'></div>}
      {menu.includes('items') && (<Items />)}
    </header>
    <SearchWindow />
  </>)
}

export default Header
