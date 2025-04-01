import { AnimatePresence, motion } from 'motion/react'
import { XIcon } from 'lucide-preact'
import { cn } from '@/utils/cn'
import { elementGetter } from '@/utils/element-getter'
import type { DialogProps } from '@/types/dialog'

export const DialogHeader = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  return (<>{children}</>)
}

const Dialog = ({ open = true, stateChanged, children }: DialogProps) => {
  const changeState = (state: boolean) => {
    open = state
    if (stateChanged) {
      stateChanged(open)
    }
  }

  const [header, ...content] = elementGetter(DialogHeader.name, children)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          class='absolute inset-0 flex items-center justify-center p-2 sm:p-8 bg-black/45 backdrop-blur-xs z-150'
        >
          <div
            class='absolute inset-0'
            onClick={() => changeState(false)}
          ></div>
          <div class={cn`
            flex flex-col sm:flex-col w-full max-w-full sm:max-w-md h-full sm:h-auto bg-black
            border border-neutral-200/15 rounded-md z-1 transition-opacity
            [&>*:nth-child(2)]:border-t
            ${header
              ? '[&>*:nth-child(2)]:border-neutral-200/15'
              : '[&>*:nth-child(2)]:border-transparent'}
          `}>
            <div class='flex flex-row'>
              <div class='flex flex-row items-center gap-2 px-2 py-1 m-1 w-full text-neutral-50/45'>
                {header}
              </div>
              <div class={cn`
                relative flex items-center justify-center min-h-[2.25rem] border-l
                ${header
                  ? 'border-neutral-200/15'
                  : 'border-transparent'}
              `}>
                <button
                  class='group/search-close px-2 focus-within:[&>div]:bg-neutral-200/8 outline-0 cursor-pointer'
                  onClick={() => changeState(false)}
                >
                  <div class={cn`
                    absolute inset-0 m-1 group-hover/search-close:bg-neutral-200/8
                    rounded-sm pointer-events-none transition-colors
                  `}></div>
                  <XIcon width={21} height={21} strokeWidth={0.75} />
                </button>
              </div>
            </div>
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Dialog
