import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Fade } from 'react-awesome-reveal'
import { useWindowSize } from '../hooks/useWindowSize'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Hero } from '../components/Home/Hero'
import { Collections } from '../components/Home/Collections'
import { Blueprint } from '../components/Home/Blueprint'
import { Legendaries } from '../components/Home/Legendaries'
import { LilyPad } from '../components/Home/LilyPad'
import { Library } from '../components/Home/Library'
import { Community } from '../components/Home/Community'
import { Experiments } from '../components/Home/Experiments'
import Button from '../components/Button'
import legendariesData from '../data/legendaries.json'

const legendaries = legendariesData.legendaries

const Home: NextPage = () => {
  const theme = useContext(ThemeContext)
  const bgRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const windowDimensions = useWindowSize()

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

    setTimeout(() => {
      if (!bgRef.current) {
        return
      }

      document.documentElement.scrollTo(0, 0)

      setTimeout(() => {
        if (!bgRef.current || !mainRef.current) {
          return
        }

        mainRef.current.classList.remove('translate-y-[100vh]')
        setIsLoading(false)
        enableBodyScroll(bgRef.current)

        if (loadingCursor) {
          loadingCursor.style.opacity = null as any
        }

        if (windowDimensions.width < 500) {
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
          className="fixed -top-[40px] md:top-0 z-40 w-screen h-screen bg-neutral-800"
        >
          <div className="w-screen h-1/5 bg-lily-green"></div>
          <div className="w-screen h-1/5 bg-lily-yellow"></div>
          <div className="w-screen h-1/5 bg-lily-red"></div>
          <div className="w-screen h-1/5 bg-lily-blue-dark"></div>
          <div className="w-screen h-1/5 bg-lily-blue"></div>
        </div>
        <Header
          position="slide"
          fadeInAnimation={true}
          colorChangeAnimation={true}
        />
        <div
          id="main"
          ref={mainRef}
          className="relative duration-700 transition-transform translate-y-[100vh] z-50 w-screen min-h-screen font-sans tracking-tighter text-neutral-900 overflow-hidden"
        >
          <Hero />
          <Collections />
          <Blueprint />
          <Legendaries />
          <Library />
          <LilyPad />
          <Community />
          <Experiments />

          <div className="relative">
            <div className="absolute w-full h-10 bg-white rounded-b-3xl -top-5" />
            <div className="text-white bg-lily-black">
              <div className="flex flex-col justify-center w-full gap-4 px-4 pb-32 mx-auto pt-36 max-w-screen-lily-container">
                <Fade duration={500} delay={400} fraction={0}>
                  <h2 className="text-4xl font-bold text-center lg:text-6xl">
                    How can I get involved?
                  </h2>
                </Fade>
                <div className="flex flex-col items-center justify-center gap-4 mt-8 lg:gap-8 lg:flex-row">
                  <Fade
                    cascade={true}
                    duration={500}
                    delay={400}
                    damping={0.35}
                    fraction={0}
                  >
                    <Button type="pill-outline">Buy LILY</Button>
                    <Button type="pill-outline">Buy Lotus Gang</Button>
                    <Button type="pill-outline">Learn Something</Button>
                  </Fade>
                </div>
              </div>
            </div>
            <Footer isLoading={isLoading} />
          </div>
        </div>
      </>
    </>
  )
}

export default Home
