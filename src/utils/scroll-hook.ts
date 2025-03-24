import { useEffect, useState } from 'preact/hooks'

/**
 * A scroll function like this
 * @param max Specifies the maximum scroll range (%)
 * @param level Specifies the number of scrollable times
 */
export const useScroll = (max: number = 100, level: number = 5) => {
  const scrollLevel = level - 1

  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentViewLevel, setCurrentViewLevel] = useState(0)
  
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchDistance, setTouchDistance] = useState(0)
  const [touchDirection, setTouchDirection] = useState<'x' | 'y' | null>(null)

  const to = (value: number) => {
    if (value < 0 || value > scrollLevel) return
    setCurrentViewLevel(value)
  }

  const handleScroll = (event: WheelEvent) => {
    const isCombo = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey

    if (!isCombo) {
      setScrollProgress(prev => {
        const newProgress = prev + (event.deltaY > 0 ? (max / scrollLevel) : -(max / scrollLevel))
        const minmaxProgress = Math.max(0, Math.min(max, newProgress))
        const currentLevel = Math.floor(minmaxProgress / (max / scrollLevel))
        
        setCurrentViewLevel(currentLevel)
        return minmaxProgress
      })
    }
  }

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
  }

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0]
    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY
    let distance = Math.sqrt((deltaX ** 2) + (deltaY ** 2))

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setTouchDirection('x')
      const negPosDirection = deltaX > 0 ? -1 : 1
      distance *= negPosDirection
    } else {
      setTouchDirection('y')
      const negPosDirection = deltaY > 0 ? -1 : 1
      distance *= negPosDirection
    }

    setTouchDistance(Math.round(distance))
  }
  
  const handleTouchEnd = () => {
    setTouchDistance(0)
    setTouchDirection(null)
  }

  useEffect(() => {
    const newProgress = (max / scrollLevel) * currentViewLevel
    setScrollProgress(newProgress)
  }, [currentViewLevel, setScrollProgress])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [touchStartX, touchStartY])

  return {
    progress: scrollProgress,
    current: currentViewLevel,
    touch: {
      distance: touchDistance,
      direction: touchDirection,
    },
    to,
  }
}
