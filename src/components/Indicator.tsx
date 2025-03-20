export const Indicator = ({ elevator }: { elevator: boolean[] }) => {
  return (
    <div class='absolute left-0 right-0 bottom-0 flex flex-row items-center justify-center gap-2 h-12 z-100'>
    {elevator.map((isActive) => (
      <span class={`block w-6 h-1.5 bg-white/30 rounded-sm transition-all duration-300 ${
        isActive || 'opacity-20'
      }`}></span>
    ))}
    </div>
  )
}
