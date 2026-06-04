import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 170, damping: 26 }

function CardStack({ cards, renderCard, offsetPct = 8, scaleStep = 0.06, dimStep = 0.15, style }) {
  const [items, setItems] = useState(() => cards.map((c, i) => ({ ...c, _id: i, _origIdx: i })))
  const measureRef = useRef(null)
  const [padTop, setPadTop] = useState(0)

  useEffect(() => {
    setItems((prev) => {
      const map = new Map(prev.map((c) => [c._origIdx, c]))
      const next = cards.map((c, i) => map.get(i) || { ...c, _id: i, _origIdx: i })
      return next.length ? next : prev
    })
  }, [cards])

  useEffect(() => {
    if (measureRef.current) {
      const h = measureRef.current.offsetHeight
      if (h > 0) setPadTop((h * (items.length - 1) * offsetPct) / 100)
    }
  }, [items, offsetPct])

  const moveToEnd = useCallback((id) => {
    setItems((prev) => {
      const idx = prev.findIndex((c) => c._id === id)
      if (idx === -1) return prev
      return [...prev.slice(0, idx), ...prev.slice(idx + 1), prev[idx]]
    })
  }, [])

  const len = items.length

  return (
    <div style={{ position: 'relative', width: '100%', ...style }}>
      <div style={{ paddingTop: padTop, position: 'relative', width: '100%' }}>
        {items.map((item, i) => {
          const isFront = i === 0
          const brightness = Math.max(0.1, 1 - i * dimStep)
          const z = len - i

          return (
            <motion.div
              key={item._id}
              style={{
                position: 'absolute', width: '100%', top: 0, left: 0,
                cursor: isFront ? 'grab' : 'auto',
                touchAction: 'none',
                zIndex: z,
              }}
              animate={{
                y: `${i * -offsetPct}%`,
                scale: 1 - i * scaleStep,
                filter: `brightness(${brightness})`,
                zIndex: z,
              }}
              transition={spring}
              drag={isFront ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.y > 60) moveToEnd(item._id)
              }}
              whileDrag={isFront ? {
                zIndex: len, cursor: 'grabbing',
                scale: 1 - i * scaleStep + 0.04, rotate: 1.5,
                boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              } : {}}
            >
              {renderCard(item, item._origIdx)}
            </motion.div>
          )
        })}
      </div>
      <div ref={measureRef} style={{ opacity: 0, pointerEvents: 'none', position: 'absolute', zIndex: -1 }}>
        {renderCard(items[0] || cards[0], 0)}
      </div>
    </div>
  )
}

export default CardStack
