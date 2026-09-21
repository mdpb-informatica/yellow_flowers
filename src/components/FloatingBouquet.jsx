import { Billboard, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import bouquetImage from '../assets/ramo.png'

export default function FloatingBouquet({
  position = [0, 0, 0],
  scale = 1,
  speed = 1,
  phase = 0,
}) {
  const group = useRef()
  const texture = useTexture(bouquetImage)
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame((state, delta) => {
    if (!group.current) return

    const t = state.clock.elapsedTime * speed + phase
    group.current.position.y = position[1] + Math.sin(t * 0.68) * 0.22
    group.current.position.x = position[0] + Math.cos(t * 0.34) * 0.16
    group.current.rotation.z = Math.sin(t * 0.4) * 0.08
    group.current.rotation.y += delta * 0.08 * speed
  })

  return (
    <Billboard ref={group} position={position} follow={true} lockX={false} lockY={false} lockZ={false}>
      <mesh scale={[scale * 1.45, scale * 2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.01}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Billboard>
  )
}
