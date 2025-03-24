import { useEffect, useState } from 'preact/hooks'

interface SlideProps {
  delay?: number
  from?: 'left' | 'top' | 'right' | 'bottom'
}

const Loading = ({ delay = 175, from = 'bottom' }: SlideProps) => {
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setSliding(true), delay)
    return () => clearTimeout(id)
  }, [])

  return (
    <div
      class='absolute inset-0 bg-black transition-all overflow-hidden z-200'
      style={{
        translate: !sliding ? '0 0'
          : from === 'left' ? '100% 0'
          : from === 'top'  ? '0 100%'
          : from === 'right'? '-100% 0'
          : /** to-bottom  */ '0 -100%'
      }}
    ></div>
  )
}

export default Loading
