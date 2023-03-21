import { useRef, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import { Fade } from 'react-awesome-reveal'
import { Panel } from './Panel'
import Button from '../Button'
import ScrollArrow from '../ScrollArrow'

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector)

    if (!target) {
      return
    }

    window.scrollTo(0, 0)

    window.scrollTo({
      top: target.getBoundingClientRect().top - 40,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (!videoRef.current) {
        return
      }
      videoRef.current.style.opacity = '1'
    }, 4500)
  }, [])

  return (
    <Panel floating={false} first={true}>
      <div className="px-8 w-full h-[95vh] overflow-hidden flex lg:items-center xl:w-auto mx-auto relative z-20 pt-32 md:pt-[15vh] lg:pt-12">
        <div className="w-full md:w-[80%] lg:w-[45%] text-lily-black mr-[10vw]">
          <Fade duration={500} delay={500} fraction={0}>
            <h1 className="font-bold leading-[1.15] text-7xl smLaptop:text-8xl md:text-8xl xl:text-9xl relative">
              Let&apos;s get this shit.
              <Marquee
                gradient={false}
                speed={170}
                className="!hidden !w-[80%] xl:!w-full lg:flex"
              >
                <div className="px-4 w-full py-[4px] bg-[#7FFFB9]"></div>
                <div className="px-4 w-full py-[4px] bg-[#FFD462]"></div>
                <div className="px-4 w-full py-[4px] bg-[#FF9596]"></div>
                <div className="px-4 w-full py-[4px] bg-[#91B9FF]"></div>
                <div className="px-4 w-full py-[4px] bg-[#61FEFF]"></div>
              </Marquee>
            </h1>
          </Fade>
          <ul className="w-full mt-8 space-y-2 font-mono md:w-[35%] lg:w-1/2 xl:text-4xl lg:mt-16 xl:w-[35%]">
            <Fade
              cascade={true}
              duration={500}
              delay={1000}
              damping={0.5}
              fraction={0}
            >
              <li className="w-full">
                <Button
                  href="#"
                  arrow={true}
                  width={155}
                  underlineSpeed={150}
                  size="lg"
                  type="transparent"
                  className="flex items-center justify-center w-full gap-4"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#lilypad')
                  }}
                >
                  The LILYPad
                </Button>
              </li>
              <li className="w-full">
                <Button
                  href="#"
                  arrow={true}
                  width={180}
                  underlineSpeed={150}
                  size="lg"
                  type="transparent"
                  className="flex items-center justify-between w-full gap-4 uppercase"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#library')
                  }}
                >
                  Lotus LIbrary
                </Button>
              </li>
              <li className="w-full">
                <Button
                  href="#"
                  arrow={true}
                  width={180}
                  underlineSpeed={150}
                  type="transparent"
                  size="lg"
                  className="flex items-center justify-between w-full uppercase"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#blueprint')
                  }}
                >
                  The Blueprint
                </Button>
              </li>
            </Fade>
          </ul>
          <ScrollArrow position="absolute" />
        </div>
      </div>

      <div className="lg:hidden w-screen h-[98vh] absolute top-0 left-0 bg-gradient-to-b to-transparent from-white z-10"></div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        loop
        muted
        className="absolute transition-opacity duration-1000 bottom-0 right-0 lg:-right-8 2xl:right-[5vw] object-cover w-auto h-[50vh] md:h-[70vh] lg:h-[86vh] z-0 opacity-0"
      >
        <source src="/video/lotus-splash.webm" type="video/webm" />
        <source src="/video/lotus-splash.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Panel>
  )
}
