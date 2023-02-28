import { Suspense, useRef, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Fade } from 'react-awesome-reveal'
import { Audio } from 'react-loader-spinner'
import { useWindowSize } from '../../hooks/useWindowSize'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'
import BlueprintModel from '../BlueprintModel'
import blueprintData from '../../data/bluerprint.json'
import clsx from 'clsx'

export const Blueprint = () => {
  const theme = useContext(ThemeContext)
  const orbitControlsRef = useRef(null)
  const windowDimensions = useWindowSize()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  return (
    <Panel floating={false}>
      <div className="flex flex-col justify-center w-full px-8 py-16 mx-auto xl:py-4 max-w-screen-lily-container">
        <Fade duration={500} delay={200} fraction={0}>
          <h2 className="mb-12 text-3xl text-center lg:text-4xl">
            <strong>The Blueprint</strong> is our version of a road map.
          </h2>
        </Fade>
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          <div className="w-full h-full">
            {isLoaded && (
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ fov: 35 }}
                resize={{ scroll: false }}
                style={{
                  height:
                    windowDimensions.width > 768
                      ? windowDimensions.height * 0.75
                      : windowDimensions.height * 0.45,
                }}
              >
                <Suspense fallback={null}>
                  <Stage
                    controls={orbitControlsRef}
                    preset="rembrandt"
                    intensity={1}
                    environment="city"
                    adjustCamera={windowDimensions.width > 768 ? 1.36 : 1.2}
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
            )}
          </div>
          <div className="w-full lg:w-[60%]">
            <div className="px-4 py-8 text-white bg-lily-black rounded-2xl">
              <h3 className="mx-4 text-4xl font-bold">The Blueprint</h3>

              <div className="flex flex-row gap-4 px-1 mx-3 mt-8 text-sm font-semibold border-b text-zinc-500 border-zinc-500">
                <div className="w-8">#</div>
                <div className="w-full uppercase">Title</div>
              </div>

              {blueprintData.tracks.map((item, index) => (
                <Link href={item.url || ''} key={index}>
                  <div
                    className={clsx(
                      'flex flex-row items-center gap-4 p-2 px-4 text-sm rounded-xl',
                      item.active && 'bg-zinc-600',
                      item.url && 'cursor-pointer'
                    )}
                    style={{
                      color: item.active ? theme.primaryColor : '#fff',
                    }}
                    key={index}
                  >
                    <div className="w-8">
                      {!item.active && index + 1}
                      {item.active && (
                        <Audio
                          height="20"
                          width="20"
                          color={theme.primaryColor}
                          ariaLabel="three-dots-loading"
                        />
                      )}
                    </div>
                    <div className="w-full">
                      <h4
                        style={{
                          color: item.active ? theme.primaryColor : '#fff',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={clsx(
                          !item.active && 'text-zinc-500',
                          item.active && 'text-white'
                        )}
                      >
                        {item.artist}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
