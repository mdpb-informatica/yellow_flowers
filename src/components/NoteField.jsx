import { useMemo } from 'react'
import FloatingNote from './FloatingNote.jsx'

const baseNotes = [
  { text: 'Un detalle con cariño para nuestro personal.', position: [-12.4, 5.6, -4.4], distanceFactor: 11.6 },
  { text: 'Que este día traiga alegría y buenos momentos.', position: [12.8, 4.9, -5.2], distanceFactor: 11.6 },
  { text: 'Gracias por compartir su energía cada día.', position: [11.8, -5.8, -4.3], distanceFactor: 11.1 },
  { text: 'Un saludo especial para todo nuestro equipo.', position: [-11.4, -5.2, -5.1], distanceFactor: 11.1 },
  { text: 'Que nunca falten motivos para sonreír.', position: [-13.1, 1.2, -6.2], distanceFactor: 11.9 },
  { text: 'Hoy celebramos los pequeños detalles.', position: [13.2, 0.8, -6.4], distanceFactor: 11.9 },
  { text: 'Un día amarillo para recordar.', position: [-9.6, 7.4, -7.1], distanceFactor: 12.2 },
  { text: 'Que la alegría acompañe este día.', position: [9.9, 7.1, -7.2], distanceFactor: 12.2 },
  { text: 'Gracias por ser parte de este equipo.', position: [-9.8, -7.4, -6.8], distanceFactor: 11.8 },
  { text: 'Que este detalle ilumine su jornada.', position: [10.4, -7.2, -6.9], distanceFactor: 11.8 },
]

export default function NoteField() {
  const notes = useMemo(
    () =>
      baseNotes.map((note, index) => ({
        ...note,
        key: index,
        phase: index * 0.82,
        speed: 0.48 + index * 0.035,
      })),
    [],
  )

  return notes.map(({ key, ...note }) => <FloatingNote key={key} {...note} />)
}
