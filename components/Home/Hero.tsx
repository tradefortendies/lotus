import Marquee from 'react-fast-marquee'
import { Panel } from './Panel'
import Button from '../Button'

export const Hero = () => {
  return (
    <Panel floating={false} first={true}>
      <div className="px-8 h-[98vh] flex lg:items-center mx-auto relative z-20 pt-32 md:pt-[15vh] lg:pt-12">
        <div className="lg:w-1/2 text-lily-black">
          <h1 className="font-bold leading-[1.15] text-9xl">
            Let's get this shit.
            <Marquee gradient={false} speed={170} className="flex w-full">
              <div className="px-4 w-full py-[4px] bg-[#7FFFB9]"></div>
              <div className="px-4 w-full py-[4px] bg-[#FFD462]"></div>
              <div className="px-4 w-full py-[4px] bg-[#FF9596]"></div>
              <div className="px-4 w-full py-[4px] bg-[#91B9FF]"></div>
              <div className="px-4 w-full py-[4px] bg-[#61FEFF]"></div>
            </Marquee>
          </h1>
          <ul className="w-2/5 mt-16 space-y-4 font-mono text-4xl">
            <li className="w-full">
              <Button
                href="#test"
                arrow={true}
                width={155}
                underlineSpeed={150}
                size="xl"
                type="transparent"
                className="flex items-center justify-between !w-full"
              >
                The LILYPad
              </Button>
            </li>
            <li className="w-full">
              <Button
                href="#test"
                arrow={true}
                width={180}
                underlineSpeed={150}
                size="xl"
                type="transparent"
                className="flex items-center justify-between w-full gap-4 uppercase"
              >
                Lotus LIbrary
              </Button>
            </li>
            <li className="w-full">
              <Button
                href="#test"
                arrow={true}
                width={180}
                underlineSpeed={150}
                type="transparent"
                size="xl"
                className="flex items-center justify-between w-full uppercase"
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
        className="absolute bottom-[2vh] right-[5vw] object-cover w-auto h-[90vh] z-0"
      >
        <source src="/video/lotus-splash.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </Panel>
  )
}
