import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingNote({
  text = '',
  position = [0, 0, 0],
  distanceFactor = 8.7,
  phase = 0,
  speed = 1,
}) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return

    const t = state.clock.elapsedTime * speed + phase
    group.current.position.x = position[0] + Math.cos(t * 0.31) * 0.16
    group.current.position.y = position[1] + Math.sin(t * 0.58) * 0.24
    group.current.position.z = position[2] + Math.sin(t * 0.22) * 0.08
  })

  return (
    <group ref={group} position={position}>
      <Html transform sprite center distanceFactor={distanceFactor} zIndexRange={[12, 1]}>
        <article className="floating-note" draggable="false">
          <p>{text}</p>
        </article>
      </Html>
    </group>
  )
}
