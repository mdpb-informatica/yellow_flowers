import { useMemo } from 'react'
import FloatingEmoji from './FloatingEmoji.jsx'

function seededRandom(seed) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

const emojiSet = ['💛', '🌻', '✨']

export default function EmojiField() {
  const emojis = useMemo(() => {
    const random = seededRandom(22092026)

    return Array.from({ length: 14 }).map((_, index) => {
      const angle = (index / 14) * Math.PI * 2 + random() * 0.5
      const radius = 5.8 + random() * 8.2
      const y = (random() - 0.5) * 8.8
      const z = (random() - 0.5) * 6.6

      return {
        key: index,
        emoji: emojiSet[index % emojiSet.length],
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius + z],
        scale: 1.25 + random() * 0.55,
        speed: 0.38 + random() * 0.58,
        phase: random() * Math.PI * 2,
      }
    })
  }, [])

  return emojis.map(({ key, ...item }) => <FloatingEmoji key={key} {...item} />)
}
