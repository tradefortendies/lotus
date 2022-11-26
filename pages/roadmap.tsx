import type { NextPage } from 'next'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Canvas, useThree } from '@react-three/fiber'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RoadmapModel from '../components/RoadmapModel'

const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.autoRotate = true
    controls.autoRotateSpeed = 10
    controls.enableDamping = true
    controls.dampingFactor = 0.01
    controls.minDistance = 6
    controls.maxDistance = 6
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const Roadmap: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      gsap.to('#masthead > h1, #masthead > h2', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
      })
    }, 1000)
  }, [])
  return (
    <>
      <Meta title="Roadmap" />
      <>
        <Header
          position="slide"
          linkColor="black"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full bg-white text-lily-black pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                <div
                  id="masthead"
                  className="flex flex-col justify-between gap-4 lg:items-center lg:flex-row"
                >
                  <h1 className="w-full font-mono text-6xl opacity-0 lg:text-7xl">
                    Roadmap
                  </h1>
                  <h2 className="font-sans text-xl lg:text-[29px] leading-normal opacity-0">
                    The Lotus is steered by a global team united in their goal
                    of making the most exciting project possible.
                  </h2>
                </div>
                <div className="w-full mb-16 h-[400px]" id="scene">
                  <Canvas style={{ height: 600 }}>
                    <CameraController />
                    <ambientLight />
                    <RoadmapModel />
                  </Canvas>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default Roadmap
