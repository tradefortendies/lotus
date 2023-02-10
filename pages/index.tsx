import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext } from 'react'
import { gsap } from 'gsap'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeContext } from '../components/Theme'

const Home: NextPage = () => {
  const bgRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (!bgRef.current) {
      return
    }

    const loadingCursor: HTMLDivElement = document.querySelector(
      '#loading-cursor'
    ) as HTMLDivElement

    document.documentElement.scrollTo(0, 0)
    disableBodyScroll(bgRef.current)

    setIsLoading(true)
    if (loadingCursor) {
      loadingCursor.style.opacity = '1'
    }

    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (!bgRef.current) {
          return
        }

        bgRef.current.style.zIndex = '1'
        document.documentElement.scrollTo(0, 0)

        const introTl = gsap.timeline({ repeat: 0 })
        introTl.to('#main', { y: 0, duration: 0.75, ease: 'power2.out' })
      })

      setTimeout(() => {
        if (!bgRef.current) {
          return
        }

        setIsLoading(false)
        enableBodyScroll(bgRef.current)

        if (loadingCursor) {
          loadingCursor.style.opacity = null as any
        }

        if (window.innerWidth < 500) {
          return
        }

        document.documentElement.style.scrollBehavior = 'smooth'
      }, 1500)
    }, 2000)
  }, [])

  return (
    <>
      <Meta
        title={
          isLoading ? 'Loading Lotus...' : 'Lotus - a community of optimalists'
        }
        desc="The landing page of Web3."
      />
      <>
        <div
          ref={bgRef}
          className="fixed -top-[40px] md:top-0 z-50 w-screen h-screen bg-neutral-800"
        >
          <svg
            viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="object-cover w-full h-full"
          >
            <g>
              <rect
                width={windowDimensions.width}
                height={
                  windowDimensions.height - (windowDimensions.height / 100) * 10
                }
                fill="white"
              />
              <rect width="16.666666667%" height="90%" fill="#F9F7EF" />
              <rect y="90%" width="16.666666667%" height="10%" fill="#422F2E" />
              <rect
                x="16.666666667%"
                width="16.666666667%"
                height="90%"
                fill="#7FFFB9"
              />
              <rect
                x="16.666666667%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#91B9FF"
              />
              <rect
                x="33.333333334%"
                width="16.666666667%"
                height="90%"
                fill="#FFD462"
              />
              <rect
                x="33.333333334%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#422F2E"
              />
              <rect
                x="50.000000001%"
                width="16.666666667%"
                height="90%"
                fill="#FF9596"
              />
              <rect
                x="50.000000001%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#00CCCC"
              />
              <rect
                x="66.666666668%"
                width="16.666666667%"
                height="90%"
                fill="#91B9FF"
              />
              <rect
                x="66.666666668%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#422F2E"
              />
              <rect
                x="83.333333335%"
                width="16.666666667%"
                height="90%"
                fill="#61FEFF"
              />
              <rect
                x="83.333333335%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#F9F7EF"
              />
            </g>
          </svg>
        </div>
        <Header
          position="slide"
          fadeInAnimation={true}
          colorChangeAnimation={true}
        />
        <div
          id="main"
          className="w-screen min-h-screen text-neutral-900 translate-y-[100vh] relative z-20"
        >
          <div className="relative bg-lily-black">
            <div className="relative z-10">
              <div
                id="content"
                className="flex flex-col relative w-full items-center justify-center lg:min-h-[900px] h-[100vh] bg-white text-neutral-900"
              >
                <div className="w-full mx-auto font-sans max-w-7xl">
                  <div className="w-3/5 space-y-4">
                    <h2 className="text-3xl">
                      To create the best community in the new web
                    </h2>
                    <h3 className="text-3xl">
                      We are working on the <strong>LILY Pad</strong>, the{' '}
                      <strong>Lotus Library</strong> and{' '}
                      <strong>The Blueprint</strong>.
                    </h3>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 flex w-full">
                  <div className="w-1/5 h-3 bg-lily-green"></div>
                  <div className="w-1/5 h-3 bg-lily-yellow"></div>
                  <div className="w-1/5 h-3 bg-lily-red"></div>
                  <div className="w-1/5 h-3 bg-lily-blue-dark"></div>
                  <div className="w-1/5 h-3 bg-lily-blue"></div>
                </div>
              </div>
            </div>
          </div>
          <Footer isLoading={isLoading} />
        </div>
      </>
    </>
  )
}

export default Home
