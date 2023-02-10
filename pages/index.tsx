import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Panel from '../components/Panel'

const Home: NextPage = () => {
  const bgRef = useRef<HTMLDivElement>(null)
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
      if (!bgRef.current) {
        return
      }

      console.log('hello?')

      document.documentElement.scrollTo(0, 0)

      setTimeout(() => {
        if (!bgRef.current) {
          return
        }

        bgRef.current.classList.add('opacity-0')
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
    }, 1000)
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
          className="fixed flex flex-col-reverse 0 transition-opacity duration-1000 z-[9999] w-screen h-screen bg-neutral-800"
        >
          <div className="w-screen h-1/5 bg-lily-green"></div>
          <div className="w-screen h-1/5 bg-lily-yellow"></div>
          <div className="w-screen h-1/5 bg-lily-red"></div>
          <div className="w-screen h-1/5 bg-lily-blue-dark"></div>
          <div className="w-screen h-1/5 bg-lily-blue"></div>
        </div>
        {/* <div
          id="intro2"
          className="absolute z-[9999] top-0 translate-y-[100vh] left-0 w-screen h-screen transition duration-500 bg-blue-400 rounded-b-3xl"
        ></div> */}
        <Header
          position="slide"
          fadeInAnimation={true}
          colorChangeAnimation={true}
        />
        <div
          id="main"
          className="relative z-20 w-screen min-h-screen transition-opacity duration-500 text-neutral-900"
        >
          {/* <Panel>
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
          </Panel> */}
          <Panel floating={false} first={true}>
            Panel 1
          </Panel>
          <Panel floating={true}>Panel 2</Panel>
          <Panel floating={false}>Panel 3</Panel>
          <Panel floating={true}>Panel 4</Panel>
          <Panel floating={false} last={true}>
            Panel 5
          </Panel>
          <Footer isLoading={isLoading} />
        </div>
      </>
    </>
  )
}

export default Home
