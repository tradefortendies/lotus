import type { NextPage } from 'next'
import { useState } from 'react'
import { gsap } from 'gsap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BsArrowRight } from 'react-icons/bs'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

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
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto text-center lg:px-8 lg:pt-56 max-w-7xl">
                <h1 className="w-full mb-20 font-mono text-6xl lg:text-7xl">
                  <strong>LILY</strong> <strong>List</strong> Calculator
                </h1>

                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                  <div className="w-full px-8 pt-12 pb-16 text-center rounded-md bg-lily-red text-lily-black">
                    <h2 className="text-2xl">Lotuses</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button className="p-4 transition bg-white rounded-full hover:scale-105">
                        <AiOutlineMinus />
                      </button>
                      <span className="px-12 py-4 bg-white rounded-full">
                        1
                      </span>
                      <button className="p-4 transition bg-white rounded-full hover:scale-105">
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                  <BsArrowRight className="text-5xl text-white" />
                  <div className="w-full px-8 pt-12 pb-16 text-center rounded-md bg-lily-red text-lily-black">
                    <h2 className="text-2xl">LILY List</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <span className="px-12 py-4 bg-white rounded-full">
                        1
                      </span>
                    </div>
                  </div>
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

export default LilyListCalculator
