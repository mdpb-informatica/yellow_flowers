import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Experience from './components/Experience.jsx'
import IntroOverlay from './components/IntroOverlay.jsx'
import MeteorOverlay from './components/MeteorOverlay.jsx'

export default function App() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const preventDefault = (event) => event.preventDefault()

    document.addEventListener('selectstart', preventDefault)
    document.addEventListener('dragstart', preventDefault)
    document.addEventListener('contextmenu', preventDefault)

    return () => {
      document.removeEventListener('selectstart', preventDefault)
      document.removeEventListener('dragstart', preventDefault)
      document.removeEventListener('contextmenu', preventDefault)
    }
  }, [])

  return (
    <main className="app-shell">
      <MeteorOverlay />
      <Experience active={entered} />

      <AnimatePresence>
        {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}
      </AnimatePresence>
    </main>
  )
}
