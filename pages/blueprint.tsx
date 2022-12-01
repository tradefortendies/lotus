import type { NextPage } from 'next'
import { useEffect, useRef, useState, Suspense } from 'react'
import { gsap } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Meta from '../components/Meta'
import Header from '../components/Header'
import BlueprintModel from '../components/BlueprintModel'

const Blueprint2: NextPage = () => {
  const orbitControlsRef = useRef(null)
  const [autoRotate, setAutoRotate] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setTimeout(() => {
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
              <div
                className="absolute top-0 left-0 w-screen h-screen"
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
                        adjustCamera={windowDimensions.width > 768 ? 1.2 : 1}
                      >
                        <BlueprintModel />
                      </Stage>
                    </Suspense>
                    <OrbitControls
                      ref={orbitControlsRef}
                      autoRotate={autoRotate}
                      enableZoom={true}
                      enablePan={false}
                      enableRotate={true}
                      enableDamping={true}
                    />
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default Blueprint2
