import { useEffect, useRef } from 'react'

export default function StarRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let stars = []
    let raf
    let W, H

    const resize = () => {
      W = window.innerWidth
      H = document.documentElement.scrollHeight
      canvas.width = W
      canvas.height = H
    }

    const randSide = () => Math.random() < 0.5
      ? Math.random() * W * 0.1
      : W - Math.random() * W * 0.1

    const createStar = () => ({
      x: randSide(),
      y: Math.random() * H,
      size: Math.random() * 2.5 + 1,
      alpha: 0,
      targetAlpha: Math.random() * 0.6 + 0.3,
      phase: 'fadeIn',
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      life: 0,
      maxLife: Math.random() * 120 + 80,
    })

    const init = () => {
      resize()
      stars = Array.from({ length: 80 }, createStar)
    }

    init()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', resize)

    const ctx = canvas.getContext('2d')

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const s of stars) {
        s.life++

        if (s.life > s.maxLife) {
          Object.assign(s, createStar())
          s.y = Math.random() * H
          continue
        }

        if (s.phase === 'fadeIn') {
          s.alpha += 0.02
          if (s.alpha >= s.targetAlpha) s.phase = 'float'
        } else if (s.phase === 'float') {
          s.x += s.vx + Math.sin(s.life * 0.02) * 0.15
          s.y += s.vy + Math.cos(s.life * 0.03) * 0.15
        }

        if (s.x < 0 || s.x > W) s.x = randSide()

        ctx.fillStyle = `rgba(167, 139, 250, ${Math.max(0, s.alpha)})`
        ctx.fillRect(s.x, s.y, s.size, s.size)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0, zIndex: 1,
        pointerEvents: 'none', width: '100%',
      }}
    />
  )
}
