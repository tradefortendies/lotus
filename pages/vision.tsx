import { useRef, useEffect, useState, useContext } from 'react'
import { useScroll, motion, transform } from 'framer-motion'
import { ThemeContext } from '../components/Theme'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import Meta from '../components/Meta'
import Header from '../components/Header'
import ScrollArrow from '../components/ScrollArrow'
import Button from '../components/Button'
import { Lift, Accelerate, Delight } from '../components/VisionCards'
import { Learning, Frisson, Growth } from '../components/ValuesCards'

const Section = ({ children }: { children: JSX.Element }) => {
  return (
    <div
      className="relative flex items-center justify-center h-screen"
      style={{ perspective: '500px' }}>
      <div className="w-full mx-auto max-w-7xl">{children}</div>
    </div>
  )
}

const VisionNew = () => {
  const headerContainer = useRef<HTMLDivElement>(null)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const scrollArrowContainer = useRef<HTMLDivElement>(null)
  const introPanelText = useRef<HTMLDivElement>(null)
  const introPanelNums = useRef<HTMLDivElement>(null)
  const visionLabels = useRef<HTMLDivElement>(null)
  const valuesLabels = useRef<HTMLDivElement>(null)
  const visionContainer = useRef<HTMLDivElement>(null)
  const visionCardLift = useRef<HTMLDivElement>(null)
  const visionCardAccelerate = useRef<HTMLDivElement>(null)
  const visionCardDelight = useRef<HTMLDivElement>(null)
  const valuesHeading = useRef<HTMLDivElement>(null)
  const valuesCardLearning = useRef<HTMLDivElement>(null)
  const valuesCardFrisson = useRef<HTMLDivElement>(null)
  const valuesCardGrowth = useRef<HTMLDivElement>(null)
  const valuesContainer = useRef<HTMLDivElement>(null)
  const finalContainer = useRef<HTMLDivElement>(null)
  const finalContainerContent = useRef<HTMLDivElement>(null)

  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [progressBar, setProgressBar] = useState(<></>)
  const [visionCards, setVisionCards] = useState(<></>)
  const [valuesCards, setValuesCards] = useState(<></>)
  const [scrollArrowColor, setScrollArrowColor] = useState('text-lily-black')

  const theme = useContext(ThemeContext)

  const { scrollY } = useScroll({
    container: scrollContainer,
  })

  const spring = {
    type: 'spring',
    stiffness: 400,
    damping: 90,
    restSpeed: 0.5,
  }

  const cardSpring = {
    type: 'spring',
    stiffness: 600,
    damping: 120,
    restSpeed: 0.5,
  }

  let visionLabelsTimer: any = null

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    setTimeout(() => {
      if (
        !scrollArrowContainer.current ||
        !introPanelText.current ||
        !introPanelNums.current
      ) {
        return
      }

      scrollArrowContainer.current.style.opacity = '1'
      introPanelText.current.style.opacity = '1'
      introPanelNums.current.style.opacity = '.7'
    }, 1000)

    scrollY.onChange((latest) => {
      if (
        !scrollContainer.current ||
        !scrollArrowContainer.current ||
        !headerContainer.current ||
        !visionLabels.current ||
        !valuesLabels.current ||
        !visionContainer.current ||
        !valuesHeading.current ||
        !valuesContainer.current ||
        !finalContainer.current ||
        !finalContainerContent.current
      ) {
        return
      }

      setProgressBar(
        <motion.div
          className="fixed top-0 left-0 right-0 inline-block h-[6px] z-[9999] scale-x-0"
          transition={spring}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: transform([0, windowHeight * 18], [0, 1])(scrollY.get()),
          }}
          style={{
            transformOrigin: '0%',
            backgroundColor: theme.primaryColor,
          }}
        />
      )

      setVisionCards(
        <div className="relative w-[87%] translate-y-24 lg:translate-y-0 h-full mx-auto ml-auto lg:mr-0 lg:w-[80%]">
          <motion.div
            ref={visionCardLift}
            className="absolute top-[6vh] lg:top-[50%] right-4 2xl:right-0 -rotate-[40deg] -translate-y-[100vh]"
            transition={cardSpring}
            animate={{
              y: transform(
                [window.innerHeight * 4.7, window.innerHeight * 2.7],
                ['-50%', '300%']
              )(scrollY.get()),
              rotate: transform(
                [window.innerHeight * 4.7, window.innerHeight * 2.7],
                ['-7deg', '-40deg']
              )(scrollY.get()),
            }}>
            <Lift />
          </motion.div>
          <motion.div
            ref={visionCardAccelerate}
            className="absolute top-[6vh] lg:top-[50%] right-4 2xl:right-0 rotate-[40deg]"
            transition={cardSpring}
            animate={{
              y: transform(
                [window.innerHeight * 6.5, window.innerHeight * 2.7],
                ['-50%', '300%']
              )(scrollY.get()),
              rotate: transform(
                [window.innerHeight * 6.5, window.innerHeight * 2.7],
                ['7deg', '40deg']
              )(scrollY.get()),
            }}>
            <Accelerate />
          </motion.div>
          <motion.div
            ref={visionCardDelight}
            className="absolute top-[6vh] lg:top-[50%] right-4 2xl:right-0 -rotate-[40deg]"
            transition={cardSpring}
            animate={{
              y: transform(
                [window.innerHeight * 9, window.innerHeight * 2.7],
                ['-50%', '300%']
              )(scrollY.get()),
              rotate: transform(
                [window.innerHeight * 9, window.innerHeight * 2.7],
                ['-16deg', '-40deg']
              )(scrollY.get()),
            }}>
            <Delight />
          </motion.div>
        </div>
      )

      setValuesCards(
        <div className="relative w-[87%] -translate-x-[10px] lg:-translate-x-[0] -translate-y-[110px] h-full mx-auto ml-auto lg:mr-0 lg:w-[80%] lg:-translate-y-[80px]">
          <motion.div
            ref={valuesCardLearning}
            className="absolute top-[50%]"
            transition={cardSpring}
            animate={{
              y: transform(
                [window.innerHeight * 14, window.innerHeight * 12],
                ['-50%', '300%']
              )(scrollY.get()),
            }}>
            <Learning />
          </motion.div>
          <motion.div
            ref={valuesCardFrisson}
            className="absolute top-[50%]"
            transition={cardSpring}
            animate={{
              y: transform(
                [window.innerHeight * 16, window.innerHeight * 12],
                ['-50%', '300%']
              )(scrollY.get()),
            }}
            style={
              windowWidth > 500
                ? { x: '32px', top: 'calc(50% + 110px)' }
                : { x: '18px', top: 'calc(50% + 68px)' }
            }>
            <Frisson />
          </motion.div>
          <motion.div
            ref={valuesCardGrowth}
            className="absolute top-[50%]"
            transition={cardSpring}
            animate={{
              perspective: 500,
              y: transform(
                [window.innerHeight * 17.5, window.innerHeight * 12],
                ['-50%', '300%']
              )(scrollY.get()),
              z: 0.1,
            }}
            style={
              windowWidth > 500
                ? { x: '64px', top: 'calc(50% + 220px)' }
                : { x: '36px', top: 'calc(50% + 135px)' }
            }>
            <Growth />
          </motion.div>
        </div>
      )

      // intro section 1
      if (latest < window.innerHeight * 3) {
        visionContainer.current.style.opacity = '0'
        visionLabels.current.style.opacity = '0'
        valuesLabels.current.style.opacity = '0'
        headerContainer.current.style.opacity = '1'

        setScrollArrowColor('text-lily-black')

        clearTimeout(visionLabelsTimer)

        // vision section
      } else if (
        latest >= window.innerHeight * 3 &&
        latest < window.innerHeight * 9
      ) {
        visionContainer.current.style.opacity = '1'
        valuesContainer.current.style.opacity = '0'
        headerContainer.current.style.opacity = '0'
        valuesLabels.current.style.opacity = '0'

        const visionHomeBtn = visionLabels.current.querySelector(
          '[href="/"]'
        ) as HTMLButtonElement

        const valuesHomeBtn = valuesLabels.current.querySelector(
          '[href="/"]'
        ) as HTMLButtonElement

        if (visionHomeBtn) {
          visionHomeBtn.style.pointerEvents = 'auto'
        }

        if (valuesHomeBtn) {
          valuesHomeBtn.style.pointerEvents = 'none'
        }

        setScrollArrowColor('text-white')

        visionLabelsTimer = setTimeout(() => {
          if (!visionLabels.current) {
            return
          }

          visionLabels.current.style.opacity = '1'
        }, 1000)

        // values section 1
      } else if (
        latest >= window.innerHeight * 9 &&
        latest < window.innerHeight * 16.5
      ) {
        clearTimeout(visionLabelsTimer)

        valuesContainer.current.style.opacity = '1'
        valuesLabels.current.style.opacity = '1'
        scrollArrowContainer.current.style.opacity = '1'
        headerContainer.current.style.opacity = '0'
        finalContainer.current.style.opacity = '0'
        finalContainerContent.current.style.opacity = '0'

        const visionHomeBtn = visionLabels.current.querySelector(
          '[href="/"]'
        ) as HTMLButtonElement

        const valuesHomeBtn = valuesLabels.current.querySelector(
          '[href="/"]'
        ) as HTMLButtonElement

        if (visionHomeBtn) {
          visionHomeBtn.style.pointerEvents = 'none'
        }

        if (valuesHomeBtn) {
          valuesHomeBtn.style.pointerEvents = 'auto'
        }

        if (latest >= window.innerHeight * 12) {
          valuesHeading.current.style.opacity = '1'
          setScrollArrowColor('text-lily-black')
        } else {
          valuesHeading.current.style.opacity = '0'
          setScrollArrowColor('text-lily-white')
        }

        // final section
      } else if (latest >= window.innerHeight * 16.5) {
        finalContainer.current.style.opacity = '1'
        headerContainer.current.style.opacity = '0'

        // final content
        if (latest >= window.innerHeight * 21) {
          finalContainerContent.current.style.opacity = '1'
          scrollArrowContainer.current.style.opacity = '0'
        } else {
          finalContainerContent.current.style.opacity = '0'
          scrollArrowContainer.current.style.opacity = '1'
        }
      }
    })
  }, [theme])
  return (
    <>
      <Meta
        title="The Lotus Vision"
        desc="In a digital world without borders, we are a brand dedicated Learning, the Frisson you experience as
        you discover what is possible and the eventual Growth this leads to in all
        aspects of your life."
      />
      {progressBar}
      <div
        ref={scrollContainer}
        className="relative w-screen h-screen overflow-scroll transition-colors bg-white text-neutral-900 scroll-smooth">
        <div
          className="transition duration-500 opacity-100"
          ref={headerContainer}>
          <Header
            position="fixed"
            active="vision"
            fadeInAnimation={false}
            colorChangeAnimation={true}
            iconHoverColorAnimations={false}
          />
        </div>
        <div className="relative z-[99]">
          <div
            ref={scrollArrowContainer}
            className="transition duration-500 delay-500 opacity-0">
            <ScrollArrow className={scrollArrowColor} />
          </div>
          {[...new Array(22)].map((item, index) => {
            return (
              <Section key={index}>
                <div className="relative"></div>
              </Section>
            )
          })}
          <motion.div
            ref={introPanelNums}
            className="fixed top-0 left-0 w-full h-[300vh] pointer-events-none opacity-0 transition-opacity duration-1000"
            transition={{
              type: 'spring',
              stiffness: 800,
              damping: 200,
              restSpeed: 0.5,
            }}
            animate={{
              y: transform(
                [0, windowHeight * 3],
                ['0vh', '-300vh']
              )(scrollY.get()),
            }}>
            <div className="relative w-full h-screen">
              <svg
                viewBox="0 0 224 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-8 h-[60vh]">
                <path
                  d="M129.2 560H223.6V0H150L140.4 35.2C129.2 76 109.2 88.8 57.2004 88.8H0.400391V176H129.2V560Z"
                  fill={theme.primaryColor}
                />
              </svg>
            </div>
            <div className="relative w-full h-screen">
              <svg
                viewBox="0 0 403 571"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-8 h-[60vh]">
                <path
                  d="M0.599609 571H402.2V484.6H155L289.4 363C361.4 299.8 391.8 236.6 391.8 173.4C391.8 71.0001 311.8 0.600098 199 0.600098C83.7996 0.600098 9.39961 73.4001 6.19961 191.8H94.1996C96.5996 122.2 136.6 83.0001 199 83.0001C259 83.0001 299.8 119.8 299.8 175.8C299.8 215.8 278.2 252.6 231 295.8L0.599609 501.4V571Z"
                  fill={theme.primaryColor}
                />
              </svg>
            </div>
            <div className="relative w-full h-screen">
              <svg
                viewBox="0 0 398 571"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-8 h-[60vh]">
                <path
                  d="M199.6 570.4C318.8 570.4 398 499.2 398 391.2C398 294.4 332.4 225.6 233.2 215.2L378 67.2V0H11.6004V85.6H243.6L104.4 228.8V291.2H199.6C262.8 291.2 304.4 328.8 304.4 386.4C304.4 444 263.6 482.4 199.6 482.4C138 482.4 96.4004 446.4 93.2004 391.2H0.400391C5.20039 500.8 82.8004 570.4 199.6 570.4Z"
                  fill={theme.primaryColor}
                />
              </svg>
            </div>
          </motion.div>
          <motion.div
            ref={introPanelText}
            className="fixed top-0 left-0 w-full h-[300vh] pointer-events-none opacity-0 transition-opacity duration-1000"
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 200,
              restSpeed: 0.5,
            }}
            animate={{
              y: transform(
                [0, windowHeight * 3],
                ['0vh', '-300vh']
              )(scrollY.get()),
            }}>
            <div className="flex items-center w-full h-screen mx-auto max-w-7xl">
              <h1 className="px-4 mb-8 font-sans text-5xl !leading-tight text-left xl:px-0 lg:text-7xl">
                The Lotus is a burst of purity in muddy waters.
              </h1>
            </div>
            <div className="flex items-center w-full h-screen mx-auto max-w-7xl">
              <h1 className="px-4 mb-8 font-sans text-3xl !leading-tight text-left xl:px-0 lg:text-6xl">
                In a digital world without borders, we are a brand dedicated to{' '}
                <strong className="font-bold">Learning</strong>, the{' '}
                <strong className="font-bold">Frisson</strong> you experience as
                you discover what is possible and the eventual{' '}
                <strong className="font-bold">Growth</strong> this leads to in
                all aspects of your life.
              </h1>
            </div>
            <div className="flex items-center w-full h-screen mx-auto max-w-7xl">
              <h1 className="px-4 mb-8 font-sans text-3xl !leading-tight text-left xl:px-0 lg:text-6xl">
                We are a community of{' '}
                <strong className="font-bold">optimalists</strong> with a
                rational belief in a better future for ourselves and our
                community through our own efforts.
              </h1>
            </div>
          </motion.div>
          <div className="fixed left-0 w-full top-10 z-[9999] pointer-events-none">
            <div
              ref={visionLabels}
              className="absolute w-full mx-auto transition duration-500 -translate-x-1/2 opacity-0 pointer-events-none max-w-7xl left-1/2">
              <div className="absolute left-0 flex w-full gap-4 px-4 xl:px-0 xl:gap-6">
                <Button
                  type="pill"
                  className="!text-neutral-800 !cursor-default"
                  style={{ backgroundColor: theme.primaryColor }}>
                  Vision
                </Button>
                <Button
                  type="pill-ouline"
                  className="!text-white !border-white !cursor-default">
                  Values
                </Button>
                <Button
                  type="pill-ouline"
                  href="/"
                  className="!text-white !border-white !bg-transparent !ml-auto pointer-events-none !rounded-full !px-4"
                  onMouseOver={(e) => {
                    e.currentTarget.classList.remove(
                      '!bg-transparent',
                      '!border-white'
                    )
                    e.currentTarget.style.backgroundColor = theme.primaryColor
                    e.currentTarget.style.borderColor = theme.primaryColor
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'white'
                  }}>
                  <AiFillHome className="mt-1" />
                </Button>
              </div>
            </div>
          </div>
          <div
            ref={visionContainer}
            className="fixed top-0 z-[999] w-full h-screen bg-lily-black pointer-events-none transition duration-1000 opacity-0">
            <div className="relative flex flex-col items-center w-full h-full px-4 mx-auto pt-36 lg:pt-0 lg:flex-row xl:px-0 max-w-7xl">
              <h2 className="transition duration-1000 font-sans text-2xl lg:text-6xl text-white w-full z-[999]">
                The Lotus will be the landing page of the new web.
              </h2>
              {visionCards}
            </div>
          </div>
          <motion.div
            ref={valuesContainer}
            className="fixed top-0 z-[99999] w-full h-screen bg-white pointer-events-none opacity-1"
            transition={spring}
            initial={{ x: '105vw' }}
            animate={{
              x: transform(
                [windowHeight * 9.5, windowHeight * 12],
                ['105vw', '0vw']
              )(scrollY.get()),
            }}>
            <div
              ref={valuesLabels}
              className="absolute w-full mx-auto transition duration-500 -translate-x-1/2 opacity-0 pointer-events-none top-10 max-w-7xl left-1/2">
              <div className="absolute left-0 flex w-full gap-4 px-4 xl:px-0 xl:gap-6">
                <Button
                  type="pill-ouline"
                  className="!text-neutral-800 !border-neutral-800 !cursor-default !bg-white">
                  Vision
                </Button>
                <Button
                  type="pill"
                  className="!text-neutral-800 !cursor-default"
                  style={{ backgroundColor: theme.primaryColor }}>
                  Values
                </Button>
                <Button
                  type="pill-ouline"
                  href="/"
                  className="!text-neutral-800 !border-neutral-800 !bg-transparent !ml-auto pointer-events-none !rounded-full !px-4"
                  onMouseOver={(e) => {
                    e.currentTarget.classList.remove(
                      '!bg-transparent',
                      '!border-neutral-800'
                    )
                    e.currentTarget.style.backgroundColor = theme.primaryColor
                    e.currentTarget.style.borderColor = theme.primaryColor
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = '#303030'
                  }}>
                  <AiFillHome className="mt-1" />
                </Button>
              </div>
            </div>
            <div className="relative flex flex-col items-center w-full h-full px-4 mx-auto pt-36 lg:pt-0 lg:flex-row xl:px-0 max-w-7xl">
              <h2
                ref={valuesHeading}
                className="transition duration-1000 font-sans text-2xl lg:text-6xl text-lily-black w-full z-[999] lg:pr-20 opacity-0">
                These are the <strong>Values</strong> we see in ourselves and
                hope to see in all our holders.
              </h2>
              {valuesCards}
            </div>
          </motion.div>
          <motion.div
            ref={finalContainer}
            className="flex flex-col items-center justify-center fixed top-0 z-[99999] pointer-events-none w-full opacity-0"
            transition={spring}
            initial={{ height: '0vh' }}
            animate={{
              backgroundColor: theme.primaryColor,
              height: transform(
                [windowHeight * 19, windowHeight * 21],
                ['0vh', '100vh']
              )(scrollY.get()),
            }}>
            <div
              ref={finalContainerContent}
              className="flex flex-col items-center justify-center text-center transition duration-1000 opacity-0 pointer-events-auto">
              <Link href="/">
                <svg
                  id="logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 41.05 40.98"
                  className="cursor-pointer w-16 mb-8 transition-transform duration-1000 hover:rotate-[360deg] -translate-y-1 fill-lily-black">
                  <g>
                    <path d="M18.71,29.04c-1.52-.68-2.59-2.19-2.63-3.95h0V13.07h-4.39v11.91c0,.65,.07,1.28,.2,1.89,.43,1.97,1.52,3.7,3.02,4.94,.36,.3,.75,.57,1.16,.81,1.09,.64,2.34,1.05,3.66,1.17v-4.42c-.36-.06-.7-.17-1.03-.32h.01Zm22.06-12.06c-1.56,.02-3.08,.21-4.54,.57-1.87,.45-3.64,1.16-5.27,2.08v5.52c1.58-1.3,3.42-2.29,5.42-2.9-.46,4.08-2.47,7.7-5.42,10.24v5.6c5.74-3.39,9.68-9.49,10.06-16.54,.02-.38,.03-.76,.03-1.14,0-1.17-.1-2.31-.29-3.43h.01Zm-30.67,2.64c-1.63-.92-3.4-1.63-5.27-2.08-1.46-.35-2.98-.55-4.54-.57-.19,1.11-.29,2.26-.29,3.43,0,.38,0,.76,.03,1.14,.39,7.05,4.33,13.15,10.06,16.54v-5.6c-2.95-2.55-4.96-6.16-5.42-10.24,2,.61,3.84,1.61,5.42,2.9v-5.52h0Z" />
                    <g>
                      <path d="M20.54,5.85l4.46,5.63v4.07c1.81,.86,3.33,2.22,4.39,3.91v-7.97l-5.05-6.56L20.54,0l-3.79,4.92-5.05,6.56h4.39l4.46-5.63h-.01Z" />
                      <path d="M24.92,17.3c-.11-.07-.23-.13-.35-.19-.04-.02-.08-.04-.13-.06-.15-.08-.31-.15-.47-.22h-.02c-.15-.07-.31-.13-.46-.19-.05-.02-.1-.03-.15-.05-.12-.04-.24-.08-.36-.11-.05-.01-.1-.03-.16-.04-.17-.04-.34-.09-.51-.12h-.02c-.16-.04-.33-.07-.5-.09-.05,0-.11-.01-.16-.02-.13-.02-.26-.03-.39-.04-.05,0-.11,0-.16-.01-.18-.01-.36-.02-.54-.02-1,0-1.97,.17-2.87,.48v4.96c.58-.49,1.29-.84,2.08-.98,.26-.05,.52-.07,.79-.07s.54,.03,.79,.07c1.44,.26,2.64,1.21,3.24,2.49,.24,.51,.39,1.08,.42,1.68h0v.35h0c-.04,1.76-1.11,3.27-2.63,3.95-.33,.15-.67,.26-1.03,.32v4.42c1.33-.12,2.57-.53,3.66-1.17v3.14l-.12,.03c-1.13,.32-2.32,.52-3.54,.58-.25,0-.51,.02-.76,.02h-.06c-.26,0-.51,0-.76-.02-1.22-.06-2.41-.26-3.54-.58l-.12-.03c-.07-.02-.14-.04-.22-.06-1.43-.44-2.78-1.07-4-1.87-.06-.03-.11-.07-.17-.11v5.24c1.27,.61,2.62,1.09,4.02,1.43,1.46,.35,2.98,.55,4.54,.57h.57c1.56-.02,3.08-.21,4.54-.57,1.4-.34,2.75-.82,4.02-1.43v-13.97c0-3.29-1.8-6.16-4.46-7.68v-.03Z" />
                    </g>
                  </g>
                </svg>
              </Link>

              <Button
                href="https://magiceden.io/marketplace/lotus_gang_nft"
                target="_blank"
                rel="noreferrer"
                className="!border-lily-black !text-lily-black"
                onMouseOver={(e) => {
                  e.currentTarget.classList.remove('!border-lily-black')
                  e.currentTarget.classList.add('!border-white')
                  e.target.style.backgroundColor = '#fff'
                  e.target.style.color = theme.primaryColor
                }}
                onMouseOut={(e) => {
                  e.currentTarget.classList.remove('!border-white')
                  e.currentTarget.classList.add('!border-lily-black')
                  e.target.style.backgroundColor = theme.primaryColor
                  e.target.style.color = '#fff'
                }}>
                Join the Gang
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default VisionNew
