import { useI18n } from '@/hooks/useI18n'
import { cn } from '@/utils/cn'

interface ErrorProps extends React.HTMLAttributes<HTMLElement> {
  /** @deprecated */
  back?: string
}

const Error = ({ className }: ErrorProps) => {
  const { t } = useI18n()
  const back = () => {
    if (window && window.history) {
      history.back()
    }
  }
  
  return (
    <div class={cn`absolute inset-0 flex items-center justify-center ${className}`}>
      <div class='flex flex-col items-start text-xl'>
        {t(
          'error.msg',
          '404 <> Sorry, Page not found. <> Would you like to explore elsewhere?'
        )?.split('<>').map((msg, index) => (
          <span
            key={index}
            class={cn`opacity-30 ${index === 0 && 'mb-1.5 text-5xl font-bold opacity-60'}`}
          >
            {msg}
          </span>
        ))}
        <button
          class='ml-auto hover:text-rose-400 opacity-70 underline cursor-pointer'
          onClick={back}
        >
          <span>{t('error.explorer', 'Interact to explore')}</span>
        </button>
        <span class='mt-4 text-lg opacity-0'>{t('error.hidden', 'There\'s a lot hidden in this site.')}</span>
      </div>
    </div>
  )
}

export default Error
