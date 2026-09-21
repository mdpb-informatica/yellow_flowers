import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededRandom(seed) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export default function ParticleField({ count = 850 }) {
  const points = useRef()

  const [positions, colors] = useMemo(() => {
    const random = seededRandom(20260921)
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    const colorA = new THREE.Color('#fff7cf')
    const colorB = new THREE.Color('#ffd21f')

    for (let i = 0; i < count; i += 1) {
      const radius = 12 + random() * 28
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = radius * Math.cos(phi)

      const mixed = colorA.clone().lerp(colorB, random())
      c[i * 3] = mixed.r
      c[i * 3 + 1] = mixed.g
      c[i * 3 + 2] = mixed.b
    }

    return [p, c]
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.012
    points.current.rotation.x += delta * 0.002
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.92}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
