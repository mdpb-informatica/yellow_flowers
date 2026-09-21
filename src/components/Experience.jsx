import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import ParticleField from './ParticleField.jsx'
import BouquetField from './BouquetField.jsx'
import EmojiField from './EmojiField.jsx'
import NoteField from './NoteField.jsx'
import FloatingMainTitle from './FloatingMainTitle.jsx'

function ResponsiveOrbitControls({ active }) {
  const { camera, size } = useThree()
  const previousMode = useRef(null)

  const settings = useMemo(() => {
    if (size.width <= 768) {
      return { mode: 'compact', initialDistance: 20, maxDistance: 28, minDistance: 12 }
    }

    return { mode: 'wide', initialDistance: 34, maxDistance: 34, minDistance: 11.5 }
  }, [size.width])

  useEffect(() => {
    if (previousMode.current === settings.mode) return

    camera.position.set(0, 0, settings.initialDistance)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    previousMode.current = settings.mode
  }, [camera, settings])

  return (
    <OrbitControls
      enabled={active}
      enablePan={false}
      enableZoom
      enableRotate
      enableDamping
      dampingFactor={0.045}
      rotateSpeed={0.56}
      zoomSpeed={0.72}
      minDistance={settings.minDistance}
      maxDistance={settings.maxDistance}
      autoRotate={active}
      autoRotateSpeed={0.16}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.82}
    />
  )
}

export default function Experience({ active }) {
  return (
    <div className="canvas-wrap" aria-label="Experiencia tridimensional de flores amarillas">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 34], fov: 42, near: 0.1, far: 140 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#030303', 30, 78]} />

        <ambientLight intensity={0.56} />
        <pointLight position={[6, 6, 9]} color="#fff4c7" intensity={16} distance={34} />
        <pointLight position={[-8, -4, 5]} color="#ffc91a" intensity={11} distance={30} />

        <Suspense fallback={null}>
          <ParticleField count={980} />
          <BouquetField />
          <EmojiField />
          <FloatingMainTitle position={[0, 0, -2.4]} />
          <NoteField />
        </Suspense>

        <ResponsiveOrbitControls active={active} />

        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.24} luminanceSmoothing={0.88} intensity={0.8} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.84} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
