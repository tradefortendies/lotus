import type { NextPage } from 'next'
import { useState, useContext, Fragment } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'
import { BsArrowRight, BsArrowDown } from 'react-icons/bs'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import Confetti from 'react-confetti'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const VibeMeter: NextPage = () => {
  const theme = useContext(ThemeContext)

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
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                <div
                  id="masthead"
                  className="flex flex-col justify-between gap-4 lg:gap-32 lg:items-center lg:flex-row"
                >
                  <h1 className="w-full font-mono text-6xl lg:text-7xl">
                    Vibemeter
                  </h1>
                  <h2 className="font-sans text-xl lg:text-[29px] leading-normal">
                    As the market leaders of the miscellaneous calculation
                    industry - we developed a way to calculate the vibe of the
                    commmunity at any point in time using our patented
                    algorithm.
                  </h2>
                </div>

                <div>Hello</div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default VibeMeter
