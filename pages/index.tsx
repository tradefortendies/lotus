import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext, Suspense } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { ThemeContext } from '../components/Theme'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Panel from '../components/Panel'
import Button from '../components/Button'
import BlueprintModel from '../components/BlueprintModel'

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
                <h2 className="text-3xl">
                  To become the best bunch in the open web:
                </h2>
                <h3 className="text-3xl">
                  We are working on the <strong>LILY Pad</strong>, the{' '}
                  <strong>Lotus Library</strong> and{' '}
                  <strong>The Blueprint</strong>.
                </h3>
              </div>
            </div>
          </Panel>
          <Panel floating={true}>
            <div className="w-full p-4 mx-auto max-w-7xl">
              <h2 className="mt-16 text-3xl text-center">
                <strong>The Lotus</strong> is made up of 2 collections.
              </h2>
              <div className="flex flex-col items-center justify-center gap-8 md:h-full md:-translate-y-16 lg:gap-32 md:flex-row">
                <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8">
                  <h3 className="text-5xl font-bold text-center md:text-left">
                    LILY
                  </h3>
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
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button
                      href="/collections/lily"
                      type="pill-outline"
                      className="!border-black !text-black"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
                <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8 pb-16 md:pb-0">
                  <h3 className="text-5xl font-bold text-center md:text-left">
                    Lotus Gang
                  </h3>
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
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button
                      href="/collections/lotus-gang"
                      type="pill-outline"
                      className="!border-black !text-black !mx-auto"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel floating={false}>
            <div className="w-full p-4 mx-auto max-w-7xl">
              <h2 className="mt-16 text-3xl text-center">
                <strong>The Blueprint</strong> is our version of a road map..
              </h2>
              <div className="flex items-center justify-between h-full gap-16 -translate-y-16">
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
            <div className="w-full p-4 mx-auto max-w-7xl">
              <h2 className="mt-16 text-3xl font-bold text-center">
                The Legendaries
              </h2>
              <div className="flex items-center justify-between h-full -translate-y-16">
                <div className="grid grid-cols-5 gap-16">
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-bold">The Bride</h3>
                    <img src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F126FuD1jgFTb8GCvJgMQsUDn2Uh7Bd7eDtPxsBXLsMeo.webp" />
                    <p
                      className="font-bold"
                      style={{ color: theme.primaryColor }}
                    >
                      @username
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel floating={false} last={true}>
            Panel 5
          </Panel>
          <Footer isLoading={isLoading} />
        </div>
      </>
    </>
  )
}

export default Home
