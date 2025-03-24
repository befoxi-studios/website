import { cn } from '../utils/cn'

const Footer = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div class={cn`text-neutral-400 text-sm ${children}`}>
      <div class='grid grid-cols-2 justify-between mt-16'>
        <div class='flex flex-col gap-5 mr-auto'>
          <h1 class='text-foreground text-xl font-semibold'>Befoxi Studios</h1>
          <span class='max-w-3xs font-light'>Isn't just a place to make games, it's a place to grow with players.</span>
        </div>
        <div class='flex flex-col mr-auto'>
          <h1 class='mb-5 text-foreground text-xl font-semibold'>General</h1>
          <div class='flex flex-col gap-1.5'>
            <a href='/about-us'>About us</a>
            <a href='/contact'>Contact</a>
            <a href='/roadmap'>Roadmap</a>
            <a href='/blog'>Blog</a>
          </div>
        </div>
        {/* <div class='flex flex-col'>
          <h1 class='mb-5 text-foreground text-xl font-semibold'>Resources</h1>
          <div class='flex flex-col gap-1.5'>
            <a href='/docs'>Docs</a>
            <a href='/blog'>Blog</a>
          </div>
        </div> */}
      </div>
      <hr class='my-8 text-neutral-50/10' />
      <div>
        <div class='flex flex-col gap-5 text-xs font-light'>
          <span>© 2025 Befoxi Studios.</span>
          <span>We do not collect any personal information.</span>
          <div class='flex flex-col'>
            <span>:Social Network Services</span>
            <span>:i18n Dropdown</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
