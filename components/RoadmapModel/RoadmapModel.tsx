import React from 'react'
import { useGLTF } from '@react-three/drei'

function RoadmapModel() {
  const gltf = useGLTF('/models/roadmap.gltf')
  return <primitive object={gltf.scene} scale={[3, 3, 3]} />
}

export default RoadmapModel
