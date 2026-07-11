import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const DRAG_THRESHOLD = 50

function arcY(dist) {
  const norm = Math.abs(dist)
  return norm * norm * 28
}

function circDist(a, b, len) {
  let d = a - b
  if (d > len / 2) d -= len
  if (d < -len / 2) d += len
  return d
}

export default function ArcCarousel({ items, renderItem }) {
  const len = items.length
  const [virtualActive, setVirtualActive] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)
  const dragMeta = useRef({ startX: 0 })

  const [itemWidth, setItemWidth] = useState(320)
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth > 768) setItemWidth(320)
      else if (window.innerWidth > 500) setItemWidth(280)
      else setItemWidth(250)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const gap = 24
  const step = itemWidth + gap
  const centerIdx = ((virtualActive % len) + len) % len

  const navigate = useCallback((dir) => {
    setDragOffset(0)
    setVirtualActive((p) => p + dir)
  }, [])

  const next = useCallback(() => navigate(1), [navigate])
  const prev = useCallback(() => navigate(-1), [navigate])

  const goTo = useCallback((targetIdx) => {
    setDragOffset(0)
    setVirtualActive((p) => {
      const cur = ((p % len) + len) % len
      let diff = targetIdx - cur
      if (diff > len / 2) diff -= len
      if (diff < -len / 2) diff += len
      return p + diff
    })
  }, [len])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const spring = { type: 'spring', stiffness: 300, damping: 30, mass: 1 }

  const endDrag = useCallback((clientX) => {
    const offset = clientX - dragMeta.current.startX
    isDragging.current = false
    if (Math.abs(offset) > DRAG_THRESHOLD) {
      if (offset < 0) navigate(1)
      else navigate(-1)
    } else {
      setDragOffset(0)
    }
  }, [navigate])

  return (
    <div className="arc-carousel">
      <div
        className="arc-stage"
        onPointerDown={(e) => {
          dragMeta.current = { startX: e.clientX }
          isDragging.current = false
          setDragOffset(0)
        }}
        onPointerMove={(e) => {
          if (!(e.buttons & 1)) return
          const offset = e.clientX - dragMeta.current.startX
          if (Math.abs(offset) > 5) isDragging.current = true
          setDragOffset(offset)
        }}
        onPointerUp={(e) => endDrag(e.clientX)}
        onPointerCancel={() => { setDragOffset(0); isDragging.current = false }}
        style={{ touchAction: 'pan-y' }}
      >
        {items.map((item, i) => {
          const offset = circDist(i, centerIdx, len)
          const absPos = Math.abs(offset)
          const isActive = absPos === 0
          const hidden = absPos > 2

          return (
            <motion.div
              key={i}
              className={`arc-item${isActive ? ' active' : ''}`}
              animate={{
                x: offset * step + dragOffset,
                scale: hidden ? 0 : isActive ? 1 : absPos === 1 ? 0.8 : 0.55,
                opacity: hidden ? 0 : isActive ? 1 : absPos === 1 ? 0.5 : 0.18,
                rotateY: offset * -8,
                y: arcY(offset),
                z: isActive ? 60 : -50 - absPos * 60,
              }}
              transition={spring}
              onClick={(e) => {
                if (e.target.closest('a, button')) return
                if (!isDragging.current && !isActive) goTo(i)
              }}
              style={{
                position: 'absolute',
                left: `calc(50% - ${itemWidth / 2}px)`,
                width: itemWidth,
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: hidden ? 'none' : 'auto',
                transformStyle: 'preserve-3d',
              }}
            >
              {renderItem(item, i, isActive)}
            </motion.div>
          )
        })}
      </div>

      <div className="arc-nav">
        <button onClick={prev} className="arc-btn" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="arc-dots">
          {items.map((item, i) => (
            <button
              key={i}
              className={`arc-dot ${centerIdx === i ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="arc-btn" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <style>{`
        .arc-carousel {
          position: relative; width: 100%;
          padding: 30px 0 50px;
          perspective: 1200px;
          overflow: hidden;
          user-select: none;
        }
        .arc-stage {
          position: relative;
          width: 100%;
          height: 460px;
          cursor: grab;
        }
        .arc-stage:active { cursor: grabbing; }
        .arc-item {
          top: 20px;
          will-change: transform, opacity;
        }
        .arc-item.active { z-index: 10; }
        .arc-nav {
          display: flex; align-items: center; justify-content: center;
          gap: 20px; margin-top: 28px;
        }
        .arc-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(10,12,26,0.5);
          backdrop-filter: blur(8px);
          color: #f0f0f0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .arc-btn:hover {
          border-color: rgba(167,139,250,0.3);
          background: rgba(167,139,250,0.1);
          box-shadow: 0 0 20px rgba(167,139,250,0.12);
        }
        .arc-dots { display: flex; gap: 8px; }
        .arc-dot {
          width: 8px; height: 8px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.15); cursor: pointer;
          transition: all 0.3s;
        }
        .arc-dot.active {
          background: #a78bfa;
          width: 24px; border-radius: 4px;
          box-shadow: 0 0 12px rgba(167,139,250,0.4);
        }
      `}</style>
    </div>
  )
}
