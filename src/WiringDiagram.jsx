import { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { iconUrlFor } from './utils'

const COL = {
  Backend:  { n: '#f3b199', g: 'rgba(241,101,41,0.08)' },
  Frontend: { n: '#a5e9ff', g: 'rgba(97,218,251,0.08)' },
  Databases:{ n: '#b6cbe0', g: 'rgba(51,103,145,0.08)' },
  def:      { n: '#a78bfa', g: 'rgba(167,139,250,0.08)' },
}
function cl(c) { return COL[c] || COL.def }

const BIG = ['postgresql', 'postgres', 'mongodb', 'mongo', 'java', 'react', 'springboot', 'spring boot', 'spring']
function isBig(s) { return BIG.some((b) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '').includes(b)) }

function hs(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function wavy(fx, fy, tx, ty, k) {
  const dx = tx - fx; const dy = ty - fy
  const d = Math.sqrt(dx * dx + dy * dy)
  if (d < 2) return ''
  const ang = Math.atan2(dy, dx)
  const h = hs(k)
  const r1 = ((h * 7 + 3) % 991) / 991
  const r2 = ((h * 11 + 5) % 997) / 997
  const r3 = ((h * 13 + 7) % 983) / 983
  const c1 = 0.15 + r1 * 0.35; const c2 = 0.15 + r2 * 0.35
  const wf = 0.08 + r3 * 0.27
  const w = d * wf
  const w1 = (r1 - 0.5) * w * 1.5; const w2 = (r2 - 0.5) * w * 1.5
  const sn = Math.sin(ang); const cs = Math.cos(ang)
  return `M ${fx} ${fy}
    C ${fx + c1 * dx - w1 * sn} ${fy + c1 * dy + w1 * cs},
      ${tx - c2 * dx - w2 * sn} ${ty - c2 * dy + w2 * cs},
      ${tx} ${ty}`
}

function layout(skills, W, H, rng) {
  const cx = W / 2; const cy = H / 2
  const pad = 24; const gap = 8
  const maxR = Math.min(W, H) / 2 - pad
  const placed = []

  function placedPush(x, y, r) { placed.push({ x, y, r }) }

  function overlaps(x, y, r) {
    for (const p of placed) {
      const dx = p.x - x; const dy = p.y - y
      if (dx * dx + dy * dy < (p.r + r + gap) * (p.r + r + gap)) return true
    }
    return false
  }

  function findSpot(ox, oy, r, tries, minD, maxD) {
    for (let i = 0; i < tries; i++) {
      const a = rng() * Math.PI * 2
      const d = minD + rng() * (maxD - minD)
      const x = Math.max(pad + r, Math.min(W - pad - r, ox + d * Math.cos(a)))
      const y = Math.max(pad + r, Math.min(H - pad - r, oy + d * Math.sin(a)))
      if (!overlaps(x, y, r)) return { x, y }
    }
    for (let i = 0; i < tries * 4; i++) {
      const x = pad + r + rng() * (W - (pad + r) * 2)
      const y = pad + r + rng() * (H - (pad + r) * 2)
      if (!overlaps(x, y, r)) return { x, y }
    }
    return { x: ox, y: oy }
  }

  placedPush(cx, cy, 58)
  const nodes = [{ id: 'c', label: 'Adrian', x: cx, y: cy, r: 58, t: 'ct' }]
  const edges = []

  skills.forEach((g, gi) => {
    const baseAng = (gi / skills.length) * Math.PI * 2 - Math.PI / 2
    const ang = baseAng + (rng() - 0.5) * 0.8
    const catD = maxR * (0.30 + rng() * 0.20)
    const cx0 = cx + catD * Math.cos(ang)
    const cy0 = cy + catD * Math.sin(ang)
    const cp = findSpot(cx0, cy0, 46, 80, 0, 50)
    const cat = { id: `c${gi}`, label: g.category, x: cp.x, y: cp.y, r: 46, t: 'cat' }
    nodes.push(cat)
    placedPush(cp.x, cp.y, 46)
    edges.push({ f: 'c', t: cat.id, k: `c${gi}` })

    g.items.forEach((s, si) => {
      const big = isBig(s)
      const rSk = big ? 34 + rng() * 6 : 22 + rng() * 10
      const skMin = 60 + rng() * 30; const skMax = skMin + 50 + rng() * 60
      const sp = findSpot(cp.x, cp.y, rSk, 50, skMin, skMax)
      const skill = { id: `s${gi}-${si}`, label: s, x: sp.x, y: sp.y, r: rSk, t: 'skill', big }
      nodes.push(skill)
      placedPush(sp.x, sp.y, rSk)
      edges.push({ f: cat.id, t: skill.id, k: `e${gi}-${si}` })
    })
  })
  return { nodes, edges }
}

export default function WiringDiagram({ skills }) {
  const wrapRef = useRef(null)
  const [dim, setDim] = useState(null)
  const drOff = useRef({})
  const drag = useRef({})
  const [, force] = useState(0)

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return
      const r = wrapRef.current.getBoundingClientRect()
      setDim({ w: r.width, h: Math.max(r.width * 0.65, 520) })
    }
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const seed = useRef(Date.now())
  const d = dim || { w: 1000, h: 1000 }

  const { nodes, edges, map } = useMemo(() => {
    const rng = mulberry32(seed.current)
    const o = layout(skills, d.w, d.h, rng)
    const m = {}
    o.nodes.forEach((n) => { m[n.id] = n })
    return { ...o, map: m }
  }, [skills, d])

  const clamp = (x, y, r) => ({
    x: Math.max(r + 20, Math.min(d.w - r - 20, x)),
    y: Math.max(r + 20, Math.min(d.h - r - 20, y)),
  })

  const pos = (id) => {
    const n = map[id]
    const base = n ? { x: n.x, y: n.y } : { x: 0, y: 0 }
    const o = drOff.current[id] || { x: 0, y: 0 }
    return { x: base.x + o.x, y: base.y + o.y }
  }

  if (!dim) return <div ref={wrapRef} style={{ minHeight: 800 }} />

  return (
    <div ref={wrapRef} className="wd-wrap" style={{ height: d.h, position: 'relative', overflow: 'hidden', userSelect: 'none', width: '100%' }}>
      <svg className="wd-svg" viewBox={`0 0 ${d.w} ${d.h}`} preserveAspectRatio="xMidYMid meet">
        {edges.map((e) => {
          const f = pos(e.f); const t = pos(e.t)
          return <path key={e.k} d={wavy(f.x, f.y, t.x, t.y, e.k)} fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={e.f === 'c' ? 2.5 : 1.5}
            strokeLinecap="round" />
        })}
      </svg>

      {nodes.map((n) => {
        const p = pos(n.id)
        const c = cl(n.t === 'cat' ? n.label : null)
        const ct = n.t === 'ct'
        const sk = n.t === 'skill'
        const active = drag.current[n.id]?.active

        return (
          <motion.div
            key={n.id}
            animate={{ x: p.x - n.r, y: p.y - n.r }}
            transition={active
              ? { type: false }
              : { type: 'spring', stiffness: 200, damping: 26, mass: 1 }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: n.r * 2, height: n.r * 2,
              cursor: 'grab', zIndex: ct ? 30 : (sk && n.big ? 15 : 10),
              touchAction: 'none',
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              drag.current[n.id] = {
                active: true,
                ox: e.clientX, oy: e.clientY,
                bx: p.x, by: p.y,
              }
              force((t) => t + 1)
            }}
            onPointerMove={(e) => {
              const dd = drag.current[n.id]
              if (!dd?.active) return
              const dx = e.clientX - dd.ox
              const dy = e.clientY - dd.oy
              const raw = { x: dd.bx + dx, y: dd.by + dy }
              const clamped = clamp(raw.x, raw.y, n.r)
              const base = map[n.id]
              drOff.current[n.id] = {
                x: clamped.x - (base ? base.x : 0),
                y: clamped.y - (base ? base.y : 0),
              }
              force((t) => t + 1)
            }}
            onPointerUp={() => {
              delete drag.current[n.id]?.active
              force((t) => t + 1)
            }}
          >
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              display: 'flex', flexDirection: sk ? 'column' : 'row',
              alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${n.big ? 'rgba(255,215,0,0.5)' : ct ? 'rgba(167,139,250,0.3)' : c.n + '60'}`,
              boxShadow: n.big ? '0 0 14px rgba(255,215,0,0.15)' : 'none',
              background: ct
                ? 'radial-gradient(ellipse at 40% 30%, rgba(167,139,250,0.08), rgba(10,12,26,0.35))'
                : n.big
                  ? 'radial-gradient(ellipse at 35% 25%, rgba(255,215,0,0.06), rgba(10,12,26,0.25))'
                  : `radial-gradient(ellipse at 35% 25%, ${c.g}, rgba(10,12,26,0.25))`,
              backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
              padding: sk ? 4 : 4, gap: sk ? 2 : 0,
            }}>
              {sk ? (
                <>
                  <img src={iconUrlFor(n.label)} alt=""
                    style={{ width: n.big ? 24 : 20, height: n.big ? 24 : 20, pointerEvents: 'none', flexShrink: 0 }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  <span style={{
                    fontFamily: 'inherit', fontWeight: n.big ? 700 : 600,
                    fontSize: n.big ? 8 : 7, lineHeight: 1.1,
                    color: n.big ? '#ffd700' : c.n,
                    textAlign: 'center', pointerEvents: 'none',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    maxWidth: '90%', padding: '0 2px',
                  }}>{n.label}</span>
                </>
              ) : (
                <span style={{
                  fontFamily: 'inherit', fontWeight: 700,
                  fontSize: ct ? 13 : 12,
                  lineHeight: 1.15, color: ct ? '#e0e0e0' : c.n,
                  pointerEvents: 'none', overflow: 'hidden',
                  textAlign: 'center', padding: '1px 6px',
                }}>
                  {n.label}
                </span>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
