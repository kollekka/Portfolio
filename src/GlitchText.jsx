import { useEffect, useRef, useState } from 'react'

export default function GlitchText({ text, baseIntensity = 0.15, hoverIntensity = 0.5, fontSize = 48, color = '#f0f0f0', fontWeight = 700 }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let raf
    let cancelled = false

    // Get computed font from container
    const computed = getComputedStyle(container)
    const ff = computed.fontFamily || 'sans-serif'

    // Measure text
    const meas = document.createElement('canvas')
    const mctx = meas.getContext('2d')
    mctx.font = `${fontWeight} ${fontSize}px ${ff}`
    const metrics = mctx.measureText(text)
    const cw = Math.ceil(metrics.width) + 40
    const ch = Math.ceil(fontSize * 1.2)

    const dpr = window.devicePixelRatio || 1
    const w = cw
    const h = ch

    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.width = Math.ceil(w * dpr)
    canvas.height = Math.ceil(h * dpr)
    container.style.width = w + 'px'
    container.style.height = h + 'px'

    // Render text to offscreen canvas once
    const off = document.createElement('canvas')
    const octx = off.getContext('2d')
    off.width = Math.ceil(w * dpr)
    off.height = Math.ceil(h * dpr)
    octx.scale(dpr, dpr)
    octx.font = `${fontWeight} ${fontSize}px ${ff}`
    octx.textBaseline = 'middle'
    octx.textAlign = 'center'
    octx.fillStyle = color
    octx.fillText(text, w / 2, h / 2)

    const render = () => {
      if (cancelled) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const intensity = hovering ? hoverIntensity : baseIntensity
      for (let y = 0; y < h; y++) {
        const dx = Math.floor(intensity * (Math.random() - 0.5) * 28)
        ctx.drawImage(off, 0, y, off.width, 1, dx, y, off.width, 1)
      }
      raf = requestAnimationFrame(render)
    }
    render()

    return () => { cancelled = true; cancelAnimationFrame(raf) }
  }, [text, baseIntensity, hoverIntensity, fontSize, fontWeight, color, hovering])

  return (
    <div
      ref={containerRef}
      style={{ display: 'inline-block', position: 'relative', lineHeight: 1.2, overflow: 'hidden' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
