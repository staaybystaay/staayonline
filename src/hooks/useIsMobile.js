import { useState, useEffect } from 'react'

/**
 * Returns true when the viewport width is at or below the given breakpoint.
 * Default breakpoint matches the .desktop-only / .mobile-only CSS toggle (860px).
 */
export function useIsMobile(breakpoint = 860) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  )

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
