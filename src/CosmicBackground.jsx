import { useEffect, useRef, useMemo, useState } from 'react'

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
const STAR_LAYERS = IS_MOBILE ? 2 : 3
const STARS_PER_LAYER = IS_MOBILE ? [40, 20] : [60, 35, 18]
const STAR_SPEEDS = IS_MOBILE ? [0.15, 0.5] : [0.06, 0.25, 0.6]
const STAR_SIZES = IS_MOBILE ? [1, 2.5] : [0.7, 1.6, 3]

const SECTION_PALETTES = [
  { r: 120, g: 60, b: 200 }, { r: 0, g: 180, b: 220 },
  { r: 200, g: 50, b: 150 }, { r: 50, g: 200, b: 160 },
  { r: 180, g: 100, b: 220 }, { r: 30, g: 160, b: 210 },
]

function lerpColor(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1) }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

function randStarColor() {
  const palettes = [
    [220, 60, 85], [260, 50, 80], [190, 40, 90],
    [0, 0, 95], [280, 30, 75], [200, 50, 88],
  ]
  const [h, s, l] = palettes[Math.floor(Math.random() * palettes.length)]
  const [r, g, b] = hslToRgb(h, s, l + (Math.random() - 0.5) * 10)
  return { r, g, b, a: 0.5 + Math.random() * 0.5 }
}

function createStars(w, h, count, sizeRange) {
  return Array.from({ length: count }, () => {
    const col = randStarColor()
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      ...col,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
    }
  })
}

export default function CosmicBackground({ sectionIndex = 0 }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const layersRef = useRef([])
  const nebulaPhase = useRef(0)
  const scrollRef = useRef(0)
  const rafRef = useRef(null)
  const sectionRef = useRef(sectionIndex)
  const lerpedSection = useRef(sectionIndex)
  const [webglSupport] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const c = document.createElement('canvas')
      return !!(c.getContext('2d') || c.getContext('webgl'))
    } catch { return false }
  })

  const prefersReduced = useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []
  )

  useEffect(() => { sectionRef.current = sectionIndex }, [sectionIndex])

  useEffect(() => {
    if (prefersReduced || !webglSupport) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H

    const resize = () => {
      W = window.innerWidth
      H = document.documentElement.scrollHeight
      canvas.width = W
      canvas.height = H
      layersRef.current = Array.from({ length: STAR_LAYERS }, (_, i) =>
        createStars(W, H, STARS_PER_LAYER[i], [STAR_SIZES[i] * 0.6, STAR_SIZES[i]])
      )
    }
    resize()

    const onScroll = () => { scrollRef.current = window.scrollY }
    const onMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY }
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })

    let time = 0
    const draw = () => {
      time++
      ctx.clearRect(0, 0, W, H)

      nebulaPhase.current += 0.003
      const p = nebulaPhase.current
      const breath = 0.85 + 0.15 * Math.sin(p * 0.5)

      lerpedSection.current += (sectionRef.current - lerpedSection.current) * 0.02
      const si = lerpedSection.current
      const i0 = Math.floor(si) % SECTION_PALETTES.length
      const i1 = (i0 + 1) % SECTION_PALETTES.length
      const t = si - Math.floor(si)
      const baseCol = lerpColor(SECTION_PALETTES[i0], SECTION_PALETTES[i1], t)

      const nebulae = [
        { x: W * (0.3 + 0.15 * Math.sin(p * 0.7)), y: H * (0.4 + 0.1 * Math.cos(p * 0.5)), rx: W * 0.35 * breath, ry: H * 0.3 * breath, color: { r: baseCol.r, g: Math.max(0, baseCol.g - 40), b: Math.max(0, baseCol.b - 20) }, alpha: 0.045 },
        { x: W * (0.7 + 0.1 * Math.cos(p * 0.6)), y: H * (0.55 + 0.12 * Math.sin(p * 0.4)), rx: W * 0.3 * breath, ry: H * 0.25 * breath, color: { r: Math.max(0, baseCol.r - 60), g: baseCol.g, b: Math.min(255, baseCol.b + 40) }, alpha: 0.04 },
        { x: W * (0.5 + 0.12 * Math.sin(p * 0.8)), y: H * (0.3 + 0.08 * Math.cos(p * 0.3)), rx: W * 0.25 * breath, ry: H * 0.2 * breath, color: { r: Math.min(255, baseCol.r + 40), g: Math.max(0, baseCol.g - 20), b: baseCol.b }, alpha: 0.035 },
      ]

      for (const n of nebulae) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry))
        const c = n.color
        const a = n.alpha * breath
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${a})`)
        grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${a * 0.35})`)
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(n.x - n.rx, n.y - n.ry, n.rx * 2, n.ry * 2)
      }

      const scrollY = scrollRef.current
      const mx = (mouseRef.current.x / W - 0.5) * 2

      for (let layer = 0; layer < layersRef.current.length; layer++) {
        const stars = layersRef.current[layer]
        const speed = STAR_SPEEDS[layer]
        const parallaxX = mx * speed * 20
        const parallaxY = scrollY * speed * 0.015

        for (const s of stars) {
          const sx = s.x + parallaxX
          const sy = s.y + parallaxY
          const twinkle = 0.6 + 0.4 * Math.sin(time * s.twinkleSpeed + s.twinklePhase)
          const alpha = s.a * twinkle

          if (layer === STAR_LAYERS - 1 && s.size > 2) {
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 3)
            grad.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${alpha * 0.5})`)
            grad.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`)
            ctx.fillStyle = grad
            ctx.fillRect(sx - s.size * 3, sy - s.size * 3, s.size * 6, s.size * 6)
          }

          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`
          ctx.beginPath()
          ctx.arc(sx, sy, s.size * (0.8 + 0.2 * twinkle), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [prefersReduced, webglSupport])

  if (prefersReduced || !webglSupport) {
    return (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(120, 60, 200, 0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 70% 60%, rgba(0, 180, 220, 0.06) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 30% 70%, rgba(200, 50, 150, 0.05) 0%, transparent 50%)',
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
