import { useEffect, useRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Marquee from 'react-fast-marquee'
import clsx from 'clsx'
import { ThemeContext } from '../Theme'

function LoadingCursor() {
  const router = useRouter()
  const loadingRefContainer = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [show, setShow] = useState(false)
  const [mouseCoords, setMouseCoords] = useState([0, 0])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (!loadingRef.current) {
        return
      }
      setShow(true)
    })
    router.events.on('routeChangeComplete', () => {
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
      setMouseCoords([e.clientX, e.clientY])

      if (!loadingRef.current || !loadingRefContainer.current || !show) {
        return
      }

      loadingRefContainer.current.classList.add('opacity-100')
      loadingRef.current.style.left = e.clientX + 'px'
      loadingRef.current.style.top = e.clientY + 'px'
    })

    document.addEventListener('mouseleave', () => {
      if (!loadingRefContainer.current) {
        return
      }

      loadingRefContainer.current.classList.remove('opacity-100')
    })
  }, [])

  return (
    <>
      <div
        ref={loadingRefContainer}
        id="loading-cursor"
        className={clsx('opacity-0', show && 'opacity-100')}
      >
        {mouseCoords[0] > 0 && mouseCoords[1] > 0 && (
          <div
            ref={loadingRef}
            className={clsx(
              'py-1 px-0 text-xs top-[500px] text-neutral-800 uppercase fixed z-[9999999] transition pointer-events-none'
            )}
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Marquee gradient={false} speed={120}>
              Loading
            </Marquee>
          </div>
        )}
      </div>
    </>
  )
}

export default LoadingCursor
