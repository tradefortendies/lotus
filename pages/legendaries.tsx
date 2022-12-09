import type { NextPage } from 'next'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FAQ: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      gsap.to('#masthead > h1', {
        opacity: 1,
        duration: 0.75,
      })

      gsap.to('#legendaries', {
        opacity: 1,
        duration: 0.75,
      })
    }, 1000)
  }, [])

  return (
    <>
      <Meta title="Legendaries" />
      <>
        <Header
          position="slide"
          linkColor="white"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full text-white bg-neutral-900 pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                <div
                  id="masthead"
                  className="flex items-center justify-between gap-4"
                >
                  <h1 className="w-full font-mono text-4xl opacity-0 mb-28 sm:text-6xl lg:text-7xl">
                    Legendaries
                  </h1>
                </div>
                <div
                  id="legendaries"
                  className="flex flex-col items-center justify-center w-full opacity-0"
                >
                  <h2 className="mb-6 font-sans text-4xl">The Bride</h2>
                  <img src="/img/legendary-grid.jpg" />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default FAQ
