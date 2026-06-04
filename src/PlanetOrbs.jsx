import { useRef } from 'react'
import { motion } from 'framer-motion'

function circlePts(cx, cy, rx, ry, n) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) }
  })
}

export default function PlanetOrbs({ colors = [] }) {
  const orbs = useRef(null)
  if (!orbs.current) {
    orbs.current = colors.map((color, i) => {
      const size = 40 + Math.random() * 220
      const isOrbit = i % 2 === 0

      if (isOrbit) {
        const cx = 20 + Math.random() * 60
        const cy = 20 + Math.random() * 60
        const rx = 8 + Math.random() * 28
        const ry = rx * (0.4 + Math.random() * 1.2)
        const pts = circlePts(cx, cy, rx, ry, 12)
        return {
          color,
          size,
          dur: 8 + Math.random() * 28,
          delay: -(i * 2 + Math.random() * 8),
          pos: [...pts, pts[0]],
          linear: true,
          blur: 40 + Math.random() * 40,
        }
      }

      const pos = Array.from({ length: 5 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
      return {
        color,
        size,
        dur: 20 + Math.random() * 50,
        delay: -(i * 3 + Math.random() * 10),
        pos,
        linear: false,
        blur: 40 + Math.random() * 40,
      }
    })
  }

  return orbs.current.map((o, i) => (
    <motion.div
      key={i}
      style={{
        position: 'absolute',
        zIndex: 0,
        pointerEvents: 'none',
        width: o.size,
        height: o.size,
        borderRadius: '50%',
        background: o.color,
        filter: `blur(${o.blur}px)`,
        left: o.pos[0].x + '%',
        top: o.pos[0].y + '%',
      }}
      animate={{
        left: o.pos.map(p => p.x + '%'),
        top: o.pos.map(p => p.y + '%'),
      }}
      transition={{
        duration: o.dur,
        repeat: Infinity,
        ease: o.linear ? 'linear' : 'easeInOut',
        delay: o.delay,
      }}
    />
  ))
}
