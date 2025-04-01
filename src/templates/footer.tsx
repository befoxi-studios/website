import { cn } from '@/utils/cn'
import RouteLinks from '@/components/ui/RouteLinks'

const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div class={cn`text-neutral-400 text-sm ${className}`}>
      <div class='flex flex-row md:grid grid-cols-2 justify-between mt-4 md:mt-16'>
        <div class='flex flex-col gap-5 mr-12'>
          <h1 class='text-on-background text-xl font-semibold'>Befoxi Studios</h1>
          <span class='max-w-3xs text-sm font-light'>Isn't just a place to <b>make games</b>, it's a place to grow with <b>users</b>.</span>
        </div>
        <div class='hidden md:flex flex-col mr-8 last:mr-auto'>
          <h1 class='mb-5 text-on-background text-xl font-semibold'>General</h1>
          <div class='flex flex-col gap-1.5'>
            {/* Currently not in use.

              * If you write a blog post called "about-us" or whatever,
                link directly to it.
            <a href='/about-us'>About us</a>

              * Enter email or contact information when you have it.
            <a href='mailto:contact@befoxistudios.com' target='_blank'>Contact</a> */}
            <RouteLinks />
          </div>
        </div>
        {/* <div class='flex flex-col'>
          <h1 class='mb-5 text-on-background text-xl font-semibold'>Resources</h1>
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
          <div class='hidden md:flex flex-col'>
            <span>:Social Network Services</span>
            <span>:i18n Dropdown</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
