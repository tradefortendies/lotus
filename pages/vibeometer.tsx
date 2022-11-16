import type { NextPage } from 'next'
import { useEffect, useState, useContext, Fragment } from 'react'
import GaugeChart from 'react-gauge-chart'
import { Dialog, Transition } from '@headlessui/react'
import Confetti from 'react-confetti'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const VibeoMeter: NextPage = () => {
  const theme = useContext(ThemeContext)
  const [percent, setPercent] = useState(0)
  const [wlModal, setWlModal] = useState<boolean>(false)
  const finalPercent = 0.9

  const calculate = () => {
    if (!percent) {
      setPercent(finalPercent)
      return
    }

    setPercent(0)
    setTimeout(() => {
      setPercent(finalPercent)
    }, 1000)
  }

  useEffect(() => {
    setTimeout(() => {
      const gauge = document.querySelector('#gauge') as HTMLDivElement

      if (!gauge) {
        return
      }

      const text = gauge.querySelector('.text-group text') as HTMLDivElement

      if (!text) {
        return
      }

      text.style.transform = 'scale(0.7)'
      gauge.style.opacity = '1'
    }, 1000)
  }, [])

  return (
    <>
      <Meta title="Vibeometer" />
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
                  className="flex flex-col justify-between gap-4 lg:gap-32 lg:items-start lg:flex-row"
                >
                  <div>
                    <h1 className="w-full font-mono text-6xl lg:text-7xl">
                      Vibeometer
                    </h1>
                    <div className="flex flex-row gap-4">
                      <Button
                        type="pill-outline"
                        className="mt-8"
                        onClick={() => calculate()}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = theme.primaryColor
                          e.target.style.color = '#303030'
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = theme.primaryColor
                        }}
                      >
                        Calculate
                      </Button>
                      <Button
                        type="pill-outline"
                        className="mt-8"
                        onClick={() => setWlModal(true)}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = theme.primaryColor
                          e.target.style.color = '#303030'
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = theme.primaryColor
                        }}
                      >
                        LILY List
                      </Button>
                    </div>
                  </div>
                  <h2 className="font-sans text-xl lg:text-[29px] leading-normal">
                    As the market leaders of the miscellaneous calculation
                    industry - we developed a way to calculate the vibe of the
                    commmunity at any point in time using our patented
                    algorithm.
                  </h2>
                </div>

                <div
                  id="gauge"
                  className="mt-16 transition duration-500 opacity-0 lg:mt-24 lg:mx-48"
                >
                  <GaugeChart
                    id="vibeometer"
                    nrOfLevels={5}
                    colors={[
                      '#7FFFB9',
                      '#FFD462',
                      '#FF9596',
                      '#91B9FF',
                      '#61FEFF',
                    ]}
                    percent={percent}
                    animDelay={0}
                    animateDuration={2000}
                    formatTextValue={(value) => {
                      const numVal = Number(value)
                      let str = ''

                      if (numVal > 0 && numVal <= 20) {
                        str = 'AAAAAAAA'
                      } else if (numVal > 20 && numVal <= 40) {
                        str = 'YOOOOOO'
                      } else if (numVal > 40 && numVal <= 60) {
                        str = 'chillin'
                      } else if (numVal > 60 && numVal <= 80) {
                        str = 'moderately vibing'
                      } else if (numVal > 80 && numVal <= 100) {
                        str = 'HYPE'
                      }

                      return str
                    }}
                  />
                </div>
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
                        Curiosity killed the cat but it has given YOU a LILY
                        List code. Claim it our #💌|wl-code-redemption discord
                        channel before someone else does.
                      </p>

                      <p className="my-6 text-xl font-bold uppercase">
                        NDN6CNE7
                        {/* K62HRJPZ */}
                        {/* HWKFYUX2 */}
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

export default VibeoMeter
