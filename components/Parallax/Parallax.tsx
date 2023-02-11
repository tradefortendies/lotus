import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useTransform,
  useSpring,
  useReducedMotion,
  useScroll,
} from 'framer-motion'

type Parllax = {
  children: JSX.Element
  offset?: number
  clampInitial?: number
  clampFinal?: number
}

const Parallax = ({
  children,
  offset = 50,
  clampInitial,
  clampFinal,
}: Parllax) => {
  const prefersReducedMotion = useReducedMotion()
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  const { scrollY } = useScroll()

  const initial = elementTop - clientHeight
  const final = elementTop + offset

  const yRange = useTransform(
    scrollY,
    [initial, final],
    [clampInitial ? 0 : offset, clampFinal ? 0 : -offset]
  )
  const y = useSpring(yRange, { stiffness: 400, damping: 90 })

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const onResize = () => {
      setElementTop(
        element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      )
      setClientHeight(window.innerHeight)
      setClientWidth(window.innerWidth)
    }

    onResize()

    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export default Parallax
