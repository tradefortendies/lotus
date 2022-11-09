import type { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import GaugeChart from 'react-gauge-chart'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const VibeoMeter: NextPage = () => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const [percent, setPercent] = useState(0)
  const finalPercent = router.query.num ? Number(router.query.num) : 0.8

  useEffect(() => {
    setTimeout(() => {
      const gauge = document.querySelector('#gauge') as HTMLDivElement

      if (!gauge) {
        return
      }

      const text = gauge.querySelector('.text-group') as HTMLDivElement

      if (!text) {
        return
      }

      gauge.style.opacity = '1'
    }, 1000)
  }, [])

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
                  <div>
                    <h1 className="w-full font-mono text-6xl lg:text-7xl">
                      Vibeometer
                    </h1>
                    <Button
                      type="pill-outline"
                      className="mt-8"
                      onClick={() => {
                        if (!percent) {
                          setPercent(finalPercent)
                          return
                        }

                        setPercent(0)
                        setTimeout(() => {
                          setPercent(finalPercent)
                        }, 1000)
                      }}
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
                  className="mx-16 transition duration-500 opacity-0 mt-28"
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
                        str = 'in our vibe era'
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
      </>
    </>
  )
}

export default VibeoMeter
