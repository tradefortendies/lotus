import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { gsap } from 'gsap'
import faqs from '../data/faq'
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
    }, 1000)
  }, [])

  return (
    <>
      <Meta title="Frequently Asked Questions" />
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
                  <h1 className="w-full mb-20 font-mono text-6xl opacity-0 lg:text-7xl">
                    Legendaries
                  </h1>
                </div>
                <div id="legendaries"></div>
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
