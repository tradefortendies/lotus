import { Fade } from 'react-awesome-reveal'
import { Panel } from './Panel'

export const Hero = () => {
  return (
    <Panel floating={false} first={true}>
      <div className="px-8 h-[98vh] flex lg:items-center mx-auto relative z-20 pt-32 md:pt-[15vh] lg:pt-0">
        <div className="lg:w-1/2 text-lily-black">
          <h1 className="font-bold leading-[1.15] text-9xl">
            Let's get this shit.
          </h1>
          <ul className="w-2/3 mt-12 space-y-6 font-mono text-4xl">
            <li className="w-full">
              <button className="flex items-center justify-between w-full gap-4 uppercase">
                The LILYPad{' '}
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6605 10.563L27.8964 27.7988"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.8964 11.55L27.8964 27.8L11.6464 27.8"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
            <li className="w-full">
              <button className="flex items-center justify-between w-full gap-4 uppercase">
                Lotus LIbrary{' '}
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6605 10.563L27.8964 27.7988"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.8964 11.55L27.8964 27.8L11.6464 27.8"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
            <li className="w-full">
              <button className="flex items-center justify-between w-full uppercase">
                The Blueprint{' '}
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6605 10.563L27.8964 27.7988"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.8964 11.55L27.8964 27.8L11.6464 27.8"
                    stroke="#222222"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
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
