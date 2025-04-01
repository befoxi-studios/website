const Background = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <div class='absolute inset-0 flex items-center justify-center pointer-events-none'>
      <span
        class='text-5xl font-bold blur transition-all duration-500'
        style={{
          opacity: `${8 - (Math.sqrt(scrollProgress) / 1.5)}%`,
          '--tw-blur': `blur(${scrollProgress / 2}px)`
        }}
      >
      </span>
    </div>
  )
}

export default Background
