import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingMainTitle({ position = [0, 0, -2.4] }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return

    const t = state.clock.elapsedTime
    group.current.position.x = position[0] + Math.cos(t * 0.28) * 0.26
    group.current.position.y = position[1] + Math.sin(t * 0.46) * 0.38
    group.current.position.z = position[2] + Math.sin(t * 0.2) * 0.2
    group.current.rotation.y = Math.sin(t * 0.18) * 0.08
  })

  return (
    <group ref={group} position={position}>
      <Html transform center distanceFactor={12.4} zIndexRange={[40, 20]}>
        <section className="floating-main-title" aria-label="Feliz Día de las Flores Amarillas">
          <h1>
            Feliz Día de las
            <strong>Flores Amarillas</strong>
          </h1>
          <p>De parte del Área de Soporte y TIC</p>
        </section>
      </Html>
    </group>
  )
}
