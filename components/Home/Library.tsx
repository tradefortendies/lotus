import { useContext, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import CountUp from 'react-countup'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'
import Button from '../Button'

export const Library = () => {
  const theme = useContext(ThemeContext)
  const [animateNumbers, setAnimateNumbers] = useState(false)

  return (
    <Panel floating={false} mode={'dark'}>
      <div
        id="library"
        className="flex flex-col w-full gap-4 px-8 pt-16 pb-32 mx-auto lg:flex-row max-w-screen-lily-container"
      >
        <div className="flex flex-col items-center justify-center w-full h-full lg:-translate-y-16 lg:items-start">
          <Fade
            cascade={true}
            duration={500}
            delay={200}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-5xl font-medium text-left lg:text-6xl">
              Lotus Library
            </h2>
            <p className="mt-20 text-2xl text-center lg:text-3xl lg:text-left">
              The best crypto information, research, and tools being indexed
              into one decentralized experience.
            </p>
          </Fade>
          <div className="mt-10 text-3xl gap-y-2 lg:mt-32">
            <Fade
              cascade={true}
              duration={500}
              delay={400}
              damping={0.35}
              fraction={0}
              onVisibilityChange={(inView) => setAnimateNumbers(inView)}
            >
              <div className="flex flex-col flex-wrap items-center gap-4 lg:flex-row">
                <div className="flex items-center gap-2">
                  <span className="w-10" style={{ color: theme.primaryColor }}>
                    <CountUp end={animateNumbers ? 42 : 0} />
                  </span>
                  <span>Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 ml-4"
                    style={{ color: theme.primaryColor }}
                  >
                    <CountUp end={animateNumbers ? 19 : 0} />
                  </span>
                  <span>Writers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 ml-4"
                    style={{ color: theme.primaryColor }}
                  >
                    <CountUp end={animateNumbers ? 9 : 0} />
                  </span>
                  <span>Partnerships</span>
                </div>
              </div>
            </Fade>
          </div>
          <Fade duration={500} delay={1400} fraction={0}>
            <Button
              href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
              target="_blank"
              rel="noreferrer"
              type="pill-outline"
              className="mx-auto my-10 transition-colors lg:mb-0 lg:mt-16 lg:ml-0"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = theme.primaryColor
                e.currentTarget.style.color = '#222222'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = theme.primaryColor
              }}
            >
              Explore
            </Button>
          </Fade>
        </div>
        <div className="flex items-center w-full">
          <section className="flex flex-col gap-4 max-w-[380px] mx-auto lg:mr-0 lg:ml-auto">
            <Fade
              cascade={true}
              duration={500}
              delay={0.2}
              damping={0.35}
              fraction={0}
            >
              <article className="transition-transform hover:scale-105">
                <a
                  href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2?p=9df2799859764c238b4ebac97dae76ac&pm=c"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/img/library/defi-protocols.webp"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a
                      href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2?p=9df2799859764c238b4ebac97dae76ac&pm=c"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The Evolution of DeFi Protocols
                    </a>
                  </h2>
                  <time>Feb, 17th, 2023</time>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/solanafm"
                  >
                    @Solana.FM
                  </a>
                </div>
              </article>
              <article className="transition-transform hover:scale-105">
                <a
                  href="https://lotusgang.notion.site/4a64361702ba4d2f961248fc3bd93bde?v=2de427c220cf453bb4b9fa1c038fdd8b&p=55343ec2ad284bea94f393b204c4a3aa&pm=c"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/img/library/order-blocks.webp"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a
                      href="https://lotusgang.notion.site/4a64361702ba4d2f961248fc3bd93bde?v=2de427c220cf453bb4b9fa1c038fdd8b&p=55343ec2ad284bea94f393b204c4a3aa&pm=c"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Trading Using Order Blocks
                    </a>
                  </h2>
                  <time>Feb 16th, 2023</time>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/Meep_2004"
                  >
                    @Meep
                  </a>
                </div>
              </article>
              <article className="transition-transform hover:scale-105">
                <a
                  href="https://lotusgang.notion.site/The-value-in-onboarding-Web2-Brands-66c01e0b0fda4d74ab8d245a17047170"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/img/library/web2-brands.webp"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a
                      href="https://lotusgang.notion.site/The-value-in-onboarding-Web2-Brands-66c01e0b0fda4d74ab8d245a17047170"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The Value of Onboarding Web2 Brands
                    </a>
                  </h2>
                  <time>Nov 5th, 2022</time>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/MaxBrsNFT"
                  >
                    @maxbrs.sol
                  </a>
                </div>
              </article>
            </Fade>
          </section>
        </div>
      </div>
    </Panel>
  )
}
