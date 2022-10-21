import { useEffect, useRef, useContext } from 'react'
import Marquee from 'react-fast-marquee'
import { ThemeContext } from '../Theme'

function LoadingCursor() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      if (!loadingRef.current) {
        return
      }

      loadingRef.current.style.opacity = '1'
      loadingRef.current.style.left = e.clientX + 'px'
      loadingRef.current.style.top = e.clientY + 'px'
    })

    document.addEventListener('mouseleave', () => {
      if (!loadingRef.current) {
        return
      }

      loadingRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <div
      ref={loadingRef}
      className="py-1 px-0 text-xs top-[500px] text-neutral-800 uppercase fixed opacity-0 z-[60] transition pointer-events-none"
      style={{ backgroundColor: theme.primaryColor }}>
      <Marquee gradient={false} speed={120}>
        Loading
      </Marquee>
    </div>
  )
}

export default LoadingCursor
