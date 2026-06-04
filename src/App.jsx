import './App.css'
import { useState, useEffect, useRef } from 'react'
import { iconFor, iconUrlFor, domainFor } from './utils'
import CardStack from './CardStack'
import RollingText from './RollingText'
import { TextReveal, CharReveal } from './TextReveal'
import GlitchText from './GlitchText'
import StarRain from './StarRain'
import PlanetOrbs from './PlanetOrbs'
import { profile, skills, projects, certificates, links, education, experience } from './data'

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useMouseGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const glow = ref.current
    if (!glow) return
    let raf = null, mx = -200, my = -200
    const onMove = (e) => { mx = e.clientX; my = e.clientY
      if (!raf) raf = requestAnimationFrame(() => { glow.style.setProperty('--mx', mx + 'px'); glow.style.setProperty('--my', my + 'px'); raf = null }) }
    const onLeave = () => { glow.style.setProperty('--mx', '-200px'); glow.style.setProperty('--my', '-200px') }
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return ref
}

function Icon({ name }) {
  const url = iconUrlFor(name)
  if (url) return <img className="ico img-ico" src={url} alt="" loading="lazy" />
  return <span className="ico" aria-hidden>{iconFor(name)}</span>
}

const projectBanners = [
  { gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)', icon: '🖥️' },
  { gradient: 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)', icon: '🛡️' },
  { gradient: 'linear-gradient(135deg, #c2410c 0%, #fb923c 100%)', icon: '⚙️' },
  { gradient: 'linear-gradient(135deg, #047857 0%, #34d399 100%)', icon: '📋' },
  { gradient: 'linear-gradient(135deg, #b91c1c 0%, #f87171 100%)', icon: '💊' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="brand">{profile.name}</a>
        <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span className={`hamb ${open ? 'active' : ''}`} />
        </button>
        <nav className={open ? 'open' : ''}>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setOpen(false)}>Exp.</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href={`mailto:${links.email}`} className="nav-cta" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const orbColors = [
    'rgba(167, 139, 250, 0.20)', 'rgba(244, 114, 182, 0.15)',
    'rgba(96, 165, 250, 0.12)', 'rgba(52, 211, 153, 0.10)',
  ]
  return (
    <section id="home" className="hero">
      <PlanetOrbs colors={orbColors} />
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-content" data-reveal>
          <span className="hero-badge">Computer Science Student</span>
          <h1 className="hero-title">
            <RollingText text={`Hi, I'm ${profile.name.split(' ')[0]}`} rollDuration={1.4} staggerDelay={0.07} duplicateCount={6} />
            <span className="accent-dot">.</span>
          </h1>
          <p className="hero-sub">{profile.summary}</p>
          <p className="hero-about">{profile.about}</p>
          <div className="hero-acts">
            <a className="btn primary" href="#work">View my work</a>
            <a className="btn" href={`mailto:${links.email}`}>Get in touch</a>
          </div>
          <div className="hero-tags">
            {profile.focus.map((t, i) => (
              <span key={t} className="htag" style={{ '--i': i }}>
                <Icon name={t} />{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const orbColors = [
    'rgba(96, 165, 250, 0.18)', 'rgba(52, 211, 153, 0.14)',
    'rgba(251, 146, 60, 0.12)', 'rgba(244, 114, 182, 0.10)',
    'rgba(167, 139, 250, 0.14)',
  ]
  return (
    <section id="work" className="section" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <span className="section-label" data-reveal>Work</span>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Featured Projects" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        <p className="section-desc" data-reveal style={{ marginBottom: 40, maxWidth: 500 }}>Drag the top card down to browse through projects</p>
        <div className="stack-wrap" data-reveal>
          <CardStack
            cards={projects}
            offsetPct={10}
            scaleStep={0.07}
            dimStep={0.2}
            renderCard={(p, i) => (
              <article className="stack-card">
                <div className="stack-banner" style={{ background: projectBanners[i]?.gradient }}>
                  <span className="stack-banner-icon">{projectBanners[i]?.icon}</span>
                  <span className="stack-banner-num">{(String(i + 1)).padStart(2, '0')}</span>
                </div>
                <div className="stack-body">
                  <div className="stack-tags">
                    {p.tech?.map((t) => (
                      <span key={t} className="ptag" data-domain={domainFor(t)}>{t}</span>
                  ))}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <div className="stack-bot">
                  {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noreferrer">Repository</a>}
                  {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noreferrer">Live Demo</a>}
                </div>
              </article>
            )}
          />
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const orbColors = [
    'rgba(52, 211, 153, 0.18)', 'rgba(244, 114, 182, 0.14)',
    'rgba(96, 165, 250, 0.12)', 'rgba(251, 146, 60, 0.10)',
    'rgba(167, 139, 250, 0.14)',
  ]
  return (
    <section id="skills" className="section" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <div className="section-label" data-reveal>Expertise</div>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Skills & Technologies" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        {skills.map((group, gi) => (
          <div key={group.category} className="sg" data-reveal style={{ '--gi': gi }}>
            <h3 className="sg-title">{group.category}</h3>
            <div className="sg-tags">
              {group.items.map((s, si) => (
                <span key={s} className="st" data-domain={domainFor(s, group.category)} style={{ '--si': si }}>
                  <Icon name={s} />{s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const orbColors = [
    'rgba(251, 146, 60, 0.18)', 'rgba(96, 165, 250, 0.14)',
    'rgba(244, 114, 182, 0.12)', 'rgba(52, 211, 153, 0.10)',
    'rgba(167, 139, 250, 0.14)',
  ]
  const energyColors = ['#34d399', '#60a5fa', '#fb923c', '#f472b6']
  const [hovered, setHovered] = useState(null)
  const rowRefs = useRef([])
  const cloudRef = useRef(null)
  const [glowScale, setGlowScale] = useState(0)

  const onEnter = (i) => {
    setHovered(i)
    if (cloudRef.current && rowRefs.current[i]) {
      const c = cloudRef.current.getBoundingClientRect()
      const r = rowRefs.current[i].getBoundingClientRect()
      setGlowScale((r.top + r.height / 2 - c.top) / c.height)
    }
  }
  const onLeave = () => { setHovered(null); setGlowScale(0) }

  return (
    <section id="experience" className="section alt" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <div className="section-label" data-reveal>Career</div>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Experience" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        <div className="exp-clouds" ref={cloudRef}>
          <div className="exp-trunk-glow" style={{ '--scale': glowScale, '--color': hovered !== null ? energyColors[hovered] : 'transparent' }} />
          {experience.map((e, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <div key={e.role + e.company} className="exp-row" data-side={side} data-reveal style={{ '--i': i, '--energy': energyColors[i] }} ref={el => rowRefs.current[i] = el} onMouseEnter={() => onEnter(i)} onMouseLeave={onLeave}>
              <div className="exp-cloud">
                <div className="exp-cloud-inner">
                  <div className="sweep" />
                  <div className="exp-cloud-top">
                    <h3>{e.role}</h3>
                    <span className="exp-co">{e.company}</span>
                  </div>
                  {e.details && <p>{e.details}</p>}
                  <span className="exp-date">{e.period}</span>
                </div>
              </div>
              <div className="exp-stem" />
              <div className="exp-dot-cloud" />
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}

function Education() {
  const orbColors = [
    'rgba(167, 139, 250, 0.18)', 'rgba(52, 211, 153, 0.14)',
    'rgba(251, 146, 60, 0.12)', 'rgba(96, 165, 250, 0.10)',
    'rgba(244, 114, 182, 0.14)',
  ]
  return (
    <section id="education" className="section" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <div className="section-label" data-reveal>Learning</div>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Education" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        <div className="edu-grid">
          {education.map((ed, i) => (
            <div key={ed.degree + ed.school} className="ecard" data-reveal style={{ '--i': i }}>
              <div className="ecard-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>
              </div>
              <div>
                <strong>{ed.degree}</strong>
                <div className="ecard-meta">
                  <span>{ed.school}</span>
                  <span className="ecard-date">{ed.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certificates() {
  const [openCert, setOpenCert] = useState(null)
  useEffect(() => {
    if (!openCert) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenCert(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openCert])

  const orbColors = [
    'rgba(244, 114, 182, 0.18)', 'rgba(167, 139, 250, 0.14)',
    'rgba(96, 165, 250, 0.12)', 'rgba(52, 211, 153, 0.10)',
    'rgba(251, 146, 60, 0.14)',
  ]
  return (
    <section id="certs" className="section alt" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <div className="section-label" data-reveal>Credentials</div>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Certificates" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        <div className="cgrid">
          {certificates.map((c, i) => (
            <button key={c.name} className="ccard" data-reveal style={{ '--i': i }} onClick={() => setOpenCert(c)}>
              <strong>{c.name}</strong>
              {c.issuer && <span className="ccard-issuer">{c.issuer}</span>}
            </button>
          ))}
        </div>

        {openCert && (
          <div className="modal-wrap" role="dialog" aria-modal="true" aria-label={openCert.name} onClick={() => setOpenCert(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-x" aria-label="Close" onClick={() => setOpenCert(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="modal-body">
                {openCert.image && openCert.image.toLowerCase().endsWith('.pdf') ? (
                  <object data={openCert.image} type="application/pdf" className="cembed">
                    <iframe src={openCert.image} className="cembed" title={openCert.name} />
                  </object>
                ) : (
                  <img src={openCert.image || '/cert-placeholder.svg'} alt={openCert.name} className="cimg" loading="lazy" />
                )}
                {openCert.link && (
                  <div className="modal-acts">
                    <a className="btn primary" href={openCert.link} target="_blank" rel="noreferrer">Verify</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(null)
  const faqs = [
    { q: 'What technologies do you work with?', a: 'I specialize in Java with Spring Boot, PHP with Laravel, and React with JavaScript on the frontend. I work with PostgreSQL, MySQL, and MongoDB for databases, and I have experience with Python (Odoo ERP) and basic R.' },
    { q: 'What is your development process?', a: 'I follow a clean architecture approach — starting with requirements, designing the data model, implementing the backend API, and then building the frontend. I focus on writing testable, maintainable code.' },
    { q: 'Are you currently available for opportunities?', a: 'Yes! I\'m actively looking for internships and junior developer roles. Feel free to reach out via email.' },
    { q: 'What level is your English?', a: `My English is at ${profile.englishLevel || 'C1 CAE'} level — I hold a CAE certificate and can communicate fluently in professional settings. I am also learning Spanish at A2 level.` },
  ]

  const orbColors = [
    'rgba(165, 180, 252, 0.18)', 'rgba(52, 211, 153, 0.14)',
    'rgba(251, 146, 60, 0.12)', 'rgba(244, 114, 182, 0.10)',
    'rgba(96, 165, 250, 0.14)',
  ]
  return (
    <section id="faq" className="section" data-reveal>
      <PlanetOrbs colors={orbColors} />
      <div className="container">
        <div className="section-label" data-reveal>FAQ</div>
        <h2 data-reveal style={{ marginBottom: 12 }}>
          <GlitchText text="Frequently Asked Questions" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`fi${active === i ? ' open' : ''}`} data-reveal style={{ '--i': i }}>
              <button className="fq" onClick={() => setActive(active === i ? null : i)}>
                <span>{faq.q}</span>
                <svg className="fc" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className="fa">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container f-inner">
        <div className="f-brand">
          <strong>{profile.name}</strong>
          <span className="f-copy">&copy; {year}</span>
        </div>
        <div className="f-links">
          {links.github && <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {links.email && <a href={`mailto:${links.email}`}>Email</a>}
        </div>
      </div>
    </footer>
  )
}

function App() {
  useScrollReveal()
  const glowRef = useMouseGlow()

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <div className="noise" />
      <StarRain />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Certificates />
      <Faq />
      <Footer />
    </>
  )
}

export default App
