import { useRef, useCallback, useEffect, useState } from 'react'

export default function TiltCard({ children, className = '', glowColor = 'rgba(167,139,250,0.12)', borderGradient, style = {}, floating = true }) {
  const cardRef = useRef(null)
  const frameRef = useRef(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const onMove = useCallback((e) => {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateX = ((y - cy) / cy) * -8
      const rotateY = ((x - cx) / cx) * 8
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`)
    })
  }, [prefersReduced])

  const onLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }, [])

  const floatClass = floating && !prefersReduced ? 'tilt-card-float' : ''

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${floatClass} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        '--glow-color': glowColor,
        '--glow-x': '50%',
        '--glow-y': '50%',
        transition: 'transform 0.15s ease-out, box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {borderGradient && <div className="tilt-card-border" style={{ '--border-grad': borderGradient }} />}
      <div className="tilt-card-glow" />
      <div className="tilt-card-content">{children}</div>
      <style>{`
        .tilt-card { position: relative; border-radius: 16px; overflow: hidden; }
        .tilt-card-float { animation: tiltFloat 4s ease-in-out infinite; }
        .tilt-card-float:nth-child(2) { animation-delay: -1s; }
        .tilt-card-float:nth-child(3) { animation-delay: -2s; }
        @keyframes tiltFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -4px; }
        }
        .tilt-card-glow {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(500px circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 50%);
          pointer-events: none; z-index: 0; opacity: 0;
          transition: opacity 0.4s;
        }
        .tilt-card:hover .tilt-card-glow { opacity: 1; }
        .tilt-card-content { position: relative; z-index: 1; }
        .tilt-card-border {
          position: absolute; inset: -2px; border-radius: inherit; z-index: 0;
          background: var(--border-grad, conic-gradient(from 0deg, #a78bfa, #22d3ee, #d946ef, #a78bfa));
          opacity: 0; transition: opacity 0.5s;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; -webkit-mask-composite: xor;
          padding: 2px;
          animation: tilt-border-spin 4s linear infinite paused;
        }
        .tilt-card:hover .tilt-card-border {
          opacity: 1;
          animation-play-state: running;
        }
        @keyframes tilt-border-spin { to { rotate: 360deg; } }
      `}</style>
    </div>
  )
}
