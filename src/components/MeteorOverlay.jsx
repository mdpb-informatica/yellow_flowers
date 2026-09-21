const meteors = [
  { x: '88%', y: '6%', delay: '0.4s', duration: '9.5s', length: '150px', opacity: 0.8 },
  { x: '76%', y: '12%', delay: '2.1s', duration: '11.8s', length: '120px', opacity: 0.62 },
  { x: '95%', y: '18%', delay: '4.8s', duration: '12.5s', length: '165px', opacity: 0.72 },
  { x: '82%', y: '3%', delay: '7.1s', duration: '13.4s', length: '180px', opacity: 0.68 },
  { x: '98%', y: '28%', delay: '10.6s', duration: '15.2s', length: '132px', opacity: 0.56 },
  { x: '74%', y: '8%', delay: '14.3s', duration: '16.5s', length: '142px', opacity: 0.52 },
  { x: '90%', y: '14%', delay: '18.9s', duration: '17.4s', length: '156px', opacity: 0.65 },
  { x: '84%', y: '21%', delay: '23.7s', duration: '18.6s', length: '126px', opacity: 0.5 },
]

export default function MeteorOverlay() {
  return (
    <div className="meteor-layer" aria-hidden="true">
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className="meteor-shot"
          style={{
            '--meteor-x': meteor.x,
            '--meteor-y': meteor.y,
            '--meteor-delay': meteor.delay,
            '--meteor-duration': meteor.duration,
            '--meteor-length': meteor.length,
            '--meteor-opacity': meteor.opacity,
          }}
        />
      ))}
    </div>
  )
}
