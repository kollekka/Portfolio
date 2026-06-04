import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function TextReveal({ children, as: Tag = 'h2', stagger = 0.06, y = 24, threshold = 0.15 }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  return (
    <Tag ref={ref} style={{ overflow: 'hidden' }}>
      <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden' }}
            initial={{ opacity: 0, y }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration: 0.6, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ display: 'inline-block' }}>{word}</span>
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}

function CharReveal({ children, as: Tag = 'h2', stagger = 0.03, threshold = 0.15 }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const text = typeof children === 'string' ? children : ''
  const chars = text.split('')

  return (
    <Tag ref={ref}>
      <span style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', opacity: 0 }}
            animate={show ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}

export { TextReveal, CharReveal }
