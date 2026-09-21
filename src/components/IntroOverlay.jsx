import { motion } from 'framer-motion'
import bouquetImage from '../assets/ramo.webp'

export default function IntroOverlay({ onEnter }) {
  return (
    <motion.section
      className="intro intro--clickable"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      onClick={onEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onEnter()
        }
      }}
    >
      <div className="intro__halo intro__halo--one" />
      <div className="intro__halo intro__halo--two" />

      <motion.div
        className="intro__content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <img src={bouquetImage} alt="Ramo de flores amarillas" className="intro__bouquet" />
        <span className="intro__eyebrow">21 DE SEPTIEMBRE</span>
        <h1>Una pequeña sorpresa amarilla</h1>
        <p>De parte del Área de Soporte y TIC</p>
        <span className="intro__click">Click</span>
      </motion.div>
    </motion.section>
  )
}
