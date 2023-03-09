/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

/* eslint-disable react/no-unknown-property */

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const BlueprintModel = (props: any) => {
  const group = useRef()
  // @ts-nocheck
  const { nodes, materials, animations } = useGLTF(
    '/models/Lily-Lotus-3D-Animated.gltf'
  )
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['Spinning-Disk-Stop'].setLoop(true, 20)
    actions['Spinning-Disk-Stop'].play()
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="GLB-Disk">
          <mesh
            name="Cube041"
            castShadow
            receiveShadow
            geometry={nodes.Cube041.geometry}
            material={materials['CD-Raw']}
          />
          <mesh
            name="Cube041_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube041_1.geometry}
            material={materials['CD Black']}
          />
        </group>
        <group name="GLB-Bottom">
          <mesh
            name="Cube042"
            castShadow
            receiveShadow
            geometry={nodes.Cube042.geometry}
            material={materials['Basic CD Case']}
          />
          <mesh
            name="Cube042_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube042_1.geometry}
            material={materials['Basic CD Case']}
          />
        </group>
        <mesh
          name="GLB-Top"
          castShadow
          receiveShadow
          geometry={nodes['GLB-Top'].geometry}
          material={materials['Basic CD Case']}
        />
        <mesh
          name="GLB-Clip"
          castShadow
          receiveShadow
          geometry={nodes['GLB-Clip'].geometry}
          material={materials['Rainbow Clip.001']}
        />
        <mesh
          name="GLB-CD-Sticker"
          castShadow
          receiveShadow
          geometry={nodes['GLB-CD-Sticker'].geometry}
          material={materials['CD-Sticker']}
          position={[0, 0, 0.04]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={4.73}
        />
        <mesh
          name="GLB-CD-Sticker001"
          castShadow
          receiveShadow
          geometry={nodes['GLB-CD-Sticker001'].geometry}
          material={materials['CD-Sticker']}
          position={[0, 0, 0.04]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={4.22}
        />
        <mesh
          name="GLB-Backpaper"
          castShadow
          receiveShadow
          geometry={nodes['GLB-Backpaper'].geometry}
          material={materials['Basic Case Back']}
          position={[0, 0, -0.18]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[5.23, 4.98, 4.98]}
        />
      </group>
    </group>
  )
}

export default BlueprintModel

useGLTF.preload('/models/Lily-Lotus-3D-Animated.gltf')
