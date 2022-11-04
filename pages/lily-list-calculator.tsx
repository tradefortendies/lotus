import type { NextPage } from 'next'
import { useState, useContext } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'
import { BsArrowRight, BsArrowDown } from 'react-icons/bs'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LilyListCalculator: NextPage = () => {
  const theme = useContext(ThemeContext)
  const [lotusCount, setLotusCount] = useState<number>(0)
  const lotusLimit = 10

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
                  <div
                    className="relative w-full px-8 pt-12 pb-16 text-center rounded-md text-lily-black"
                    style={{ background: theme.primaryColor }}>
                    <h2 className="text-2xl">Lotuses</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button
                        onClick={() => {
                          if (lotusCount <= 0) {
                            return
                          }

                          setLotusCount(lotusCount - 1)
                        }}
                        className={clsx(
                          'p-4 transition bg-white rounded-full hover:scale-110',
                          lotusCount <= 0 &&
                            'opacity-50 cursor-default hover:scale-100'
                        )}>
                        <AiOutlineMinus />
                      </button>
                      <span className="px-12 py-4 bg-white rounded-full">
                        <>{new Intl.NumberFormat('en-US').format(lotusCount)}</>
                      </span>
                      <button
                        onClick={() => {
                          if (lotusCount >= lotusLimit) {
                            return
                          }

                          setLotusCount(lotusCount + 1)
                        }}
                        className={clsx(
                          'p-4 transition bg-white rounded-full hover:scale-110',
                          lotusCount >= lotusLimit &&
                            'opacity-50 cursor-default hover:scale-100'
                        )}>
                        <AiOutlinePlus />
                      </button>
                    </div>

                    <p
                      className={clsx(
                        'absolute w-full text-sm text-center -translate-x-1/2 text-lily-black bottom-6 left-1/2 opacity-0 transition',
                        lotusCount >= lotusLimit && 'opacity-100'
                      )}>
                      Nice try! However, there are only 4,000 Lotuses.
                    </p>
                  </div>
                  <BsArrowRight className="hidden text-5xl text-white md:block" />
                  <BsArrowDown className="text-2xl text-white md:hidden" />
                  <div
                    className="w-full px-8 pt-12 pb-16 text-center rounded-md text-lily-black"
                    style={{ background: theme.primaryColor }}>
                    <h2 className="text-2xl">LILY List</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <span className="px-12 py-4 bg-white rounded-full">
                        {new Intl.NumberFormat('en-US').format(lotusCount)}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://magiceden.io/marketplace/lotus_gang_nft"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-12 mx-auto flex items-center justify-center gap-1 rounded-full uppercase text-neutral-900 w-[130px] h-[130px] transition duration-1000 hover:rotate-[360deg]"
                  style={{
                    backgroundColor: theme.primaryColor,
                  }}>
                  Buy Now
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.46702 14.583L14.3059 5.74412"
                      stroke="#222222"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3059 14.0762V5.74284H5.97257"
                      stroke="#222222"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
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
