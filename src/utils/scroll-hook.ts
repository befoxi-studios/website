import { useEffect, useState } from "preact/hooks"

/**
 * A scroll function like this
 * @param max Specifies the maximum scroll range (%)
 * @param level Specifies the number of scrollable times
 */
export const useScroll = (max: number = 100, level: number = 5) => {
  const scrollLevel = level - 1

  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentViewLevel, setCurrentViewLevel] = useState(0)

  const handleScroll = (event: WheelEvent) => {
    const isCombo = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey

    if (!isCombo) {
      setScrollProgress(prev => {
        const newProgress = prev + (event.deltaY > 0 ? max / scrollLevel : -(max / scrollLevel))
        const minmaxProgress = Math.max(0, Math.min(max, newProgress))
        const currentLevel = Math.floor(minmaxProgress / (max / scrollLevel))
        
        setCurrentViewLevel(currentLevel)
        return minmaxProgress
      })
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [])

  return {
    progress: scrollProgress,
    current: currentViewLevel,
  }
}
