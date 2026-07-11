import { useEffect, useRef, useCallback } from 'react'

const TRAIL_LENGTH = 14
const LERP_FACTOR = 0.1
const SPARK_COLORS = ['#a78bfa', '#22d3ee', '#34d399', '#d946ef', '#c4b5fd']

function createSpark(x, y) {
  const angle = Math.random() * Math.PI * 2
  const speed = 1 + Math.random() * 4
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    decay: 0.02 + Math.random() * 0.03,
    size: 1.5 + Math.random() * 3,
    color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
  }
}

export default function CometCursor() {
  const canvasRef = useRef(null)
  const trailRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })))
  const targetRef = useRef({ x: -100, y: -100 })
  const sparksRef = useRef([])
  const rafRef = useRef(null)
  const isHoveringRef = useRef(false)
  const enabledRef = useRef(true)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    enabledRef.current = isDesktop && !prefersReduced.current
    if (!enabledRef.current) return
  }, [])

  useEffect(() => {
    if (!enabledRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => { targetRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { targetRef.current = { x: -100, y: -100 } }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current
      trail[0].x += (targetRef.current.x - trail[0].x) * LERP_FACTOR
      trail[0].y += (targetRef.current.y - trail[0].y) * LERP_FACTOR
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * (LERP_FACTOR * 0.75)
        trail[i].y += (trail[i - 1].y - trail[i].y) * (LERP_FACTOR * 0.75)
      }

      const isHover = isHoveringRef.current
      for (let i = trail.length - 1; i >= 1; i--) {
        const t = 1 - i / trail.length
        const alpha = t * (isHover ? 0.5 : 0.4)
        const size = t * (isHover ? 5 : 3)
        if (trail[i].x < -50) continue
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2)
        ctx.fillStyle = isHover
          ? `rgba(34,211,238,${alpha})`
          : `rgba(167,139,250,${alpha})`
        ctx.fill()
      }

      if (trail[0].x > -50) {
        const headSize = isHover ? 7 : 4
        const grad = ctx.createRadialGradient(trail[0].x, trail[0].y, 0, trail[0].x, trail[0].y, headSize * 2.5)
        grad.addColorStop(0, isHover ? 'rgba(34,211,238,0.8)' : 'rgba(167,139,250,0.8)')
        grad.addColorStop(1, 'rgba(167,139,250,0)')
        ctx.fillStyle = grad
        ctx.fillRect(trail[0].x - headSize * 2.5, trail[0].y - headSize * 2.5, headSize * 5, headSize * 5)

        ctx.beginPath()
        ctx.arc(trail[0].x, trail[0].y, headSize, 0, Math.PI * 2)
        ctx.fillStyle = isHover ? 'rgba(34,211,238,1)' : 'rgba(167,139,250,1)'
        ctx.fill()
      }

      const sparks = sparksRef.current
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.05
        s.vx *= 0.98
        s.life -= s.decay
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        ctx.globalAlpha = s.life
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const onClick = useCallback((e) => {
    if (!enabledRef.current || prefersReduced.current) return
    for (let i = 0; i < 14; i++) {
      sparksRef.current.push(createSpark(e.clientX, e.clientY))
    }
  }, [])

  useEffect(() => {
    if (!enabledRef.current) return
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [onClick])

  useEffect(() => {
    if (!enabledRef.current) return
    const onEnter = (e) => {
      const t = e.target.closest('a, button, [data-cursor-hover]')
      if (t) isHoveringRef.current = true
    }
    const onLeave = (e) => {
      const t = e.target.closest('a, button, [data-cursor-hover]')
      if (t) isHoveringRef.current = false
    }
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => { document.removeEventListener('mouseover', onEnter); document.removeEventListener('mouseout', onLeave) }
  }, [])

  if (!enabledRef.current) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        pointerEvents: 'none', cursor: 'none',
      }}
    />
  )
}
