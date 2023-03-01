import Marquee from 'react-fast-marquee'
import { Panel } from './Panel'
import Button from '../Button'

export const Hero = () => {
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

  return (
    <Panel floating={false} first={true}>
      <div className="px-8 w-full h-[98vh] flex lg:items-center xl:w-auto mx-auto relative z-20 pt-32 md:pt-[15vh] lg:pt-12">
        <div className="w-full lg:w-1/2 text-lily-black">
          <h1 className="font-bold leading-[1.15] text-7xl lg:text-8xl xl:text-9xl">
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
          <ul className="mt-8 space-y-2 w-full lg:w-[60%] font-mono xl:text-4xl lg:mt-16 xl:w-2/5">
            <li className="w-full">
              <Button
                href="#"
                arrow={true}
                width={155}
                underlineSpeed={150}
                size="xl"
                type="transparent"
                className="flex items-center justify-between !w-full"
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
                size="xl"
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
                size="xl"
                className="flex items-center justify-between w-full uppercase"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#blueprint')
                }}
              >
                The Blueprint
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:hidden w-screen h-[98vh] absolute top-0 left-0 bg-gradient-to-b to-transparent from-white z-10"></div>

      <video
        autoPlay
        playsInline
        loop
        muted
        className="absolute bottom-[2vh] right-0 lg:-right-16 2xl:right-[5vw] object-cover w-auto h-[50vh] md:h-[70vh] lg:h-[90vh] z-0"
      >
        <source src="/video/lotus-splash.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </Panel>
  )
}
