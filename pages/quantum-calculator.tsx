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

const QuantumCalculator: NextPage = () => {
  const theme = useContext(ThemeContext)
  const [lotusCount, setLotusCount] = useState<number>(0)
  const [wlModal, setWlModal] = useState<boolean>(false)
  const lotusLimits = {
    upper: 4000,
    lower: 0,
  }

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
                    LILY List?
                  </h1>
                  <h2 className="font-sans text-xl lg:text-[29px] leading-normal">
                    We developed a zero-knowledge quantum blockchain calculator
                    to help answer the question of how to get LILY Listed.
                  </h2>
                </div>

                <div className="flex flex-col items-center justify-between gap-8 mt-16 text-center md:flex-row">
                  <div
                    className="relative w-full px-8 pt-12 pb-16 text-center rounded-md text-lily-black"
                    style={{ background: theme.primaryColor }}
                  >
                    <h2 className="text-2xl">Lotuses</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button
                        onClick={() => {
                          if (lotusCount <= lotusLimits.lower) {
                            return
                          }

                          setLotusCount(lotusCount - 1)
                        }}
                        className={clsx(
                          'p-4 transition bg-white rounded-full hover:scale-110',
                          lotusCount <= lotusLimits.lower &&
                            'opacity-50 cursor-default hover:scale-100'
                        )}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="px-12 py-4 bg-white rounded-full">
                        <>{new Intl.NumberFormat('en-US').format(lotusCount)}</>
                      </span>
                      <button
                        onClick={() => {
                          if (lotusCount >= lotusLimits.upper) {
                            return
                          } else if (lotusCount >= lotusLimits.upper - 1) {
                            setWlModal(true)
                          }

                          setLotusCount(lotusCount + 1)
                        }}
                        className={clsx(
                          'p-4 transition bg-white rounded-full hover:scale-110',
                          lotusCount >= lotusLimits.upper &&
                            'opacity-50 cursor-default hover:scale-100'
                        )}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>

                    <p
                      className={clsx(
                        'absolute w-full text-sm text-center -translate-x-1/2 text-lily-black bottom-6 left-1/2 opacity-0 transition',
                        lotusCount >= lotusLimits.upper && 'opacity-100'
                      )}
                    >
                      Nice try! However, there are only 4,000 Lotuses.
                    </p>
                  </div>
                  <BsArrowRight className="hidden text-5xl text-white md:block" />
                  <BsArrowDown className="text-2xl text-white md:hidden" />
                  <div
                    className="w-full px-8 pt-12 pb-16 text-center rounded-md text-lily-black"
                    style={{ background: theme.primaryColor }}
                  >
                    <h2 className="text-2xl">LILY List</h2>

                    <div className="flex items-center justify-center gap-4 mt-8">
                      <span className="px-12 py-4 bg-white rounded-full">
                        {new Intl.NumberFormat('en-US').format(lotusCount)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  href="https://magiceden.io/marketplace/lotus_gang_nft"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 mr-auto"
                  type="pill-outline"
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = theme.primaryColor
                    e.target.style.color = '#303030'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = theme.primaryColor
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        {wlModal && <Confetti />}

        <Transition appear show={wlModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setWlModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl px-6 py-12 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:px-20 rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      Congratulations!
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        You hacked the quantum calculator and for that we are
                        rewarding you with a LILY list code. Claim it our
                        #💌|wl-code-redemption discord channel before someone
                        else does.
                      </p>

                      <p className="my-6 text-xl font-bold uppercase">
                        CDXGL9GD
                      </p>
                    </div>

                    <div className="mt-4">
                      <a
                        href="https://discord.gg/vs8VvHb35k"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-lily-black focus:outline-none"
                        style={{ background: theme.primaryColor }}
                        onClick={() => setWlModal(false)}
                      >
                        Claim on Discord
                      </a>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  )
}

export default QuantumCalculator
