import type { NextPage } from 'next'
import { useState } from 'react'
import { gsap } from 'gsap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LilyListCalculator: NextPage = () => {
  return (
    <>
      <Meta title="LILY List Calculator" />
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
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl"></div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default LilyListCalculator
