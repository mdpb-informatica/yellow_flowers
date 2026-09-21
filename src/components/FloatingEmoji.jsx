import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingEmoji({
  emoji = '✨',
  position = [0, 0, 0],
  scale = 1,
  speed = 1,
  phase = 0,
}) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return

    const t = state.clock.elapsedTime * speed + phase
    group.current.position.y = position[1] + Math.sin(t * 0.74) * 0.28
    group.current.position.x = position[0] + Math.cos(t * 0.38) * 0.2
    group.current.rotation.z = Math.sin(t * 0.42) * 0.1
  })

  return (
    <group ref={group} position={position}>
      <Html transform sprite center distanceFactor={8.8} zIndexRange={[12, 0]}>
        <div className="floating-emoji" style={{ fontSize: `${scale}rem` }}>
          {emoji}
        </div>
      </Html>
    </group>
  )
}
