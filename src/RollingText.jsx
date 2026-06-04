import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function RollingText({ text, duplicateCount = 6, rollDuration = 1.2, staggerDelay = 0.06, blurIntensity = 6 }) {
  const [play, setPlay] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPlay(true); obs.unobserve(el) } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', verticalAlign: 'bottom' }}>
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i} style={{ width: '0.35em' }} />
        return (
          <CharColumn
            key={i}
            char={char}
            delay={i * staggerDelay}
            duration={rollDuration}
            count={duplicateCount}
            blur={blurIntensity}
            play={play}
          />
        )
      })}
    </span>
  )
}

function CharColumn({ char, delay, duration, count, blur, play }) {
  return (
    <span style={{ position: 'relative', height: '1.15em', overflow: 'hidden', display: 'inline-flex', alignItems: 'flex-start' }}>
      <motion.span
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.15 }}
        initial={{ y: 0 }}
        animate={play ? { y: `-${(count - 1) * 1.15}em` } : { y: 0 }}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94], type: 'tween' }}
      >
        {Array.from({ length: count }).map((_, j) => (
          <motion.span
            key={j}
            style={{ height: '1.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.15 }}
            initial={{ filter: 'blur(0px)' }}
            animate={play ? { filter: ['blur(0px)', `blur(${blur}px)`, `blur(${blur}px)`, 'blur(0px)'] } : { filter: 'blur(0px)' }}
            transition={{ duration, delay, times: [0, 0.2, 0.8, 1], ease: 'easeOut' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}

export default RollingText
