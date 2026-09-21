import { useMemo } from 'react'
import FloatingBouquet from './FloatingBouquet.jsx'

function seededRandom(seed) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export default function BouquetField() {
  const bouquets = useMemo(() => {
    const random = seededRandom(21092026)

    return Array.from({ length: 20 }).map((_, index) => {
      const angle = (index / 20) * Math.PI * 2 + random() * 0.42
      const radius = 6.8 + random() * 7.8
      const y = (random() - 0.5) * 8.5
      const z = (random() - 0.5) * 7.6

      return {
        key: index,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius + z],
        scale: 0.72 + random() * 0.72,
        speed: 0.4 + random() * 0.55,
        phase: random() * Math.PI * 2,
      }
    })
  }, [])

  return bouquets.map(({ key, ...bouquet }) => <FloatingBouquet key={key} {...bouquet} />)
}
