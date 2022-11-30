import type { NextPage } from 'next'
import { useEffect, useRef, useState, Suspense } from 'react'
import { gsap } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Meta from '../components/Meta'
import Header from '../components/Header'
import BlueprintModel from '../components/BlueprintModel'

const Blueprint: NextPage = () => {
  const orbitControlsRef = useRef(null)
  const [autoRotate, setAutoRotate] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      gsap.to('#masthead > h1, #masthead > h2', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
      })

      gsap.to('#canvas', {
        opacity: 1,
        duration: 0.75,
        delay: 1,
      })

      setTimeout(() => setAutoRotate(true), 1000)
    }, 1000)
  }, [])
  return (
    <>
      <Meta title="The Blueprint" />
      <>
        <Header
          position="slide"
          linkColor="black"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen h-screen overflow-hidden text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full h-screen bg-white text-lily-black pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-48 max-w-7xl">
                <div id="masthead" className="text-center">
                  <h1 className="w-full font-mono text-6xl opacity-0 lg:text-7xl">
                    The Blueprint
                  </h1>
                </div>
                <div
                  className="w-full h-[400px] lg:h-[800px] lg:-translate-y-16"
                  id="scene"
                >
                  <div id="canvas" className="w-full h-full opacity-0">
                    <Canvas shadows dpr={[1, 2]} camera={{ fov: 40 }}>
                      <Suspense fallback={null}>
                        <Stage
                          controls={orbitControlsRef}
                          preset="rembrandt"
                          intensity={1}
                          environment="city"
                          adjustCamera={1.2}
                        >
                          <BlueprintModel />
                        </Stage>
                      </Suspense>
                      <OrbitControls
                        ref={orbitControlsRef}
                        autoRotate={autoRotate}
                        enableZoom={false}
                        enableDamping={true}
                      />
                      {/* <TrackballControls
                      enabled={true}
                      ref={orbitControlsRef}
                      rotateSpeed={5}
                      noZoom={true}
                      staticMoving={false}
                      dynamicDampingFactor={0.3}
                    /> */}
                    </Canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default Blueprint
