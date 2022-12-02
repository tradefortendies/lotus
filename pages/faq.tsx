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

      gsap.to('#faqs > div', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
        delay: 1,
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
                    Burning Questions
                  </h1>
                </div>
                <div id="faqs">
                  {faqs.map((faq, index) => {
                    return (
                      <div
                        key={index}
                        className="relative w-full mb-5 font-sans bg-white rounded-lg opacity-0 text-neutral-900 group"
                      >
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="w-full px-5 py-6 text-lg text-left cursor-pointer lg:py-8 lg:px-8 lg:text-2xl">
                                {faq.question}
                              </Disclosure.Button>
                              <Disclosure.Panel>
                                <div className="px-6 pt-0 pb-8 leading-loose lg:w-3/4 lg:px-8">
                                  {faq.answer}
                                </div>
                              </Disclosure.Panel>

                              {!open && (
                                <span className="transition-transform duration-1000 group-hover:rotate-[180deg] absolute text-4xl lg:text-5xl right-5 top-[18px] lg:top-[25px] pointer-events-none">
                                  +
                                </span>
                              )}
                              {open && (
                                <span className="absolute text-4xl lg:text-5xl right-6 top-[15px] lg:top-[22px] pointer-events-none">
                                  -
                                </span>
                              )}
                            </>
                          )}
                        </Disclosure>
                      </div>
                    )
                  })}
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
