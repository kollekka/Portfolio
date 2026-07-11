import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const DRAG_THRESHOLD = 50
const INERTIA_VELOCITY = 500

export default function OrbitalCarousel({ items, renderItem, onSelect }) {
  const [active, setActive] = useState(0)
  const dragX = useMotionValue(0)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const goTo = useCallback((idx) => {
    const clamped = ((idx % items.length) + items.length) % items.length
    setActive(clamped)
  }, [items.length])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onDragEnd = useCallback((_, info) => {
    isDragging.current = false
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(offset) > DRAG_THRESHOLD || Math.abs(velocity) > INERTIA_VELOCITY) {
      if (velocity < 0 || offset < 0) next()
      else prev()
    }
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }, [next, prev, dragX])

  const len = items.length

  return (
    <div ref={containerRef} className="orbital-carousel">
      <div className="orbital-track">
        {items.map((item, i) => {
          const offset = i - active
          const wrapped = ((offset + len + Math.floor(len / 2)) % len) - Math.floor(len / 2)
          const absPos = Math.abs(wrapped)

          return (
            <motion.div
              key={item._origIdx ?? i}
              className={`orbital-item ${absPos === 0 ? 'active' : ''}`}
              animate={{
                x: wrapped * 340,
                scale: absPos === 0 ? 1 : absPos === 1 ? 0.8 : 0.6,
                opacity: absPos === 0 ? 1 : absPos === 1 ? 0.5 : 0.2,
                rotateY: wrapped * -10,
                z: absPos === 0 ? 0 : -200 - absPos * 100,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => { isDragging.current = true }}
              onDragEnd={onDragEnd}
              style={{ x: dragX, cursor: 'grab' }}
              onClick={(e) => {
                if (e.target.closest('a, button')) return
                if (!isDragging.current && absPos !== 0) {
                  goTo(i)
                } else if (absPos === 0 && onSelect) {
                  onSelect(item)
                }
              }}
            >
              {renderItem(item, i)}
            </motion.div>
          )
        })}
      </div>

      <div className="orbital-nav">
        <button onClick={prev} className="orbital-btn" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="orbital-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`orbital-dot ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="orbital-btn" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <style>{`
        .orbital-carousel { position: relative; width: 100%; padding: 30px 0 40px; perspective: 1200px; overflow: hidden; }
        .orbital-track {
          display: flex; align-items: center; justify-content: center;
          height: 480px; position: relative;
          transform-style: preserve-3d;
        }
        .orbital-item {
          position: absolute;
          width: 320px;
          transform-style: preserve-3d;
          flex-shrink: 0;
        }
        .orbital-item.active { z-index: 10; }
        .orbital-nav {
          display: flex; align-items: center; justify-content: center; gap: 20px;
          margin-top: 8px;
        }
        .orbital-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(10, 12, 26, 0.5);
          backdrop-filter: blur(8px);
          color: #f0f0f0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .orbital-btn:hover {
          border-color: rgba(167,139,250,0.3);
          background: rgba(167,139,250,0.1);
          box-shadow: 0 0 20px rgba(167,139,250,0.12);
        }
        .orbital-dots { display: flex; gap: 8px; }
        .orbital-dot {
          width: 8px; height: 8px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.15); cursor: pointer;
          transition: all 0.3s;
        }
        .orbital-dot.active {
          background: #a78bfa;
          width: 24px; border-radius: 4px;
          box-shadow: 0 0 12px rgba(167,139,250,0.4);
        }
        @media (max-width: 768px) {
          .orbital-track { height: 420px; }
          .orbital-item { width: 280px; }
        }
        @media (max-width: 500px) {
          .orbital-track { height: 400px; }
          .orbital-item { width: 260px; }
        }
      `}</style>
    </div>
  )
}
