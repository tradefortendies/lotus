import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext, Suspense } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Fade } from 'react-awesome-reveal'
import { formatAddress } from '../lib/helpers'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Panel from '../components/Panel'
import Button from '../components/Button'
import BlueprintModel from '../components/BlueprintModel'
import legendariesData from '../data/legendaries.json'

const legendaries = legendariesData.legendaries

const Home: NextPage = () => {
  const theme = useContext(ThemeContext)
  const orbitControlsRef = useRef(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

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

    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setTimeout(() => {
      if (!bgRef.current) {
        return
      }

      console.log('hello?')

      // document.documentElement.scrollTo(0, 0)

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

        if (window.innerWidth < 500) {
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
          <Panel floating={false} first={true}>
            <div className="px-8 md:px-0 md:w-[80vw] h-[98vh] flex items-center mx-auto">
              <div className="space-y-4 md:w-1/2">
                <Fade>
                  <h2 className="text-3xl">
                    To become the best bunch in the open web:
                  </h2>
                  <h3 className="text-3xl">
                    We are working on the <strong>LILY Pad</strong>, the{' '}
                    <strong>Lotus Library</strong> and{' '}
                    <strong>The Blueprint</strong>.
                  </h3>
                </Fade>
              </div>
            </div>
          </Panel>
          <Panel floating={true}>
            <div className="flex flex-col justify-center w-full px-8 py-4 mx-auto max-w-screen-lily-container">
              <Fade duration={500} delay={200} fraction={0}>
                <h2 className="mb-[10vh] text-4xl text-center">
                  <strong>The Lotus</strong> is made up of 2 collections.
                </h2>
              </Fade>
              <div className="flex flex-col items-center justify-center gap-8 lg:gap-32 md:flex-row">
                <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8">
                  <Fade duration={500} delay={400} fraction={0}>
                    <h3 className="text-5xl font-bold text-center md:text-left">
                      LILY
                    </h3>
                  </Fade>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Floor</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Supply</dt>
                        <dd>10,000</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Vol</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Listed</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <Fade
                      cascade={true}
                      duration={500}
                      delay={800}
                      fraction={0}
                    >
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp"
                      />
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F12f3x8N9f7zxnrabfXHUGt4XRYUvhNpRBR5jY9VKQ4NH.webp"
                      />
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F12UGYyfPcrQPsJPSsfPnGtdkevsBa4NaHh3VPnp86M7h.webp"
                      />
                    </Fade>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Fade duration={500} fraction={0.5}>
                      <div>
                        <Button
                          href="/collections/lily"
                          type="pill-outline"
                          className="!border-black !text-black"
                        >
                          Explore
                        </Button>
                      </div>
                    </Fade>
                  </div>
                </div>
                <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8 pb-16 md:pb-0">
                  <Fade duration={500} delay={600} fraction={0}>
                    <h3 className="text-5xl font-bold text-center md:text-left">
                      Lotus Gang
                    </h3>
                  </Fade>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Floor</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Supply</dt>
                        <dd>4,000</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Vol</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <dl className="flex justify-between w-full">
                        <dt className="font-medium uppercase">Listed</dt>
                        <dd>6.2</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <Fade
                      cascade={true}
                      duration={500}
                      delay={1600}
                      fraction={0}
                    >
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13EK4usnnHAYzE8SZocvZVjFXTx6g3752RTpL3fegLQa.webp"
                      />
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13suaa4tdQHNWC4fBPeot1xvZ92ph97WaSSXFDAkv1qf.webp"
                      />
                      <img
                        className="rounded-lg"
                        src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                      />
                    </Fade>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Fade duration={500}>
                      <Button
                        href="/collections/lotus-gang"
                        type="pill-outline"
                        className="!border-black !text-black"
                      >
                        Explore
                      </Button>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel floating={false} fixedHeight={true}>
            <div className="flex flex-col justify-center w-full p-4 mx-auto max-w-screen-lily-container">
              <Fade duration={500} delay={200} fraction={0}>
                <h2 className="mb-[10vh] text-4xl text-center">
                  <strong>The Blueprint</strong> is our version of a road map.
                </h2>
              </Fade>
              <div className="flex items-center justify-between gap-16 h-1/2">
                <div className="w-full h-full">
                  <Canvas shadows dpr={[1, 2]} camera={{ fov: 35 }}>
                    <Suspense fallback={null}>
                      <Stage
                        controls={orbitControlsRef}
                        preset="rembrandt"
                        intensity={1}
                        environment="city"
                        adjustCamera={windowDimensions.width > 768 ? 1.1 : 1}
                      >
                        <BlueprintModel />
                      </Stage>
                    </Suspense>
                    <OrbitControls
                      ref={orbitControlsRef}
                      makeDefault
                      autoRotate={true}
                      enableZoom={false}
                      enablePan={false}
                      enableRotate={true}
                      enableDamping={true}
                    />
                  </Canvas>
                </div>
                <div className="w-full">Playlist goes here</div>
              </div>
            </div>
          </Panel>
          <Panel floating={true}>
            <div className="w-full h-full px-8 py-4 mx-auto max-w-screen-lily-container">
              <Fade duration={500} delay={200} fraction={0}>
                <h2 className="mt-16 text-5xl font-bold text-center">
                  The Legendaries
                </h2>
              </Fade>
              <div className="flex items-center justify-between h-full my-16">
                <div className="grid grid-cols-2 gap-8 xl:gap-16 md:grid-cols-3 lg:grid-cols-5">
                  <Fade cascade={true} duration={500} delay={400} fraction={0}>
                    {legendaries.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1"
                      >
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <img src={item.image} />
                        </a>
                        <p className="mt-2 text-sm">
                          {formatAddress(item.owner.wallet)}
                        </p>
                        <a
                          href={item.owner.twitterUrl}
                          style={{ color: theme.primaryColor }}
                          className="font-bold"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.owner.twitterHandle}
                        </a>
                      </div>
                    ))}
                  </Fade>
                </div>
              </div>
            </div>
          </Panel>
          <Panel floating={false} mode={'dark'}>
            <div className="flex flex-col w-full gap-4 px-8 pt-16 pb-32 mx-auto md:flex-row max-w-screen-lily-container">
              <div className="flex flex-col items-center justify-center w-full h-full md:items-start">
                <h2 className="text-6xl font-bold text-left">Lotus Library</h2>
                <p className="mt-12 text-3xl text-center md:text-left">
                  The best crypto information and tools are hard to find. We are
                  working with the community to index it in one place.
                </p>
                <dl className="flex flex-wrap mt-10 text-3xl md:mt-24">
                  <Fade cascade={true} duration={500} delay={0.2} fraction={0}>
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
                <Button
                  href="#"
                  type="pill-outline"
                  className="mx-auto my-10 md:mb-0 md:mt-8 md:ml-0"
                >
                  Explore
                </Button>
              </div>
              <div className="flex items-center w-full">
                <section className="flex flex-col gap-8 max-w-[380px] mx-auto md:mr-0 md:ml-auto">
                  <Fade cascade={true} duration={500} delay={0.2} fraction={0}>
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
                <Fade cascade={true} duration={500} delay={400} fraction={0}>
                  <h2 className="text-6xl font-bold">The LILYPad</h2>
                  <p className="text-2xl">
                    A new peer-to-peer onboarding solution.
                  </p>
                  <p className="text-lg italic">Now in development.</p>
                </Fade>
              </div>
            </div>
          </Panel>
          <Panel floating={true}>panel</Panel>
          <Panel floating={false}>panel</Panel>
          <div className="-translate-y-16">
            <div className="text-white bg-lily-black">
              <div className="flex flex-col justify-center w-full gap-4 px-4 pb-32 mx-auto pt-36 max-w-screen-lily-container">
                <Fade duration={500} delay={400} fraction={0}>
                  <h2 className="text-6xl font-bold text-center">
                    How can I get involved?
                  </h2>
                </Fade>
                <div className="flex items-center justify-center gap-8 mt-8">
                  <Fade cascade={true} duration={500} delay={400} fraction={0}>
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
