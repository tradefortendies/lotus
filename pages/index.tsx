import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Fade } from 'react-awesome-reveal'
import { formatAddress } from '../lib/helpers'
import { useWindowSize } from '../hooks/useWindowSize'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Panel } from '../components/Home/Panel'
import { Hero } from '../components/Home/Hero'
import { Collections } from '../components/Home/Collections'
import { Blueprint } from '../components/Home/Blueprint'
import { Legendaries } from '../components/Home/Legendaries'
import Button from '../components/Button'
import legendariesData from '../data/legendaries.json'

const legendaries = legendariesData.legendaries

const Home: NextPage = () => {
  const theme = useContext(ThemeContext)
  const bgRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const windowDimensions = useWindowSize()

  useEffect(() => {
    if (!bgRef.current) {
      return
    }

    const loadingCursor: HTMLDivElement = document.querySelector(
      '#loading-cursor'
    ) as HTMLDivElement

    document.documentElement.scrollTo(0, 0)
    disableBodyScroll(bgRef.current)

    setIsLoading(true)
    if (loadingCursor) {
      loadingCursor.style.opacity = '1'
    }

    setTimeout(() => {
      if (!bgRef.current) {
        return
      }

      document.documentElement.scrollTo(0, 0)

      setTimeout(() => {
        if (!bgRef.current) {
          return
        }

        bgRef.current.classList.add('opacity-0')
        setIsLoading(false)
        enableBodyScroll(bgRef.current)

        if (loadingCursor) {
          loadingCursor.style.opacity = null as any
        }

        if (windowDimensions.width < 500) {
          return
        }

        document.documentElement.style.scrollBehavior = 'smooth'
      }, 1500)
    }, 1000)
  }, [])

  return (
    <>
      <Meta
        title={
          isLoading ? 'Loading Lotus...' : 'Lotus - a community of optimalists'
        }
        desc="The landing page of Web3."
      />
      <>
        <div
          ref={bgRef}
          className="fixed flex flex-col-reverse 0 transition-opacity duration-1000 z-[9999] pointer-events-none w-screen h-screen bg-neutral-800"
        >
          <div className="w-screen h-1/5 bg-lily-green"></div>
          <div className="w-screen h-1/5 bg-lily-yellow"></div>
          <div className="w-screen h-1/5 bg-lily-red"></div>
          <div className="w-screen h-1/5 bg-lily-blue-dark"></div>
          <div className="w-screen h-1/5 bg-lily-blue"></div>
        </div>
        <Header
          position="slide"
          slideDownAnimation={true}
          colorChangeAnimation={true}
        />
        <div
          id="main"
          className="relative z-20 w-screen min-h-screen font-sans tracking-tighter transition-opacity duration-500 text-neutral-900"
        >
          <Hero />
          <Collections />
          <Blueprint />
          <Legendaries />
          <Panel floating={false} mode={'dark'}>
            <div className="flex flex-col w-full gap-4 px-8 pt-16 pb-32 mx-auto md:flex-row max-w-screen-lily-container">
              <div className="flex flex-col items-center justify-center w-full h-full md:items-start">
                <Fade
                  cascade={true}
                  duration={500}
                  delay={200}
                  damping={0.35}
                  fraction={0}
                >
                  <h2 className="text-6xl font-bold text-left">
                    Lotus Library
                  </h2>
                  <p className="mt-12 text-3xl text-center md:text-left">
                    The best crypto information and tools are hard to find. We
                    are working with the community to index it in one place.
                  </p>
                </Fade>
                <dl className="flex flex-wrap mt-10 text-3xl md:mt-24">
                  <Fade
                    cascade={true}
                    duration={500}
                    delay={400}
                    damping={0.35}
                    fraction={0}
                  >
                    <dd className="mr-1" style={{ color: theme.primaryColor }}>
                      56
                    </dd>
                    <dt>Articles</dt>
                    <dd
                      className="ml-8 mr-1"
                      style={{ color: theme.primaryColor }}
                    >
                      14
                    </dd>
                    <dt>Writers</dt>
                    <dd
                      className="ml-8 mr-1"
                      style={{ color: theme.primaryColor }}
                    >
                      8
                    </dd>
                    <dt>Partnerships</dt>
                  </Fade>
                </dl>
                <Fade duration={500} delay={1400} fraction={0}>
                  <Button
                    href="#"
                    type="pill-outline"
                    className="mx-auto my-10 md:mb-0 md:mt-8 md:ml-0"
                  >
                    Explore
                  </Button>
                </Fade>
              </div>
              <div className="flex items-center w-full">
                <section className="flex flex-col gap-8 max-w-[380px] mx-auto md:mr-0 md:ml-auto">
                  <Fade
                    cascade={true}
                    duration={500}
                    delay={0.2}
                    damping={0.35}
                    fraction={0}
                  >
                    <article>
                      <a href="">
                        <img
                          src="https://via.placeholder.com/380x135"
                          className="object-cover w-full rounded-t-xl"
                        />
                      </a>
                      <div
                        className="flex flex-col p-4 text-lily-black rounded-b-xl"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <h2 className="font-bold">
                          <a href="">Web3 for Content Creators</a>
                        </h2>
                        <time>12/01/2022</time>
                        <a rel="author" href="https://twitter.com/notbunjil">
                          @kennyatta
                        </a>
                      </div>
                    </article>
                    <article>
                      <a href="">
                        <img
                          src="https://via.placeholder.com/380x135"
                          className="object-cover w-full rounded-t-xl"
                        />
                      </a>
                      <div
                        className="flex flex-col p-4 text-lily-black rounded-b-xl"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <h2 className="font-bold">
                          <a href="">Web3 for Content Creators</a>
                        </h2>
                        <time>12/01/2022</time>
                        <a rel="author" href="https://twitter.com/notbunjil">
                          @kennyatta
                        </a>
                      </div>
                    </article>
                    <article>
                      <a href="">
                        <img
                          src="https://via.placeholder.com/380x135"
                          className="object-cover w-full rounded-t-xl"
                        />
                      </a>
                      <div
                        className="flex flex-col p-4 text-lily-black rounded-b-xl"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <h2 className="font-bold">
                          <a href="">Web3 for Content Creators</a>
                        </h2>
                        <time>12/01/2022</time>
                        <a rel="author" href="https://twitter.com/notbunjil">
                          @kennyatta
                        </a>
                      </div>
                    </article>
                  </Fade>
                </section>
              </div>
            </div>
          </Panel>
          <Panel floating={false}>
            <div className="flex flex-col items-center justify-center w-full gap-24 px-4 pt-16 pb-32 mx-auto md:flex-row max-w-screen-lily-container">
              <Fade duration={500} delay={200} fraction={0}>
                <img
                  src="/img/rubix.svg"
                  className="w-[360px] animate-spin-extra-slow"
                />
              </Fade>
              <div className="space-y-4 text-center md:text-left">
                <Fade
                  cascade={true}
                  duration={500}
                  delay={400}
                  damping={0.35}
                  fraction={0}
                >
                  <h2 className="text-6xl font-bold">The LILYPad</h2>
                  <p className="text-2xl">
                    A new peer-to-peer onboarding solution.
                  </p>
                  <p className="text-lg italic">Now in development.</p>
                </Fade>
              </div>
            </div>
          </Panel>
          <Panel floating={true}>
            <div className="flex flex-col items-center w-full gap-8 px-8 py-16 mx-auto md:flex-row max-w-screen-lily-container">
              <div className="w-1/2">
                <Fade
                  cascade={true}
                  duration={500}
                  delay={200}
                  damping={0.35}
                  fraction={0}
                >
                  <h2 className="text-6xl font-bold text-left">Community</h2>
                  <p className="pr-16 mt-12 text-3xl text-center md:text-left">
                    We have holders in 65 countries and we are growing every
                    day.
                  </p>
                </Fade>

                <Fade cascade={true} duration={500} delay={400} fraction={0}>
                  <h3 className="mt-16 mb-4 text-3xl font-bold">
                    Recent Sales
                  </h3>
                </Fade>
                <section className="flex flex-col gap-2">
                  <Fade
                    cascade={true}
                    duration={500}
                    delay={600}
                    damping={0.35}
                    fraction={0}
                  >
                    <article>
                      <a
                        className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                        href="#"
                      >
                        <img
                          className="w-20 rounded-xl"
                          src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                        />
                        <div className="ml-4">
                          <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                          <p>8.39 SOL</p>
                        </div>
                        <img className="ml-auto" src="/img/arrow-icon.svg" />
                      </a>
                    </article>
                    <article>
                      <a
                        className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                        href="#"
                      >
                        <img
                          className="w-20 rounded-xl"
                          src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                        />
                        <div className="ml-4">
                          <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                          <p>8.39 SOL</p>
                        </div>
                        <img className="ml-auto" src="/img/arrow-icon.svg" />
                      </a>
                    </article>
                    <article>
                      <a
                        className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                        href="#"
                      >
                        <img
                          className="w-20 rounded-xl"
                          src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                        />
                        <div className="ml-4">
                          <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                          <p>8.39 SOL</p>
                        </div>
                        <img className="ml-auto" src="/img/arrow-icon.svg" />
                      </a>
                    </article>
                  </Fade>
                </section>
              </div>
              <div className="w-1/2">
                <Fade duration={500} delay={1200} fraction={0}>
                  <div
                    className="gap-4 px-4 py-8 mx-auto text-center max-w-[512px] rounded-xl"
                    style={{ background: theme.primaryColor }}
                  >
                    <h3 className="text-2xl font-bold">Spotlight</h3>
                    <p className="text-lg">Coming soon...</p>
                  </div>
                </Fade>
              </div>
            </div>
          </Panel>
          <Panel floating={false}>
            <div className="flex items-center justify-center w-full gap-4">
              <div className="relative w-1/2">
                <div className="absolute left-0 flex flex-col w-3/5 -translate-y-1/2 top-1/2">
                  <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-blue">
                    Silk Road
                  </button>
                  <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-yellow">
                    Metaverse Models
                  </button>
                  <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-red">
                    Floor Calculator
                  </button>
                  <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-blue-dark">
                    Planting
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <h2 className="font-bold text-7xl">
                  Experiments
                  <br className="hidden lg:block" /> and Fun
                </h2>
              </div>
            </div>
          </Panel>
          <div className="-translate-y-16">
            <div className="text-white bg-lily-black">
              <div className="flex flex-col justify-center w-full gap-4 px-4 pb-32 mx-auto pt-36 max-w-screen-lily-container">
                <Fade duration={500} delay={400} fraction={0}>
                  <h2 className="text-6xl font-bold text-center">
                    How can I get involved?
                  </h2>
                </Fade>
                <div className="flex items-center justify-center gap-8 mt-8">
                  <Fade
                    cascade={true}
                    duration={500}
                    delay={400}
                    damping={0.35}
                    fraction={0}
                  >
                    <Button type="pill-outline">Buy LILY</Button>
                    <Button type="pill-outline">Buy Lotus Gang</Button>
                    <Button type="pill-outline">Learn Something</Button>
                  </Fade>
                </div>
              </div>
            </div>
            <Footer isLoading={isLoading} />
          </div>
        </div>
      </>
    </>
  )
}

export default Home
