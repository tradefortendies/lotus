import { useEffect, useRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Marquee from 'react-fast-marquee'
import clsx from 'clsx'
import { ThemeContext } from '../Theme'

function LoadingCursor() {
  const router = useRouter()
  const loadingRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [show, setShow] = useState(false)
  const [mouseCoords, setMouseCoords] = useState([0, 0])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      console.log('route started')
      if (!loadingRef.current) {
        return
      }
      setShow(true)
    })
    router.events.on('routeChangeComplete', () => {
      console.log('route complete')
      setTimeout(() => setShow(false), 1000)
    })
    router.events.on('routeChangeError', () => setShow(false))
  }, [router])

  useEffect(() => {
    if (!loadingRef.current) {
      return
    }
    loadingRef.current.style.left = mouseCoords[0] + 'px'
    loadingRef.current.style.top = mouseCoords[1] + 'px'
  }, [mouseCoords])

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      console.log([e.clientX, e.clientY])
      setMouseCoords([e.clientX, e.clientY])

      if (!loadingRef.current || !show) {
        return
      }

      loadingRef.current.classList.add('opacity-100')
      loadingRef.current.style.left = e.clientX + 'px'
      loadingRef.current.style.top = e.clientY + 'px'
    })

    document.addEventListener('mouseleave', () => {
      if (!loadingRef.current) {
        return
      }

      loadingRef.current.classList.remove('opacity-100')
    })
  }, [])

  return (
    <div
      ref={loadingRef}
      className={clsx(
        'py-1 px-0 text-xs top-[500px] text-neutral-800 uppercase fixed opacity-0 z-[9999999] transition pointer-events-none',
        show && 'opacity-100'
      )}
      style={{ backgroundColor: theme.primaryColor }}
    >
      <Marquee gradient={false} speed={120}>
        Loading
      </Marquee>
    </div>
  )
}

export default LoadingCursor
