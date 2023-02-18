import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Fade } from 'react-awesome-reveal'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Panel } from './Panel'
import BlueprintModel from '../BlueprintModel'

export const Blueprint = () => {
  const orbitControlsRef = useRef(null)
  const windowDimensions = useWindowSize()

  return (
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
  )
}
